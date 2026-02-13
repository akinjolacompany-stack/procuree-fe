"use client";
import Image from "next/image";
import type { ReactNode } from "react";


export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-[500px_1fr] min-h-screen">
      <div className="relative w-full h-full">
        <Image
          src="/signUp.svg"
          alt="On Boarding Image"
          fill
          className="object-cover rounded-[8px]"
        />
      </div>

      <main className="">
        <div className="h-screen flex overflow-y-scroll justify-center w-full ">
          <div className="max-w-[542px] w-full ">{children}</div>
        </div>
      </main>
    </div>
  );
}
