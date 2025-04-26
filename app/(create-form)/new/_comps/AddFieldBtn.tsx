"use client";

import { Button } from "@/components/ui/button";
import Icons from "@/lib/icons";
import atoms, { insertFormField } from "@/lib/store";
import { useAtom } from "jotai";

export default function AddFieldBtn() {
  const [formSchema, setFormSchema] = useAtom(atoms.formSchemaAtom);

  return (
    <Button onClick={() => setFormSchema([...formSchema, insertFormField()])}>
      <Icons.Plus /> Add Field
    </Button>
  );
}
