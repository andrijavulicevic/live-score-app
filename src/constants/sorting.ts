export const SortType = {
  Default: "default",
  Time: "time",
  Name: "name",
  Score: "score",
} as const;

export type SortType = (typeof SortType)[keyof typeof SortType];
