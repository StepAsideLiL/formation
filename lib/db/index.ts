import "server-only";

// import getVariantForResponse from "./getVariantForResponse";
// import getSignedInUserForm from "./getSignedInUserForm";
// import getFormInfoById from "./getFormInfoById";
// import getFormById from "./getFormById";
import prisma from "@/lib/prismadb";
import { TResponse } from "@/lib/types";
import { cache } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export type TGetVariantForResponseData = {
  formId: string;
  currentVariantId: string;
  formSchema: string;
  formSubmissionData: {
    formDataId: string;
    fromData: string;
  }[];
};

const db = {
  query: {
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
          userId: session.user.id,
        },
      });

      return {
        error: null,
        data: userForms,
      };
    }),

    getVariantForResponse: cache(
      async (
        variantId: string,
      ): Promise<TResponse<TGetVariantForResponseData | null>> => {
        const variant = await prisma.formSchemaVariant.findUnique({
          where: {
            id: variantId,
          },
          include: {
            form: true,
            formData: true,
          },
        });

        if (!variant) {
          return {
            error: {
              message: "Invaild Variant Id!",
            },
            data: null,
          };
        }

        const formSubmissionData = variant.formData.map((data) => {
          return {
            formDataId: data.id,
            fromData: data.formData,
          };
        });

        return {
          error: null,
          data: {
            formId: variant.form.id,
            currentVariantId: variant.id,
            formSchema: variant.form.formSchema,
            formSubmissionData,
          },
        };
      },
    ),
  },
};

export default db;
