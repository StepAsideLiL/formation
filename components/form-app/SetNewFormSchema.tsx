"use client";

import { atomSet, TFormSchema } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Slot } from "@radix-ui/react-slot";

export default function SetNewFormSchema({
  formSchema,
  variant = "default",
  asChild = false,
  children,
}: {
  children: React.ReactNode;
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
  const setNewSchema = atomSet.NewSchema();

  function handleClick() {
    setNewSchema(formSchema);
  }

  const Comp = asChild ? Slot : Button;

  return (
    <Comp variant={variant} onClick={handleClick} className="w-fit">
      {children}
    </Comp>
  );
}
