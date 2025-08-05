import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { ChatMentor } from "@/components/chat-mentor"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RUMBO - Tu camino hacia el bienestar emocional",
  description: "Descubre tu estado emocional y encuentra cursos para mejorar tu bienestar",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <ChatMentor />
      </body>
    </html>
  )
}
