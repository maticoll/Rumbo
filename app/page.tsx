import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Target, Sparkles } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bienvenido a RUMBO
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed md:text-xl">
              Tu camino hacia un futuro laboral con propósito empieza hoy. Somos una plataforma de e-learning que te ayuda a materializar tus intereses en una ruta de aprendizaje y desarrollar habilidades humanas para enfrentar los desafíos del trabajo en la era de la automatización.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/test-emocional">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Empieza Ya
              </Button>
            </Link>
            <Link href="/cursos">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                Ver Cursos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Exploración</h3>
              <p className="text-muted-foreground">
                Descubrí tus intereses y trazá tu camino profesional. Empezá por un test gratuito que te ayuda a identificar áreas de interés y motivación para crear tu ruta de aprendizaje personalizada.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold">Aprendizaje</h3>
              <p className="text-muted-foreground">
                Accedé a cursos prácticos para el futuro del trabajo. Formate en habilidades humanas clave como comunicación, adaptabilidad, propósito y toma de decisiones en tiempos de cambio.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Proyección</h3>
              <p className="text-muted-foreground">
                Construí un futuro laboral alineado con vos. Aplicá lo aprendido para diseñar un camino con sentido, confianza y preparación ante la automatización y los nuevos desafíos laborales.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Motivational Quote */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <blockquote className="text-2xl md:text-3xl font-light italic max-w-4xl mx-auto">
            "El primer paso hacia el cambio es la conciencia. El segundo paso es la aceptación. El tercer paso es la
            acción."
          </blockquote>
          <p className="mt-4 text-lg opacity-90">- Nathaniel Branden</p>
        </div>
      </section>
    </div>
  )
}
