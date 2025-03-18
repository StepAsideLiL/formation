import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

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
