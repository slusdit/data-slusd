import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { NextRequest } from 'next/server'
// import { serverAuth } from '@/auth'
import UnauthorizedButton from '@/app/components/UnauthorizedButton'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/app/components/providers/ThemeProvider'
import MainFooter from '@/app/components/MainFooter'

import MainHeader from "./components/MainHeader";
import SessionProvider from "@/app/components/providers/SessionProvider";
import { useSession } from "next-auth/react";
import { auth } from "@/auth";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {

  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
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
  // const session = await serverAuth()
  const session = await auth()

  return (
<html lang="en" className="bg-card/90">
      <body suppressHydrationWarning={true} className={`${fontSans.className} w-full bg-card/90 flex flex-col min-h-screen`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
          >
          <TooltipProvider
            delayDuration={1200}

          >
          <div className="sticky top-0 z-50">
            <MainHeader session={session}/>
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

          </TooltipProvider>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
