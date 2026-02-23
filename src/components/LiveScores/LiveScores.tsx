import { useEffect } from "react";
import { toast } from "react-toastify";
// Hooks
import { useGetLiveScores } from "../../hooks/useGetLiveScores";
// Components
import MatchesList from "../MatchesList/MatchesList";

const LiveScores = () => {
  const { data, isLoading, isRefetching, isError, error } = useGetLiveScores();

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Error while refreshing data", {
        toastId: "refresh-error",
      });
    }
  }, [isError, error]);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-4 items-center justify-center">
          <h1 className={`text-4xl font-bold mb-4 tracking-tight ${isRefetching && 'animate-pulse'}`}>
            Live Scores
          </h1>
        </div>
        <div className="rounded-xl overflow-hidden bg-gray-900 divide-y divide-white/5">
          {isLoading && (
            <p className="px-4 py-6 text-sm text-gray-400 text-center">
              Loading matches...
            </p>
          )}
          {isError && (
            <p className="px-4 py-6 text-sm text-red-400 text-center">
              Failed to load matches.
            </p>
          )}
          {data && <MatchesList matches={data.matches} />}
        </div>
      </div>
    </div>
  );
};

export default LiveScores;
