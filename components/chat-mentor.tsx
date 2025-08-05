"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, X, Bot, User, Sparkles, BookOpen, Target, Lightbulb } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "user" | "mentor"
  timestamp: Date
  type?: "text" | "suggestion" | "course-recommendation"
  suggestions?: string[]
  courseRecommendation?: {
    title: string
    description: string
    link: string
  }
}

interface QuickAction {
  id: string
  label: string
  icon: React.ReactNode
  message: string
}

export function ChatMentor() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! 👋 Soy tu mentor virtual de RUMBO. Estoy aquí para ayudarte a encontrar el curso perfecto y resolver todas tus dudas sobre automatización. ¿En qué puedo ayudarte hoy?",
      sender: "mentor",
      timestamp: new Date(),
      type: "suggestion",
      suggestions: [
        "¿Qué curso me recomiendas?",
        "Soy principiante, ¿por dónde empiezo?",
        "Quiero automatizar mi trabajo",
        "¿Qué es RPA?",
      ],
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const quickActions: QuickAction[] = [
    {
      id: "courses",
      label: "Ver Cursos",
      icon: <BookOpen className="h-4 w-4" />,
      message: "Muéstrame todos los cursos disponibles",
    },
    {
      id: "test",
      label: "Hacer Test",
      icon: <Target className="h-4 w-4" />,
      message: "Quiero hacer el test para encontrar mi curso ideal",
    },
    {
      id: "help",
      label: "Ayuda",
      icon: <Lightbulb className="h-4 w-4" />,
      message: "Necesito ayuda para empezar",
    },
  ]

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = (messageText?: string) => {
    const textToSend = messageText || inputMessage
    if (textToSend.trim() === "") return

    const newUserMessage: Message = {
      id: messages.length + 1,
      text: textToSend,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newUserMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simular respuesta del mentor con delay más realista
    setTimeout(
      () => {
        const mentorResponse = generateEnhancedMentorResponse(textToSend)
        const newMentorMessage: Message = {
          id: messages.length + 2,
          text: mentorResponse.text,
          sender: "mentor",
          timestamp: new Date(),
          type: mentorResponse.type,
          suggestions: mentorResponse.suggestions,
          courseRecommendation: mentorResponse.courseRecommendation,
        }
        setMessages((prev) => [...prev, newMentorMessage])
        setIsTyping(false)
      },
      1500 + Math.random() * 1000,
    ) // Delay variable más natural
  }

  const generateEnhancedMentorResponse = (
    userMessage: string,
  ): {
    text: string
    type?: "text" | "suggestion" | "course-recommendation"
    suggestions?: string[]
    courseRecommendation?: {
      title: string
      description: string
      link: string
    }
  } => {
    const message = userMessage.toLowerCase()

    // Respuestas sobre cursos específicos
    if (message.includes("python")) {
      return {
        text: "¡Excelente elección! 🐍 Python es el lenguaje más popular para automatización. Nuestro curso 'Automatización con Python' es perfecto para ti. Aprenderás desde scripts básicos hasta bots avanzados.",
        type: "course-recommendation",
        courseRecommendation: {
          title: "Automatización con Python",
          description: "8 semanas • Principiante • 32 horas",
          link: "/cursos/automatizacion-python",
        },
        suggestions: [
          "¿Qué incluye el curso de Python?",
          "¿Necesito experiencia previa?",
          "¿Cuánto cuesta el curso?",
          "Ver otros cursos",
        ],
      }
    }

    if (message.includes("rpa") || message.includes("uipath")) {
      return {
        text: "¡RPA es el futuro! 🤖 La Automatización Robótica de Procesos está revolucionando las empresas. UiPath es la herramienta líder del mercado y nuestro curso te convertirá en un experto.",
        type: "course-recommendation",
        courseRecommendation: {
          title: "RPA con UiPath",
          description: "10 semanas • Intermedio • 40 horas",
          link: "/cursos/rpa-uipath",
        },
        suggestions: [
          "¿Qué empresas usan RPA?",
          "¿Es difícil aprender UiPath?",
          "¿Qué salario tiene un especialista RPA?",
          "Comparar con otros cursos",
        ],
      }
    }

    // Respuestas para principiantes
    if (message.includes("principiante") || message.includes("empezar") || message.includes("comenzar")) {
      return {
        text: "¡Perfecto para empezar! 🚀 Te recomiendo comenzar con nuestro test de evaluación para encontrar el curso ideal según tu perfil. Si prefieres algo sin programación, 'Power Automate' es excelente para principiantes.",
        type: "suggestion",
        suggestions: [
          "Hacer el test de evaluación",
          "Ver curso de Power Automate",
          "¿Qué es la automatización?",
          "Cursos para principiantes",
        ],
      }
    }

    // Respuestas sobre trabajo y carrera
    if (message.includes("trabajo") || message.includes("carrera") || message.includes("empleo")) {
      return {
        text: "¡La automatización es una habilidad súper demandada! 💼 Según estudios recientes, los profesionales en automatización tienen un 40% más de oportunidades laborales. ¿En qué sector trabajas? Puedo recomendarte el curso más relevante.",
        type: "suggestion",
        suggestions: ["Trabajo en finanzas", "Soy desarrollador", "Trabajo en marketing", "Soy estudiante"],
      }
    }

    // Respuestas sobre el test
    if (message.includes("test") || message.includes("evaluación") || message.includes("recomendación")) {
      return {
        text: "¡El test de evaluación es genial! 📊 En solo 10 preguntas analizamos tu perfil emocional y profesional para recomendarte el curso perfecto. Toma unos 5 minutos y es súper preciso.",
        type: "suggestion",
        suggestions: [
          "Empezar el test ahora",
          "¿Qué evalúa exactamente?",
          "¿Es gratis el test?",
          "Ver ejemplo de resultados",
        ],
      }
    }

    // Respuestas sobre precios y costos
    if (message.includes("precio") || message.includes("costo") || message.includes("cuánto")) {
      return {
        text: "💰 Nuestros cursos van desde $199 hasta $399, pero la inversión se recupera rápido. Los profesionales en automatización ganan en promedio 30% más. Además, ofrecemos planes de pago y becas.",
        type: "suggestion",
        suggestions: ["Ver planes de pago", "¿Hay becas disponibles?", "¿Incluye certificado?", "Comparar precios"],
      }
    }

    // Respuestas sobre certificados
    if (message.includes("certificado") || message.includes("diploma")) {
      return {
        text: "🏆 ¡Sí! Todos nuestros cursos incluyen un certificado oficial de RUMBO. Es reconocido por empresas líderes y puedes agregarlo a tu LinkedIn. También incluimos badge digital verificable.",
        type: "suggestion",
        suggestions: [
          "Ver ejemplo de certificado",
          "¿Cómo verificar autenticidad?",
          "¿Se puede compartir en LinkedIn?",
          "¿Tiene validez internacional?",
        ],
      }
    }

    // Respuesta por defecto más inteligente
    return {
      text: "Entiendo tu consulta 🤔 Me encantaría ayudarte mejor. ¿Podrías contarme más específicamente qué buscas? Por ejemplo: ¿quieres aprender automatización para tu trabajo actual, cambiar de carrera, o simplemente por curiosidad?",
      type: "suggestion",
      suggestions: [
        "Quiero cambiar de carrera",
        "Automatizar mi trabajo actual",
        "Aprender por curiosidad",
        "No estoy seguro",
      ],
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion)
  }

  const handleQuickAction = (action: QuickAction) => {
    sendMessage(action.message)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
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
          className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg transition-all duration-200 hover:scale-105"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 h-[500px] animate-in slide-in-from-bottom-2">
          <Card className="h-full flex flex-col shadow-xl border-2">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg py-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span>Mentor Virtual</span>
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="text-xs opacity-80">Potenciado por IA</div>
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 p-0 flex flex-col">
              {/* Quick Actions */}
              <div className="p-3 border-b bg-gray-50">
                <div className="flex gap-2">
                  {quickActions.map((action) => (
                    <Button
                      key={action.id}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action)}
                      className="text-xs"
                    >
                      {action.icon}
                      <span className="ml-1">{action.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg"
                            : "bg-white border rounded-lg"
                        }`}
                      >
                        <div className="p-3">
                          <div className="flex items-start gap-2">
                            {message.sender === "mentor" && (
                              <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Bot className="h-3 w-3 text-white" />
                              </div>
                            )}
                            {message.sender === "user" && <User className="h-4 w-4 mt-0.5 flex-shrink-0 opacity-80" />}
                            <div className="flex-1">
                              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>

                              {/* Course Recommendation */}
                              {message.courseRecommendation && (
                                <div className="mt-3 p-3 bg-blue-50 rounded-lg border">
                                  <h4 className="font-semibold text-blue-900 text-sm">
                                    {message.courseRecommendation.title}
                                  </h4>
                                  <p className="text-xs text-blue-700 mt-1">
                                    {message.courseRecommendation.description}
                                  </p>
                                  <Button size="sm" className="mt-2 text-xs" asChild>
                                    <a href={message.courseRecommendation.link}>Ver Curso</a>
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Suggestions */}
                        {message.suggestions && (
                          <div className="px-3 pb-3">
                            <div className="flex flex-wrap gap-1">
                              {message.suggestions.map((suggestion, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="cursor-pointer hover:bg-blue-50 text-xs"
                                  onClick={() => handleSuggestionClick(suggestion)}
                                >
                                  {suggestion}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border rounded-lg p-3 max-w-[85%]">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <Bot className="h-3 w-3 text-white" />
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                            <span className="text-sm text-gray-500 ml-2">Escribiendo...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="p-4 border-t bg-gray-50/50">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    sendMessage()
                  }}
                  className="flex gap-2"
                >
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Escribe tu mensaje..."
                    className="flex-1 bg-white"
                    disabled={isTyping}
                  />
                  <Button
                    type="submit"
                    size="sm"
                    disabled={isTyping || !inputMessage.trim()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Presiona Enter para enviar • Shift+Enter para nueva línea
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
