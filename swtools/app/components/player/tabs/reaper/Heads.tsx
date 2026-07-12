import { OverallResponse } from "@/app/types/OverallResponse";
import { headsMap } from "@/app/utils/Utils";
import React from "react";

const Heads: React.FC<{ response: OverallResponse }> = ({ response }) => {
	let totalKills = 0;
	let totalExp = 0;
	headsMap.forEach((key) => {
		const kills = (response.stats[key.key as keyof OverallResponse["stats"]] as number) ?? 0;
		key.playerKills = kills;
		totalKills += kills;
		totalExp += kills * key.exp;
		key.playerEXP = kills * key.exp;
	});

	return (
		<div className="w-full h-fit p-4 flex flex-col lg:flex-row overflow-hidden bg-content lg:rounded-2xl">
			<div className="overflow-x-scroll w-full lg:overflow-x-auto font-semibold text-base lg:text-xl">
				<table className="w-full">
					<thead>
						<tr className="border-t border-b border-white text-accent">
							<th className="text-left px-2">Flavour</th>
							<th className="text-right px-2">Kills Required</th>
							<th className="text-right px-2">EXP/Head</th>
							<th className="text-right px-2">Amount</th>
							<th className="text-right px-2">Amount %</th>
							<th className="text-right px-2">Total EXP</th>
							<th className="text-right px-2">EXP %</th>
						</tr>
					</thead>
					<tbody>
						{headsMap.map((obj) => {
							return (
								<tr key={obj.key}>
									<td className="px-2" style={{ color: obj.color }}>
										{obj.label}
									</td>
									<td className="px-2 text-right">{obj.kills.toLocaleString()}</td>
									<td className="px-2 text-right">{obj.exp}</td>
									<td className="px-2 text-right">{obj.playerKills.toLocaleString()}</td>
									<td className="px-2 text-right">{((obj.playerKills / totalKills) * 100).toFixed(2)}%</td>
									<td className="px-2 text-right">{obj.playerEXP.toLocaleString()}</td>
									<td className="px-2 text-right">{((obj.playerEXP / totalExp) * 100).toFixed(2)}%</td>
								</tr>
							);
						})}
						<tr className="font-bold border-t border-white">
							<td className="px-2">Total</td>
							<td></td>
							<td></td>
							<td className="px-2 text-right">{totalKills.toLocaleString()}</td>
							<td></td>
							<td className="px-2 text-right">{totalExp.toLocaleString()}</td>
							<td></td>
						</tr>
					</tbody>
				</table>
				<br></br>
				<span className="text-base font-bold">
					<span className="text-red-500">NOTE: </span>Since the last update, the EXP amounts are inaccurate because of Mini SkyWars.
				</span>
			</div>
		</div>
	);
};

export default Heads;
