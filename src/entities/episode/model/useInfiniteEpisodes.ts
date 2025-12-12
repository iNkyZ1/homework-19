import { useEffect, useState } from "react";
import { fetchEpisodes } from "@/entities/episode/api/episodeApi";
import type { Episode } from "@/entities/episode/model/types";

export function useInfiniteEpisodes() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const loadEpisodes = async () => {
      if (!hasMore || loading) return;

      try {
        setLoading(true);
        const data = await fetchEpisodes(page);

        setEpisodes((prev) => [...prev, ...data.results]);
        setHasMore(Boolean(data.info.next));
        setError(null);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadEpisodes();
  }, [hasMore, loading, page]);

  return {
    episodes,
    loading,
    error,
    hasMore,
    loadMore: () => setPage((prev) => prev + 1),
  };
}
