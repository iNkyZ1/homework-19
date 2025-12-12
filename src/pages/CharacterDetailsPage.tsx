import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Center, Loader, Text } from "@mantine/core";
import { fetchCharacterById } from "@/entities/character/api/characterApi";
import { CharacterDetailsCard } from "@/entities/character/ui/CharacterDetailsCard";
import type { Character } from "@/entities/character/model/types";

function CharacterDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetchCharacterById(id)
      .then(setCharacter)
      .catch((err) => setError(err.message))
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

  if (!character) {
    return <Text>Персонаж не найден</Text>;
  }

  return <CharacterDetailsCard character={character} />;
}

export default CharacterDetailsPage;
