"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "cisdi-onboarding-progress";

function readStorage(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

export function useProgress() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCompleted(readStorage());
    setHydrated(true);
  }, []);

  const persist = useCallback((next: Set<string>) => {
    setCompleted(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)));
  }, []);

  const toggleTask = useCallback(
    (taskId: string) => {
      const next = new Set(completed);
      if (next.has(taskId)) {
        next.delete(taskId);
      } else {
        next.add(taskId);
      }
      persist(next);
    },
    [completed, persist]
  );

  const isDone = useCallback((taskId: string) => completed.has(taskId), [completed]);

  return { completed, hydrated, toggleTask, isDone };
}
