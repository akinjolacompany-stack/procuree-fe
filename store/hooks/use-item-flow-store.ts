"use client";

import { useShallow } from "zustand/react/shallow";
import { useAppStore } from "../app-store";

export function useItemFlowStore() {
  return useAppStore(
    useShallow((state) => ({
      itemFlowMode: state.itemFlowMode,
      editingCommodityId: state.editingCommodityId,
      itemDetailsDraft: state.itemDetailsDraft,
      itemConversionsDraft: state.itemConversionsDraft,
      setItemDetailsDraft: state.setItemDetailsDraft,
      setItemConversionsDraft: state.setItemConversionsDraft,
      startUpdateItemFlow: state.startUpdateItemFlow,
      resetItemFlow: state.resetItemFlow,
    })),
  );
}
