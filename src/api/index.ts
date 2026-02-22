import axios from 'axios';

import type { Match } from './types';

interface ScoresResponse {
    matches: Match[];
    success: boolean;
}

export const fetchLiveScores = async (): Promise<ScoresResponse> => {
    const response = await axios.get<ScoresResponse>(`${import.meta.env.VITE_API_URL}/api/matches`, {
        headers: {
            username: import.meta.env.VITE_API_USERNAME,
        }
    });
    return response.data;
}