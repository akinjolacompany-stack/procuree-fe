"use client";

import { CategoriesPanel } from "@/components/item/categories-panel";
import { ItemsPanel } from "@/components/item/items-panel";

export default function DashboardPage() {
  return (
    <>
      <div>
        <h3 className="text-xl font-semibold leading-7 text-[#1F2933]">Items</h3>
        <p className="text-base font-medium leading-6 text-[#1F2933]">
          Manage commodities, units, pricing, and constraints for purchase
          periods{" "}
        </p>
      </div>

      <div className="mt-[20px] grid grid-cols-1 gap-3 lg:grid-cols-8">
        <CategoriesPanel className="lg:col-span-2" />
        <ItemsPanel className="lg:col-span-6" />
      </div>
    </>
  );
}
