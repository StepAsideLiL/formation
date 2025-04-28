"use client";

import { Input } from "@/components/ui/input";
import atoms from "@/lib/store";
import { useAtom } from "jotai";
import { Textarea } from "@/components/ui/textarea";

export default function TitleAndDescription() {
  const [formInfo, setFormInfo] = useAtom(atoms.formAtom);

  return (
    <div className="mx-auto w-full max-w-5xl space-y-5">
      <Input
        placeholder="Title"
        className="mb-2"
        value={formInfo.title}
        onChange={(event) =>
          setFormInfo({ ...formInfo, title: event.target.value })
        }
      />
      <Textarea
        placeholder="Description"
        className="mb-2"
        rows={5}
        value={formInfo.description}
        onChange={(event) =>
          setFormInfo({ ...formInfo, description: event.target.value })
        }
      />
    </div>
  );
}
