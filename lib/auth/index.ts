import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prismadb";
import { createAuthClient } from "better-auth/react";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";
import { usernameClient } from "better-auth/client/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "cockroachdb",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  plugins: [nextCookies(), username()],
});

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [usernameClient()],
});
