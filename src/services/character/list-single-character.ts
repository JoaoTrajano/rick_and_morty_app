import { api } from "../api";
import { ApiResponse } from "../type";

export const listSingleCharacter = async (
  characterId: string
): Promise<ApiResponse> => {
  const { data } = await api.get(`/character/${characterId}`);
  return data as ApiResponse;
};
