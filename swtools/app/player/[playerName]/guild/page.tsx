import GuildMemberList from "@/app/components/player/guild/GuildMemberList";
import VersusStatsView from "@/app/components/player/versus/VersusStatsView";
import ErrorView from "@/app/components/universal/ErrorView";
import { GuildResponse } from "@/app/types/GuildResponse";
import { OverallResponse } from "@/app/types/OverallResponse";
import { SnapshotKeysResponse, SnapshotsResponse } from "@/app/types/Snapshot";
import MinecraftText from "@/app/utils/MinecraftText";
import { calcHypixelLevel, formatTimestampToVerboseDate, timeAgo } from "@/app/utils/Utils";
import { Tooltip } from "@mui/material";
import React from "react";

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
				<div className="bg-content w-full h-fit flex flex-col gap-4 p-6 text-5xl text-center">
					<MinecraftText>{finalGuildName}</MinecraftText>
				</div>

				<div className="w-full bg-content p-4 justify-around font-bold hidden lg:flex">
					<span>
						<span className="text-gray-400 font-normal">Guild Level:</span> {calcHypixelLevel(guildData.guild.exp)}
					</span>
					<span>
						<span className="text-gray-400 font-normal">First Login:</span>{" "}
						<Tooltip title={timeAgo(guildData.guild.created / 1000)}>
							<span>{formatTimestampToVerboseDate(guildData.guild.created)}</span>
						</Tooltip>
					</span>
					<span>
						<span className="text-gray-400 font-normal">Members: </span> {guildData.guild.members.length}
					</span>
					<span>
						<span className="text-gray-400 font-normal">Publicly Listed: </span> {guildData.guild.publiclyListed ? "Yes" : "No"}
					</span>
				</div>

				<div className="w-full bg-content p-4 justify-around font-bold hidden lg:flex rounded-b-xl">
					<span>
						<span className="text-gray-400 font-normal">Online Players:</span> {guildData.guild.achievements.ONLINE_PLAYERS}
					</span>
					<span>
						<span className="text-gray-400 font-normal">Experience Kings: </span>{" "}
						{guildData.guild.achievements.EXPERIENCE_KINGS.toLocaleString()}
					</span>
					<span>
						<span className="text-gray-400 font-normal">Winners: </span> {guildData.guild.achievements.WINNERS}
					</span>
				</div>
				<div className="">
					<GuildMemberList guildData={guildData}>
						
					</GuildMemberList>

				</div>
			</>
		);
	}
}
