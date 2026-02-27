"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "./service";
import type { GetCategoriesPayload } from "./types";

const DEFAULT_CATEGORY_PAGE = 1;
const DEFAULT_CATEGORIES_PER_PAGE = 50;

export const categoriesQueryKeys = {
  all: ["categories"] as const,
  list: (payload: { page: number; perPage: number; searchQuery: string }) =>
    [...categoriesQueryKeys.all, payload.page, payload.perPage, payload.searchQuery] as const,
};

export function useCategoriesQuery(payload: GetCategoriesPayload = {}) {
  const page = payload.page ?? DEFAULT_CATEGORY_PAGE;
  const perPage = payload.perPage ?? DEFAULT_CATEGORIES_PER_PAGE;
  const searchQuery = payload.searchQuery?.trim() ?? "";

  return useQuery({
    queryKey: categoriesQueryKeys.list({ page, perPage, searchQuery }),
    queryFn: () =>
      getCategories({
        page,
        perPage,
        searchQuery,
      }),
  });
}
