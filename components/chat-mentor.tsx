"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, X, Bot, User } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "user" | "mentor"
  timestamp: Date
}

export function ChatMentor() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! Soy tu mentor virtual de RUMBO. ¿En qué puedo ayudarte hoy? Puedo orientarte sobre nuestros cursos de automatización o resolver dudas sobre tu desarrollo profesional.",
      sender: "mentor",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const sendMessage = () => {
    if (inputMessage.trim() === "") return

    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newUserMessage])
    setInputMessage("")

    // Simular respuesta del mentor
    setTimeout(() => {
      const mentorResponse = generateMentorResponse(inputMessage)
      const newMentorMessage: Message = {
        id: messages.length + 2,
        text: mentorResponse,
        sender: "mentor",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, newMentorMessage])
    }, 1000)
  }

  const generateMentorResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("curso") || message.includes("automatización")) {
      return "Te recomiendo empezar con nuestro test de evaluación para encontrar el curso perfecto para ti. ¿Has completado ya el test emocional y de preferencias?"
    }

    if (message.includes("python")) {
      return "¡Excelente elección! Python es ideal para automatización. Nuestro curso 'Automatización con Python' cubre desde scripts básicos hasta bots avanzados. ¿Tienes experiencia previa programando?"
    }

    if (message.includes("rpa") || message.includes("uipath")) {
      return "RPA es muy demandado en empresas. El curso de UiPath te enseñará a automatizar procesos empresariales complejos. Es perfecto si trabajas en un entorno corporativo."
    }

    if (message.includes("principiante") || message.includes("empezar")) {
      return "Para principiantes recomiendo 'Power Automate para Empresas' - no requiere programación. También puedes empezar con 'Automatización con Python' si quieres aprender a programar."
    }

    if (message.includes("trabajo") || message.includes("carrera")) {
      return "La automatización es una habilidad muy valorada. ¿En qué sector trabajas? Puedo recomendarte el curso más relevante para tu industria."
    }

    return "Entiendo tu consulta. ¿Podrías contarme más detalles sobre lo que buscas? Estoy aquí para ayudarte a encontrar el mejor camino en automatización."
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 h-96 animate-in slide-in-from-bottom-2">
          <Card className="h-full flex flex-col shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Mentor Virtual
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 p-0 flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {message.sender === "mentor" && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                          {message.sender === "user" && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Escribe tu mensaje..."
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} size="sm">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
