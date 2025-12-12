import { Card, Stack, Text } from "@mantine/core";
import type { Location } from "../model/types";

type Props = {
  location: Location;
};

export function LocationDetailsCard({ location }: Props) {
  return (
    <Card withBorder radius="md" padding="lg">
      <Stack gap={6}>
        <Text size="xl" fw={800}>
          {location.name}
        </Text>
        <Text>Тип: {location.type}</Text>
        <Text>Измерение: {location.dimension}</Text>
      </Stack>
    </Card>
  );
}
