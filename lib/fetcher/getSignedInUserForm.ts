import { cache } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prismadb";

const getSignedInUserForm = cache(async () => {
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
});

export default getSignedInUserForm;
