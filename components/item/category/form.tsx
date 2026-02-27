"use client";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  type Category,
} from "@/lib/api/categories";
import { getApiErrorMessage } from "@/lib/api/error";
import { useSnackbar } from "@/store/hooks/use-snackbar";
import { Button } from "@/components/ui/button";
import { FormikInput } from "@/components/ui/input";
import { FormikTextArea } from "@/components/ui/textarea";
import { Form, Formik, type FormikHelpers } from "formik";
import { useMemo } from "react";
import * as yup from "yup";

type CategoryFormValues = {
  categoryName: string;
  description: string;
};

type CategoryFormMode = "create" | "update";

const categoryValidationSchema = yup.object({
  categoryName: yup.string().trim().required("Category name is required"),
  description: yup
    .string()
    .trim()
    .required("Description is required")
    .max(1000, "Description must not exceed 1000 characters"),
});

type CategoryFormProps = {
  onClose: () => void;
  mode?: CategoryFormMode;
  initialCategory?: Category | null;
};

export function CategoryForm({
  onClose,
  mode = "create",
  initialCategory = null,
}: CategoryFormProps) {
  const { showSuccess, showError } = useSnackbar();
  const createCategoryMutation = useCreateCategoryMutation();
  const updateCategoryMutation = useUpdateCategoryMutation();

  const isUpdateMode = mode === "update" && Boolean(initialCategory?.id);

  const initialValues = useMemo<CategoryFormValues>(
    () => ({
      categoryName: initialCategory?.name ?? "",
      description: initialCategory?.description ?? "",
    }),
    [initialCategory],
  );

  const isMutationPending =
    createCategoryMutation.isPending || updateCategoryMutation.isPending;

  async function handleCategorySubmit(
    values: CategoryFormValues,
    { setSubmitting, resetForm }: FormikHelpers<CategoryFormValues>,
  ) {
    try {
      if (isUpdateMode && initialCategory) {
        const response = await updateCategoryMutation.mutateAsync({
          id: initialCategory.id,
          name: values.categoryName.trim(),
          description: values.description.trim(),
        });

        showSuccess(response.message || "Category updated successfully.");
      } else {
        const response = await createCategoryMutation.mutateAsync({
          name: values.categoryName.trim(),
          description: values.description.trim(),
        });

        showSuccess(response.message || "Category added successfully.");
      }

      resetForm();
      onClose();
    } catch (error) {
      showError(
        getApiErrorMessage(
          error,
          isUpdateMode
            ? "Unable to update category."
            : "Unable to add category.",
        ),
        {
          title: isUpdateMode ? "Update Failed" : "Creation Failed",
        },
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={categoryValidationSchema}
      onSubmit={handleCategorySubmit}
      enableReinitialize
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
            disabled={!isValid || isSubmitting || isMutationPending}
            className="h-11 w-full rounded-[8px] text-base font-semibold"
          >
            {isSubmitting || isMutationPending
              ? isUpdateMode
                ? "Updating..."
                : "Adding..."
              : isUpdateMode
                ? "Update Category"
                : "Add Category"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
