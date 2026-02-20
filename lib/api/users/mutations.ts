"use client";

import { useMutation } from "@tanstack/react-query";
import { setApiAccessToken } from "@/lib/api/axios";
import { signInUser } from "./service";
import type { SignInPayload } from "./types";

export function useSignInMutation() {
  return useMutation({
    mutationFn: (payload: SignInPayload) => signInUser(payload),
    onSuccess: (response) => {
      const token = response.data.token;
      if (token) {
        setApiAccessToken(token);
      }
    },
  });
}
