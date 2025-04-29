import "server-only";
import prisma from "@/lib/prismadb";
import { cache } from "react";

const fetcher = {
  getForm: cache(async (formId: string) => {
    return await prisma.form.findUnique({
      where: {
        id: formId,
      },
    });
  }),
};

export default fetcher;
