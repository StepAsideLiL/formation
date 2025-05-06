import { cache } from "react";
import { TResponse } from "@/lib/types";
import prisma from "@/lib/prismadb";

const getFormById = cache(
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
);

export default getFormById;
