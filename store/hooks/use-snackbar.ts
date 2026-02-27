"use client";

import { useShallow } from "zustand/react/shallow";
import { useAppStore } from "../app-store";

export function useSnackbar() {
  return useAppStore(
    useShallow((state) => ({
      showSnackbar: state.openSnackbar,
      showSuccess: state.showSuccess,
      showError: state.showError,
      showInfo: state.showInfo,
      dismissSnackbar: state.dismissSnackbar,
      clearSnackbars: state.clearSnackbars,
    })),
  );
}
