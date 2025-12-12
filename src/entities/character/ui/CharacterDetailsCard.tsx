import { Card, Group, Avatar, Text, Stack } from "@mantine/core";
import type { Character } from "../model/types";

type Props = {
  character: Character;
};

export function CharacterDetailsCard({ character }: Props) {
  return (
    <Card withBorder radius="md" padding="lg">
      <Group align="flex-start">
        <Avatar src={character.image} size={120} radius="md" />

        <Stack gap={6}>
          <Text size="xl" fw={800}>
            {character.name}
          </Text>

          <Text>Статус: {character.status}</Text>
          <Text>Вид: {character.species}</Text>
          <Text>Пол: {character.gender}</Text>
        </Stack>
      </Group>
    </Card>
  );
}
