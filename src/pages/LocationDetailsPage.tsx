import { JSX, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Location } from "../types";

function LocationDetailsPage(): JSX.Element {
  const { id } = useParams();
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLocation() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://rickandmortyapi.com/api/location/${id}`
        );
        if (!response.ok) throw new Error("Локация не найдена");

        const data: Location = await response.json();
        setLocation(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchLocation();
  }, [id]);

  if (loading) return <p>Загрузка...</p>;

  if (error || !location) {
    return (
      <section>
        <h2>Локация не найдена</h2>
        <Link to="/locations">Вернуться к списку локаций</Link>
      </section>
    );
  }

  return (
    <section>
      <h2>{location.name}</h2>
      <ul>
        <li>
          <strong>Type:</strong> {location.type}
        </li>
        <li>
          <strong>Dimension:</strong> {location.dimension}
        </li>
        <li>
          <strong>Created:</strong> {location.created}
        </li>
      </ul>

      <p>
        <Link to="/locations">← Назад к списку локаций</Link>
      </p>
    </section>
  );
}

export default LocationDetailsPage;
