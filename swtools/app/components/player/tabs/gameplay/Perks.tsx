import { OverallResponse } from "@/app/types/OverallResponse";
import MinecraftText from "@/app/utils/MinecraftText";
import { perks } from "@/app/utils/Perks";
import React from "react";

function Perks({ response }: { response: OverallResponse }) {
	// console.log(Object.values(response.stats.perkslot?.normal ?? ""));
	return (
		<div className="w-full flex flex-col lg:flex-row gap-2 justify-center h-100 ">
			{response.stats.perkslot?.normal && Object.values(response.stats.perkslot.normal).some((perk) => perk) ? (
				Object.entries(response.stats.perkslot.normal).map(([slot, perk]) => {
					const perkObj = perks[perk as keyof typeof perks];
					if (!perkObj) {
						console.log("could not get " + perk);
						return <></>;
					}
					return (
						<div
							key={perkObj.name}
							className="flex items-center justify-center h-35 w-35 bg-cover bg-center relative"
							style={{
								backgroundImage: `url('/ranked/invSlot.png')`,
							}}
						>
							<img
								src={"/perks/" + perkObj.icon}
								height={120}
								width={120}
								style={{ imageRendering: "pixelated" }}
								className="peer"
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
								className="fixed lg:absolute top-full left-[-1/10] mt-2 w-full lg:w-100 p-2 rounded items-center justify-center opacity-0 group-hover:opacity-100 peer-hover:opacity-100 transition-opacity bg-black/90 z-10 text-xl text-white text-left pointer-events-none group-focus-within:opacity-100 group-focus-within:pointer-events-auto"
								tabIndex={-1}
							>
								{/* <MinecraftText>{perkObj.name}</MinecraftText> */}
								{Object.values(perkObj.lore).map((loreLine, index) => (
									<MinecraftText key={index}>{loreLine}</MinecraftText>
								))}
							</div>
						</div>
					);
				})
			) : (
				<span>No perks equipped?!</span>
			)}
		</div>
	);
}

export default Perks;
