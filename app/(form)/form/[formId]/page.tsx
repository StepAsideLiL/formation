import { RenderForm } from "@/components/form-app/RenderForm";
import fetcher from "@/lib/fetcher";
import { TFormSchema } from "@/lib/store";

export default async function page({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const formObjDB = await fetcher.getFormData((await params).formId);

  if (!formObjDB) {
    return (
      <main className="mx-auto w-full max-w-5xl py-10">
        <h1 className="text-muted-foreground text-center text-xl">
          Invaild Form
        </h1>
      </main>
    );
  }

  const formObj = JSON.parse(formObjDB.formSchema) as TFormSchema[];

  return (
    <main className="mx-auto w-full max-w-5xl py-5">
      <RenderForm formObj={formObj} />
    </main>
  );
}
