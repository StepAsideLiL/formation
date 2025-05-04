import { cache } from "react";
import prisma from "@/lib/prismadb";
import { TResponse } from "../types";

const getVariantForResponse = cache(
  async (
    variantId: string,
  ): Promise<
    TResponse<{
      formId: string;
      currentVariantId: string;
      formSchema: string;
      formData: string[];
    } | null>
  > => {
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

    const formData = variant.formData.map((data) => data.formData);

    return {
      error: null,
      data: {
        formId: variant.form.id,
        currentVariantId: variant.id,
        formSchema: variant.form.formSchema,
        formData,
      },
    };
  },
);

export default getVariantForResponse;
