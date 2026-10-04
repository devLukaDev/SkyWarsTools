"use client";
import React from "react";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import useSWR from "swr";
import { fetcher } from "@/app/utils/Utils";
import { Tooltip } from "@mui/material";
import MinecraftTooltip from "../universal/MinecraftTooltip";
import MinecraftText from "@/app/utils/MinecraftText";
import PortalSquare from "../universal/UniversalTooltip";

interface PlayerBannerProps {
	playerName: string;
}

const PlayerBanner: React.FC<PlayerBannerProps> = ({ playerName }) => {
	const [, authLoading] = useAuthState(auth);
	type UserInfoResponse = {
		user: UserProfile;
	};

	const { data: typedUserInfo } = useSWR<UserInfoResponse>(
		`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/auth/getUserByMC?player=${playerName}`,
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		},
	);
	let bg = "Siege.png";
	let customBg = false;
	if (typedUserInfo?.user && typedUserInfo?.user.profile_bg) {
		bg = typedUserInfo?.user.profile_bg;
		customBg = typedUserInfo.user.custom_bg != undefined && (typedUserInfo.user.contrib == true || typedUserInfo.user.patreon == true);
	}

	let sinceTime: number | null = typedUserInfo?.user?.patreon_since ?? null;
	const monthsSincePledge = () => {
		if (!sinceTime) return 0;

		const pledged = new Date(sinceTime * 1000);
		const now = new Date();

		let months = (now.getFullYear() - pledged.getFullYear()) * 12 + (now.getMonth() - pledged.getMonth());

		// Floor: if current day < pledged day, subtract one month
		if (now.getDate() < pledged.getDate()) {
			months -= 1;
		}

		return Math.max(0, months);
	};
	const monthsSince = monthsSincePledge();

	let url: string = "";
	if (monthsSince >= 0) {
		url = "/icons/patreon/Gold.webp";
	}
	if (monthsSince >= 3) {
		url = "/icons/patreon/Diamond.webp";
	}
	if (monthsSince >= 6) {
		url = "/icons/patreon/Emerald.webp";
	}
	if (monthsSince >= 9) {
		url = "/icons/patreon/Amethyst.webp";
	}
	if (monthsSince >= 12) {
		url = "/icons/patreon/Ruby.webp";
	}
	if (monthsSince >= 24) {
		url = "/icons/patreon/Netherrite.webp";
	}
	

	return (
		<div className="relative w-full">
			{!customBg ? (
				<Image
					src={
						authLoading
							? "/maps/loading.png"
							: `${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/maps/image?q=large&name=` + bg.replaceAll(".png", "")
					}
					priority
					width={1150}
					height={180}
					className="w-full h-30 lg:h-45 object-cover"
					alt="Player Banner"
					quality={100}
				/>
			) : (
				<Image
					src={
						authLoading
							? "/maps/loading.png"
							: `${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/backgrounds/image?name=${typedUserInfo?.user.custom_bg}`
					}
					priority
					width={1150}
					height={180}
					className="w-full h-30 lg:h-45 object-cover"
					alt="Player Banner"
					quality={50}
					unoptimized
				/>
			)}
			{sinceTime && (
				<div
					className="hidden lg:absolute lg:top-0 lg:right-0 h-30 w-30
				text-white text-sm lg:text-base drop-shadow-[0_4px_4px_rgba(255,255,255,1)] lg:flex flex-col items-center justify-center"
				>
					<div className="p-2 flex flex-col">
						<PortalSquare
							trigger={({ ref, onMouseEnter, onMouseLeave, onFocus, onBlur, tabIndex }) => (
								<div ref={ref} className="relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
									<Image
										src={url}
										priority
										width={180}
										height={180}
										className="h25 w-25 object-cover"
										alt="Player Banner"
										quality={50}
										unoptimized
										tabIndex={tabIndex}
										onFocus={onFocus}
										onBlur={onBlur}
									></Image>
								</div>
							)}
						>
							<div className="flex flex-col justify-center align-middle text-center">
								<span className="font-bold">Supporter</span>
								<span className="text-xs">This user has supported the project through Patreon for {monthsSince} months!</span>

							</div>
						</PortalSquare>
					</div>
				</div>
			)}
		</div>
	);
};

export default PlayerBanner;
