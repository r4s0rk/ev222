"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useCart } from "@/contexts/CartContext"
import { useToast } from "@/hooks/use-toast"
import { products, categories, Product } from '@/lib/products'

export default function VestimentasPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    toast({
      title: "Producto añadido",
      description: `${product.name} ha sido añadido al carrito.`,
    })
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Nuestras Vestimentas</h1>
      
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md mx-auto"
        />
      </div>

      {categories.map(category => {
        const categoryProducts = filteredProducts.filter(product => product.category === category)
        if (categoryProducts.length === 0) return null

        return (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categoryProducts.map((product) => (
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
        )
      })}
    </main>
  )
}