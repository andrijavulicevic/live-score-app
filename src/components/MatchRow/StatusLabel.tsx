// Types
import type { Match } from "../../api/types";
import { MatchStatus } from "../../api/types";

interface StatusLabelProps {
  match: Match;
}

function StatusLabel({ match }: StatusLabelProps) {
  if (match.status === MatchStatus.Live) {
    return (
      <span className="text-sm font-semibold text-red-500 tracking-wide">
        Live
      </span>
    );
  }
  if (match.status === MatchStatus.Finished) {
    return (
      <span className="text-sm font-semibold text-gray-300 tracking-wide">
        Finished
      </span>
    );
  }
  if (match.status === MatchStatus.Upcoming) {
    return (
      <span className="text-sm font-semibold text-white tracking-wide">
        Upcoming
      </span>
    );
  }
}

export default StatusLabel;
