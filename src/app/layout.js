import localFont from "next/font/local";
import "./globals.css";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Tepoz",
  description: "Tus finanzas protegidas con IA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="md:hidden">{children}</div>
        <div className="hidden  bg-gray-300 h-[100vh] w-[500] md:flex items-center justify-center">
          <div>
            <p className="text-3xl font-bold   text-center">
              Lo sentimos, esta pagina solo puede verse desde un dispositivo
              mobile
            </p>
            <div className="flex justify-center">
              <img
                className="w-80"
                src="/mobile.png"
                alt="Dispositivo movile"
              />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
