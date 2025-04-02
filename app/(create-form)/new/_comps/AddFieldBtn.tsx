"use client";

import { Button } from "@/components/ui/button";
import Icons from "@/lib/icons";
import atoms, { insertFormObj } from "@/lib/store";
import { useAtom } from "jotai";

export default function AddFieldBtn() {
  const [formObj, setFormObj] = useAtom(atoms.formObjAtom);

  return (
    <Button onClick={() => setFormObj([...formObj, insertFormObj()])}>
      <Icons.Plus /> Add Field
    </Button>
  );
}
