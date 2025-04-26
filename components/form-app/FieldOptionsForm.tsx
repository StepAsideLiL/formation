"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import Icons from "@/lib/icons";
import atoms, { TFieldsType, TFormSchema } from "@/lib/store";
import { useAtom } from "jotai";
import {
  CheckboxMetadataForm,
  InputMetadateForm,
  RadioMetadataForm,
  SelectMetadateForm,
  TextareaMetadateForm,
} from "./MetadateForm";

const typeOptions: TFieldsType[] = [
  "input",
  "textarea",
  "select",
  "radio",
  "checkbox",
];

const fieldTypesMeta = {
  input: {
    label: "Input",
    name: "One Line Text",
    icon: Icons.OneLine,
  },
  textarea: {
    label: "Textarea",
    name: "Paragraph Text",
    icon: Icons.Paragraph,
  },
  select: {
    label: "Select",
    name: "Dropdown Options",
    icon: Icons.Select,
  },
  radio: {
    label: "Radio",
    name: "Multiple Choice",
    icon: Icons.Choice,
  },
  checkbox: {
    label: "Checkbox",
    name: "Checkboxs",
    icon: Icons.Checkbox,
  },
};

export default function FieldOptionsForm({
  options,
}: {
  options: TFormSchema;
}) {
  const [formSchema, setFormSchema] = useAtom(atoms.formSchemaAtom);

  function updateFieldType(value: TFieldsType) {
    const newFormSchema = formSchema.map((field) =>
      field.id === options.id
        ? { ...options, fieldType: value, metadata: {} }
        : field,
    );

    setFormSchema(newFormSchema);
  }

  function updateFieldLabel(value: TFormSchema["label"]) {
    const newFormSchema = formSchema.map((field) =>
      field.id === options.id ? { ...options, label: value } : field,
    );

    setFormSchema(newFormSchema);
  }

  function updateFieldRequired(checked: boolean) {
    const newFormSchema = formSchema.map((field) =>
      field.id === options.id ? { ...options, required: checked } : field,
    );

    setFormSchema(newFormSchema);
  }

  function deleteField(fieldId: string) {
    const newFormSchema = formSchema.filter((field) => field.id !== fieldId);

    setFormSchema(newFormSchema);
  }

  return (
    <div className="border">
      <div className="flex items-center justify-between border-b p-1">
        <span>Field Type: {fieldTypesMeta[options.fieldType].label}</span>

        <div className="flex items-center gap-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="is-required"
              className="cursor-pointer"
              checked={options.required}
              onCheckedChange={(checked: TFormSchema["required"]) =>
                updateFieldRequired(checked)
              }
            />
            <Label htmlFor="is-required" className="cursor-pointer font-normal">
              Field Required
            </Label>
          </div>

          <Button
            variant={"outline"}
            size={"icon"}
            className="size-4 cursor-pointer"
            asChild
            onClick={() => {
              deleteField(options.id);
            }}
          >
            <span className="p-3">
              <Icons.Trash className="text-destructive" />
            </span>
          </Button>
        </div>
      </div>

      <div className="space-y-2 p-1">
        <div className="flex items-center gap-3">
          <div className="w-56">
            <Select
              value={options.fieldType}
              onValueChange={(value: TFieldsType) => updateFieldType(value)}
            >
              <SelectTrigger className="w-56 cursor-pointer">
                <SelectValue placeholder={"Select a field type"} />
              </SelectTrigger>

              <SelectContent>
                {typeOptions.map((type) => {
                  const Icon = fieldTypesMeta[type].icon;

                  return (
                    <SelectItem
                      key={type}
                      className="cursor-pointer items-center"
                      value={type}
                    >
                      <Icon /> <span>{fieldTypesMeta[type].name}</span>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <Input
            type="text"
            placeholder="Field Label"
            value={options.label}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              updateFieldLabel(event.target.value)
            }
          />
        </div>

        {options.fieldType === "input" && (
          <InputMetadateForm options={options} />
        )}

        {options.fieldType === "textarea" && (
          <TextareaMetadateForm options={options} />
        )}

        {options.fieldType === "select" && (
          <SelectMetadateForm options={options} />
        )}

        {options.fieldType === "checkbox" && (
          <CheckboxMetadataForm options={options} />
        )}

        {options.fieldType === "radio" && (
          <RadioMetadataForm options={options} />
        )}
      </div>
    </div>
  );
}
