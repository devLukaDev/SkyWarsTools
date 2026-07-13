import { OverallResponse } from "@/app/types/OverallResponse";
import { formatPlaytime } from "@/app/utils/Utils";
import React from "react";

const Playtime: React.FC<OverallResponse> = (response) => {
	const calcRatio = (stat: number, timePlayed: number): string => {
		return (stat / (timePlayed / 60 / 60)).toFixed(2);
	};
	return (
		<div className="flex lg:p-3 overflow-hidden">
			<div className="w-full h-auto bg-content lg:rounded-2xl py-4 px-6 flex flex-col gap-2 lg:gap-0 font-semibold lg:text-xl">
				<div className="w-full h-auto flex flex-col lg:flex-row">
					<table className="p-4 w-full text-left bg-content ">
						<thead className="text-accent">
							<tr>
								<th>Mode</th>
								<th>Wins</th>
								<th>Wins/H</th>
								<th className="inline lg:hidden">Playtime</th>
							</tr>
						</thead>
						<tbody>
							<tr className="border-b-1 border-white">
								<td>Overall</td>
								<td>{response.stats.wins?.toLocaleString()}</td>
								<td>{calcRatio(response.stats.wins ?? 0, response.stats.time_played ?? 0)}</td>
								<td className="inline lg:hidden">{formatPlaytime(response.stats.time_played ?? 0)}</td>
							</tr>
							<tr className="border-b-1 border-white">
								<td>Solo</td>
								<td>{response.stats.wins_solo?.toLocaleString()}</td>
								<td>{calcRatio(response.stats.wins_solo ?? 0, response.stats.time_played_solo ?? 0)}</td>
								<td className="inline lg:hidden">{formatPlaytime(response.stats.time_played_solo ?? 0)}</td>
							</tr>
							<tr className="border-b-1 border-white">
								<td>Teams</td>
								<td>{response.stats.wins_team?.toLocaleString()}</td>
								<td>{calcRatio(response.stats.wins_team ?? 0, response.stats.time_played_team ?? 0)}</td>
								<td className="inline lg:hidden">{formatPlaytime(response.stats.time_played_team ?? 0)}</td>
							</tr>
							<tr className="border-b-1 border-white">
								<td>Mini</td>
								<td>{(response.stats.wins_mini ?? 0).toLocaleString()}</td>
								<td>{calcRatio(response.stats.wins_mini ?? 0, response.stats.time_played_mini ?? 0)}</td>
								<td className="inline lg:hidden">{formatPlaytime(response.stats.time_played_mini ?? 0)}</td>
							</tr>
							<tr className="border-b-1 border-white">
								<td>Lab</td>
								<td>{response.stats.wins_lab?.toLocaleString()}</td>
								<td>{calcRatio(response.stats.wins_lab ?? 0, response.stats.time_played_lab ?? 0)}</td>
								<td className="inline lg:hidden">{formatPlaytime(response.stats.time_played_lab ?? 0)}</td>
							</tr>
						</tbody>
					</table>

					<table className="p-4 w-full text-left bg-content ">
						<thead className="text-accent">
							<tr>
								<th className="inline lg:hidden">Mode</th>
								<th>Kills</th>
								<th>Kills/H</th>
								<th>Playtime</th>
							</tr>
						</thead>
						<tbody>
							<tr className="border-b-1 border-white">
								<td className="inline lg:hidden">Overall</td>
								<td>{response.stats.kills?.toLocaleString()}</td>
								<td>{calcRatio(response.stats.kills ?? 0, response.stats.time_played ?? 0)}</td>
								<td>{formatPlaytime(response.stats.time_played ?? 0)}</td>
							</tr>
							<tr className="border-b-1 border-white">
								<td className="inline lg:hidden">Solo</td>
								<td>{response.stats.kills_solo?.toLocaleString()}</td>
								<td>{calcRatio(response.stats.kills_solo ?? 0, response.stats.time_played_solo ?? 0)}</td>
								<td>{formatPlaytime(response.stats.time_played_solo ?? 0)}</td>
							</tr>
							<tr className="border-b-1 border-white">
								<td className="inline lg:hidden">Teams</td>
								<td>{response.stats.kills_team?.toLocaleString()}</td>
								<td>{calcRatio(response.stats.kills_team ?? 0, response.stats.time_played_team ?? 0)}</td>
								<td>{formatPlaytime(response.stats.time_played_team ?? 0)}</td>
							</tr>
							<tr className="border-b-1 border-white">
								<td className="inline lg:hidden">Mini</td>
								<td>{(response.stats.kills_mini ?? 0).toLocaleString()}</td>
								<td>{calcRatio(response.stats.kills_mini ?? 0, response.stats.time_played_mini ?? 0)}</td>
								<td>{formatPlaytime(response.stats.time_played_mini ?? 0)}</td>
							</tr>
							<tr className="border-b-1 border-white">
								<td className="inline lg:hidden">Lab</td>
								<td>{response.stats.kills_lab?.toLocaleString()}</td>
								<td>{calcRatio(response.stats.kills_lab ?? 0, response.stats.time_played_lab ?? 0)}</td>
								<td>{formatPlaytime(response.stats.time_played_lab ?? 0)}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<span className="mt-2 text-base font-bold text-gray-400 pt-4">
					<span className="text-red-500">NOTE: </span>Playtime was added to Hypixel later than the release of SkyWars: older players may have inaccurate
					playtime stats.
				</span>
			</div>
		</div>
	);
};

export default Playtime;
