import { create } from "zustand";
import { createDashboardSlice } from "./slices/dashboard-slice";
import { createUiSlice } from "./slices/ui-slice";
import type { AppStore } from "./types";

export const useAppStore = create<AppStore>()((...state) => ({
  ...createUiSlice(...state),
  ...createDashboardSlice(...state),
}));
