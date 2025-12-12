import { Card, Stack, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import type { Location } from "../model/types";

type Props = {
  location: Location;
};

export function LocationCard({ location }: Props) {
  return (
    <Card withBorder radius="md" padding="md">
      <Stack gap={4}>
        <Text
          component={Link}
          to={`/locations/${location.id}`}
          fw={700}
          style={{ textDecoration: "none" }}
        >
          {location.name}
        </Text>

        <Text size="sm" c="dimmed">
          {location.type}
          {location.dimension ? ` • ${location.dimension}` : ""}
        </Text>
      </Stack>
    </Card>
  );
}
