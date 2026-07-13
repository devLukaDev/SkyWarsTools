"use client";
import React from "react";
import TabContent from "./TabContent";
import { OverallResponse } from "@/app/types/OverallResponse";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { keys } from "@/app/utils/LeaderboardKeys";

const Legacy: React.FC<OverallResponse> = (response) => {
	const getWLR = (wins: number, losses: number) => {
		if (losses === 0) return wins > 0 ? "∞" : "0.00";
		return (wins / losses).toFixed(2);
	};

	const wlrClass = (wins: number, losses: number) => {
		const wlr = losses === 0 ? (wins > 0 ? Infinity : 0) : wins / losses;
		return wlr > 1 ? "text-green-600" : "";
	};

	const kdrClass = (kills: number, deaths: number) => {
		const kdr = deaths === 0 ? (kills > 0 ? Infinity : 0) : kills / deaths;
		return kdr > 5 ? "text-green-600" : "";
	};

	const ratings = Object.entries(response.stats)
		.filter(([key]) => key.includes("rating"))
		.reduce(
			(acc, [key, value]) => {
				const base = key.replace(/_(position|rating)$/, "");

				acc[base] ??= {};

				if (key.endsWith("_position")) {
					acc[base].position = (value as number) + 1;
				} else {
					acc[base].rating = value as number;
				}

				return acc;
			},
			{} as Record<string, { position?: number; rating?: number }>,
		);

	function getKeyName(value: string): string | undefined {
		return keys.find((key) => key.value === value)?.name;
	}

	let maxPosition = Infinity;
	let maxPositionSeason = "None";
	let maxRating = 0;

	for (const key of Object.keys(ratings)) {
		const { position, rating } = ratings[key];
		if (position && position < maxPosition) {
			maxPosition = position;
			maxPositionSeason = key;
		}
		if (rating && rating > maxRating) maxRating = rating;
	}

	const rankedRanks = {
		Master: 10,
		Diamond: 200,
		Gold: 1500,
		Iron: 5000,
		Stone: 20000,
		Wood: 50000,
	} as const;
	const rankedColors = {
		Master: "seagreen",
		Diamond: "steelblue",
		Gold: "goldenrod",
		Iron: "white",
		Stone: "dimgrey",
		Wood: "sienna",
	};

	const divisionCounts = Object.fromEntries(Object.keys(rankedRanks).map((rank) => [rank, 0])) as Record<
		keyof typeof rankedRanks,
		number
	>;

	for (const { position } of Object.values(ratings)) {
		if (!position) continue;

		for (const [rank, threshold] of Object.entries(rankedRanks)) {
			if (position <= threshold) {
				divisionCounts[rank as keyof typeof rankedRanks]++;
				break;
			}
		}
	}
	const highestDivision = (Object.keys(rankedRanks) as (keyof typeof rankedRanks)[]).find((rank) => divisionCounts[rank] > 0);

	function getRank(position?: number) {
		if (!position) return "Wood";

		return (Object.entries(rankedRanks).find(([, limit]) => position <= limit)?.[0] ?? "Wood") as keyof typeof rankedRanks;
	}

	return (
		<Tabs>
			<TabList className={"bg-main h-10 w-full flex gap-2 items-center px-4 overflow-scroll lg:overflow-auto text-base lg:text-lg"}>
				<Tab
					selectedClassName={"selected-tab"}
					className={"whitespace-nowrap p-1 px-3 rounded-xl font-semibold cursor-pointer animate-press"}
				>
					Lab
				</Tab>
				<Tab
					selectedClassName={"selected-tab"}
					className={"whitespace-nowrap p-1 px-3 rounded-xl font-semibold cursor-pointer animate-press"}
				>
					Ranked
				</Tab>
			</TabList>

			<TabPanel>
				<TabContent>
					<div className="extended-table w-full text-left bg-content font-bold font flex flex-col lg:flex-row lg:text-lg lg:justify-center">
						<div className="w-full text-left bg-content font-bold font flex flex-col lg:flex-row lg:text-lg">
							<table className="p-4 w-full lg:w-[65%] text-left bg-content [&_td]:py-0.5 [&_td]:px-2 [&_th]:px-2">
								<thead className="text-accent">
									<tr>
										<th>Mode</th>
										<th>Wins</th>
										<th>Losses</th>
										<th>WLR</th>
									</tr>
								</thead>
								<tbody className="zebra-rows">
									<tr className="border-b-1 border-white">
										<td>Lab</td>
										<td>{response.stats.wins_lab?.toLocaleString()}</td>
										<td>{response.stats.losses_lab?.toLocaleString()}</td>
										<td className={wlrClass(response.stats.wins_lab ?? 0, response.stats.losses_lab ?? 0)}>
											{getWLR(response.stats.wins_lab ?? 0, response.stats.losses_lab ?? 0).toLocaleString()}
										</td>
									</tr>
									<tr className="border-b-1 border-white">
										<td>Lab Solo</td>
										<td>{response.stats.wins_lab_solo?.toLocaleString()}</td>
										<td>{response.stats.losses_lab_solo?.toLocaleString()}</td>
										<td className={wlrClass(response.stats.wins_lab_solo ?? 0, response.stats.losses_lab_solo ?? 0)}>
											{getWLR(
												response.stats.wins_lab_solo ?? 0,
												response.stats.losses_lab_solo ?? 0,
											).toLocaleString()}
										</td>
									</tr>
									<tr className="border-b-1 border-white">
										<td>Lab Team</td>
										<td>{response.stats.wins_lab_team?.toLocaleString()}</td>
										<td>{response.stats.losses_lab_team?.toLocaleString()}</td>
										<td className={wlrClass(response.stats.wins_lab_team ?? 0, response.stats.losses_lab_team ?? 0)}>
											{getWLR(
												response.stats.wins_lab_team ?? 0,
												response.stats.losses_lab_team ?? 0,
											).toLocaleString()}
										</td>
									</tr>
								</tbody>
							</table>

							<table className="p-4 w-full lg:w-[50%] text-left bg-content [&_td]:py-0.5 [&_td]:px-2 [&_th]:px-2">
								<thead className="text-accent">
									<tr>
										<th className="inline lg:hidden">Mode</th>
										<th>Kills</th>
										<th>Deaths</th>
										<th>KDR</th>
									</tr>
								</thead>
								<tbody className="zebra-rows">
									<tr className="border-b-1 border-white">
										<td className="inline lg:hidden">Lab</td>
										<td>{response.stats.kills_lab?.toLocaleString()}</td>
										<td>{response.stats.deaths_lab?.toLocaleString()}</td>
										<td className={kdrClass(response.stats.kills_lab ?? 0, response.stats.deaths_lab ?? 0)}>
											{getWLR(response.stats.kills_lab ?? 0, response.stats.deaths_lab ?? 0).toLocaleString()}
										</td>
									</tr>
									<tr className="border-b-1 border-white">
										<td className="inline lg:hidden">Lab Solo</td>
										<td>{response.stats.kills_lab_solo?.toLocaleString()}</td>
										<td>{response.stats.deaths_lab_solo?.toLocaleString()}</td>
										<td className={kdrClass(response.stats.kills_solo ?? 0, response.stats.deaths_lab_solo ?? 0)}>
											{getWLR(
												response.stats.kills_lab_solo ?? 0,
												response.stats.deaths_lab_solo ?? 0,
											).toLocaleString()}
										</td>
									</tr>
									<tr className="border-b-1 border-white">
										<td className="inline lg:hidden">Lab Team</td>
										<td>{response.stats.kills_lab_team?.toLocaleString()}</td>
										<td>{response.stats.deaths_lab_team?.toLocaleString()}</td>
										<td className={kdrClass(response.stats.kills_lab_team ?? 0, response.stats.deaths_lab_team ?? 0)}>
											{getWLR(
												response.stats.kills_lab_team ?? 0,
												response.stats.deaths_lab_team ?? 0,
											).toLocaleString()}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div className="w-full text-left bg-content font-bold flex flex-col lg:flex-row lg:text-lg mt-2">
						<table className="p-4 mx-auto w-full lg:w-[65%] text-left bg-content [&_td]:py-0.5 [&_td]:px-2 [&_th]:px-2">
							<thead className="text-accent">
								<tr>
									<th>Mode</th>
									<th>Wins</th>
								</tr>
							</thead>
							<tbody className="zebra-rows">
								<tr className="border-b-1 border-white">
									<td>Rush Wins</td>
									<td>{(response.stats.lab_win_rush_lab ?? 0).toLocaleString()}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Rush Solo Wins</td>
									<td>{(response.stats.lab_win_rush_lab ?? 0).toLocaleString()}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Rush Team Wins</td>
									<td>{(response.stats.lab_win_rush_lab_team ?? 0).toLocaleString()}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Slime Wins</td>
									<td>{(response.stats.lab_win_slime_lab ?? 0).toLocaleString()}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Slime Solo Wins</td>
									<td>{(response.stats.lab_win_slime_lab_solo ?? 0).toLocaleString()}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Slime Team Wins</td>
									<td>{(response.stats.lab_win_slime_lab_team ?? 0).toLocaleString()}</td>
								</tr>
							</tbody>
						</table>
						<table className="p-4 mx-auto w-full lg:w-[65%] text-left bg-content [&_td]:py-0.5 [&_td]:px-2 [&_th]:px-2">
							<thead className="text-accent">
								<tr>
									<th>Mode</th>
									<th>Wins</th>
								</tr>
							</thead>
							<tbody className="zebra-rows">
								<tr className="border-b-1 border-white">
									<td>Lucky Blocks Wins</td>
									<td>{(response.stats.lab_win_lucky_blocks_lab ?? 0).toLocaleString()}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Lucky Blocks Solo Wins</td>
									<td>{(response.stats.lab_win_lucky_blocks_lab_solo ?? 0).toLocaleString()}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Lucky Blocks Team Wins</td>
									<td>{(response.stats.lab_win_lucky_blocks_lab_team ?? 0).toLocaleString()}</td>
								</tr>

								<tr className="border-b-1 border-white">
									<td>
										<br></br>
									</td>
									<td>
										<br></br>
									</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Hunters vs Beasts Wins</td>
									<td>{(response.stats.lab_win_hunters_vs_beasts_lab ?? 0).toLocaleString()}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>
										<br></br>
									</td>
									<td>
										<br></br>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<span className="mt-2 text-base font-bold text-gray-400 pt-4">
						<span className="text-red-500">NOTE: </span>Earlier Lab modes were not tracked by Hypixel. This means there might be
						Rush and Slime wins not tracked.
					</span>
				</TabContent>
			</TabPanel>
			<TabPanel>
				<TabContent>
					<div className="h-200 lg:h-130 grid grid-cols-1 lg:grid-cols-[50%_1fr] gap-2">
						<div className="my-2">
							<table className="p-4 w-full text-left bg-content [&_td]:py-0.5 [&_td]:px-2 [&_th]:px-2">
								<thead className="text-accent">
									<tr>
										<th>Wins</th>
										<th>Losses</th>
										<th>WLR</th>
									</tr>
								</thead>
								<tbody className="zebra-rows">
									<tr className="border-b-1 border-white">
										<td>{response.stats.wins_ranked?.toLocaleString()}</td>
										<td>{response.stats.losses_ranked?.toLocaleString()}</td>
										<td className={wlrClass(response.stats.wins_ranked ?? 0, response.stats.losses_ranked ?? 0)}>
											{getWLR(response.stats.wins_ranked ?? 0, response.stats.losses_ranked ?? 0).toLocaleString()}
										</td>
									</tr>
								</tbody>
								<thead className="text-accent">
									<tr>
										<th>Kills</th>
										<th>Deaths</th>
										<th>KDR</th>
									</tr>
								</thead>
								<tbody>
									<tr className="border-b-1 border-white">
										<td>{response.stats.kills_ranked?.toLocaleString()}</td>
										<td>{response.stats.deaths_ranked?.toLocaleString()}</td>
										<td className={kdrClass(response.stats.kills_ranked ?? 0, response.stats.deaths_ranked ?? 0)}>
											{getWLR(response.stats.kills_ranked ?? 0, response.stats.deaths_ranked ?? 0).toLocaleString()}
										</td>
									</tr>
								</tbody>
							</table>
							<table className="p-4 w-full text-left bg-content [&_td]:py-0.5 [&_td]:px-2 [&_th]:px-2 mt-8">
								<tbody>
									<tr className="border-b-1 border-white">
										<td>Highest Position</td>
										<td>{(maxPosition ? "#" + maxPosition : maxPosition).toLocaleString()}</td>
									</tr>
									<tr className="border-b-1 border-white">
										<td>Highest Position Season</td>
										<td>{(getKeyName(maxPositionSeason + "_position") ?? "None").replaceAll("Ranked", "")}</td>
									</tr>
									<tr className="border-b-1 border-white">
										<td>Highest Rating</td>
										<td>{maxRating.toLocaleString()}</td>
									</tr>
									<tr className="border-b-1 border-white">
										<td>Highest Division</td>
										<td style={{ color: rankedColors[highestDivision ?? "Stone"] }}>
											{(highestDivision ?? "None").toLocaleString()}
										</td>
									</tr>
									<tr>
										<td colSpan={2} style={{ height: "24px" }}></td>
									</tr>
									{Object.entries(divisionCounts).map(([key, value]) => (
										<tr key={key} className="border-b-1 border-white">
											<td>{key} Divisions</td>
											<td>{value}x</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						<div className="w-full flex p-2 min-h-0">
							<div className="w-full flex flex-col gap-2 overflow-y-auto pr-2 min-h-0">
								{Object.entries(ratings).length === 0 ? (
									<div className="w-full h-full flex-1 flex-col flex items-center justify-center rounded-lg bg-layer p-4 text-center text-gray-400">
										<p>No ranked results found...</p>
										<span>Not right? Check the NOTE below!</span>
									</div>
								) : (
									Object.entries(ratings)
										.reverse()
										.map(([mode, data]) => {
											const rank = getRank(data.position);

											return (
												<div
													key={mode}
													className="w-full h-20 flex-none rounded-lg bg-layer p-2 flex flex-row justify-between"
													style={{
														background: `linear-gradient(to right, var(--background-layer), ${rankedColors[rank]})`,
													}}
												>
													<div className="flex justify-between flex-col h-full">
														<p className="text-2xl">
															{(getKeyName(mode + "_position") ?? "").replaceAll("Ranked ", "")}
														</p>
														<p className="text-sm text-gray-300">Rating: {data.rating}</p>
													</div>

													<div className="text-4xl h-full p-2 flex items-center">
														<span className={rank == "Iron" ? "text-black" : ""}>
															#{data.position?.toLocaleString()}
														</span>
													</div>
												</div>
											);
										})
								)}
							</div>
						</div>
					</div>
					<span className="mt-2 text-base font-bold text-gray-400 pt-4">
						<span className="text-red-500">NOTE: </span>Ranked Seasons 24 and those before were not tracked by Hypixel, and can
						thus not be shown here. However, general stats such as kills and wins have been tracked.
					</span>
				</TabContent>
			</TabPanel>
		</Tabs>
	);
};

export default Legacy;
