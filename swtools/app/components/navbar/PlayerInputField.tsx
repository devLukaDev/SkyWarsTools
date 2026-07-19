"use client";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Tooltip from "@mui/material/Tooltip";
import { useRecentPlayersStore } from "@/app/stores/recentPlayersStore";

const PlayerInputField = () => {
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const router = useRouter();

	const handleSubmit = async (e?: React.FormEvent | React.KeyboardEvent) => {
		if (e) e.preventDefault();
		if (!input.trim()) return;
		setLoading(true);
		setError("");
		const playerName = input.trim();
		setInput("");
		checkPlayerExists(playerName);
	};

	const checkPlayerExists = async (playerName: string): Promise<boolean> => {
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/getUUID?player=${encodeURIComponent(playerName)}`);
			const data = await res.json();
			console.log("API response:", data);
			if (res.ok && data.name) {
				console.log("Player found, redirecting...");
				router.push(`/player/${encodeURIComponent(data.name)}/stats/table`);
				return true;
			} else {
				console.warn("Player not found:", data);
				setError("Player not found.");
			}
		} catch {
			setError("Error checking player.");
		} finally {
			// This happens too quick...
			// Ideally we would keep loading anim until navigation is complete
			setLoading(false);
			return false;
		}
	};

	// Shortcut to focus input
	React.useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				const inputEl = document.getElementById("player-input-field");
				inputEl?.focus();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	// Recent players from zustand store
	const recentPlayers = useRecentPlayersStore((state) => state.recentPlayers);
	const setRecentPlayers = useRecentPlayersStore((state) => state.setRecentPlayers);

	const handleRecentPlayerClick = (name: string) => {
		setInput(name);
		setShowDropdown(false);
		const playerExists = checkPlayerExists(name);
		if (!playerExists) {
			const prev: string[] = useRecentPlayersStore.getState().recentPlayers;
			// Remove from recent players in store
			const updated = prev.filter((n) => n !== name);
			setRecentPlayers(updated);
		} else {
			setInput("");
		}
	};

	const inputRef = React.useRef<HTMLInputElement>(null);
	const [showDropdown, setShowDropdown] = useState(false);
	const dropdownRef = React.useRef<HTMLDivElement>(null);

	// Close dropdown when clicking outside
	React.useEffect(() => {
		if (!showDropdown) return;
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setShowDropdown(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showDropdown]);

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="flex align-middle gap-1 lg:text-xl w-[180px] lg:w-[245px] m-1 bg-[var(--background-content-alt)] p-2 rounded-xl"
			>
				<input
					id="player-input-field"
					ref={inputRef}
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") handleSubmit(e);
					}}
					placeholder="Search a player..."
					disabled={loading}
					className="flex w-[140px] lg:w-[200px] outline-0"
					title="Press Ctrl+K or Cmd+K to focus"
				/>
				<button type="submit" disabled={loading || !input.trim()} className="flex items-center justify-center cursor-pointer">
					{loading ? (
						<svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
							<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
							<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
						</svg>
					) : error ? (
						<Tooltip title="Player not found">
							<div>
								<svg className="h-6 w-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" />
									<line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" />
								</svg>
							</div>
						</Tooltip>
					) : (
						<Search className="h-[20px] w-[20px] animate-press-hard" />
					)}
				</button>
			</form>
			<div className="relative inline-block" ref={dropdownRef}>
				<button
					type="button"
					className="flex items-center justify-center cursor-pointer p-2 lg:-ml-4 rounded-xl bg-[var(--background-content-alt)] animate-press-hard"
					onClick={() => setShowDropdown((prev) => !prev)}
					tabIndex={-1}
					aria-label="Show recent players"
				>
					<svg className="h-5 w-5 text-white " fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
						<circle cx="12" cy="12" r="10" />
						<path d="M12 6v6l4 2" />
					</svg>
				</button>
				{showDropdown && recentPlayers.length > 0 && (
					<div className="absolute left-1/2 -translate-x-1/2 mt-4 w-48 bg-content rounded-lg shadow-lg z-50" tabIndex={0}>
						{/* <span className="text-sm text-gray-500 p-2 font-semibold">Recent players</span> */}
						<ul>
							{recentPlayers.slice(0, 3).map((name) => (
								<li
									key={name}
									className="p-2 cursor-pointer text-white rounded-xl font-semibold animate-press flex flex-row items-center gap-2 overflow-hidden"
									onClick={() => {
										handleRecentPlayerClick(name);
										setShowDropdown(false);
									}}
								>
									<Image
										src={`${process.env.NEXT_PUBLIC_HEADS_API}/${name}`}
										width={25}
										height={25}
										className="rounded-lg"
										alt="Minecraft Avatar"
									/>
									{name}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</>
	);
};

export default PlayerInputField;
