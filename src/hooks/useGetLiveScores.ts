import { useQuery } from "@tanstack/react-query";
// Api
import { fetchLiveScores } from "../api";


export function useGetLiveScores(pollIntervall = 10_000) {
    return useQuery({
        queryKey: ['liveScores'],
        queryFn: async () => {
            const data = await fetchLiveScores();
            if (data.matches.length === 0) {
                throw new Error('Empty matches response');
            }
            return data;
        },
        refetchInterval: pollIntervall,
    });

}