
import { DescentItem, DescentMap } from "../types/DescentMap";
import { OverallResponse } from "../types/OverallResponse";
import { Scheme } from "./Scheme";

export function kitProcessing(value: string): string {
	const parts = value.split("_");
	return toCamelCase(parts[parts.length - 1]);
}

export function calcLevel(xp: number): number {
	const perLevelXp = [10, 25, 50, 75, 100, 250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2500, 3000, 3500, 4000, 4500, 5000];

	let level = 1;
	for (let i = 0; i < perLevelXp.length; i++) {
		if (xp < perLevelXp[i]) {
			return level + xp / perLevelXp[i];
		}
		xp -= perLevelXp[i];
		level++;
	}

	level += Math.floor(xp / 5000);
	const remainder = xp % 5000;
	return level + remainder / 5000;
}

export function calcLevelOld(xp: number): number {
	const xps = [0, 20, 70, 150, 250, 500, 1000, 2000, 3500, 6000, 10000, 15000];
	let exactLevel = 0;
	if (xp >= 15000) {
		exactLevel = (xp - 15000) / 10000 + 12;
		// Calculate the exactLevel for players whose level is 12 or above.
	} else {
		for (let i = 0; i < xps.length; i++) {
			// Loop through the xps array and determine the integer value of the player's level.
			if (xp < xps[i]) {
				exactLevel = i + (xp - xps[i - 1]) / (xps[i] - xps[i - 1]);
				break;
				// If xp < xps[i], the integer value of level is found. Hence, calculate the exactLevel and stop the loop.
			}
		}
	}
	return exactLevel;
}

export function formatPlaytime(playtime: number): string {
	const days = Math.floor(playtime / (24 * 3600));
	playtime %= 24 * 3600;
	const hours = Math.floor(playtime / 3600);
	playtime %= 3600;
	const minutes = Math.floor(playtime / 60);

	const result = [];
	if (days > 0) result.push(`${days}d`);
	if (hours > 0) result.push(`${hours}h`);
	result.push(`${minutes}m`);
	return result.join(" ");
}

