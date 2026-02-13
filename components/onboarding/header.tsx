import Image from "next/image";
import { ReactNode } from "react";

export function OnBoardingHeader({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon?: string;
}) {
  return (
    <div className="flex flex-col">
        {
            icon &&   <Image src={icon} alt="On Boarding Image" width={100} height={80} />

        }


<div className=" flex flex-col gap-[16px]">
      <h1 className="text-[#1F2933] font-semibold text-[28px] leading-[36px] ">
        {title}
      </h1>
      <p className="text-base text-[#9CA3AF] font-medium leading-6">{subtitle}</p>

      </div>
    </div>
  );
}