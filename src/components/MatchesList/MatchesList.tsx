// Types
import type { Match } from "../../api/types";
// Utils
import { getSportImage } from "../../utils/images";
// Components
import MatchRow from "../MatchRow/MatchRow";

interface MatchesListProps {
  matches: Match[];
}

const SPORT_ORDER = ["football", "basketball", "tennis"];

function groupMatches(matches: Match[]): Map<string, Map<string, Match[]>> {
  const grouped = new Map<string, Map<string, Match[]>>();

  const sorted = [...matches].sort((a, b) => {
    const aIdx = SPORT_ORDER.indexOf(a.sport.toLowerCase());
    const bIdx = SPORT_ORDER.indexOf(b.sport.toLowerCase());
    const aOrder = aIdx === -1 ? SPORT_ORDER.length : aIdx;
    const bOrder = bIdx === -1 ? SPORT_ORDER.length : bIdx;
    return aOrder - bOrder;
  });

  for (const match of sorted) {
    const sport = match.sport;
    const league = match.league;

    if (!grouped.has(sport)) {
      grouped.set(sport, new Map());
    }

    const sportGroup = grouped.get(sport)!;
    if (!sportGroup.has(league)) {
      sportGroup.set(league, []);
    }

    sportGroup.get(league)!.push(match);
  }

  for (const [sport, leagues] of grouped) {
    const sortedLeagues = new Map(
      [...leagues.entries()].sort(([a], [b]) => a.localeCompare(b))
    );
    grouped.set(sport, sortedLeagues);
  }

  return grouped;
}

function MatchesList({ matches }: MatchesListProps) {
  const grouped = groupMatches(matches);

  return (
    <div>
      {[...grouped.entries()].map(([sport, leagues]) => (
        <div key={sport}>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border-b border-white/10">
            <div className="bg-white w-7 h-7 flex justify-center items-center rounded-2xl">
              <img
                src={getSportImage(sport)}
                alt={`${sport} icon`}
                className="w-6"
              />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
              {sport}
            </span>
          </div>

          {[...leagues.entries()].map(([league, leagueMatches]) => (
            <div key={league}>
              <div className="px-4 py-2 border-b border-white/10">
                <span className="text-sm font-semibold text-gray-200">
                  {league}
                </span>
              </div>
              {leagueMatches.map((m) => (
                <MatchRow key={m.id} match={m} />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default MatchesList;
