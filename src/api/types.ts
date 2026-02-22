export const MatchStatus = {
    Live: 'live',
    Upcoming: 'upcoming',
    Finished: 'finished',
} as const;

export type MatchStatus = typeof MatchStatus[keyof typeof MatchStatus];

export interface Match {
    id: string;
    sport: string;
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    status: MatchStatus;
    matchTime: string;
    league: string;
    venue: string;
    source: string;
    lastUpdated: string;
}