import { cn } from "@/lib/utils";
import {
  CheckboxField,
  InputField,
  RadioField,
  SelectField,
  TextareaField,
} from "./fields";
import { TFormSchema } from "@/lib/store";
import { Fragment } from "react";

export function RenderForm({
  formSchema,
  className,
}: {
  formSchema: TFormSchema[];
  className?: string;
}) {
  return (
    <div className={cn("space-y-4", className)}>
      {formSchema.map((field, i) => (
        <Fragment key={i}>
          {field.fieldType === "input" && <InputField schema={field} />}
          {field.fieldType === "textarea" && <TextareaField schema={field} />}
          {field.fieldType === "select" && <SelectField schema={field} />}
          {field.fieldType === "checkbox" && <CheckboxField schema={field} />}
          {field.fieldType === "radio" && <RadioField schema={field} />}
        </Fragment>
      ))}
    </div>
  );
}
