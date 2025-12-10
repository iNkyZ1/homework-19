import { JSX, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useInfiniteLocations } from "../hooks/useInfiniteLocations";
import type { Location } from "../types";

function LocationsPage(): JSX.Element {
  const { locations, loading, error, hasMore, loadMore } =
    useInfiniteLocations();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (loading) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });

    if (lastRef.current) {
      observerRef.current.observe(lastRef.current);
    }
  }, [loading, hasMore, loadMore]);

  return (
    <section>
      <h2>Локации</h2>
      <ul>
        {locations.map((location: Location, index) => {
          const isLast = index === locations.length - 1;
          return (
            <li key={location.id} ref={isLast ? lastRef : null}>
              <Link to={`/locations/${location.id}`}>{location.name}</Link> —{" "}
              {location.type}
            </li>
          );
        })}
      </ul>

      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!hasMore && <p>Больше локаций нет</p>}
    </section>
  );
}

export default LocationsPage;
