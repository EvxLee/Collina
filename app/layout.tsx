import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Debate Referee",
  description: "A live AI referee for spoken arguments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
