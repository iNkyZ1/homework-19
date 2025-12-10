import { JSX, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useInfiniteEpisodes } from "../hooks/useInfiniteEpisodes";
import type { Episode } from "../types";

function EpisodesPage(): JSX.Element {
  const { episodes, loading, error, hasMore, loadMore } = useInfiniteEpisodes();
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
      <h2>Эпизоды</h2>
      <ul>
        {episodes.map((episode: Episode, index) => {
          const isLast = index === episodes.length - 1;
          return (
            <li key={episode.id} ref={isLast ? lastRef : null}>
              <Link to={`/episodes/${episode.id}`}>{episode.name}</Link> (
              {episode.episode}) — {episode.air_date}
            </li>
          );
        })}
      </ul>

      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!hasMore && <p>Больше эпизодов нет</p>}
    </section>
  );
}

export default EpisodesPage;
