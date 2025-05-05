import { cache } from "react";
import prisma from "@/lib/prismadb";
import { TResponse } from "../types";

export type TGetVariantForResponseData = {
  formId: string;
  currentVariantId: string;
  formSchema: string;
  formSubmissionData: {
    formDataId: string;
    fromData: string;
  }[];
};

const getVariantForResponse = cache(
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
);

export default getVariantForResponse;
