import "server-only";
import prisma from "@/lib/prismadb";

const fetcher = {
  getFormData: async (formId: string) => {
    return await prisma.form.findUnique({
      where: {
        id: formId,
      },
    });
  },
};

export default fetcher;
