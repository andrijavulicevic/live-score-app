import { useQuery } from "@tanstack/react-query";
// Api
import { fetchLiveScores } from "../api";


export function useGetLiveScores(pollIntervall = 10_000) {
    return useQuery({
        queryKey: ['liveScores'],
        queryFn: fetchLiveScores,
        refetchInterval: pollIntervall,
    });

}