import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TCheckboxMetadata,
  TFormSchema,
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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function InputField({ schema }: { schema: TFormSchema }) {
  const metadata = schema.metadata as TInputMetadata;

  if (schema.label === "") {
    return null;
  }

  return (
    <div>
      <Label htmlFor={schema.id} className="mb-2">
        {schema.label}
        {schema.required ? <span className="text-destructive">*</span> : ""}
      </Label>
      <Input
        id={schema.id}
        type="text"
        placeholder={metadata.placeholder}
        required={schema.required}
        className="mb-1"
      />
      <p className="text-xs">{metadata.description}</p>
    </div>
  );
}

export function TextareaField({ schema }: { schema: TFormSchema }) {
  const metadata = schema.metadata as TInputMetadata;

  if (schema.label === "") {
    return null;
  }

  return (
    <div>
      <Label htmlFor={schema.id} className="mb-2">
        {schema.label}
        {schema.required ? <span className="text-destructive">*</span> : ""}
      </Label>
      <Textarea
        id={schema.id}
        placeholder={metadata.placeholder}
        rows={5}
        required={schema.required}
        className="mb-1"
      />
      <p className="text-xs">{metadata.description}</p>
    </div>
  );
}

export function SelectField({ schema }: { schema: TFormSchema }) {
  const metadata = schema.metadata as TSelectMetadata;

  if (schema.label === "") {
    return null;
  }

  return (
    <div>
      <Label htmlFor={schema.id} className="mb-2">
        {schema.label}
        {schema.required ? <span className="text-destructive">*</span> : ""}
      </Label>
      <Select required={schema.required}>
        <SelectTrigger id={schema.id} className="w-full cursor-pointer">
          <SelectValue id={schema.id} placeholder={metadata.placeholder} />
        </SelectTrigger>

        <SelectContent id={schema.id}>
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

export function CheckboxField({ schema }: { schema: TFormSchema }) {
  const metadata = schema.metadata as TCheckboxMetadata;

  if (schema.label === "") {
    return null;
  }

  return (
    <div>
      <div className="mb-2">
        <Label htmlFor={schema.id}>
          {schema.label}
          {schema.required ? <span className="text-destructive">*</span> : ""}
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
              required={schema.required}
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

export function RadioField({ schema }: { schema: TFormSchema }) {
  const metadata = schema.metadata as TRadioMetadata;

  if (schema.label === "") {
    return null;
  }

  return (
    <div>
      <div className="mb-2">
        <Label htmlFor={schema.id}>
          {schema.label}
          {schema.required ? <span className="text-destructive">*</span> : ""}
        </Label>
        {(metadata?.description || metadata?.description?.length !== 0) && (
          <p className="text-xs">{metadata.description}</p>
        )}
      </div>
      <div className="space-y-1">
        <RadioGroup required={schema.required}>
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
