
import { getKitPrestigeInfo, KitPrestigeInfo, parseKitStatsKey, romanize } from "@/app/utils/Utils";
import { createTheme, ThemeProvider } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import React from "react";

const KitPrestigeBreakdown: React.FC<Record<string, number | undefined>> = (stats) => {
	// Extract kit names - every kit should have time_played, if not theres no stats anyway
	const kitNames = Object.keys(stats)
		.filter((key) => key.startsWith("xp_kit_"))
		.map((key) => key.replace(/^xp_/, ""));

	const modeCounts = {
		normal: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 },
		insane: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 },
		mythic: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 },
		mini: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 },
		mega: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 },
		ranked: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 },
	};
	const totalCounts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };

	type KitXP = {
		kit: string;
		xp: number;
		prestige: KitPrestigeInfo;
	};
	const modeXPs = {
		normal: [] as KitXP[],
		insane: [] as KitXP[],
		mythic: [] as KitXP[],
		mini: [] as KitXP[],
		mega: [] as KitXP[],
		ranked: [] as KitXP[],
	};

	const kitPrestiges: KitPrestigeInfo[] = kitNames.map((kit) => {
		const mega: boolean = kit.includes("_mega_");

		const xp: number =
			typeof stats[`xp_${kit}` as keyof typeof stats] === "number" ? (stats[`xp_${kit}` as keyof typeof stats] as number) : 0;
		const currentPrestige: KitPrestigeInfo = getKitPrestigeInfo(xp ?? 0, mega);

		const mode: string = parseKitStatsKey(kit).mode;
		totalCounts[currentPrestige.key as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7]++;
		switch (mode) {
			case "Solo":
				modeCounts.normal[currentPrestige.key as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7]++;
				modeXPs.normal.push({ kit, xp, prestige: currentPrestige });
				break;
			case "Team":
				modeCounts.insane[currentPrestige.key as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7]++;
				modeXPs.insane.push({ kit, xp, prestige: currentPrestige });
				break;
			case "Mythical":
				modeCounts.mythic[currentPrestige.key as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7]++;
				modeXPs.mythic.push({ kit, xp, prestige: currentPrestige });
				break;
			case "Mini":
				modeCounts.mini[currentPrestige.key as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7]++;
				modeXPs.mini.push({ kit, xp, prestige: currentPrestige });
				break;
			case "Mega":
				modeCounts.mega[currentPrestige.key as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7]++;
				modeXPs.mega.push({ kit, xp, prestige: currentPrestige });
				break;
			case "Ranked":
				modeCounts.ranked[currentPrestige.key as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7]++;
				modeXPs.ranked.push({ kit, xp, prestige: currentPrestige });
				break;
		}

		return currentPrestige;
	});
	console.log(kitPrestiges);
	return (
		<div className="min-h-160 flex flex-col gap-4">
			<div className="w-full overflow-x-auto">
				<table className="w-full text-left border-collapse">
					<thead>
						<tr>
							<th className="border-b px-2 py-1 whitespace-nowrap">Prestige</th>
							<th className="border-b px-2 py-1 whitespace-nowrap">Normal</th>
							<th className="border-b px-2 py-1 whitespace-nowrap">Insane</th>
							<th className="border-b px-2 py-1 whitespace-nowrap">Mythic</th>
							<th className="border-b px-2 py-1 whitespace-nowrap">Mini</th>
							<th className="border-b px-2 py-1 whitespace-nowrap">Mega</th>
							<th className="border-b px-2 py-1 whitespace-nowrap">Ranked</th>
						</tr>
					</thead>
					<tbody>
						{[7, 6, 5, 4, 3, 2, 1].map((prestige) => (
							<tr key={prestige}>
								<td className="border-b px-2 py-1 whitespace-nowrap">Prestige {prestige}</td>
								<td className="border-b px-2 py-1 whitespace-nowrap">
									{modeCounts.normal[prestige as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7]}
								</td>
								<td className="border-b px-2 py-1 whitespace-nowrap">
									{modeCounts.insane[prestige as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7]}
								</td>
								<td className="border-b px-2 py-1 whitespace-nowrap">
									{modeCounts.mythic[prestige as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7]}
								</td>
								<td className="border-b px-2 py-1 whitespace-nowrap">
									{modeCounts.mini[prestige as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7]}
								</td>
								<td className="border-b px-2 py-1 whitespace-nowrap">
									{modeCounts.mega[prestige as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7]}
								</td>
								<td className="border-b px-2 py-1 whitespace-nowrap">
									{modeCounts.ranked[prestige as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7]}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
				<BarChart
					series={[
						{ data: Object.values(modeCounts.normal).slice(1), label: "Normal", id: "Normal", stack: "a" },
						{ data: Object.values(modeCounts.insane).slice(1), label: "Insane", id: "Insane", stack: "a" },
						{ data: Object.values(modeCounts.mythic).slice(1), label: "Mythical", id: "Mythical", stack: "a" },
						{ data: Object.values(modeCounts.mini).slice(1), label: "Mini", id: "Mini", stack: "a" },
						{ data: Object.values(modeCounts.mega).slice(1), label: "Mega", id: "Mega", stack: "a" },
						{ data: Object.values(modeCounts.ranked).slice(1), label: "Ranked", id: "Ranked", stack: "a" },
					]}
					xAxis={[
						{
							data: Object.keys(modeCounts.normal)
								.slice(1)
								.map((key) => romanize(Number(key))),
							label: "Prestige Level",
						},
					]}
					yAxis={[{ width: 30 }]}
				/>
			</ThemeProvider>
		</div>
	);
};

export default KitPrestigeBreakdown;
