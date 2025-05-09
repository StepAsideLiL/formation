"use server";

import { z } from "zod";
import schema from "../schema";
import { auth } from "@/lib/auth";
import { TResponse } from "@/lib/types";

type TData = { token: string | null; user: string } | null;

export default async function signUp(
  formData: z.infer<typeof schema.signUpFormSchema>,
): Promise<TResponse<TData>> {
  const { username, email, password, confirmPass } = formData;

  if (password !== confirmPass) {
    return {
      error: {
        message: "Passwords don't match",
      },
      data: null,
    };
  }

  const res = await auth.api.signUpEmail({
    body: {
      email: email,
      password: password,
      username: username.toLowerCase(),
      displayUsername: username,
      name: username,
    },
  });

  if (!res) {
    return {
      error: {
        message: "Failed to sign up",
      },
      data: null,
    };
  }

  return {
    error: null,
    data: {
      token: res.token,
      user: res.user.name,
    },
  };
}
