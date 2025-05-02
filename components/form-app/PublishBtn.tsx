"use client";

import { Button } from "@/components/ui/button";
import { publishForm } from "@/lib/actions/publishForm";
import publishFormVariant from "@/lib/actions/publishFormVariant";
import Icons from "@/lib/icons";
import atoms from "@/lib/store";
import { useAtom } from "jotai";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function PublishBtn({ userId }: { userId: string | undefined }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const [formInfo] = useAtom(atoms.formAtom);
  const [formschema] = useAtom(atoms.formSchemaAtom);

  async function handlePublish() {
    if (!userId) {
      toast.error("Sign In to Publish Form.");
      return;
    }

    if (pathname.includes("/new")) {
      setLoading(true);

      const { error, data } = await publishForm(formInfo, formschema, userId);

      if (error) {
        toast.error(error.message);
        setLoading(false);
      }

      if (data) {
        toast.success("Form Published Successfully");
        setLoading(false);
      }
    }

    if (pathname.includes("/form")) {
      setLoading(true);

      const { error, data } = await publishFormVariant(
        formInfo.id,
        formschema,
        userId,
      );

      if (error) {
        toast.error(error.message);
        setLoading(false);
      }

      if (data) {
        toast.success("Form Published Successfully");
        setLoading(false);
      }
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
