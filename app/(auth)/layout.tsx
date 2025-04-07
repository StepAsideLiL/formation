export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="flex h-screen w-full">
        <div className="w-full">Sign</div>

        <div className="w-full">{children}</div>
      </main>
    </>
  );
}
