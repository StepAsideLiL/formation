import "server-only";
import prisma from "@/lib/prismadb";
import { cache } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { TResponse } from "@/lib/types";

const fetcher = {
  getFormById: cache(
    async (
      formId: string,
    ): Promise<
      TResponse<{
        formId: string;
        formTitle: string;
        formDescription: string;
        formSchema: string;
        currentFromSchemaVariantId: string;
      } | null>
    > => {
      const form = await prisma.form.findUnique({
        where: {
          id: formId,
        },
        include: {
          formSchemaVariants: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });

      if (!form) {
        return {
          error: {
            message: "Invaild Form Id!",
          },
          data: null,
        };
      }

      const currentFormSchemaVariantId = form.formSchemaVariants.find(
        (variant) => variant.formSchema === form.formSchema,
      )?.id;

      if (!currentFormSchemaVariantId) {
        return {
          error: {
            message: "No variant schema matches with the form schema!",
          },
          data: null,
        };
      }

      return {
        error: null,
        data: {
          formId: form.id,
          formTitle: form.title,
          formDescription: form.description,
          formSchema: form.formSchema,
          currentFromSchemaVariantId: currentFormSchemaVariantId,
        },
      };
    },
  ),
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
