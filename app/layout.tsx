import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hey Iceland Booking Overview",
  description: "Internal dashboard for managing Hey Iceland bookings"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
