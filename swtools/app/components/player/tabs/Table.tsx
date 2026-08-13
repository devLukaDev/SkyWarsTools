"use client";
import { useState } from "react";
import { OverallResponse } from "@/app/types/OverallResponse";
import TabContent from "./TabContent";

const Table: React.FC<OverallResponse> = (response) => {
	const [showLegacy, setShowLegacy] = useState(true);

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

	return (
		<TabContent>
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
							<td>Overall</td>
							<td>{response.stats.wins?.toLocaleString()}</td>
							<td>{response.stats.losses?.toLocaleString()}</td>
							<td className={wlrClass(response.stats.wins ?? 0, response.stats.losses ?? 0)}>
								{getWLR(response.stats.wins ?? 0, response.stats.losses ?? 0).toLocaleString()}
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Solo</td>
							<td>{response.stats.wins_solo?.toLocaleString()}</td>
							<td>{response.stats.losses_solo?.toLocaleString()}</td>
							<td className={wlrClass(response.stats.wins_solo ?? 0, response.stats.losses_solo ?? 0)}>
								{getWLR(response.stats.wins_solo ?? 0, response.stats.losses_solo ?? 0).toLocaleString()}
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Solo Normal</td>
							<td>{response.stats.wins_solo_normal?.toLocaleString()}</td>
							<td>{response.stats.losses_solo_normal?.toLocaleString()}</td>
							<td className={wlrClass(response.stats.wins_solo_normal ?? 0, response.stats.losses_solo_normal ?? 0)}>
								{getWLR(response.stats.wins_solo_normal ?? 0, response.stats.losses_solo_normal ?? 0).toLocaleString()}
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Solo Insane</td>
							<td>{response.stats.wins_solo_insane?.toLocaleString()}</td>
							<td>{response.stats.losses_solo_insane?.toLocaleString()}</td>
							<td className={wlrClass(response.stats.wins_solo_insane ?? 0, response.stats.losses_solo_insane ?? 0)}>
								{getWLR(response.stats.wins_solo_insane ?? 0, response.stats.losses_solo_insane ?? 0).toLocaleString()}
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Teams</td>
							<td>{response.stats.wins_team?.toLocaleString()}</td>
							<td>{response.stats.losses_team?.toLocaleString()}</td>
							<td className={wlrClass(response.stats.wins_team ?? 0, response.stats.losses_team ?? 0)}>
								{getWLR(response.stats.wins_team ?? 0, response.stats.losses_team ?? 0).toLocaleString()}
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Teams Normal</td>
							<td>{response.stats.wins_team_normal?.toLocaleString()}</td>
							<td>{response.stats.losses_team_normal?.toLocaleString()}</td>
							<td className={wlrClass(response.stats.wins_team_normal ?? 0, response.stats.losses_team_normal ?? 0)}>
								{getWLR(response.stats.wins_team_normal ?? 0, response.stats.losses_team_normal ?? 0).toLocaleString()}
							</td>
						</tr>
						{showLegacy && (
							<tr className="border-b-1 border-white">
								<td>Teams Insane</td>
								<td>{response.stats.wins_team_insane?.toLocaleString()}</td>
								<td>{response.stats.losses_team_insane?.toLocaleString()}</td>
								<td className={wlrClass(response.stats.wins_team_insane ?? 0, response.stats.losses_team_insane ?? 0)}>
									{getWLR(response.stats.wins_team_insane ?? 0, response.stats.losses_team_insane ?? 0).toLocaleString()}
								</td>
							</tr>
						)}
						<tr className="border-b-1 border-white">
							<td>Mini</td>
							<td>{(response.stats.wins_mini ?? 0).toLocaleString()}</td>
							<td>{(response.stats.games_mini ?? 0) - (response.stats.wins_mini ?? 0)}</td>
							<td
								className={wlrClass(
									response.stats.wins_mini ?? 0,
									(response.stats.games_mini ?? 0) - (response.stats.wins_mini ?? 0),
								)}
							>
								{getWLR(response.stats.wins_mini ?? 0, (response.stats.games_mini ?? 0) - (response.stats.wins_mini ?? 0))}
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Lab</td>
							<td>{(response.stats.wins_lab ?? 0).toLocaleString()}</td>
							<td>{(response.stats.losses_lab ?? 0).toLocaleString()}</td>
							<td className={wlrClass(response.stats.wins_lab ?? 0, response.stats.losses_lab ?? 0)}>
								{getWLR(response.stats.wins_lab ?? 0, response.stats.losses_lab ?? 0).toLocaleString()}
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Normal Overall</td>
							<td>{response.stats.customs_wins_normal?.toLocaleString()}</td>
							<td>{response.stats.customs_losses_normal?.toLocaleString()}</td>
							<td className={wlrClass(response.stats.customs_wins_normal ?? 0, response.stats.customs_losses_normal ?? 0)}>
								{getWLR(
									response.stats.customs_wins_normal ?? 0,
									response.stats.customs_losses_normal ?? 0,
								).toLocaleString()}
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Insane Overall</td>
							<td>{response.stats.customs_wins_insane?.toLocaleString()}</td>
							<td>{response.stats.customs_losses_insane?.toLocaleString()}</td>
							<td className={wlrClass(response.stats.customs_wins_insane ?? 0, response.stats.customs_losses_insane ?? 0)}>
								{getWLR(
									response.stats.customs_wins_insane ?? 0,
									response.stats.customs_losses_insane ?? 0,
								).toLocaleString()}
							</td>
						</tr>
						{showLegacy && (
							<>
								<tr className="border-b-1 border-white">
									<td>Mega</td>
									<td>{response.stats.wins_mega?.toLocaleString()}</td>
									<td>{response.stats.losses_mega?.toLocaleString()}</td>
									<td className={wlrClass(response.stats.wins_mega ?? 0, response.stats.losses_mega ?? 0)}>
										{getWLR(response.stats.wins_mega ?? 0, response.stats.losses_mega ?? 0).toLocaleString()}
									</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Mega Doubles</td>
									<td>{response.stats.wins_mega_doubles?.toLocaleString()}</td>
									<td>{response.stats.losses_mega_doubles?.toLocaleString()}</td>
									<td
										className={wlrClass(response.stats.wins_mega_doubles ?? 0, response.stats.losses_mega_doubles ?? 0)}
									>
										{getWLR(
											response.stats.wins_mega_doubles ?? 0,
											response.stats.losses_mega_doubles ?? 0,
										).toLocaleString()}
									</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Ranked</td>
									<td>{response.stats.wins_ranked?.toLocaleString()}</td>
									<td>{response.stats.losses_ranked?.toLocaleString()}</td>
									<td className={wlrClass(response.stats.wins_ranked ?? 0, response.stats.losses_ranked ?? 0)}>
										{getWLR(response.stats.wins_ranked ?? 0, response.stats.losses_ranked ?? 0).toLocaleString()}
									</td>
								</tr>
							</>
						)}
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
							<td className="inline lg:hidden">Overall</td>
							<td>{response.stats.kills?.toLocaleString()}</td>
							<td>{response.stats.deaths?.toLocaleString()}</td>
							<td className={kdrClass(response.stats.kills ?? 0, response.stats.deaths ?? 0)}>
								{getWLR(response.stats.kills ?? 0, response.stats.deaths ?? 0).toLocaleString()}
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td className="inline lg:hidden">Solo</td>
							<td>{response.stats.kills_solo?.toLocaleString()}</td>
							<td>{response.stats.deaths_solo?.toLocaleString()}</td>
							<td className={kdrClass(response.stats.kills_solo ?? 0, response.stats.deaths_solo ?? 0)}>
								{getWLR(response.stats.kills_solo ?? 0, response.stats.deaths_solo ?? 0).toLocaleString()}
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td className="inline lg:hidden">Solo Normal</td>
							<td>{response.stats.kills_solo_normal?.toLocaleString()}</td>
							<td>{response.stats.deaths_solo_normal?.toLocaleString()}</td>
							<td className={kdrClass(response.stats.kills_solo_normal ?? 0, response.stats.deaths_solo_normal ?? 0)}>
								{getWLR(response.stats.kills_solo_normal ?? 0, response.stats.deaths_solo_normal ?? 0).toLocaleString()}
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td className="inline lg:hidden">Solo Insane</td>
							<td>{response.stats.kills_solo_insane?.toLocaleString()}</td>
							<td>{response.stats.deaths_solo_insane?.toLocaleString()}</td>
							<td className={kdrClass(response.stats.kills_solo_insane ?? 0, response.stats.deaths_solo_insane ?? 0)}>
								{getWLR(response.stats.kills_solo_insane ?? 0, response.stats.deaths_solo_insane ?? 0).toLocaleString()}
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td className="inline lg:hidden">Teams</td>
							<td>{response.stats.kills_team?.toLocaleString()}</td>
							<td>{response.stats.deaths_team?.toLocaleString()}</td>
							<td className={kdrClass(response.stats.kills_team ?? 0, response.stats.deaths_team ?? 0)}>
								{getWLR(response.stats.kills_team ?? 0, response.stats.deaths_team ?? 0).toLocaleString()}
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td className="inline lg:hidden">Teams Normal</td>
							<td>{response.stats.kills_team_normal?.toLocaleString()}</td>
							<td>{response.stats.deaths_team_normal?.toLocaleString()}</td>
							<td className={kdrClass(response.stats.kills_team_normal ?? 0, response.stats.deaths_team_normal ?? 0)}>
								{getWLR(response.stats.kills_team_normal ?? 0, response.stats.deaths_team_normal ?? 0).toLocaleString()}
							</td>
						</tr>
						{showLegacy && (
							<tr className="border-b-1 border-white">
								<td className="inline lg:hidden">Teams Insane</td>
								<td>{response.stats.kills_team_insane?.toLocaleString()}</td>
								<td>{response.stats.deaths_team_insane?.toLocaleString()}</td>
								<td className={kdrClass(response.stats.kills_team_insane ?? 0, response.stats.deaths_team_insane ?? 0)}>
									{getWLR(response.stats.kills_team_insane ?? 0, response.stats.deaths_team_insane ?? 0).toLocaleString()}
								</td>
							</tr>
						)}
						<tr className="border-b-1 border-white">
							<td className="inline lg:hidden">Mini</td>
							<td>{(response.stats.kills_mini ?? "0").toLocaleString()}</td>
							<td>{(response.stats.games_mini ?? 0) - (response.stats.wins_mini ?? 0)}</td>
							<td
								className={kdrClass(
									response.stats.kills_mini ?? 0,
									(response.stats.games_mini ?? 0) - (response.stats.wins_mini ?? 0),
								)}
							>
								{getWLR(response.stats.kills_mini ?? 0, (response.stats.games_mini ?? 0) - (response.stats.wins_mini ?? 0))}
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td className="inline lg:hidden">Lab</td>
							<td>{response.stats.kills_lab?.toLocaleString()}</td>
							<td>{response.stats.deaths_lab?.toLocaleString()}</td>
							<td className={kdrClass(response.stats.kills_lab ?? 0, response.stats.deaths_lab ?? 0)}>
								{getWLR(response.stats.kills_lab ?? 0, response.stats.deaths_lab ?? 0).toLocaleString()}
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td className="inline lg:hidden">Normal Overall</td>
							<td>{response.stats.customs_kills_normal?.toLocaleString()}</td>
							<td>{response.stats.customs_deaths_normal?.toLocaleString()}</td>
							<td className={kdrClass(response.stats.customs_kills_normal ?? 0, response.stats.customs_deaths_normal ?? 0)}>
								{getWLR(
									response.stats.customs_kills_normal ?? 0,
									response.stats.customs_deaths_normal ?? 0,
								).toLocaleString()}
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td className="inline lg:hidden">Insane Overall</td>
							<td>{response.stats.customs_kills_insane?.toLocaleString()}</td>
							<td>{response.stats.customs_deaths_insane?.toLocaleString()}</td>
							<td className={kdrClass(response.stats.customs_kills_insane ?? 0, response.stats.customs_deaths_insane ?? 0)}>
								{getWLR(
									response.stats.customs_kills_insane ?? 0,
									response.stats.customs_deaths_insane ?? 0,
								).toLocaleString()}
							</td>
						</tr>
						{showLegacy && (
							<>
								<tr className="border-b-1 border-white">
									<td className="inline lg:hidden">Mega</td>
									<td>{response.stats.kills_mega?.toLocaleString()}</td>
									<td>{response.stats.deaths_mega?.toLocaleString()}</td>
									<td className={kdrClass(response.stats.kills_mega ?? 0, response.stats.deaths_mega ?? 0)}>
										{getWLR(response.stats.kills_mega ?? 0, response.stats.deaths_mega ?? 0).toLocaleString()}
									</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td className="inline lg:hidden">Mega Doubles</td>
									<td>{response.stats.kills_mega_doubles?.toLocaleString()}</td>
									<td>{response.stats.deaths_mega_doubles?.toLocaleString()}</td>
									<td
										className={kdrClass(
											response.stats.kills_mega_doubles ?? 0,
											response.stats.deaths_mega_doubles ?? 0,
										)}
									>
										{getWLR(
											response.stats.kills_mega_doubles ?? 0,
											response.stats.deaths_mega_doubles ?? 0,
										).toLocaleString()}
									</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td className="inline lg:hidden">Ranked</td>
									<td>{response.stats.kills_ranked?.toLocaleString()}</td>
									<td>{response.stats.deaths_ranked?.toLocaleString()}</td>
									<td className={kdrClass(response.stats.kills_ranked ?? 0, response.stats.deaths_ranked ?? 0)}>
										{getWLR(response.stats.kills_ranked ?? 0, response.stats.deaths_ranked ?? 0).toLocaleString()}
									</td>
								</tr>
							</>
						)}
					</tbody>
				</table>
			</div>
			<div className="w-full justify-end flex mt-4">
				<label className="inline-flex items-center gap-2 text-sm font-semibold text-accent cursor-pointer select-none">
					<input
						type="checkbox"
						checked={showLegacy}
						onChange={(event) => setShowLegacy(event.target.checked)}
						className="h-4 w-4"
					/>
					<span>Show Legacy</span>
				</label>
			</div>
		</TabContent>
	);
};

export default Table;
