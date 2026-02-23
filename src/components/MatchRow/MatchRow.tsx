import dayjs from "dayjs";
import { memo } from "react";
// Types
import type { Match } from "../../api/types";
import { MatchStatus } from "../../api/types";
import type { AnimationState } from "../../hooks/useAnimatedMatches";
// Utils
import { getSportImage } from "../../utils/images";
// Components
import StatusLabel from "./StatusLabel";

const ANIMATION_CLASSES: Record<AnimationState, string> = {
  entering: "animate-highlight-in",
  leaving: "animate-fade-collapse overflow-hidden",
  stable: "",
};

interface ScoreRowProps {
  match: Match;
  animationState?: AnimationState;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

const MatchRow = memo(function MatchRow({ match, animationState = "stable", isFavorite = false, onToggleFavorite }: ScoreRowProps) {
  const isLive = match.status === MatchStatus.Live;
  const isFinished = match.status === MatchStatus.Finished;

  const homeWon = isFinished && match.homeScore > match.awayScore;
  const awayWon = isFinished && match.awayScore > match.homeScore;

  const scoreColor = isLive ? "text-red-500" : "text-white";

  return (
    <div
      className={`flex items-center gap-4 p-4 hover:bg-white/5 transition-colors border-b border-white/10 ${ANIMATION_CLASSES[animationState]}`}
    >
      <button
        onClick={() => onToggleFavorite?.(match.id)}
        className="shrink-0 text-gray-600 hover:text-yellow-400 transition-colors"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        )}
      </button>

      <div className="w-20 shrink-0 flex flex-col justify-center items-center gap-2">
        <StatusLabel match={match} />
        <span className="text-sm font-light text-white tracking-wide text-center">
          {dayjs(match.matchTime).format("DD.MM.YYYY \n HH:mm")}
        </span>
      </div>

      <div className="w-px self-stretch bg-white/10 shrink-0" />

      <div className="flex flex-col flex-1 gap-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="flex justify-center items-center bg-white w-4 h-4 rounded-2xl">
            <img
              src={getSportImage(match.sport)}
              alt={match.sport}
              className="w-3.5 h-3.5 opacity-60"
            />
          </span>
          <span className="text-xs text-gray-400 truncate">{match.league}</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`truncate text-md text-white ${homeWon ? "font-bold" : "font-normal"}`}
          >
            {match.homeTeam}
          </span>
          <span
            className={`ml-auto text-md font-bold tabular-nums ${scoreColor}`}
          >
            {match.homeScore}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`truncate text-md text-white ${awayWon ? "font-bold" : "font-normal"}`}
          >
            {match.awayTeam}
          </span>
          <span
            className={`ml-auto text-md font-bold tabular-nums ${scoreColor}`}
          >
            {match.awayScore}
          </span>
        </div>
      </div>
    </div>
  );
});

export default MatchRow;
