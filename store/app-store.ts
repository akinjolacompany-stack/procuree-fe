import { create } from "zustand";
import { createDashboardSlice } from "./slices/dashboard-slice";
import { createItemFlowSlice } from "./slices/item-flow-slice";
import { createUiSlice } from "./slices/ui-slice";
import type { AppStore } from "./types";

export const useAppStore = create<AppStore>()((...state) => ({
  ...createUiSlice(...state),
  ...createItemFlowSlice(...state),
  ...createDashboardSlice(...state),
}));
