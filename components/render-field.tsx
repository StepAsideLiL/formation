import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TCheckboxMetadata,
  TFormObj,
  TInputMetadata,
  TRadioMetadata,
  TSelectMetadata,
} from "@/lib/store";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function InputField({ field }: { field: TFormObj }) {
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
        className="mb-1"
      />
      <p className="text-xs">{metadata.description}</p>
    </div>
  );
}

export function TextareaField({ field }: { field: TFormObj }) {
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
        className="mb-1"
      />
      <p className="text-xs">{metadata.description}</p>
    </div>
  );
}

export function SelectField({ field }: { field: TFormObj }) {
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
      <Select>
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

export function CheckboxField({ field }: { field: TFormObj }) {
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
            <Checkbox id={`${i}`} className="cursor-pointer" />
            <Label htmlFor={`${i}`} className="cursor-pointer font-normal">
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RadioField({ field }: { field: TFormObj }) {
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
        <RadioGroup>
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
