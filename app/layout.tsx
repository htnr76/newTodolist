import type { Metadata } from "next";
import "./globals.css";
import MainHeader from "./components/MainHeader";
export const metadata: Metadata = {
  title: "TaskMaster",
  description: "Keeps track of your tasks!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0E172A]">
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
