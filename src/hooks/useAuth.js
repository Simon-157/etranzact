import { useMutation } from "@tanstack/react-query";
import authService from "../api/auth.service";

export const useAuth = () => {
  const mutation = useMutation(authService.login);

  return mutation;
};