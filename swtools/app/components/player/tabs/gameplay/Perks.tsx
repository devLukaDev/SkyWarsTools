import { OverallResponse } from "@/app/types/OverallResponse";
import React from "react";

function Perks({ response }: { response: OverallResponse }) {
	const renderPerkName = (perk: string | null | undefined) => {
		if (!perk) return "None";
		return perk
			.replace(/_/g, " ")
			.replace(/\bsolo\b/gi, "")
			.replace(/\bteam\b/gi, "")
			.replace(/\b\w/g, (char) => char.toUpperCase());
	};
	return (
		<div className="w-full flex flex-col lg:flex-row gap-8 justify-center items-start">
			{/* Normal Perks Table */}
			<div className="w-full lg:w-1/2">
				<table className="p-4 w-full text-left bg-content">
					<tbody>
						{response.stats.perkslot?.normal && Object.values(response.stats.perkslot.normal).some((perk) => perk) ? (
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
	);
}

export default Perks;
