import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/layout/AuthProvider";
import { Toaster } from "@/components/ui/Toaster";

export const metadata: Metadata = {
  title: "Property CRM | Pakistan Real Estate",
  description: "Professional CRM for property dealers in Pakistan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
