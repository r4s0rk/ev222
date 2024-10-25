"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/contexts/CartContext"
import { useToast } from "@/hooks/use-toast"
import { products, Product } from '@/lib/products'

export default function Home() {
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    toast({
      title: "Producto añadido",
      description: `${product.name} ha sido añadido al carrito.`,
    })
  }

  const featuredProducts = products.slice(0, 4) 

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Bienvenido a Vestimenta Viva</h1>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Productos Destacados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-4">
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4 rounded" />
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-muted-foreground">${product.price.toFixed(2)}</p>
                <Button className="w-full mt-2" onClick={() => handleAddToCart(product)}>
                  Añadir al carrito
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}