"use client";

import ItemHeader from "@/components/item/item-add-item-header";
import { Button } from "@/components/ui/button";
import { FormikInput, FormikSelect } from "@/components/ui/input";
import { useCategoriesQuery } from "@/lib/api/categories";
import { getApiErrorMessage } from "@/lib/api/error";
import { useItemFlowStore } from "@/store";
import { Form, Formik, type FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import * as yup from "yup";

type ItemDetailsFormValues = {
  itemName: string;
  categoryId: string;
  baseUnitId: string;
};

const validationSchema = yup.object({
  itemName: yup.string().trim().required("Item name is required"),
  categoryId: yup.string().trim().required("Category is required"),
  baseUnitId: yup.string().trim().required("Base unit is required"),
});

export default function ItemDetailsPage() {
  const router = useRouter();
  const {
    itemFlowMode,
    editingCommodityId,
    itemDetailsDraft,
    setItemDetailsDraft,
    resetItemFlow,
  } =
    useItemFlowStore();
  const categoriesQuery = useCategoriesQuery({
    page: 1,
    perPage: 200,
  });

  const categoryOptions = useMemo(
    () =>
      (categoriesQuery.data?.data.data ?? []).map((category) => ({
        label: category.name,
        value: category.id,
      })),
    [categoriesQuery.data?.data.data],
  );

  const categoriesErrorMessage = categoriesQuery.isError
    ? getApiErrorMessage(categoriesQuery.error, "Unable to load categories.")
    : null;

  const initialValues = useMemo<ItemDetailsFormValues>(
    () => ({
      itemName: itemDetailsDraft.itemName,
      categoryId: itemDetailsDraft.categoryId,
      baseUnitId: itemDetailsDraft.baseUnitId,
    }),
    [
      itemDetailsDraft.baseUnitId,
      itemDetailsDraft.categoryId,
      itemDetailsDraft.itemName,
    ],
  );

  async function handleSubmit(
    values: ItemDetailsFormValues,
    { setSubmitting }: FormikHelpers<ItemDetailsFormValues>,
  ) {
    setItemDetailsDraft({
      itemName: values.itemName.trim(),
      categoryId: values.categoryId,
      baseUnitId: values.baseUnitId,
    });
    setSubmitting(false);
    const nextRoute =
      itemFlowMode === "update" && editingCommodityId
        ? `/items/${editingCommodityId}/conversions`
        : "/items/conversions";
    router.push(nextRoute);
  }

  return (
    <div className="mx-auto w-full max-w-[620px]">
      <ItemHeader />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
        validateOnMount
      >
        {({ isSubmitting, isValid }) => (
          <Form className="mt-4 space-y-3">
            {/* Image upload temporarily disabled: commodity API does not accept image yet. */}
            {/* <FormikImageUploadInput
              name="image"
              accept=".jpg,.jpeg,.png,image/jpeg,image/png"
            /> */}

            <FormikInput
              name="itemName"
              label="Item Name"
              placeholder="e.g Rice"
            />

            <FormikSelect
              name="categoryId"
              label="Category"
              options={categoryOptions}
              placeholder={
                categoriesQuery.isPending ? "Loading categories..." : "Select Category"
              }
              disabled={categoriesQuery.isPending || Boolean(categoriesErrorMessage)}
            />
            {categoriesErrorMessage ? (
              <p className="text-xs text-red-600">{categoriesErrorMessage}</p>
            ) : null}

            <FormikInput
              name="baseUnitId"
              label="Base Unit (Smallest unit)"
              placeholder="e.g. Kg"
            />

            <div className="flex items-center gap-4 pt-2">
              <Button
                type="button"
                color="slate"
                variant="outline"
                onClick={() => {
                  resetItemFlow();
                  router.push("/items");
                }}
                className="w-full"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  !isValid ||
                  isSubmitting ||
                  categoriesQuery.isPending ||
                  Boolean(categoriesErrorMessage)
                }
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
