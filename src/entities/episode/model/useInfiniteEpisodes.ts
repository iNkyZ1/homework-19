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
    let cancelled = false;

    const loadEpisodes = async () => {
      if (!hasMore) return;

      try {
        setLoading(true);
        const data = await fetchEpisodes(page);

        if (cancelled) return;

        setEpisodes((prev) => [...prev, ...data.results]);
        setHasMore(Boolean(data.info.next));
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setError((err as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadEpisodes();

    return () => {
      cancelled = true;
    };
  }, [page]);

  const loadMore = () => {
    if (loading || !hasMore) return;
    setPage((prev) => prev + 1);
  };

  return { episodes, loading, error, hasMore, loadMore };
}
