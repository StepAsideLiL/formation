import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Formation is a form building platform for collecting data from user",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="border-b py-5">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-10">
          <Logo />

          <div className="flex items-center gap-2">
            <Button className="cursor-pointer">Sign Up</Button>
            <Button variant={"secondary"} className="cursor-pointer">
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {children}
    </>
  );
}
