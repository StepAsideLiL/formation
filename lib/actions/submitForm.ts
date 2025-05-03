"use server";

import prisma from "@/lib/prismadb";
import { TResponse } from "@/lib/types";

export default async function submitForm(
  formData: Record<string, string>,
  currentFromSchemaVariantId: string,
): Promise<TResponse<{ formDataId: string } | null>> {
  const submittedFormData = await prisma.formData.create({
    data: {
      formData: JSON.stringify(formData),
      formSchemaVariant: {
        connect: {
          id: currentFromSchemaVariantId,
        },
      },
    },
  });

  if (!submittedFormData) {
    return {
      error: {
        message: "Failed to submit form!",
      },
      data: null,
    };
  }

  return {
    error: null,
    data: {
      formDataId: submittedFormData.id,
    },
  };
}
