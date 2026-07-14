export interface AuroraResponse {
	score: AuroraScore;
	tags: AuroraTag[];
}

export interface AuroraScore {
	value: number;
	mode: string;
}

export interface AuroraTag {
	text: string;
	textColor: number;
	tooltip: string;
	color: number;
}

export interface WinstrResponse {
	player: string;
	tags: WinstrTag[];
}

export interface WinstrTag {
	name: string;
	description: string;
}

export interface UrchinResponse {
	uuid: string;
	tags: UrchinTag[];
}

export interface UrchinTag {
	type: string;
	reason: string;
	added_by_id: number;
	added_by_username: string;
	added_on: Date;
	hide_username: boolean;
}

export interface SeraphResponse {
	tags: SeraphTag[];
	timestamp: Date;
}

export interface SeraphTag {
	icon: string;
	tooltip: string;
	color: number;
	tag_name: string;
	text?: string;
	textColor?: number;
}

export interface Credit {
	link: string;
	image: string;
}

export interface TrustfactorResponse {
	success: true;
	externals: {
		aurora: { tags: AuroraTag[]; credit: Credit };
		winstr: { tags: WinstrTag[]; credit: Credit };
		urchin: { tags: UrchinTag[]; credit: Credit };
		seraph: { tags: SeraphTag[]; credit: Credit };
	};
}
