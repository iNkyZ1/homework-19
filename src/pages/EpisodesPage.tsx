import { useRef, useEffect } from "react";
import { SimpleGrid, Text, Loader, Center } from "@mantine/core";
import { useInfiniteEpisodes } from "@/entities/episode/model/useInfiniteEpisodes";
import { EpisodeCard } from "@/entities/episode/ui/EpisodeCard";

function EpisodesPage() {
  const { episodes, loading, error, hasMore, loadMore } = useInfiniteEpisodes();

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
        Эпизоды
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
        {episodes.map((episode, index) => {
          const isLast = index === episodes.length - 1;

          return (
            <div key={episode.id} ref={isLast ? lastElementRef : null}>
              <EpisodeCard episode={episode} />
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
          Больше эпизодов нет
        </Text>
      )}
    </section>
  );
}

export default EpisodesPage;
