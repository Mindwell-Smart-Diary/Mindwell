import { useQuery } from "@tanstack/react-query";
import { UserDTO } from "../types/user";
import { backendAxiosInstance } from "../axios/backendInstance";

export const useLoggedInUser = () => {
  const userId = localStorage.getItem("connectedUserId");

  const {
    data: connectedUser,
    isLoading,
    isError,
  } = useQuery<UserDTO>({
    queryKey: ["users", userId],
    queryFn: async () => (await backendAxiosInstance.get(`/users/${userId}`)).data,
  });

  return { connectedUser, isLoading, isError };
};
