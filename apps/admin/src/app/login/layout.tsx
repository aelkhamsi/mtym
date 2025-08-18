import Image from "next/image";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-300">
      <div className="h-fit w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
        <div className="flex flex-col items-center justify-center py-10 space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <a href="/login">
            <Image
              src="/mm_circle.png"
              alt="Logo"
              className="h-10 w-10 rounded-full"
              width={20}
              height={20}
            />
          </a>

          <>
            <h3 className="font-display text-2xl font-bold">
              Se connecter
            </h3>

            <div className="w-full space-y-5">
              {children}
            </div>
          </>
        </div>
      </div>
    </div>
  );
}
