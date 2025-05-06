import { RenderForm } from "@/components/form-app/RenderForm";
import RenderRichText from "@/components/richtext-app/RenderRichText";
import db from "@/lib/db";
import { TFormSchema } from "@/lib/store";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const { error, data } = await db.query.getFormById((await params).formId);

  if (error) {
    return {
      title: "Invaild Form",
    };
  }

  if (data) {
    return {
      title: data.formTitle,
    };
  }

  return {
    title: "Unexpexted Error",
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const { error, data } = await db.query.getFormById((await params).formId);

  if (error) {
    return (
      <main className="mx-auto w-full max-w-5xl py-10">
        <h1 className="text-muted-foreground text-center text-xl">
          Error Occured
        </h1>
        <p className="text-muted-foreground text-center text-sm">
          {error.message}
        </p>
      </main>
    );
  }

  if (data) {
    return (
      <main className="mx-auto w-full max-w-5xl space-y-5 py-5">
        <h1 className="text-2xl">{data.formTitle}</h1>
        <RenderRichText content={data.formDescription} />

        <RenderForm
          formSchema={JSON.parse(data.formSchema) as TFormSchema[]}
          currentFromSchemaVariantId={data.currentFromSchemaVariantId}
        />
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl py-10">
      <h1 className="text-muted-foreground text-center text-xl">
        Invaild Form
      </h1>
    </main>
  );
}
