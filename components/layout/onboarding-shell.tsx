"use client";
import Image from "next/image";
import type { ReactNode } from "react";
import { ProcureeLogo } from "../icons/procuree-logo";
import { InnerOnBoardingImg } from "../icons/innerOnboardingLogo";
import { Button } from "../ui/button";

export function OnBoardingShell({ children }: { children: ReactNode }) {
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
          src="/onBoardingImg.png"
          alt="On Boarding Image"
          fill
          className=" rounded-[8px] px-[23px] py-[24px]"
        />
      </div>

      <main className="">
        <div className="h-screen flex overflow-y-scroll justify-center w-full ">
          <div className="max-w-[500px] ">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
