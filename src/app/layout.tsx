import { AppShell } from "@/components/AppShell";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Konta",
  description: "Interface web moderne de Konta",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${poppins.variable} font-sans antialiased bg-white text-gray-900 min-h-screen overflow-x-hidden`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
