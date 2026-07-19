import PlayerBanner from "@/app/components/player/PlayerBanner";
import PlayerTitle from "@/app/components/player/PlayerTitle";
import RankGraph from "@/app/components/player/RankGraph";
import PlayerOverallStats from "@/app/components/player/PlayerOverallStats";
import PlayerExtraInfo from "@/app/components/player/PlayerExtraInfo";
import React from "react";
import PlayerStatsNavBar from "@/app/components/player/PlayerStatsNavBar";
import { type ReactNode } from "react";
import ErrorView from "@/app/components/universal/ErrorView";
import type { Metadata } from "next";
import { OverallResponse } from "@/app/types/OverallResponse";
import { calcLevel } from "@/app/utils/Utils";
import getMostPlayedKit from "@/app/utils/getMostPlayedKit";
import WeeklyRanks from "@/app/components/player/WeeklyRanks";

interface LayoutProps {
	children: ReactNode;
	params: Promise<{ playerName: string }>;
}

async function fetchOverallData(playerName: string): Promise<OverallResponse | null> {
	try {
		console.log("Getting stats from overall for player " + playerName);
		const res = await fetch(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/overall?player=${encodeURIComponent(playerName)}`);
		if (!res.ok) return null;
		return await res.json();
	} catch {
		return null;
	}
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
	const awaitedParams = await params;
	const playerName = awaitedParams.playerName;

	const statsData = await fetchOverallData(playerName);

	if (!statsData) {
		return {
			title: `${playerName} | SkyWarsTools`,
			description: `View ${playerName}'s SkyWars statistics and progression`,
		};
	}

	const level = calcLevel(statsData.stats.skywars_experience ?? 0).toFixed(0);
	const best_kit = getMostPlayedKit(statsData);
	const maxPrestige = statsData.stats.customs_kitsMaxPrestige ?? 0;

	const description = `
⭐ Level ${level}
🔵 ${statsData.stats.opals ?? 0} opals 💎 ${maxPrestige} prestiges
🔥 Best kit: ${best_kit}

🌍 Global:
⚔️ ${(statsData.stats.kills ?? 0).toLocaleString()} 🥇 ${(statsData.stats.wins ?? 0).toLocaleString()} 💀 ${(
		statsData.stats.losses ?? 0
	).toLocaleString()}

🎲 Mini:
⚔️ ${(statsData.stats.kills_mini ?? 0).toLocaleString()}🥇 ${(statsData.stats.wins_mini ?? 0).toLocaleString()}

👤 Solo:
🎯 ${((statsData.stats.kills_solo ?? 0) / (statsData.stats.deaths_solo ?? 0)).toFixed(2)} KD ⚔️ ${(
		statsData.stats.kills_solo ?? 0
	).toLocaleString()}🥇 ${(statsData.stats.wins_solo ?? 0).toLocaleString()} 💀 ${(statsData.stats.losses_solo ?? 0).toLocaleString()}

👥 Doubles:
🎯 ${((statsData.stats.kills_team ?? 0) / (statsData.stats.deaths_team ?? 0)).toFixed(2)} KD ⚔️ ${(
		statsData.stats.kills_team ?? 0
	).toLocaleString()}🥇 ${(statsData.stats.wins_team ?? 0).toLocaleString()} 💀 ${(statsData.stats.losses_team ?? 0).toLocaleString()}
`;

	const playerHeadUrl = `${process.env.NEXT_PUBLIC_HEADS_API}/${statsData.uuid}`;

	return {
		title: `${statsData.player} | SkyWarsTools`,
		description,
		openGraph: {
			title: `Check ${statsData.player} SkyWars statistics and progression`,
			description,
			images: playerHeadUrl,
			siteName: "SkyWarsTools",
		},
	};
}

const PlayerStatsLayout = async ({ children, params }: LayoutProps) => {
	const awaitedParams = await params;
	let playerName = awaitedParams.playerName;

	const overallData = await fetchOverallData(playerName);
	if (!overallData) {
		return <ErrorView statusText="Not Found" statusCode={404} />;
	}
	playerName = overallData.player;

	// console.log(overallData);

	// Pass overallData as prop to children if needed, or use context if children need it deeply
	return (
		<>
			<PlayerBanner playerName={playerName} />
			<PlayerTitle playerName={playerName} response={overallData} />
			<WeeklyRanks uuid={overallData.uuid}></WeeklyRanks>
			<div className="h-fit w-full flex flex-col lg:flex-row">
				<RankGraph uuid={overallData.uuid} />
				<PlayerOverallStats response={overallData} />
			</div>
			<PlayerExtraInfo response={overallData} />
			<PlayerStatsNavBar />
			{/* If children need overallData, use React.cloneElement or context */}
			{children}
		</>
	);
};

export default PlayerStatsLayout;
