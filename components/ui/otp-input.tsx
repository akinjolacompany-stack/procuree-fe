"use client";

import { useMemo, useRef } from "react";
import type { KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  length?: number;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
  autoFocus?: boolean;
};

export function OtpInput({
  value,
  onChange,
  onBlur,
  length = 6,
  className,
  inputClassName,
  disabled = false,
  autoFocus = false,
}: OtpInputProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const normalizedValue = normalizeOtp(value, length);

  const digits = useMemo(
    () => toOtpArray(normalizedValue, length),
    [normalizedValue, length]
  );

  function focusInput(index: number) {
    if (index < 0 || index > length - 1) {
      return;
    }

    inputRefs.current[index]?.focus();
  }

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {digits.map((digit, index) => (
        <input
          key={`otp-${index}`}
          ref={(node) => {
            inputRefs.current[index] = node;
          }}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          autoComplete="one-time-code"
          autoFocus={autoFocus && index === 0}
          disabled={disabled}
          value={digit}
          className={cn(
            "h-[60px] w-[60px] w-12 rounded-lg border border-slate-300 text-center text-2xl font-medium text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400",
            inputClassName
          )}
          onChange={(event) => {
            const raw = event.target.value.replace(/\D/g, "");

            if (!raw) {
              onChange(replaceDigit(normalizedValue, index, "", length));
              return;
            }

            if (raw.length === 1) {
              onChange(replaceDigit(normalizedValue, index, raw, length));
              focusInput(index + 1);
              return;
            }

            const merged = mergeOtpFromIndex(normalizedValue, index, raw, length);
            onChange(merged);
            focusInput(Math.min(index + raw.length, length - 1));
          }}
          onKeyDown={(event) => {
            handleArrowNavigation(event, index, focusInput);

            if (event.key !== "Backspace") {
              return;
            }

            if (digits[index]) {
              event.preventDefault();
              onChange(replaceDigit(normalizedValue, index, "", length));
              return;
            }

            if (index > 0) {
              event.preventDefault();
              onChange(replaceDigit(normalizedValue, index - 1, "", length));
              focusInput(index - 1);
            }
          }}
          onPaste={(event) => {
            const pastedDigits = normalizeOtp(
              event.clipboardData.getData("text"),
              length
            );

            if (!pastedDigits) {
              return;
            }

            event.preventDefault();
            const merged = mergeOtpFromIndex(
              normalizedValue,
              index,
              pastedDigits,
              length
            );
            onChange(merged);
            focusInput(Math.min(index + pastedDigits.length, length - 1));
          }}
          onBlur={onBlur}
        />
      ))}
    </div>
  );
}

function handleArrowNavigation(
  event: KeyboardEvent<HTMLInputElement>,
  index: number,
  focusInput: (index: number) => void
) {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    focusInput(index - 1);
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    focusInput(index + 1);
  }
}

function normalizeOtp(value: string, length: number) {
  return value.replace(/\D/g, "").slice(0, length);
}

function toOtpArray(code: string, length: number) {
  const digits = normalizeOtp(code, length);
  return Array.from({ length }, (_, index) => digits[index] ?? "");
}

function replaceDigit(code: string, index: number, value: string, length: number) {
  const digits = toOtpArray(code, length);
  digits[index] = value;
  return normalizeOtp(digits.join(""), length);
}

function mergeOtpFromIndex(
  code: string,
  startIndex: number,
  incoming: string,
  length: number
) {
  const digits = toOtpArray(code, length);
  const newDigits = normalizeOtp(incoming, length);

  newDigits.split("").forEach((digit, offset) => {
    const index = startIndex + offset;
    if (index <= length - 1) {
      digits[index] = digit;
    }
  });

  return normalizeOtp(digits.join(""), length);
}