export function toCamelCase(input: string): string {
	// Convert input string to lower case and split by non-alphanumeric characters
	const words = input.toLowerCase().split(/[^a-z0-9]+/);

	// Combine the words into camel case
	return words
		.map((word) => {
			// Capitalize the first letter of each word
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(" ");
}
export function timeDiff(later: number, earlier: number): string {
	let diff = later - earlier; // difference in seconds
	diff = diff / 1000;
	if (diff < 0) return "in the future";
	const days = Math.floor(diff / (24 * 3600));
	diff %= 24 * 3600;
	const hours = Math.floor(diff / 3600);
	diff %= 3600;
	const minutes = Math.floor(diff / 60);

	return `${days}d ${hours}h ${minutes}m`;
}

export function parseKitStatsKey(key: string): {
	original: string;
	stat: string;
	mode: string;
	kit: string;
} {
	let stat;
	let mode;
	let kitName;
	if (key.includes("mythical")) {
		const parts = key.split("kit_");
		stat = parts[0];
		const kit = parts[1];

		const kitParts = kit.split("_");
		mode = "mythical";
		kitName = kitParts[1];
	} else if (key.includes("mini_solo")) {
		const parts = key.split("_");
		stat = "";
		mode = "mini";
		kitName = parts[parts.length - 1];
	} else {
		const parts = key.split("kit_");
		stat = parts[0];
		const kit = parts[1];

		const kitParts = kit.split("_");
		mode = kitParts[1];
		kitName = kitParts[2];
	}
	// console.log(key, stat, mode, kitName);
	return {
		original: key,
		stat: stat,
		mode: toCamelCase(mode),
		kit: toCamelCase(kitName),
	};
}

export function calcHypixelLevel(experience: number) {
	const level = Math.sqrt(experience / 1250 + 12.25) - 2.5;
	const floored = Math.round((level + Number.EPSILON) * 100) / 100;
	return floored.toString();
}

type TimeAgoOptions = {
	showSeconds?: boolean;
	showMinutes?: boolean;
	showHours?: boolean;
	showDays?: boolean;
	showYears?: boolean;
};
export function timeAgo(
	unixTimestamp: number,
	options: TimeAgoOptions = {
		showSeconds: false,
		showMinutes: true,
		showHours: true,
		showDays: true,
		showYears: true,
	},
): string {
	const now = Math.floor(Date.now() / 1000);
	let diff = now - unixTimestamp;

	if (diff < 0) return "in the future";

	const years = Math.floor(diff / (365 * 24 * 3600));
	diff %= 365 * 24 * 3600;
	const days = Math.floor(diff / (24 * 3600));
	diff %= 24 * 3600;
	const hours = Math.floor(diff / 3600);
	diff %= 3600;
	const minutes = Math.floor(diff / 60);
	const seconds = diff % 60;

	const parts: string[] = [];
	if (options.showYears && years > 0) parts.push(`${years}y`);
	if (options.showDays && days > 0) parts.push(`${days}d`);
	if (options.showHours && hours > 0) parts.push(`${hours}h`);
	if (options.showMinutes && minutes > 0) parts.push(`${minutes}m`);
	if (options.showSeconds && seconds > 0 && parts.length === 0) parts.push(`${seconds}s`);

	return parts.length > 0 ? `${parts.join(" ")} ago` : "just now";
}

export function formatTimestampToVerboseDate(timestamp: number): string {
	if (isNaN(timestamp)) {
		return "Invalid date"; // Handle NaN case
	}
	const date = new Date(timestamp);

	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	};
	return date.toLocaleDateString(undefined, options);
}

export function calcKitPrestigeLevel(xp: number): number {
	const perLevelXp = [1000, 2500, 5000, 10000, 15000, 20000, 25000];

	if (xp > perLevelXp[perLevelXp.length - 1]) {
		return 7;
	}
	if (xp < perLevelXp[0]) {
		return 0;
	}

	let level = 0;
	for (let i = 0; i < perLevelXp.length; i++) {
		if (xp < perLevelXp[i]) {
			return level + xp / perLevelXp[i];
		}
		level++;
	}
	return 0; // shouldnt be hit - this keeps typescript happy
}
export function calcKitPrestigeExp(level: number): number {
	const perLevelXp = [1000, 2500, 5000, 10000, 15000, 20000, 25000];
	return perLevelXp[level - 1] || 0; // Return 0 if level is out of bounds
}

export function calcEXPFromLevel(level: number): number {
	// sw level that is

	const perLevelXp = [10, 25, 50, 75, 100, 250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2500, 3000, 3500, 4000, 4500, 5000];

	if (level <= 1) return 0;

	const fullLevel = Math.floor(level);
	const fractional = level - fullLevel;
	let xp = 0;

	for (let i = 0; i < fullLevel - 1 && i < perLevelXp.length; i++) {
		xp += perLevelXp[i];
	}

	if (fullLevel - 1 < perLevelXp.length) {
		xp += fractional * perLevelXp[fullLevel - 1];
	} else {
		xp += (fullLevel - 1 - perLevelXp.length) * 5000;
		xp += fractional * 5000;
	}

	return xp;
}

// Skywars leveling system

// export type PrestigeObject = {
// 	currentColor: string;
// 	emblem: string;
// 	icon: string;
// 	name: string;
// 	rank: string | string[];
// };

// const prestigeColors: { [key: number]: PrestigeObject } = {
// 	0: {
// 		rank: "§7",
// 		emblem: "§7",
// 		name: "Default",
// 		currentColor: "#808080", // GRAY
// 		icon: "✯",
// 	}, // GRAY
// 	10: {
// 		rank: "§f",
// 		emblem: "§f",
// 		name: "Iron",
// 		currentColor: "#D4D4D4", // SILVER
// 		icon: "✙",
// 	}, // WHITE
// 	20: {
// 		rank: "§6",
// 		emblem: "§6",
// 		name: "Gold",
// 		currentColor: "#FFD700", // GOLD
// 		icon: "❤",
// 	}, // GOLD
// 	30: {
// 		rank: "§b",
// 		emblem: "§b",
// 		name: "Diamond",
// 		currentColor: "#00FFFF", // DIAMOND BLUE
// 		icon: "☠",
// 	}, // AQUA
// 	40: {
// 		rank: "§c",
// 		emblem: "§c",
// 		name: "Ruby",
// 		currentColor: "#E0115F", // RUBY RED
// 		icon: "❦",
// 	}, // RED
// 	50: {
// 		rank: "§d",
// 		emblem: "§d",
// 		name: "Crystal",
// 		currentColor: "#E6E6FA", // LAVENDER
// 		icon: "✵",
// 	}, // LIGHT_PURPLE
// 	60: {
// 		rank: "§5",
// 		emblem: "§5",
// 		name: "Amethyst",
// 		currentColor: "#9966CC", // AMETHYST PURPLE
// 		icon: "☯",
// 	}, // DARK_PURPLE
// 	70: {
// 		rank: "§9",
// 		emblem: "§9",
// 		name: "Opal",
// 		currentColor: "#1E90FF", // DODGER BLUE
// 		icon: "❣",
// 	}, // BLUE
// 	80: {
// 		rank: "§e",
// 		emblem: "§e",
// 		name: "Topaz",
// 		currentColor: "#FFC87C", // TOPAZ ORANGE
// 		icon: "✦",
// 	}, // YELLOW
// 	90: {
// 		rank: "§a",
// 		emblem: "§a",
// 		name: "Jade",
// 		currentColor: "#00A86B", // JADE GREEN
// 		icon: "✰",
// 	}, // GREEN
// 	100: {
// 		rank: ["§c", "§6", "§e", "§a", "§d"],
// 		emblem: "§b",
// 		name: "Mythic I",
// 		currentColor: "#FF69B4", // HOT PINK
// 		icon: "@_@",
// 	}, // MYTHIC 1
// 	110: {
// 		rank: ["§4", "§c", "§c", "§c", "§4"],
// 		emblem: "§c",
// 		name: "Bloody",
// 		currentColor: "#8B0000", // DARK RED
// 		icon: "✈",
// 	}, // BLOODY
// 	120: {
// 		rank: "§1",
// 		emblem: "§1",
// 		name: "Cobalt",
// 		currentColor: "#0047AB", // COBALT BLUE
// 		icon: "✈",
// 	},
// 	130: {
// 		rank: ["§c", "§f", "§f", "§f", "§c"],
// 		emblem: "§f",
// 		name: "Content",
// 		currentColor: "#FFDAB9", // PEACH
// 		icon: "✠",
// 	}, // CONTENT
// 	140: {
// 		rank: "§4",
// 		emblem: "§4",
// 		name: "Crimson",
// 		currentColor: "#DC143C", // CRIMSON RED
// 		icon: "♕",
// 	}, // CRIMSON
// 	150: {
// 		rank: ["§6", "§e", "§e", "§e", "§6"],
// 		emblem: "§e",
// 		name: "Firefly",
// 		currentColor: "#FFA500", // ORANGE
// 		icon: "δvδ",
// 	}, // TITANIUM II
// 	160: {
// 		rank: "§2",
// 		emblem: "§2",
// 		name: "Emerald",
// 		currentColor: "#50C878", // EMERALD GREEN
// 		icon: "∴",
// 	}, // EMERALD
// 	170: {
// 		rank: ["§1", "§9", "§9", "§9", "§1"],
// 		emblem: "§9",
// 		name: "Abyss",
// 		currentColor: "#191970", // MIDNIGHT BLUE
// 		icon: "✰",
// 	}, // ABYSS
// 	180: {
// 		rank: "§3",
// 		emblem: "§3",
// 		name: "Sapphire",
// 		currentColor: "#0F52BA", // SAPPHIRE BLUE
// 		icon: "⁑",
// 	}, // Sapphire
// 	190: {
// 		rank: ["§4", "§e", "§e", "§e", "§4"],
// 		emblem: "§e",
// 		name: "Emergency",
// 		currentColor: "#FF4500", // ORANGE RED
// 		icon: "☢",
// 	}, // Emergency
// 	200: {
// 		rank: ["§6", "§e", "§a", "§b", "§c"],
// 		emblem: "§d",
// 		name: "Mythic II",
// 		currentColor: "#FF1493", // DEEP PINK
// 		icon: "zz_zz",
// 	}, // Mythic II
// 	210: {
// 		rank: ["§5", "§d", "§d", "§d", "§5"],
// 		emblem: "§d",
// 		name: "Mulberry",
// 		currentColor: "#C54B8C", // MULBERRY
// 		icon: "♝",
// 	},
// 	220: {
// 		rank: "§8",
// 		emblem: "§8",
// 		name: "Slate",
// 		currentColor: "#708090", // SLATE GRAY
// 		icon: "🔱",
// 	},
// 	230: {
// 		rank: ["§d", "§b", "§b", "§b", "§d"],
// 		emblem: "§b",
// 		name: "Blood God",
// 		currentColor: "#8B0000", // DARK BLOOD RED
// 		icon: "☁",
// 	},
// 	240: {
// 		rank: "§0",
// 		emblem: "§0",
// 		name: "Midnight",
// 		currentColor: "#191970", // MIDNIGHT BLUE
// 		icon: "⍟",
// 	},
// 	250: {
// 		rank: ["§c", "§e", "§e", "§e", "§c"],
// 		emblem: "§6",
// 		name: "Sun",
// 		currentColor: "#FFD700", // SUN YELLOW
// 		icon: "♗",
// 	},
// 	260: {
// 		rank: ["§1", "§6", "§6", "§6", "§0"],
// 		emblem: "§e",
// 		name: "Bulb",
// 		currentColor: "#FFFFE0", // LIGHT YELLOW
// 		icon: "♔",
// 	},
// 	270: {
// 		rank: ["§1", "§3", "§3", "§3", "§1"],
// 		emblem: "§3",
// 		name: "Twilight",
// 		currentColor: "#483D8B", // DARK SLATE BLUE
// 		icon: "♞",
// 	},
// 	280: {
// 		rank: ["§a", "§1", "§a", "§e", "§1"],
// 		emblem: "§a",
// 		name: "Natural",
// 		currentColor: "#228B22", // FOREST GREEN
// 		icon: "✏",
// 	},
// 	290: {
// 		rank: ["§9", "§b", "§b", "§b", "§9"],
// 		emblem: "§b",
// 		name: "Icicle",
// 		currentColor: "#ADD8E6", // LIGHT BLUE
// 		icon: "❈",
// 	},
// 	300: {
// 		rank: ["§f", "§a", "§c", "§d", "§6"],
// 		emblem: "§c",
// 		name: "Mythic III",
// 		currentColor: "#FF69B4", // HOT PINK
// 		icon: "ಠ_ಠ",
// 	},
// 	310: {
// 		rank: ["§8", "§7", "§7", "§7", "§8"],
// 		emblem: "§7",
// 		name: "Graphite",
// 		currentColor: "#2F4F4F", // DARK SLATE GRAY
// 		icon: "ಠ_ಠ",
// 	},
// 	320: {
// 		rank: ["§d", "§a", "§a", "§a", "§d"],
// 		emblem: "§a",
// 		name: "Punk",
// 		currentColor: "#FF4500", // ORANGE RED
// 		icon: "ಠ_ಠ",
// 	},
// 	330: {
// 		rank: ["§e", "§c", "§c", "§c", "§e"],
// 		emblem: "§c",
// 		name: "Meltdown",
// 		currentColor: "#FF6347", // TOMATO
// 		icon: "ಠ_ಠ",
// 	},
// 	340: {
// 		rank: ["§c", "§a", "§b", "§d", "§a"],
// 		emblem: "§a",
// 		name: "Iridescent",
// 		currentColor: "#DA70D6", // ORCHID
// 		icon: "ಠ_ಠ",
// 	},
// 	350: {
// 		rank: ["§f", "§f", "§e", "§e", "§6"],
// 		emblem: "§6",
// 		name: "Marigold",
// 		currentColor: "#FFB347", // MARIGOLD ORANGE
// 		icon: "o...0",
// 	},
// 	360: {
// 		rank: ["§9", "§9", "§b", "§f", "§e"], // need proof
// 		emblem: "§e",
// 		name: "Beach",
// 		currentColor: "#87CEEB", // SKY BLUE
// 		icon: "ಠ_ಠ",
// 	},
// 	370: {
// 		rank: ["§e", "§e", "§f", "§f", "§6"],
// 		emblem: "§6",
// 		name: "Spark",
// 		currentColor: "#FFD700", // GOLDEN YELLOW
// 		icon: "ಠ_ಠ",
// 	},
// 	380: {
// 		rank: ["§c", "§f", "§c", "§c", "§c"],
// 		emblem: "§f",
// 		name: "Target",
// 		currentColor: "#FF0000", // BRIGHT RED
// 		icon: "ಠ_ಠ",
// 	},
// 	390: {
// 		rank: ["§2", "§a", "§a", "§a", "§2"],
// 		emblem: "§a",
// 		name: "Limelight",
// 		currentColor: "#32CD32", // LIME GREEN
// 		icon: "ಠ_ಠ",
// 	},
// 	400: {
// 		rank: ["§a", "§b", "§d", "§c", "§e"],
// 		emblem: "§6",
// 		name: "Mythic IV",
// 		currentColor: "#FF69B4", // HOT PINK
// 		icon: ">u<",
// 	},
// 	410: {
// 		rank: ["§3", "§c", "§c", "§c", "§3"],
// 		emblem: "§c",
// 		name: "Cerulean",
// 		currentColor: "#007BA7", // CERULEAN BLUE
// 		icon: "ಠ_ಠ",
// 	},
// 	420: {
// 		rank: ["§1", "§8", "§8", "§8", "§1"],
// 		emblem: "§5",
// 		name: "Magical",
// 		currentColor: "#8A2BE2", // BLUE VIOLET
// 		icon: "ಠ_ಠ",
// 	},
// 	430: {
// 		rank: ["§6", "§f", "§f", "§f", "§3"],
// 		emblem: "§b",
// 		name: "Luminous",
// 		currentColor: "#FFFFE0", // LIGHT YELLOW
// 		icon: "ಠ_ಠ",
// 	},
// 	440: {
// 		rank: ["§a", "§a", "§e", "§e", "§f"],
// 		emblem: "§f",
// 		name: "Synthesis",
// 		currentColor: "#00FA9A", // MEDIUM SPRING GREEN
// 		icon: "ಠ_ಠ",
// 	},
// 	450: {
// 		rank: ["§4", "§6", "§c", "§6", "§f"], // need proof
// 		emblem: "§e",
// 		name: "Burn",
// 		currentColor: "#FF4500", // ORANGE RED
// 		icon: "v_v",
// 	},
// 	460: {
// 		rank: ["§9", "§3", "§d", "§9", "§4"], // idk need proof
// 		emblem: "§5",
// 		name: "Dramatic",
// 		currentColor: "#8B0000", // DARK RED
// 		icon: "ಠ_ಠ",
// 	},
// 	470: {
// 		rank: ["§0", "§8", "§7", "§f", "§8"],
// 		emblem: "§7",
// 		name: "Radiant",
// 		currentColor: "#FFD700", // GOLDEN YELLOW
// 		icon: "ಠ_ಠ",
// 	},
// 	480: {
// 		rank: ["§1", "§1", "§9", "§3", "§f"],
// 		emblem: "§b",
// 		name: "Tidal",
// 		currentColor: "#4682B4", // STEEL BLUE
// 		icon: "ಠ_ಠ",
// 	},
// 	490: {
// 		rank: ["§9", "§b", "§f", "§f", "§4"],
// 		emblem: "§c",
// 		name: "Firework",
// 		currentColor: "#FF6347", // TOMATO
// 		icon: "ಠ_ಠ",
// 	},
// 	500: {
// 		rank: ["§b", "§d", "§c", "§6", "§a"],
// 		emblem: "§e",
// 		name: "Mythic V",
// 		currentColor: "#FF69B4", // HOT PINK
// 		icon: "ಠ_ಠ",
// 	},
// 	9999: {
// 		rank: "§c",
// 		emblem: "§c",
// 		name: "???",
// 		currentColor: "#FF0000", // BRIGHT RED
// 		icon: "",
// 	},
// };



export function romanize(num: number): string {
	if (isNaN(num)) return "";
	if (num == 0) return "0";
	const lookup: [number, string][] = [
		[1000, "M"],
		[900, "CM"],
		[500, "D"],
		[400, "CD"],
		[100, "C"],
		[90, "XC"],
		[50, "L"],
		[40, "XL"],
		[10, "X"],
		[9, "IX"],
		[5, "V"],
		[4, "IV"],
		[1, "I"],
	];
	let roman = "";
	for (const [value, numeral] of lookup) {
		while (num >= value) {
			roman += numeral;
			num -= value;
		}
	}
	return roman;
}

// Descent stuff (ported from JS)
export function combineDescentData(overall: OverallResponse, descentData: DescentMap) {
	const combinedData = { ...descentData };
	try {
		Object.keys(combinedData).forEach((key) => {
			const typedKey = key as keyof DescentMap;
			let owns;
			if (overall.stats[key as keyof OverallResponse["stats"]] === undefined) {
				owns = overall.stats.packages?.includes(key) ? true : false;
			} else {
				owns = overall.stats[key as keyof OverallResponse["stats"]];
			}
			combinedData[typedKey]["playerOwns"] = owns as boolean | number;
		});
	} catch (e) {
		console.error("Error combining descent data:", e);
		return descentData; // Return original data in case of error
	}
	return combinedData;
}

export function calculateOpalsSpent(playerDescentData: DescentMap): number {
	let spent = 0;

	Object.keys(playerDescentData).forEach((key) => {
		const object: DescentItem = playerDescentData[key as keyof DescentMap];
		if (object.playerOwns != false && object.playerOwns) {
			if (object.tiers.length > 1) {
				spent += object.tiers[0].cost * (object.playerOwns as number);
				// Not really a safe cast, but this is ported over from JS, the edge case in which this errors does not occur
			} else {
				spent += object.tiers[0].cost;
			}
		}
	});

	return spent;
}

export function calculateCraftableOpals(souls: number, opalsmith: number) {
	let craftable = 0;
	if (opalsmith == 1) {
		craftable = Math.floor(souls / 1250);
	} else {
		craftable = Math.floor(souls / 1500);
	}
	return craftable;
}

export function calculateOpalProgress(souls: number, opalsmith: number) {
	let progress = 0;
	if (opalsmith == 1) {
		progress = (souls / 1250) % 1;
	} else {
		progress = (souls / 1500) % 1;
	}
	progress *= 100;
	return progress;
}

export type KitPrestigeInfo = {
	key: number;
	name: string;
	minXp: number;
	megaXp: number;
	color: string;
	rewards: string[];
};
export const kitPrestiges: Record<number, KitPrestigeInfo> = {
	0: { key: 0, name: "-", minXp: 0, megaXp: 0, color: "#808080", rewards: [] }, // Gray
	1: { key: 1, name: "I", minXp: 1000, megaXp: 1000, color: "#ffffff", rewards: ["§650,000 Coins", "§fSilver §7Particle Trail"] }, // Silver
	2: { key: 2, name: "II", minXp: 2500, megaXp: 2000, color: "#00ff22", rewards: ["§6100,000 Coins", "§2Green §7Particle Trail"] }, // Green
	3: { key: 3, name: "III", minXp: 5000, megaXp: 3000, color: "#0088ff", rewards: ["§6250,000 Coins", "§9Blue §7Particle Trail"] }, // Blue
	4: { key: 4, name: "IV", minXp: 10000, megaXp: 4000, color: "#9911aa", rewards: ["§31 §7Opal", "§dPurple §7Particle Trail"] }, // Purple
	5: { key: 5, name: "V", minXp: 15000, megaXp: 6000, color: "orange", rewards: ["§31 §7Opal", "§6Gold §7Particle Trail"] }, // Gold
	6: { key: 6, name: "VI", minXp: 20000, megaXp: 8000, color: "#ff22ff", rewards: ["§31 §7Opal", "§dPink §7Particle Trail"] }, // Pink
	7: {
		key: 7,
		name: "VII",
		minXp: 25000,
		megaXp: 10000,
		color: "linear-gradient(90deg, #FF0000 0%, #FF7F00 16%, #FFFF00 33%, #00FF00 50%, #0000FF 66%, #4B0082 83%, #9400D3 100%)",
		rewards: ["§31 §7Opal", "§cR§6a§ei§an§bb§3o§dw §7Particle Trail"],
	}, // Rainbow Gradient
};

export function getKitPrestigeInfo(kitExp: number, useMega?: boolean): KitPrestigeInfo {
	const levels = Object.keys(kitPrestiges)
		.map(Number)
		.sort((a, b) => a - b);

	let lastPrestige = kitPrestiges[0];
	for (const lvl of levels) {
		let minXp = kitPrestiges[lvl].minXp;
		if (useMega) minXp = kitPrestiges[lvl].megaXp;
		if (kitExp >= minXp) {
			lastPrestige = kitPrestiges[lvl];
		} else {
			break;
		}
	}
	return lastPrestige;
}
export function getKitPrestigeInfoByPrestige(prestige: number): KitPrestigeInfo {
	const prestigeR = Math.floor(prestige);
	return kitPrestiges[prestigeR] || kitPrestiges[0];
}

export async function fetcher<T = unknown>(url: string): Promise<T> {
	console.log("Fetching without auth");
	const res = await fetch(url);

	if (!res.ok) {
		const error: Error & { statusText?: unknown; statusCode?: number } = new Error("An error occurred while fetching the data.");
		try {
			error.statusText = await res.json().then((data) => data.cause);
		} catch {
			error.statusText = null;
		}
		error.statusCode = res.status;
		throw error;
	}

	return res.json() as Promise<T>;
}
export async function fetcherWithAuth<T = unknown>(token: string, url: string): Promise<T> {
	console.log("fet6ching with auth");
	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!res.ok) {
		const error: Error & { statusText?: unknown; statusCode?: number } = new Error("An error occurred while fetching the data.");
		try {
			error.statusText = await res.json().then((data) => data.cause);
		} catch {
			error.statusText = null;
		}
		error.statusCode = res.status;
		throw error;
	}

	return res.json() as Promise<T>;
}
// no explicit any, this is some AI typescript magic

