import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prismadb";
import { createAuthClient } from "better-auth/react";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "cockroachdb",
  }),
  emailAndPassword: {
    enabled: true,
  },
});

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
});
