"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface Product {
  id: number
  name: string
  price: number
  image: string
}

type CartItem = Product & {
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setItems(JSON.parse(storedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addToCart = (product: Product) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  const clearCart = () => {
    setItems([])
  }

  const getCartTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, getCartTotal, getCartCount }}>
      {children}
    </CartContext.Provider>
  )
}

// Export CartContext
export { CartContext }