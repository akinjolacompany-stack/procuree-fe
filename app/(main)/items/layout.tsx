import { ItemsShell } from "@/components/item/items-shell";
import type { ReactNode } from "react";

export default function ItemsLayout({ children }: { children: ReactNode }) {
  return <ItemsShell>{children}</ItemsShell>;
}
