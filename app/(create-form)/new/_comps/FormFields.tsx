"use client";

import atoms from "@/lib/store";
import { useAtom } from "jotai";
import FieldOptionsForm from "./FieldOptionsForm";

export default function FormFields() {
  const [formObj] = useAtom(atoms.formObjAtom);

  return (
    <section>
      {formObj.map((field) => (
        <FieldOptionsForm key={field.id} options={field} />
      ))}
    </section>
  );
}
