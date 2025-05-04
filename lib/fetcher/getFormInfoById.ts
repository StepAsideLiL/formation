import prisma from "@/lib/prismadb";
import { cache } from "react";

const getFormInfoById = cache(async (formId: string) => {
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
});

export default getFormInfoById;
