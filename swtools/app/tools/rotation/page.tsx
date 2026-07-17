"use client";
import React, { useState } from "react";
import { SWMap, useMapRotationAll } from "../../hooks/useMapRotation";
import { timeAgo } from "@/app/utils/Utils";
import twemoji from "@twemoji/api";

type SortKey = "map_name" | "last_change" | "last_status";
type SortDirection = "asc" | "desc";

const SortIcon = ({ direction, active }: { direction: SortDirection; active: boolean }) => (
	<span className={`ml-1 inline-block transition-opacity ${active ? "opacity-100" : "opacity-30"}`}>
		{direction === "asc" ? "↑" : "↓"}
	</span>
);

const RotationPage = () => {
	const { allMapsData, allMapsError, allMapsIsLoading } = useMapRotationAll();
	const [sortKey, setSortKey] = useState<SortKey>("last_status");
	const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
	const [search, setSearch] = useState("");

	const handleSort = (key: SortKey) => {
		if (sortKey === key) {
			setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
		} else {
			setSortKey(key);
			setSortDirection("asc");
		}
	};

	const sortedMaps = React.useMemo(() => {
		if (!allMapsData?.maps) return [];
		const query = search.trim().toLowerCase();
		const filtered = query ? allMapsData.maps.filter((map: SWMap) => map.map_name.toLowerCase().includes(query)) : allMapsData.maps;
		return [...filtered].sort((a: SWMap, b: SWMap) => {
			let comparison = 0;
			if (sortKey === "map_name") {
				comparison = a.map_name.localeCompare(b.map_name);
			} else if (sortKey === "last_change") {
				comparison = a.last_change - b.last_change;
			} else if (sortKey === "last_status") {
				comparison = Number(a.last_status) - Number(b.last_status);
			}
			return sortDirection === "asc" ? comparison : -comparison;
		});
	}, [allMapsData, sortKey, sortDirection, search]);

	const headerClass = "p-2 text-l lg:text-xl cursor-pointer select-none whitespace-nowrap";

	const pageShell = (content: React.ReactNode) => (
		<div className="flex flex-col p-4">
			<h1 className="text-4xl font-bold text-center my-2">Maps</h1>
			<span className="font-semibold text-center mb-0 px-3">Includes all Solo/Teams maps that can occur in new rotations</span>
			<span className="font-semibold text-center mb-2 px-3">Click on map names for more information</span>
			{content}
		</div>
	);

	const getSeasonIcon = (season: string): React.ReactNode => {
		if (season == "") return null;
		let emoji;
		switch (season) {
			case "Summer":
				emoji = "☀️";
				break;
			case "Halloween":
				emoji = "🎃";
				break;
			case "Christmas":
				emoji = "❄️";
				break;
			case "Easter":
				emoji = "🐰";
				break;
			default:
				return null;
		}
		return (
			<span
				dangerouslySetInnerHTML={{
					__html: twemoji.parse(emoji, { folder: "svg", ext: ".svg" }),
				}}
				style={{ width: 28, height: 28, display: "inline-block" }}
			/>
		);
	};

	if (allMapsIsLoading) {
		return pageShell(<div className="w-full overflow-x-auto rounded-xl lg:p-8 h-200" />);
	}

	if (allMapsError) {
		return pageShell(<div className="w-full overflow-x-auto rounded-xl lg:p-8 h-200" />);
	}

	return pageShell(
		<div className="w-full overflow-x-auto rounded-xl lg:p-8 pt-4 lg:pt-2">
			{/* Search input */}
			<div className=" w-full flex justify-end">
				<input
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search maps…"
					className="w-full max-w-sm px-4 py-2 rounded-t-lg bg-content text-base font-semibold"
				/>
			</div>

			<table className="w-150 lg:w-full bg-content rounded-b-lg lg:rounded-tl-lg">
				<thead className="text-left text-accent border-b-2">
					<tr>
						<th className={headerClass} onClick={() => handleSort("map_name")}>
							Name
							<SortIcon direction={sortKey === "map_name" ? sortDirection : "asc"} active={sortKey === "map_name"} />
						</th>
						<th className={headerClass} onClick={() => handleSort("last_change")}>
							Last Change
							<SortIcon direction={sortKey === "last_change" ? sortDirection : "asc"} active={sortKey === "last_change"} />
						</th>
						<th className={`${headerClass} w-34`} onClick={() => handleSort("last_status")}>
							Status
							<SortIcon direction={sortKey === "last_status" ? sortDirection : "asc"} active={sortKey === "last_status"} />
						</th>
					</tr>
				</thead>
				<tbody>
					{sortedMaps.length > 0 ? (
						sortedMaps.map((map: SWMap) => (
							<tr key={map.map_name}>
								<td className="p-2 font-semibold text-lg">
									<a href={`/tools/rotation/map?mapName=${map.map_name}`}>
										<span className="h-full flex flex-row align-middle gap-2">
											{map.map_name}
											{getSeasonIcon(map.seasonalInfo.season ?? "")}
										</span>
									</a>
								</td>
								<td className="p-2 font-semibold text-lg" key={map.last_change}>
									{timeAgo(map.last_change)}
								</td>
								<td className="p-2 font-semibold text-lg">
									<span
										className={`px-3 py-1 rounded-full font-semibold ${map.last_status ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}
									>
										{map.last_status ? "Active" : "Inactive"}
									</span>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={3} className="p-4 text-center font-semibold text-lg opacity-50">
								No maps match &ldquo;{search}&rdquo;
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>,
	);
};

export default RotationPage;
