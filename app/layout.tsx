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
    <html lang="en" className='bg-card/90 '>
      <body suppressHydrationWarning={true} className={` ${fontSans.className} w-full  bg-card/90 `}>

          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >


          <MainHeader session={session}/>
            <main className="w-full min-h-5xl flex justify-center scrollbar-gutter-stable ">
              <div className="  px-4 w-[95%] lg:w-[90%] bg-background min-h-screen">

              {session ? children :
                <UnauthorizedButton
                home
                />}
              <Toaster richColors />
                </div>
            </main>
            {/* <MainFooter /> */}

          </ThemeProvider>

      </body>
    </html>
  );
}
