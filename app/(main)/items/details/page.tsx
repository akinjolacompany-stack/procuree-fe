"use client";

import { CautionIcon } from "@/components/icons/caution";
import ItemHeader from "@/components/item/item-add-item-header";
import { Button } from "@/components/ui/button";
import { FormikImageUploadInput } from "@/components/ui/image-upload-input";
import { FormikInput, FormikSelect } from "@/components/ui/input";
import { Form, Formik, type FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import * as yup from "yup";

type ItemDetailsFormValues = {
  image: File | null;
  itemName: string;
  category: string;
  baseUnit: string;
};

const initialValues: ItemDetailsFormValues = {
  image: null,
  itemName: "",
  category: "",
  baseUnit: "",
};

const categoryOptions = [
  { label: "Grains", value: "grains" },
  { label: "Oils", value: "oils" },
  { label: "Beverages", value: "beverages" },
  { label: "Cosmetics", value: "cosmetics" },
];

const baseUnitOptions = [
  { label: "Cups", value: "cups" },
  { label: "Bottle", value: "bottle" },
  { label: "Sachet", value: "sachet" },
  { label: "Kg", value: "kg" },
];

const validationSchema = yup.object({
  image: yup
    .mixed<File>()
    .nullable()
    .required("Item image is required")
    .test("file-type", "Only JPEG and PNG files are allowed", (value) => {
      if (!value) {
        return false;
      }
      return ["image/jpeg", "image/png"].includes(value.type);
    }),
  itemName: yup.string().trim().required("Item name is required"),
  category: yup.string().trim().required("Category is required"),
  baseUnit: yup.string().trim().required("Base unit is required"),
});

export default function ItemDetailsPage() {
  const router = useRouter();

  async function handleSubmit(
    _values: ItemDetailsFormValues,
    { setSubmitting }: FormikHelpers<ItemDetailsFormValues>,
  ) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setSubmitting(false);
    router.push("/items/conversions");
  }

  return (
    <div className="mx-auto w-full max-w-[620px]">
      <ItemHeader />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnMount
      >
        {({ isSubmitting, isValid }) => (
          <Form className="mt-4 space-y-3">
            <FormikImageUploadInput
              name="image"
              accept=".jpg,.jpeg,.png,image/jpeg,image/png"
            />

            <FormikInput
              name="itemName"
              label="Item Name"
              placeholder="e.g Rice"
            />

            <FormikSelect
              name="category"
              label="Category"
              options={categoryOptions}
              placeholder="Select Category"
            />

            <FormikSelect
              name="baseUnit"
              label="Base Unit (Smallest unit)"
              options={baseUnitOptions}
              placeholder="Select base unit"
            />

            <div className="flex items-center gap-4 pt-2">
              <Button
                type="button"
                color="slate"
                variant="outline"
                onClick={() => router.push("/items")}
                className="w-full"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Saving..." : "Next : Conversions"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
