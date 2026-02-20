"use client";

import { CautionIcon } from "@/components/icons/caution";
import { MembersNavIcon } from "@/components/icons/members-nav-icon";
import { Card } from "@/components/ui/card";
import { IconWrapper } from "@/components/ui/iconwrapper";
import { cn } from "@/lib/utils";

type SummaryTone = "emerald" | "red" | "amber" | "blue" | "neutral";

type SummaryItem = {
  id: string;
  label: string;
  value: string;
  tone: SummaryTone;
};

const SUMMARY_ITEMS: SummaryItem[] = [
  { id: "total", label: "Total Member", value: "121", tone: "emerald" },
  { id: "active", label: "Total Active Member", value: "98", tone: "emerald" },
  { id: "inactive", label: "Total Inactive Member", value: "11", tone: "red" },
  { id: "pending", label: "Pending Invites", value: "14", tone: "amber" },
  { id: "avg", label: "Average Participation", value: "93%", tone: "blue" },
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
              <IconWrapper size="lg" tone="neutral" className="!rounded-full">
                <span className={cn("inline-flex", toneStyles[item.tone])}>
                  {item.tone === "amber" ? (
                    <CautionIcon className="h-4 w-4" />
                  ) : (
                    <MembersNavIcon className="h-4 w-4" />
                  )}
                </span>
              </IconWrapper>

              <div>
                <p className="text-[11px] font-medium text-[#98A2B3]">
                  {item.label}
                </p>
                <p className="mt-1 text-[31px] leading-8 font-[500] text-[#1F2933]">
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
