export interface GuildResponse {
    success: boolean;
    guild:   Guild;
}

export interface Guild {
    _id:                string;
    name:               string;
    name_lower:         string;
    coins:              number;
    coinsEver:          number;
    created:            number;
    members:            Member[];
    ranks:              RankElement[];
    achievements:       Achievements;
    exp:                number;
    tagColor:           string;
    description:        string;
    preferredGames:     string[];
    chatMute:           number;
    tag:                string;
    publiclyListed:     boolean;
    guildExpByGameType: { [key: string]: number };
}

export interface Achievements {
    ONLINE_PLAYERS:   number;
    WINNERS:          number;
    EXPERIENCE_KINGS: number;
}

export interface Member {
    uuid:                string;
    rank:                string;
    joined:              number;
    questParticipation?: number;
    expHistory:          { [key: string]: number };
    mutedTill?:          number;
}

export interface RankElement {
    name:     string;
    default:  boolean;
    tag:      string;
    created:  number;
    priority: number;
}
