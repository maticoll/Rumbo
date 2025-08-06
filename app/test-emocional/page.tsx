"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, ArrowRight, RotateCcw, BookOpen, Lightbulb, Target, TrendingUp, Heart, Brain } from 'lucide-react'
import Link from "next/link"

const emotionalQuestions = [
  {
    id: 4,
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
    id: 5,
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
]

const preferenceQuestions = [
  {
    id: 1,
    question: "¿Qué emociones predominan cuando pensás en tu futuro laboral?",
    type: "preference",
    options: [
      { value: "1", label: "Ansiedad / miedo", score: 1, course: "Gestión Emocional y Resiliencia" },
      { value: "2", label: "Confusión / incertidumbre", score: 2, course: "Autoconocimiento y Propósito" },
      { value: "3", label: "Neutralidad", score: 3, course: "Comunicación Efectiva" },
      { value: "4", label: "Curiosidad", score: 4, course: "Adaptabilidad y Cambio" },
      { value: "5", label: "Entusiasmo / motivación", score: 5, course: "Liderazgo y Visión Estratégica" },
    ],
  },
  {
    id: 2,
    question: "¿Qué tan preparado/a te sentís para los cambios que traerán la automatización y la inteligencia artificial al mundo del trabajo?",
    type: "preference",
    options: [
      { value: "1", label: "Nada preparado/a", score: 1, course: "Adaptabilidad y Cambio" },
      { value: "2", label: "Poco preparado/a", score: 2, course: "Gestión Emocional y Resiliencia" },
      { value: "3", label: "Algo preparado/a", score: 3, course: "Comunicación Efectiva" },
      { value: "4", label: "Bastante preparado/a", score: 4, course: "Liderazgo y Visión Estratégica" },
      { value: "5", label: "Totalmente preparado/a", score: 5, course: "Innovación y Creatividad" },
    ],
  },
  {
    id: 3,
    question: "¿Con cuánta claridad sentís que tenés definidos tus intereses profesionales o vocacionales?",
    type: "preference",
    options: [
      { value: "1", label: "Nada claros", score: 1, course: "Autoconocimiento y Propósito" },
      { value: "2", label: "Poco claros", score: 2, course: "Autoconocimiento y Propósito" },
      { value: "3", label: "Algo definidos", score: 3, course: "Comunicación Efectiva" },
      { value: "4", label: "Bastante claros", score: 4, course: "Liderazgo y Visión Estratégica" },
      { value: "5", label: "Totalmente claros", score: 5, course: "Innovación y Creatividad" },
    ],
  },
  {
    id: 6,
    question: "¿Sentís que tenés habilidades que te diferencian de las máquinas o la inteligencia artificial?",
    type: "preference",
    options: [
      { value: "1", label: "No", score: 1, course: "Gestión Emocional y Resiliencia" },
      { value: "2", label: "Pocas", score: 2, course: "Comunicación Efectiva" },
      { value: "3", label: "Algunas", score: 3, course: "Adaptabilidad y Cambio" },
      { value: "4", label: "Bastantes", score: 4, course: "Liderazgo y Visión Estratégica" },
      { value: "5", label: "Muchas", score: 5, course: "Innovación y Creatividad" },
    ],
  },
  {
    id: 8,
    question: "¿Qué tan informado/a estás sobre cómo la automatización está cambiando el mercado laboral?",
    type: "preference",
    options: [
      { value: "1", label: "Nada informado/a", score: 1, course: "Adaptabilidad y Cambio" },
      { value: "2", label: "Poco informado/a", score: 2, course: "Gestión Emocional y Resiliencia" },
      { value: "3", label: "Algo informado/a", score: 3, course: "Comunicación Efectiva" },
      { value: "4", label: "Bastante informado/a", score: 4, course: "Liderazgo y Visión Estratégica" },
      { value: "5", label: "Muy informado/a", score: 5, course: "Innovación y Creatividad" },
    ],
  },
  {
    id: 9,
    question: "¿Estás dispuesto/a a invertir tiempo en prepararte con cursos para fortalecer tus habilidades humanas?",
    type: "preference",
    options: [
      { value: "1", label: "No estoy interesado/a", score: 1, course: "Autoconocimiento y Propósito" },
      { value: "2", label: "Tal vez", score: 2, course: "Gestión Emocional y Resiliencia" },
      { value: "3", label: "Sí, pero poco tiempo", score: 3, course: "Comunicación Efectiva" },
      { value: "4", label: "Sí, con interés", score: 4, course: "Adaptabilidad y Cambio" },
      { value: "5", label: "Sí, con mucho compromiso", score: 5, course: "Liderazgo y Visión Estratégica" },
    ],
  },
  {
    id: 10,
    question: "¿Qué tan importante es para vos que tu futuro laboral esté alineado con tus valores o intereses personales?",
    type: "preference",
    options: [
      { value: "1", label: "Nada importante", score: 1, course: "Comunicación Efectiva" },
      { value: "2", label: "Poco importante", score: 2, course: "Adaptabilidad y Cambio" },
      { value: "3", label: "Neutral", score: 3, course: "Gestión Emocional y Resiliencia" },
      { value: "4", label: "Bastante importante", score: 4, course: "Autoconocimiento y Propósito" },
      { value: "5", label: "Muy importante", score: 5, course: "Autoconocimiento y Propósito" },
    ],
  },
]

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
        description: "Tenés una excelente base emocional para enfrentar desafíos profesionales.",
      }
    } else if (emotionalPercentage >= 60) {
      emotionalLevel = {
        level: "Bueno",
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        description: "Tu bienestar emocional está en un buen nivel para el crecimiento profesional.",
      }
    } else if (emotionalPercentage >= 40) {
      emotionalLevel = {
        level: "En desarrollo",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        description: "Hay oportunidades para fortalecer tu bienestar emocional.",
      }
    } else {
      emotionalLevel = {
        level: "Necesita atención",
        color: "text-red-600",
        bgColor: "bg-red-50",
        description: "Es importante trabajar en tu bienestar emocional como base para el crecimiento.",
      }
    }

    // Calcular recomendaciones de cursos basado en las nuevas preguntas
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
      Object.entries(courseCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || "Autoconocimiento y Propósito"

    // Generar razones de recomendación basadas en las nuevas preguntas
    const reasons = generateRecommendationReasons(answers, recommendedCourse)

    return {
      emotional: emotionalLevel,
      recommendedCourse,
      allRecommendations: [...new Set(courseRecommendations)],
      reasons,
    }
  }

  const generateRecommendationReasons = (answers: Record<number, string>, recommendedCourse: string) => {
    const reasons = []

    // Analizar respuestas específicas
    const futureEmotions = answers[1] // Pregunta sobre emociones del futuro laboral
    const preparationLevel = answers[2] // Preparación para automatización
    const clarityLevel = answers[3] // Claridad de intereses
    const humanSkills = answers[6] // Habilidades que diferencian de IA
    const informationLevel = answers[8] // Información sobre automatización
    const commitment = answers[9] // Disposición a invertir tiempo
    const valuesAlignment = answers[10] // Importancia de alineación con valores

    // Razones basadas en emociones sobre el futuro laboral
    if (futureEmotions === "1" && recommendedCourse.includes("Gestión Emocional")) {
      reasons.push({
        icon: <Heart className="h-5 w-5 text-red-500" />,
        title: "Necesidad de gestión emocional",
        description: "Experimentás ansiedad sobre tu futuro laboral. Este curso te ayudará a manejar esas emociones de manera constructiva.",
      })
    }

    if (futureEmotions === "2" && recommendedCourse.includes("Autoconocimiento")) {
      reasons.push({
        icon: <Brain className="h-5 w-5 text-purple-500" />,
        title: "Claridad en tu propósito",
        description: "La confusión sobre tu futuro indica que necesitás mayor autoconocimiento para definir tu camino.",
      })
    }

    if (futureEmotions === "4" || futureEmotions === "5") {
      reasons.push({
        icon: <TrendingUp className="h-5 w-5 text-green-500" />,
        title: "Actitud positiva hacia el futuro",
        description: "Tu curiosidad y entusiasmo son fortalezas que podés potenciar para liderar cambios.",
      })
    }

    // Razones basadas en preparación para automatización
    if ((preparationLevel === "1" || preparationLevel === "2") && recommendedCourse.includes("Adaptabilidad")) {
      reasons.push({
        icon: <Target className="h-5 w-5 text-orange-500" />,
        title: "Necesidad de adaptabilidad",
        description: "Te sentís poco preparado/a para los cambios tecnológicos. Este curso te dará herramientas para adaptarte.",
      })
    }

    // Razones basadas en claridad de intereses
    if ((clarityLevel === "1" || clarityLevel === "2") && recommendedCourse.includes("Autoconocimiento")) {
      reasons.push({
        icon: <Lightbulb className="h-5 w-5 text-yellow-500" />,
        title: "Exploración de intereses",
        description: "Tus intereses profesionales no están claros. Este curso te ayudará a descubrir tu propósito.",
      })
    }

    // Razones basadas en habilidades humanas
    if ((humanSkills === "1" || humanSkills === "2") && (recommendedCourse.includes("Comunicación") || recommendedCourse.includes("Gestión Emocional"))) {
      reasons.push({
        icon: <Heart className="h-5 w-5 text-blue-500" />,
        title: "Desarrollo de habilidades humanas",
        description: "Necesitás fortalecer las habilidades que te diferencian de la inteligencia artificial.",
      })
    }

    // Razones basadas en compromiso con el aprendizaje
    if ((commitment === "4" || commitment === "5") && recommendedCourse.includes("Liderazgo")) {
      reasons.push({
        icon: <TrendingUp className="h-5 w-5 text-green-500" />,
        title: "Alto compromiso con el crecimiento",
        description: "Tu disposición a invertir tiempo en desarrollo te posiciona para roles de liderazgo.",
      })
    }

    // Razones basadas en alineación con valores
    if ((valuesAlignment === "4" || valuesAlignment === "5") && recommendedCourse.includes("Autoconocimiento")) {
      reasons.push({
        icon: <Heart className="h-5 w-5 text-purple-500" />,
        title: "Búsqueda de propósito",
        description: "Valorás la alineación con tus valores. Este curso te ayudará a encontrar tu propósito profesional.",
      })
    }

    // Si no hay suficientes razones específicas, agregar razones generales
    if (reasons.length < 3) {
      if (recommendedCourse.includes("Comunicación")) {
        reasons.push({
          icon: <Target className="h-5 w-5 text-blue-500" />,
          title: "Habilidad fundamental",
          description: "La comunicación efectiva es clave en cualquier contexto profesional y personal.",
        })
      }

      if (recommendedCourse.includes("Adaptabilidad")) {
        reasons.push({
          icon: <TrendingUp className="h-5 w-5 text-orange-500" />,
          title: "Competencia del futuro",
          description: "La adaptabilidad es una de las habilidades más valoradas en el mundo laboral actual.",
        })
      }

      if (recommendedCourse.includes("Liderazgo")) {
        reasons.push({
          icon: <Target className="h-5 w-5 text-green-500" />,
          title: "Desarrollo de liderazgo",
          description: "Las habilidades de liderazgo son esenciales para el crecimiento profesional.",
        })
      }
    }

    return reasons.slice(0, 3) // Máximo 3 razones
  }

  const progress = ((currentQuestion + 1) / allQuestions.length) * 100

  if (showResults) {
    const results = calculateResults()

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className={`${results.emotional.bgColor} border-2 mb-6`}>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className={`h-8 w-8 ${results.emotional.color}`} />
              </div>
              <CardTitle className="text-2xl">Resultados de tu Evaluación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Preparación Emocional</h3>
                <h4 className={`text-2xl font-bold ${results.emotional.color} mb-2`}>{results.emotional.level}</h4>
                <p className="text-muted-foreground">{results.emotional.description}</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Course Recommendation */}
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
                    Basado en tu evaluación, este curso de habilidades humanas es el más adecuado para tu desarrollo profesional.
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

            {/* Why This Course */}
            <Card className="bg-green-50 border-2 border-green-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">¿Por qué este curso?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-center mb-6">
                  Analizamos tus respuestas para encontrar el curso que mejor se adapta a tu situación actual:
                </p>

                <div className="space-y-4">
                  {results.reasons.map((reason, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border">
                      <div className="flex-shrink-0 mt-1">{reason.icon}</div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">{reason.title}</h4>
                        <p className="text-sm text-muted-foreground">{reason.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-white rounded-lg border">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    Próximos pasos recomendados
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Explora el contenido detallado del curso recomendado</li>
                    <li>• Únete a nuestra comunidad para conectar con otros estudiantes</li>
                    <li>• Considera crear un plan de desarrollo personal</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-4">
            {currentSection === "emotional" ? "Evaluación de Preparación Emocional" : "Evaluación de Perspectiva Profesional"}
          </h1>
          <p className="text-muted-foreground text-center mb-6">
            {currentSection === "emotional"
              ? "Evaluamos tu preparación emocional para el desarrollo de habilidades humanas"
              : "Analizamos tu perspectiva y preparación para el futuro laboral"}
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
