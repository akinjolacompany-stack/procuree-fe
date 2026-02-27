import { useAppStore } from "./app-store";
import type { SnackbarOptions, SnackbarVariant } from "./slices/ui-slice";

function show(variant: SnackbarVariant, message: string, options?: SnackbarOptions) {
  useAppStore.getState().openSnackbar(variant, message, options);
}

export const snackbar = {
  show,
  success: (message: string, options?: SnackbarOptions) =>
    show("success", message, options),
  error: (message: string, options?: SnackbarOptions) => show("error", message, options),
  info: (message: string, options?: SnackbarOptions) => show("info", message, options),
  dismiss: () => useAppStore.getState().dismissSnackbar(),
  clear: () => useAppStore.getState().clearSnackbars(),
};
