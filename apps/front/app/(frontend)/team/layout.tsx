
export default async function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="pt-24 w-full lg:w-3/4 px-5 lg:px-0">
      {children}
    </main>
  );
}
