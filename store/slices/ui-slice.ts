import type { StateCreator } from "zustand";
import type { AppStore } from "../types";

export type SnackbarVariant = "success" | "error" | "info";

export type SnackbarOptions = {
  title?: string;
  durationMs?: number;
};

export type SnackbarNotification = {
  id: number;
  variant: SnackbarVariant;
  title: string;
  message: string;
  durationMs: number;
};

const DEFAULT_SNACKBAR_DURATION_MS = 4000;
const DEFAULT_SNACKBAR_TITLES: Record<SnackbarVariant, string> = {
  success: "Success",
  error: "Error",
  info: "Info",
};

let snackbarSequence = 0;

function createSnackbarNotification(
  variant: SnackbarVariant,
  message: string,
  options?: SnackbarOptions,
): SnackbarNotification {
  snackbarSequence += 1;

  return {
    id: snackbarSequence,
    variant,
    title: options?.title ?? DEFAULT_SNACKBAR_TITLES[variant],
    message,
    durationMs: options?.durationMs ?? DEFAULT_SNACKBAR_DURATION_MS,
  };
}

export type UiSlice = {
  isSidebarCollapsed: boolean;
  currentSnackbar: SnackbarNotification | null;
  snackbarQueue: SnackbarNotification[];
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebarCollapsed: () => void;
  openSnackbar: (
    variant: SnackbarVariant,
    message: string,
    options?: SnackbarOptions,
  ) => void;
  showSuccess: (message: string, options?: SnackbarOptions) => void;
  showError: (message: string, options?: SnackbarOptions) => void;
  showInfo: (message: string, options?: SnackbarOptions) => void;
  dismissSnackbar: () => void;
  clearSnackbars: () => void;
};

export const createUiSlice: StateCreator<AppStore, [], [], UiSlice> = (
  set,
  get,
) => ({
  isSidebarCollapsed: false,
  currentSnackbar: null,
  snackbarQueue: [],
  setSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),
  toggleSidebarCollapsed: () =>
    set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  openSnackbar: (variant, message, options) =>
    set((state) => {
      const nextSnackbar = createSnackbarNotification(
        variant,
        message,
        options,
      );

      if (!state.currentSnackbar) {
        return {
          currentSnackbar: nextSnackbar,
        };
      }

      return {
        snackbarQueue: [...state.snackbarQueue, nextSnackbar],
      };
    }),
  showSuccess: (message, options) =>
    get().openSnackbar("success", message, options),
  showError: (message, options) =>
    get().openSnackbar("error", message, options),
  showInfo: (message, options) => get().openSnackbar("info", message, options),
  dismissSnackbar: () =>
    set((state) => {
      if (state.snackbarQueue.length === 0) {
        return {
          currentSnackbar: null,
        };
      }

      const [nextSnackbar, ...remainingQueue] = state.snackbarQueue;

      return {
        currentSnackbar: nextSnackbar,
        snackbarQueue: remainingQueue,
      };
    }),
  clearSnackbars: () =>
    set({
      currentSnackbar: null,
      snackbarQueue: [],
    }),
});
