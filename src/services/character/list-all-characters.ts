import { api } from "../api";
import { ApiResponse } from "../type";

export const listAllCharacters = async (params: any): Promise<ApiResponse> => {
  const { data } = await api.get("/character/filter", { params });
  return data as ApiResponse;
};
