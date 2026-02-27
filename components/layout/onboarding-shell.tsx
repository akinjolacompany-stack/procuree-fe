"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ProcureeLogo } from "../icons/procuree-logo";
import { InnerOnBoardingImg } from "../icons/innerOnboardingLogo";
import { Button } from "../ui/button";
import { VerticalStepper } from "../ui/vertical-stepper";

const ONBOARDING_STEP_PATHS = [
  "/onboarding/started",
  "/onboarding/verify",
  "/onboarding/personal-info",
  "/onboarding/business-info",
  "/onboarding/invite-members",
];

export function OnBoardingShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldShowStepper = !pathname.startsWith("/onboarding/final");
  const activeStepIndex = ONBOARDING_STEP_PATHS.findIndex((path) =>
    pathname.startsWith(path),
  );
  const currentStep = activeStepIndex >= 0 ? activeStepIndex + 1 : 1;

  return (
    <div className="grid grid-cols-[394px_1fr] min-h-screen">
      <div className="relative w-full h-full">
        <div className="flex flex-col h-full justify-between relative z-10 text-white p-10 pt-[10px]">
          <ProcureeLogo
            className="pt-[20px] self-start h-[70px] mb-[30px]"
            fill="#FFFFFF"
          />
          <InnerOnBoardingImg className="w-full h-full" />
          <div className="mt-[10px]">
            <Button className="w-full" variant="secondary">
              Already have an account?
            </Button>
          </div>
        </div>

        <Image
          src="/onboardingImg.png"
          alt="On Boarding Image"
          fill
          className=" rounded-[8px] px-[23px] py-[24px]"
        />
      </div>

      <main className="overflow-y-scroll h-screen flex">
        <div className="flex  justify-center w-full gap-[100px] pr-1">
          <div className="max-w-[500px] ">{children}</div>
        </div>

        {shouldShowStepper ? (
          <div className="hidden lg:flex items-center  justify-center pr-[20px]">
            <VerticalStepper
              totalSteps={ONBOARDING_STEP_PATHS.length}
              currentStep={currentStep}
              ariaLabel="Onboarding progress"
              className="sticky top-10"
            />
          </div>
        ) : null}
      </main>
    </div>
  );
}
