"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export type IconButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "aria-label"
> & {
  label: string;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ label, className, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        aria-label={label}
        className={cn(
          "inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
          className,
        )}
        {...props}
      />
    );
  },
);

IconButton.displayName = "IconButton";
