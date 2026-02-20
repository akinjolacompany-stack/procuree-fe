import { AxiosError } from "axios";

type ApiErrorShape = {
  message?: string;
};

export function getApiErrorMessage(
  error: unknown,
  fallbackMessage = "Request failed. Please try again.",
) {
  if (error instanceof AxiosError) {
    const messageFromResponse = (error.response?.data as ApiErrorShape | undefined)
      ?.message;

    if (messageFromResponse) {
      return messageFromResponse;
    }

    if (error.message) {
      return error.message;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
}
