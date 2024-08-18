import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import ContextLayout from "./layouts/ContextLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Тестовое задание Yoldi",
  description: "User List Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextLayout>{children}</ContextLayout>
      </body>
    </html>
  );
}
