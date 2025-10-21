import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
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
        className={`${poppins.variable} font-sans antialiased bg-white text-gray-900`}
      >
        <Sidebar />

        <div className="ml-64">
          <Header />
          <main className="p-6 pt-24">{children}</main>
        </div>
      </body>
    </html>
  );
}
