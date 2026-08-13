import { OverallResponse } from "@/app/types/OverallResponse";
import React from "react";

type RiskLevel = "low" | "medium" | "high";

const riskStyles: Record<RiskLevel, string> = {
	low: "text-green-400",
	medium: "text-yellow-400",
	high: "text-red-400",
};

const riskLabels: Record<RiskLevel, string> = {
	low: "Low Risk",
	medium: "Medium Risk",
	high: "High Risk",
};

function RiskBadge({ level }: { level: RiskLevel }) {
	return <span className={`font-semibold ${riskStyles[level]}`}>{riskLabels[level]}</span>;
}

const miningKits = [
	"kit_advanced_solo_enchanter",
	"kit_supporting_team_enchanter",
	"kit_advanced_solo_enderman",
	"kit_attacking_team_enderman",
	"kit_basic_solo_speleologist",
	"kit_mining_team_speleologist",
];

function Playstyle({ response }: { response: OverallResponse }) {
	const stats = response.stats;

	const blocksBroken = stats.blocks_broken ?? 0;
	const blocksPlaced = stats.blocks_placed ?? 0;
	const blocksBrokenRatio = blocksPlaced === 0 ? 0 : blocksBroken / blocksPlaced;

	const killsSolo = stats.kills_solo ?? 0;
	const winsSolo = stats.wins_solo ?? 0;
	const killWinRatio = winsSolo === 0 ? killsSolo : killsSolo / winsSolo;

	const survivedPlayers = stats.survived_players ?? 0;
	const kills = stats.kills ?? 0;
	const survivedPlayersRatio = kills === 0 ? 0 : survivedPlayers / kills;

	const hasMiningPerks = JSON.stringify(stats.perkslot ?? {}).includes("solo_mining_expertise");

	const activeKits = [stats.activeKit_SOLO, stats.activeKit_TEAM, stats.activeKit_MINI].filter(Boolean) as string[];
	const activeMiningKits = activeKits.filter((kit) => miningKits.includes(kit));
	const hasMiningKits = activeMiningKits.length > 0;

	const bbRisk: RiskLevel = blocksBrokenRatio > 0.1 ? "high" : blocksBrokenRatio > 0.05 ? "medium" : "low";
	const kwrRisk: RiskLevel = killWinRatio < 5.5 ? "high" : killWinRatio < 6 ? "medium" : "low";
	const sprRisk: RiskLevel = survivedPlayersRatio > 5 ? "high" : survivedPlayersRatio > 4 ? "medium" : "low";
	const perksRisk: RiskLevel = hasMiningPerks ? "high" : "low";
	const kitsRisk: RiskLevel = hasMiningKits ? "high" : "low";

	return (
		<div className="grid grid-cols-2 gap-4">
			<div className="bg-layer w-full p-4 rounded-lg">
				<h2 className="text-2xl text-accent pb-1">Mining Risk</h2>
				<table className="p-4 w-full text-left [&_td]:py-1 [&_td]:px-2 [&_th]:px-2 text-lg">
					{/* <thead className="text-accent">
						<tr>
							<th>Metric</th>
							<th>Value</th>
							<th>Risk</th>
						</tr>
					</thead> */}
					<tbody className="">
						<tr className="border-b-1 border-white">
							<td>Blocks Broken Ratio</td>
							<td>{blocksBrokenRatio.toFixed(2)}</td>
							<td>
								<RiskBadge level={bbRisk} />
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Kill/Win Ratio</td>
							<td>{killWinRatio.toFixed(2)}</td>
							<td>
								<RiskBadge level={kwrRisk} />
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Survived/Kills Ratio</td>
							<td>{survivedPlayersRatio.toFixed(2)}</td>
							<td>
								<RiskBadge level={sprRisk} />
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Has Mining Perks</td>
							<td>{hasMiningPerks ? "Yes" : "No"}</td>
							<td>
								<RiskBadge level={perksRisk} />
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>
								<span title={activeMiningKits.join(", ") || "None"} className="cursor-help underline decoration-dotted">
									Active Mining Kits
								</span>
							</td>
							<td>{hasMiningKits ? "Yes" : "No"}</td>
							<td>
								<RiskBadge level={kitsRisk} />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Playstyle;
