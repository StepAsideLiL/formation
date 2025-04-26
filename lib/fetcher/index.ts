import "server-only";
import prisma from "@/lib/prismadb";

const fetcher = {
  getForm: async (formId: string) => {
    return await prisma.form.findUnique({
      where: {
        id: formId,
      },
    });
  },
};

export default fetcher;
