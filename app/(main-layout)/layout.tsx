import Logo from "@/components/Logo";
import SignOutBtn from "@/components/SignOutBtn";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Formation is a form building platform for collecting data from user",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <header className="border-b py-5">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-10">
          <Logo />

          <div className="flex items-center gap-2">
            {session ? (
              <>
                <SignOutBtn />
              </>
            ) : (
              <>
                <Button asChild>
                  <Link href={"/auth/sign-up"}>Sign Up</Link>
                </Button>
                <Button variant={"secondary"} asChild>
                  <Link href={"/auth/sign-in"}>Sign In</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {children}

      <footer className="relative py-20">
        <div className="from-foreground/10 absolute top-0 left-0 h-20 w-full bg-gradient-to-b to-transparent"></div>

        <div>
          <p className="text-foreground/50 text-center">
            Build By{" "}
            <Link
              href="http://github.com/StepAsideLiL"
              className="text-foreground underline"
              target="_blank"
            >
              @StepAsideLiL
            </Link>
          </p>
        </div>

        <div className="from-foreground/10 absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t to-transparent"></div>
      </footer>
    </>
  );
}
