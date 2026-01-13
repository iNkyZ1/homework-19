import { useCallback, useEffect, useState } from "react";
import { fetchCharacters } from "@/entities/character/api/characterApi";
import type { Character } from "@/entities/character/model/types";

export function useInfiniteCharacters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const loadCharacters = async () => {
    if (!hasMore || loading) return;
    setLoading(true);

    try {
      const data = await fetchCharacters(page);
      setCharacters((prev) => [...prev, ...data.results]);
      setHasMore(Boolean(data.info.next));
      setError(null);
    } catch {
      setError("Ошибка загрузки персонажей");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCharacters();
  }, [page]);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setPage((prev) => prev + 1);
  }, [loading, hasMore]);

  return {
    characters,
    loading,
    error,
    hasMore,
    loadMore,
  };
}
