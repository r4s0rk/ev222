import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from '@/contexts/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Vestimenta Viva',
  description: 'Tu tienda de ropa en línea',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          {children}
          <Toaster />
        </CartProvider>
      </body>
    </html>
  )
}