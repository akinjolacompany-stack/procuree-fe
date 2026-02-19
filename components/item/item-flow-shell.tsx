"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Stepper } from "../ui/stepper";

export function ItemFlowShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const currentStep = pathname.startsWith("/items/conversions") ? 2 : 1;

  return (
    <div className="flex">
      <div className="flex flex-1 flex-col items-center gap-[27px]">
        <Stepper
          steps={["Details", "Conversions"]}
          currentStep={currentStep}
          className="!max-w-[188px]"
        />
        <main className="w-full max-w-[1005px] rounded-[8px] bg-white px-6 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
