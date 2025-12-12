import { Card, Stack, Text } from "@mantine/core";
import type { Episode } from "../model/types";

type Props = {
  episode: Episode;
};

export function EpisodeDetailsCard({ episode }: Props) {
  return (
    <Card withBorder radius="md" padding="lg">
      <Stack gap={6}>
        <Text size="xl" fw={800}>
          {episode.name}
        </Text>
        <Text>Код эпизода: {episode.episode}</Text>
        <Text>Дата выхода: {episode.air_date}</Text>
      </Stack>
    </Card>
  );
}
