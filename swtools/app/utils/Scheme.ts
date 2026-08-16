import { OverallResponse } from "../types/OverallResponse";

export type Scheme = {
	name: string;
	rankColor: string | string[];
	iconColor: string;
	req?: string | number;
	reqKit?: string;
	formattedName?: string;
};

// These are somewhat unconfirmed scheme names - these do make sense and if hypixel designed their scheme names normally this will work
export const rawSchemes: Scheme[] = [
	{
		name: "stone_prestige",
		rankColor: "§7",
		iconColor: "§7",
		req: 0,
	},
	{
		name: "iron_prestige",
		rankColor: "§f",
		iconColor: "§f",
		req: 10,
	},
	{
		name: "gold_prestige",
		rankColor: "§6",
		iconColor: "§6",
		req: 20,
	},
	{
		name: "diamond_prestige",
		rankColor: "§b",
		iconColor: "§b",
		req: 30,
	},
	{
		name: "ruby_prestige",
		rankColor: "§c",
		iconColor: "§c",
		req: 40,
	},
	{
		name: "crystal_prestige",
		rankColor: "§d",
		iconColor: "§d",
		req: 50,
	},
	{
		name: "amethyst_prestige",
		rankColor: "§5",
		iconColor: "§5",
		req: 60,
	},
	{
		name: "opal_prestige",
		rankColor: "§9",
		iconColor: "§9",
		req: 70,
	},
	{
		name: "topaz_prestige",
		rankColor: "§e",
		iconColor: "§e",
		req: 80,
	},
	{
		name: "jade_prestige",
		rankColor: "§a",
		iconColor: "§a",
		req: 90,
	},
	{
		name: "cobalt_prestige",
		rankColor: "§1",
		iconColor: "§1",
		req: 120,
	},
	{
		name: "crimson_prestige",
		rankColor: "§4",
		iconColor: "§4",
		req: 140,
	},
	{
		name: "emerald_prestige",
		rankColor: "§2",
		iconColor: "§2",
		req: 160,
	},
	{
		name: "sapphire_prestige",
		rankColor: "§3",
		iconColor: "§3",
		req: 180,
	},
	{
		name: "slate_prestige",
		rankColor: "§8",
		iconColor: "§8",
		req: 220,
	},
	{
		name: "midnight_prestige",
		rankColor: "§0",
		iconColor: "§0",
		req: 240,
	},
	{
		name: "bloody_prestige",
		rankColor: ["§4", "§c", "§c", "§c", "§4"],
		iconColor: "§c",
		req: 110,
	},
	{
		name: "content_prestige",
		rankColor: ["§c", "§f", "§f", "§f", "§c"],
		iconColor: "",
		req: 130,
	},
	{
		name: "firefly_prestige",
		rankColor: ["§6", "§e", "§e", "§e", "§6"],
		iconColor: "§e",
		req: 150,
	},
	{
		name: "abyss_prestige",
		rankColor: ["§1", "§9", "§9", "§9", "§1"],
		iconColor: "§9",
		req: 170,
	},
	{
		name: "emergency_prestige",
		rankColor: ["§4", "§e", "§e", "§e", "§4"],
		iconColor: "§e",
		req: 190,
	},
	{
		name: "mulberry_prestige",
		rankColor: ["§5", "§d", "§d", "§d", "§5"],
		iconColor: "§d",
		req: 210,
	},
	{
		name: "blood_god_prestige",
		rankColor: ["§d", "§b", "§b", "§b", "§d"],
		iconColor: "§b",
		req: 230,
	},
	{
		name: "twilight_prestige",
		rankColor: ["§1", "§3", "§3", "§3", "§1"],
		iconColor: "§3",
		req: 270,
	},
	{
		name: "icicle_prestige",
		rankColor: ["§9", "§b", "§b", "§b", "§9"],
		iconColor: "§b",
		req: 290,
	},
	{
		name: "graphite_prestige",
		rankColor: ["§8", "§7", "§7", "§7", "§8"],
		iconColor: "§7",
		req: 310,
	},
	{
		name: "punk_prestige",
		rankColor: ["§d", "§a", "§a", "§a", "§d"],
		iconColor: "§a",
		req: 320,
	},
	{
		name: "meltdown_prestige",
		rankColor: ["§e", "§c", "§c", "§c", "§e"],
		iconColor: "§c",
		req: 330,
	},
	{
		name: "target_prestige",
		rankColor: ["§c", "§f", "§c", "§c", "§c"],
		iconColor: "§f",
		req: 380,
	},
	{
		name: "limelight_prestige",
		rankColor: ["§2", "§a", "§a", "§a", "§2"],
		iconColor: "§a",
		req: 390,
	},
	{
		name: "cerulean_prestige",
		rankColor: ["§3", "§b", "§b", "§b", "§3"],
		iconColor: "§b",
		req: 410,
	},
	{
		name: "ancient",
		rankColor: ["§7", "§8", "§8", "§8", "§7"],
		iconColor: "§8",
		req: "§5§o§cUnlocked at Archeologist Normal Kit Prestige VII!",
		reqKit: "Archeologist Solo",
	},
	{
		name: "the_new_default",
		rankColor: ["§6", "§7", "§7", "§7", "§6"],
		iconColor: "",
		req: "§5§o§cUnlocked at Armorer Normal Kit Prestige VII!",
		reqKit: "Armorer Solo",
	},
	{
		name: "the_new_new_default",
		rankColor: ["§b", "§7", "§7", "§7", "§b"],
		iconColor: "§b",
		req: "§5§o§cUnlocked at Armorer Insane Kit Prestige VII!",
		reqKit: "Armorer Team",
	},
	{
		name: "launch",
		rankColor: ["§6", "§6", "§6", "§6", "§8"],
		iconColor: "§8",
		req: "§5§o§cUnlocked at Baseball Player Normal Kit Prestige VII!",
		reqKit: "Baseball Player Solo",
	},
	{
		name: "spotlight",
		rankColor: ["§0", "§f", "§f", "§f", "§0"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Disco Normal Kit Prestige VII!",
		reqKit: "Disco Solo",
	},
	{
		name: "earth",
		rankColor: ["§4", "§4", "§4", "§4", "§4"],
		iconColor: "§a",
		req: "§5§o§cUnlocked at Ecologist Normal Kit Prestige VII!",
		reqKit: "Ecologist Solo",
	},
	{
		name: "glint",
		rankColor: ["§d", "§d", "§d", "§d", "§d"],
		iconColor: "§b",
		req: "§5§o§cUnlocked at Enchanter Insane Kit Prestige VII!",
		reqKit: "Enchanter Team",
	},
	{
		name: "strength",
		rankColor: ["§c", "§d", "§d", "§d", "§c"],
		iconColor: "§d",
		req: "§5§o§cUnlocked at Energix Normal Kit Prestige VII!",
		reqKit: "Energix Solo",
	},
	{
		name: "adrenaline",
		rankColor: ["§c", "§a", "§a", "§a", "§c"],
		iconColor: "§a",
		req: "§5§o§cUnlocked at Energix Insane Kit Prestige VII!",
		reqKit: "Energix Team",
	},
	{
		name: "pumpkin",
		rankColor: ["§4", "§6", "§6", "§6", "§4"],
		iconColor: "§6",
		req: "§5§o§cUnlocked at Farmer Insane Kit Prestige VII!",
		reqKit: "Farmer Team",
	},
	{
		name: "seashell",
		rankColor: ["§e", "§e", "§e", "§e", "§e"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Fisherman Mega Kit Prestige VII!",
		reqKit: "Fisherman Mega",
	},
	{
		name: "obsidian",
		rankColor: ["§8", "§8", "§8", "§8", "§8"],
		iconColor: "§5",
		req: "§5§o§cUnlocked at Guardian Normal Kit Prestige VII!",
		reqKit: "Guardian Solo",
	},
	{
		name: "support",
		rankColor: ["§f", "§c", "§c", "§c", "§f"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Healer Mega Kit Prestige VII!",
		reqKit: "Healer Mega",
	},
	{
		name: "mahogany",
		rankColor: ["§e", "§6", "§6", "§6", "§e"],
		iconColor: "§6",
		req: "§5§o§cUnlocked at Hunter Mega Kit Prestige VII!",
		reqKit: "Hunter Mega",
	},
	{
		name: "spell",
		rankColor: ["§d", "§d", "§d", "§e", "§e"],
		iconColor: "§e",
		req: "§5§o§cUnlocked at Magician Insane Kit Prestige VII!",
		reqKit: "Magician Team",
	},
	{
		name: "pillar",
		rankColor: ["§f", "§6", "§6", "§6", "§f"],
		iconColor: "§6",
		req: "§5§o§cUnlocked at Paladin Mega Kit Prestige VII!",
		reqKit: "Paladin Mega",
	},
	{
		name: "agile",
		rankColor: ["§a", "§f", "§f", "§f", "§a"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Scout Insane Kit Prestige VII!",
		reqKit: "Scout Team",
	},
	{
		name: "bone",
		rankColor: ["§f", "§7", "§7", "§7", "§f"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Skeletor Mega Kit Prestige VII!",
		reqKit: "Skeletor Mega",
	},
	{
		name: "slimy",
		rankColor: ["§a", "§2", "§2", "§2", "§a"],
		iconColor: "§2",
		req: "§5§o§cUnlocked at Slime Normal Kit Prestige VII!",
		reqKit: "Slime Solo",
	},
	{
		name: "holiday",
		rankColor: ["§4", "§a", "§a", "§a", "§4"],
		iconColor: "§a",
		req: "§5§o§cUnlocked at Snowman Normal Kit Prestige VII!",
		reqKit: "Snowman Solo",
	},
	{
		name: "iconic",
		rankColor: ["§0", "§0", "§0", "§0", "§0"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Troll Normal Kit Prestige VII!",
		reqKit: "Troll Solo",
	},
	{
		name: "level_conic",
		rankColor: ["§0", "§f", "§f", "§f", "§0"],
		iconColor: "§0",
		req: "§5§o§cUnlocked at Troll Insane Kit Prestige VII!",
		reqKit: "Troll Team",
	},
	{
		name: "safari",
		rankColor: ["§2", "§2", "§2", "§6", "§6"],
		iconColor: "§6",
		req: "§5§o§cUnlocked at Monster Trainer Kit Prestige VII!",
		reqKit: "Monster Trainer Mythical",
	},
	{
		name: "gummy_worm",
		rankColor: ["§c", "§c", "§c", "§b", "§b"],
		iconColor: "§b",
		req: "§5§o§cUnlocked at Fishmonger Kit Prestige VII!",
		reqKit: "Fishmonger Mythical",
	},
	{
		name: "timetravel",
		rankColor: ["§7", "§0", "§0", "§7", "§7"],
		iconColor: "§7",
		req: "§5§o§cUnlocked at Chronobreaker Kit Prestige VII!",
		reqKit: "Chronobreaker Mythical",
	},
	{
		name: "horned",
		rankColor: ["§c", "§8", "§8", "§8", "§c"],
		iconColor: "§8",
		req: "§5§o§cUnlocked at Fallen Angel Insane Kit Prestige VII!",
		reqKit: "Fallen Angel Team",
	},
	{
		name: "basic",
		rankColor: ["§7", "§f", "§f", "§f", "§7"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Default Normal Kit Prestige VII!",
		reqKit: "Default Solo",
	},
	{
		name: "basic_plus",
		rankColor: ["§7", "§6", "§6", "§6", "§7"],
		iconColor: "§6",
		req: "§5§o§cUnlocked at Default Insane Kit Prestige VII!",
		reqKit: "Default Team",
	},
	{
		name: "basic_plus_plus",
		rankColor: ["§7", "§b", "§b", "§b", "§7"],
		iconColor: "§b",
		req: "§5§o§cUnlocked at Default Mega Kit Prestige VII!",
		reqKit: "Default Mega",
	},
	{
		name: "sun_prestige",
		rankColor: ["§c", "§6", "§e", "§e", "§c"],
		iconColor: "§6",
		req: 250,
	},
	{
		name: "bulb_prestige",
		rankColor: ["§0", "§e", "§6", "§6", "§0"],
		iconColor: "§e",
		req: 260,
	},
	{
		name: "natural_prestige",
		rankColor: ["§a", "§2", "§a", "§e", "§2"],
		iconColor: "§a",
		req: 280,
	},
	{
		name: "iridescent_prestige",
		rankColor: ["§b", "§a", "§b", "§d", "§a"],
		iconColor: "§a",
		req: 340,
	},
	{
		name: "marigold_prestige",
		rankColor: ["§f", "§f", "§e", "§e", "§6"],
		iconColor: "§6",
		req: 350,
	},
	{
		name: "spark_prestige",
		rankColor: ["§e", "§e", "§f", "§f", "§8"],
		iconColor: "§8",
		req: 370,
	},
	{
		name: "magical_prestige",
		rankColor: ["§0", "§5", "§8", "§8", "§0"],
		iconColor: "§5",
		req: 420,
	},
	{
		name: "luminous_prestige",
		rankColor: ["§6", "§6", "§f", "§f", "§3"],
		iconColor: "§b",
		req: 430,
	},
	{
		name: "synthesis_prestige",
		rankColor: ["§a", "§2", "§a", "§e", "§f"],
		iconColor: "§f",
		req: 440,
	},
	{
		name: "dramatic_prestige",
		rankColor: ["§9", "§b", "§3", "§d", "§4"],
		iconColor: "§5",
		req: 460,
	},
	{
		name: "radiant_prestige",
		rankColor: ["§0", "§8", "§7", "§f", "§8"],
		iconColor: "§7",
		req: 470,
	},
	{
		name: "sandy",
		rankColor: ["§6", "§e", "§f", "§e", "§e"],
		iconColor: "§6",
		req: "§5§o§cUnlocked at Archeologist Insane Kit Prestige VII!",
		reqKit: "Archeologist Team",
	},
	{
		name: "brutus",
		rankColor: ["§9", "§9", "§8", "§8", "§f"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Armorer Mini Kit Prestige VII!",
		reqKit: "Armorer Mini",
	},
	{
		name: "coinsmith",
		rankColor: ["§e", "§8", "§8", "§8", "§e"],
		iconColor: "§6",
		req: "§5§o§cUnlocked at Armorsmith Normal Kit Prestige VII!",
		reqKit: "Armorsmith Solo",
	},
	{
		name: "soulsmith",
		rankColor: ["§7", "§b", "§b", "§f", "§f"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Armorsmith Mega Kit Prestige VII!",
		reqKit: "Armorsmith Mega",
	},
	{
		name: "grand_slam",
		rankColor: ["§2", "§a", "§a", "§a", "§2"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Baseball Player Mega Kit Prestige VII!",
		reqKit: "Baseball Player Mega",
	},
	{
		name: "fleet",
		rankColor: ["§0", "§c", "§e", "§a", "§0"],
		iconColor: "§a",
		req: "§5§o§cUnlocked at Batguy Normal Kit Prestige VII!",
		reqKit: "Batguy Solo",
	},
	{
		name: "vengeance",
		rankColor: ["§0", "§8", "§8", "§8", "§0"],
		iconColor: "§e",
		req: "§5§o§cUnlocked at Batguy Insane Kit Prestige VII!",
		reqKit: "Batguy Team",
	},
	{
		name: "dry",
		rankColor: ["§e", "§f", "§f", "§f", "§e"],
		iconColor: "§6",
		req: "§5§o§cUnlocked at Cactus Normal Kit Prestige VII!",
		reqKit: "Cactus Solo",
	},
	{
		name: "prickly",
		rankColor: ["§e", "§a", "§a", "§a", "§e"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Cactus Insane Kit Prestige VII!",
		reqKit: "Cactus Team",
	},
	{
		name: "cast_iron",
		rankColor: ["§7", "§7", "§8", "§8", "§3"],
		iconColor: "§3",
		req: "§5§o§cUnlocked at Cannoneer Normal Kit Prestige VII!",
		reqKit: "Cannoneer Solo",
	},
	{
		name: "explosive",
		rankColor: ["§c", "§c", "§e", "§e", "§6"],
		iconColor: "§6",
		req: "§5§o§cUnlocked at Cannoneer Mega Kit Prestige VII!",
		reqKit: "Cannoneer Mega",
	},
	{
		name: "verdant",
		rankColor: ["§2", "§a", "§a", "§e", "§e"],
		iconColor: "§6",
		req: "§5§o§cUnlocked at Ecologist Insane Kit Prestige VII!",
		reqKit: "Ecologist Team",
	},
	{
		name: "enchantment",
		rankColor: ["§f", "§d", "§5", "§5", "§f"],
		iconColor: "§d",
		req: "§5§o§cUnlocked at Enchanter Normal Kit Prestige VII!",
		reqKit: "Enchanter Solo",
	},
	{
		name: "void",
		rankColor: ["§8", "§5", "§5", "§5", "§8"],
		iconColor: "§d",
		req: "§5§o§cUnlocked at Enderchest Normal Kit Prestige VII!",
		reqKit: "Enderchest Solo",
	},
	{
		name: "fragile",
		rankColor: ["§0", "§3", "§3", "§3", "§0"],
		iconColor: "§a",
		req: "§5§o§cUnlocked at Enderchest Insane Kit Prestige VII!",
		reqKit: "Enderchest Team",
	},
	{
		name: "mite",
		rankColor: ["§5", "§d", "§d", "§6", "§e"],
		iconColor: "§e",
		req: "§5§o§cUnlocked at Enderman Normal Kit Prestige VII!",
		reqKit: "Enderman Solo",
	},
	{
		name: "ender",
		rankColor: ["§3", "§2", "§8", "§2", "§3"],
		iconColor: "§a",
		req: "§5§o§cUnlocked at Enderman Insane Kit Prestige VII!",
		reqKit: "Enderman Team",
	},
	{
		name: "shulker",
		rankColor: ["§5", "§e", "§e", "§e", "§5"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Enderman Mega Kit Prestige VII!",
		reqKit: "Enderman Mega",
	},
	{
		name: "redstone",
		rankColor: ["§0", "§c", "§c", "§c", "§0"],
		iconColor: "§4",
		req: "§5§o§cUnlocked at Engineer Normal Kit Prestige VII!",
		reqKit: "Engineer Solo",
	},
	{
		name: "technical",
		rankColor: ["§c", "§c", "§7", "§7", "§8"],
		iconColor: "§8",
		req: "§5§o§cUnlocked at Engineer Insane Kit Prestige VII!",
		reqKit: "Engineer Team",
	},
	{
		name: "melon",
		rankColor: ["§a", "§2", "§a", "§2", "§a"],
		iconColor: "§e",
		req: "§5§o§cUnlocked at Farmer Normal Kit Prestige VII!",
		reqKit: "Farmer Solo",
	},
	{
		name: "driftwood",
		rankColor: ["§3", "§3", "§e", "§e", "§4"],
		iconColor: "§4",
		req: "§5§o§cUnlocked at Fisherman Normal Kit Prestige VII!",
		reqKit: "Fisherman Solo",
	},
	{
		name: "river",
		rankColor: ["§2", "§9", "§9", "§9", "§2"],
		iconColor: "§a",
		req: "§5§o§cUnlocked at Fisherman Insane Kit Prestige VII!",
		reqKit: "Fisherman Team",
	},
	{
		name: "mangrove",
		rankColor: ["§4", "§4", "§c", "§c", "§2"],
		iconColor: "§2",
		req: "§5§o§cUnlocked at Frog Normal Kit Prestige VII!",
		reqKit: "Frog Solo",
	},
	{
		name: "jeremiah",
		rankColor: ["§3", "§6", "§6", "§6", "§3"],
		iconColor: "§e",
		req: "§5§o§cUnlocked at Frog Insane Kit Prestige VII!",
		reqKit: "Frog Team",
	},
	{
		name: "jersey",
		rankColor: ["§f", "§f", "§f", "§f", "§f"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Baseball Player Insane Kit Prestige VII!",
		reqKit: "Baseball Player Team",
	},
	{
		name: "poppy",
		rankColor: ["§c", "§4", "§0", "§0", "§c"],
		iconColor: "§4",
		req: "§5§o§cUnlocked at Golem Insane Kit Prestige VII!",
		reqKit: "Golem Team",
	},
	{
		name: "creeper",
		rankColor: ["§f", "§f", "§a", "§a", "§2"],
		iconColor: "§2",
		req: "§5§o§cUnlocked at Grenade Normal Kit Prestige VII!",
		reqKit: "Grenade Solo",
	},
	{
		name: "camo",
		rankColor: ["§8", "§8", "§2", "§2", "§a"],
		iconColor: "§a",
		req: "§5§o§cUnlocked at Grenade Insane Kit Prestige VII!",
		reqKit: "Grenade Team",
	},
	{
		name: "first_aid",
		rankColor: ["§4", "§f", "§f", "§f", "§4"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Healer Insane Kit Prestige VII!",
		reqKit: "Healer Team",
	},
	{
		name: "penguin",
		rankColor: ["§8", "§9", "§9", "§9", "§8"],
		iconColor: "§e",
		req: "§5§o§cUnlocked at Healer Mini Kit Prestige VII!",
		reqKit: "Healer Mini",
	},
	{
		name: "nether",
		rankColor: ["§7", "§7", "§3", "§3", "§7"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Hellhound Mega Kit Prestige VII!",
		reqKit: "Hellhound Mega",
	},
	{
		name: "wilderness",
		rankColor: ["§2", "§2", "§3", "§3", "§6"],
		iconColor: "§6",
		req: "§5§o§cUnlocked at Hunter Normal Kit Prestige VII!",
		reqKit: "Hunter Solo",
	},
	{
		name: "one_stone",
		rankColor: ["§7", "§7", "§2", "§2", "§8"],
		iconColor: "§8",
		req: "§5§o§cUnlocked at Hunter Insane Kit Prestige VII!",
		reqKit: "Hunter Team",
	},
	{
		name: "circus",
		rankColor: ["§c", "§c", "§6", "§6", "§2"],
		iconColor: "§2",
		req: "§5§o§cUnlocked at Jester Normal Kit Prestige VII!",
		reqKit: "Jester Solo",
	},
	{
		name: "veracious",
		rankColor: ["§5", "§f", "§f", "§f", "§5"],
		iconColor: "§6",
		req: "§5§o§cUnlocked at Knight Normal Kit Prestige VII!",
		reqKit: "Knight Solo",
	},
	{
		name: "valiant",
		rankColor: ["§c", "§f", "§f", "§f", "§c"],
		iconColor: "§a",
		req: "§5§o§cUnlocked at Knight Insane Kit Prestige VII!",
		reqKit: "Knight Team",
	},
	{
		name: "venerable",
		rankColor: ["§9", "§f", "§f", "§f", "§9"],
		iconColor: "§e",
		req: "§5§o§cUnlocked at Knight Mega Kit Prestige VII!",
		reqKit: "Knight Mega",
	},
	{
		name: "portal",
		rankColor: ["§a", "§a", "§d", "§d", "§c"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Magician Normal Kit Prestige VII!",
		reqKit: "Magician Solo",
	},
	{
		name: "socratic",
		rankColor: ["§8", "§f", "§f", "§f", "§8"],
		iconColor: "§e",
		req: "§5§o§cUnlocked at Magician Mini Kit Prestige VII!",
		reqKit: "Magician Mini",
	},
	{
		name: "parallel_dimension",
		rankColor: ["§9", "§9", "§8", "§8", "§d"],
		iconColor: "§d",
		req: "§5§o§cUnlocked at Paladin Mini Kit Prestige VII!",
		reqKit: "Paladin Mini",
	},
	{
		name: "tomb",
		rankColor: ["§6", "§9", "§6", "§9", "§e"],
		iconColor: "§e",
		req: "§5§o§cUnlocked at Pharaoh Normal Kit Prestige VII!",
		reqKit: "Pharaoh Solo",
	},
	{
		name: "trigation",
		rankColor: ["§b", "§b", "§a", "§6", "§e"],
		iconColor: "§e",
		req: "§5§o§cUnlocked at Pharaoh Insane Kit Prestige VII!",
		reqKit: "Pharaoh Team",
	},
	{
		name: "snout",
		rankColor: ["§5", "§0", "§d", "§d", "§5"],
		iconColor: "§0",
		req: "§5§o§cUnlocked at Pig Rider Normal Kit Prestige VII!",
		reqKit: "Pig Rider Solo",
	},
	{
		name: "potato",
		rankColor: ["§e", "§d", "§d", "§c", "§8"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Pig Rider Insane Kit Prestige VII!",
		reqKit: "Pig Rider Team",
	},
	{
		name: "royal",
		rankColor: ["§9", "§9", "§6", "§6", "§c"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Princess Normal Kit Prestige VII!",
		reqKit: "Princess Solo",
	},
	{
		name: "bubblegum",
		rankColor: ["§5", "§d", "§d", "§f", "§d"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Princess Insane Kit Prestige VII!",
		reqKit: "Princess Team",
	},
	{
		name: "insane",
		rankColor: ["§7", "§f", "§f", "§f", "§7"],
		iconColor: "§6",
		req: "§5§o§cUnlocked at Rookie Insane Kit Prestige VII!",
		reqKit: "Rookie Insane",
	},
	{
		name: "smoke",
		rankColor: ["§0", "§0", "§8", "§8", "§f"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Pyro Normal Kit Prestige VII!",
		reqKit: "Pyro Solo",
	},
	{
		name: "scarlet",
		rankColor: ["§8", "§8", "§4", "§4", "§c"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Pyro Insane Kit Prestige VII!",
		reqKit: "Pyro Team",
	},
	{
		name: "afterburn",
		rankColor: ["§b", "§b", "§6", "§8", "§7"],
		iconColor: "§8",
		req: "§5§o§cUnlocked at Pyro Mega Kit Prestige VII!",
		reqKit: "Pyromaniac Mega",
	},
	{
		name: "normal",
		rankColor: ["§8", "§7", "§7", "§7", "§8"],
		iconColor: "§6",
		req: "§5§o§cUnlocked at Rookie Normal Kit Prestige VII!",
		reqKit: "Rookie Solo",
	},
	{
		name: "salmon",
		rankColor: ["§c", "§c", "§3", "§3", "§2"],
		iconColor: "§2",
		req: "§5§o§cUnlocked at Salmon Insane Kit Prestige VII!",
		reqKit: "Salmon Team",
	},
	{
		name: "lucky",
		rankColor: ["§0", "§2", "§2", "§2", "§0"],
		iconColor: "§6",
		req: "§5§o§cUnlocked at Scout Normal Kit Prestige VII!",
		reqKit: "Scout Solo",
	},
	{
		name: "likeable",
		rankColor: ["§4", "§4", "§c", "§c", "§f"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Scout Mini Kit Prestige VII!",
		reqKit: "Scout Mini",
	},
	{
		name: "lunar",
		rankColor: ["§f", "§f", "§f", "§7", "§8"],
		iconColor: "§8",
		req: "§5§o§cUnlocked at Slime Insane Kit Prestige VII!",
		reqKit: "Slime Team",
	},
	{
		name: "hypixel",
		rankColor: ["§4", "§6", "§6", "§6", "§4"],
		iconColor: "§e",
		req: "§5§o§cUnlocked at Sloth Normal Kit Prestige VII!",
		reqKit: "Sloth Solo",
	},
	{
		name: "sky",
		rankColor: ["§e", "§e", "§b", "§b", "§f"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Sloth Insane Kit Prestige VII!",
		reqKit: "Sloth Team",
	},
	{
		name: "frosty",
		rankColor: ["§8", "§f", "§f", "§f", "§8"],
		iconColor: "§7",
		req: "§5§o§cUnlocked at Snowman Insane Kit Prestige VII!",
		reqKit: "Snowman Team",
	},
	{
		name: "treasure",
		rankColor: ["§6", "§6", "§f", "§f", "§e"],
		iconColor: "§e",
		req: "§5§o§cUnlocked at Speleologist Normal Kit Prestige VII!",
		reqKit: "Speleologist Solo",
	},
	{
		name: "gemstone",
		rankColor: ["§4", "§c", "§f", "§f", "§4"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Speleologist Insane Kit Prestige VII!",
		reqKit: "Speleologist Team",
	},
	{
		name: "dark_magic",
		rankColor: ["§4", "§4", "§5", "§5", "§c"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Warlock Normal Kit Prestige VII!",
		reqKit: "Warlock Solo",
	},
	{
		name: "reflections",
		rankColor: ["§1", "§0", "§0", "§d", "§5"],
		iconColor: "§d",
		req: "§5§o§cUnlocked at Warlock Insane Kit Prestige VII!",
		reqKit: "Warlock Team",
	},
	{
		name: "brewery",
		rankColor: ["§5", "§a", "§a", "§a", "§5"],
		iconColor: "§d",
		req: "§5§o§cUnlocked at Witch Mega Kit Prestige VII!",
		reqKit: "Witch Mega",
	},
	{
		name: "leo",
		rankColor: ["§e", "§e", "§e", "§6", "§4"],
		iconColor: "§4",
		req: "§5§o§cUnlocked at Zookeeper Normal Kit Prestige VII!",
		reqKit: "Zookeeper Solo",
	},
	{
		name: "zebra",
		rankColor: ["§7", "§8", "§7", "§8", "§8"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Zookeeper Insane Kit Prestige VII!",
		reqKit: "Zookeeper Team",
	},
	{
		name: "emit",
		rankColor: ["§5", "§d", "§f", "§f", "§5"],
		iconColor: "§d",
		req: "§5§o§cUnlocked at End Lord Kit Prestige VII!",
		reqKit: "End Lord Mythical",
	},
	{
		name: "smoldering",
		rankColor: ["§0", "§4", "§4", "§4", "§0"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Nether Lord Kit Prestige VII!",
		reqKit: "Nether Lord Mythical",
	},
	{
		name: "stormy",
		rankColor: ["§e", "§e", "§f", "§f", "§7"],
		iconColor: "§7",
		req: "§5§o§cUnlocked at Thundermeister Kit Prestige VII!",
		reqKit: "Thundermeister Mythical",
	},
	{
		name: "borealis",
		rankColor: ["§d", "§d", "§b", "§b", "§a"],
		iconColor: "§a",
		req: "§5§o§cUnlocked at Cryomancer Kit Prestige VII!",
		reqKit: "Cryomancer Mythical",
	},
	{
		name: "devil",
		rankColor: ["§0", "§8", "§8", "§4", "§c"],
		iconColor: "§4",
		req: "§5§o§cUnlocked at Fallen Angel Normal Kit Prestige VII!",
		reqKit: "Fallen Angel Solo",
	},
	{
		name: "demigod",
		rankColor: ["§8", "§6", "§e", "§7", "§8"],
		iconColor: "§8",
		req: "§5§o§cUnlocked through the Angel's Descent!",
	},
	{
		name: "laurel",
		rankColor: ["§2", "§2", "§6", "§6", "§f"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Athlete Mini Kit Prestige VII!",
		reqKit: "Athlete Mini",
	},
	{
		name: "uplifting",
		rankColor: ["§8", "§8", "§7", "§7", "§e"],
		iconColor: "§e",
		req: "§5§o§cUnlocked at Blacksmith Mini Kit Prestige VII!",
		reqKit: "Blacksmith Mini",
	},
	{
		name: "the_world_moves_on",
		rankColor: ["§8", "§8", "§6", "§6", "§c"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Bowman Mini Kit Prestige VII!",
		reqKit: "Bowman Mini",
	},
	{
		name: "swine",
		rankColor: ["§5", "§5", "§d", "§d", "§f"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Champion Mini Kit Prestige VII!",
		reqKit: "Champion Mini",
	},
	{
		name: "beagle",
		rankColor: ["§f", "§7", "§f", "§7", "§7"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Hound Mini Kit Prestige VII!",
		reqKit: "Hound Mini",
	},
	{
		name: "mythic_i_prestige",
		rankColor: ["§c", "§6", "§e", "§a", "§d"],
		iconColor: "§b",
		req: 100,
	},
	{
		name: "mythic_ii_prestige",
		rankColor: ["§6", "§e", "§a", "§b", "§c"],
		iconColor: "§d",
		req: 200,
	},
	{
		name: "mythic_iii_prestige",
		rankColor: ["§e", "§a", "§b", "§d", "§6"],
		iconColor: "§c",
		req: 300,
	},
	{
		name: "beach_prestige",
		rankColor: ["§9", "§3", "§b", "§f", "§e"],
		iconColor: "§e",
		req: 360,
	},
	{
		name: "mythic_iv_prestige",
		rankColor: ["§a", "§b", "§d", "§c", "§e"],
		iconColor: "§6",
		req: 400,
	},
	{
		name: "burn_prestige",
		rankColor: ["§4", "§4", "§c", "§6", "§f"],
		iconColor: "§e",
		req: 450,
	},
	{
		name: "tidal_prestige",
		rankColor: ["§1", "§1", "§9", "§3", "§f"],
		iconColor: "§b",
		req: 480,
	},
	{
		name: "firework_prestige",
		rankColor: ["§9", "§b", "§f", "§f", "§4"],
		iconColor: "§c",
		req: 490,
	},
	{
		name: "mythic_v_prestige",
		rankColor: ["§b", "§d", "§c", "§6", "§a"],
		iconColor: "§e",
		req: 500,
	},
	{
		name: "the_prestige_prestige",
		rankColor: ["§7", "§f", "§6", "§b", "§d"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Armorer Mega Kit Prestige VII!",
		reqKit: "Armorer Mega",
	},
	{
		name: "opalsmith",
		rankColor: ["§9", "§9", "§b", "§3", "§5"],
		iconColor: "§d",
		req: "§5§o§cUnlocked at Armorsmith Insane Kit Prestige VII!",
		reqKit: "Armorsmith Team",
	},
	{
		name: "scurvy",
		rankColor: ["§9", "§3", "§b", "§f", "§2"],
		iconColor: "§a",
		req: "§5§o§cUnlocked at Cannoneer Insane Kit Prestige VII!",
		reqKit: "Cannoneer Team",
	},
	{
		name: "fools_mythic",
		rankColor: ["§4", "§c", "§6", "§2", "§5"],
		iconColor: "§9",
		req: "§5§o§cUnlocked at Disco Insane Kit Prestige VII!",
		reqKit: "Disco Team",
	},
	{
		name: "eponymous",
		rankColor: ["§3", "§3", "§2", "§a", "§6"],
		iconColor: "§e",
		req: "§5§o§cUnlocked at Guardian Insane Kit Prestige VII!",
		reqKit: "Guardian Team",
	},
	{
		name: "bandage",
		rankColor: ["§0", "§8", "§7", "§f", "§4"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Healer Normal Kit Prestige VII!",
		reqKit: "Healer Solo",
	},
	{
		name: "clown",
		rankColor: ["§2", "§a", "§f", "§f", "§4"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Jester Insane Kit Prestige VII!",
		reqKit: "Jester Team",
	},
	{
		name: "tropical",
		rankColor: ["§e", "§9", "§6", "§3", "§1"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Salmon Normal Kit Prestige VII!",
		reqKit: "Salmon Solo",
	},
	{
		name: "sugar_crash",
		rankColor: ["§f", "§e", "§c", "§d", "§f"],
		iconColor: "§b",
		req: "§5§o§cUnlocked at Scout Mega Kit Prestige VII!",
		reqKit: "Scout Mega",
	},
	{
		name: "ultraviolence",
		rankColor: ["§2", "§a", "§f", "§f", "§5"],
		iconColor: "§d",
		req: "§5§o§cUnlocked at Pyromancer Mini Kit Prestige VII!",
		reqKit: "Pyromancer Mini",
	},
	{
		name: "???",
		rankColor: "§5",
		iconColor: "§5",
		req: 9999,
	},
];

export const schemes: Scheme[] = rawSchemes.map((scheme) => ({
	...scheme,
	formattedName: scheme.name
		.replace(/_prestige$/, "")
		.replace(/_/g, " ")
		.replace(/\b(i|ii|iii|iv|v|vi|vii|viii|ix|x)\b/gi, (m) => m.toUpperCase())
		.replace(/\b\w/g, (c) => c.toUpperCase()),
}));

const schemeByName = new Map<string, Scheme>();
const schemeByReq = new Map<string | number, Scheme>();
const schemeByKit = new Map<string, Scheme>();

for (const scheme of schemes) {
	schemeByName.set(scheme.name.toLowerCase(), scheme);
	if (scheme.req !== undefined) {
		schemeByReq.set(scheme.req, scheme);
	}
	if (scheme.reqKit !== undefined) {
		schemeByKit.set(scheme.reqKit, scheme);
	}
}
export function getSchemeByKit(kit: string, mode: string): Scheme | undefined {
	return schemeByKit.get(kit + " " + mode);
}

export function getSchemeByName(name: string): Scheme | undefined {
	return schemeByName.get(name.toLowerCase());
}

export function getSchemeByReq(req: string | number): Scheme | undefined {
	return schemeByReq.get(req);
}
export function getLastScheme(): Scheme {
	return {
		name: "???",
		rankColor: "§5",
		iconColor: "§5",
		req: 9999,
	};
}

export function formatScheme(level: number, overallResponse: OverallResponse, overwriteScheme: boolean): string {
	try {
		if (!overallResponse.display?.active_scheme || !overallResponse.display.levelFormattedWithBrackets) {
			// Fallback for legacy players who havent logged on since update
			return overallResponse.display?.levelFormatted.slice(0, 2) + "[" + Math.floor(level) + "✯]";
		}

		const icon: string = extractIcon(overallResponse.display.levelFormattedWithBrackets);
		let schemeName: string;
		if (!overwriteScheme) {
			schemeName = overallResponse.display.active_scheme.split("scheme_")[1] ?? "stone_prestige";
		} else {
			const presLevel = calcScheme(level).req ?? 9999;
			schemeName = getSchemeByReq(presLevel)?.name ?? "stone_prestige";
		}
		// console.log(schemeName);
		const scheme: Scheme = getSchemeByName(schemeName) as Scheme; // schemeName will always be either an existing one from the API or stone_prestige
		const demigod: boolean = overallResponse.stats.active_scheme == "scheme_demigod";
		const levelStr: string = Math.floor(level).toString();

		let rankColor: string[] | string = scheme.rankColor;
		const iconColor: string = scheme.iconColor;

		let formattedScheme: string = "";

		if (Array.isArray(rankColor)) {
			// Scheme is not just 1 color, its an array
			formattedScheme = scheme.rankColor[0];
			// If below level 100, the array has 1 too many colors - we get rid of the color on index 1, which is 1st number after the bracket basically
			if (level < 100) rankColor = Array.isArray(scheme.rankColor) ? scheme.rankColor.filter((_, i) => i !== 1) : scheme.rankColor;

			// Color for the first bracket, along with the actual bracket itself
			formattedScheme += rankColor[0];
			formattedScheme += demigod ? "{" : "[";

			// We go over every digit in the level, and prepend the color from the array for that position
			for (let index = 0; index < levelStr.length; index++) {
				const char = levelStr.charAt(index);
				formattedScheme += rankColor[index + 1] + char;
			}

			// Icon and its color
			formattedScheme += iconColor + icon;
			// We end with the last color from the array, which is for the closing bracket
			formattedScheme += rankColor[rankColor.length - 1];
			formattedScheme += demigod ? "}" : "]";
		} else {
			// Color is a single § code string -> '§2'
			formattedScheme += rankColor + "[" + levelStr + iconColor + icon + "]";
		}
		return formattedScheme;
	} catch {
		return "§7[1✯]";
	}
}

function extractIcon(levelFormattedWithBrackets: string): string {
	if (levelFormattedWithBrackets == "") return "✯";

	// Clean all colors
	const cleaned = levelFormattedWithBrackets.replace(/§[a-zA-Z0-9]/g, "").trim();

	// Get everything between some amount of digits, and the closing bracket (the icon)
	const match = cleaned.match(/^\[(\d+)(.*?)\][ ]*$/);
	if (match && match[2]) {
		return match[2];
	}
	// Shit hit the fan
	return "✯";
}

export function calcScheme(level: number): Scheme {
	if (level >= 500) {
		return getLastScheme();
	}

	const base = Math.floor(level / 10) * 10;

	return getSchemeByReq(base) ?? getLastScheme();
}

export function calcSchemeString(level: number): string {
	const scheme = calcScheme(level);
	let prestigeTag = `[${level}]`;
	try {
		if (Array.isArray(scheme.rankColor)) {
			prestigeTag = prestigeTag
				.split("")
				.map((char, index) => {
					return scheme.rankColor[index] + char;
				})
				.join("");
		} else {
			prestigeTag = scheme.rankColor + prestigeTag;
		}

		prestigeTag = prestigeTag.slice(0, -1) + (scheme.iconColor ?? "") + "✯" + prestigeTag.slice(-1);
	} catch {
		// In case of error, return a default prestige tag
		prestigeTag = `[${level}]✯`;
	}
	return prestigeTag;
}

export function calcNextPrestigeScheme(level: number): Scheme {
	const scheme = calcScheme(level);
	const prestigeReq = scheme.req as number;
	const nextPrestigeReq = prestigeReq + 10;
	const nextScheme = getSchemeByReq(nextPrestigeReq);
	if (!nextScheme) return getLastScheme();
	return nextScheme;
}
