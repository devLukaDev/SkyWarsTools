import { OverallResponse } from "@/app/types/OverallResponse";
import { Tooltip } from "@mui/material";
import { calcLevel, headsMap } from "@/app/utils/Utils";
import React from "react";
import Image from "next/image";
import { formatScheme } from "@/app/utils/Scheme";
import { getPlayerRank } from "@/app/utils/RankTag";
import MinecraftText from "@/app/utils/MinecraftText";
import { SnapshotsResponse } from "@/app/types/Snapshot";
import { MessageCircleWarning } from "lucide-react";
import Button from "../../universal/Button";
import Link from "next/link";

function VersusStatsCompare({
	player1,
	player2,
	p1snapshots,
	p2snapshots,
}: {
	player1: OverallResponse;
	player2: OverallResponse;
	p1snapshots?: SnapshotsResponse;
	p2snapshots?: SnapshotsResponse;
}) {
	// Calculation and comparison logic goes here
	let comparisons: {
		label: string;
		toFixed: number;
		title: string;
		player1Value: number;
		player2Value: number;
		player1Score: number;
		player2Score: number;
	}[] = [];

	const killsA = player1.stats.kills ?? 0;
	const killsB = player2.stats.kills ?? 0;
	const killsScoreA = (killsA / (killsA + killsB)) * 100;
	const killsScoreB = (killsB / (killsA + killsB)) * 100;

	const experienceA = player1.stats.skywars_experience ?? 0;
	const experienceB = player2.stats.skywars_experience ?? 0;
	const experienceScoreA = (experienceA / (experienceA + experienceB)) * 100;
	const experienceScoreB = (experienceB / (experienceA + experienceB)) * 100;

	const winsA = player1.stats.wins ?? 0;
	const winsB = player2.stats.wins ?? 0;
	const winsScoreA = (winsA / (winsA + winsB)) * 100;
	const winsScoreB = (winsB / (winsA + winsB)) * 100;

	const headsA = player1.stats.heads ?? 0;
	const headsB = player2.stats.heads ?? 0;
	const headsScoreA = (headsA / (headsA + headsB)) * 100;
	const headsScoreB = (headsB / (headsA + headsB)) * 100;

	let totalExpA = 0;
	let totalExpB = 0;
	headsMap.forEach((key) => {
		const kills1 = (player1.stats[key.key as keyof OverallResponse["stats"]] as number) ?? 0;
		totalExpA += kills1 * key.exp;
		const kills2 = (player2.stats[key.key as keyof OverallResponse["stats"]] as number) ?? 0;
		totalExpB += kills2 * key.exp;
	});
	const headsScoreExpA = (totalExpA / (totalExpA + totalExpB)) * 100;
	const headsScoreExpB = (totalExpB / (totalExpA + totalExpB)) * 100;

	const winLossRatioA = (player1.stats.wins ?? 0) / Math.max(player1.stats.losses ?? 1, 1);
	const winLossRatioB = (player2.stats.wins ?? 0) / Math.max(player2.stats.losses ?? 1, 1);
	const winLossRatioScoreA = (winLossRatioA / (winLossRatioA + winLossRatioB)) * 100;
	const winLossRatioScoreB = (winLossRatioB / (winLossRatioA + winLossRatioB)) * 100;

	const killDeathRatioA = (player1.stats.kills ?? 0) / Math.max(player1.stats.deaths ?? 1, 1);
	const killDeathRatioB = (player2.stats.kills ?? 0) / Math.max(player2.stats.deaths ?? 1, 1);
	const killDeathRatioScoreA = (killDeathRatioA / (killDeathRatioA + killDeathRatioB)) * 100;
	const killDeathRatioScoreB = (killDeathRatioB / (killDeathRatioA + killDeathRatioB)) * 100;

	const maxKitsA = player1.stats.customs_kitsMaxPrestige ?? 0;
	const maxKitsB = player2.stats.customs_kitsMaxPrestige ?? 0;
	const maxKitsScoreA = (maxKitsA / (maxKitsA + maxKitsB)) * 100;
	const maxKitsScoreB = (maxKitsB / (maxKitsA + maxKitsB)) * 100;

	const playTimeA = player1.stats.time_played ?? 0;
	const playTimeB = player2.stats.time_played ?? 0;
	const playTimeScoreA = (playTimeA / (playTimeA + playTimeB)) * 100;
	const playTimeScoreB = (playTimeB / (playTimeA + playTimeB)) * 100;

	comparisons = [
		{
			label: "Experience",
			toFixed: 0,
			title: "SkyWars Experience",
			player1Value: experienceA,
			player2Value: experienceB,
			player1Score: experienceScoreA,
			player2Score: experienceScoreB,
		},
		{
			label: "Kills",
			toFixed: 0,
			title: "Total Kills",
			player1Value: killsA,
			player2Value: killsB,
			player1Score: killsScoreA,
			player2Score: killsScoreB,
		},
		{
			label: "Wins",
			toFixed: 0,
			title: "Total Wins",
			player1Value: winsA,
			player2Value: winsB,
			player1Score: winsScoreA,
			player2Score: winsScoreB,
		},
		{
			label: "Heads",
			toFixed: 0,
			title: "Total Heads Collected",
			player1Value: headsA,
			player2Value: headsB,
			player1Score: headsScoreA,
			player2Score: headsScoreB,
		},
		{
			label: "Heads EXP",
			toFixed: 0,
			title: "Total EXP from Heads",
			player1Value: totalExpA,
			player2Value: totalExpB,
			player1Score: headsScoreExpA,
			player2Score: headsScoreExpB,
		},
		{
			label: "W/L Ratio",
			toFixed: 3,
			title: "Win/Loss Ratio",
			player1Value: winLossRatioA,
			player2Value: winLossRatioB,
			player1Score: winLossRatioScoreA,
			player2Score: winLossRatioScoreB,
		},
		{
			label: "K/D Ratio",
			toFixed: 3,
			title: "Kill/Death Ratio",
			player1Value: killDeathRatioA,
			player2Value: killDeathRatioB,
			player1Score: killDeathRatioScoreA,
			player2Score: killDeathRatioScoreB,
		},
		{
			label: "Maxed Kits",
			toFixed: 0,
			title: "Kits at Max Prestige (7)",
			player1Value: maxKitsA,
			player2Value: maxKitsB,
			player1Score: maxKitsScoreA,
			player2Score: maxKitsScoreB,
		},
		{
			label: "Hours Played",
			toFixed: 1,
			title: "Total Playtime in Hours",
			player1Value: playTimeA / 3600,
			player2Value: playTimeB / 3600,
			player1Score: playTimeScoreA,
			player2Score: playTimeScoreB,
		},
	];
	let shouldAddSessions = true;
	let sessionComparisons: {
		label: string;
		toFixed: number;
		title: string;
		player1Value: number;
		player2Value: number;
		player1Score: number;
		player2Score: number;
	}[] = [];
	if (p1snapshots && p2snapshots) {
		const p1s1 = p1snapshots[Object.keys(p1snapshots)[1]];
		const p1s2 = p1snapshots[Object.keys(p1snapshots)[0]];
		const p2s1 = p2snapshots[Object.keys(p2snapshots)[1]];
		const p2s2 = p2snapshots[Object.keys(p2snapshots)[0]];

		const sessionKillsA = p1s2.stats.kills - p1s1.stats.kills;
		const sessionKillsB = p2s2.stats.kills - p2s1.stats.kills;
		const sessionDeathsA = p1s2.stats.deaths - p1s1.stats.deaths;
		const sessionDeathsB = p2s2.stats.deaths - p2s1.stats.deaths;
		const kdRatioA = sessionKillsA / sessionDeathsA;
		const kdRatioB = sessionKillsB / sessionDeathsB;
		const kdRatioScoreA = (kdRatioA / (kdRatioA + kdRatioB)) * 100;
		const kdRatioScoreB = (kdRatioB / (kdRatioA + kdRatioB)) * 100;
		shouldAddSessions = isFinite(kdRatioA) && isFinite(kdRatioB);
		console.warn(
			!shouldAddSessions &&
				"kdRatio for player 1 or player 2 was not finite or NaN. this means one of the players had 0 deaths in the session, which would lead to misleading stats."
		);

		const sessionWinsA = p1s2.stats.wins - p1s1.stats.wins;
		const sessionWinsB = p2s2.stats.wins - p2s1.stats.wins;
		const sessionLossesA = p1s2.stats.losses - p1s1.stats.losses;
		const sessionLossesB = p2s2.stats.losses - p2s1.stats.losses;
		const winLossRatioA = sessionWinsA / sessionLossesA;
		const winLossRatioB = sessionWinsB / sessionLossesB;
		const winLossRatioScoreA = (winLossRatioA / (winLossRatioA + winLossRatioB)) * 100;
		const winLossRatioScoreB = (winLossRatioB / (winLossRatioA + winLossRatioB)) * 100;
		shouldAddSessions = shouldAddSessions && isFinite(winLossRatioA) && isFinite(winLossRatioB);
		console.warn(
			!shouldAddSessions &&
				"winLossRatio for player 1 or player 2 was not finite or NaN. this means one of the players had 0 losses in the session, which would lead to misleading stats."
		);

		const expPerHourA =
			(p1s2.stats.skywars_experience - p1s1.stats.skywars_experience) / ((p1s2.stats.time_played - p1s1.stats.time_played) / 3600);
		const expPerHourB =
			(p2s2.stats.skywars_experience - p2s1.stats.skywars_experience) / ((p2s2.stats.time_played - p2s1.stats.time_played) / 3600);
		const expPerHourScoreA = (expPerHourA / (expPerHourA + expPerHourB)) * 100;
		const expPerHourScoreB = (expPerHourB / (expPerHourA + expPerHourB)) * 100;
		shouldAddSessions = shouldAddSessions && isFinite(expPerHourA) && isFinite(expPerHourB);
		console.warn(
			!shouldAddSessions &&
				"expPerHour for player 1 or player 2 was not finite or NaN. this means one of the players had 0 time played in the session, which would lead to misleading stats."
		);

		if (shouldAddSessions) {
			// Check for NaN values (could be NaN when no time played in session)
			sessionComparisons = [
				{
					label: "Session K/D",
					toFixed: 3,
					title: "Kill/Death Ratio in Last Session",
					player1Value: kdRatioA,
					player2Value: kdRatioB,
					player1Score: kdRatioScoreA,
					player2Score: kdRatioScoreB,
				},
				{
					label: "Session W/L",
					toFixed: 3,
					title: "Win/Loss Ratio in Last Session",
					player1Value: winLossRatioA,
					player2Value: winLossRatioB,
					player1Score: winLossRatioScoreA,
					player2Score: winLossRatioScoreB,
				},
				{
					label: "Session XP/H",
					toFixed: 0,
					title: "Experience per Hour in Last Session",
					player1Value: expPerHourA,
					player2Value: expPerHourB,
					player1Score: expPerHourScoreA,
					player2Score: expPerHourScoreB,
				},
			];
		}
	}

	const finalScoreA = comparisons.reduce((acc, comp) => acc + comp.player1Score, 0);
	const finalScoreB = comparisons.reduce((acc, comp) => acc + comp.player2Score, 0);
	const finalSessionScoreA = sessionComparisons.reduce((acc, comp) => acc + comp.player1Score, 0);
	const finalSessionScoreB = sessionComparisons.reduce((acc, comp) => acc + comp.player2Score, 0);
	const totalFinalScoreA = finalScoreA + finalSessionScoreA;
	const totalFinalScoreB = finalScoreB + finalSessionScoreB;

	const winnerStats = totalFinalScoreA > totalFinalScoreB ? player1 : player2;
	const level = calcLevel(winnerStats.stats.skywars_experience ?? 0);
	const scheme = formatScheme(level, winnerStats, false);
	const rank = getPlayerRank(winnerStats);
	const playerTitle = `${scheme} ${rank.prefix} ${winnerStats.player}`;

	return (
		<>
			<div className="w-full lg:p-4">
				<table className="w-full text-base lg:text-2xl text-left bg-content rounded-lg">
					<thead className="text-accent">
						<tr className="table-row lg:hidden">
							{/* Mobile header row with avatars */}
							<th className="p-2 text-3xl w-[35%] truncate">
								<Image
									src={`${process.env.NEXT_PUBLIC_HEADS_API}/${player1.uuid}`}
									width={40}
									height={40}
									className="rounded-sm ml-2"
									alt={player1.player + " skin"}
								/>
							</th>
							<th className="w-[30%]"></th>
							{/* TODO justify-end doesnt work?! */}
							<th className="p-2 text-3xl w-[35%] truncate text-right">
								{/* I am so confused */}
								<span className="inline-block align-middle"></span>
								<span className="inline-block align-middle">
									<Image
										src={`${process.env.NEXT_PUBLIC_HEADS_API}/${player2.uuid}`}
										width={40}
										height={40}
										className="rounded-sm mr-2"
										alt={player2.player + " skin"}
									/>
									{/* GPT bs over */}
								</span>
							</th>
						</tr>
						<tr className="hidden lg:table-row">
							<th className="px-2 py-1 lg:p-2 lg:px-4 text-3xl w-[35%] truncate max-w-[1px]">{player1.player}</th>
							<th className="w-[30%]"></th>
							<th className="text-right px-2 py-1 lg:p-2 lg:px-4 text-3xl w-[35%] truncate max-w-[1px]">{player2.player}</th>
						</tr>
					</thead>
					<tbody className="border-t-2 border-[var(--accent)]">
						{comparisons.map((comp) => (
							<tr key={comp.label}>
								<td
									className={`px-4 py-1 lg:py-2 w-[35%] truncate max-w-[1px] ${
										comp.player1Value > comp.player2Value
											? "text-green-400"
											: comp.player1Value < comp.player2Value
												? "text-red-400"
												: ""
									}`}
								>
									<Tooltip placement="left" title={comp.player1Score.toFixed(1) + " points"}>
										<span className="truncate max-w-full block">{comp.player1Value.toFixed(comp.toFixed)}</span>
									</Tooltip>
								</td>
								<td className="px-0 py-1 lg:p-2 lg:px-4 font-semibold text-center w-[30%] truncate max-w-[1px]">
									<Tooltip title={comp.title} placement="top">
										<span className="truncate max-w-full block">{comp.label}</span>
									</Tooltip>
								</td>
								<td
									className={`px-4 py-1 lg:py-2 text-right w-[35%] truncate max-w-[1px] ${
										comp.player2Value > comp.player1Value
											? "text-green-400"
											: comp.player2Value < comp.player1Value
												? "text-red-400"
												: ""
									}`}
								>
									<Tooltip placement="right" title={comp.player2Score.toFixed(1) + " points"}>
										<span className="truncate max-w-full block">{comp.player2Value.toFixed(comp.toFixed)}</span>
									</Tooltip>
								</td>
							</tr>
						))}
					</tbody>
					{p1snapshots && p2snapshots && (
						<tbody className="border-t-2 border-[var(--accent)]">
							{sessionComparisons.map((comp) => (
								<tr key={comp.label}>
									<td
										className={`px-4 py-1 lg:py-2 w-[35%] truncate max-w-[1px] ${
											comp.player1Value > comp.player2Value
												? "text-green-400"
												: comp.player1Value < comp.player2Value
													? "text-red-400"
													: ""
										}`}
									>
										<Tooltip placement="left" title={comp.player1Score.toFixed(1) + " points"}>
											<span className="truncate max-w-full block">{comp.player1Value.toFixed(comp.toFixed)}</span>
										</Tooltip>
									</td>
									<td className="px-0 py-1 lg:p-2 lg:px-4 font-semibold text-center w-[30%] truncate max-w-[1px]">
										<Tooltip title={comp.title} placement="top">
											<span className="truncate max-w-full block">{comp.label}</span>
										</Tooltip>
									</td>
									<td
										className={`px-4 py-1 lg:py-2 text-right w-[35%] truncate max-w-[1px] ${
											comp.player2Value > comp.player1Value
												? "text-green-400"
												: comp.player2Value < comp.player1Value
													? "text-red-400"
													: ""
										}`}
									>
										<Tooltip placement="right" title={comp.player2Score.toFixed(1) + " points"}>
											<span className="truncate max-w-full block">{comp.player2Value.toFixed(comp.toFixed)}</span>
										</Tooltip>
									</td>
								</tr>
							))}
						</tbody>
					)}
				</table>
				{!shouldAddSessions && (
					<div className="flex flex-row mx-auto w-full lg:w-100 gap-4 p-1 lg:p-2 text-sm font-semibold justify-center items-center bg-content rounded-lg mt-4 lg:mb-0 lg:rounded-3xl">
						<MessageCircleWarning className="h-8 w-8 hidden lg:block text-red-400" />
						<div className="flex flex-col items-center text-gray-300">
							<span>Session stats were omitted because</span>
							<span>one of the sessions had invalid stats</span>
						</div>
					</div>
				)}
				<div className="w-full text-xl lg:text-2xl rounded-lg p-4 mt-4 text-center gap-2 flex flex-col bg-content">
					<div className="flex flex-row justify-between lg:text-3xl">
						<span className={`font-semibold ${totalFinalScoreA > totalFinalScoreB ? "text-green-400" : "text-red-400"}`}>
							{totalFinalScoreA.toFixed(2)}
						</span>
						<span>Winner</span>
						<span className={`font-semibold ${totalFinalScoreB > totalFinalScoreA ? "text-green-400" : "text-red-400"}`}>
							{totalFinalScoreB.toFixed(2)}
						</span>
					</div>

					<div className="text-2xl lg:text-3xl">
						<MinecraftText>{playerTitle}</MinecraftText>
					</div>
				</div>
				<div className="mt-4 scale-70">
					<Button>
						<Link href={`/player/${player1.player}/versus`}>Versus someone else</Link>
					</Button>
				</div>
			</div>
		</>
	);
}

export default VersusStatsCompare;
