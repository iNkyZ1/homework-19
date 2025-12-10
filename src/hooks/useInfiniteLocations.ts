import { useEffect, useState } from "react";
import type { Location } from "../types";

const API_URL = "https://rickandmortyapi.com/api/location";

export function useInfiniteLocations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      if (!hasMore || loading) return;

      try {
        setLoading(true);
        const response = await fetch(`${API_URL}?page=${page}`);
        if (!response.ok) throw new Error("Ошибка при загрузке локаций");

        const data = await response.json();
        setLocations((prev) => [...prev, ...data.results]);
        setHasMore(data.info.next !== null);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [hasMore, loading, page]);

  return {
    locations,
    loading,
    error,
    hasMore,
    loadMore: () => setPage((prev) => prev + 1),
  };
}
