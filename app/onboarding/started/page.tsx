"use client";

import { useState } from "react";
import { Form, Formik, type FormikHelpers } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FormikInput } from "@/components/ui/input";
import { OnBoardingHeader } from "@/components/onboarding/header";

type StartedFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const initialValues: StartedFormValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

const startedValidationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

export default function StartedPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleSubmit(
    _values: StartedFormValues,
    { setSubmitting }: FormikHelpers<StartedFormValues>,
  ) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    setSubmitting(false);
    router.push("/onboarding/verify");
  }

  return (
    <div className="space-y-8 flex flex-col justify-center h-full">
      <OnBoardingHeader
        icon="/started.svg"
        title="Let's get you started!"
        subtitle="Enter your email to create your Admin account and start organizing smarter market runs."
      />

      <Formik
        initialValues={initialValues}
        validationSchema={startedValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <FormikInput
              name="email"
              label="Email Address"
              type="email"
              placeholder="johndoe@email.com"
              autoComplete="email"
            />

            <FormikInput
              name="password"
              label="Enter Password"
              type={showPassword ? "text" : "password"}
              placeholder="**********"
              autoComplete="new-password"
              suffix={
                <PasswordVisibilityButton
                  visible={showPassword}
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              }
            />

            <FormikInput
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="**********"
              autoComplete="new-password"
              suffix={
                <PasswordVisibilityButton
                  visible={showConfirmPassword}
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                />
              }
            />

            <div className="pt-12">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Next : Verify Email Address"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

function PasswordVisibilityButton({
  visible,
  onClick,
}: {
  visible: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center text-slate-500 transition-colors hover:text-slate-700"
      aria-label={visible ? "Hide password" : "Show password"}
    >
      {visible ? <EyeIcon /> : <EyeOffIcon />}
    </button>
  );
}

function EyeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M1.5 10s3.2-5 8.5-5 8.5 5 8.5 5-3.2 5-8.5 5-8.5-5-8.5-5Z" />
      <circle cx="10" cy="10" r="2.5" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M1.5 10s3.2-5 8.5-5 8.5 5 8.5 5-3.2 5-8.5 5-8.5-5-8.5-5Z" />
      <circle cx="10" cy="10" r="2.5" />
      <path d="m2 2 16 16" />
    </svg>
  );
}
