import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/shared/ui";
import { CartProvider } from "@/shared/contexts";

export const metadata: Metadata = {
  title: "Zara challenge",
  description: "Web application focused on browsing, searching, and managing a mobile phone catalog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <NavBar />
          <main id="main-content">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
