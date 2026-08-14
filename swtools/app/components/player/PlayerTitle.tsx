"use client";

import React from "react";
import twemoji from "@twemoji/api";
import Image from "next/image";
import MinecraftText from "../../utils/MinecraftText";
import { getPlayerRank } from "@/app/utils/RankTag";
import { calcLevel, fetcher } from "@/app/utils/Utils";
import { formatScheme } from "@/app/utils/Scheme";
import useSWR from "swr";
import { OverallResponse } from "@/app/types/OverallResponse";
import Tooltip from "@mui/material/Tooltip";

interface PlayerTitleProps {
	playerName: string;
	response: OverallResponse;
}
type StatusResponse = {
	success: boolean;
	uuid: string;
	session: {
		online: boolean;
		gameType?: string;
		mode?: string;
	};
};
type UserProfileResponse = {
	success: boolean;
	user?: UserProfile;
	cause?: string;
};

const PlayerTitle: React.FC<PlayerTitleProps> = ({ response }) => {
	const { data, error } = useSWR<StatusResponse>(
		`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/status?player=${response.player}`,
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			shouldRetryOnError: false,
		}
	);

	const [nationality, setNationality] = React.useState<string | null>(null);
	const [emoji, setEmoji] = React.useState<string | null>(null);

	const { data: userInfoData } = useSWR<UserProfileResponse>(
		`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/auth/getUserByMC?player=${response.player}`,
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			shouldRetryOnError: false,
		}
	);
	console.log(userInfoData)

	React.useEffect(() => {
		if (userInfoData && userInfoData.success && userInfoData.user) {
			setNationality(userInfoData.user.nationality ?? null);
			const allowedEmoji: boolean = (userInfoData.user.patreon || userInfoData.user.contrib) ?? false;
			setEmoji(allowedEmoji ? userInfoData.user.emoji ?? null : null);
		}
	}, [userInfoData]);

	// Status
	let bgColor = "bg-red-500";
	let title = "(Appears) Offline";
	if (error) title = "Error fetching status";
	if (data && data.session?.online && !error) {
		if (data.session.gameType === "SKYWARS") {
			bgColor = "bg-green-500 animate-scale";
			title = `Player is in SkyWars! (${data.session.gameType} - ${data.session.mode})`;
		} else {
			bgColor = "bg-yellow-400";
			title = `${data.session.gameType ?? "Online"}${data.session.mode ? ` - ${data.session.mode}` : ""}`;
		}
	}

	// Scheme bits
	const level = calcLevel(response.stats.skywars_experience ?? 0);
	const scheme = formatScheme(level, response, false);

	// Rank
	const rank = getPlayerRank(response);

	// Guild Suffix
	let guildColor: string = "§7";
	let guildTagFormatted: string = "";
	if (response.guild.tag) {
		switch (response.guild.tagColor) {
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

		guildTagFormatted = guildColor + "[" + response.guild.tag + "]";
	}

	// Final assembled title
	const playerTitle = `${scheme} ${rank.prefix} ${response.player}`;

	// Emoji and nationality
	let countryName = "";
	let countryEmoji = "";
	if (nationality) {
		const countryParts = nationality.split(" ");
		countryName = countryParts.slice(0, -1).join(" ");
		countryEmoji = countryParts[countryParts.length - 1];
	}

	return (
		<div className="bg-main h-22 lg:h-25 w-full flex items-center">
			<div className="z-10 relative">
				<img
					alt="player avatar"
					width={100}
					height={100}
					className="rounded h-20 w-20 lg:h-28 lg:w-28 mb-6 lg:mb-12 mx-2 lg:mx-4 z-10 hidden lg:inline"
					src={`${process.env.NEXT_PUBLIC_HEADS_API}/${response.uuid}`}
				/>
				{/* Online status indicator overlay */}
				<span
					title={title}
					className={`absolute top-[-12px] right-[-25px] lg:top-[-8] lg:right-[-10] border-2 border-black rounded-full w-5 h-5 hidden lg:block ${bgColor}`}
				></span>
			</div>

			<div className="w-full lg:h-22 text-3xl lg:text-4xl flex flex-col justify-center px-2 lg:px-4 text-center lg:text-left">
				<div className="flex flex-row gap-2 lg:gap-5 items-center justify-between">
					<div className="flex items-center gap-2 lg:gap-4">
						<span
							title={title}
							className={`border-2 border-black rounded-full w-5 aspect-square block lg:hidden ${bgColor}`}
						></span>
						<MinecraftText>{playerTitle}</MinecraftText> {/* No space for guild tag on mobile*/}
						{emoji && (
							<span
								dangerouslySetInnerHTML={{
									__html: twemoji.parse(emoji ?? "", { folder: "svg", ext: ".svg" }),
								}}
								style={{ width: 42, height: 42, display: "inline-block" }}
							/>
						)}
					</div>
					<div className="hidden lg:block">
						{userInfoData?.user?.bio && (
							<Tooltip placement="top" title={"Supporter bio, get your own by subscribing to Patreon!"}>
								<div className="text-gray-400 italic text-xl">&quot;{userInfoData?.user?.bio}&quot;</div>
							</Tooltip>
						)}
					</div>
				</div>
				<div className="text-xl font-montserrat justify-between lg:flex">
					<div className="items-center gap-2 text-lg hidden lg:flex">
						{nationality && (
							<Tooltip title={countryName ?? ""}>
								<span
									dangerouslySetInnerHTML={{
										__html: twemoji.parse(countryEmoji ?? "", {
											folder: "svg",
											ext: ".svg",
										}),
									}}
									style={{ width: 28, height: 28, display: "inline-block" }}
								/>
							</Tooltip>
						)}
						{response.guild.guild && (
							<span className="font-semibold hidden lg:flex flex-row gap-2 items-center">
								{response.guild.guild} ({response.guild.guildRank}) <MinecraftText>{guildTagFormatted}</MinecraftText>
							</span>
						)}
					</div>

					<div className="hidden lg:flex items-center gap-2 mx-4">
						<a
							href={`https://namemc.com/profile/${response.player}`}
							target="_blank"
							rel="noopener noreferrer"
							className="animate-press-hard"
							style={{ display: "flex" }}
							title="View on NameMC"
						>
							<Image src="/icons/namemc.png" alt="NameMC logo" width={32} height={32} className="inline h-6 w-6" />
						</a>
						<a
							href={`https://www.shmeado.club/player/stats/${response.player}/SkyWars/Table/`}
							target="_blank"
							rel="noopener noreferrer"
							className="inline h-6 w-6 animate-press-hard"
							style={{ display: "flex" }}
							title="View on Shmeado"
						>
							{/* Twemoji smile emoji */}
							<span
								dangerouslySetInnerHTML={{
									__html: twemoji.parse("😁", { folder: "svg", ext: ".svg" }),
								}}
								style={{ width: 42, height: 42, display: "inline-block" }}
							/>
						</a>
						<a
							href={`https://plancke.io/hypixel/player/stats/${response.player}`}
							target="_blank"
							rel="noopener noreferrer"
							className="animate-press-hard"
							style={{ display: "flex" }}
							title="View on Plancke"
						>
							<Image src="/icons/plancke.png" alt="Plancke logo" width={32} height={32} className="inline h-6 w-6" />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlayerTitle;
