"use client";
import { fetcher, timeAgo } from "@/app/utils/Utils";
import { LoaderCircle } from "lucide-react";
import React from "react";
import useSWR from "swr";
import Image from "next/image";

interface SnapshotSelectionProps {
	playerName: string;
	pageType: "compare" | "session";
}

type SnapshotKeysResponse = {
	uuid: string;
	player: string;
	data: SnapshotKey[];
	page: number;
	pageSize: number;
	total: number;
	totalPages: number;
};
type SnapshotKey = {
	queried: number;
	player: string;
};

const SnapshotSelection: React.FC<SnapshotSelectionProps> = ({ playerName, pageType }) => {
	const [page, setPage] = React.useState(1);
	const [snapshots, setSnapshots] = React.useState<SnapshotKey[]>([]);
	const [selected, setSelected] = React.useState<(number | "now")[]>([]); // store queried values

	const { data, isLoading } = useSWR<SnapshotKeysResponse>(
		`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/snapshotKeys?player=${playerName}&page=${page}`,
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		}
	);

	// Append new snapshots when data changes
	React.useEffect(() => {
		if (data?.data) {
			setSnapshots((prev) => {
				const existing = new Set(prev.map((s) => s.queried));
				const filtered = data.data.filter((s) => !existing.has(s.queried));
				return [...prev, ...filtered];
			});
		}
	}, [data]);

	const handleLoadMore = () => {
		if (page < (data?.totalPages ?? 1)) {
			setPage((p) => p + 1);
		}
	};

	const handleSelect = (queried: number) => {
		setSelected((prev) => (prev.includes(queried) ? prev.filter((q) => q !== queried) : [...prev, queried]));
	};

	return (
		<div className="flex flex-col gap-2 w-full justify-center items-center">
			<div className="text-sm text-gray-400 my-1">
				Showing {snapshots.length} of {data?.total ?? 0} snapshots
			</div>
			<div className="overflow-y-auto h-96 w-full lg:w-3/5 rounded-xl shadow p-2 bg-layer flex flex-col gap-1 items-center">
				{/* "Now" snapshot at the top */}
				<button
					key="now"
					className={`flex items-center gap-3 cursor-pointer w-full p-2 border-2 border-[var(--background-layer)] rounded-lg hover:bg-content text-xl animate-press transition ${
						selected.includes("now") ? "bg-content" : ""
					}`}
					onClick={() => setSelected((prev) => (prev.includes("now") ? prev.filter((q) => q !== "now") : [...prev, "now"]))}
					type="button"
				>
					<div className="w-10 h-10 relative">
						<Image
							src={`${process.env.NEXT_PUBLIC_HEADS_API}/${playerName}`}
							alt={playerName}
							fill
							className="rounded"
							sizes="40px"
							style={{ objectFit: "cover" }}
							priority
						/>
					</div>
					<div className="flex flex-col text-left">
						<span className="font-semibold">{snapshots[0]?.player ?? playerName}</span>
						<span className="text-sm text-green-400">Now</span>
					</div>
				</button>
				{snapshots.map((snap) => (
					<button
						key={snap.queried}
						className={`flex items-center gap-3 cursor-pointer w-full p-2 border-2 border-[var(--background-layer)] rounded-lg hover:bg-content text-xl animate-press transition ${
							selected.includes(snap.queried) ? "bg-content" : ""
						}`}
						onClick={() => handleSelect(snap.queried)}
						type="button"
					>
						<div className="w-10 h-10 relative">
							<Image
								src={`${process.env.NEXT_PUBLIC_HEADS_API}/${snap.player}`}
								alt={snap.player}
								fill
								className="rounded"
								sizes="40px"
								style={{ objectFit: "cover" }}
								priority={false}
							/>
						</div>
						<div className="flex flex-col text-left">
							<span className="font-semibold">{snap.player}</span>
							<span className="text-sm text-gray-100">{new Date(snap.queried).toLocaleString()}</span>
						</div>
						<div className="ml-auto text-sm">{timeAgo(snap.queried / 1000)}</div>
					</button>
				))}
				{isLoading && <LoaderCircle className="animate-spin mx-auto w-15 h-15"></LoaderCircle>}
				{page < (data?.totalPages ?? 1) && (
					<button
						className="mt-2 py-2 bg-button font-semibold rounded w-1/2 transition cursor-pointer animate-press"
						onClick={handleLoadMore}
						disabled={isLoading}
						type="button"
					>
						{isLoading ? <LoaderCircle className="animate-spin"></LoaderCircle> : "Load More"}
					</button>
				)}
			</div>
			<button
				className="mt-4 py-2 px-6 bg-button font-semibold text-3xl rounded transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 animate-press"
				disabled={selected.length < 1 || selected.length > 24}
				onClick={() => {
					const queriedList = selected.map((q) => (q === "now" ? "now" : q)).join(",");
					window.location.href = `/player/${playerName}/${pageType}/view?k=${queriedList}`;
				}}
				type="button"
			>
				Continue
			</button>
		</div>
	);
};

export default SnapshotSelection;
