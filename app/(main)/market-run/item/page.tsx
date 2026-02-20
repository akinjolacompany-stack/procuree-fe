"use client";

import { Button } from "@/components/ui/button";
import { FormikInput, FormikSelect } from "@/components/ui/input";
import { Form, Formik, type FormikHelpers } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { DeleteIcon } from "@/components/icons/delete";
import { IconButton } from "@/components/ui/icon-button";
import { useRouter } from "next/navigation";
import { MarketRunHeader } from "@/components/marketRun/header-marketrun";

type AddItemFormValues = {
  itemName: string;
  budgetPrice: string;
  minimumOrder: string;
  maximumOrder: string;
};

type MarketItem = {
  id: string;
  name: string;
  unitPrice: number;
};

const itemOptions = [
  { label: "Beans", value: "Beans" },
  { label: "Rice", value: "Rice" },
  { label: "Semovita", value: "Semovita" },
  { label: "Congo", value: "Congo" },
];

const initialValues: AddItemFormValues = {
  itemName: "Beans",
  budgetPrice: "550",
  minimumOrder: "3",
  maximumOrder: "6",
};

const addItemValidationSchema = yup.object({
  itemName: yup.string().trim().required("Select an item"),
  budgetPrice: yup
    .string()
    .trim()
    .required("Budget price is required")
    .test("valid-budget", "Enter a valid budget price", (value) => {
      if (!value) {
        return false;
      }
      return Number(value) > 0;
    }),
  minimumOrder: yup
    .string()
    .trim()
    .required("Minimum order is required")
    .test("valid-min-order", "Enter a valid minimum order", (value) => {
      if (!value) {
        return false;
      }
      const numberValue = Number(value);
      return Number.isInteger(numberValue) && numberValue > 0;
    }),
  maximumOrder: yup
    .string()
    .trim()
    .required("Maximum order is required")
    .test("valid-max-order", "Enter a valid maximum order", (value) => {
      if (!value) {
        return false;
      }
      const numberValue = Number(value);
      return Number.isInteger(numberValue) && numberValue > 0;
    })
    .test(
      "max-gte-min",
      "Maximum order must be greater than or equal to minimum order",
      function (value) {
        const minimumOrder = this.parent.minimumOrder as string;
        if (!value || !minimumOrder) {
          return true;
        }
        return Number(value) >= Number(minimumOrder);
      },
    ),
});

const autoCalculatedPriceMultipliers = [
  { label: "Derica", multiplier: 1.0016 },
  { label: "Congo", multiplier: 5.2616 },
  { label: "Quater Bag", multiplier: 23.4434 },
];

function formatNaira(value: number): string {
  return `₦${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function TrashIcon() {
  return (
    <svg
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.9 3H4.1m5.4 0-.5 7.1a1 1 0 0 1-1 .9H5a1 1 0 0 1-1-.9L3.5 3m2.3 0V2.2c0-.4.3-.7.7-.7h1c.4 0 .7.3.7.7V3"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MarketRunItemsPage() {
  const router = useRouter();
  const [marketItems, setMarketItems] = useState<MarketItem[]>([
    { id: "market-item-1", name: "Rice", unitPrice: 550 },
  ]);

  function handleAddItemSubmit(
    values: AddItemFormValues,
    { setSubmitting, resetForm }: FormikHelpers<AddItemFormValues>,
  ) {
    const nextItem: MarketItem = {
      id: `market-item-${Date.now()}`,
      name: values.itemName,
      unitPrice: Number(values.budgetPrice),
    };

    setMarketItems((currentItems) => [...currentItems, nextItem]);
    resetForm({ values: { ...values } });
    setSubmitting(false);
  }

  function removeItem(itemId: string) {
    setMarketItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId),
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1005px] rounded-[10px] bg-white p-8">
      <div className="grid grid-cols-[1.7fr_1fr] gap-8">
        <div className="pr-8">
          <MarketRunHeader
            title="Add Items"
            subtitle="Select Items you want to go to market for and enter details"
          />

          <Formik
            initialValues={initialValues}
            validationSchema={addItemValidationSchema}
            onSubmit={handleAddItemSubmit}
            validateOnMount
          >
            {({ values, isSubmitting, isValid }) => {
              const budgetPrice = Number(values.budgetPrice || 0);
              const autoCalculatedPrices = autoCalculatedPriceMultipliers.map(
                (item) => ({
                  label: item.label,
                  value: budgetPrice > 0 ? budgetPrice * item.multiplier : 0,
                }),
              );

              return (
                <Form className="mt-6 space-y-4">
                  <FormikSelect
                    name="itemName"
                    label="Select Item"
                    options={itemOptions}
                    className="h-11 rounded-[6px] border-[#98A2B3] text-base text-[#1F2933]"
                  />

                  <FormikInput
                    name="budgetPrice"
                    label="Budget price per unit"
                    type="number"
                    min={0}
                    step="0.01"
                    prefix="₦"
                    className="h-11 rounded-[6px] border-[#98A2B3]"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <FormikInput
                      name="minimumOrder"
                      label="Minimum Order"
                      type="number"
                      min={1}
                      step={1}
                      className="h-11 rounded-[6px] border-[#98A2B3]"
                    />
                    <FormikInput
                      name="maximumOrder"
                      label="Maximum Order"
                      type="number"
                      min={1}
                      step={1}
                      className="h-11 rounded-[6px] border-[#98A2B3]"
                    />
                  </div>

                  <div className="rounded-[8px] bg-[#F8FAFC] p-4">
                    <p className="text-sm font-semibold uppercase text-[#9CA3AF]">
                      Auto-Calculated Prices
                    </p>

                    <div className="mt-3 space-y-2">
                      {autoCalculatedPrices.map((priceRow) => (
                        <div
                          key={priceRow.label}
                          className="flex items-center justify-between gap-4"
                        >
                          <p className="text-sm text-[#334155]">
                            {priceRow.label}
                          </p>
                          <div className="min-w-[118px] rounded-[6px] border border-[#98A2B3] bg-white px-3 py-2 text-sm font-medium text-[#475467]">
                            {formatNaira(priceRow.value)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <Button
                      type="submit"
                      color="blue"
                      disabled={!isValid || isSubmitting}
                    >
                      {isSubmitting ? "Adding..." : "Add"}
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>

        <aside className="border-l border-[#E4E7EC] pl-8">
          <MarketRunHeader
            title=" Market Items"
            subtitle="View Market run items"
          />

          <div className="mt-6 space-y-3">
            {marketItems.length ? (
              marketItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center rounded-[8px] border border-[#E4E7EC] bg-[#F8FAFC] px-3 py-2"
                >
                  <div>
                    <p className="text-base font-semibold text-[#475467]">
                      {item.name}
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#1F2933]">
                      {formatNaira(item.unitPrice)}{" "}
                      <span className="text-[#9CA3AF]">per</span> Cup
                    </p>
                  </div>
                  <IconButton
                    onClick={() => removeItem(item.id)}
                    label={`Remove ${item.name}`}
                    className="mt-1 text-red-400 cursor-pointer transition-colors hover:text-red-500"
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))
            ) : (
              <p className="text-sm text-[#98A2B3]">No market items yet.</p>
            )}
          </div>
        </aside>
      </div>

      <div className="pt-6">
        <div className="border-t border-slate-200 pt-6">
          <div className="flex items-center justify-end gap-5">
            <Button
              type="button"
              color="slate"
              variant="outline"
              className="w-[200px]"
              // onClick={() => resetForm()}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="w-[200px]"
              onClick={() => router.push("/market-run/review")}
            >
              Next : Review
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
