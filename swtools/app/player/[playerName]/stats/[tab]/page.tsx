import { notFound } from "next/navigation";
import Table from "@/app/components/player/tabs/Table";
import Extended from "@/app/components/player/tabs/Extended";
import Prestige from "@/app/components/player/tabs/Prestige";
import GrimReaper from "@/app/components/player/tabs/GrimReaper";
import Playtime from "@/app/components/player/tabs/Playtime";
import { OverallResponse } from "@/app/types/OverallResponse";
import Gameplay from "@/app/components/player/tabs/Gameplay";
import Kits from "@/app/components/player/tabs/Kits";
import Tools from "@/app/components/player/tabs/Tools";
import Legacy from "@/app/components/player/tabs/Legacy";

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

interface PageProps {
	params: Promise<{ playerName: string; tab: string }>;
}

export default async function PlayerStatsTabPage({ params }: PageProps) {
	const awaitedParams = await params;
	const { playerName, tab } = awaitedParams;
	const currentTab = tabs.find((t) => t.value === tab);
	if (!currentTab) {
		notFound();
	}

	const res = await fetch(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/overall?player=${encodeURIComponent(playerName)}`, {
	});
	if (!res.ok) {
		console.log(res.statusText);
		return <div>Error: {res.statusText}</div>;
	}
	const overallData: OverallResponse = await res.json();

	// Yeah and then just pass only playerName into the components and let them fetch their own data
	return (
		<>
			{currentTab.value === "table" && <Table {...overallData} />}
			{currentTab.value === "extended" && <Extended {...overallData} />}
			{currentTab.value === "prestige" && <Prestige {...overallData} />}
			{currentTab.value === "grimreaper" && <GrimReaper {...overallData} />}
			{currentTab.value === "playtime" && <Playtime {...overallData} />}
			{currentTab.value === "kits" && <Kits {...overallData} />}
			{currentTab.value === "legacy" && <Legacy {...overallData}></Legacy>}
			{currentTab.value === "gameplay" && <Gameplay {...overallData}></Gameplay>}
			{currentTab.value === "tools" && <Tools {...overallData}></Tools>}
		</>
	);
}
