"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, ArrowRight, RotateCcw, BookOpen } from "lucide-react"
import Link from "next/link"

const emotionalQuestions = [
  {
    id: 3,
    question: "¿Con cuánta claridad sentís que tenés definidos tus intereses profesionales o vocacionales?",
    type: "preference",
    options: [
      { value: "1", label: "Nada claros", score: 1 },
      { value: "2", label: "Poco claros", score: 2 },
      { value: "3", label: "Algo definidos", score: 3 },
      { value: "4", label: "Bastante claros", score: 4 },
      { value: "5", label: "Totalmente claros", score: 5 },
    ],
  },
  {
    id: 4,
    question: "¿Sentís que tenés habilidades que te diferencian de las máquinas o la inteligencia artificial?",
    type: "preference",
    options: [
      { value: "1", label: "No", score: 1 },
      { value: "2", label: "Pocas", score: 2 },
      { value: "3", label: "Algunas", score: 3 },
      { value: "4", label: "Bastantes", score: 4 },
      { value: "5", label: "Muchas", score: 5 },
    ],
  },
  {
    id: 5,
    question: "¿Qué tan cómodo/a te sentís aprendiendo nuevas habilidades no técnicas (comunicación, empatía, adaptabilidad, etc.)?",
    type: "emotional",
    options: [
      { value: "1", label: "Nada cómodo/a", score: 1 },
      { value: "2", label: "Poco cómodo/a", score: 2 },
      { value: "3", label: "Neutral", score: 3 },
      { value: "4", label: "Bastante cómodo/a", score: 4 },
      { value: "5", label: "Muy cómodo/a", score: 5 },
    ],
  },
  {
    id: 6,
    question: "¿Sentís que tus emociones afectan tu motivación o toma de decisiones frente al futuro?",
    type: "emotional",
    options: [
      { value: "1", label: "Todo el tiempo", score: 1 },
      { value: "2", label: "Frecuentemente", score: 2 },
      { value: "3", label: "A veces", score: 3 },
      { value: "4", label: "Rara vez", score: 4 },
      { value: "5", label: "Nunca", score: 5 },
    ],
  },
  {
    id: 7,
    question: "¿Qué tan informado/a estás sobre cómo la automatización está cambiando el mercado laboral?",
    type: "preference",
    options: [
      { value: "1", label: "Nada informado/a", score: 1 },
      { value: "2", label: "Poco informado/a", score: 2 },
      { value: "3", label: "Algo informado/a", score: 3 },
      { value: "4", label: "Bastante informado/a", score: 4 },
      { value: "5", label: "Muy informado/a", score: 5 },
    ],
  },
  {
    id: 8,
    question: "¿Cuánto control sentís que tenés sobre tu futuro profesional?",
    type: "emotional",
    options: [
      { value: "1", label: "Nada de control", score: 1 },
      { value: "2", label: "Poco control", score: 2 },
      { value: "3", label: "Algo de control", score: 3 },
      { value: "4", label: "Bastante control", score: 4 },
      { value: "5", label: "Total control", score: 5 },
    ],
  },
  {
    id: 9,
    question: "¿Estás dispuesto/a a invertir tiempo en prepararte con cursos para fortalecer tus habilidades humanas?",
    type: "preference",
    options: [
      { value: "1", label: "No estoy interesado/a", score: 1 },
      { value: "2", label: "Tal vez", score: 2 },
      { value: "3", label: "Sí, pero poco tiempo", score: 3 },
      { value: "4", label: "Sí, con interés", score: 4 },
      { value: "5", label: "Sí, con mucho compromiso", score: 5 },
    ],
  },
  {
    id: 10,
    question: "¿Qué tan importante es para vos que tu futuro laboral esté alineado con tus valores o intereses personales?",
    type: "preference",
    options: [
      { value: "1", label: "Nada importante", score: 1 },
      { value: "2", label: "Poco importante", score: 2 },
      { value: "3", label: "Neutral", score: 3 },
      { value: "4", label: "Bastante importante", score: 4 },
      { value: "5", label: "Muy importante", score: 5 },
    ],
  },
]

// You can keep your preferenceQuestions as before, or update as needed.

const allQuestions = [...emotionalQuestions, ...preferenceQuestions]

