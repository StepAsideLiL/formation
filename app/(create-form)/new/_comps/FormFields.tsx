"use client";

import atoms from "@/lib/store";
import { useAtom } from "jotai";
import FieldOptionsForm from "./FieldOptionsForm";
import {
  CheckboxField,
  InputField,
  RadioField,
  SelectField,
  TextareaField,
} from "@/components/render-field";

export default function FormFields() {
  const [formObj] = useAtom(atoms.formObjAtom);

  return (
    <section className="space-y-5">
      {formObj.map((field) => {
        return (
          <div key={field.id} className="flex items-start gap-5">
            <div className="w-1/2">
              <FieldOptionsForm key={field.id} options={field} />
            </div>

            <div className="w-1/2">
              {field.fieldType === "input" && (
                <InputField key={field.id} field={field} />
              )}

              {field.fieldType === "textarea" && (
                <TextareaField key={field.id} field={field} />
              )}

              {field.fieldType === "select" && (
                <SelectField key={field.id} field={field} />
              )}

              {field.fieldType === "checkbox" && (
                <CheckboxField key={field.id} field={field} />
              )}

              {field.fieldType === "radio" && (
                <RadioField key={field.id} field={field} />
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}
