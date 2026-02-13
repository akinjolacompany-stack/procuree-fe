"use client";

import { Form, Formik, type FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { OnBoardingHeader } from "@/components/onboarding/header";
import { Button } from "@/components/ui/button";
import { FormikInput } from "@/components/ui/input";

type BusinessInfoFormValues = {
  businessName: string;
};

const initialValues: BusinessInfoFormValues = {
  businessName: "",
};

const businessInfoValidationSchema = yup.object({
  businessName: yup
    .string()
    .trim()
    .min(2, "Business name must be at least 2 characters")
    .required("Business name is required"),
});

export default function BusinessInfoPage() {
  const router = useRouter();

  async function handleSubmit(
    _values: BusinessInfoFormValues,
    { setSubmitting }: FormikHelpers<BusinessInfoFormValues>,
  ) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    setSubmitting(false);
    router.push("/onboarding/invite-members");
  }

  return (
    <div className="space-y-8 py-[20px] flex flex-col justify-center h-full">
      <OnBoardingHeader
        icon="/business-name.svg"
        title="Tell us about your business"
        subtitle="Give your group a name that members will recognize. This helps them know which market runs they are joining."
      />

      <Formik
        initialValues={initialValues}
        validationSchema={businessInfoValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-8">
            <FormikInput
              name="businessName"
              label="Business Name"
              placeholder="enter name"
              autoComplete="organization"
            />

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                color="slate"
                onClick={() => router.push("/onboarding/personal-info")}
              >
                Back: Personal Information
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Next: Invite Members"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
