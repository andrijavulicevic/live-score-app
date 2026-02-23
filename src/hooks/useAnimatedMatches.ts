import { useEffect, useRef, useState } from "react";
// Types
import type { Match } from "../api/types";

export type AnimationState = "entering" | "stable" | "leaving";

export interface AnimatedMatch extends Match {
  animationState: AnimationState;
}

const ENTER_DURATION = 1_000;
const LEAVE_DURATION = 1_000;

export function useAnimatedMatches(matches: Match[]): AnimatedMatch[] {
  const [animatedMatches, setAnimatedMatches] = useState<AnimatedMatch[]>(() =>
    matches.map((m) => ({ ...m, animationState: "stable" }))
  );

  const isFirstRender = useRef(true);
  const prevMatchesRef = useRef<Match[]>(matches);
  const timersRef = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevMatchesRef.current = matches;
      return;
    }

    const prev = prevMatchesRef.current;
    const prevIds = new Set(prev.map((m) => m.id));
    const newIds = new Set(matches.map((m) => m.id));

    const entering = new Set([...newIds].filter((id) => !prevIds.has(id)));
    const leaving = new Set([...prevIds].filter((id) => !newIds.has(id)));

    entering.forEach((id) => {
      const existing = timersRef.current.get(id);
      if (existing !== undefined) {
        clearTimeout(existing);
        timersRef.current.delete(id);
      }
    });

    setAnimatedMatches((prev) => {
      const current: AnimatedMatch[] = matches.map((m) => ({
        ...m,
        animationState: entering.has(m.id) ? "entering" : "stable",
      }));

      const stillLeaving: AnimatedMatch[] = prev.filter(
        (m) => m.animationState === "leaving" && !newIds.has(m.id)
      );

      const newLeaving: AnimatedMatch[] = prev
        .filter((m) => leaving.has(m.id) && m.animationState !== "leaving")
        .map((m) => ({ ...m, animationState: "leaving" as AnimationState }));

      return [...current, ...stillLeaving, ...newLeaving];
    });

    entering.forEach((id) => {
      const timer = setTimeout(() => {
        setAnimatedMatches((prev) =>
          prev.map((m) =>
            m.id === id && m.animationState === "entering"
              ? { ...m, animationState: "stable" }
              : m
          )
        );
        timersRef.current.delete(id);
      }, ENTER_DURATION);
      timersRef.current.set(id, timer);
    });

    leaving.forEach((id) => {
      if (timersRef.current.has(id)) return;
      const timer = setTimeout(() => {
        setAnimatedMatches((prev) => prev.filter((m) => m.id !== id));
        timersRef.current.delete(id);
      }, LEAVE_DURATION);
      timersRef.current.set(id, timer);
    });

    prevMatchesRef.current = matches;
  }, [matches]);


  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  return animatedMatches;
}
