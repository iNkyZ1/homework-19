import { useEffect, useState } from "react";
import { fetchCharacters } from "@/entities/character/api/characterApi";
import type { Character } from "@/entities/character/model/types";

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

        const data = await fetchCharacters(page);

        setCharacters((prev) => [...prev, ...data.results]);
        setHasMore(Boolean(data.info.next));
        setError(null);
      } catch (err) {
        setError((err as Error).message);
      } finally {
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
