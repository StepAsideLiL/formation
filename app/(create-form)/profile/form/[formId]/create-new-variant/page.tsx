import AddFieldBtn from "@/components/form-app/AddFieldBtn";
import FormFields from "@/components/form-app/FormFields";
import { auth } from "@/lib/auth";
import fetcher from "@/lib/fetcher";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ formId: string }>;
}): Promise<Metadata> {
  const form = await fetcher.getFormById((await params).formId);

  if (!form) {
    return {
      title: "Invaild Form",
    };
  }

  return {
    title: form.title,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const session = auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  const form = await fetcher.getFormInfoById((await params).formId);

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
    <main className="p-5">
      <section className="space-y-2 overflow-x-hidden">
        <div className="mx-auto w-5xl">
          <h1 className="font-medium">Edit Form</h1>
        </div>

        <FormFields />

        <div className="mx-auto w-5xl">
          <AddFieldBtn />
        </div>
      </section>

      <div className="min-h-96"></div>
    </main>
  );
}
