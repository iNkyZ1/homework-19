import { JSX, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useInfiniteCharacters } from "../hooks/useInfiniteCharacters";
import type { Character } from "../types";

function CharactersPage(): JSX.Element {
  const { characters, loading, error, hasMore, loadMore } =
    useInfiniteCharacters();

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (loading) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });

    if (lastElementRef.current) {
      observerRef.current.observe(lastElementRef.current);
    }
  }, [loading, hasMore, loadMore]);

  return (
    <section>
      <h2>Персонажи</h2>

      <ul
        style={{ display: "grid", gap: "12px", listStyle: "none", padding: 0 }}
      >
        {characters.map((character: Character, index: number) => {
          const isLast = index === characters.length - 1;
          return (
            <li
              key={character.id}
              ref={isLast ? lastElementRef : null}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <img
                src={character.image}
                alt={character.name}
                width={80}
                height={80}
                style={{ borderRadius: "8px", objectFit: "cover" }}
              />
              <div>
                <Link to={`/characters/${character.id}`}>
                  <strong>{character.name}</strong>
                </Link>
                <div>
                  {character.status} • {character.species}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!hasMore && <p>Больше персонажей нет</p>}
    </section>
  );
}

export default CharactersPage;
