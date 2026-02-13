"use client";

import type { ComponentType, SVGProps } from "react";
import { useState } from "react";
import {
  DeliveryDatePanelIcon,
  DescriptionPanelIcon,
  ItemsPanelIcon,
  ParticipantPanelIcon,
  SurplusPanelIcon,
  TrendDownIcon,
  TrendUpIcon,
  VolumePanelIcon,
} from "@/components/icons/dashboard-panel-icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconWrapper } from "@/components/ui/iconwrapper";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type PanelIcon = ComponentType<SVGProps<SVGSVGElement>>;
type TrendTone = "success" | "danger";

type SidePanelItem = {
  id: string;
  label: string;
  value: string;
  icon: PanelIcon;
  trend?: string;
  trendTone?: TrendTone;
};

const MARKET_RUN_OPTIONS = [
  { label: "Dry Goods - 11/09/2024", value: "dry-goods" },
  { label: "Fruits - 21/01/2025", value: "fruits" },
  { label: "Grains - 17/01/2025", value: "grains" },
];

const SIDE_PANEL_ITEMS: SidePanelItem[] = [
  {
    id: "description",
    label: "Market Runs Description",
    value: "Dry Goods",
    icon: DescriptionPanelIcon,
  },
  {
    id: "delivery-date",
    label: "Market Runs Delivery Date",
    value: "11/09/2024",
    icon: DeliveryDatePanelIcon,
  },
  {
    id: "participants",
    label: "Market Participant",
    value: "12",
    icon: ParticipantPanelIcon,
    trend: "93% participation",
    trendTone: "success",
  },
  {
    id: "volume",
    label: "Market Volume",
    value: "₦ 67,000.00",
    icon: VolumePanelIcon,
    trend: "5.9% increase",
    trendTone: "success",
  },
  {
    id: "surplus",
    label: "Surplus/Deficit",
    value: "₦ 7,440.00",
    icon: SurplusPanelIcon,
    trend: "4.1% decrease",
    trendTone: "danger",
  },
  {
    id: "items",
    label: "Market Items",
    value: "22",
    icon: ItemsPanelIcon,
  },
];

export function DashboardSidePanel({ className }: { className?: string }) {
  const [selectedRun, setSelectedRun] = useState(MARKET_RUN_OPTIONS[0].value);

  return (
    <div className={cn("space-y-4", className)}>
      <Card className="rounded-[10px] p-3.5">
        <Select
          aria-label="Select market run"
          value={selectedRun}
          onChange={(event) => setSelectedRun(event.target.value)}
          options={MARKET_RUN_OPTIONS}
          className="h-10 rounded-[8px] border-slate-300 text-xs text-slate-500"
        />

        <div className="mt-3 flex items-center justify-end gap-2">
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-blue-600">
            <span className="h-2 w-2 rounded-full bg-blue-600" aria-hidden="true" />
            Reconciled
          </span>
          <span
            className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border border-slate-300 text-[9px] font-semibold text-slate-400"
            aria-label="Reconciliation info"
          >
            i
          </span>
        </div>

        <div className="mt-3 space-y-3">
          {SIDE_PANEL_ITEMS.map((item) => (
            <PanelDetailItem key={item.id} item={item} />
          ))}
        </div>
      </Card>

      <Card className="overflow-hidden rounded-[10px] bg-[linear-gradient(108deg,#58D7E6_0%,#4A88F5_100%)] p-4 text-white">
        <p className="text-sm font-semibold">Invite Member</p>
        <p className="mt-1 text-[11px] leading-4 text-white/85">
          Invite your team and keep everyone aligned on each market run.
        </p>
        <Button
          type="button"
          color="slate"
          variant="secondary"
          size="xs"
          className="mt-3 h-7 min-w-[74px] rounded-[6px] bg-white px-3 text-[11px] font-medium text-slate-700 hover:bg-slate-100"
        >
          Invite
        </Button>
      </Card>
    </div>
  );
}

function PanelDetailItem({ item }: { item: SidePanelItem }) {
  const Icon = item.icon;
  const trendTone = item.trendTone ?? "success";

  return (
    <div className="flex items-start gap-2.5">
      <IconWrapper
        size="sm"
        className="h-7 w-7 border border-slate-200 bg-white text-emerald-700 shadow-none"
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
