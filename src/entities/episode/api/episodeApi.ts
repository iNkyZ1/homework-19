import { getJson } from "@/shared/api/http";
import { RM_API } from "@/shared/api/rickAndMorty";
import type { Episode, Paginated } from "../model/types";

export function fetchEpisodes(page = 1) {
  return getJson<Paginated<Episode>>(`${RM_API}/episode?page=${page}`);
}

export function fetchEpisodeById(id: string | number) {
  return getJson<Episode>(`${RM_API}/episode/${id}`);
}
