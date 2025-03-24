import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TFormObj, TInputMetadata } from "@/lib/store";

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
