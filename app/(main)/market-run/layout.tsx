import { MarketRunShell } from "@/components/marketRun/marketRunShell";
import type { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return <MarketRunShell>{children}</MarketRunShell>;
}
