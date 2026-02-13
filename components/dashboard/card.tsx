import { ReactNode } from "react";
import { Card } from "../ui/card";
import { IconWrapper } from "../ui/iconwrapper";

export default function DashBoardCard({
  className,
  value,
  text,
  icon
}: {
  className: string;
  value: string;
  text: string;
  icon: ReactNode
}) {
  return (
    <Card className={`${className} flex items-center gap-[8px] py-[30px] px-[34px]`}>
      <IconWrapper>
        {icon}
      </IconWrapper>
      <div className="flex flex-col gap-[7px]">
        <p className="font-inter text-xs font-medium leading-4">{text}</p>
        <p className="text-[#1F2933] text-[20px] font-normal leading-none">{value}</p>

      </div>
    </Card>
  );
}
