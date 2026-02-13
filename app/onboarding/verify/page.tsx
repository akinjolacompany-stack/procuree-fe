"use client";

import { useRouter } from "next/navigation";
import { Form, Formik, type FormikHelpers } from "formik";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { OtpInput } from "@/components/ui/otp-input";
import { OnBoardingHeader } from "@/components/onboarding/header";

type VerifyFormValues = {
  code: string;
};

const CODE_LENGTH = 6;

const initialValues: VerifyFormValues = {
  code: "",
};

const verifyValidationSchema = yup.object({
  code: yup
    .string()
    .required("Verification code is required")
    .matches(/^\d{6}$/, "Enter the 6-digit code"),
});

export default function VerifyPage() {
  const router = useRouter();

  async function handleSubmit(
    _values: VerifyFormValues,
    { setSubmitting }: FormikHelpers<VerifyFormValues>,
  ) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    setSubmitting(false);
    router.push("/onboarding/personal-info");
  }

  return (
    <div className="space-y-[80px] pt-4 flex flex-col justify-center h-full">
      <OnBoardingHeader
        icon="/inbox.svg"
        title="Let's get you started!"
        subtitle="We've sent a 6-digit code to johndoe@email.com to verify your email. This keeps your account secure."
      />

      <Formik
        initialValues={initialValues}
        validationSchema={verifyValidationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
        }) => {
          const normalizedCode = values.code
            .replace(/\D/g, "")
            .slice(0, CODE_LENGTH);
          

          return (
            <Form className="space-y-[80px] ">
              <div className="space-y-3">
                <OtpInput
                  value={normalizedCode}
                  onChange={(nextValue) => setFieldValue("code", nextValue)}
                  onBlur={() => setFieldTouched("code", true)}
                  length={CODE_LENGTH}
                />

              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  color="slate"
                  onClick={() => router.push("/onboarding/started")}
                >
                  Back: Change Email Address
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || normalizedCode.length < CODE_LENGTH}
                >
                  {isSubmitting
                    ? "Processing..."
                    : "Next : Personal Information"}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
