import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not Found",
};

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-5 py-20">
      <h2 className="text-muted-foreground text-center text-xl">
        Nothing Is Here
      </h2>
      <Button variant={"outline"} asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </main>
  );
}
