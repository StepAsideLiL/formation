import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TFormObj, TInputMetadata, TSelectMetadata } from "@/lib/store";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function InputField({ field }: { field: TFormObj }) {
  const metadata = field.metadata as TInputMetadata;

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
