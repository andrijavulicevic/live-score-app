import Input from "../../ui/Input";
import Select from "../../ui/Select";
import { SortType } from "../../constants/sorting";

export type { SortType };

const SORT_OPTIONS = [
  { label: "Default", value: SortType.Default },
  { label: "Time", value: SortType.Time },
  { label: "Name", value: SortType.Name },
  { label: "Score", value: SortType.Score },
];

interface MatchesFilteringProps {
  search: string;
  sort: SortType;
  leagues: string[];
  selectedLeague?: string;
  onSearch: (text: string) => void;
  onSort: (sortOption: SortType) => void;
  onLeagueFilter: (league: string) => void;
}

function MatchesFiltering({
  search,
  sort,
  leagues,
  selectedLeague,
  onSearch,
  onSort,
  onLeagueFilter,
}: MatchesFilteringProps) {
  return (
    <div className="w-full flex items-end gap-2 px-4 py-2">
      <Input
        label="Search"
        type="text"
        name="search"
        placeholder="Type team name..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />
      <Select
        label="League"
        name="league"
        options={[{value: '', label: ''}, ...leagues.map((l) => ({
          value: l,
          label: l,
        }))]}
        value={selectedLeague}
        onChange={(e) => onLeagueFilter(e.target.value)}
      />
      <Select
        label="Sort"
        name="sort"
        options={SORT_OPTIONS}
        value={sort}
        onChange={(e) => onSort(e.target.value as SortType)}
      />
    </div>
  );
}

export default MatchesFiltering;
