// Types
import type { Match } from "../../api/types";
// Hooks
import { useAnimatedMatches } from "../../hooks/useAnimatedMatches";
// Components
import MatchRow from "../MatchRow/MatchRow";

interface MatchesListProps {
  matches: Match[];
}

function MatchesList({ matches }: MatchesListProps) {
  const animatedMatches = useAnimatedMatches(matches);

  return (
    <div>
      {animatedMatches.map((m) => (
        <MatchRow key={m.id} match={m} animationState={m.animationState} />
      ))}
    </div>
  );
}

export default MatchesList;
