import date from "@/lib/date";
import fetcher from "@/lib/fetcher";
import { Metadata, Route } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Your Profile",
};

export default async function page() {
  const forms = await fetcher.getSignedInUserForm();

  return (
    <main className="mx-auto w-full max-w-5xl py-5">
      {forms.error && (
        <div>
          <h1 className="text-muted-foreground text-center">No Form Found</h1>
        </div>
      )}

      {forms.data && (
        <div className="space-y-5">
          <h1 className="text-2xl">Form List</h1>

          <div>
            {forms.data.map((form) => (
              <Link
                key={form.id}
                href={`profile/form/${form.id}` as Route}
                className="bg-background hover:bg-muted block p-5"
              >
                <h1 className="text-xl">{form.title}</h1>
                <p className="text-muted-foreground text-sm">
                  Created At {date.format(new Date(form.createdAt))}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
