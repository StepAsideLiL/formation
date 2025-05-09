import SetNewFormSchema from "@/components/form-app/SetNewFormSchema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import date from "@/lib/date";
import db from "@/lib/db";
import { TFormSchema } from "@/lib/store";
import { Metadata, Route } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ formId: string }>;
}): Promise<Metadata> {
  const form = await db.query.getFormInfoById((await params).formId);

  if (!form) {
    return {
      title: "Invaild Form",
    };
  }

  return {
    title: `${form.title} variants`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const form = await db.query.getFormInfoById((await params).formId);

  if (!form) {
    return (
      <main className="mx-auto w-full max-w-5xl py-10">
        <h1 className="text-muted-foreground text-center text-xl">
          Invaild Form
        </h1>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl space-y-10 py-5">
      <h1 className="text-2xl font-medium">From Variants</h1>

      <div className="space-y-5">
        {form.formSchemaVariants.map((variant) => (
          <div key={variant.id} className="space-y-3 border px-4 py-2">
            <div className="space-y-2">
              <div className="grid grid-cols-12">
                <span className="col-span-2">Variant Id</span>
                <span className="col-span-10">{variant.id}</span>
              </div>
              <div className="grid grid-cols-12">
                <span className="col-span-2">Created At</span>
                <span className="col-span-10">
                  {date.format(new Date(variant.createdAt))}
                </span>
              </div>
              <div className="grid grid-cols-12">
                <span className="col-span-2">Status</span>
                <span className="col-span-10">
                  <Badge
                    variant={
                      variant.formSchema === form.formSchema
                        ? "default"
                        : "secondary"
                    }
                  >
                    {variant.formSchema === form.formSchema
                      ? "Current"
                      : "Outdated"}
                  </Badge>
                </span>
              </div>
              <div className="grid grid-cols-12">
                <span className="col-span-2">Total Response</span>
                <span className="col-span-10">{variant.formData.length}</span>
              </div>
            </div>

            <div>
              <Button variant={"outline"} asChild>
                <Link href={`/profile/variant/${variant.id}` as Route}>
                  See Responses
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <SetNewFormSchema
        formId={form.id}
        formSchema={JSON.parse(form.formSchema) as TFormSchema[]}
      >
        <Link href={`/profile/form/${form.id}/create-new-variant` as Route}>
          Add New Variant
        </Link>
      </SetNewFormSchema>
    </main>
  );
}
