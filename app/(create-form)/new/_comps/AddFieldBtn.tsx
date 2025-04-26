"use client";

import { Button } from "@/components/ui/button";
import Icons from "@/lib/icons";
import atoms, { insertFormField } from "@/lib/store";
import { useAtom } from "jotai";

export default function AddFieldBtn() {
  const [formObj, seTFormSchema] = useAtom(atoms.formObjAtom);

  return (
    <Button onClick={() => seTFormSchema([...formObj, insertFormField()])}>
      <Icons.Plus /> Add Field
    </Button>
  );
}
