import React from "react";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import useSWR from "swr";
import { fetcher } from "@/app/utils/Utils";

type QueryStats = {
	weekKey: string;
	stats: StatEntry[];
};
type StatEntry = {
	value: string;
	score: number;
};

const FreqPlayerList = () => {
	const { data, error, isLoading } = useSWR<QueryStats>(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/queryStats`, fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				{isLoading && <LoaderCircle className="animate-spin"></LoaderCircle>}
				{error && <div>Could not get popular players ):</div>}
				{!isLoading &&
					!error &&
					data &&
					data.stats.slice(0, 9).map((entry: StatEntry, index: number) => (
						<a
							key={index}
							className="flex items-center gap-3 lg:gap-4 bg-content rounded-md p-1 lg:p-2 w-full text-xl animate-press border-2 border-[#ffffff22]"
							href={`/player/${entry.value}/stats/table`}
							id={entry.score.toString()}
						>
							<Image
								src={`${process.env.NEXT_PUBLIC_HEADS_API}/${entry.value}`}
								alt={"head" + entry.value}
								width={40}
								height={40}
								className="rounded"
							/>
							<div className="min-w-0">
								<div className="font-semibold truncate">{entry.value}</div>
							</div>
						</a>
					))}
			</div>
		</>
	);
};

export default FreqPlayerList;
