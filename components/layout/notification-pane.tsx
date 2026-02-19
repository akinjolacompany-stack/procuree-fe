import { cn } from "@/lib/utils";
import { CautionIcon } from "../icons/caution";
import { Button } from "../ui/button";
import { CancelIcon } from "../icons/cancelIcon";

type NotificationPaneProps = {
  className?: string;
};

type NotificationItem = {
  id: string;
  name: string;
  message: string;
  meta: string;
  unread?: boolean;
  avatarTone: "rose" | "amber" | "sky" | "green" | "purple";
  actions?: Array<"decline" | "accept">;
};

const NOTIFICATION_ITEMS: NotificationItem[] = [
  {
    id: "n-1",
    name: "Tinuka Cole",
    message: "wants to join your group.",
    meta: "4 mins ago - 12 Market Runs",
    unread: true,
    avatarTone: "rose",
    actions: ["decline", "accept"],
  },
  {
    id: "n-2",
    name: "Adejayo Solami",
    message: "requested for Rice and 5 other items.",
    meta: "17 mins ago - 12 Market Runs",
    unread: true,
    avatarTone: "amber",
  },
  {
    id: "n-3",
    name: "Samuel Daniel",
    message: "requested for Rice and 5 other items.",
    meta: "1 hour ago - 12 Market Runs",
    unread: true,
    avatarTone: "sky",
  },
  {
    id: "n-4",
    name: "Puttar Phillips",
    message: "wants to join your group.",
    meta: "2 hours ago - 12 Market Runs",
    unread: false,
    avatarTone: "amber",
    actions: ["decline", "accept"],
  },
  {
    id: "n-5",
    name: "Samuel Banks",
    message: "requested for Beans and 2 other items.",
    meta: "4 hours ago - 12 Market Runs",
    unread: false,
    avatarTone: "purple",
  },
  {
    id: "n-6",
    name: "Jackie Keekee",
    message: "requested for Beans and 1 other item.",
    meta: "5 days ago - 12 Market Runs",
    unread: false,
    avatarTone: "green",
  },
  {
    id: "n-7",
    name: "You published",
    message: "Dry market runs.",
    meta: "1 week ago - 12 Market Runs",
    unread: false,
    avatarTone: "green",
  },
];

const avatarToneStyles: Record<NotificationItem["avatarTone"], string> = {
  rose: "bg-rose-100 text-rose-600",
  amber: "bg-amber-100 text-amber-700",
  sky: "bg-sky-100 text-sky-700",
  green: "bg-emerald-100 text-emerald-700",
  purple: "bg-violet-100 text-violet-700",
};

export function NotificationPane({ className }: NotificationPaneProps) {
  return (
    <div
      className={cn(
        "z-[99999] w-[360px] rounded-[6px] border border-slate-200 bg-white shadow-[0_24px_48px_-24px_rgba(15,23,42,0.7)]",
        className,
      )}
    >
      <div className="border-b border-slate-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <p className="text-[16px] font-[500] text-[#1F2933]">Notification</p>
          <CancelIcon className="" />
        </div>
      </div>

      <div className="border-b border-slate-200 bg-[#ECF3EF] px-4 py-2">
        <div className="flex items-center gap-5 text-[10px] font-semibold uppercase tracking-wide">
          <span className="text-[#1F2933]">Inbox</span>
          <span className="text-[#9CA3AF]">System</span>
        </div>
      </div>

      <ul className="max-h-[420px] overflow-y-auto">
        {NOTIFICATION_ITEMS.map((item) => (
          <li
            key={item.id}
            className="flex items-start gap-3 border-b border-[#E5E7EB] px-4 py-3 last:border-b-0"
          >
            <span
              aria-hidden="true"
              className={cn(
                "mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold",
                avatarToneStyles[item.avatarTone],
              )}
            >
              {item.name.charAt(0)}
            </span>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] leading-4 font-[500] text-[#1F2933]">
                <span className="">{item.name}</span> {item.message}
              </p>
              <p className="mt-[8px] text-[11px] text-slate-400">{item.meta}</p>

              {item.actions?.length ? (
                <div className="mt-2 flex items-center gap-2">
                  {item.actions.includes("decline") ? (
                    <Button
                      className="!font-[200]"
                      size={"xs"}
                      color="red"
                      type="button"
                    >
                      Decline
                    </Button>
                  ) : null}
                  {item.actions.includes("accept") ? (
                    <Button className="!font-[200]" type="button" size={"xs"}>
                      Accept
                    </Button>
                  ) : null}
                </div>
              ) : null}
            </div>

            {item.unread ? (
              <span
                className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#2563EB]"
                aria-hidden="true"
              />
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
