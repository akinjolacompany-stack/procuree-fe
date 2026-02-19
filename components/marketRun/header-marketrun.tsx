import Image from "next/image";

export function MarketRunHeader({
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
      {icon && (
        <Image src={icon} alt="Market Run Image" width={100} height={80} />
      )}

      <div className=" flex flex-col gap-[8px]">
        <h1 className="text-[#1F2933] font-semibold text-[20px] leading-[36px] ">
          {title}
        </h1>
        <p className="text-[14] text-[#9CA3AF] font-medium leading-6">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
