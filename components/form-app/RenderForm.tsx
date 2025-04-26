import { cn } from "@/lib/utils";
import {
  CheckboxField,
  InputField,
  RadioField,
  SelectField,
  TextareaField,
} from "./fields";
import { TFormSchema } from "@/lib/store";

export function RenderForm({
  formObj,
  className,
}: {
  formObj: TFormSchema[];
  className?: string;
}) {
  return formObj.map((field, i) => (
    <div key={i} className={cn("space-y-2", className)}>
      {field.fieldType === "input" && <InputField field={field} />}
      {field.fieldType === "textarea" && <TextareaField field={field} />}
      {field.fieldType === "select" && <SelectField field={field} />}
      {field.fieldType === "checkbox" && <CheckboxField field={field} />}
      {field.fieldType === "radio" && <RadioField field={field} />}
    </div>
  ));
}
