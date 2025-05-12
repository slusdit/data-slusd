import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import UnauthorizedButton from '@/app/components/UnauthorizedButton'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/app/components/providers/ThemeProvider'
import MainFooter from '@/app/components/MainFooter'
import MainHeader from "./components/MainHeader";
import SessionProvider from "@/app/components/providers/SessionProvider";
import { auth } from "@/auth";
import {
  TooltipProvider,
} from "@/components/ui/tooltip"
import { AGGridProvider } from "./components/providers/AGGridProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SLUSD Data",
  description: "SLUSD Data",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.className} w-full bg-card/90 flex flex-col min-h-screen`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider
            delayDuration={1800}
          >
            <AGGridProvider>
              <div className="sticky top-0 z-50">
                <MainHeader session={session} />
              </div>
              <main className="flex-grow flex justify-center overflow-y-auto">
                <div className="px-4 w-[95%] lg:w-[90%] bg-background">
                  {session ? children :
                    <UnauthorizedButton
                      home
                    />
                  }
                </div>
              </main>
            </AGGridProvider>
          </TooltipProvider>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}