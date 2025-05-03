import "server-only";
import prisma from "@/lib/prismadb";
import { cache } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const fetcher = {
  getFormById: cache(async (formId: string) => {
    return await prisma.form.findUnique({
      where: {
        id: formId,
      },
    });
  }),
  getFormInfoById: cache(async (formId: string) => {
    return await prisma.form.findUnique({
      where: {
        id: formId,
      },
      include: {
        formSchemaVariants: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            formData: true,
          },
        },
      },
    });
  }),
  getSignedInUserForm: cache(async () => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        error: {
          message: "You are not signed in",
        },
        data: null,
      };
    }

    const userForms = await prisma.form.findMany({
      where: {
        userId: session?.user.id,
      },
    });

    return {
      error: null,
      data: userForms,
    };
  }),
};

export default fetcher;
