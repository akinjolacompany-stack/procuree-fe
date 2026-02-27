"use client";

import { Form, Formik, type FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as yup from "yup";
import { OnBoardingHeader } from "@/components/onboarding/header";
import { Button } from "@/components/ui/button";
import { FormikInput } from "@/components/ui/input";
import PhonePrefix from "@/components/ui/phonePrefix";

type InviteMembersFormValues = {
  phoneNumber: string;
};

const initialValues: InviteMembersFormValues = {
  phoneNumber: "",
};

const inviteMembersValidationSchema = yup.object({
  phoneNumber: yup
    .string()
    .test("phone-format", "Enter a valid phone number", (value) => {
      if (!value) {
        return true;
      }

      const digits = value.replace(/\D/g, "");
      return digits.length >= 7 && digits.length <= 11;
    }),
});

function normalizePhoneNumber(value: string): string {
  return value.replace(/\D/g, "").slice(0, 11);
}

function isValidPhoneNumber(value: string): boolean {
  return value.length >= 7 && value.length <= 11;
}

export default function InviteMembersPage() {
  const router = useRouter();
  const [invitedMembers, setInvitedMembers] = useState<string[]>([]);

  async function handleSubmit(
    values: InviteMembersFormValues,
    {
      setSubmitting,
      setFieldError,
      setFieldValue,
    }: FormikHelpers<InviteMembersFormValues>,
  ) {
    const pendingPhoneNumber = normalizePhoneNumber(values.phoneNumber);
    const nextMembers = [...invitedMembers];

    if (pendingPhoneNumber) {
      if (!isValidPhoneNumber(pendingPhoneNumber)) {
        setFieldError("phoneNumber", "Enter a valid phone number");
        setSubmitting(false);
        return;
      }

      if (!nextMembers.includes(pendingPhoneNumber)) {
        nextMembers.push(pendingPhoneNumber);
      }
      setInvitedMembers(nextMembers);
      setFieldValue("phoneNumber", "");
    }

    if (!nextMembers.length) {
      setFieldError(
        "phoneNumber",
        "Add at least one number or skip invitation.",
      );
      setSubmitting(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 400));
    setSubmitting(false);
    router.push("/onboarding/final");
  }

  return (
    <div className="space-y-8 py-[20px] flex flex-col justify-center h-full">
      <div className="flex items-start justify-between gap-4 pb-[20px]">
        <OnBoardingHeader
          icon="/invite-member.svg"
          title="Almost there!"
          subtitle="Want to invite members now, or start setting up your commodities first? You can always invite people later."
          shouldSkipInvitation={true}
        />
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={inviteMembersValidationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          isSubmitting,
          setFieldError,
          setFieldTouched,
          setFieldValue,
        }) => {
          const handleAddMember = () => {
            const phoneNumber = normalizePhoneNumber(values.phoneNumber);

            if (!isValidPhoneNumber(phoneNumber)) {
              setFieldTouched("phoneNumber", true, false);
              setFieldError("phoneNumber", "Enter a valid phone number");
              return;
            }

            if (invitedMembers.includes(phoneNumber)) {
              setFieldError(
                "phoneNumber",
                "This number has already been added",
              );
              return;
            }

            setInvitedMembers((currentMembers) => [
              ...currentMembers,
              phoneNumber,
            ]);
            setFieldValue("phoneNumber", "");
          };

          return (
            <Form className="flex flex-col gap-[80px]">
              <div className="space-y-4">
                <FormikInput
                  name="phoneNumber"
                  label="Enter WhatsApp Number"
                  placeholder="enter number"
                  autoComplete="tel-national"
                  prefix={<PhonePrefix />}
                  onChange={(event) => {
                    setFieldValue(
                      "phoneNumber",
                      normalizePhoneNumber(event.target.value),
                    );
                  }}
                  suffix_1={
                    <Button
                      type="button"
                      color="blue"
                      size="xs"
                      className="h-[40px] rounded-[6px] px-4"
                      onClick={handleAddMember}
                    >
                      Add
                    </Button>
                  }
                />

                {invitedMembers.length ? (
                  <div className="flex flex-wrap gap-2">
                    {invitedMembers.map((member) => (
                      <span
                        key={member}
                        className="inline-flex items-center rounded-full bg-[#EEF4FF] px-3 py-1 text-xs font-medium text-[#1D4ED8]"
                      >
                        +234 {member}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  color="slate"
                  onClick={() => router.push("/onboarding/business-info")}
                >
                  Back: Business Information
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Invite Members"}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
