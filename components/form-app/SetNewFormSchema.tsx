"use client";

import atoms, { atomSet, TFormSchema } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Slot } from "@radix-ui/react-slot";
import { useAtom } from "jotai";

export default function SetNewFormSchema({
  formSchema,
  formId = "",
  variant = "default",
  asChild = false,
  children,
}: {
  children: React.ReactNode;
  formId?: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  asChild?: boolean;
  formSchema: TFormSchema[];
}) {
  const [formInfo, setFormInfo] = useAtom(atoms.formAtom);
  const setNewSchema = atomSet.NewSchema();

  function handleClick() {
    setNewSchema(formSchema);
    setFormInfo({ ...formInfo, id: formId });
  }

  const Comp = asChild ? Slot : Button;

  return (
    <Comp variant={variant} onClick={handleClick} className="w-fit">
      {children}
    </Comp>
  );
}
