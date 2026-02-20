import { apiClient } from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type { SignInPayload, SignInResponse } from "./types";

export async function signInUser(payload: SignInPayload): Promise<SignInResponse> {
  const response = await apiClient.post<SignInResponse>(
    API_ENDPOINTS.users.signIn,
    payload,
  );
  return response.data;
}
