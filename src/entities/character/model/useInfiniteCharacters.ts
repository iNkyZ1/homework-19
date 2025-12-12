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
    let cancelled = false;

    const loadCharacters = async () => {
      if (!hasMore) return;

      try {
        setLoading(true);
        const data = await fetchCharacters(page);

        if (cancelled) return;

        setCharacters((prev) => [...prev, ...data.results]);
        setHasMore(Boolean(data.info.next));
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setError((err as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadCharacters();

    return () => {
      cancelled = true;
    };
  }, [page]);

  const loadMore = () => {
    if (loading || !hasMore) return;
    setPage((prev) => prev + 1);
  };

  return { characters, loading, error, hasMore, loadMore };
}
