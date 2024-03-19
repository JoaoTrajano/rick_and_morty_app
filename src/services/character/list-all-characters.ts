import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { ApiResponse } from "../type";

const listAllCharacters = async (): Promise<ApiResponse> => {
  const { data } = await api.get("/character");
  return data as ApiResponse;
};

export const useListAllCharacters = ({ ...rest }: any) =>
  useQuery({
    enabled: true,
    queryKey: ["listAllCharacters"],
    queryFn: async (): Promise<ApiResponse> => await listAllCharacters(),
    ...rest,
  });
