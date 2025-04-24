import fetcher from "@/lib/fetcher";

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

  return <main>page: {(await params).formId}</main>;
}
