"use client";
import React from "react";
import TabContent from "./TabContent";
import { OverallResponse } from "@/app/types/OverallResponse";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Trustfactor from "./gameplay/Trustfactor";
import Playstyle from "./gameplay/Playstyle";
import Perks from "./gameplay/Perks";

const Gameplay: React.FC<OverallResponse> = (response) => {


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
					Playstyle
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
					<Perks response={response}></Perks>
				</TabContent>
			</TabPanel>
			<TabPanel>
				<TabContent>
					<Trustfactor response={response}/>
				</TabContent>
			</TabPanel>
			<TabPanel>
				<TabContent>
					<Playstyle response={response}/>
				</TabContent>
			</TabPanel>
		</Tabs>
	);
};

export default Gameplay;
