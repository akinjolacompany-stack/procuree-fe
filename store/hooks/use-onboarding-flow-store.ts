"use client";

import { useShallow } from "zustand/react/shallow";
import { useAppStore } from "../app-store";

export function useOnboardingFlowStore() {
  return useAppStore(
    useShallow((state) => ({
      onboardingDraft: state.onboardingDraft,
      setOnboardingDraft: state.setOnboardingDraft,
      resetOnboardingFlow: state.resetOnboardingFlow,
    })),
  );
}
