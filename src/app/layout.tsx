import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AuthGate } from "@/components/AuthGate";
import { ConditionalFooter } from "@/components/ConditionalFooter";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | LMS CISDI",
    default: "LMS CISDI",
  },
  description: "Platform pembelajaran digital CISDI — onboarding dan materi pengembangan SDM.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#f5f5f7] text-[#1d1d1f] dark:bg-black dark:text-[#f5f5f7]">
        <AuthGate>{children}</AuthGate>
        <ConditionalFooter />
      </body>
    </html>
  );
}
