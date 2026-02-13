"use client";

import Link from "next/link";
import { Form, Formik, type FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as yup from "yup";
import { OnBoardingHeader } from "@/components/onboarding/header";
import { Button } from "@/components/ui/button";
import { FormikInput } from "@/components/ui/input";
import { ProcureeLogo } from "@/components/icons/procuree-logo";

type SignInFormValues = {
  email: string;
  password: string;
};

const initialValues: SignInFormValues = {
  email: "",
  password: "",
};

const signInValidationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(
    _values: SignInFormValues,
    { setSubmitting }: FormikHelpers<SignInFormValues>
  ) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSubmitting(false);
    router.push("/dashboard");
  }

  return (
    <section className="mx-auto flex min-h-screen w-full items-center px-6 py-10">
      <div className="w-full space-y-8">

        <ProcureeLogo className="h-[80px]"/>
        <OnBoardingHeader
          // icon="/procureeIcon.svg"
          title="Welcome Back"
          subtitle="Enter your email and password to Login"
        />

        <Formik
          initialValues={initialValues}
          validationSchema={signInValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <FormikInput
                name="email"
                label="Email Address"
                type="email"
                placeholder="enter email address"
                autoComplete="email"
              />

              <div className="space-y-2">
                <FormikInput
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="**********"
                  autoComplete="current-password"
                  suffix={
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="inline-flex items-center justify-center text-slate-500 transition-colors hover:text-slate-700"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                    </button>
                  }
                />

                <div className="flex justify-end">
                  <Link href="#" className="text-xs font-semibold uppercase text-sky-600">
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>

              <p className="text-center text-sm text-slate-400">
                Don&apos;t have an account?{" "}
                <Link
                  href="/onboarding/started"
                  className="font-semibold uppercase text-sky-600 hover:underline"
                >
                  Sign Up Here
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </section>
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

