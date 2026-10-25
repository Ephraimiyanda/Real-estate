"use client";

import { useEffect, useState } from "react";
import { useDebouncedValue } from "@/app/hooks/useDebouncedValue";
import type { GeoSuggestion } from "@/app/lib/types";
import { fetchGeoSuggestions } from "@/app/lib/zoopla";

export function useLocationSuggestions(query: string) {
  const debouncedQuery = useDebouncedValue(query);
  const [suggestions, setSuggestions] = useState<GeoSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const trimmedQuery = debouncedQuery.trim();
    if (!trimmedQuery) {
      setSuggestions([]);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    fetchGeoSuggestions(trimmedQuery)
      .then((results) => {
        if (!cancelled) setSuggestions(results);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  return { suggestions, isLoading };
}
