"use client";
import React from "react";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { calcKitPrestigeLevel, calcLevel, fetcher, formatPlaytime, romanize, shortenUUID } from "@/app/utils/Utils";
import { getPlayerRank } from "@/app/utils/RankTag";
import MinecraftText from "@/app/utils/MinecraftText";
import { formatScheme } from "@/app/utils/Scheme";
import { ArrowBigLeft, ArrowBigRight, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, LoaderCircle, Search } from "lucide-react";
import { keys } from "@/app/utils/LeaderboardKeys";
import Tooltip from "@mui/material/Tooltip";
import ErrorView from "@/app/components/universal/ErrorView";
import { LBResponse, LBEntry } from "@/app/types/Leaderboard";

const Page = () => {
	const params = useParams();
	const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : undefined;
	const pageParam = searchParams?.get("page");
	const page = pageParam ? parseInt(pageParam) : 1;
	const highlightParam = searchParams?.get("highlight") || "";
	const [highlight, setHighlight] = React.useState<string>(highlightParam);
	const awaitedParams = params;

	const [errorMsg, setError] = React.useState<string | null>(null);

	// Ref for highlighted row
	const highlightedRowRef = React.useRef<HTMLTableRowElement | null>(null);

	const { data, error, isLoading } = useSWR<LBResponse>(
		`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/getLB/${awaitedParams.key}?page=${page}`,
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		},
	);

	// Scroll to highlighted row after render
	React.useEffect(() => {
		if (highlightedRowRef.current) {
			highlightedRowRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	}, [data, highlight]);

	if (isLoading) {
		return (
			<div className="w-full lg:w-3/4 mx-auto flex flex-col items-center justify-center align-center mt-10">
				<LoaderCircle className="animate-spin w-50 h-50"></LoaderCircle>
				<p className="font-semibold px-4 text-center">
					Generating leaderboards.<br></br>This might take a bit.
				</p>
			</div>
		);
	}
	if (error) {
		return <ErrorView statusCode={404} statusText="Could not get that leaderboard"></ErrorView>;
	}
	if (!data?.entries) {
		return <ErrorView statusCode={400} statusText="Leaderboard has no players?!"></ErrorView>;
	}

	console.log(data);

	const statKey = data?.stat;
	const statInfo = statKey ? keys.find((k) => k.value === statKey) : undefined;
	const siblingKeyNames: Record<string, string> = {};
	if (data?.siblingKeys?.length) {
		data.siblingKeys.forEach((key) => {
			const found = keys.find((k) => k.value === key);
			const short = found?.short;
			if (!short) {
				siblingKeyNames[key] = found?.name ?? key;
			} else {
				siblingKeyNames[key] = short;
			}
		});
	}

	const makeGlitchCheck: boolean = !!statInfo && statInfo.value.includes("_team_") && statInfo.value.includes("_kit_");

	return (
		<>
			<div className="flex flex-row gap-2 justify-center items-center mb-4">
				<div className="flex items-center  border border-accent rounded-lg gap-3 h-10">
					<Search className="px-2 w-10 h-10"></Search>
					<input
						placeholder="Search a player..."
						className=" outline-none w-full p-1 font-semibold"
						onKeyDown={async (e) => {
							if (e.key === "Enter") {
								const playerName = (e.target as HTMLInputElement).value.trim();
								if (!playerName) return;
								try {
									const uuidRes = await fetch(
										`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/getUUID?player=${playerName}`,
									);
									if (!uuidRes.ok) {
										setError("Player not found.");
										return;
									}
									const uuidData = await uuidRes.json();
									const uuid = uuidData?.uuid;
									if (!uuid) {
										setError("Player not found.");
										return;
									}
									const res = await fetch(
										`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/getRank/${awaitedParams.key}?uuid=${shortenUUID(uuid)}`,
									);
									if (!res.ok) {
										setError("Player not on leaderboard!");
										return;
									}
									const data = await res.json();

									const pageSize = 50;
									const pageIndex = data.rank ? Math.floor((data.rank - 1) / pageSize) + 1 : 1;
									if (pageIndex == page) {
										setHighlight(shortenUUID(uuid));
									} else {
										window.location.search = `?page=${pageIndex}&highlight=${shortenUUID(uuid)}`;
									}
								} catch (err: unknown) {
									setError("An error occurred.");
									console.error(err);
								}
							}
						}}
					/>
				</div>
				<div className="flex items-center border border-accent rounded-lg gap-3 h-10 w-40">
					<span className="px-2 w-10 h-10 flex items-center justify-center">#</span>
					<input
						placeholder="Or value..."
						className=" outline-none w-full p-1 font-semibold"
						onKeyDown={async (e) => {
							if (e.key === "Enter") {
								const score = (e.target as HTMLInputElement).value.trim();
								if (!score) return;
								try {
									const res = await fetch(
										`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/getRankByScore/${statKey}?score=${score}`,
									);
									if (!res.ok) {
										setError("Score not found on leaderboard.");
										return;
									}
									const data = await res.json();
									console.log(data);
									const rank = data?.rank;
									if (!rank) {
										setError("Could not determine rank from score.");
										return;
									}
									const pageSize = 50;
									const pageIndex = Math.floor((rank - 1) / pageSize) + 1;
									window.location.search = `?page=${pageIndex}`;
								} catch (err: unknown) {
									setError("An error occurred.");
									console.error(err);
								}
							}
						}}
					/>
				</div>
			</div>
			<div className="flex items-center rounded-lg mx-auto p-1">
				{errorMsg && <span className="text-red-500 font-semibold">{errorMsg}</span>}
			</div>
			<div className="flex items-center rounded-lg mx-auto p-1 mb-1 lg:hidden">
				<span className="text-orange-400 font-semibold text-base text-center">
					You can horizontally scroll the table!<br></br>Use desktop for the best experience.
				</span>
			</div>
			<div className="w-full mx-auto flex flex-col items-center justify-center gap-0">
				<div className="w-full flex flex-row items-end justify-between">
					<h2 className="text-2xl font-bold text-center text-accent pt-2 px-6 rounded-t-xl bg-content w-fit">{statInfo?.name}</h2>
					<div className="flex items-center  bg-content p-1 px-2 rounded-t-xl">
						<Paginator page={page} data={data} />
					</div>
				</div>

				<div className="w-full overflow-x-auto rounded-b-lg">
					<table className="min-w-full w-190 lg:w-full bg-content rounded-b-lg">
						<thead className="text-left text-accent border-b-2">
							<tr>
								<th className="p-2 lg:py-2 text-l lg:text-xl">#</th>
								<th className="p-1 lg:py-2 text-l lg:text-xl">Level</th>
								<th className="p-1 lg:py-2 text-l lg:text-xl">Player</th>
								<th className="p-1 lg:py-2 text-l lg:text-xl">{statInfo?.short || statInfo?.name}</th>
								{data?.siblingKeys?.map((key) => (
									<th key={key} className="p-1 lg:py-2 text-l lg:text-xl animate-press">
										{!key.includes("rating") ? (
											<a href={`/leaderboards/${key}`} className="text-accent hover:underline">
												{siblingKeyNames[key]}
											</a>
										) : (
											siblingKeyNames[key]
										)}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{data?.entries?.map((entry: LBEntry, index: number) => {
								const mockOverallResponse = {
									...entry.info,
									uuid: entry.uuid,
									stats: {},
									guild: undefined,
									took: 0,
									// eslint-disable-next-line @typescript-eslint/no-explicit-any
								} as any;

								const highlighted = highlight === entry.uuid;
								const rank = getPlayerRank(mockOverallResponse);
								const level = calcLevel(entry.info.exp ?? 0);

								const scheme = formatScheme(level, mockOverallResponse, false);

								const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
								const isStale = Date.now() - entry.info.queried > THIRTY_DAYS_MS;
								// const isStale = true;

								const siblingValues = Object.values(entry.siblings);

								// Glitch check only on kit leaderboards
								let glitched = false;
								if (makeGlitchCheck) {
									const statSuffix = statInfo?.value.replace(/^.*?_kit/, "_kit");
									let xp;
									if (statInfo?.value.includes("xp_")) {
										xp = entry.score;
									} else {
										xp = entry.siblings["xp" + statSuffix];
									}
									let kills;
									if (statInfo?.value.includes("kills_")) {
										kills = entry.score;
									} else {
										kills = entry.siblings["kills" + statSuffix];
									}
									if (kills * 25 < xp) {
										glitched = true;
									}
								}

								return (
									<tr
										key={entry.uuid}
										ref={highlighted ? highlightedRowRef : undefined}
										className={[
											"border-b last:border-b-0 hover:bg-accent/10 transition-colors relative",
											isStale ? "opacity-50" : "",
											highlighted ? "bg-yellow-300/10 animate-pulse" : "",
										].join(" ")}
										style={
											isStale
												? { backgroundColor: "rgba(128,128,128,0.2)" }
												: glitched
													? { backgroundColor: "rgba(255,0,0,0.1)" }
													: undefined
										}
									>
										{/* Rank */}
										<td
											className={[
												"p-2 lg:py-2 text-l lg:text-xl relative z-2",
												index + (page - 1) * 50 + 1 === 1
													? "text-yellow-400"
													: index + (page - 1) * 50 + 1 === 2
														? "text-gray-300"
														: index + (page - 1) * 50 + 1 === 3
															? "text-orange-700"
															: "",
											].join(" ")}
										>
											{index + (page - 1) * 50 + 1}
										</td>

										{/* Level */}
										<td className="p-1 lg:py-2 lg:px-0 text-l lg:text-xl relative z-2">
											<MinecraftText>{scheme}</MinecraftText>
										</td>

										{/* Player */}
										<td className="p-1 lg:py-2 text-l lg:text-xl relative z-2">
											<a href={`/redirect?uuid=${entry.uuid}`}>
												<MinecraftText>{`${rank.prefix} ${entry.info.player}`}</MinecraftText>
											</a>
										</td>

										{/* Score */}
										<td className="p-1 lg:py-2 text-l lg:text-xl relative z-2">
											<Tooltip
												title={
													statInfo?.value.includes("time_played")
														? entry.score.toString()
														: statInfo?.value.includes("xp")
															? `Prestige ${romanize(calcKitPrestigeLevel(entry.score))}`
															: ""
												}
											>
												<span>
													{/* Positions are off by 1 in API */}
													{statInfo?.value.includes("time_played")
														? formatPlaytime(entry.score)
														: !statInfo?.value.includes("_position")
															? entry.score.toLocaleString()
															: entry.score + 1}
												</span>
											</Tooltip>
										</td>

										{Object.keys(siblingKeyNames).map((key, idx) => {
											let value = siblingValues[idx] ?? 0;
											// Positions are off by 1 in API
											if (key.includes("_position")) {
												value = value + 1;
											}

											return (
												<Tooltip
													title={
														key.includes("time_played")
															? formatPlaytime(siblingValues[idx])
															: key.includes("xp")
																? `Prestige ${romanize(calcKitPrestigeLevel(siblingValues[idx]))}`
																: ""
													}
													key={key + entry.uuid}
												>
													<td className="p-1 lg:py-2 text-l lg:text-xl relative z-2">{value.toLocaleString()}</td>
												</Tooltip>
											);
										})}
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				<div className="flex items-center bg-content p-1 px-2 m-3 rounded-xl">
					<Paginator page={page} data={data} />
				</div>
				<div className="flex flex-col gap-2 bg-content p-2 px-4 rounded-xl w-fit mx-auto">
					<span className="flex items-center gap-2">
						<span className="inline-block w-4 h-4 rounded" style={{ backgroundColor: "rgba(255,0,0,1)" }}></span>
						<span className="font-semibold text-sm lg:text-base text-white">Stats gained with lucky blocks</span>
					</span>
					<span className="flex items-center gap-2">
						<span className="inline-block w-4 h-4 rounded" style={{ backgroundColor: "rgba(128,128,128,1)" }}></span>
						<span className="font-semibold text-sm lg:text-base text-white">Stale data queried over 30 days ago</span>
					</span>
				</div>
			</div>
		</>
	);
};

const Paginator = ({ page, data }: { page: number; data?: LBResponse }) => {
	return (
		<>
			<button
				className="mr-1 rounded bg-layer text-content font-bold disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
				disabled={page == 1}
				onClick={() => {
					window.location.search = `?page=1`;
				}}
			>
				<ChevronsLeft></ChevronsLeft>
			</button>
			<button
				className="mr-1 rounded bg-layer text-content font-bold disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
				disabled={page <= 1}
				onClick={() => {
					const prevPage = page - 1;
					window.location.search = `?page=${prevPage}`;
				}}
			>
				<ChevronLeft></ChevronLeft>
			</button>
			<input
				type="number"
				className="font-semibold text-lg bg-layer px-0 rounded-xl w-14 text-center"
				defaultValue={page}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						if (e.currentTarget.value === "") return;
						if (parseInt(e.currentTarget.value) < 1) {
							e.currentTarget.value = "1";
						}
						window.location.search = `?page=${e.currentTarget.value}`;
					}
				}}
			/>
			<button
				className="ml-1 rounded bg-layer text-content font-bold disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
				disabled={!data || data.entries.length < 50}
				onClick={() => {
					const nextPage = page + 1;
					window.location.search = `?page=${nextPage}`;
				}}
			>
				<ChevronRight></ChevronRight>
			</button>
			<button
				className="ml-1 rounded bg-layer text-content font-bold disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
				disabled={!data || data.pages === page}
				onClick={() => {
					window.location.search = `?page=${data?.pages}`;
				}}
			>
				<ChevronsRight></ChevronsRight>
			</button>
		</>
	);
};

export default Page;
