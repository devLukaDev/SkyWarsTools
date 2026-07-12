"use client";
import React from "react";
import { useRouter, useParams } from "next/navigation";

const tabs = [
	{ label: "Table", value: "table" },
	{ label: "Extended", value: "extended" },
	{ label: "Prestige", value: "prestige" },
	{ label: "Grim Reaper", value: "grimreaper" },
	{ label: "Playtime", value: "playtime" },
	{ label: "Kits", value: "kits" },
	{ label: "Legacy", value: "legacy" },
	{ label: "Gameplay", value: "gameplay" },
	{ label: "Tools", value: "tools" },
];

const PlayerStatsNavBar = () => {
	const router = useRouter();
	const params = useParams();
	const currentTab = (params.tab as string) || "table";

	const playerName = params.playerName as string;

	return (
		<nav className="bg-main h-12 w-full flex gap-2 items-center px-3 overflow-x-scroll lg:overflow-hidden text-base lg:text-xl">
			{tabs.map((tab) => (
				<div
					key={tab.value}
					className={`whitespace-nowrap p-1 px-3 rounded-xl font-semibold cursor-pointer animate-press 
		${currentTab == tab.value ? "selected-tab text-white" : ""}`}
					onClick={() => {
						if (currentTab === tab.value) return;
						router.push(`/player/${playerName}/stats/${tab.value}`);
					}}
				>
					{tab.label}
				</div>
			))}
		</nav>
	);
};

export default PlayerStatsNavBar;
