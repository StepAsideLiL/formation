"use server";

import { TFormSchema } from "@/lib/store";
import { TResponse } from "@/lib/types";
import prisma from "@/lib/prismadb";

type TData = {
  formDataId: string;
  currentVariantId: string;
  formObj: TFormSchema[];
} | null;

export async function publishForm(
  formObj: TFormSchema[],
  userId: string,
): Promise<TResponse<TData>> {
  const userExists = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!userExists) {
    return {
      error: new Error("User not found"),
      data: null,
    };
  }

  const formDataId = await prisma.formData.create({
    data: {
      formObj: JSON.stringify(formObj),
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  if (!formDataId) {
    return {
      error: {
        message: "Failed to create!",
      },
      data: null,
    };
  }

  const variant = await prisma.formVariant.create({
    data: {
      formObj: JSON.stringify(formObj),
      formData: {
        connect: {
          id: formDataId.id,
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
      formDataId: formDataId.id,
      currentVariantId: variant.id,
      formObj,
    },
  };
}
