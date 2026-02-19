"use client";

import { DeleteIcon } from "@/components/icons/delete";
import { EditIcon } from "@/components/icons/edit";
import { ViewIcon } from "@/components/icons/view";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { DataTable, type DataTableColumn } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { SearchIcon } from "./search-icon";

type ItemTone = "amber" | "sky" | "orange" | "slate" | "emerald" | "indigo";

type ItemRow = {
  id: string;
  serial: number;
  name: string;
  category: string;
  base: string;
  imageSrc?: string;
  tone?: ItemTone;
};

const ITEM_SEEDS: Array<Omit<ItemRow, "id" | "serial">> = [
  {
    name: "Rice",
    category: "Grains",
    base: "Cups",
    imageSrc: "/rice.svg",
    tone: "amber",
  },
  { name: "Beans", category: "Grains", base: "Cups", tone: "slate" },
  { name: "Millet", category: "Grains", base: "Cups", tone: "orange" },
  { name: "Corn", category: "Grains", base: "Cups", tone: "amber" },
  { name: "Tigernuts", category: "Nuts", base: "Cups", tone: "emerald" },
  { name: "Groundnut Oil", category: "Oils", base: "Bottle", tone: "indigo" },
  { name: "Peak Milk", category: "Beverage", base: "Sachet", tone: "sky" },
];

const THUMBNAIL_TONE_STYLES: Record<ItemTone, string> = {
  amber: "bg-amber-100 text-amber-800",
  sky: "bg-sky-100 text-sky-800",
  orange: "bg-orange-100 text-orange-800",
  slate: "bg-slate-200 text-slate-700",
  emerald: "bg-emerald-100 text-emerald-800",
  indigo: "bg-indigo-100 text-indigo-800",
};

const ITEMS: ItemRow[] = Array.from({ length: 10 }, (_, pageIndex) =>
  ITEM_SEEDS.map((seed, seedIndex) => ({
    ...seed,
    id: `${seed.name.toLowerCase().replace(/\s+/g, "-")}-${pageIndex + 1}-${seedIndex + 1}`,
    serial: pageIndex * ITEM_SEEDS.length + seedIndex + 1,
  })),
).flat();

const ITEM_COLUMNS: DataTableColumn<ItemRow>[] = [
  {
    id: "serial",
    header: "S/N",
    accessorKey: "serial",
    headerClassName: "w-[72px]",
    cellClassName: "text-[#667085]",
  },
  {
    id: "name",
    header: "Name",
    cell: (row) => (
      <div className="flex items-center gap-2.5">
        <ItemThumbnail item={row} />
        <span className="font-medium text-[#344054]">{row.name}</span>
      </div>
    ),
    cellClassName: "min-w-[160px]",
  },
  {
    id: "category",
    header: "Category",
    accessorKey: "category",
    cellClassName: "text-[#475467]",
  },
  {
    id: "base",
    header: "Base",
    accessorKey: "base",
    cellClassName: "text-[#475467]",
  },
  {
    id: "actions",
    header: "Action",
    align: "center",
    cell: (row) => (
      <div className="flex items-center justify-center gap-2 text-[#98A2B3]">
        <IconButton
          label={`View ${row.name}`}
          className="inline-flex items-center justify-center rounded-sm text-[#98A2B3] transition-colors hover:text-[#667085]"
        >
          <ViewIcon className="h-4 w-4" />
        </IconButton>
        <IconButton
          label={`Edit ${row.name}`}
          className="inline-flex items-center justify-center rounded-sm transition-opacity hover:opacity-80"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          label={`Delete ${row.name}`}
          className="inline-flex items-center justify-center rounded-sm transition-opacity hover:opacity-80"
        >
          <DeleteIcon className="h-4 w-4" />
        </IconButton>
      </div>
    ),
    cellClassName: "w-[130px]",
  },
];

function ItemThumbnail({ item }: { item: ItemRow }) {
  if (item.imageSrc) {
    return (
      <Image
        src={item.imageSrc}
        alt={item.name}
        width={22}
        height={22}
        className="h-[22px] w-[22px] rounded-[6px] object-cover"
      />
    );
  }

  return (
    <span
      className={cn(
        "inline-flex h-[22px] w-[22px] items-center justify-center rounded-[6px] text-[10px] font-semibold",
        THUMBNAIL_TONE_STYLES[item.tone ?? "slate"],
      )}
      aria-hidden="true"
    >
      {item.name.charAt(0)}
    </span>
  );
}

type ItemsPanelProps = {
  className?: string;
};

export function ItemsPanel({ className }: ItemsPanelProps) {
  const router = useRouter();
  const [itemSearch, setItemSearch] = useState("");

  const filteredItems = useMemo(() => {
    const query = itemSearch.trim().toLowerCase();
    if (!query) {
      return ITEMS;
    }

    return ITEMS.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.base.toLowerCase().includes(query),
    );
  }, [itemSearch]);

  return (
    <Card
      className={cn("rounded-[8px] border border-[#E4E7EC] p-4", className)}
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="w-full max-w-[330px]">
          <p className="text-[10px] font-bold uppercase text-[#98A2B3]">Items</p>
          <Input
            value={itemSearch}
            onChange={(event) => setItemSearch(event.target.value)}
            placeholder="search..."
            suffix={<SearchIcon className="h-4 w-4" />}
            className="mt-2 h-9 rounded-[6px] border-[#D0D5DD]"
            aria-label="Search items"
          />
        </div>

        <Button
          type="button"
          onClick={() => router.push("/items/details")}
          className="h-10 min-w-[104px] rounded-[8px]"
        >
          Add Item
        </Button>
      </div>

      <div className="mt-5 overflow-hidden rounded-[8px] border border-[#E4E7EC]">
        <DataTable
          columns={ITEM_COLUMNS}
          rows={filteredItems}
          rowKey="id"
          pagination={{ pageSize: 7 }}
          tableClassName="text-xs"
          emptyState="No items match your search."
        />
      </div>
    </Card>
  );
}
