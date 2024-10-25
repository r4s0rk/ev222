"use client"

import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Minus, Plus, Trash2 } from "lucide-react"

export default function CartPage() {
  const { items, addToCart, removeFromCart, clearCart, getCartTotal } = useCart()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Carrito de Compras</h1>
        <p>Tu carrito está vacío.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Carrito de Compras</h1>
      <div className="grid gap-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4 flex items-center">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
              <div className="flex-grow">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-muted-foreground">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center">
                <Button variant="outline" size="icon" onClick={() => removeFromCart(item.id)}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-2">{item.quantity}</span>
                <Button variant="outline" size="icon" onClick={() => addToCart(item)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Resumen del Pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">Total: ${getCartTotal().toFixed(2)}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={clearCart}>
            <Trash2 className="mr-2 h-4 w-4" />
            Vaciar Carrito
          </Button>
          <Button>Proceder al Pago</Button>
        </CardFooter>
      </Card>
    </div>
  )
}