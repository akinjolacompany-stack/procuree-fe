import { apiClient } from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type {
  CreateAdminPayload,
  CreateAdminResponse,
  SignInPayload,
  SignInResponse,
} from "./types";

export async function signInUser(payload: SignInPayload): Promise<SignInResponse> {
  const response = await apiClient.post<SignInResponse>(
    API_ENDPOINTS.users.signIn,
    payload,
  );
  return response.data;
}

export async function createAdminUser(
  payload: CreateAdminPayload,
): Promise<CreateAdminResponse> {
  const response = await apiClient.post<CreateAdminResponse>(
    API_ENDPOINTS.users.createAdmin,
    payload,
  );
  return response.data;
}
