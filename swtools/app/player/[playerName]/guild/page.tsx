import GuildMemberList from "@/app/components/player/guild/GuildMemberList";
import ErrorView from "@/app/components/universal/ErrorView";
import { GuildResponse } from "@/app/types/GuildResponse";
import MinecraftText from "@/app/utils/MinecraftText";
import { calcGuildLevel, calcLevel, formatTimestampToVerboseDate, gameTypeNames, timeAgo } from "@/app/utils/Utils";
import { Tooltip } from "@mui/material";
import Image from "next/image";
import React from "react";
import { Star } from "lucide-react";
import { calcScheme, formatScheme, getLastScheme, getSchemeByReq } from "@/app/utils/Scheme";

export default async function GuildPage({ params }: { params: Promise<{ playerName: string }> }) {
	async function fetchGuildData(playerName: string): Promise<GuildResponse | null> {
		try {
			console.log("Getting stats from overall for player " + playerName);
			const res = await fetch(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/guild?player=${encodeURIComponent(playerName)}`);
			if (!res.ok) return null;
			return await res.json();
		} catch {
			return null;
		}
	}

	const awaitedParams = await params;
	const playerName = awaitedParams.playerName;

	const [guildData]: [GuildResponse | null] = await Promise.all([fetchGuildData(playerName)]);
	if (!guildData) {
		return <ErrorView statusCode={404} statusText={`Player ${playerName} not found or has no SkyWars data.`}></ErrorView>;
	}

	// Guild Suffix
	let guildColor: string = "§7";
	if (guildData.guild && guildData.guild.tag) {
		switch (guildData.guild.tagColor) {
			case "YELLOW":
				guildColor = "§e";
				break;
			case "DARK_AQUA":
				guildColor = "§3";
				break;
			case "DARK_GREEN":
				guildColor = "§2";
				break;
			case "GOLD":
				guildColor = "§6";
				break;
			default:
				guildColor = "§7";
		}
		const finalGuildName = guildData.guild.name + guildColor + " [" + guildData.guild.tag + "]";
		const members = guildData.guild.members;
		const totalWeeklyGexp = members.reduce(
			(total, member) => total + Object.values(member.expHistory ?? {}).reduce((sum, exp) => sum + exp, 0),
			0,
		);
		const averageWeeklyGexp = members.length > 0 ? totalWeeklyGexp / members.length : null;
		const level = members.length > 0 ? members.reduce((sum, member) => sum + calcLevel(member.exp ?? 0), 0) / members.length : 0;

		const presLevel = calcScheme(level).req ?? 9999;
		const scheme = getSchemeByReq(presLevel) ?? getLastScheme();
		const levelStr: string = Math.floor(level).toString();

		let rankColor: string[] | string = scheme.rankColor;
		const iconColor: string = scheme.iconColor;
		const icon = "★";
		let formattedScheme: string = "";

		if (Array.isArray(rankColor)) {
			// Scheme is not just 1 color, its an array
			formattedScheme = scheme.rankColor[0];
			// If below level 100, the array has 1 too many colors - we get rid of the color on index 1, which is 1st number after the bracket basically
			if (level < 100) rankColor = Array.isArray(scheme.rankColor) ? scheme.rankColor.filter((_, i) => i !== 1) : scheme.rankColor;

			// Color for the first bracket, along with the actual bracket itself

			// We go over every digit in the level, and prepend the color from the array for that position
			for (let index = 0; index < levelStr.length; index++) {
				const char = levelStr.charAt(index);
				formattedScheme += rankColor[index + 1] + char;
			}

			// Icon and its color
			formattedScheme += iconColor + icon;
			// We end with the last color from the array, which is for the closing bracket
			formattedScheme += rankColor[rankColor.length - 1];
		} else {
			// Color is a single § code string -> '§2'
			formattedScheme += rankColor + "[" + levelStr + iconColor + icon + "]";
		}

		return (
			<>
				<div className="w-full flex flex-col gap-4 p-6 bg-content">
					<div className="bg-layer w-full flex flex-col gap-4 p-4 lg:p-6 text-3xl lg:text-5xl text-center rounded-xl">
						<MinecraftText>{finalGuildName}</MinecraftText>
						<span className="text-base">{guildData.guild.description}</span>
					</div>

					<section className="flex flex-wrap gap-3 [&>*]:grow *:basis-[calc(50%-0.375rem)] sm:[&>*]:basis-[calc(33.333%-0.5rem)] lg:[&>*]:basis-[calc(20%-0.6rem)]">
						<SummaryStat compact label="Guild Level">
							{calcGuildLevel(guildData.guild.exp)}
						</SummaryStat>
						<SummaryStat compact label="Average SkyWars Level">
							{level === null ? "N/A" : <MinecraftText>{formattedScheme}</MinecraftText>}
						</SummaryStat>
						<SummaryStat compact label="Created">
							<Tooltip title={timeAgo(guildData.guild.created / 1000)}>
								<span>{new Date(guildData.guild.created).toLocaleString(undefined, { year: "numeric", month: "short", day: "numeric" })}</span>
							</Tooltip>
						</SummaryStat>
						<SummaryStat compact label="Members">
							{guildData.guild.members.length}
						</SummaryStat>
						<SummaryStat compact label="Publicly Listed">
							{guildData.guild.publiclyListed ? "Yes" : "No"}
						</SummaryStat>
						<SummaryStat compact label="Online Players">
							{guildData.guild.achievements.ONLINE_PLAYERS}
						</SummaryStat>
						<SummaryStat compact label="Experience Kings">
							{guildData.guild.achievements.EXPERIENCE_KINGS.toLocaleString()}
						</SummaryStat>
						<SummaryStat compact label="Winners">
							{guildData.guild.achievements.WINNERS.toLocaleString()}
						</SummaryStat>
						<SummaryStat compact label="Total Weekly GEXP">
							{totalWeeklyGexp.toLocaleString()}
						</SummaryStat>
						<SummaryStat compact label="Average Player GEXP">
							{averageWeeklyGexp === null ? "N/A" : averageWeeklyGexp.toLocaleString(undefined, { maximumFractionDigits: 1 })}
						</SummaryStat>
					</section>

					{(() => {
						const expByGame = Object.entries(guildData.guild.guildExpByGameType ?? {})
							.filter(([, xp]) => xp > 0)
							.sort(([, a], [, b]) => b - a);
						const totalExp = expByGame.reduce((sum, [, xp]) => sum + xp, 0);
						const preferred = new Set(guildData.guild.preferredGames?.map((g) => g.toUpperCase()));
						const formatGame = (key: string) => gameTypeNames[key] || key;

						return (
							<section className="bg-layer w-full flex flex-col gap-3 p-4 rounded-xl">
								<div>
									<h2 className="text-lg font-bold text-accent">Guild EXP by Game</h2>
								</div>
								<div className="flex gap-3 overflow-x-auto pb-2">
									{expByGame.map(([game, xp]) => {
										const isPreferred = preferred.has(game.toUpperCase());
										const percent = totalExp > 0 ? (xp / totalExp) * 100 : 0;

										return (
											<div
												key={game}
												className={
													"bg-content rounded-xl p-3 flex items-center gap-3 w-64 shrink-0 " +
													(isPreferred ? "enchanted" : "")
												}
											>
												<Image
													src={`/icons/games/${game.toLowerCase()}.png`}
													alt=""
													width={40}
													height={40}
													className="w-12 h-12 object-contain shrink-0 rounded-l"
												/>
												<div className={"min-w-0 flex-1"}>
													<div className="flex items-center gap-1 min-w-0">
														<span className="font-semibold truncate">{formatGame(game)}</span>
													</div>
													<div className="flex justify-between">
														<span className="text-gray-400">{percent.toFixed(1)}%</span>
														<span className="font-bold text-accent shrink-0">{xp.toLocaleString()}</span>
													</div>
												</div>
											</div>
										);
									})}
									{expByGame.length === 0 && <p className="text-sm text-gray-400">No game EXP recorded.</p>}
								</div>
							</section>
						);
					})()}
				</div>
				<div className="p-6 bg-layer ">
					<GuildMemberList guildData={guildData}></GuildMemberList>
				</div>
			</>
		);
	}
}

const SummaryStat = ({ label, children, compact = false }: { label: string; children: React.ReactNode; compact?: boolean }) => (
	<div className={`bg-layer rounded-xl p-4 lg:p-5 flex flex-col justify-between gap-3 ${compact ? "min-h-24" : "min-h-28"}`}>
		<span className="text-sm font-semibold text-gray-400">{label}</span>
		<div className={`${compact ? "text-xl lg:text-2xl" : "text-2xl lg:text-3xl"} font-bold text-accent`}>{children}</div>
	</div>
);
