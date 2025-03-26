import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Form",
  description: "Create new form by adding different types of fields",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="border-b py-5">
        <div className="flex items-center justify-between px-5">
          <Logo />

          <div>
            <Button variant={"outline"} className="cursor-pointer">
              Preview
            </Button>
          </div>
        </div>
      </header>

      {children}
    </>
  );
}
