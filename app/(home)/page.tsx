import { Button } from "@/components/ui/button";
import Link from "next/link";
import AppPreview from "./_comps/AppPreview";

export default function Page() {
  return (
    <main className="min-h-screen">
      <section className="space-y-10">
        <div className="mx-auto my-12 w-full max-w-5xl space-y-5 px-10">
          <h1 className="text-center text-3xl font-medium text-balance sm:text-left sm:text-5xl">
            Formation is a form building platform for collecting data from user.
          </h1>

          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row sm:justify-start">
            <Button asChild>
              <Link href={"/new"}>Create New Form</Link>
            </Button>
          </div>
        </div>

        <AppPreview />
      </section>
    </main>
  );
}
