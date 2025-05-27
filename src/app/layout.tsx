import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Bryan & Genesis - Nuestra Boda",
  description: "Te invitamos a celebrar nuestra boda el 21 de junio de 2025",
  openGraph: {
    title: "Bryan & Genesis - Nuestra Boda",
    description: "Te invitamos a celebrar nuestra boda el 21 de junio de 2025",
    url: "https://bryan-genesis.vercel.app",
    siteName: "Bryan & Genesis",
    images: [
      {
        url: "https://res.cloudinary.com/djluqrprg/image/upload/f_auto,q_auto/v1/boda/j2unvhxrri37ct4z4psu",
        width: 1200,
        height: 630,
        alt: "Bryan & Genesis - Nuestra Boda",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      </head>
      <body className={`font-sans ${inter.variable}`}>{children}</body>
       <Toaster />
    </html>
  )
}
