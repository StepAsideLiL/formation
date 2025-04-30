import Logo from "@/components/Logo";
import SignOutBtn from "@/components/SignOutBtn";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
