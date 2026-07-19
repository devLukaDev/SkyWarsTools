"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { LoaderCircle } from "lucide-react";
import Tooltip from "@mui/material/Tooltip";
import MinecraftText from "@/app/utils/MinecraftText";
import { getPlayerRank } from "@/app/utils/RankTag";
import { calcLevel, fetcher, formatPlaytime, formatTimestampShort, shortenUUID } from "@/app/utils/Utils";
import { OverallResponse } from "@/app/types/OverallResponse";
import { WeeklyComparisonEntry, WeeklyComparisonResponse } from "@/app/types/WeeklyComparison";

const MAX_ROWS = 10;
const WEEKLY_EXP_KEY = "skywars_experience";
const WEEKLY_KILLS_KEY = "kills";
const WEEKLY_WINS_KEY = "wins";
const WEEKLY_TIME_KEY = "time_played";
const WEEK_MS = 604800000;

type CombinedEntry = {
	entry: WeeklyComparisonEntry;
	kills: number;
	wins: number;
	timePlayed: number;
};

const createEndpoint = (key: string) => `${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/getWeeklyComparison/${key}`;

const CustomWeeklyLeaderboard = () => {
	const {
		data: expData,
		error: expError,
		isLoading: expLoading,
	} = useSWR<WeeklyComparisonResponse>(createEndpoint(WEEKLY_EXP_KEY), fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	const {
		data: killsData,
		error: killsError,
		isLoading: killsLoading,
	} = useSWR<WeeklyComparisonResponse>(createEndpoint(WEEKLY_KILLS_KEY), fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	const {
		data: winsData,
		error: winsError,
		isLoading: winsLoading,
	} = useSWR<WeeklyComparisonResponse>(createEndpoint(WEEKLY_WINS_KEY), fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	const {
		data: timeData,
		error: timeError,
		isLoading: timeLoading,
	} = useSWR<WeeklyComparisonResponse>(createEndpoint(WEEKLY_TIME_KEY), fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	const isLoading = expLoading || killsLoading || winsLoading || timeLoading;
	const hasError = expError || killsError || winsError || timeError;

	if (isLoading) {
		return (
			<div className="w-full flex items-center justify-center gap-2 bg-content rounded-xl p-4">
				<LoaderCircle className="animate-spin w-5 h-5" />
				<span className="font-semibold">Loading latest weekly combined leaderboard...</span>
			</div>
		);
	}

	if (hasError || !expData?.entries || !killsData?.entries || !winsData?.entries || !timeData?.entries) {
		return <div className="w-full bg-content rounded-xl p-4 font-semibold text-red-400">Could not load weekly leaderboard.</div>;
	}

	const killsMap = new Map(killsData.entries.map((entry) => [entry.uuid, entry]));
	const winsMap = new Map(winsData.entries.map((entry) => [entry.uuid, entry]));
	const timeMap = new Map(timeData.entries.map((entry) => [entry.uuid, entry]));

	const topExperienceRows: CombinedEntry[] = [...expData.entries]
		.sort((a, b) => {
			if (b.delta !== a.delta) return b.delta - a.delta;
			return b.current - a.current;
		})
		.slice(0, MAX_ROWS)
		.map((entry) => ({
			entry,
			kills: killsMap.get(entry.uuid)?.delta ?? 0,
			wins: winsMap.get(entry.uuid)?.delta ?? 0,
			timePlayed: timeMap.get(entry.uuid)?.delta ?? 0,
		}));

	const firstEntry = expData.entries[0];
	const prevTime = firstEntry?.previousTime;
	const currentTime = firstEntry?.currentTime;

	return (
		<div className="w-full mx-auto flex flex-col items-center justify-center gap-0">
			<div className="w-full flex flex-col lg:flex-row items-center lg:items-end justify-center lg:justify-between gap-0 lg:gap-2">
				<Tooltip title="This is a leaderboard consisting of players that have been on weekly leaderboards the past weeks, and shows their EXP climb.">
					<h3 className="text-xl lg:text-2xl font-bold text-center text-accent py-2 lg:pt-2 px-6 rounded-t-xl bg-content w-fit">
						Past Week Climbers
					</h3>
				</Tooltip>
				{prevTime && currentTime && (
					<div className="flex items-center gap-3 bg-content p-2 px-3 rounded-t-xl">
						<span className="font-semibold text-sm lg:text-base">
							{expData.week.split("-")[1]}: {formatTimestampShort(new Date(prevTime))} -{" "}
							{formatTimestampShort(new Date(currentTime))}
						</span>
					</div>
				)}
			</div>

			<div className="w-full overflow-x-auto">
				<table className="min-w-full w-[980px] lg:w-full bg-content lg:rounded-b-lg">
					<thead className="text-left text-accent border-b-2">
						<tr>
							<th className="p-2 lg:py-2 text-l lg:text-xl">#</th>
							<th className="p-2 lg:py-2 text-l lg:text-xl">Player</th>
							<th className="p-2 lg:py-2 text-l lg:text-xl">EXP</th>
							<th className="p-2 lg:py-2 text-l lg:text-xl">Kills</th>
							<th className="p-2 lg:py-2 text-l lg:text-xl">Wins</th>
							<th className="p-2 lg:py-2 text-l lg:text-xl">Time Played</th>
						</tr>
					</thead>
					<tbody>
						{topExperienceRows.map((row, index) => {
							const rankClass =
								index + 1 === 1
									? "text-yellow-400"
									: index + 1 === 2
										? "text-gray-300"
										: index + 1 === 3
											? "text-orange-700"
											: "";

							const mockOverallResponse: OverallResponse = {
								took: 0,
								nextSave: { saved: true, lastSaved: 0 },
								player: row.entry.player,
								uuid: row.entry.uuid,
								queried: 0,
								stats: { networkExp: 0, firstLogin: 0 },
								guild: {},
								display: row.entry.display,
							};

							const rank = getPlayerRank(mockOverallResponse);
							const levelString = row.entry.display.levelFormattedWithBrackets ?? "§7[§70✯§7]§r ";
							const fullName = `${rank.prefix} ${row.entry.player}`;
							const playerFaceUrl = `${process.env.NEXT_PUBLIC_HEADS_API}/${row.entry.uuid}`;

							return (
								<tr key={row.entry.uuid} className="border-b last:border-b-0 hover:bg-accent/10 transition-colors">
									<td className={`p-2 lg:py-2 text-l lg:text-xl font-semibold ${rankClass}`}>{index + 1}</td>
									<td className="p-2 lg:py-2 text-l lg:text-xl">
										<Link
											href={`/redirect?uuid=${shortenUUID(row.entry.uuid)}`}
											className="flex items-center gap-2 w-fit"
										>
											<Image
												src={playerFaceUrl}
												alt={`${row.entry.player} avatar`}
												width={24}
												height={24}
												className="rounded-sm"
											/>
											<MinecraftText>{levelString}</MinecraftText>
											<MinecraftText>{fullName}</MinecraftText>
										</Link>
									</td>
									<td className="p-2 lg:py-2 text-l lg:text-xl font-semibold text-green-300">
										<Tooltip
											title={`From ${calcLevel(row.entry.previous).toFixed(3)} to ${calcLevel(row.entry.current).toFixed(3)}`}
										>
											<span>{row.entry.delta.toLocaleString()}</span>
										</Tooltip>
									</td>
									<td className="p-2 lg:py-2 text-l lg:text-xl">{row.kills.toLocaleString()}</td>
									<td className="p-2 lg:py-2 text-l lg:text-xl">{row.wins.toLocaleString()}</td>
									<td className="p-2 lg:py-2 text-l lg:text-xl text-green-300 font-semibold whitespace-nowrap">
										<Tooltip title={row.timePlayed.toLocaleString()}>
											<span>{formatPlaytime(row.timePlayed)}</span>
										</Tooltip>
										<span className="text-base text-gray-400 ml-1">
											({(((row.timePlayed * 1000) / WEEK_MS) * 100).toFixed(1)}%)
										</span>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default CustomWeeklyLeaderboard;
