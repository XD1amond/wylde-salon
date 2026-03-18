import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ChatWidget } from "@/components/chat-widget";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wylde Salon | Modern Hair Studio",
  description:
    "Wylde Salon in Gilbert, AZ. Book appointments by date, service, and stylist with an AI assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen">
          <SiteHeader />
          {children}
          <SiteFooter />
          <ChatWidget />
        </div>
      </body>
    </html>
  );
}
