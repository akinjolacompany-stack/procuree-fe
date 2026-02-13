import type { StateCreator } from "zustand";
import type { AppStore } from "../types";
import { MARKET_RUN_ROWS } from "../data/market-runs";
import type { MarketRunStatus, MarketRunRow } from "../data/market-runs";

export type DashboardStatusFilter = "all" | MarketRunStatus;

export type DashboardSlice = {
  marketRuns: MarketRunRow[];
  searchQuery: string;
  statusFilter: DashboardStatusFilter;
  setMarketRuns: (runs: MarketRunRow[]) => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: DashboardStatusFilter) => void;
  resetDashboardFilters: () => void;
};

export const createDashboardSlice: StateCreator<AppStore, [], [], DashboardSlice> = (set) => ({
  marketRuns: MARKET_RUN_ROWS,
  searchQuery: "",
  statusFilter: "all",
  setMarketRuns: (runs) => set({ marketRuns: runs }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  resetDashboardFilters: () =>
    set({
      searchQuery: "",
      statusFilter: "all",
    }),
});
