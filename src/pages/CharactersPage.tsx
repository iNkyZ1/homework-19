import { useRef, useEffect } from "react";
import { SimpleGrid, Text, Loader, Center } from "@mantine/core";
import { useInfiniteCharacters } from "@/entities/character/model/useInfiniteCharacters";
import { CharacterCard } from "@/entities/character/ui/CharacterCard";

function CharactersPage() {
  const { characters, loading, error, hasMore, loadMore } =
    useInfiniteCharacters();

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
        Персонажи
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
        {characters.map((character, index) => {
          const isLast = index === characters.length - 1;

          return (
            <div key={character.id} ref={isLast ? lastElementRef : null}>
              <CharacterCard character={character} />
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
          Больше персонажей нет
        </Text>
      )}
    </section>
  );
}

export default CharactersPage;
