"use server";

import { z } from "zod";
import schema from "../schema";
import { auth } from "@/lib/auth";
import { TResponse } from "@/lib/types";

export default async function signIn(
  formData: z.infer<typeof schema.signInFormSchema>,
): Promise<TResponse> {
  const { email, password } = formData;

  const res = await auth.api.signInEmail({
    body: {
      email: email,
      password: password,
    },
  });

  if (!res) {
    return {
      error: {
        message: "Invalid email or password",
      },
      data: null,
    };
  }

  return {
    error: null,
    data: res,
  };
}
