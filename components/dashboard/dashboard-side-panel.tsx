"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Modal, ModalBody } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CalenderIcon } from "../icons/calender";
import { ItemsNavIcon } from "../icons/items-nav-icon";
import { MembersNavIcon } from "../icons/members-nav-icon";
import { MessageIcon } from "../icons/message";
import { MoneyIcon } from "../icons/money";
import { Invite } from "./invite";
import PanelDetailItem, { type PanelStatus, type SidePanelItem } from "./pannelDetailItem";
import StatusHambuger from "./statusHambuger";

const MARKET_RUN_OPTIONS: Array<{ label: string; value: string; status: PanelStatus }> = [
  { label: "Dry Goods - 11/09/2024", value: "dry-goods", status: "Reconciled" },
  { label: "Fruits - 21/01/2025", value: "fruits", status: "Open" },
  { label: "Grains - 17/01/2025", value: "grains", status: "Closed" },
];

const SIDE_PANEL_ITEMS: SidePanelItem[] = [
  {
    id: "description",
    label: "Market Runs Description",
    value: "Dry Goods",
    icon: MessageIcon,
  },
  {
    id: "delivery-date",
    label: "Market Runs Delivery Date",
    value: "11/09/2024",
    icon: CalenderIcon,
  },
  {
    id: "participants",
    label: "Market Participant",
    value: "12",
    icon: MembersNavIcon,
    trend: "93% participation",
    trendTone: "success",
  },
  {
    id: "volume",
    label: "Market Volume",
    value: "₦ 67,000.00",
    icon: MoneyIcon,
    trend: "5.9% increase",
    trendTone: "success",
  },
  {
    id: "surplus",
    label: "Surplus/Deficit",
    value: "₦ 7,440.00",
    icon: MoneyIcon,
    trend: "4.1% decrease",
    trendTone: "danger",
  },
  {
    id: "items",
    label: "Market Items",
    value: "22",
    icon: ItemsNavIcon,
  },
];

export function DashboardSidePanel({ className }: { className?: string }) {
  const [selectedRun, setSelectedRun] = useState(MARKET_RUN_OPTIONS[0].value);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const selectedRunOption =
    MARKET_RUN_OPTIONS.find((option) => option.value === selectedRun) ?? MARKET_RUN_OPTIONS[0];

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

        <StatusHambuger text={selectedRunOption.status} />

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
          onClick={() => setIsInviteModalOpen(true)}
          className="mt-3 h-7 min-w-[74px] rounded-[6px] bg-white px-3 text-[11px] font-medium text-slate-700 hover:bg-slate-100"
        >
          Invite
        </Button>
      </Card>

      <Modal
        open={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        title="Invite Member"
        panelClassName="max-w-[560px]"
        description="To invite someone to your team, simply enter their phone number, and we'll send them an invitation link to register. Alternatively, you can send the link directly to them, and once they register, they'll appear in the community."
      >
        <ModalBody className="space-y-4">
          <Invite setIsInviteModalOpen={setIsInviteModalOpen} />
        </ModalBody>
      </Modal>
    </div>
  );
}
