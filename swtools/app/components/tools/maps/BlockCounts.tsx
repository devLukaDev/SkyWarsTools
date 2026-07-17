"use client";
import React from "react";

// Matches SWMap["blockStats"]["ores"]: keys are "x,y,z" coordinate
// strings, e.g. "-66,69,-13". Values are the block found at that
// coordinate, e.g. "Block{minecraft:diamond_ore}".
type OresData = Record<string, string>;;

type BlockCount = {
	blockValue: string; // raw value, e.g. "Block{minecraft:diamond_ore}"
	label: string; // formatted display name, e.g. "Diamond Ore"
	count: number;
};

const formatBlockLabel = (rawValue: string): string => {
	// rawValue looks like "Block{minecraft:diamond_ore}"
	const match = rawValue.match(/Block\{(?:[a-z0-9_]+:)?([a-z0-9_]+)\}/i);
	const id = match ? match[1] : rawValue;
	return id
		.split("_")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};

const buildBlockCounts = (ores: OresData): BlockCount[] => {
	const counts = new Map<string, number>();

	// Iterate coordinate -> block pairs; the coordinate key is never used
	// for counting, only the block value at that coordinate.
	for (const blockValue of Object.values(ores)) {
		counts.set(blockValue, (counts.get(blockValue) ?? 0) + 1);
	}
	return Array.from(counts.entries())
		.map(([blockValue, count]) => ({
			blockValue,
			label: formatBlockLabel(blockValue),
			count,
		}))
		.sort((a, b) => b.count - a.count);
};

const BlockCounts = ({ ores }: { ores: OresData }) => {
	// Usage: <BlockCounts ores={mapData.map.blockStats.ores} />
	const blockCounts = buildBlockCounts(ores);
	const total = blockCounts.reduce((sum, b) => sum + b.count, 0);

	const headerClass = "p-2 text-l lg:text-xl select-none whitespace-nowrap";

	return (
		<div className="w-full rounded-xl my-4">
			<h2 className="text-3xl mb-2">Block counts</h2>
			<div className="overflow-x-auto">
				<table className="w-150 lg:w-full bg-content rounded-lg">
					<thead className="text-left text-accent border-b-2">
						<tr>
							<th className={headerClass}>Block</th>
							<th className={headerClass}>Count</th>
						</tr>
					</thead>
					<tbody>
						{blockCounts.map((block) => (
							<tr key={block.blockValue}>
								<td className="p-2 font-semibold text-lg">{block.label}</td>
								<td className="p-2 font-semibold text-lg">{block.count}</td>
							</tr>
						))}
						<tr className="border-t-2">
							<td className="p-2 font-semibold text-lg text-accent">Total</td>
							<td className="p-2 font-semibold text-lg text-accent">{total}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default BlockCounts;
