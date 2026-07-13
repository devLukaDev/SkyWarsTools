import React from "react";

import { schemes } from "@/app/utils/Scheme";
import { formatSchemePreview } from "@/app/utils/Utils";
import MinecraftText from "@/app/utils/MinecraftText";

const SchemePreviews = () => {


	const formatReq = (req?: string | number) => {
		if (!req) return "None";
		if (typeof req === "number") return "SkyWars Level " + req;
		return req
			.replace(/§5§o§cUnlocked/g, "")
			.replace(/!/g, "")
			.replace(/at/g, "")
			.replace(/through/g, "");
	};
	return (
		<div className="flex flex-col p-4 ">
			<h1 className="text-4xl font-bold text-center my-2">Schemes</h1>
			<span className="font-semibold text-center mb-2 px-3">Get a preview of all SkyWars Schemes and their requirements!</span>
			<div className="w-full overflow-x-auto rounded-xl lg:p-8">
				<table className="min-w-full w-190 lg:w-full bg-content rounded-lg">
					<thead className="text-left text-accent border-b-2">
						<tr>
							<th className="p-2 text-l lg:text-xl">Name</th>
							<th className="p-2 text-l lg:text-xl">3 Digit</th>
							<th className="p-2 text-l lg:text-xl">2 Digit</th>
							<th className="p-2 text-l lg:text-xl">Requirement</th>
						</tr>
					</thead>
					<tbody>
						{/* Slice last one, that i made up for Prestige handyness */}
						{schemes.slice(0, -1).map((scheme) => (
							<tr key={scheme.name}>
								<td className="p-2 font-semibold text-lg">{scheme.formattedName}</td>
								<td className="p-2 font-mono text-xl">
									<MinecraftText>{formatSchemePreview(scheme, 100)}</MinecraftText>
								</td>
								<td className="p-2 font-mono text-xl">
									<MinecraftText>{formatSchemePreview(scheme, 99)}</MinecraftText>
								</td>
								<td className="p-2 font-semibold text-lg w-[40%]">{formatReq(scheme.req)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default SchemePreviews;
