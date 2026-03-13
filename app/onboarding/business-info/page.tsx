"use client";

import { Form, Formik, type FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { useMemo } from "react";
import { OnBoardingHeader } from "@/components/onboarding/header";
import { Button } from "@/components/ui/button";
import { FormikInput } from "@/components/ui/input";
import { useCreateAdminUserMutation } from "@/lib/api/users";
import { getApiErrorMessage } from "@/lib/api";
import { useOnboardingFlowStore } from "@/store";

type BusinessInfoFormValues = {
  businessName: string;
  businessDescription: string;
};

const businessInfoValidationSchema = yup.object({
  businessName: yup
    .string()
    .trim()
    .min(2, "Business name must be at least 2 characters")
    .required("Business name is required"),
  businessDescription: yup
    .string()
    .trim()
    .min(2, "Business description must be at least 2 characters")
    .required("Business description is required"),
});

export default function BusinessInfoPage() {
  const router = useRouter();
  const createAdminUserMutation = useCreateAdminUserMutation();
  const { onboardingDraft, setOnboardingDraft } = useOnboardingFlowStore();
  const initialValues = useMemo<BusinessInfoFormValues>(
    () => ({
      businessName: onboardingDraft.businessName,
      businessDescription: onboardingDraft.businessDescription,
    }),
    [onboardingDraft.businessDescription, onboardingDraft.businessName],
  );

  async function handleSubmit(
    values: BusinessInfoFormValues,
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<BusinessInfoFormValues>,
  ) {
    setStatus(undefined);

    const normalizedFullName = onboardingDraft.fullName.trim();
    const [firstName = "", ...lastNameParts] = normalizedFullName.split(/\s+/);
    const lastName = lastNameParts.join(" ").trim();

    if (
      !onboardingDraft.email.trim() ||
      !onboardingDraft.password.trim() ||
      !onboardingDraft.confirmPassword.trim() ||
      !onboardingDraft.phoneNumber.trim() ||
      !firstName ||
      !lastName
    ) {
      setStatus(
        "Some onboarding data is missing. Please complete previous steps before continuing.",
      );
      setSubmitting(false);
      return;
    }

    setOnboardingDraft({
      businessName: values.businessName.trim(),
      businessDescription: values.businessDescription.trim(),
    });

    try {
      await createAdminUserMutation.mutateAsync({
        email: onboardingDraft.email.trim(),
        password: onboardingDraft.password,
        confirmPassword: onboardingDraft.confirmPassword,
        firstName,
        lastName,
        phone: onboardingDraft.phoneNumber.trim(),
        groupName: values.businessName.trim(),
        groupDescription: values.businessDescription.trim(),
        // contactAddress: onboardingDraft.contactAddress,
        // profilePicture: onboardingDraft.profilePicture,
      });

      router.push("/onboarding/invite-members");
    } catch (error) {
      setStatus(getApiErrorMessage(error, "Unable to create business."));
    } finally {
      setSubmitting(false);
    }
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
        enableReinitialize
      >
        {({ values, isSubmitting, status }) => (
          <Form className="space-y-8">
            <FormikInput
              name="businessName"
              label="Business Name"
              placeholder="enter name"
              autoComplete="organization"
            />
            <FormikInput
              name="businessDescription"
              label="Business Description"
              placeholder="enter business description"
            />

            {typeof status === "string" ? (
              <p className="text-sm text-red-600">{status}</p>
            ) : null}

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                color="slate"
                onClick={() => {
                  setOnboardingDraft({
                    businessName: values.businessName.trim(),
                    businessDescription: values.businessDescription.trim(),
                  });
                  router.push("/onboarding/personal-info");
                }}
              >
                Back: Personal Information
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Create Business"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
