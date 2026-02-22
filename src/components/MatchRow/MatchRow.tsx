import dayjs from "dayjs";
// Types
import type { Match } from "../../api/types";
import { MatchStatus } from "../../api/types";
// Components
import StatusLabel from "./StatusLabel";

interface ScoreRowProps {
  match: Match;
}

function MatchRow({ match }: ScoreRowProps) {
  const isLive = match.status === MatchStatus.Live;
  const isFinished = match.status === MatchStatus.Finished;

  const homeWon = isFinished && match.homeScore > match.awayScore;
  const awayWon = isFinished && match.awayScore > match.homeScore;

  const scoreColor = isLive ? "text-red-500" : "text-white";

  return (
    <div className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors border-b border-white/10">
      <div className="w-20 shrink-0 flex flex-col justify-center items-center gap-2">
        <StatusLabel match={match} />
        <span className="text-sm font-light text-white tracking-wide text-center">
          {dayjs(match.matchTime).format('DD.MM.YYYY \n HH:mm')}
        </span>
      </div>

      <div className="w-px self-stretch bg-white/10 shrink-0" />

      <div className="flex flex-col flex-1 gap-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`truncate text-md text-white ${homeWon ? "font-bold" : "font-normal"}`}>
            {match.homeTeam}
          </span>
          <span className={`ml-auto text-md font-bold tabular-nums ${scoreColor}`}>
            {match.homeScore}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`truncate text-md text-white ${awayWon ? "font-bold" : "font-normal"}`}>
            {match.awayTeam}
          </span>
          <span className={`ml-auto text-md font-bold tabular-nums ${scoreColor}`}>
            {match.awayScore}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MatchRow;
