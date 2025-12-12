import { getJson } from "@/shared/api/http";
import { RM_API } from "@/shared/api/rickAndMorty";
import type { Character } from "../model/types";
import type { Paginated } from "@/shared/api/types";

export function fetchCharacters(page = 1) {
  return getJson<Paginated<Character>>(`${RM_API}/character?page=${page}`);
}

export function fetchCharacterById(id: string | number) {
  return getJson<Character>(`${RM_API}/character/${id}`);
}
