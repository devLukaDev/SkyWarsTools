"use client";
import React from "react";
import { kitProcessing, toCamelCase } from "@/app/utils/Utils";
import KitPrestigeString from "../../universal/KitPrestigeString";
import TabContent from "./TabContent";
import { OverallResponse, Stats } from "@/app/types/OverallResponse";
import MinecraftText from "@/app/utils/MinecraftText";
import { Eye } from "lucide-react";
import Link from "next/link";
import { Tooltip } from "@mui/material";
import { getSchemeByName } from "@/app/utils/Scheme";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ProgressBar, { ProgressBarMode } from "../../universal/ProgressBar";

const Extended: React.FC<OverallResponse> = (response) => {
	const schemeSplit = response.display.active_scheme?.split("scheme_")[1];

	const milestones = {
		1: { req: 1, reward: "Hearts Projectile Trail", item: "apple_golden.png" },
		2: { req: 3, reward: "Guardians Victory Dance", item: "prismarine_bricks.png" },
		3: { req: 5, reward: "Blood Explosion Kill Effect", item: "redstone_dust.png" },
		4: { req: 8, reward: "Grumpy Villager Death Cry", item: "seeds_wheat.png" },
		5: { req: 11, reward: "Magic Box Cage", item: "barrier.png" },
		6: { req: 14, reward: "Sad Puppy Death Cry", item: "lead.png" },
		7: { req: 17, reward: "Green Star Projectile Trail", item: "emerald.png" },
		8: { req: 20, reward: "Beazinga Death Cry", item: "fireworks.png" },
		9: { req: 25, reward: "Heart Explosion Kill Effect", item: "apple.png" },
		10: { req: 30, reward: "Monster Burp Death Cry", item: "rotten_flesh.png" },
		11: { req: 35, reward: "Notes Projectile Trail", item: "jukebox.png" },
		12: { req: 40, reward: "Head Rocket Kill Effect", item: "head.png" },
		13: { req: 45, reward: "Final Smash Kill Effect", item: "wooden_armorstand.png" },
		14: { req: 50, reward: "Dragon Rider Victory Dance", item: "dragon_egg.png" },
	};

	const playerFullCompletions = Math.min(
		response.stats.challenge_wins_archer ?? 0,
		response.stats.challenge_wins_half_health ?? 0,
		response.stats.challenge_wins_no_block ?? 0,
		response.stats.challenge_wins_no_chest ?? 0,
		// response.stats.challenge_wins_paper ?? 0,
		response.stats.challenge_wins_rookie ?? 0,
		response.stats.challenge_wins_uhc ?? 0,
		response.stats.challenge_wins_ultimate_warrior ?? 0,
	);
	// console.log(playerFullCompletions);

	function getBackgroundImage(unlocked: boolean) {
		return !unlocked ? `url('/ranked/invSlotLocked.png')` : `url('/ranked/invSlot.png')`;
	}

	return (
		<Tabs>
			<TabList className={"bg-main h-10 w-full flex gap-2 items-center px-4 overflow-scroll lg:overflow-auto text-base lg:text-lg"}>
				<Tab
					selectedClassName={"selected-tab"}
					className={"whitespace-nowrap p-1 px-3 rounded-xl font-semibold cursor-pointer animate-press"}
				>
					Stats
				</Tab>
				<Tab
					selectedClassName={"selected-tab"}
					className={"whitespace-nowrap p-1 px-3 rounded-xl font-semibold cursor-pointer animate-press"}
				>
					Challenges
				</Tab>
				<Tab
					selectedClassName={"selected-tab"}
					className={"whitespace-nowrap p-1 px-3 rounded-xl font-semibold cursor-pointer animate-press"}
				>
					Milestones
				</Tab>
			</TabList>

			<TabPanel>
				<TabContent>
					<div className="extended-table w-full text-left bg-content font-bold font flex flex-col lg:flex-row lg:text-lg lg:justify-center">
						<table className="p-4 w-full lg:w-[65%] text-left bg-content ">
							<tbody>
								<tr className="border-b-1 border-white">
									<td>Current Kit (Normal)</td>
									<td>
										{kitProcessing(response.stats.activeKit_SOLO ?? "None")}{" "}
										{<KitPrestigeString kit={response.stats.activeKit_SOLO} response={response} />}
									</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Current Kit (Insane)</td>
									<td>
										{kitProcessing(response.stats.activeKit_TEAM ?? "None")}{" "}
										{<KitPrestigeString kit={response.stats.activeKit_TEAM} response={response} />}
									</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Current Kit (Mini)</td>
									<td>
										{kitProcessing(response.stats.activeKit_MINI ?? "None")}{" "}
										{<KitPrestigeString kit={response.stats.activeKit_MINI} response={response} />}
									</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Max Prestige Kits</td>
									<td className="flex gap-2 items-center">
										{(response.stats.customs_kitsMaxPrestige ?? 0).toString()}
										<Tooltip title={"See kits"}>
											<Link href={`/player/${response.player}/stats/kits`}>
												<Eye />
											</Link>
										</Tooltip>
									</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Display Scheme</td>
									<td className="flex gap-2 items-center">
										<span>
											{schemeSplit ? toCamelCase(getSchemeByName(schemeSplit)?.name ?? "Unknown") : "Unknown"}
										</span>
										<Tooltip title={"See all schemes"}>
											<Link href={`/tools/schemes`}>
												<Eye />
											</Link>
										</Tooltip>
									</td>
								</tr>
								<tr>
									<td colSpan={2} style={{ height: "24px" }}></td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Angel of Death Level</td>
									<td>{response.stats.angel_of_death_level ?? 0}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Angels Offering</td>
									<td>{response.stats.angels_offering == 1 ? "Yes" : "No"}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Favour of the Angel</td>
									<td>{response.stats.packages?.includes("favor_of_the_angel") ? "Yes" : "No"}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Total Corruption Chance</td>
									<td>
										{(response.stats.angel_of_death_level ?? 0) +
											(response.stats.angels_offering ?? 0) +
											(response.stats.packages?.includes("favor_of_the_angel") ? 1 : 0)}{" "}
										%
									</td>
								</tr>
								<tr>
									<td colSpan={2} style={{ height: "24px" }}></td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Experience</td>
									<td>{response.stats.skywars_experience?.toLocaleString()}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Coins</td>
									<td>{response.stats.coins?.toLocaleString()}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Opals</td>
									<td>{response.stats.opals ?? "None"}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Souls</td>
									<td>{response.stats.souls?.toLocaleString()}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Paid Souls</td>
									<td>{response.stats.paid_souls?.toLocaleString()}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Total Souls</td>
									<td>{response.stats.souls_gathered?.toLocaleString()}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Soul Well Uses</td>
									<td>{response.stats.soul_well?.toLocaleString()}</td>
								</tr>
								<tr>
									<td colSpan={2} style={{ height: "24px" }}></td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Assists</td>
									<td>{response.stats.assists?.toLocaleString()}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Melee Kills</td>
									<td>{response.stats.melee_kills?.toLocaleString()}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Void Kills</td>
									<td>{response.stats.void_kills?.toLocaleString()}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Mob Kills</td>
									<td>{response.stats.mob_kills?.toLocaleString() ?? 0}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Bow Kills</td>
									<td>{response.stats.bow_kills?.toLocaleString()}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Arrows Shot</td>
									<td>{response.stats.arrows_shot?.toLocaleString()}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Arrows Hit</td>
									<td>{response.stats.arrows_hit?.toLocaleString()}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Arrows Hit/Miss</td>
									<td>
										{/* 	TODO Refactor this bs */}
										{(() => {
											const arrowsShot = response.stats.arrows_shot ?? 0;
											const arrowsHit = response.stats.arrows_hit ?? 0;
											if (arrowsShot > 0) {
												const hitMissRatio = ((arrowsHit / arrowsShot) * 100).toFixed(2);
												return `${hitMissRatio}%`;
											}
											return "N/A";
										})()}
									</td>
								</tr>
								<tr>
									<td colSpan={2} style={{ height: "24px" }}></td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Kill/Win Ratio</td>
									<td>
										{response.stats.kills && response.stats.wins
											? (response.stats.kills / response.stats.wins).toFixed(2)
											: "N/A"}
									</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Survived Players</td>
									<td>{response.stats.survived_players?.toLocaleString()}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Game Ends (Solo)</td>
									<td>{response.stats.customs_game_ends_solo?.toLocaleString()}</td>
								</tr>
								<tr>
									<td colSpan={2} style={{ height: "24px" }}></td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Eggs Thrown</td>
									<td>{response.stats.egg_thrown?.toLocaleString()}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Pearls Thrown</td>
									<td>{response.stats.enderpearls_thrown?.toLocaleString()}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Blocks Broken</td>
									<td>{response.stats.blocks_broken?.toLocaleString()}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Blocks Placed</td>
									<td>{response.stats.blocks_placed?.toLocaleString()}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Items Enchanted</td>
									<td>{response.stats.items_enchanted?.toLocaleString()}</td>
								</tr>
								<tr className="border-b-1 border-white">
									<td>Chests Opened</td>
									<td>{response.stats.chests_opened?.toLocaleString()}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</TabContent>
			</TabPanel>
			<TabPanel>
				<TabContent>
					<div className="w-full flex flex-col items-center py-4 gap-4">
						<div className="w-full flex flex-col items-center gap-2 mt-4">
							<table className="extended-table w-full lg:w-[65%] bg-content text-left">
								<thead>
									<tr>
										<th className="text-accent">Challenge</th>
										<th className="text-accent">Attempts</th>
										<th className="text-accent">Wins</th>
										<th className="text-accent">Win%</th>
									</tr>
								</thead>
								<tbody>
									{[
										{ key: "archer", name: "Archer", desc: "You cannot deal any melee damage during the game." },
										{ key: "half_health", name: "Half Health", desc: "You only have 5 hearts." },
										{ key: "no_block", name: "No Block", desc: "You cannot use blocks during the game." },
										{ key: "no_chest", name: "No Chest", desc: "You cannot open any chests during the game." },
										{
											key: "paper",
											name: "Paper",
											desc: "Deprecated: You are paper-thin and take more knockback when you get hit.",
										},
										{ key: "rookie", name: "Rookie", desc: "You must play the game without a kit and perks." },
										{ key: "uhc", name: "UHC", desc: "You cannot naturally regenerate during the game." },
										{
											key: "ultimate_warrior",
											name: "Ultimate Warrior",
											desc: "You spawn with only a Stone Sword, cannot use other swords or bows, and cannot wearr armor.",
										},
									].map(({ key, name, desc }) => {
										const attempts = (response.stats[`challenge_attempts_${key}` as keyof Stats] as number) ?? 0;
										const wins = (response.stats[`challenge_wins_${key}` as keyof Stats] as number) ?? 0;
										const winRate = attempts > 0 ? ((wins / attempts) * 100).toFixed(2) + "%" : "N/A";
										if (attempts === 0 && wins === 0) return null;
										return (
											<tr key={key} className="border-b-1 border-white ">
												<td className=" font-semibold">
													<Tooltip title={desc} placement="left">
														<span>{name}</span>
													</Tooltip>
												</td>
												<td className="">{attempts}</td>
												<td className="">{wins}</td>
												<td className={winRate !== "N/A" && parseFloat(winRate) > 33 ? "text-green-500" : ""}>
													{winRate}
												</td>
											</tr>
										);
									})}
									<tr>
										<td colSpan={4} style={{ height: "12px" }}></td>
									</tr>
									{/* This shit is wrong - I dont understand how they count challenges and their 'wins' */}
									{/* {[1, 2, 3, 5, 6, 7, 8].map((num) => {
										const attempts = (response.stats[`challenge_attempts_${num}` as keyof Stats] as number) ?? 0;
										const wins = ((response.stats[`challenge_wins_${num}` as keyof Stats] as number) ?? 0) / num;
										const winRate = attempts > 0 ? ((wins / attempts) * 100).toFixed(2) : null;
										if (attempts === 0 && wins === 0) return null;
										return (
											<tr key={num} className="border-b-1 border-white">
												<td className="">Games ({num} active)</td>
												<td className="">{attempts}</td>
												<td className="">{wins}</td>
												<td className={winRate && parseFloat(winRate) > 33 ? "text-green-500" : ""}>
													{winRate ? `${winRate}%` : "N/A"}
												</td>
											</tr>
										);
									})} */}
								</tbody>
							</table>
						</div>
					</div>
				</TabContent>
			</TabPanel>
			<TabPanel>
				<TabContent>
					<div className="flex w-full h-fit items-center justify-center my-2">
						<div className="grid grid-cols-4 lg:grid-cols-7 gap-1 min-w-20 min-h-20 w-auto h-auto p-4 bg-layer rounded-xl">
							{Object.keys(milestones).map((milestoneKey) => {
								const milestone = milestones[Number(milestoneKey) as keyof typeof milestones];
								return (
									<div
										key={milestoneKey}
										className="flex items-center justify-center h-20 w-20 bg-cover bg-center relative"
										style={{
											backgroundImage: getBackgroundImage(playerFullCompletions >= milestone.req),
										}}
									>
										<div>
											<img
												src={"/items/" + milestone.item}
												height={70}
												width={70}
												style={{ imageRendering: "pixelated" }}
												className="p-0.5 peer"
												alt=""
												tabIndex={0}
												onClick={(e) => {
													const tooltip = e.currentTarget.nextSibling as HTMLElement;
													if (tooltip) {
														tooltip.classList.toggle("opacity-100");
														tooltip.classList.toggle("pointer-events-auto");
													}
												}}
												onBlur={(e) => {
													const tooltip = e.currentTarget.nextSibling as HTMLElement;
													if (tooltip) {
														tooltip.classList.remove("opacity-100");
														tooltip.classList.remove("pointer-events-auto");
													}
												}}
											/>
											<div
												className="fixed lg:absolute left-0 w-[100vw] lg:left-1/2 bottom-0 lg:transform lg:-translate-x-1/2 lg:translate-y-full lg:w-max p-2 rounded items-center justify-center opacity-0 peer-hover:opacity-100 
												transition-opacity bg-black/90 z-10 text-xl text-white text-left pointer-events-none peer-focus-within:opacity-100 peer-focus-within:pointer-events-auto"
												tabIndex={-1}
											>
												<MinecraftText>{"§5" + milestone.reward}</MinecraftText>
												<MinecraftText>
													{"§7Complete every challenge §a" + milestone.req + " §7times!"}
												</MinecraftText>
												{milestone.req <= playerFullCompletions ? (
													<MinecraftText>§l§aUNLOCKED</MinecraftText>
												) : (
													<MinecraftText>
														{"§cYou need §a " +
															(milestone.req - playerFullCompletions).toLocaleString() +
															" §cmore full completions"}
													</MinecraftText>
												)}
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
					<div className="flex flex-col w-full h-fit items-center justify-center my-4">
						<span className="text-sm">Full Completions</span>
						<ProgressBar
							progress={playerFullCompletions}
							total={50}
							bgColor="#424242"
							progressColor="#2090ff"
							mode={ProgressBarMode.DEFAULT}
							decimals={0}
						></ProgressBar>
						<br></br>
						<span className="text-sm">Individual Challenge Wins</span>
						<ProgressBar
							progress={response.stats.challenge_wins ?? 0}
							total={350}
							bgColor="#424242"
							progressColor="#2090ff"
							mode={ProgressBarMode.DEFAULT}
							decimals={0}
						></ProgressBar>
					</div>
				</TabContent>
			</TabPanel>
		</Tabs>
	);
};

export default Extended;
