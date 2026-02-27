"use client";

import { CautionIcon } from "@/components/icons/caution";
import { MembersNavIcon } from "@/components/icons/members-nav-icon";
import { Card } from "@/components/ui/card";
import { IconWrapper } from "@/components/ui/iconwrapper";
import { cn } from "@/lib/utils";
import { ActiveMemberIcon } from "../icons/active-member";
import { InActiveMemberIcon } from "../icons/inactive-member";
import { PendingMemberIcon } from "../icons/pending-member";
import {
  AverageParticipationIcon,
} from "../icons/average-participation";

type SummaryTone = "emerald" | "red" | "amber" | "blue" | "neutral";

type SummaryItem = {
  id: string;
  label: string;
  value: string;
  icon: React.ReactNode ;
};

const SUMMARY_ITEMS: SummaryItem[] = [
  {
    id: "total",
    label: "Total Member",
    value: "121",
    icon: <ActiveMemberIcon className=""/>,
  },
  {
    id: "active",
    label: "Total Active Member",
    value: "98",
    icon: <ActiveMemberIcon />,
  },
  {
    id: "inactive",
    label: "Total Inactive Member",
    value: "11",
    icon: <InActiveMemberIcon />,
  },
  {
    id: "pending",
    label: "Pending Invites",
    value: "14",
    icon: <PendingMemberIcon />,
  },
  {
    id: "avg",
    label: "Average Participation",
    value: "93%",
    icon: <AverageParticipationIcon />,
  },
];

const toneStyles: Record<SummaryTone, string> = {
  emerald: "text-emerald-600",
  red: "text-red-500",
  amber: "text-amber-500",
  blue: "text-sky-600",
  neutral: "text-slate-600",
};

export function MembersSummaryPanel({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "h-fit rounded-[8px] border border-[#E4E7EC] p-3.5",
        className,
      )}
    >
      <div className="space-y-3">
        {SUMMARY_ITEMS.map((item) => (
          <Card
            key={item.id}
            className="rounded-[8px] border border-[#E4E7EC] p-4 shadow-none"
          >
            <div className="flex items-center gap-3">
              <IconWrapper size="lg" className="!rounded-full">
                <span className={cn("inline-flex")}>{item.icon}</span>
              </IconWrapper>

              <div>
                <p className="text-[11px] font-[500] text-[10px] text-[#9CA3AF]">
                  {item.label}
                </p>
                <p className="mt-1 text-[20px] leading-8 font-[400] text-[#1F2933]">
                  {item.value}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}
