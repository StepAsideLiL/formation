"use client";

import { Button } from "@/components/ui/button";
import { publishForm } from "@/lib/actions/publishForm";
import Icons from "@/lib/icons";
import atoms from "@/lib/store";
import { useAtom } from "jotai";
import { useState } from "react";
import { toast } from "sonner";

export default function PublishBtn({ userId }: { userId: string | undefined }) {
  const [loading, setLoading] = useState(false);
  const [formschema] = useAtom(atoms.formSchemaAtom);

  async function handlePublish() {
    if (!userId) {
      toast.error("Sign In to Publish Form.");
      return;
    }

    setLoading(true);

    const { error, data } = await publishForm(formschema, userId);

    if (error) {
      toast.error(error.message);
      setLoading(false);
    }

    if (data) {
      toast.success("Form Published Successfully");
      setLoading(false);
    }
  }

  return (
    <Button disabled={loading} onClick={handlePublish}>
      {loading ? (
        <>
          <Icons.Loading
            className="-ms-1 animate-spin"
            size={16}
            aria-hidden="true"
          />
          Publishing
        </>
      ) : (
        "Publish"
      )}
    </Button>
  );
}
