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

	let since: number | null = typedUserInfo?.user?.patreon_since ?? null;
	const monthsSincePledge = () => {
		if (!since) return 0;

		const pledged = new Date(since * 1000);
		const now = new Date();

		let months = (now.getFullYear() - pledged.getFullYear()) * 12 + (now.getMonth() - pledged.getMonth());

		// Floor: if current day < pledged day, subtract one month
		if (now.getDate() < pledged.getDate()) {
			months -= 1;
		}

		return Math.max(0, months);
	};

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
			{since && (
				<div
					className="hidden lg:absolute lg:top-0 lg:right-0 h-20 w-20
				text-white text-sm lg:text-base drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] lg:flex flex-col items-center justify-center"
				>
					<div className="p-2 flex flex-col">
						<PortalSquare
							trigger={({ ref, onMouseEnter, onMouseLeave, onFocus, onBlur, tabIndex }) => (
								<div ref={ref} className="relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
									<Image
										src={"/icons/patreon/netherite_abald.png"}
										priority
										width={100}
										height={100}
										className="h15 w-15 object-cover"
										alt="Player Banner"
										quality={50}
										unoptimized
										tabIndex={tabIndex}
										onFocus={onFocus}
										onBlur={onBlur}
									></Image>
									<span className="absolute inset-0 flex items-center justify-center text-white font-bold text-3xl pointer-events-none">
										{monthsSincePledge()}
									</span>
								</div>
							)}
						>
							<div className="flex flex-col justify-center align-middle text-center">
								<span className="font-bold">Supporter</span>
								<span className="text-xs">This user has supported the project through Patreon for {monthsSincePledge()} months!</span>

							</div>
						</PortalSquare>
					</div>
				</div>
			)}
		</div>
	);
};

export default PlayerBanner;
