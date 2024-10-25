"use client"

import * as React from "react"
import { Menu, Search, ShoppingCart, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useCart } from "@/contexts/CartContext"
import { Badge } from "@/components/ui/badge"

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')
  const { getCartCount } = useCart()
  const router = useRouter()

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/vestimentas", label: "Vestimentas" },
    { href: "/contacto", label: "Contacto" },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/vestimentas?search=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <header className="bg-background">
      {/* Top navbar */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex-1 md:flex-initial">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar..."
                className="pl-8 w-full md:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/login">
                <User className="h-5 w-5" />
                <span className="sr-only">Iniciar sesión</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Carrito</span>
                {getCartCount() > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 px-2 py-1 text-xs">
                    {getCartCount()}
                  </Badge>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Site name */}
      <div className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold">Vestimenta Viva</h1>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="bg-sky-400">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-16">
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-sky-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Abrir menú</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                  <nav className="flex flex-col gap-4">
                    {links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="block px-3 py-2 rounded-md text-base font-medium hover:bg-sky-100"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}