"use client";

import { useRouter } from "next/navigation";
import { OnBoardingHeader } from "@/components/onboarding/header";
import { Button } from "@/components/ui/button";

export default function FinalPage() {
  const router = useRouter();

  return (
    <div className="flex h-full flex-col justify-center space-y-10 py-[20px]">
      <OnBoardingHeader
        icon="/final.svg"
        title="You are all Set!"
        subtitle="Your admin profile has been successfully created! Welcome to the MarketRuns."
      />

      <Button
        type="button"
        className="w-full"
        onClick={() => router.push("/signin")}
      >
        Proceed to Login
      </Button>
    </div>
  );
}
