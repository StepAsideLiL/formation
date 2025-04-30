"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import Icons from "@/lib/icons";
import {
  TCheckboxMetadata,
  TFieldsType,
  TFormSchema,
  TInputMetadata,
  TRadioMetadata,
  TSelectMetadata,
} from "@/lib/store";

const formObj: TFormSchema[] = [
  {
    id: "6pc9DFQQWn",
    label: "Name",
    fieldType: "input",
    required: true,
    metadata: {
      placeholder: "Enter Name",
      description: "Enter your full name.",
    },
  },
  {
    id: "d9KrOiscgV",
    label: "Email",
    fieldType: "input",
    required: true,
    metadata: {
      placeholder: "Enter Email",
      description: "Enter a valid email.",
    },
  },
  {
    id: "OdZPMrw1vc",
    label: "Message",
    fieldType: "textarea",
    required: false,
    metadata: {
      placeholder: "Your Message",
      description: "Tell us in details.",
    },
  },
];

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

export default function AppPreview() {
  return (
    <div className="relative mx-auto w-full overflow-x-hidden">
      <div className="ml-12 h-auto w-5xl origin-top-left scale-75 py-10 select-none md:ml-36 md:w-7xl md:scale-90">
        <RenderFormFields />
      </div>

      <div className="from-background absolute inset-0 z-50 w-full bg-gradient-to-t to-transparent"></div>
    </div>
  );
}

function RenderFormFields() {
  return (
    <div className="w-full space-y-5">
      <section className="space-y-5">
        {formObj.map((field) => (
          <div key={field.id}>
            <div className="relative flex items-start gap-5">
              <div className="absolute top-0 -left-10 flex flex-col">
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="cursor-pointer"
                >
                  <Icons.Grip size={16} />
                </Button>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="cursor-pointer"
                >
                  <Icons.Plus size={16} />
                </Button>
              </div>

              <div className="w-1/2">
                <div className="border">
                  <div className="flex items-center justify-between border-b p-1">
                    <span>
                      Field Type: {fieldTypesMeta[field.fieldType].label}
                    </span>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="is-required"
                          className="cursor-pointer"
                          checked={field.required}
                        />
                        <Label
                          htmlFor="is-required"
                          className="cursor-pointer font-normal"
                        >
                          Field Required
                        </Label>
                      </div>

                      <Button
                        variant={"outline"}
                        size={"icon"}
                        className="size-4 cursor-pointer"
                        asChild
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
                        <Select defaultValue={field.fieldType}>
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
                                  <Icon />{" "}
                                  <span>{fieldTypesMeta[type].name}</span>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>

                      <Input
                        type="text"
                        placeholder="Field Label"
                        defaultValue={field.label}
                      />
                    </div>

                    {field.fieldType === "input" && (
                      <InputMetadateForm options={field} />
                    )}

                    {field.fieldType === "textarea" && (
                      <TextareaMetadateForm options={field} />
                    )}

                    {field.fieldType === "select" && (
                      <SelectMetadateForm options={field} />
                    )}

                    {field.fieldType === "checkbox" && (
                      <CheckboxMetadataForm options={field} />
                    )}

                    {field.fieldType === "radio" && (
                      <RadioMetadataForm options={field} />
                    )}
                  </div>
                </div>
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
          </div>
        ))}
      </section>

      <Button>
        <Icons.Plus /> Add Field
      </Button>
    </div>
  );
}

function InputMetadateForm({ options }: { options: TFormSchema }) {
  const metadata = options?.metadata as TInputMetadata;

  return (
    <div className="space-y-2">
      <Separator />

      <Input
        type="text"
        placeholder="Placeholder Text"
        defaultValue={metadata?.placeholder}
      />

      <Input
        type="text"
        placeholder="Field Description"
        defaultValue={metadata?.description}
      />
    </div>
  );
}

function TextareaMetadateForm({ options }: { options: TFormSchema }) {
  const metadata = options?.metadata as TInputMetadata;

  return (
    <div className="space-y-2">
      <Separator />

      <Input
        type="text"
        placeholder="Textarea Placeholder Text"
        defaultValue={metadata?.placeholder}
      />

      <Input
        type="text"
        placeholder="Textarea Field Description"
        defaultValue={metadata?.description}
      />
    </div>
  );
}

