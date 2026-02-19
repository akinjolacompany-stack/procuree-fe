"use client";

import { CautionIcon } from "@/components/icons/caution";
import { DeleteIcon } from "@/components/icons/delete";
import ItemHeader from "@/components/item/item-add-item-header";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { FormikInput, FormikSelect } from "@/components/ui/input";
import { FieldArray, Form, Formik, type FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import * as yup from "yup";

type ConversionRow = {
  quantity: string;
  unitName: string;
};

type ItemConversionFormValues = {
  conversions: ConversionRow[];
};

const initialValues: ItemConversionFormValues = {
  conversions: [{ quantity: "4", unitName: "" }],
};

const quantityOptions = Array.from({ length: 20 }, (_, index) => {
  const value = String(index + 1);
  return { label: value, value };
});

const validationSchema = yup.object({
  conversions: yup
    .array()
    .of(
      yup.object({
        quantity: yup
          .string()
          .required("Quantity is required")
          .test("positive-int", "Use a valid quantity", (value) => {
            if (!value) {
              return false;
            }
            const numberValue = Number(value);
            return Number.isInteger(numberValue) && numberValue > 0;
          }),
        unitName: yup.string().trim().required("Unit name is required"),
      }),
    )
    .min(1),
});

function createEmptyRow(quantity = "1"): ConversionRow {
  return { quantity, unitName: "" };
}

function getConversionHint(row: ConversionRow): string {
  const unitName = row.unitName.trim() || "unit";
  const quantityValue = Number(row.quantity);
  const quantity =
    Number.isInteger(quantityValue) && quantityValue > 0 ? quantityValue : 1;
  return `means 1 ${unitName} = ${quantity} cup`;
}

export default function ItemConversionsPage() {
  const router = useRouter();

  async function handleSubmit(
    _values: ItemConversionFormValues,
    { setSubmitting }: FormikHelpers<ItemConversionFormValues>,
  ) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setSubmitting(false);
    router.push("/items");
  }

  return (
    <div className="mx-auto w-full max-w-[620px]">
      <ItemHeader />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          isSubmitting,
          isValid,
          setFieldTouched,
          setFieldValue,
        }) => (
          <Form className="mt-[40px]">
            <FieldArray name="conversions">
              {({ push, remove }) => (
                <>
                  <div className="space-y-4">
                    {values.conversions.map((row, index) => (
                      <div
                        key={`conversion-row-${index}`}
                        className="grid grid-cols-[160px_auto_1fr_auto] items-start gap-3"
                      >
                        <FormikInput
                          name={`conversions.${index}.quantity`}
                          helperText={getConversionHint(row)}
                        />

                        <span className="pt-3 text-base font-semibold text-[#1F2933]">
                          *
                        </span>

                        <FormikInput
                          name={`conversions.${index}.unitName`}
                          placeholder="eg. Derica"
                        />

                        <IconButton
                          label={`Delete conversion row ${index + 1}`}
                          onClick={() => {
                            if (values.conversions.length === 1) {
                              setFieldValue("conversions.0", createEmptyRow());
                              return;
                            }
                            remove(index);
                          }}
                          className="mt-3 text-red-300 transition-colors hover:text-red-500"
                        >
                          <DeleteIcon className="h-4 w-4" />
                        </IconButton>
                      </div>
                    ))}
                  </div>

                  <Button
                    type="button"
                    color="blue"
                    onClick={() => {
                      const lastIndex = values.conversions.length - 1;
                      const lastRow = values.conversions[lastIndex];
                      const hasValidQuantity = Number(lastRow.quantity) > 0;
                      const hasUnitName = Boolean(lastRow.unitName.trim());

                      if (!hasValidQuantity || !hasUnitName) {
                        setFieldTouched(
                          `conversions.${lastIndex}.quantity`,
                          true,
                          true,
                        );
                        setFieldTouched(
                          `conversions.${lastIndex}.unitName`,
                          true,
                          true,
                        );
                        return;
                      }

                      push(createEmptyRow());
                    }}
                    className="mt-[28px]"
                  >
                    Add
                  </Button>
                </>
              )}
            </FieldArray>

            <div className="mt-24 border-t border-[#D0D5DD] pt-5">
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  color="slate"
                  variant="outline"
                  onClick={() => router.push("/items/details")}
                  className="w-full"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Saving..." : "Save Item"}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
