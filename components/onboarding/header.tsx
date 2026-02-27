import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export function OnBoardingHeader({
  title,
  subtitle,
  icon,
  shouldSkipInvitation = false,
}: {
  title: string;
  subtitle: string;
  icon?: string;
  shouldSkipInvitation?: boolean;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <div className="flex justify-between  items-center">
        {icon && (
          <Image src={icon} alt="On Boarding Image" width={100} height={80} />
        )}

        {shouldSkipInvitation && (
          <button
            type="button"
            onClick={() => router.push("/onboarding/final")}
            className=" h-[40px] text-[#2E7DAF] cursor-pointer bg-[#F9FAFB] opacity-100 gap-[10px] border-[#2E7DAF] border-b border-b-[1px] p-[10px]"
          >
            Skip Invitation
          </button>
        )}
      </div>

      <div className=" flex flex-col gap-[16px]">
        <h1 className="text-[#1F2933] font-semibold text-[28px] leading-[36px] ">
          {title}
        </h1>
        <p className="text-base text-[#9CA3AF] font-medium leading-6">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
