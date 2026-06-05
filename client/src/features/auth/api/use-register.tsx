import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { signupInput } from "../schema";
import api from "../../../lib/api";

export const useSignUp = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: signupInput) => {
      const res = await api.post("/auth/sign-up", data);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["auth", "session"], data);
      queryClient.invalidateQueries({ queryKey: ["auth", "session"] });
    },
    
  });

  return mutation;
};