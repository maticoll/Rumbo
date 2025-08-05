"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Inicio" },
    { href: "/test-emocional", label: "Test Emocional" },
    { href: "/cursos", label: "Cursos" },
    { href: "/iniciar-sesion", label: "Iniciar Sesión" },
  ]

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            RUMBO
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.slice(0, -1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/iniciar-sesion">
              <Button variant={pathname === "/iniciar-sesion" ? "default" : "outline"} size="sm" className="ml-2">
                Iniciar Sesión
              </Button>
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <Link href="/iniciar-sesion">
              <Button variant="outline" size="sm">
                Iniciar Sesión
              </Button>
            </Link>
            <Button variant="ghost" size="sm">
              Menú
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
