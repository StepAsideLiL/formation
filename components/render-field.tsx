import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TFormObj, TInputMetadata } from "@/lib/store";
import { Textarea } from "./ui/textarea";

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
