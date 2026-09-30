"use client";
import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { GuildResponse, Member } from "@/app/types/GuildResponse";
import { calcLevel } from "@/app/utils/Utils";
import { getPlayerRank } from "@/app/utils/RankTag";
import MinecraftText from "@/app/utils/MinecraftText";
import { formatScheme } from "@/app/utils/Scheme";

type GuildMemberListProps = {
	guildData: GuildResponse;
};

type SortMode = "rank" | "gexp";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

const weeklyExp = (m: Member) => Object.values(m.expHistory ?? {}).reduce((a, b) => a + b, 0);

const GuildMemberList = ({ guildData }: GuildMemberListProps) => {
	const [sort, setSort] = React.useState<SortMode>("rank");
	const { members, ranks } = guildData.guild;

	const sorted = React.useMemo(() => {
		const priority: Record<string, number> = {};
		ranks?.forEach((r) => (priority[r.name.toLowerCase()] = r.priority));
		// Guild master is not in the ranks array
		const prio = (m: Member) => (m.rank.toLowerCase() === "guild master" ? Infinity : (priority[m.rank.toLowerCase()] ?? 0));

		return [...members].sort((a, b) => {
			if (sort === "gexp") return weeklyExp(b) - weeklyExp(a);
			const diff = prio(b) - prio(a);
			return diff !== 0 ? diff : a.joined - b.joined;
		});
	}, [members, ranks, sort]);

	const sortButton = (mode: SortMode, label: string) => (
		<button
			className={["px-3 py-1 rounded-lg font-semibold cursor-pointer bg-layer text-content", sort === mode ? "" : "opacity-50"].join(
				" ",
			)}
			onClick={() => setSort(mode)}
		>
			{label}
		</button>
	);

	return (
		<div className="w-full mx-auto flex flex-col items-center justify-center gap-0">
			<div className="w-full flex flex-row items-end justify-between">
				<h2 className="text-2xl font-bold text-center text-accent pt-2 px-6 rounded-t-xl bg-content w-fit">
					Members ({members.length})
				</h2>
				<div className="flex items-center gap-2 bg-content p-1 px-2 rounded-t-xl">
					{sortButton("rank", "Rank")}
					{sortButton("gexp", "Weekly GEXP")}
				</div>
			</div>

			<div className="w-full overflow-x-auto rounded-b-lg">
				<table className="min-w-full w-190 lg:w-full bg-content rounded-b-lg">
					<thead className="text-left text-accent border-b-2">
						<tr>
							<th className="p-2 lg:py-2 text-l lg:text-xl">#</th>
							<th className="p-1 lg:py-2 text-l lg:text-xl">Level</th>
							<th className="p-1 lg:py-2 text-l lg:text-xl">Player</th>
							<th className="p-1 lg:py-2 text-l lg:text-xl">Rank</th>
							<th className="p-1 lg:py-2 text-l lg:text-xl">Weekly GEXP</th>
							<th className="p-1 lg:py-2 text-l lg:text-xl">Joined</th>
						</tr>
					</thead>
					<tbody>
						{sorted.map((member, index) => {
							const hasInfo = !!member.player && !!member.display;
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							const mock = { ...member, stats: {}, guild: undefined, took: 0 } as any;

							const rank = hasInfo ? getPlayerRank(mock) : undefined;
							const scheme = hasInfo ? formatScheme(calcLevel(member.exp ?? 0), mock, false) : undefined;
							const isStale = !!member.queried && Date.now() - member.queried > THIRTY_DAYS_MS;
							const weekly = weeklyExp(member);

							const history = Object.entries(member.expHistory ?? {}).sort(([a], [b]) => b.localeCompare(a));

							return (
								<tr
									key={member.uuid}
									className={[
										"border-b last:border-b-0 hover:bg-accent/10 transition-colors relative",
										isStale ? "opacity-50" : "",
									].join(" ")}
									style={isStale ? { backgroundColor: "rgba(128,128,128,0.2)" } : undefined}
								>
									<td
										className={[
											"p-2 lg:py-2 text-l lg:text-xl",
											index === 0
												? "text-yellow-400"
												: index === 1
													? "text-gray-300"
													: index === 2
														? "text-orange-700"
														: "",
										].join(" ")}
									>
										{index + 1}
									</td>

									<td className="p-1 lg:py-2 lg:px-0 text-l lg:text-xl">
										{scheme && <MinecraftText>{scheme}</MinecraftText>}
									</td>

									<td className="p-1 lg:py-2 text-l lg:text-xl">
										<a href={`/redirect?uuid=${member.uuid}`}>
											{hasInfo && rank ? (
												<MinecraftText>{`${rank.prefix} ${member.player}`}</MinecraftText>
											) : (
												<span className="opacity-70">{member.uuid}</span>
											)}
										</a>
									</td>

									<td className="p-1 lg:py-2 text-l lg:text-xl">{member.rank}</td>

									<td className="p-1 lg:py-2 text-l lg:text-xl">
										<Tooltip
											title={
												<div>
													{history.map(([day, xp]) => (
														<div key={day}>
															{day}: {xp.toLocaleString()}
														</div>
													))}
												</div>
											}
										>
											<span>{weekly.toLocaleString()}</span>
										</Tooltip>
									</td>

									<td className="p-1 lg:py-2 text-l lg:text-xl">{new Date(member.joined).toLocaleDateString()}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default GuildMemberList;
