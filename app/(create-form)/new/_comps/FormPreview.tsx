"use client";

import {
  InputField,
  SelectField,
  TextareaField,
} from "@/components/render-field";
import atoms from "@/lib/store";
import { useAtom } from "jotai";

export default function FormPreview() {
  const [formObj] = useAtom(atoms.formObjAtom);

  return formObj.map((field) => {
    if (field.fieldType === "input") {
      return <InputField key={field.id} field={field} />;
    }

    if (field.fieldType === "textarea") {
      return <TextareaField key={field.id} field={field} />;
    }

    if (field.fieldType === "select") {
      return <SelectField key={field.id} field={field} />;
    }
  });
}
