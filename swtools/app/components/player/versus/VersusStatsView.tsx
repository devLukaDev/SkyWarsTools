"use client";
import React from "react";
import Image from "next/image";
import { OverallResponse } from "@/app/types/OverallResponse";
import { useSearchParams } from "next/navigation";
import { calcLevel, fetcher } from "@/app/utils/Utils";
import { formatScheme } from "@/app/utils/Scheme";
import MinecraftText from "@/app/utils/MinecraftText";
import { getPlayerRank } from "@/app/utils/RankTag";
import PlayerVersusSearch from "./PlayerVersusSearch";
import useSWR from "swr";
import ErrorView from "../../universal/ErrorView";
import Loading from "../../universal/Loading";
import VersusStatsCompare from "./VersusStatsCompare";
import { X } from "lucide-react";
import { SnapshotKeysResponse, SnapshotsResponse } from "@/app/types/Snapshot";
import { Tooltip } from "@mui/material";
import Link from "next/link";
import Alert from "../../universal/Alert";

export function VersusStatsView({ overallData, snapshots }: { overallData: OverallResponse; snapshots: SnapshotsResponse | undefined }) {
	const searchParams = useSearchParams();
	const opponentName = searchParams.get("vs");

	const level = calcLevel(overallData.stats.skywars_experience ?? 0);
	const scheme = formatScheme(level, overallData, false);
	const rank = getPlayerRank(overallData);
	const playerTitle = `${scheme} ${rank.prefix} ${overallData.player}`;

	const {
		data: opponentData,
		isLoading,
		error,
	} = useSWR<OverallResponse>(
		opponentName ? `${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/overall?player=${opponentName}` : null,
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		},
	);

	const { data: snapshotKeys } = useSWR<SnapshotKeysResponse>(
		opponentName && opponentData
			? `${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/snapshotKeys?player=${encodeURIComponent(opponentName)}&page=1`
			: null,
		fetcher,
		{ revalidateOnFocus: false, revalidateOnReconnect: false },
	);

	const keys = (() => {
		if (!snapshotKeys?.data || snapshotKeys.data.length <= 2) return undefined;
		return snapshotKeys.data.slice(0, 2).map((s: { queried: number }) => s.queried);
	})();

	const { data: opponentSnapshots } = useSWR<SnapshotsResponse>(
		opponentName && opponentData && keys && keys.length > 0
			? `${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/getSnapshots?player=${encodeURIComponent(opponentName)}&keys=${keys.join(
					",",
				)}`
			: null,
		fetcher,
		{ revalidateOnFocus: false, revalidateOnReconnect: false },
	);

	if (error) {
		return <ErrorView statusCode={error.statusCode} statusText={error.statusText}></ErrorView>;
	}

	// Not a fan of this code
	let levelOpp;
	let schemeOpp;
	let rankOpp;
	let playerTitleOpp;
	if (opponentName && opponentData) {
		levelOpp = calcLevel(opponentData.stats.skywars_experience ?? 0);
		schemeOpp = formatScheme(levelOpp, opponentData, false);
		rankOpp = getPlayerRank(opponentData);
		playerTitleOpp = `${schemeOpp} ${rankOpp.prefix} ${opponentData.player}`;
	}

	return (
		<>
			<div className="flex flex-col lg:flex-row flex-1 items-center bg-layer p-4 rounded-lg gap-2 lg:gap-0">
				<Link
					className="flex-1 min-w-0 text-xl lg:text-2xl truncate"
					href={"/player/" + encodeURIComponent(overallData.player) + "/stats/table"}
				>
					<MinecraftText>{playerTitle}</MinecraftText>
				</Link>
				<div className="flex flex-shrink-0 flex-col lg:flex-row items-center justify-center w-40">
					<h1 className="text-3xl lg:text-5xl text-center font-semibold animate-scale">VS</h1>
				</div>
				{opponentName && opponentData ? (
					<div className="flex-1 min-w-0 text-xl lg:text-2xl truncate text-right flex flex-row justify-end items-center gap-2">
						<Link href={"/player/" + encodeURIComponent(opponentData.player) + "/stats/table"} className="truncate">
							<MinecraftText>{playerTitleOpp}</MinecraftText>
						</Link>
						<Tooltip title="Try another opponent" placement="top">
							<Link href={`/player/${encodeURIComponent(overallData.player)}/versus`}>
								<X className="ml-2 inline-block h-6 w-6 lg:h-8 lg:w-8 text-gray-400" />
							</Link>
						</Tooltip>
					</div>
				) : (
					<div className="flex-1 min-w-0 text-right text-2xl">
						<PlayerVersusSearch player={overallData.player} />
					</div>
				)}
			</div>
			<div className="flex flex-row flex-1 items-center bg-layer p-4 rounded-lg gap-4">
				<div className="flex-shrink-0 hidden lg:flex items-center justify-center" style={{ width: 150, height: 356 }}>
					<Image
						src={"https://www.mc-heads.net/body/" + encodeURIComponent(overallData.player) + "/right"}
						width={150}
						height={356}
						style={{ width: 150, height: 356 }}
						alt=""
						className="object-contain"
						priority={true}
						onError={(e) => {
							(e.target as HTMLImageElement).style.display = "none";
						}}
					/>
				</div>
				{/* No opponentNAme means no query parameter */}
				{!opponentName && (
					<>
						<div className="w-full h-96 flex-col flex items-center justify-center text-3xl text-center">
							<svg width="64" height="64" viewBox="0 0 32 32" fill="none" className="hidden lg:flex ">
								<path
									d="M8 24L24 8M24 8H12M24 8V20"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							<p className="mb-10">Enter an opponent name to get a versus breakdown of their stats!</p>
						</div>
						<div className="flex-shrink-0 hidden lg:flex items-center justify-center" style={{ width: 150, height: 356 }}>
							<Image src={`/unknownskin.png`} width={150} height={356} alt="Unknown skin" className="object-contain" />
						</div>
					</>
				)}
				{isLoading && (
					<>
						<div className="w-full h-96 flex flex-col items-center justify-center text-3xl text-center">
							<Loading height={200} />
						</div>
						<div className="flex-shrink-0 hidden lg:flex items-center justify-center" style={{ width: 150, height: 356 }}>
							<Loading height={40} />
						</div>
					</>
				)}
				{!isLoading && opponentData && (
					<>
						<div className="w-full h-fit flex flex-col items-center text-3xl text-center">
							<Alert
								variant="info"
								className="mb-4"
								messages={["Each category distributes 100 points", "Hover over values for more information"]}
							></Alert>
							<VersusStatsCompare
								player1={overallData}
								player2={opponentData}
								p1snapshots={snapshots}
								p2snapshots={opponentSnapshots}
							></VersusStatsCompare>
						</div>
						<div className="flex-shrink-0 hidden lg:flex items-center justify-center" style={{ width: 150, height: 356 }}>
							<Image
								src={"https://www.mc-heads.net/body/" + encodeURIComponent(opponentData.player) + "/left"}
								width={150}
								height={356}
								style={{ width: 150, height: 356 }}
								alt={`${opponentData.player} skin`}
								className="object-contain"
								priority={true}
								onError={(e) => {
									(e.target as HTMLImageElement).style.display = "none";
								}}
							/>
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default VersusStatsView;
