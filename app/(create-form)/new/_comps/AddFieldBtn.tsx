"use client";

import { Button } from "@/components/ui/button";
import atoms from "@/lib/store";
import { fieldId } from "@/lib/utils";
import { useAtom } from "jotai";

export default function AddFieldBtn() {
  const [formObj, setFormObj] = useAtom(atoms.formObjAtom);

  return (
    <Button
      className="cursor-pointer"
      onClick={() =>
        setFormObj([
          ...formObj,
          {
            id: fieldId(),
            label: "",
            type: "input",
            required: true,
          },
        ])
      }
    >
      Add Field
    </Button>
  );
}
