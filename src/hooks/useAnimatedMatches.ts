import { useEffect, useRef, useState } from "react";
// Types
import type { Match } from "../api/types";
// Hooks
import { usePreviousValue } from "./usePrevious";

export type AnimationState = "entering" | "stable" | "leaving";

export interface AnimatedMatch extends Match {
  animationState: AnimationState;
}

const ENTER_DURATION = 1_000;
const LEAVE_DURATION = 1_000;

export function useAnimatedMatches(matches: Match[]): AnimatedMatch[] {
  const previousMatches = usePreviousValue(matches)
  const [animatedMatches, setAnimatedMatches] = useState<AnimatedMatch[]>(() =>
    matches.map((m) => ({ ...m, animationState: "stable" }))
  );

  const timersRef = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  useEffect(() => {
    if (!previousMatches) return;

    const prevIds = new Set(previousMatches.map((m) => m.id));
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
      const current: AnimatedMatch[] = matches.map((m) => {
        const isNewlyEntering = entering.has(m.id);
        const isStillEntering =
          !isNewlyEntering &&
          prev.find((p) => p.id === m.id)?.animationState === "entering" &&
          timersRef.current.has(m.id);
        return {
          ...m,
          animationState: isNewlyEntering || isStillEntering ? "entering" : "stable",
        };
      });

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
      const existing = timersRef.current.get(id);
      if (existing !== undefined) {
        clearTimeout(existing);
      }
      const timer = setTimeout(() => {
        setAnimatedMatches((prev) => prev.filter((m) => m.id !== id));
        timersRef.current.delete(id);
      }, LEAVE_DURATION);
      timersRef.current.set(id, timer);
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches]);

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  return animatedMatches;
}
