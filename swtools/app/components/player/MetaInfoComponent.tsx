"use client";

import { CloudCheck } from "lucide-react";
import React from "react";
import useSWR from "swr";
import { fetcher } from "@/app/utils/Utils";
import { MetaInfoResponse } from "@/app/types/MetaInfoResponse";
import SnapshotCooldown from "./SnapshotCooldown";

const MetaInfoComponent = ({
	uuid,
	savedTheseStats,
	saveTime,
	nextSaveTime,
}: {
	uuid: string;
	savedTheseStats: boolean;
	saveTime: Date;
	nextSaveTime?: Date;
}) => {
	const { data: typedMetaInfo, isLoading } = useSWR<MetaInfoResponse>(
		`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/queryStats?uuid=${uuid}`,
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		},
	);

	const [open, setOpen] = React.useState(false);

	// console.log(savedTheseStats, saveTime, nextSaveTime);

	return (
		<>
			<div className="ml-auto relative">
				<div className="flex flex-row gap-2 justify-center items-center">
					<span className="hidden lg:inline font-light">{savedTheseStats ? "Snapshot saved!" : "On cooldown for "}</span>
					<div
						className="inline-flex h-8 items-center justify-center cursor-pointer rounded"
						onMouseEnter={() => setOpen(true)}
						onMouseLeave={() => setOpen(false)}
						onFocus={() => setOpen(true)}
						onBlur={() => setOpen(false)}
						tabIndex={0}
						role="button"
						aria-label="Snapshot and metainfo details"
						aria-expanded={open}
					>
						{savedTheseStats == false ? (
							<SnapshotCooldown saveTime={saveTime} nextSaveTime={nextSaveTime!} />
						) : (
							<CloudCheck className="text-green-500" />
						)}
					</div>
				</div>

				<div
					className={`absolute right-0 top-full mt-2 z-40 w-80 rounded-md border border-border bg-content p-3 text-sm shadow-lg transition-opacity ${
						open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
					}`}
					onMouseEnter={() => setOpen(true)}
					onMouseLeave={() => setOpen(false)}
				>
					<p className="mt-0 text-gray-300">
						{savedTheseStats
							? "A snapshot of these main stats was just saved."
							: "A new snapshot cannot be saved yet. Last save: " +
								saveTime?.toLocaleTimeString() +
								" Available: " +
								nextSaveTime?.toLocaleTimeString()}
					</p>
					<div className="mt-2 text-gray-200">
						{isLoading ? (
							<p>Loading metainfo...</p>
						) : typedMetaInfo ? (
							<table className="w-full text-left text-sm">
								<tbody>
									<tr>
										<td className="pr-3 text-gray-200">Weekly stats requests</td>
										<td className="text-gray-200">{typedMetaInfo.weeklyStats.statsRequests.toLocaleString()}</td>
									</tr>
									<tr>
										<td className="pr-3 text-gray-200">Weekly Hypixel requests</td>
										<td className="text-gray-200">{typedMetaInfo.weeklyStats.hypixelRequests.toLocaleString()}</td>
									</tr>
									<tr>
										<td className="pr-3 text-gray-200">Total snapshots</td>
										<td className="text-gray-200">{typedMetaInfo.totalStats.snapshotAmount ?? "?"}</td>
									</tr>
								</tbody>
							</table>
						) : (
							<p>Metainfo unavailable.</p>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default MetaInfoComponent;
