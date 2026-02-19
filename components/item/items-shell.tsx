"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ItemFlowShell } from "./item-flow-shell";

export function ItemsShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isItemsFlowRoute =
    pathname.startsWith("/items/details") ||
    pathname.startsWith("/items/conversions");

  if (!isItemsFlowRoute) {
    return <>{children}</>;
  }

  return <ItemFlowShell>{children}</ItemFlowShell>;
}
