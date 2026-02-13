import { ProcureeLogo } from "@/components/icons/procuree-logo";
import { NotificationLogo } from "../icons/notification";
import { ArrowDownIcon } from "../icons/arrowDown";
import { AppHeaderNav } from "./app-header-nav";

type AppHeaderProps = {
  activePath: string;
};

export function AppHeader({ activePath }: AppHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-emerald-100 bg-white/80 px-[40px] py-[16px] backdrop-blur">
      <div className="flex items-center">
        <ProcureeLogo className="h-8 sm:h-9" />
      </div>

      <AppHeaderNav activePath={activePath} />

      <div className="flex gap-[24px]">
        <NotificationLogo />

        <div className="flex items-center gap-[10px] px-[10px] py-[3px]">
          Atinuke Daniels
          <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#B4D1C4]">
            <img src="/avatar.svg" alt="User avatar" />
          </div>
          <ArrowDownIcon />
        </div>
      </div>
    </header>
  );
}
