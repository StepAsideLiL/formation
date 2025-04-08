import Logo from "@/components/Logo";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="flex h-screen w-full">
        <div className="relative w-full">
          <Image
            src={"/img/auth.webp"}
            alt="Auth Page Image"
            width={1000}
            height={1000}
            className="w-full"
          />

          <div className="to-background from-background/50 absolute inset-0 z-10 bg-gradient-to-r"></div>

          <div className="absolute inset-0 z-20 flex h-screen items-center justify-center">
            <div className="w-xl">
              <Logo fill="white" />
              <h1 className="text-4xl text-balance">
                Sign In to Formation to get the best experience
              </h1>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-center">
          {children}
        </div>
      </main>
    </>
  );
}
