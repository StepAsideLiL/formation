"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth";
import Icons from "@/lib/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SignOutBtn() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSignOut() {
    setLoading(true);
    const { error, data } = await authClient.signOut();

    if (error) {
      toast.error(error.message);
      setLoading(false);
    }

    if (data?.success) {
      router.refresh();
      setLoading(false);
    }
  }

  return (
    <Button disabled={loading} onClick={handleSignOut}>
      {loading ? (
        <>
          <Icons.Loading
            className="-ms-1 animate-spin"
            size={16}
            aria-hidden="true"
          />
          Signing Out
        </>
      ) : (
        "Sign Out"
      )}
    </Button>
  );
}
