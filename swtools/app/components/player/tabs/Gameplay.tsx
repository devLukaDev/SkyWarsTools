"use client";
import React from "react";
import TabContent from "./TabContent";
import { OverallResponse } from "@/app/types/OverallResponse";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const Gameplay: React.FC<OverallResponse> = (response) => {
	const renderPerkName = (perk: string | null | undefined) => {
		if (!perk) return "None";
		return perk
			.replace(/_/g, " ")
			.replace(/\bsolo\b/gi, "")
			.replace(/\bteam\b/gi, "")
			.replace(/\b\w/g, (char) => char.toUpperCase());
	};

	return (
		<Tabs>
			<TabList className={"bg-main h-10 w-full flex gap-2 items-center px-4 overflow-scroll lg:overflow-auto text-base lg:text-lg"}>
				<Tab
					selectedClassName={"selected-tab"}
					className={"whitespace-nowrap p-1 px-3 rounded-xl font-semibold cursor-pointer animate-press"}
				>
					Cosmetics
				</Tab>
				<Tab
					selectedClassName={"selected-tab"}
					className={"whitespace-nowrap p-1 px-3 rounded-xl font-semibold cursor-pointer animate-press"}
				>
					Perks
				</Tab>
				<Tab
					selectedClassName={"selected-tab"}
					className={"whitespace-nowrap p-1 px-3 rounded-xl font-semibold cursor-pointer animate-press"}
				>
					Crowdsourced Info
				</Tab>
				<Tab
					selectedClassName={"selected-tab"}
					className={"whitespace-nowrap p-1 px-3 rounded-xl font-semibold cursor-pointer animate-press"}
				>
					Style
				</Tab>
			</TabList>

			<TabPanel>
				<TabContent>
					<div className="flex justify-center">
						<table className="p-4 w-full lg:w-[65%] text-left bg-content ">
							<tbody>
								<tr className="border-b-1 border-white">
									<td>Balloon</td>
									<td>{response.stats.active_balloon ?? "-"}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Cage</td>
									<td>{response.stats.active_cage ?? "-"}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Death Cry</td>
									<td>{response.stats.active_deathcry ?? "-"}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Emblem</td>
									<td>{response.stats.active_emblem ?? "-"}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Kill Effect</td>
									<td>{response.stats.active_killeffect ?? "-"}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Kill Message</td>
									<td>{response.stats.active_killmessages ?? "-"}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Projectile Trail</td>
									<td>{response.stats.active_projectiletrail ?? "-"}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Scheme</td>
									<td>{response.stats.active_scheme ?? "-"}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Spray</td>
									<td>{response.stats.active_sprays ?? "-"}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Victory Dance</td>
									<td>{response.stats.active_victorydance ?? "-"}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</TabContent>
			</TabPanel>
			<TabPanel>
				<TabContent>
					<div className="w-full flex flex-col lg:flex-row gap-8 justify-center items-start">
						{/* Normal Perks Table */}
						<div className="w-full lg:w-1/2">
							<table className="p-4 w-full text-left bg-content">
								<tbody>
									{response.stats.perkslot?.normal &&
									Object.values(response.stats.perkslot.normal).some((perk) => perk) ? (
										Object.entries(response.stats.perkslot.normal).map(([slot, perk]) => (
											<tr className="border-b-1 border-white" key={slot}>
												<td className="capitalize">Slot {slot}</td>
												<td className="capitalize">{renderPerkName(perk)}</td>
											</tr>
										))
									) : (
										<tr>
											<td colSpan={2}>No normal perks equipped.</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</TabContent>
			</TabPanel>
			<TabPanel>
				<TabContent>See what external sources say about this player. Coming soon.</TabContent>
			</TabPanel>
			<TabPanel>
				<TabContent>See what kind of playstyle this player has. Coming soon.</TabContent>
			</TabPanel>
		</Tabs>
	);
};

export default Gameplay;
