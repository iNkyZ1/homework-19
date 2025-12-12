import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Center, Loader, Text } from "@mantine/core";
import { fetchLocationById } from "@/entities/location/api/locationApi";
import { LocationDetailsCard } from "@/entities/location/ui/LocationDetailsCard";
import type { Location } from "@/entities/location/model/types";

function LocationDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetchLocationById(id)
      .then(setLocation)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <Center>
        <Loader />
      </Center>
    );
  if (error) return <Text c="red">{error}</Text>;
  if (!location) return <Text>Локация не найдена</Text>;

  return <LocationDetailsCard location={location} />;
}

export default LocationDetailsPage;
