import { useEffect, useState } from "react";
import { fetchLocations } from "@/entities/location/api/locationApi";
import type { Location } from "@/entities/location/model/types";

export function useInfiniteLocations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const loadLocations = async () => {
      if (!hasMore || loading) return;

      try {
        setLoading(true);
        const data = await fetchLocations(page);

        setLocations((prev) => [...prev, ...data.results]);
        setHasMore(Boolean(data.info.next));
        setError(null);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadLocations();
  }, [hasMore, loading, page]);

  return {
    locations,
    loading,
    error,
    hasMore,
    loadMore: () => setPage((prev) => prev + 1),
  };
}
