"use server";

import { z } from "zod";
import schema from "../schema";
import { authClient } from "@/lib/auth";

type TResponse<TError = unknown, TData = unknown> = {
  error: TError;
  data: TData;
};

export default async function signIn(
  formData: z.infer<typeof schema.signInFormSchema>,
): Promise<TResponse> {
  const { email, password } = formData;

  const { error, data } = await authClient.signIn.email({
    email: email,
    password: password,
  });

  return {
    error: error,
    data: data,
  };
}
