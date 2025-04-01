"use client";

import { Button } from "@/components/ui/button";
import Icons from "@/lib/icons";
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
            fieldType: "input",
            required: true,
            metadata: {},
          },
        ])
      }
    >
      <Icons.Plus /> Add Field
    </Button>
  );
}
