"use client";

import { cn } from "@/lib/utils";

export type VerticalStepperProps = {
  totalSteps: number;
  currentStep: number;
  className?: string;
  ariaLabel?: string;
  activeDotClassName?: string;
  inactiveDotClassName?: string;
};

function getSafeCurrentStep(totalSteps: number, currentStep: number): number {
  if (totalSteps <= 0) {
    return 0;
  }

  return Math.max(1, Math.min(currentStep, totalSteps));
}

export function VerticalStepper({
  totalSteps,
  currentStep,
  className,
  ariaLabel = "Progress",
  activeDotClassName,
  inactiveDotClassName,
}: VerticalStepperProps) {
  const safeTotalSteps = Math.max(0, Math.floor(totalSteps));
  const safeCurrentStep = getSafeCurrentStep(safeTotalSteps, currentStep);

  if (!safeTotalSteps) {
    return null;
  }

  return (
    <nav aria-label={ariaLabel} className={cn("inline-flex", className)}>
      <ol className="flex flex-col items-center gap-2">
        {Array.from({ length: safeTotalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === safeCurrentStep;

          return (
            <li key={`vertical-step-${stepNumber}`} className="relative">
              <span
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "block rounded-full transition-colors",
                  isActive
                    ? "h-8 w-2 bg-[#2E7DAF]"
                    : "h-2 w-2 bg-[#DFE3E8]",
                  isActive ? activeDotClassName : inactiveDotClassName,
                )}
              />
              <span className="sr-only">
                {`Step ${stepNumber} of ${safeTotalSteps}${isActive ? ", current step" : ""}`}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
