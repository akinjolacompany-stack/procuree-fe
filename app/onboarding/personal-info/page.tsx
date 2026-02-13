"use client";

import { Form, Formik, type FormikHelpers } from "formik";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { OnBoardingHeader } from "@/components/onboarding/header";
import { Button } from "@/components/ui/button";
import { FormikInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type PersonalInfoFormValues = {
  fullName: string;
  phoneNumber: string;
  contactAddress: string;
  profilePicture: File | null;
};

const initialValues: PersonalInfoFormValues = {
  fullName: "",
  phoneNumber: "",
  contactAddress: "",
  profilePicture: null,
};

const personalInfoValidationSchema = yup.object({
  fullName: yup.string().trim().required("Full name is required"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .test("phone-format", "Enter a valid phone number", (value) => {
      const digits = (value ?? "").replace(/\D/g, "");
      return digits.length >= 7 && digits.length <= 11;
    }),
  contactAddress: yup.string().trim().required("Contact address is required"),
  profilePicture: yup
    .mixed<File>()
    .nullable()
    .required("Please upload your picture")
    .test("file-type", "Only JPEG and PNG files are allowed", (value) => {
      if (!value) {
        return true;
      }

      return ["image/jpeg", "image/png"].includes(value.type);
    }),
});

export default function PersonalInfoPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function handleSubmit(
    _values: PersonalInfoFormValues,
    { setSubmitting }: FormikHelpers<PersonalInfoFormValues>
  ) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    setSubmitting(false);
    router.push("/onboarding/business-info");
  }

  return (
    <div className="space-y-8 py-[20px]">
      <OnBoardingHeader
        icon="/personalInfo.svg"
        title="Tell us about yourself"
        subtitle="We need a few details to personalize your experience and set up your admin profile."
      />

      <Formik
        initialValues={initialValues}
        validationSchema={personalInfoValidationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          setFieldTouched,
          setFieldValue,
        }) => {
          const pictureError =
            touched.profilePicture && typeof errors.profilePicture === "string"
              ? errors.profilePicture
              : undefined;

          const assignSelectedFile = (file: File | null) => {
            setFieldValue("profilePicture", file);
            setFieldTouched("profilePicture", true);
          };

          return (
            <Form className="space-y-4">
              <FormikInput
                name="fullName"
                label="Full name"
                placeholder="enter full name"
                autoComplete="name"
              />

              <FormikInput
                name="phoneNumber"
                label="Phone Number"
                placeholder="8123456789"
                autoComplete="tel-national"
                prefix={<PhonePrefix />}
                onChange={(event) => {
                  const nextValue = event.target.value.replace(/\D/g, "");
                  setFieldValue("phoneNumber", nextValue);
                }}
              />

              <FormikInput
                name="contactAddress"
                label="Contact Address"
                placeholder="enter contact Address"
                autoComplete="street-address"
              />

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-600">
                  Provide your Picture
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0] ?? null;
                    assignSelectedFile(file);
                  }}
                />

                <div
                  className={cn(
                    "space-y-3 rounded-lg border border-dashed border-slate-300 p-6 flex flex-col justify-center text-center",
                    pictureError && "border-red-500"
                  )}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    const file = event.dataTransfer.files?.[0] ?? null;
                    assignSelectedFile(file);
                  }}
                >
                    <div className="w-[28px] h-[28px] flex justify-center items-center rounded-[8px] self-center bg-[#E5E7EB]">
                  <UploadCloudIcon />

                    </div>
                  <p className="text-xs text-slate-500">
                    Drag and drop your image here, or click to select files
                  </p>

                  <Button
                    type="button"
                    size="xs"
                    variant="outline"
                    color="slate"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Select Files
                  </Button>

                  <p className="text-[10px] text-slate-400">
                    Supported files are JPEG and PNG
                  </p>

                  {values.profilePicture ? (
                    <p className="text-xs font-medium text-emerald-700">
                      Selected: {values.profilePicture.name}
                    </p>
                  ) : null}
                </div>

                {pictureError ? (
                  <p className="text-xs text-red-600">{pictureError}</p>
                ) : null}
              </div>

              <div className="pt-7">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting
                    ? "Processing..."
                    : "Next : Business Information"}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

function PhonePrefix() {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-slate-600">
      <span className="inline-flex h-5 w-5 overflow-hidden rounded-full border border-slate-300">
        <span className="w-1/3 bg-emerald-600" />
        <span className="w-1/3 bg-white" />
        <span className="w-1/3 bg-emerald-600" />
      </span>
      +234
    </span>
  );
}

function UploadCloudIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 10V10.8C14 11.9201 14 12.4802 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.4802 14 11.9201 14 10.8 14H5.2C4.07989 14 3.51984 14 3.09202 13.782C2.71569 13.5903 2.40973 13.2843 2.21799 12.908C2 12.4802 2 11.9201 2 10.8V10M11.3333 5.33333L8 2M8 2L4.66667 5.33333M8 2V10" stroke="#1F2933" stroke-width="0.666667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  );
}

