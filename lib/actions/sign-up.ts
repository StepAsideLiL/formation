"use server";

import { z } from "zod";
import schema from "../schema";
import { authClient } from "@/lib/auth";

type TResponse<TError = unknown, TData = unknown> = {
  error: TError;
  data: TData;
};

export default async function signUp(
  formData: z.infer<typeof schema.signUpFormSchema>,
): Promise<TResponse> {
  const { username, email, password, confirmPass } = formData;

  if (password !== confirmPass) {
    return {
      error: {
        type: "validation",
        message: "Passwords don't match",
      },
      data: null,
    };
  }

  const { data, error } = await authClient.signUp.email({
    email: email,
    password: password,
    username: username.toLowerCase(),
    displayUsername: username,
    name: username,
  });

  return {
    error: error,
    data: data,
  };
}
