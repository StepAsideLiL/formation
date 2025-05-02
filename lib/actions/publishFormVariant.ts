"use server";

import { TFormSchema } from "@/lib/store";
import { TResponse } from "@/lib/types";
import prisma from "@/lib/prismadb";

type TData = {
  formId: string;
  currentVariantId: string;
  formSchema: TFormSchema[];
} | null;

export default async function publishFormVariant(
  formId: string,
  formSchema: TFormSchema[],
  userId: string,
): Promise<TResponse<TData>> {
  const userExists = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!userExists) {
    return {
      error: {
        message: "User not found",
      },
      data: null,
    };
  }

  const form = await prisma.form.findUnique({
    where: {
      id: formId,
    },
  });

  if (!form) {
    return {
      error: {
        message: "Form not found",
      },
      data: null,
    };
  }

  if (form.formSchema === JSON.stringify(formSchema)) {
    return {
      error: {
        message: "This form already has this variant",
      },
      data: null,
    };
  }

  const formSchemaVariant = await prisma.formSchemaVariant.create({
    data: {
      formSchema: JSON.stringify(formSchema),
      form: {
        connect: {
          id: formId,
        },
      },
    },
  });

  return {
    error: null,
    data: {
      formId: formId,
      currentVariantId: formSchemaVariant.id,
      formSchema,
    },
  };
}
