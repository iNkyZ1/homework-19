import { useEffect, useState } from "react";
import type { Episode } from "../types";

const API_URL = "https://rickandmortyapi.com/api/episode";

export function useInfiniteEpisodes() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      if (!hasMore || loading) return;

      try {
        setLoading(true);
        const response = await fetch(`${API_URL}?page=${page}`);
        if (!response.ok) throw new Error("Ошибка при загрузке эпизодов");

        const data = await response.json();
        setEpisodes((prev) => [...prev, ...data.results]);
        setHasMore(data.info.next !== null);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [hasMore, loading, page]);

  return {
    episodes,
    loading,
    error,
    hasMore,
    loadMore: () => setPage((prev) => prev + 1),
  };
}
