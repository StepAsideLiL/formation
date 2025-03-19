"use client";

import { TFormObj } from "@/lib/store";

export default function FieldOptionsForm({ options }: { options: TFormObj }) {
  return <div>{options.id}</div>;
}
