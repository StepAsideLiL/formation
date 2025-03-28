import { Button } from "@/components/ui/button";
import Link from "next/link";
import AppPreview from "./_comps/AppPreview";

export default function Page() {
  return (
    <main className="min-h-screen">
      <section className="space-y-10">
        <div className="mx-auto my-12 w-5xl space-y-5">
          <h1 className="text-5xl font-medium">
            Formation is a form building platform for collecting data from user.
          </h1>

          <Button asChild>
            <Link href={"/new"}>Create New Form</Link>
          </Button>
        </div>

        <AppPreview />
      </section>
    </main>
  );
}
