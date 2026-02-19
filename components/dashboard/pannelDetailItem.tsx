import { ComponentType, SVGProps } from "react";
import { IconWrapper } from "../ui/iconwrapper";
import { cn } from "@/lib/utils";
import { TrendDownIcon, TrendUpIcon } from "../icons/dashboard-panel-icons";


export type PanelIcon = ComponentType<SVGProps<SVGSVGElement>>;
export type TrendTone = "success" | "danger";
export type PanelStatus = "Reconciled" | "Closed" | "Open";

export type SidePanelItem = {
  id: string;
  label: string;
  value: string;
  icon: PanelIcon;
  trend?: string;
  trendTone?: TrendTone;
};



export default function PanelDetailItem({ item }: { item: SidePanelItem }) {
  const Icon = item.icon;
  const trendTone = item.trendTone ?? "success";

  return (
    <div className="flex items-start gap-2.5">
      <IconWrapper
        className=" border border-slate-200 bg-white text-emerald-700 shadow-none"
      >
        <Icon />
      </IconWrapper>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] leading-4 text-slate-400">{item.label}</p>
        <div className="mt-0.5 flex items-center justify-between gap-2">
          <p className="truncate text-sm leading-5 text-slate-700">{item.value}</p>
          {item.trend ? (
            <span
              className={cn(
                "inline-flex shrink-0 items-center gap-1 text-[10px] font-medium",
                trendTone === "success" ? "text-emerald-600" : "text-red-500"
              )}
            >
              {trendTone === "success" ? (
                <TrendUpIcon className="h-3 w-3" />
              ) : (
                <TrendDownIcon className="h-3 w-3" />
              )}
              {item.trend}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
