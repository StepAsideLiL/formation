"use client";

import { InputField } from "@/components/render-field";
import atoms from "@/lib/store";
import { useAtom } from "jotai";

export default function FormPreview() {
  const [formObj] = useAtom(atoms.formObjAtom);

  return formObj.map((field) => {
    if (field.fieldType === "input") {
      return <InputField key={field.id} field={field} />;
    }
  });
}
