import { Card, Stack, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import type { Episode } from "../model/types";

type Props = {
  episode: Episode;
};

export function EpisodeCard({ episode }: Props) {
  return (
    <Card withBorder radius="md" padding="md">
      <Stack gap={4}>
        <Text
          component={Link}
          to={`/episodes/${episode.id}`}
          fw={700}
          style={{ textDecoration: "none" }}
        >
          {episode.name}
        </Text>

        <Text size="sm" c="dimmed">
          {episode.episode} • {episode.air_date}
        </Text>
      </Stack>
    </Card>
  );
}
