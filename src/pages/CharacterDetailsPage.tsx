import { JSX, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Character } from "../types";

function CharacterDetailsPage(): JSX.Element {
  const { id } = useParams();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCharacter() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        if (!response.ok) {
          throw new Error("Персонаж не найден");
        }
        const data: Character = await response.json();
        setCharacter(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchCharacter();
  }, [id]);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error || !character) {
    return (
      <section>
        <h2>Персонаж не найден</h2>
        <Link to="/characters">Вернуться к списку персонажей</Link>
      </section>
    );
  }

  return (
    <section>
      <h2>{character.name}</h2>

      <img
        src={character.image}
        alt={character.name}
        width={200}
        height={200}
        style={{ borderRadius: "12px", objectFit: "cover" }}
      />

      <ul>
        <li>
          <strong>Status:</strong> {character.status}
        </li>
        <li>
          <strong>Species:</strong> {character.species}
        </li>
        <li>
          <strong>Type:</strong> {character.type || "—"}
        </li>
        <li>
          <strong>Gender:</strong> {character.gender}
        </li>
        <li>
          <strong>Created:</strong> {character.created}
        </li>
      </ul>

      <p>
        <Link to="/characters">← Назад к списку персонажей</Link>
      </p>
    </section>
  );
}

export default CharacterDetailsPage;
