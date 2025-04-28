"use server";

import { TForm, TFormSchema } from "@/lib/store";
import { TResponse } from "@/lib/types";
import prisma from "@/lib/prismadb";

type TData = {
  formId: string;
  currentVariantId: string;
  formSchema: TFormSchema[];
} | null;

export async function publishForm(
  formInfo: TForm,
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

  const form = await prisma.form.create({
    data: {
      title: formInfo.title,
      description: formInfo.description,
      formSchema: JSON.stringify(formSchema),
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  if (!form) {
    return {
      error: {
        message: "Failed to create!",
      },
      data: null,
    };
  }

  const variant = await prisma.formSchemaVariant.create({
    data: {
      formSchema: JSON.stringify(formSchema),
      form: {
        connect: {
          id: form.id,
        },
      },
    },
  });

  if (!variant) {
    return {
      error: {
        message: "Failed to create!",
      },
      data: null,
    };
  }

  return {
    error: null,
    data: {
      formId: form.id,
      currentVariantId: variant.id,
      formSchema,
    },
  };
}
