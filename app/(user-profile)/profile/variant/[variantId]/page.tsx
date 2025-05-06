import FormResponse from "@/components/form-app/FormResponse";
import db from "@/lib/db";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ variantId: string }>;
}): Promise<Metadata> {
  const { error, data } = await db.query.getVariantForResponse(
    (await params).variantId,
  );

  if (error) {
    return {
      title: `${error.message}`,
    };
  }

  if (data) {
    return {
      title: `Responses of ${data.currentVariantId}`,
    };
  }

  return {
    title: "Unknown Error!",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ variantId: string }>;
}) {
  const { error, data: form } = await db.query.getVariantForResponse(
    (await params).variantId,
  );

  if (error) {
    return (
      <main className="mx-auto w-full max-w-5xl py-10">
        <h1 className="text-muted-foreground text-center text-xl">
          An Error Occured!
        </h1>
        <p className="text-center">{error.message}</p>
      </main>
    );
  }

  if (form) {
    return (
      <main className="mx-auto w-full max-w-5xl space-y-10 py-5">
        <FormResponse form={form} />
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl py-10">
      <h1 className="text-muted-foreground text-center text-xl">
        Unknown Error!
      </h1>
    </main>
  );
}