export function shortenUUID(uuid: string): string {
	return uuid.replace(/-/g, "").toLowerCase();
}

export function unshortenUUID(uuid: string): string {
	return uuid.slice(0, 8) + "-" + uuid.slice(8, 12) + "-" + uuid.slice(12, 16) + "-" + uuid.slice(16, 20) + "-" + uuid.slice(20, 32);
}

export function fillMCColorText(ctx: CanvasRenderingContext2D, str: string, box: number[]) {
	ctx.textAlign = "left";
	let x = 0;
	const y = box[1] + box[3] / 2;
	const colorMap: Record<string, string> = {
		"0": "#000000",
		"1": "#0000AA",
		"2": "#00AA00",
		"3": "#00AAAA",
		"4": "#AA0000",
		"5": "#AA00AA",
		"6": "#FFAA00",
		"7": "#AAAAAA",
		"8": "#555555",
		"9": "#5555FF",
		a: "#55FF55",
		b: "#55FFFF",
		c: "#FF5555",
		d: "#FF55FF",
		e: "#FFFF55",
		f: "#FFFFFF",
		r: "#FFFFFF", // reset to white
	};
	let currentColor = "#AAAAAA";
	const segments = str.split(/(§[0-9a-fk-or])/g).filter(Boolean);
	let totalWidth = 0;
	segments.forEach((segment) => {
		if (segment.startsWith("§")) {
			currentColor = colorMap[segment[1]] || currentColor;
		} else {
			ctx.fillStyle = currentColor;
			const width = ctx.measureText(segment).width;
			totalWidth += width;
		}
	});

	x = box[0] + box[2] - totalWidth / 2 - box[2] / 2; // heck me
	segments.forEach((segment) => {
		if (segment.startsWith("§")) {
			currentColor = colorMap[segment[1]] || currentColor;
		} else {
			ctx.fillStyle = currentColor;
			ctx.fillText(segment, x, y);
			const width = ctx.measureText(segment).width;
			x += width;
			totalWidth += width;
		}
	});

	ctx.textAlign = "center";
}

