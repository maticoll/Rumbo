import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Target, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bienvenidos a RUMBO
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed md:text-xl">
              Tu viaje hacia el bienestar emocional comienza aquí. Descubre tu estado emocional actual y encuentra el
              camino perfecto para crecer, sanar y florecer.
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
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Autoconocimiento</h3>
              <p className="text-muted-foreground">
                Descubre tu estado emocional actual con nuestro test personalizado
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold">Crecimiento</h3>
              <p className="text-muted-foreground">Accede a cursos especializados para tu desarrollo personal</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Transformación</h3>
              <p className="text-muted-foreground">Experimenta cambios positivos en tu bienestar emocional</p>
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
