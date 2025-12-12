import { getJson } from "@/shared/api/http";
import { RM_API } from "@/shared/api/rickAndMorty";
import type { Location, Paginated } from "../model/types";

export function fetchLocations(page = 1) {
  return getJson<Paginated<Location>>(`${RM_API}/location?page=${page}`);
}

export function fetchLocationById(id: string | number) {
  return getJson<Location>(`${RM_API}/location/${id}`);
}
