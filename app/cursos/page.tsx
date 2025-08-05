import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, BookOpen, Heart, Brain, Zap } from "lucide-react"
import Link from "next/link"

const courses = [
  {
    id: 1,
    title: "Automatización con Python",
    description: "Aprende a automatizar tareas repetitivas usando Python. Desde scripts básicos hasta bots avanzados.",
    duration: "8 semanas",
    students: 2150,
    rating: 4.9,
    level: "Principiante",
    category: "Programación",
    icon: Brain,
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "RPA con UiPath",
    description:
      "Domina la automatización robótica de procesos con UiPath. Automatiza procesos empresariales complejos.",
    duration: "10 semanas",
    students: 1680,
    rating: 4.8,
    level: "Intermedio",
    category: "RPA",
    icon: Zap,
    color: "bg-orange-500",
  },
  {
    id: 3,
    title: "Automatización Web con Selenium",
    description: "Automatiza navegadores web, pruebas y scraping de datos con Selenium WebDriver.",
    duration: "6 semanas",
    students: 1456,
    rating: 4.7,
    level: "Intermedio",
    category: "Web Automation",
    icon: Heart,
    color: "bg-green-500",
  },
  {
    id: 4,
    title: "Power Automate para Empresas",
    description: "Automatiza flujos de trabajo empresariales con Microsoft Power Automate sin código.",
    duration: "5 semanas",
    students: 1890,
    rating: 4.6,
    level: "Principiante",
    category: "No-Code",
    icon: Zap,
    color: "bg-purple-500",
  },
  {
    id: 5,
    title: "Automatización de APIs con Postman",
    description: "Aprende a automatizar pruebas de APIs, crear colecciones y workflows automatizados.",
    duration: "4 semanas",
    students: 945,
    rating: 4.8,
    level: "Intermedio",
    category: "API Testing",
    icon: Brain,
    color: "bg-red-500",
  },
  {
    id: 6,
    title: "DevOps y CI/CD Automation",
    description: "Automatiza despliegues, testing y monitoreo con Jenkins, GitHub Actions y Docker.",
    duration: "12 semanas",
    students: 1234,
    rating: 4.9,
    level: "Avanzado",
    category: "DevOps",
    icon: Heart,
    color: "bg-indigo-500",
  },
]

const categories = ["Todos", "Programación", "RPA", "Web Automation", "No-Code", "API Testing", "DevOps"]

export default function CursosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cursos de Automatización</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Domina las herramientas y técnicas de automatización más demandadas del mercado. Desde Python hasta RPA
            empresarial.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <Button key={category} variant={category === "Todos" ? "default" : "outline"} size="sm">
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Courses Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const IconComponent = course.icon
            return (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 ${course.color} rounded-lg flex items-center justify-center`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="secondary">{course.level}</Badge>
                  </div>
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <Badge variant="outline" className="w-fit">
                    {course.category}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">{course.description}</p>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {course.students.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{course.rating}</span>
                    <span className="text-sm text-muted-foreground">({course.students} estudiantes)</span>
                  </div>

                  <Button className="w-full" asChild>
                    <Link
                      href={`/cursos/${course.id === 1 ? "automatizacion-python" : course.id === 2 ? "rpa-uipath" : "curso-" + course.id}`}
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Comenzar Curso
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para automatizar tu futuro?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Descubre qué área de automatización se adapta mejor a tu perfil profesional
          </p>
        </div>
      </section>
    </div>
  )
}
