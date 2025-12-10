import { useEffect, useState } from "react";
import { fetchCharacters } from "../utils/api";
import type { Character } from "../types";

export function useInfiniteCharacters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const loadCharacters = async () => {
      if (!hasMore || loading) return;
      try {
        setLoading(true);
        const { results, hasMore: more } = await fetchCharacters(page);
        setCharacters((prev) => [...prev, ...results]);
        setHasMore(more);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    loadCharacters();
  }, [hasMore, loading, page]);

  return {
    characters,
    loading,
    error,
    hasMore,
    loadMore: () => setPage((prev) => prev + 1),
  };
}
