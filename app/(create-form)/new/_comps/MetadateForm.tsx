"use client";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import atoms, { TFormObj, TInputMetadata } from "@/lib/store";
import { useAtom } from "jotai";

export function InputMetadateForm({ options }: { options: TFormObj }) {
  const metadata = options?.metadata as TInputMetadata;
  const [formObj, setFormObj] = useAtom(atoms.formObjAtom);

  function updateMetadata(metadata: TInputMetadata) {
    const newFormObj = formObj.map((field) =>
      field.id === options.id ? { ...options, metadata: metadata } : field,
    );

    setFormObj(newFormObj);
  }

  return (
    <div className="space-y-2">
      <Separator />

      <Input
        type="text"
        placeholder="Placeholder Text for One Line Text Field"
        value={metadata?.placeholder}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          updateMetadata({
            placeholder: event.target.value || "",
            description: metadata?.description || "",
          })
        }
      />

      <Input
        type="text"
        placeholder="Field Description"
        value={metadata?.description}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          updateMetadata({
            placeholder: metadata.placeholder || "",
            description: event.target.value || "",
          })
        }
      />
    </div>
  );
}