// Fetch function for admin API
export async function fetchAdminData(token: string | null, urlSuffix: string, method: string = "GET") {
	if (!token) throw new Error("No auth token provided");

	const url = `${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/admin/${urlSuffix}`;

	const res = await fetch(url, {
		method: method,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
	const data = await res.json();
	if (data.success !== true) {
		throw new Error(data.cause || "Unknown error");
	}
	return data;
}

export const headsMap = [
	{ key: "heads_eww", label: "Eww", kills: 0, exp: 1, playerKills: 0, playerEXP: 0, color: "#A9A9A9ff" },
	{ key: "heads_yucky", label: "Yucky", kills: 50, exp: 2, playerKills: 0, playerEXP: 0, color: "#808080ff" },
	{ key: "heads_meh", label: "Meh", kills: 200, exp: 3, playerKills: 0, playerEXP: 0, color: "#FFFFFFff" },
	{ key: "heads_decent", label: "Decent", kills: 500, exp: 4, playerKills: 0, playerEXP: 0, color: "#FFFF00ff" },
	{ key: "heads_salty", label: "Salty", kills: 1000, exp: 5, playerKills: 0, playerEXP: 0, color: "#008000ff" },
	{ key: "heads_tasty", label: "Tasty", kills: 2000, exp: 6, playerKills: 0, playerEXP: 0, color: "#ADD8E6ff" },
	{ key: "heads_succulent", label: "Succulent", kills: 5000, exp: 7, playerKills: 0, playerEXP: 0, color: "#00AAAAff" },
	{ key: "heads_divine", label: "Divine", kills: 10000, exp: 10, playerKills: 0, playerEXP: 0, color: "#FFC0CBff" },
	{ key: "heads_heavenly", label: "Heavenly", kills: 25000, exp: 15, playerKills: 0, playerEXP: 0, color: "#800080ff" },
	{ key: "heads_ethereal", label: "Ethereal", kills: 50000, exp: 20, playerKills: 0, playerEXP: 0, color: "#8B0000ff" },
	{ key: "heads_indescribable", label: "Indescribable", kills: 100000, exp: 25, playerKills: 0, playerEXP: 0, color: "#FF0000ff" },
	{ key: "heads_special", label: "Special", kills: "YouTube", exp: 25, playerKills: 0, playerEXP: 0, color: "#FF0000ff" },
	{ key: "heads_sweet", label: "Sweet", kills: "Admin", exp: 25, playerKills: 0, playerEXP: 0, color: "#FF0000ff" },
];

export const formatSchemePreview = (scheme: Scheme, level: number) => {
	const levelStr: string = Math.floor(level).toString();

	let rankColor: string[] | string = scheme.rankColor;
	const iconColor: string = scheme.iconColor;

	let formattedScheme: string = "";
	const icon: string = "★";

	if (Array.isArray(rankColor)) {
		// Scheme is not just 1 color, its an array
		formattedScheme = scheme.rankColor[0];
		// If below level 100, the array has 1 too many colors - we get rid of the color on index 1, which is 1st number after the bracket basically
		if (level < 100) rankColor = Array.isArray(scheme.rankColor) ? scheme.rankColor.filter((_, i) => i !== 1) : scheme.rankColor;

		// Color for the first bracket, along with the actual bracket itself
		formattedScheme += rankColor[0] + "[";

		// We go over every digit in the level, and prepend the color from the array for that position
		for (let index = 0; index < levelStr.length; index++) {
			const char = levelStr.charAt(index);
			formattedScheme += rankColor[index + 1] + char;
		}

		// Icon and its color
		formattedScheme += iconColor + icon;
		// We end with the last color from the array, which is for the closing bracket
		formattedScheme += rankColor[rankColor.length - 1] + "]";
	} else {
		// Color is a single § code string -> '§2'
		formattedScheme += rankColor + "[" + levelStr + iconColor + icon + "]";
	}
	return formattedScheme;
};

export function getRedisKey(date: Date): string {
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function formatTimestampShort(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	return `${year}-${month}-${day} ${hours}:${minutes}`;
}