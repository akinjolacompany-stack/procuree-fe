import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { IconWrapper } from "./iconwrapper";

type CardVariant = "default" | "soft" | "outline";
type CardPadding = "none" | "sm" | "md" | "lg";

const cardVariantStyles: Record<CardVariant, string> = {
  default: " bg-white ",
  soft: "border border-emerald-100 bg-emerald-50/60",
  outline: "border border-slate-300 bg-transparent",
};

const cardPaddingStyles: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
  padding?: CardPadding;
};

export function Card({ className, variant = "default", padding = "md", ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl text-slate-900",
        cardVariantStyles[variant],
        cardPaddingStyles[padding],
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5", className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-base font-semibold leading-tight text-slate-900", className)} {...props} />;
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-slate-500", className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />;
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center", className)} {...props} />;
}

export type StatCardProps = {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
  helperText?: ReactNode;
  className?: string;
  variant?: CardVariant;
};

export function StatCard({
  label,
  value,
  icon,
  helperText,
  className,
  variant = "default",
}: StatCardProps) {
  return (
    <Card variant={variant} className={cn("min-h-[96px]", className)}>
      <CardContent className="flex items-center gap-3">
        {icon ? (
          <IconWrapper size="md" tone="neutral">
            {icon}
          </IconWrapper>
        ) : null}
        <div className="space-y-1">
          <p className="text-xs text-slate-500">{label}</p>
          <p className="text-2xl font-semibold leading-none text-slate-900">{value}</p>
          {helperText ? <p className="text-xs text-slate-500">{helperText}</p> : null}
        </div>
      </CardContent>
    </Card>
  );
}
