import '@/style/globals.css'

import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Toaster } from "sonner"
import NextTopLoader from "nextjs-toploader"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "L-RAB",
  description: "LMS Mufrodat Arabiyyah",
  icons: {
    icon: [{ rel: "icon", url: "/images/logo.png" }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextTopLoader color="#29D" showSpinner={false} />
        <Toaster richColors position="top-right" />
        {/* <NextTopLoader
          color="#0164ef"
          initialPosition={0.08}
          crawlSpeed={500}
          height={2}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={500}
          shadow="0 0 10px #3488fe,0 0 5px #3488fe"
        /> */}
        {children}
      </body>
    </html>
  )
}