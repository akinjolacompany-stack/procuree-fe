import type { ReactNode } from "react";
import { OnBoardingShell } from "@/components/layout/onboarding-shell";

export default function OnBoardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <OnBoardingShell>{children}</OnBoardingShell>;
}
