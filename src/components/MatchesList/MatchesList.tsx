import dayjs from "dayjs";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
// Types
import type { Match } from "../../api/types";
import { SortType } from "../../constants/sorting";
// Hooks
import { useAnimatedMatches } from "../../hooks/useAnimatedMatches";
import { useFavorites } from "../../hooks/useFavorites";
// Components
import MatchRow from "../MatchRow/MatchRow";
import MatchesFiltering from "../MatchesFiltering/MatchesFiltering";

const ESTIMATED_ROW_HEIGHT = 106;

interface MatchesListProps {
  matches: Match[];
}

function MatchesList({ matches }: MatchesListProps) {
  const [leagueOptions, addLeagues] = useReducer(
    (prev: string[], incoming: string[]) => {
      const prevSet = new Set(prev);
      const next = incoming.filter((l) => !prevSet.has(l));
      if (next.length === 0) return prev;
      return [...prevSet, ...next].sort();
    },
    matches,
    (initial: Match[]) => [...new Set(initial.map((m) => m.league))].sort(),
  );

  useEffect(() => {
    addLeagues(matches.map((m) => m.league));
  }, [matches]);

  const animatedMatches = useAnimatedMatches(matches);
  const { isFavorite, toggleFavorite } = useFavorites();
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<SortType>("default");
  const [selectedLeague, setSelectedLeagues] = useState<string>("");

  const filteredAndSorted = useMemo(() => {
    const term = search.trim().toLowerCase();

    const filtered = animatedMatches.filter(
      (m) =>
        (!term ||
          m.homeTeam.toLowerCase().includes(term) ||
          m.awayTeam.toLowerCase().includes(term)) &&
        (!selectedLeague || m.league === selectedLeague),
    );

    if (sort === SortType.Default) return filtered;

    return [...filtered].sort((a, b) => {
      if (sort === SortType.Time) {
        return dayjs(a.matchTime).diff(dayjs(b.matchTime));
      }
      if (sort === SortType.Name) {
        return a.homeTeam.localeCompare(b.homeTeam);
      }
      if (sort === SortType.Score) {
        return b.homeScore + b.awayScore - (a.homeScore + a.awayScore);
      }
      return 0;
    });
  }, [animatedMatches, search, sort, selectedLeague]);

  const listRef = useRef<HTMLDivElement>(null);
  const [scrollMargin, setScrollMargin] = useState(0);

  useLayoutEffect(() => {
    if (listRef.current) {
      setScrollMargin(listRef.current.offsetTop);
    }
  }, []);

  const virtualizer = useWindowVirtualizer({
    count: filteredAndSorted.length,
    estimateSize: () => ESTIMATED_ROW_HEIGHT,
    overscan: 5,
    scrollMargin,
  });

  return (
    <div className="flex flex-col gap-2">
      <MatchesFiltering
        leagues={leagueOptions}
        search={search}
        sort={sort}
        selectedLeague={selectedLeague}
        onSearch={setSearch}
        onSort={setSort}
        onLeagueFilter={setSelectedLeagues}
      />

      <div
        ref={listRef}
        className="virtual-list-container"
        style={{ height: `${virtualizer.getTotalSize()}px` }}
      >
        {virtualizer.getVirtualItems().map((vItem) => {
          const m = filteredAndSorted[vItem.index];
          return (
            <div
              key={m.id}
              data-index={vItem.index}
              ref={virtualizer.measureElement}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                transform: `translateY(${vItem.start - scrollMargin}px)`,
              }}
            >
              <MatchRow
                match={m}
                animationState={m.animationState}
                isFavorite={isFavorite(m.id)}
                onToggleFavorite={toggleFavorite}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MatchesList;
