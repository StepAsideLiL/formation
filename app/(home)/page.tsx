import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Button asChild>
        <Link href={"/new"}>Create a New Form</Link>
      </Button>
    </main>
  );
}
