import { JSX, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Episode } from "../types";

function EpisodeDetailsPage(): JSX.Element {
  const { id } = useParams();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEpisode() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://rickandmortyapi.com/api/episode/${id}`
        );
        if (!response.ok) throw new Error("Эпизод не найден");

        const data: Episode = await response.json();
        setEpisode(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchEpisode();
  }, [id]);

  if (loading) return <p>Загрузка...</p>;

  if (error || !episode) {
    return (
      <section>
        <h2>Эпизод не найден</h2>
        <Link to="/episodes">Вернуться к списку эпизодов</Link>
      </section>
    );
  }

  return (
    <section>
      <h2>{episode.name}</h2>
      <ul>
        <li>
          <strong>Episode:</strong> {episode.episode}
        </li>
        <li>
          <strong>Air date:</strong> {episode.air_date}
        </li>
        <li>
          <strong>Created:</strong> {episode.created}
        </li>
      </ul>

      <p>
        <Link to="/episodes">← Назад к списку эпизодов</Link>
      </p>
    </section>
  );
}

export default EpisodeDetailsPage;
