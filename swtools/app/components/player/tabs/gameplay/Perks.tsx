import PortalTooltip from "@/app/components/universal/MinecraftTooltip";
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
						<PortalTooltip
							key={perk}
							trigger={({ ref, onMouseEnter, onMouseLeave, onFocus, onBlur, tabIndex }) => (
								<div
									ref={ref}
									className="flex items-center justify-center h-35 w-35 bg-cover bg-center"
									style={{ backgroundImage: `url('/ranked/invSlot.png')` }}
									onMouseEnter={onMouseEnter}
									onMouseLeave={onMouseLeave}
								>
									<img
										src={"/perks/" + perkObj.icon}
										height={120}
										width={120}
										style={{ imageRendering: "pixelated" }}
										alt=""
										tabIndex={tabIndex}
										onFocus={onFocus}
										onBlur={onBlur}
									/>
								</div>
							)}
						>
							{Object.values(perkObj.lore).map((loreLine, index) => (
								<MinecraftText key={index}>{loreLine}</MinecraftText>
							))}
						</PortalTooltip>
					);
				})
			) : (
				<span>No perks equipped?!</span>
			)}
		</div>
	);
}

export default Perks;
