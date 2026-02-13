"use client";

import { useShallow } from "zustand/react/shallow";
import { useAppStore } from "../app-store";
import {
  selectDashboardFilters,
  selectDashboardRows,
} from "../selectors/dashboard-selectors";

export function useDashboardRows() {
  return useAppStore(selectDashboardRows);
}


export function useDashboardFilters() {
  return useAppStore(useShallow(selectDashboardFilters));
}

