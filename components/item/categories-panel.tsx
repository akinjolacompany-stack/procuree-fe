"use client";

import { DeleteIcon } from "@/components/icons/delete";
import { EditIcon } from "@/components/icons/edit";
import { CategoryForm } from "@/components/item/category/form";
import { Card } from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { Modal, ModalBody } from "@/components/ui/modal";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { SearchIcon } from "./search-icon";

type CategoryRow = {
  id: string;
  name: string;
  isDefault?: boolean;
};

const CATEGORY_ROWS: CategoryRow[] = [
  { id: "others", name: "Others (Default)", isDefault: true },
  { id: "oils", name: "Oils" },
  { id: "beverages", name: "Beverages" },
  { id: "cosmetics", name: "Cosmetics" },
];

type CategoriesPanelProps = {
  className?: string;
};

export function CategoriesPanel({ className }: CategoriesPanelProps) {
  const [categorySearch, setCategorySearch] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState(CATEGORY_ROWS[0].id);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const filteredCategories = useMemo(() => {
    const query = categorySearch.trim().toLowerCase();
    if (!query) {
      return CATEGORY_ROWS;
    }

    return CATEGORY_ROWS.filter((category) =>
      category.name.toLowerCase().includes(query),
    );
  }, [categorySearch]);

  return (
    <Card
      className={cn(
        "h-fit rounded-[8px] border border-[#E4E7EC] p-4",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase text-[#98A2B3]">
          Categories
        </p>
        <button
          type="button"
          onClick={() => setIsCategoryModalOpen(true)}
          className="text-[10px] font-bold uppercase tracking-wide text-[#2E7DAF] underline decoration-[#2E7DAF] decoration-[1.5px] underline-offset-2"
        >
          Add Category
        </button>
      </div>

      <Input
        value={categorySearch}
        onChange={(event) => setCategorySearch(event.target.value)}
        placeholder="search..."
        suffix={<SearchIcon className="h-4 w-4" />}
        className="mt-2 h-9 rounded-[6px] border-[#D0D5DD]"
        aria-label="Search categories"
      />

      <ul className="mt-3 space-y-1">
        {filteredCategories.length ? (
          filteredCategories.map((category, index) => (
            <li
              key={category.id}
              className={cn(
                "flex items-center justify-between rounded-[6px] px-2 py-2",
                activeCategoryId === category.id
                  ? "bg-[#EAECF0]"
                  : "hover:bg-[#F2F4F7]",
              )}
            >
              <button
                type="button"
                onClick={() => setActiveCategoryId(category.id)}
                className="flex min-w-0 flex-1 items-center gap-2 text-left"
              >
                <span className="w-4 text-xs font-medium text-[#667085]">
                  {index + 1}.
                </span>
                <span className="truncate text-xs font-medium text-[#475467]">
                  {category.name}
                </span>
              </button>

              {!category.isDefault ? (
                <div className="flex items-center gap-1 text-[#98A2B3]">
                  <IconButton
                    label={`Edit ${category.name}`}
                    className="inline-flex items-center justify-center rounded-sm p-0.5 transition-opacity hover:opacity-80"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    label={`Delete ${category.name}`}
                    className="inline-flex items-center justify-center rounded-sm p-0.5 transition-opacity hover:opacity-80"
                  >
                    <DeleteIcon className="h-4 w-4" />
                  </IconButton>
                </div>
              ) : null}
            </li>
          ))
        ) : (
          <li className="px-2 py-3 text-xs text-[#98A2B3]">
            No categories found.
          </li>
        )}
      </ul>

      <Modal
        open={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        title="Add Category"
        panelClassName="max-w-[560px]"
      >
        <ModalBody className="space-y-4">
          <CategoryForm onClose={() => setIsCategoryModalOpen(false)} />
        </ModalBody>
      </Modal>
    </Card>
  );
}
