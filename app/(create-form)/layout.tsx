import Logo from "@/components/Logo";
import { Metadata } from "next";
import PublishBtn from "@/components/PublishBtn";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Create New Form",
  description: "Create new form by adding different types of fields",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const res = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <header className="border-b py-5">
        <div className="flex items-center justify-between px-5">
          <Logo />

          <div>
            {res?.user.id ? (
              <PublishBtn userId={res?.user?.id} />
            ) : (
              <Button asChild>
                <Link href={"/auth/sign-in"}>Publish</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      {children}
    </>
  );
}
