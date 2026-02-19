"use client";
import { Button } from "@/components/ui/button";
import { FormikInput } from "@/components/ui/input";
import { FormikTextArea } from "@/components/ui/textarea";
import { Form, Formik, FormikHelpers } from "formik";
import type { SetStateAction } from "react";
import * as yup from "yup";

type AddCategoryFormValues = {
  categoryName: string;
  description: string;
};

const addCategoryInitialValues: AddCategoryFormValues = {
  categoryName: "",
  description: "",
};

const addCategoryValidationSchema = yup.object({
  categoryName: yup.string().trim().required("Category name is required"),
  description: yup
    .string()
    .trim()
    .required("Description is required")
    .max(1000, "Description must not exceed 1000 characters"),
});

export function CategoryForm({
  setIsInviteModalOpen,
}: {
  setIsInviteModalOpen: (value: SetStateAction<boolean>) => void;
}) {
  function handleAddCategorySubmit(
    _values: AddCategoryFormValues,
    { setSubmitting, resetForm }: FormikHelpers<AddCategoryFormValues>,
  ) {
    setSubmitting(false);
    resetForm();
    setIsInviteModalOpen(false);
  }

  return (
    <Formik
      initialValues={addCategoryInitialValues}
      validationSchema={addCategoryValidationSchema}
      onSubmit={handleAddCategorySubmit}
      validateOnMount
    >
      {({ isSubmitting, isValid }) => (
        <Form className="space-y-4">
          <FormikInput
            name="categoryName"
            label="Enter Category Name"
            placeholder="enter name"
            className="rounded-[4px] border-slate-300 focus-within:border-slate-400 focus-within:ring-slate-200"
          />

          <div className="space-y-1">
            <FormikTextArea
              name="description"
              label="Enter Description"
              rows={4}
              maxLength={1000}
              placeholder="enter description"
              className="min-h-[110px] resize-none rounded-[4px]"
            />
            <p className="text-right text-xs text-slate-400">
              Max 1000 Characters
            </p>
          </div>

          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="h-11 w-full rounded-[8px] text-base font-semibold"
          >
            {isSubmitting ? "Adding..." : "Add Category"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
