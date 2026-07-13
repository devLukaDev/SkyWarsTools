"use client";
import React from "react";

import { usePathname } from "next/navigation";
import { useRecentPlayersStore } from "@/app/stores/recentPlayersStore";

interface PlayerNavBarProps {
	playerName?: string; // Optional prop for player name if needed
}

const PlayerNavBar: React.FC<PlayerNavBarProps> = ({ playerName }) => {
	const pathname = usePathname();

	const navItems = [
		{ label: "Stats", href: `/player/${playerName}/stats/table` },
		{ label: "Session", href: `/player/${playerName}/session` },
		{ label: "Compare", href: `/player/${playerName}/compare` },
		{ label: "Calculate", href: `/player/${playerName}/calculate` },
		{ label: "Versus", href: `/player/${playerName}/versus` },
	];

	// Update recentPlayers in localStorage (max 3, most recent first)
	// Use zustand persistent store for recentPlayers
	const setRecentPlayers = useRecentPlayersStore((state) => state.setRecentPlayers);

	React.useEffect(() => {
		if (!playerName) return;
		// Always get the latest state from the store
		let recent = [...(useRecentPlayersStore.getState().recentPlayers || [])];
		// Remove if already exists, then add to front
		recent = recent.filter((p) => p !== playerName);
		recent.unshift(playerName);
		// Keep only 3
		recent = recent.slice(0, 3);
		setRecentPlayers(recent);
	}, [playerName, setRecentPlayers]);

	return (
		<nav className="bg-main w-full h-10 lg:h-[60px] flex p-1 lg:p-3 lg:rounded-t-xl overflow-x-scroll lg:overflow-hidden">
			{/* Left spacer */}
			<div className="w-2 flex flex-col justify-center items-center">
				<div className="h-7 w-full lg:h-[32px]" />
				<div className="bg-yellow-300 h-0.5 lg:h-[2px] w-full" />
			</div>
			{navItems.map((item, idx) => {
				const regex = new RegExp(`/player/${playerName}/${item.label.toLowerCase()}`, 'i');
				const isActive = regex.test(pathname);
				
				return (
					<React.Fragment key={item.label}>
						<div className="flex flex-col items-center">
							<a
								href={item.href}
								className={`text-lg lg:text-2xl text-[var(--foreground)] font-semibold animate-press border-[var(--accent)] hover:border-b-2 ${
									isActive ? "text-accent" : "font-normal"
								}`}
							>
								{item.label}
							</a>
							<div className="flex flex-col justify-center items-center h-1 w-full">
								<div className={"bg-yellow-300 w-full " + (isActive ? "h-1 rounded-4xl" : "h-0.5 ")} />
							</div>
						</div>
						{/* Spacer between items, except after last */}
						{idx < navItems.length - 1 && (
							<div className="min-w-[5px] w-[15px] flex flex-col justify-center items-center ">
								<div className="h-7 w-full lg:h-[32px]" />
								<div className="bg-yellow-300 h-0.5 lg:h-[2px] w-full" />
							</div>
						)}
					</React.Fragment>
				);
			})}
			{/* Right spacer */}
			<div className="w-2 flex flex-col justify-center items-center">
				<div className="h-7 w-full lg:h-[32px]" />
				<div className="bg-yellow-300 h-0.5 lg:h-[2px] w-full" />
			</div>
		</nav>
	);
};

export default PlayerNavBar;
