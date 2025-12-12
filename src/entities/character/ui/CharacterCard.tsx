import { Card, Group, Avatar, Text, Stack } from "@mantine/core";
import { Link } from "react-router-dom";
import type { Character } from "../model/types";

type Props = {
  character: Character;
};

export function CharacterCard({ character }: Props) {
  return (
    <Card withBorder radius="md" padding="md">
      <Group wrap="nowrap" align="flex-start">
        <Avatar src={character.image} size={64} radius="md" />
        <Stack gap={4} style={{ flex: 1 }}>
          <Text
            component={Link}
            to={`/characters/${character.id}`}
            fw={700}
            style={{ textDecoration: "none" }}
          >
            {character.name}
          </Text>
          <Text size="sm" c="dimmed">
            {character.status} • {character.species}
          </Text>
        </Stack>
      </Group>
    </Card>
  );
}
