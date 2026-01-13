import { useCallback, useEffect, useState } from "react";
import { fetchLocations } from "@/entities/location/api/locationApi";
import type { Location } from "@/entities/location/model/types";

export function useInfiniteLocations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    let cancelled = false;

    const loadLocations = async () => {
      if (!hasMore) return;
      setLoading(true);

      try {
        const data = await fetchLocations(page);

        if (cancelled) return;

        setLocations((prev) => [...prev, ...data.results]);
        setHasMore(Boolean(data.info.next));
        setError(null);
      } catch {
        if (cancelled) return;
        setError("Ошибка загрузки локаций");
      } finally {
        if (cancelled) return;
        setLoading(false);
      }
    };

    loadLocations();

    return () => {
      cancelled = true;
    };
  }, [page]);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setPage((prev) => prev + 1);
  }, [loading, hasMore]);

  return { locations, loading, error, hasMore, loadMore };
}
