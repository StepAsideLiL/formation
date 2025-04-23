"use server";

import { TFormObj } from "@/lib/store";
import { TResponse } from "@/lib/types";
import prisma from "@/lib/prismadb";

export async function publishForm(
  formObj: TFormObj[],
  userId: string,
): Promise<TResponse> {
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

  const formObjDB = await prisma.formData.create({
    data: {
      formObj: JSON.stringify(formObj),
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return {
    error: null,
    data: formObjDB,
  };
}
