"use client";

import { Form, Formik, type FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { OnBoardingHeader } from "@/components/onboarding/header";
import { Button } from "@/components/ui/button";
import { FormikInput } from "@/components/ui/input";
import { FormikImageUploadInput } from "@/components/ui/image-upload-input";
import PhonePrefix from "@/components/ui/phonePrefix";

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
          isSubmitting,
          setFieldValue,
        }) => {
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

              <FormikImageUploadInput
                name="profilePicture"
                label="Provide your Picture"
                accept=".jpg,.jpeg,.png,image/jpeg,image/png"
              />

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
