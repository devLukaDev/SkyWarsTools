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

export interface CubelifyResponse {
	tags: CubelifyTag[];
	timestamp: Date;
}

export interface CubelifyTag {
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
		aurora: { tags: AuroraTag[]; credit: Credit; error: boolean };
		winstr: { tags: WinstrTag[]; credit: Credit; error: boolean };
		urchin: { tags: CubelifyTag[]; credit: Credit; error: boolean };
		seraph: { tags: CubelifyTag[]; credit: Credit; error: boolean };
	};
}
