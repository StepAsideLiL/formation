import Logo from "@/components/Logo";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="border-b py-5">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-center px-10 md:px-0">
          <Logo />
        </div>
      </header>

      {children}
    </>
  );
}