function SelectMetadateForm({ options }: { options: TFormSchema }) {
  const metadata = options?.metadata as TSelectMetadata;

  return (
    <div className="space-y-2">
      <Separator />

      <Input
        type="text"
        placeholder="Dropdown Placeholder Text"
        defaultValue={metadata?.placeholder}
      />

      <Input
        type="text"
        placeholder="Field Description"
        defaultValue={metadata?.description}
      />

      <div className="flex w-full gap-2">
        <div className="w-1/2 space-y-1">
          <h2 className="text-xs">Options</h2>
          {metadata.options?.map((option, i) => {
            return (
              <div key={i} className="relative">
                <Input
                  placeholder="Option"
                  className="w-full"
                  defaultValue={option}
                />
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="text-destructive size-4 cursor-pointer"
                  asChild
                >
                  <Icons.Trash className="absolute top-2 right-2" />
                </Button>
              </div>
            );
          })}
          <Button variant={"outline"} className="cursor-pointer">
            Add Option
          </Button>
        </div>

        <div className="w-1/2 space-y-1">
          <h2 className="text-xs">Select default option</h2>

          <RadioGroup
            defaultValue={metadata.defaultOption}
            className="space-x-2"
          >
            {metadata.options?.map((option, i) => (
              <div key={i} className="flex items-center gap-1">
                <RadioGroupItem
                  value={option}
                  id={option}
                  className="cursor-pointer"
                />
                <Label htmlFor={option} className="cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}

function CheckboxMetadataForm({ options }: { options: TFormSchema }) {
  const metadata = options?.metadata as TCheckboxMetadata;

  return (
    <div className="space-y-2">
      <Separator />

      <Input
        type="text"
        placeholder="Field Description"
        defaultValue={metadata?.description}
      />

      <div className="space-y-1">
        <h2 className="text-xs">Checkbox Options</h2>
        {metadata.options?.map((option, i) => {
          return (
            <div key={i} className="relative">
              <Input
                placeholder="Option"
                className="w-full"
                defaultValue={option}
              />
              <Button
                variant={"ghost"}
                size={"icon"}
                className="text-destructive size-4 cursor-pointer"
                asChild
              >
                <Icons.Trash className="absolute top-2 right-2" />
              </Button>
            </div>
          );
        })}
        <Button variant={"outline"} className="cursor-pointer">
          Add Option
        </Button>
      </div>
    </div>
  );
}

function RadioMetadataForm({ options }: { options: TFormSchema }) {
  const metadata = options?.metadata as TRadioMetadata;

  return (
    <div className="space-y-2">
      <Separator />

      <Input
        type="text"
        placeholder="Field Description"
        defaultValue={metadata?.description}
      />

      <div className="space-y-1">
        <h2 className="text-xs">Multiple Choice Options</h2>
        {metadata.options?.map((option, i) => {
          return (
            <div key={i} className="relative">
              <Input
                placeholder="Option"
                className="w-full"
                defaultValue={option}
              />
              <Button
                variant={"ghost"}
                size={"icon"}
                className="text-destructive size-4 cursor-pointer"
                asChild
              >
                <Icons.Trash className="absolute top-2 right-2" />
              </Button>
            </div>
          );
        })}
        <Button variant={"outline"} className="cursor-pointer">
          Add Option
        </Button>
      </div>
    </div>
  );
}

export function InputField({ field }: { field: TFormSchema }) {
  const metadata = field.metadata as TInputMetadata;

  if (field.label === "") {
    return null;
  }

  return (
    <div>
      <Label htmlFor={field.id} className="mb-2">
        {field.label}
        {field.required ? <span className="text-destructive">*</span> : ""}
      </Label>
      <Input
        id={field.id}
        type="text"
        placeholder={metadata.placeholder}
        required={field.required}
        className="mb-1"
      />
      <p className="text-xs">{metadata.description}</p>
    </div>
  );
}

function TextareaField({ field }: { field: TFormSchema }) {
  const metadata = field.metadata as TInputMetadata;

  if (field.label === "") {
    return null;
  }

  return (
    <div>
      <Label htmlFor={field.id} className="mb-2">
        {field.label}
        {field.required ? <span className="text-destructive">*</span> : ""}
      </Label>
      <Textarea
        id={field.id}
        placeholder={metadata.placeholder}
        rows={5}
        required={field.required}
        className="mb-1"
      />
      <p className="text-xs">{metadata.description}</p>
    </div>
  );
}

function SelectField({ field }: { field: TFormSchema }) {
  const metadata = field.metadata as TSelectMetadata;

  if (field.label === "") {
    return null;
  }

  return (
    <div>
      <Label htmlFor={field.id} className="mb-2">
        {field.label}
        {field.required ? <span className="text-destructive">*</span> : ""}
      </Label>
      <Select required={field.required}>
        <SelectTrigger id={field.id} className="w-full cursor-pointer">
          <SelectValue id={field.id} placeholder={metadata.placeholder} />
        </SelectTrigger>

        <SelectContent id={field.id}>
          {metadata.options?.map((option, i) => (
            <SelectItem key={i} value={option} className="cursor-pointer">
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-xs">{metadata.description}</p>
    </div>
  );
}

function CheckboxField({ field }: { field: TFormSchema }) {
  const metadata = field.metadata as TCheckboxMetadata;

  if (field.label === "") {
    return null;
  }

  return (
    <div>
      <div className="mb-2">
        <Label htmlFor={field.id}>
          {field.label}
          {field.required ? <span className="text-destructive">*</span> : ""}
        </Label>
        {(metadata?.description || metadata?.description?.length !== 0) && (
          <p className="text-xs">{metadata.description}</p>
        )}
      </div>
      <div className="space-y-1">
        {metadata.options?.map((option, i) => (
          <div key={i} className="flex items-center gap-1">
            <Checkbox
              id={`${i}`}
              required={field.required}
              className="cursor-pointer"
            />
            <Label htmlFor={`${i}`} className="cursor-pointer font-normal">
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}

function RadioField({ field }: { field: TFormSchema }) {
  const metadata = field.metadata as TRadioMetadata;

  if (field.label === "") {
    return null;
  }

  return (
    <div>
      <div className="mb-2">
        <Label htmlFor={field.id}>
          {field.label}
          {field.required ? <span className="text-destructive">*</span> : ""}
        </Label>
        {(metadata?.description || metadata?.description?.length !== 0) && (
          <p className="text-xs">{metadata.description}</p>
        )}
      </div>
      <div className="space-y-1">
        <RadioGroup required={field.required}>
          {metadata.options?.map((option, i) => (
            <div key={i} className="flex items-center gap-1">
              <RadioGroupItem
                value={option}
                id={`${i}`}
                className="cursor-pointer"
              />
              <Label htmlFor={`${i}`} className="cursor-pointer font-normal">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
