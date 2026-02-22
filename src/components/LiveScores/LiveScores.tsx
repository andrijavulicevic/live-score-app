// Hooks
import { useGetLiveScores } from "../../hooks/useGetLiveScores";
// Components
import MatchesList from "../MatchesList/MatchesList";

const LiveScores = () => {
    const { data, isLoading, isError } = useGetLiveScores();

    return (
        <div className="min-h-screen bg-gray-950 text-white p-4 sm:p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-4 tracking-tight">Live Scores</h1>
                <div className="rounded-xl overflow-hidden bg-gray-900 divide-y divide-white/5">
                    {isLoading && (
                        <p className="px-4 py-6 text-sm text-gray-400 text-center">Loading matches...</p>
                    )}
                    {isError && (
                        <p className="px-4 py-6 text-sm text-red-400 text-center">Failed to load matches.</p>
                    )}
                    {data && <MatchesList matches={data.matches} />}
                </div>
            </div>
        </div>
    );
};

export default LiveScores;
