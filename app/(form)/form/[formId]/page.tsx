import { RenderForm } from "@/components/form-app/RenderForm";
import RenderRichText from "@/components/richtext-app/RenderRichText";
import fetcher from "@/lib/fetcher";
import { TFormSchema } from "@/lib/store";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const form = await fetcher.getFormById((await params).formId);

  if (!form) {
    return {
      title: "Invaild Form",
    };
  }

  return {
    title: form?.title,
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const form = await fetcher.getFormById((await params).formId);

  if (!form) {
    return (
      <main className="mx-auto w-full max-w-5xl py-10">
        <h1 className="text-muted-foreground text-center text-xl">
          Invaild Form
        </h1>
      </main>
    );
  }

  const formSchema = JSON.parse(form.formSchema) as TFormSchema[];

  return (
    <main className="mx-auto w-full max-w-5xl space-y-5 py-5">
      <h1 className="text-2xl">{form.title}</h1>
      <RenderRichText content={form.description} />

      <RenderForm formSchema={formSchema} />
    </main>
  );
}
