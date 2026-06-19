import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
