import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/utils";
import { DashboardNavIcon } from "@/components/icons/dashboard-nav-icon";
import { ItemsNavIcon } from "@/components/icons/items-nav-icon";
import { MarketRunNavIcon } from "@/components/icons/market-run-nav-icon";
import { MembersNavIcon } from "@/components/icons/members-nav-icon";

type HeaderNavIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type AppHeaderNavItemConfig = {
  href: string;
  label: string;
  icon: HeaderNavIcon;
};

export const APP_HEADER_NAV_ITEMS: AppHeaderNavItemConfig[] = [
  { href: "/dashboard", label: "Dashboard", icon: DashboardNavIcon },
  { href: "/market-run", label: "Market Run", icon: MarketRunNavIcon },
  { href: "/items", label: "Items", icon: ItemsNavIcon },
  { href: "/members", label: "Members", icon: MembersNavIcon },
];

type AppHeaderNavProps = {
  activePath: string;
  items?: AppHeaderNavItemConfig[];
};

export function AppHeaderNav({
  activePath,
  items = APP_HEADER_NAV_ITEMS,
}: AppHeaderNavProps) {
  return (
    <nav
      aria-label="Primary navigation"
      className="flex items-center gap-1 rounded-[8px]  p-1"
    >
      {items.map((item) => (
        <AppHeaderNavItem
          key={item.href}
          href={item.href}
          label={item.label}
          icon={item.icon}
          isActive={isRouteActive(activePath, item.href)}
        />
      ))}
    </nav>
  );
}

type AppHeaderNavItemProps = AppHeaderNavItemConfig & {
  isActive: boolean;
};

export function AppHeaderNavItem({
  href,
  label,
  icon: Icon,
  isActive,
}: AppHeaderNavItemProps) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex items-center gap-2 rounded-[6px] px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-white hover:text-slate-900",
        isActive && "bg-[#E9F4EE] border-b-[1px] border-b-[#2E7DAF] rounded-[8px]  font-[700] text-slate-900",
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>{label}</span>
    </Link>
  );
}

function isRouteActive(activePath: string, href: string): boolean {
  if (activePath === href) {
    return true;
  }

  if (href === "/dashboard") {
    return false;
  }

  return activePath.startsWith(`${href}/`);
}
