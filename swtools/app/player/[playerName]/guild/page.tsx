import GuildMemberList from "@/app/components/player/guild/GuildMemberList";
import VersusStatsView from "@/app/components/player/versus/VersusStatsView";
import ErrorView from "@/app/components/universal/ErrorView";
import { GuildResponse } from "@/app/types/GuildResponse";
import { OverallResponse } from "@/app/types/OverallResponse";
import { SnapshotKeysResponse, SnapshotsResponse } from "@/app/types/Snapshot";
import MinecraftText from "@/app/utils/MinecraftText";
import { calcGuildLevel, formatTimestampToVerboseDate, gameTypeNames, timeAgo } from "@/app/utils/Utils";
import { Tooltip } from "@mui/material";
import React from "react";
import { Star } from "lucide-react";

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

		return (
			<>
				<div className="w-full flex flex-col gap-4 p-6 bg-content">
					<div className="bg-layer w-full flex flex-col gap-4 p-4 lg:p-6 text-3xl lg:text-5xl text-center rounded-xl">
						<MinecraftText>{finalGuildName}</MinecraftText>
						<span className="text-base">{guildData.guild.description}</span>
					</div>

					<div className="w-full flex flex-col lg:flex-row gap-4">
						<div className="bg-layer w-full flex flex-col gap-3 p-4 rounded-xl font-bold">
							<span>Details</span>
							<Stat label="Guild Level">{calcGuildLevel(guildData.guild.exp)}</Stat>
							<Stat label="First Login">
								<Tooltip title={timeAgo(guildData.guild.created / 1000)}>
									<span>{formatTimestampToVerboseDate(guildData.guild.created)}</span>
								</Tooltip>
							</Stat>
							<Stat label="Members">{guildData.guild.members.length}</Stat>
							<Stat label="Publicly Listed">{guildData.guild.publiclyListed ? "Yes" : "No"}</Stat>
							<Stat label="Legacy Guild">{guildData.guild.coinsEver > 0 ? "Yes" : "No"}</Stat>
							<span>Achievements</span>
							<Stat label="Online Players">{guildData.guild.achievements.ONLINE_PLAYERS}</Stat>
							<Stat label="Experience Kings">{guildData.guild.achievements.EXPERIENCE_KINGS.toLocaleString()}</Stat>
							<Stat label="Winners">{guildData.guild.achievements.WINNERS.toLocaleString()}</Stat>
						</div>

						<div className="bg-layer w-full flex flex-col gap-3 p-4 rounded-xl font-bold"></div>
						{(() => {
							const expByGame = Object.entries(guildData.guild.guildExpByGameType ?? {}).sort(([, a], [, b]) => b - a);
							const totalExp = expByGame.reduce((sum, [, xp]) => sum + xp, 0);
							const preferred = new Set(guildData.guild.preferredGames.map((g) => g.toUpperCase()));
							const formatGame = (key: string) => gameTypeNames[key] || key;

							return (
								<div className="bg-layer w-full flex flex-col p-4 rounded-xl font-bold overflow-y-scroll max-h-100">
									<span className="mb-2">Guild EXP by Game</span>
									{expByGame.map(([game, xp]) => {
										const isPreferred = preferred.has(game.toUpperCase());
										const percent = totalExp > 0 ? (xp / totalExp) * 100 : 0;

										return (
											<div key={game} className="flex justify-between items-center gap-2">
												<span
													className={`flex items-center gap-1 text-base ${isPreferred ? "text-accent" : "text-gray-400"}`}
												>
													{isPreferred && <Star className="w-4 h-4 fill-current" />}
													{formatGame(game)}
												</span>
												<Tooltip title={`${xp.toLocaleString()} EXP`}>
													<span className="text-base">{percent.toFixed(1)}%</span>
												</Tooltip>
											</div>
										);
									})}
								</div>
							);
						})()}
					</div>
				</div>
				<div className="p-6 bg-layer ">
					<GuildMemberList guildData={guildData}></GuildMemberList>
				</div>
			</>
		);
	}
}

const Stat = ({ label, children }: { label: string; children: React.ReactNode }) => (
	<div className="flex justify-between items-center gap-2">
		<span className="text-gray-400 font-normal">{label}</span>
		<span>{children}</span>
	</div>
);
