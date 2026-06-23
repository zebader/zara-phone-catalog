import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/shared/ui";

export const metadata: Metadata = {
  title: "Zara challenge",
  description: "Aplicación web enfocada en la visualización, búsqueda y gestión de un catálogo de teléfonos móviles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
