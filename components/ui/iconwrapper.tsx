"use client";

import {
  cloneElement,
  isValidElement,
  type ComponentType,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type IconSize = "xs" | "sm" | "md" | "lg" | "xl";
type IconTone = "neutral" | "soft" | "emerald" | "blue" | "amber" | "danger";
type IconShape = "circle" | "rounded" | "square";

const sizeStyles: Record<IconSize, string> = {
  xs: "h-6 w-6",
  sm: "h-8 w-8",
  md: "h-9 w-9",
  lg: "h-10 w-10",
  xl: "h-12 w-12",
};

const toneStyles: Record<IconTone, string> = {
  neutral: "border border-slate-200 bg-white text-slate-600 fill-white shadow-[inset_0_0_5px_0_rgba(46,125,175,0.25)] drop-shadow-[0_0_11.75px_rgba(0,0,0,0.12)]",
  soft: "border border-slate-100 bg-slate-50 text-slate-600",
  emerald: "border border-emerald-200 bg-emerald-50 text-emerald-700",
  blue: "border border-blue-200 bg-blue-50 text-blue-700",
  amber: "border border-amber-200 bg-amber-50 text-amber-700",
  danger: "border border-red-200 bg-red-50 text-red-700",
};

const shapeStyles: Record<IconShape, string> = {
  circle: "rounded-full",
  rounded: "rounded-[10px]",
  square: "rounded-none",
};

export type IconWrapperProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  size?: IconSize;
  tone?: IconTone;
  shape?: IconShape;
  iconClassName?: string;
};

export function IconWrapper({
  children,
  size = "md",
  tone = "neutral",
  shape = "circle",
  iconClassName,
  className,
  ...props
}: IconWrapperProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center shrink-0",
        sizeStyles[size],
        toneStyles[tone],
        shapeStyles[shape],
        className
      )}
      {...props}
    >
      {renderIconChild(children, iconClassName)}
    </div>
  );
}

type IconProps = Omit<IconWrapperProps, "children"> & {
  icon: ComponentType<{ className?: string }>;
};

export function Icon({ icon: IconComponent, iconClassName, ...props }: IconProps) {
  return (
    <IconWrapper iconClassName={iconClassName} {...props}>
      <IconComponent className={cn("h-4 w-4", iconClassName)} />
    </IconWrapper>
  );
}

function renderIconChild(child: ReactNode, iconClassName?: string): ReactNode {
  if (!isValidElement(child)) {
    return child;
  }

  const element = child as ReactElement<{ className?: string }>;
  return cloneElement(element, {
    className: cn("h-4 w-4", element.props.className, iconClassName),
  });
}
