"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommodity, updateCommodity } from "./service";
import { commoditiesQueryKeys } from "./queries";
import type { CreateCommodityPayload, UpdateCommodityPayload } from "./types";

export function useCreateCommodityMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCommodityPayload) => createCommodity(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: commoditiesQueryKeys.all });
    },
  });
}

export function useUpdateCommodityMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateCommodityPayload) => updateCommodity(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: commoditiesQueryKeys.all });
    },
  });
}
