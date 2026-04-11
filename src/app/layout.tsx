import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Solaris Feed — React Native App Showcase",
  description:
    "A social feed iOS app running in a phone frame. Built with React Native + Expo.",
  openGraph: {
    title: "Solaris Feed — React Native App Showcase",
    description: "React Native social feed app preview.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-100 font-sans text-slate-900 antialiased transition-colors dark:bg-slate-950 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
