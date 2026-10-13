import React from "react";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import useSWR from "swr";
import { fetcher } from "@/app/utils/Utils";
import twemoji from "@twemoji/api";

type PatreonSupporter = {
	mc_account?: string;
	emoji?: string;
	name?: string;
	patreon_cents?: number;
	patreon_since?: number;
};

type PatreonResponse = {
	success: boolean;
	supporters: PatreonSupporter[];
	cache?: boolean;
};

const PatreonPlayerList = () => {
	const { data, error, isLoading } = useSWR<PatreonResponse>(
		`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/auth/patreonSupporters`,
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		},
	);

	return (
		<>
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
				{isLoading && <LoaderCircle className="animate-spin" />}
				{error && <div>Could not get Patreon supporters ):</div>}
				{!isLoading &&
					!error &&
					data &&
					[...data.supporters]
						.sort((a, b) => {
							return (a.patreon_since ?? 0) - (b.patreon_since ?? 0);
						})
						.map((supporter, index) => {
							if (!supporter.mc_account) return null;
							return (
								<a
									href={`/redirect?uuid=${supporter.mc_account}`}
									key={index}
									className="flex items-center gap-2 lg:gap-3 bg-content rounded-md p-1 lg:p-2 w-full text-lg animate-press cursor-pointer enchanted border-2 border-[#ffffff22]"
								>
									<img
										src={`${process.env.NEXT_PUBLIC_HEADS_API}/${supporter.mc_account}`}
										alt={supporter.name ?? "Minecraft avatar"}
										width={30}
										height={30}
										className="rounded"
									/>
									<div className="min-w-0">
										<div className="font-semibold truncate flex gap-1 lg:gap-2 items-center">
											<span className="truncate ">{supporter.name ?? "Unknown"}</span>
											{
												<span
													dangerouslySetInnerHTML={{
														__html: twemoji.parse(supporter.emoji ?? "", { folder: "svg", ext: ".svg" }),
													}}
													style={{ width: 24, height: 24, display: "inline-block" }}
												/>
											}
										</div>
									</div>
								</a>
							);
						})}
			</div>
		</>
	);
};

export default PatreonPlayerList;
