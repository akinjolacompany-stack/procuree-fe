import type { StateCreator } from "zustand";
import type { AppStore } from "../types";

export type ItemFlowMode = "create" | "update";

export type ItemDetailsDraft = {
  itemName: string;
  description: string;
  categoryId: string;
  baseUnitId: string;
};

export type ItemConversionDraft = {
  quantity: string;
  unitName: string;
};

const initialItemDetailsDraft: ItemDetailsDraft = {
  itemName: "",
  description: "",
  categoryId: "",
  baseUnitId: "",
};

const initialItemConversionDraft: ItemConversionDraft[] = [
  {
    quantity: "4",
    unitName: "",
  },
];

function cloneItemConversionDraft(
  payload: ItemConversionDraft[],
): ItemConversionDraft[] {
  return payload.map((row) => ({
    quantity: row.quantity,
    unitName: row.unitName,
  }));
}

export type ItemFlowSlice = {
  itemFlowMode: ItemFlowMode;
  editingCommodityId: string | null;
  itemDetailsDraft: ItemDetailsDraft;
  itemConversionsDraft: ItemConversionDraft[];
  setItemDetailsDraft: (payload: Partial<ItemDetailsDraft>) => void;
  setItemConversionsDraft: (payload: ItemConversionDraft[]) => void;
  startUpdateItemFlow: (payload: {
    commodityId: string;
    details: Partial<ItemDetailsDraft>;
    conversions?: ItemConversionDraft[];
  }) => void;
  resetItemFlow: () => void;
};

export const createItemFlowSlice: StateCreator<AppStore, [], [], ItemFlowSlice> = (set) => ({
  itemFlowMode: "create",
  editingCommodityId: null,
  itemDetailsDraft: initialItemDetailsDraft,
  itemConversionsDraft: cloneItemConversionDraft(initialItemConversionDraft),
  setItemDetailsDraft: (payload) =>
    set((state) => ({
      itemDetailsDraft: {
        ...state.itemDetailsDraft,
        ...payload,
      },
    })),
  setItemConversionsDraft: (payload) =>
    set({
      itemConversionsDraft: payload.length
        ? cloneItemConversionDraft(payload)
        : cloneItemConversionDraft(initialItemConversionDraft),
    }),
  startUpdateItemFlow: ({ commodityId, details, conversions }) =>
    set({
      itemFlowMode: "update",
      editingCommodityId: commodityId,
      itemDetailsDraft: {
        ...initialItemDetailsDraft,
        ...details,
      },
      itemConversionsDraft:
        conversions && conversions.length
          ? cloneItemConversionDraft(conversions)
          : cloneItemConversionDraft(initialItemConversionDraft),
    }),
  resetItemFlow: () =>
    set({
      itemFlowMode: "create",
      editingCommodityId: null,
      itemDetailsDraft: initialItemDetailsDraft,
      itemConversionsDraft: cloneItemConversionDraft(initialItemConversionDraft),
    }),
});
