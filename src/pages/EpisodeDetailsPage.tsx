import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Center, Loader, Text } from "@mantine/core";
import { fetchEpisodeById } from "@/entities/episode/api/episodeApi";
import { EpisodeDetailsCard } from "@/entities/episode/ui/EpisodeDetailsCard";
import type { Episode } from "@/entities/episode/model/types";

function EpisodeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetchEpisodeById(id)
      .then(setEpisode)
      .catch((err) => setError((err as Error).message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  if (error) {
    return <Text c="red">{error}</Text>;
  }

  if (!episode) {
    return <Text>Эпизод не найден</Text>;
  }

  return <EpisodeDetailsCard episode={episode} />;
}

export default EpisodeDetailsPage;
