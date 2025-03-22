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
import atoms, { TFieldsType, TFormObj } from "@/lib/store";
import { useAtom } from "jotai";

/**
 * selection for field type
 * input - label
 * checkbox - required
 */

const typeOptions: TFieldsType[] = [
  "input",
  "textarea",
  "select",
  "radio",
  "checkbox",
];

const fieldTypesMeta = {
  input: {
    name: "One Line Text",
    icon: Icons.OneLine,
  },
  textarea: {
    name: "Paragraph Text",
    icon: Icons.Paragraph,
  },
  select: {
    name: "Downdown Optoins",
    icon: Icons.Select,
  },
  radio: {
    name: "Multiple Choice",
    icon: Icons.Choice,
  },
  checkbox: {
    name: "Checkboxs",
    icon: Icons.Checkbox,
  },
};

export default function FieldOptionsForm({ options }: { options: TFormObj }) {
  const [formObj, setFormObj] = useAtom(atoms.formObjAtom);

  function updateFieldType(value: TFieldsType) {
    const newFormObj = formObj.map((field) =>
      field.id === options.id ? { ...options, fieldType: value } : field,
    );

    setFormObj(newFormObj);
  }

  function updateFieldLabel(value: TFormObj["label"]) {
    const newFormObj = formObj.map((field) =>
      field.id === options.id ? { ...options, label: value } : field,
    );

    setFormObj(newFormObj);
  }

  function updateFieldRequired(checked: boolean) {
    const newFormObj = formObj.map((field) =>
      field.id === options.id ? { ...options, required: checked } : field,
    );

    setFormObj(newFormObj);
  }

  function deleteField(fieldId: string) {
    const newFormObj = formObj.filter((field) => field.id !== fieldId);

    setFormObj(newFormObj);
  }

  return (
    <div className="border">
      <div className="flex items-center justify-between border-b p-1">
        <span>Field Id: {options.id}</span>

        <div className="flex items-center gap-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="is-required"
              className="cursor-pointer"
              checked={options.required}
              onCheckedChange={(checked: TFormObj["required"]) =>
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
          <Select
            value={options.fieldType}
            onValueChange={(value: TFieldsType) => updateFieldType(value)}
          >
            <SelectTrigger className="w-64 cursor-pointer">
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

          <Input
            type="text"
            placeholder="Field Label"
            value={options.label}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              updateFieldLabel(event.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
}
