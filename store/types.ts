import type { DashboardSlice } from "./slices/dashboard-slice";
import type { UiSlice } from "./slices/ui-slice";

export type AppStore = DashboardSlice & UiSlice;
