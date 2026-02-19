"use client";

import { forwardRef } from "react";
import { useField } from "formik";
import { cn } from "@/lib/utils";

export type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full rounded-lg border border-emerald-100 bg-white px-4 py-3 text-sm text-emerald-950 placeholder:text-emerald-300 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200",
          className
        )}
        {...props}
      />
    );
  }
);

TextArea.displayName = "TextArea";

type FormikTextAreaProps = Omit<TextAreaProps, "name"> & {
  name: string;
  label?: string;
  helperText?: string;
};

export function FormikTextArea({
  name,
  label,
  helperText,
  className,
  id,
  ...props
}: FormikTextAreaProps) {
  const [field, meta] = useField(name);
  const inputId = id ?? name;
  const showError = Boolean(meta.touched && meta.error);

  return (
    <div className="space-y-1.5">
      {label ? (
        <label htmlFor={inputId} className="text-sm font-medium text-slate-600">
          {label}
        </label>
      ) : null}
      <TextArea
        id={inputId}
        className={cn(
          "border-slate-300 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-400 focus:ring-slate-200",
          showError && "border-red-500 focus:border-red-500 focus:ring-red-100",
          className
        )}
        aria-invalid={showError}
        {...field}
        {...props}
      />
      {showError ? (
        <p className="text-xs text-red-600">{meta.error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
}
