export type LBResponse = {
	stat: string;
	page: number;
	pages: number;
	total: number;
	entries: LBEntry[];
	siblingKeys: string[];
};

export type LBResponseAroundScore = {
	stat: string;
	entries: LBEntry[];
	siblingKeys: string[];
	score: number;
	window: {
		startRank: number;
		endRank: number;
		total: number;
	};
};

export type RankByScoreResponse = {
	success: boolean;
	stat: string;
	score: number;
	order: "desc";
	rank: number;
	rankRange: {
		best: number;
		worst: number;
	};
	tiesAtScore: number;
	totalPlayers: number;
};

export type LBEntry = {
	uuid: string;
	score: number;
	info: {
		player: string;
		display: {
			levelFormattedWithBrackets?: string;
			levelFormatted: string;
			newPackageRank?: string;
			monthlyPackageRank?: string;
			rankPlusColor?: string;
			monthlyRankColor?: string;
			active_scheme?: string;
		};
		queried: number;
		exp: number;
	};
	siblings: Record<string, number>;
};
