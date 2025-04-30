import Logo from "@/components/Logo";
import SignOutBtn from "@/components/SignOutBtn";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/auth/sign-in");
  }

  return (
    <>
      <header className="border-b py-5">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-10 md:px-0">
          <Logo />

          <SignOutBtn />
        </div>
      </header>

      {children}
    </>
  );
}
