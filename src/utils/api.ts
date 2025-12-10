import type { Character } from "../types";

const API_URL = "https://rickandmortyapi.com/api/character";

export async function fetchCharacters(page: number = 1): Promise<{
  results: Character[];
  hasMore: boolean;
}> {
  const response = await fetch(`${API_URL}?page=${page}`);

  if (!response.ok) {
    throw new Error("Ошибка при загрузке персонажей");
  }

  const data = await response.json();

  return {
    results: data.results,
    hasMore: data.info.next !== null,
  };
}