export default function TestEmocional() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [currentSection, setCurrentSection] = useState<"emotional" | "preference">("emotional")

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [allQuestions[currentQuestion].id]: value,
    }))
  }

  const nextQuestion = () => {
    if (currentQuestion < allQuestions.length - 1) {
      const nextQuestionIndex = currentQuestion + 1
      const nextQuestion = allQuestions[nextQuestionIndex]

      // Cambiar sección si pasamos de emocional a preferencias
      if (nextQuestion.type === "preference" && currentSection === "emotional") {
        setCurrentSection("preference")
      }

      setCurrentQuestion(nextQuestionIndex)
    } else {
      setShowResults(true)
    }
  }

  const resetTest = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setCurrentSection("emotional")
  }

  const calculateResults = () => {
    // Calcular bienestar emocional
    const emotionalScore = emotionalQuestions.reduce((sum, question) => {
      const answer = answers[question.id]
      const option = question.options.find((opt) => opt.value === answer)
      return sum + (option?.score || 0)
    }, 0)

    const maxEmotionalScore = emotionalQuestions.length * 5
    const emotionalPercentage = (emotionalScore / maxEmotionalScore) * 100

    let emotionalLevel
    if (emotionalPercentage >= 80) {
      emotionalLevel = {
        level: "Excelente",
        color: "text-green-600",
        bgColor: "bg-green-50",
        description: "Tu bienestar emocional está en un nivel excelente.",
      }
    } else if (emotionalPercentage >= 60) {
      emotionalLevel = {
        level: "Bueno",
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        description: "Tu bienestar emocional está en un buen nivel.",
      }
    } else if (emotionalPercentage >= 40) {
      emotionalLevel = {
        level: "Regular",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        description: "Tu bienestar emocional necesita atención.",
      }
    } else {
      emotionalLevel = {
        level: "Necesita atención",
        color: "text-red-600",
        bgColor: "bg-red-50",
        description: "Tu bienestar emocional requiere atención inmediata.",
      }
    }

    // Calcular recomendaciones de cursos
    const courseRecommendations = preferenceQuestions
      .map((question) => {
        const answer = answers[question.id]
        const option = question.options.find((opt) => opt.value === answer)
        return option?.course
      })
      .filter(Boolean)

    // Encontrar el curso más recomendado
    const courseCounts = courseRecommendations.reduce((acc: Record<string, number>, course) => {
      if (course) {
        acc[course] = (acc[course] || 0) + 1
      }
      return acc
    }, {})

    const recommendedCourse =
      Object.entries(courseCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || "Automatización con Python"

    return {
      emotional: emotionalLevel,
      recommendedCourse,
      allRecommendations: [...new Set(courseRecommendations)],
    }
  }

  const progress = ((currentQuestion + 1) / allQuestions.length) * 100

  if (showResults) {
    const results = calculateResults()

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className={`${results.emotional.bgColor} border-2 mb-6`}>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className={`h-8 w-8 ${results.emotional.color}`} />
              </div>
              <CardTitle className="text-2xl">Resultados de tu Evaluación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Bienestar Emocional</h3>
                <h4 className={`text-2xl font-bold ${results.emotional.color} mb-2`}>{results.emotional.level}</h4>
                <p className="text-muted-foreground">{results.emotional.description}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-2 border-blue-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Curso Recomendado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">{results.recommendedCourse}</h3>
                <p className="text-muted-foreground mb-4">
                  Basado en tus respuestas, este curso se adapta perfectamente a tu perfil y objetivos.
                </p>
              </div>

              {results.allRecommendations.length > 1 && (
                <div>
                  <h4 className="font-semibold mb-3">Otros cursos que podrían interesarte:</h4>
                  <ul className="space-y-2">
                    {results.allRecommendations
                      .filter((course) => course !== results.recommendedCourse)
                      .slice(0, 3)
                      .map((course, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{course}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={resetTest} variant="outline" className="flex-1 bg-transparent">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Repetir Test
                </Button>
                <Button asChild className="flex-1">
                  <Link href="/cursos">
                    Ver Todos los Cursos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-4">
            {currentSection === "emotional" ? "Test de Bienestar Emocional" : "Preferencias de Automatización"}
          </h1>
          <p className="text-muted-foreground text-center mb-6">
            {currentSection === "emotional"
              ? "Responde honestamente para evaluar tu estado emocional actual"
              : "Cuéntanos sobre tus gustos para recomendarte el curso perfecto"}
          </p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                Pregunta {currentQuestion + 1} de {allQuestions.length}
              </span>
              <span>{Math.round(progress)}% completado</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{allQuestions[currentQuestion].question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[allQuestions[currentQuestion].id] || ""}
              onValueChange={handleAnswer}
              className="space-y-4"
            >
              {allQuestions[currentQuestion].options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0}
              >
                Anterior
              </Button>
              <Button onClick={nextQuestion} disabled={!answers[allQuestions[currentQuestion].id]}>
                {currentQuestion === allQuestions.length - 1 ? "Ver Resultados" : "Siguiente"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
