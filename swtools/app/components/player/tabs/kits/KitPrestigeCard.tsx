import MinecraftText from "@/app/utils/MinecraftText";
import { getSchemeByKit, Scheme } from "@/app/utils/Scheme";
import { formatSchemePreview, getKitPrestigeInfoByPrestige, KitPrestigeInfo, parseKitStatsKey, toCamelCase } from "@/app/utils/Utils";
import Tooltip from "@mui/material/Tooltip";
import { MessageCircleWarning } from "lucide-react";
import React from "react";
type KitStats = {
	wins?: number;
	losses?: number;
	kills?: number;
	deaths?: number;
	timePlayed?: number;
	xp?: number;
};
type KitPrestigeCardProps = {
	kitName: string;
	stats: KitStats;
	currentPrestige: KitPrestigeInfo;
	nextPrestige: KitPrestigeInfo;
	playerLevel: number;
};
const KitPrestigeCard: React.FC<KitPrestigeCardProps> = ({ kitName, stats, currentPrestige, nextPrestige, playerLevel }) => {
	type KitObject = {
		original: string;
		stat: string;
		mode: string;
		kit: string;
	};
	const modeFixer = (mode: string): string => {
		switch (mode) {
			case "Solo":
				return "Normal";
			case "Team":
				return "Insane";
			case "Mini":
				return "Mini";
			case "Ranked":
				return "Ranked";
			case "Mega":
				return "Mega";
			default:
				return "Mythic";
		}
	};
	const kitObject: KitObject = parseKitStatsKey(kitName);
	const properMode = modeFixer(kitObject.mode);
	const staleMode = properMode == "Ranked";
	const mega = properMode == "Mega";

	let maxed = false;
	if (nextPrestige.key === 0) {
		nextPrestige = currentPrestige;
		maxed = true;
	}

	// States
	const initialPrestigeGoal = nextPrestige;
	const [prestigeGoal, setPrestigeGoal] = React.useState<KitPrestigeInfo>(initialPrestigeGoal);

	const initialXpPerHour = stats.xp && stats.timePlayed ? Math.round(stats.xp / (stats.timePlayed / 3600)) : 0;
	const [customXpPerHour, setCustomXpPerHour] = React.useState(initialXpPerHour);

	let glitched = false;
	if (kitName.includes("team") || kitName.includes("mythic")) {
		const xp = stats.xp ?? 0;
		const kills = stats.kills ?? 0;
		if (kills * 25 < xp) {
			glitched = true;
		}
	}

	const percent = stats.xp ? Math.round((stats.xp / (mega ? prestigeGoal.megaXp : prestigeGoal.minXp)) * 100) : 0;

	const xpRequired = (mega ? prestigeGoal.megaXp : prestigeGoal.minXp) - (stats.xp ?? 0);
	const playtimeRequiredSeconds = stats.xp && stats.timePlayed ? Math.ceil(xpRequired / (customXpPerHour / 3600)) : 0;

	const initialWinsPerHour = stats.wins && stats.timePlayed ? Math.round(stats.wins / (stats.timePlayed / 3600)) : 0;
	const [winsPerHour, setWinsPerHour] = React.useState(
		stats.wins && stats.timePlayed ? Math.round(stats.wins / (stats.timePlayed / 3600)) : 0,
	);
	const initialKillsPerHour = stats.kills && stats.timePlayed ? Math.round(stats.kills / (stats.timePlayed / 3600)) : 0;
	const [killsPerHour, setKillsPerHour] = React.useState(
		stats.kills && stats.timePlayed ? Math.round(stats.kills / (stats.timePlayed / 3600)) : 0,
	);

	const winsInRequiredPlaytime = Math.ceil(winsPerHour * (playtimeRequiredSeconds / 3600));
	const killsInRequiredPlaytime = Math.ceil(killsPerHour * (playtimeRequiredSeconds / 3600));
	const winsAtGoalPrestige = (stats.wins ?? 0) + winsInRequiredPlaytime;
	const killsAtGoalPrestige = (stats.kills ?? 0) + killsInRequiredPlaytime;

	// Make preview for pres 7 scheme into a string using player level (no icon though)
	const pres7Scheme: Scheme | undefined = getSchemeByKit(kitObject.kit, kitObject.mode);
	const previewSchemeString: string | null = pres7Scheme ? formatSchemePreview(pres7Scheme, playerLevel) : null;

	const [maxHeight, setMaxHeight] = React.useState<number>(30);

	// Helper to format seconds to h, m
	const formatTime = (seconds: number) => {
		const h = Math.floor(seconds / 3600);
		const m = Math.floor((seconds % 3600) / 60);
		return `${h}h ${m}m`;
	};

	function toggleHeight() {
		if (maxHeight == 30) {
			setMaxHeight(150);
		} else {
			setMaxHeight(30);
		}
	}

	return (
		<div
			className={
				`bg-gray-900 rounded-xl p-4 w-85 h-${maxHeight} overflow-hidden cursor-pointer shadow-lg border ` +
				(maxed ? "enchanted border-amber-400" : glitched ? "border-red-500 bg-red-900/50" : "border-gray-700") +
				(staleMode ? " border-gray-600 pointer-events-none opacity-60" : "")
			}
			onClick={() => toggleHeight()}
		>
			<div className="flex justify-between items-center mb-2">
				<span className="text-lg font-semibold flex gap-2">
					{kitObject.kit} - {properMode}
					{glitched ? (
						<Tooltip title="This kit was leveled up suspiciously fast, and is likely glitched using a lab mode.">
							<MessageCircleWarning className="inline cursor-help text-white w-4 h-4" />
						</Tooltip>
					) : null}
				</span>
				<span className="text-xl font-semibold">{currentPrestige.name}</span>
			</div>
			<div className="flex justify-between items-center mb-2">
				<span className="text-gray-300 text-sm">
					{stats.xp?.toLocaleString() ?? 0} / {(mega ? prestigeGoal.megaXp : prestigeGoal.minXp).toLocaleString()} EXP
				</span>
				<span className="text-gray-300 text-sm">{initialXpPerHour} EXP/h</span>
			</div>
			<div className="w-full h-4 rounded-full bg-gray-600 mb-4 relative">
				<div
					className="h-4 rounded-full"
					style={{
						width: `${Math.min(percent, 100)}%`,
						background: `${prestigeGoal.color}`,
					}}
				/>
				<span className="absolute inset-0 flex items-center justify-center text-black font-bold text-sm">{percent}%</span>
			</div>
			<div className="grid grid-cols-1 gap-2 text-sm mb-2 rounded p-2" onClick={(e) => e.stopPropagation()}>
				<table className="w-full">
					<tbody>
						<tr>
							<td className="w-3/5 pr-2 font-medium align-middle">EXP per Hour</td>
							<td className="w-2/5 pl-2 align-middle">
								<input
									onKeyDown={(e) => {
										if (e.key === "Escape") {
											setCustomXpPerHour(initialXpPerHour);
										}
									}}
									className="w-full text-lg rounded border border-gray-300 text-center"
									onChange={(e) => setCustomXpPerHour(Number(e.target.value))}
									value={customXpPerHour}
								></input>
							</td>
						</tr>
						<tr>
							<td className="w-3/5 pr-2 font-medium align-middle">Target Prestige</td>
							<td className="w-2/5 pl-2 align-middle">
								<input
									className="w-full text-lg rounded border border-gray-300 text-center"
									value={prestigeGoal.key}
									onChange={(e) => setPrestigeGoal(getKitPrestigeInfoByPrestige(Number(e.target.value)))}
									onKeyDown={(e) => {
										if (e.key === "Escape") {
											setPrestigeGoal(initialPrestigeGoal);
										}
									}}
								></input>
							</td>
						</tr>
						<tr>
							<td className="w-3/5 pr-2 font-medium align-middle">Playtime Required</td>
							<td className="w-2/5 pl-2 align-middle">
								<input
									className="w-full text-lg rounded border border-gray-300 bg-content text-center"
									value={playtimeRequiredSeconds > 0 ? formatTime(playtimeRequiredSeconds) : "N/A"}
									disabled={true}
								></input>
							</td>
						</tr>
						<tr>
							<td className="w-3/5 pr-2 font-medium align-middle">EXP Required</td>
							<td className="w-2/5 pl-2 align-middle">
								<input
									className="w-full text-lg rounded border border-gray-300 bg-content text-center"
									value={xpRequired > 0 ? xpRequired.toLocaleString() : "N/A"}
									disabled={true}
								></input>
							</td>
						</tr>
						<tr className="h-2"></tr>
						<tr>
							<td className="w-3/5 pr-2 font-medium align-middle">Wins per Hour</td>
							<td className="w-2/5 pl-2 align-middle">
								<input
									className="w-full text-lg rounded border border-gray-300 text-center"
									value={winsPerHour}
									onChange={(e) => setWinsPerHour(Number(e.target.value))}
									onKeyDown={(e) => {
										if (e.key === "Escape") {
											setWinsPerHour(initialWinsPerHour);
										}
									}}
								></input>
							</td>
						</tr>
						<tr>
							<td className="w-3/5 pr-2 font-medium align-middle">Kills per Hour</td>
							<td className="w-2/5 pl-2 align-middle">
								<input
									className="w-full text-lg rounded border border-gray-300 text-center"
									value={killsPerHour}
									onChange={(e) => setKillsPerHour(Number(e.target.value))}
									onKeyDown={(e) => {
										if (e.key === "Escape") {
											setKillsPerHour(initialKillsPerHour);
										}
									}}
								></input>
							</td>
						</tr>
						<tr>
							<td className="w-3/5 pr-2 font-medium align-middle">
								Wins in {playtimeRequiredSeconds > 0 ? formatTime(playtimeRequiredSeconds) : "N/A"}
							</td>
							<td className="w-2/5 pl-2 align-middle">
								<input
									className="w-full text-lg rounded border border-gray-300 bg-content text-center"
									value={winsInRequiredPlaytime > 0 ? winsInRequiredPlaytime : "N/A"}
									disabled={true}
								></input>
							</td>
						</tr>
						<tr>
							<td className="w-3/5 pr-2 font-medium align-middle h-1">
								Kills in {playtimeRequiredSeconds > 0 ? formatTime(playtimeRequiredSeconds) : "N/A"}
							</td>
							<td className="w-2/5 pl-2 align-middle">
								<input
									className="w-full text-lg rounded border border-gray-300 bg-content text-center"
									value={killsInRequiredPlaytime > 0 ? killsInRequiredPlaytime : "N/A"}
									disabled={true}
								></input>
							</td>
						</tr>
						<tr>
							<td className="w-3/5 pr-2 font-medium align-middle h-1">Kit Wins at {prestigeGoal.name}</td>
							<td className="w-2/5 pl-2 align-middle">
								<input
									className="w-full text-lg rounded border border-gray-300 bg-content text-center"
									value={winsAtGoalPrestige > 0 ? winsAtGoalPrestige : "N/A"}
									disabled={true}
								></input>
							</td>
						</tr>
						<tr>
							<td className="w-3/5 pr-2 font-medium align-middle h-1">Kit Kills at {prestigeGoal.name}</td>
							<td className="w-2/5 pl-2 align-middle">
								<input
									className="w-full text-lg rounded border border-gray-300 bg-content text-center"
									value={killsAtGoalPrestige > 0 ? killsAtGoalPrestige : "N/A"}
									disabled={true}
								></input>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className="bg-gray-800 rounded p-2 text-sm text-center font-semibold text-white">
				{maxed ? (
					<>
						<span>Max Prestige Reached</span>
						<br></br>
						<span className="flex flex-col text-lg items-center justify-center mt-2">
							<span className="text-l">Obtained</span>
							<MinecraftText>
								{"" +
									toCamelCase(getSchemeByKit(kitObject.kit, kitObject.mode)?.name ?? "Unknown") +
									" Scheme - " +
									previewSchemeString}
								{}
							</MinecraftText>
						</span>
					</>
				) : (
					<>
						Rewards for Prestige {prestigeGoal.name}
						<div className=" rounded text-center text-lg">
							{prestigeGoal.rewards.map((reward, index) => (
								<MinecraftText key={index}>{reward}</MinecraftText>
							))}
							{prestigeGoal.name == "VII" && (
								<MinecraftText>
									{"" +
										toCamelCase(getSchemeByKit(kitObject.kit, kitObject.mode)?.name ?? "Unknown") +
										" Scheme - " +
										previewSchemeString}
									{}
								</MinecraftText>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default KitPrestigeCard;
