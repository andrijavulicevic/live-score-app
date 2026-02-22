import { useEffect, useRef } from "react";

export function usePreviousValue<T>(value: T): T | undefined {
  const prevRef = useRef<T | undefined>(undefined);

  useEffect(() => {
    prevRef.current = value;
  }, [value]);

  // eslint-disable-next-line react-hooks/refs
  return prevRef.current;
}