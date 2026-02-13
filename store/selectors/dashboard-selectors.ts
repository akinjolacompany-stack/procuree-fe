import type { AppStore } from "../types";
import type { MarketRunRow } from "../data/market-runs";

export function selectDashboardRows(state: AppStore): MarketRunRow[] {
  const query = state.searchQuery.trim().toLowerCase();

  const byStatus =
    state.statusFilter === "all"
      ? state.marketRuns
      : state.marketRuns.filter((row) => row.status === state.statusFilter);

  if (!query) {
    return byStatus;
  }

  return byStatus.filter((row) => {
    return (
      row.date.toLowerCase().includes(query) ||
      row.description.toLowerCase().includes(query) ||
      row.totalAmount.toLowerCase().includes(query) ||
      row.status.toLowerCase().includes(query)
    );
  });
}

export function selectDashboardFilters(state: AppStore) {
  return {
    searchQuery: state.searchQuery,
    statusFilter: state.statusFilter,
    setSearchQuery: state.setSearchQuery,
    setStatusFilter: state.setStatusFilter,
    resetDashboardFilters: state.resetDashboardFilters,
  };
}
