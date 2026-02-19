import { cn } from "@/lib/utils";
import { CautionIcon } from "../icons/caution";

type StatusTone = "reconciled" | "closed" | "open";

const STATUS_STYLES: Record<
  StatusTone,
  { label: string; badgeClassName: string; dotClassName: string }
> = {
  reconciled: {
    label: "Reconciled",
    badgeClassName: "bg-sky-100 text-sky-700",
    dotClassName: "bg-sky-600",
  },
  closed: {
    label: "Closed",
    badgeClassName: "bg-rose-100 text-rose-700",
    dotClassName: "bg-rose-600",
  },
  open: {
    label: "Open",
    badgeClassName: "bg-emerald-100 text-emerald-700",
    dotClassName: "bg-emerald-600",
  },
};

function resolveStatusTone(text: string): StatusTone | null {
  const normalized = text.trim().toLowerCase();
  if (
    normalized === "reconciled" ||
    normalized === "closed" ||
    normalized === "open"
  ) {
    return normalized;
  }
  return null;
}

export default function StatusHambuger({
  className,
  text = "Reconciled",
}: {
  className?: string;
  text?: string;
}) {
  const statusTone = resolveStatusTone(text);
  const styles = statusTone ? STATUS_STYLES[statusTone] : null;
  const trimmedText = text.trim();
  const displayText = styles?.label ?? (trimmedText.length > 0 ? trimmedText : "Status");

  return (
    <div className={cn("mt-3 flex items-center justify-end gap-2", className)}>
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
          styles?.badgeClassName ?? "bg-slate-100 text-slate-700",
        )}
      >
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            styles?.dotClassName ?? "bg-slate-600",
          )}
          aria-hidden="true"
        />
        {displayText}
      </span>
      <CautionIcon/>
    </div>
  );
}
