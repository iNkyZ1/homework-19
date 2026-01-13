import { useCallback, useEffect, useState } from "react";
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
      setLoading(true);

      try {
        const data = await fetchEpisodes(page);
        if (cancelled) return;

        setEpisodes((prev) => [...prev, ...data.results]);
        setHasMore(Boolean(data.info.next));
        setError(null);
      } catch {
        if (cancelled) return;
        setError("Ошибка загрузки эпизодов");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadEpisodes();

    return () => {
      cancelled = true;
    };
  }, [page]);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setPage((prev) => prev + 1);
  }, [loading, hasMore]);

  return { episodes, loading, error, hasMore, loadMore };
}
