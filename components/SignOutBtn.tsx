"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth";

export default function SignOutBtn() {
  async function handleSignOut() {
    await authClient.signOut();
  }

  return <Button onClick={handleSignOut}>Sign Out</Button>;
}
