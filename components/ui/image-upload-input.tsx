"use client";

import { cn } from "@/lib/utils";
import { useField } from "formik";
import { useEffect, useMemo, useRef } from "react";
import { Button } from "./button";
import { ReplaceIcon } from "../icons/icon-replace";

export type ImageUploadInputProps = {
  value: File | null;
  onChange: (file: File | null) => void;
  onBlur?: () => void;
  label?: string;
  accept?: string;
  error?: string;
  className?: string;
  dragDropText?: string;
  supportText?: string;
  replaceLabel?: string;
};

export function ImageUploadInput({
  value,
  onChange,
  onBlur,
  label,
  accept = ".jpg,.jpeg,.png,image/jpeg,image/png",
  error,
  className,
  dragDropText = "Drag and drop your image here, or click to select files",
  supportText = "Supported files are JPEG and PNG",
  replaceLabel = "Replace Photo",
}: ImageUploadInputProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const hasError = Boolean(error);

  const previewUrl = useMemo(() => {
    if (!value) {
      return null;
    }
    return URL.createObjectURL(value);
  }, [value]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const assignFile = (file: File | null) => {
    onChange(file);
    onBlur?.();
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      {label ? (
        <label className="text-sm font-medium text-slate-600">{label}</label>
      ) : null}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(event) => {
          const selectedFile = event.currentTarget.files?.[0] ?? null;
          assignFile(selectedFile);
        }}
      />
      <div
        className={cn(
          "rounded-[8px]  px-4 py-5 rounded-[8px] border border-dashed border-gray-300",
          hasError && "border-red-500",
        )}
        style={{
          borderWidth: "1px",
          borderStyle: "dashed",
         
        }}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          const droppedFile = event.dataTransfer.files?.[0] ?? null;
          assignFile(droppedFile);
        }}
      >
        {value && previewUrl ? (
          <div className="flex flex-col items-center gap-2">
            <img
              src={previewUrl}
              alt="Selected preview"
              className="h-[44px] w-[74px] rounded-[2px] object-cover"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1 text-[11px] font-[400] text-[#DC2626] transition-colors hover:text-red-500"
            >
              <ReplaceIcon  />
              <span>{replaceLabel}</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-[8px] bg-[#E5E7EB]">
              <UploadCloudIcon className="h-4 w-4" />
            </span>

            <p className="text-[9px] font-[400] text-[#9CA3AF]">{dragDropText}</p>

            <Button
              type="button"
              size="xs"
              variant="outline"
              color="slate"
              onClick={() => fileInputRef.current?.click()}
              className="h-6 rounded-[4px] px-2 text-[10px] font-medium"
            >
              Select Files
            </Button>

            <p className="text-[9px] font-[400] text-[#9CA3AF]">{supportText}</p>
          </div>
        )}
      </div>
      {hasError ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

type FormikImageUploadInputProps = Omit<
  ImageUploadInputProps,
  "value" | "onChange" | "onBlur" | "error"
> & {
  name: string;
};

export function FormikImageUploadInput({
  name,
  ...props
}: FormikImageUploadInputProps) {
  const [field, meta, helpers] = useField<File | null>(name);
  const showError = Boolean(meta.touched && meta.error);

  return (
    <ImageUploadInput
      {...props}
      value={field.value ?? null}
      onChange={(file) => {
        helpers.setValue(file);
        helpers.setTouched(true);
      }}
      onBlur={() => helpers.setTouched(true)}
      error={showError ? String(meta.error) : undefined}
    />
  );
}

function UploadCloudIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-4 w-4", className)}
      aria-hidden="true"
    >
      <path
        d="M14 10V10.8C14 11.9201 14 12.4802 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.4802 14 11.9201 14 10.8 14H5.2C4.07989 14 3.51984 14 3.09202 13.782C2.71569 13.5903 2.40973 13.2843 2.21799 12.908C2 12.4802 2 11.9201 2 10.8V10M11.3333 5.33333L8 2M8 2L4.66667 5.33333M8 2V10"
        stroke="currentColor"
        strokeWidth="0.666667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
