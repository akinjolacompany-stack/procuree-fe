import type { StateCreator } from "zustand";
import type { AppStore } from "../types";

export type OnboardingDraft = {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phoneNumber: string;
  businessName: string;
  businessDescription: string;
};

const initialOnboardingDraft: OnboardingDraft = {
  email: "",
  password: "",
  confirmPassword: "",
  fullName: "",
  phoneNumber: "",
  businessName: "",
  businessDescription: "",
};

export type OnboardingFlowSlice = {
  onboardingDraft: OnboardingDraft;
  setOnboardingDraft: (payload: Partial<OnboardingDraft>) => void;
  resetOnboardingFlow: () => void;
};

export const createOnboardingFlowSlice: StateCreator<
  AppStore,
  [],
  [],
  OnboardingFlowSlice
> = (set) => ({
  onboardingDraft: initialOnboardingDraft,
  setOnboardingDraft: (payload) =>
    set((state) => ({
      onboardingDraft: {
        ...state.onboardingDraft,
        ...payload,
      },
    })),
  resetOnboardingFlow: () =>
    set({
      onboardingDraft: initialOnboardingDraft,
    }),
});
