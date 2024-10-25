"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [message, setMessage] = React.useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Aquí iría la lógica para enviar el mensaje de contacto
    console.log("Enviando mensaje:", { name, email, phone, message })
    toast({
      title: "Mensaje enviado",
      description: "Gracias por contactarnos. Te responderemos pronto.",
    })
    router.push("/")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Contáctanos</CardTitle>
          <CardDescription className="text-center">
            Envíanos un mensaje y te responderemos lo antes posible
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input
                id="name"
                placeholder="Juan Pérez"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Número de teléfono</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="123-456-7890"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Mensaje</Label>
              <Textarea
                id="message"
                placeholder="Escribe tu mensaje aquí..."
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Enviar mensaje
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}