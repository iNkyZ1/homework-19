import { useRef, useEffect } from "react";
import { SimpleGrid, Text, Loader, Center } from "@mantine/core";
import { useInfiniteLocations } from "@/entities/location/model/useInfiniteLocations";
import { LocationCard } from "@/entities/location/ui/LocationCard";

function LocationsPage() {
  const { locations, loading, error, hasMore, loadMore } =
    useInfiniteLocations();

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (loading) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) loadMore();
    });

    if (lastElementRef.current)
      observerRef.current.observe(lastElementRef.current);
  }, [loading, hasMore, loadMore]);

  return (
    <section>
      <Text component="h2" size="xl" fw={800} mb="md">
        Локации
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
        {locations.map((location, index) => {
          const isLast = index === locations.length - 1;

          return (
            <div key={location.id} ref={isLast ? lastElementRef : null}>
              <LocationCard location={location} />
            </div>
          );
        })}
      </SimpleGrid>

      {loading && (
        <Center mt="md">
          <Loader />
        </Center>
      )}

      {error && (
        <Text c="red" mt="md">
          {error}
        </Text>
      )}

      {!hasMore && (
        <Text c="dimmed" mt="md">
          Больше локаций нет
        </Text>
      )}
    </section>
  );
}

export default LocationsPage;
