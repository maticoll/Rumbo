import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, Award, Download } from "lucide-react"

interface Course {
  title: string
  price: string
  duration: string
  totalHours: string
  students: number
  rating: number
  level: string
  modules: Array<{
    lessons: Array<{ completed: boolean }>
  }>
}

interface CourseSidebarProps {
  course: Course
}

export function CourseSidebar({ course }: CourseSidebarProps) {
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0)
  const completedLessons = course.modules.reduce(
    (acc, module) => acc + module.lessons.filter((lesson) => lesson.completed).length,
    0,
  )
  const progressPercentage = (completedLessons / totalLessons) * 100

  return (
    <div className="space-y-6">
      {/* Course Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Información del Curso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{course.price}</div>
            <Button className="w-full mb-4">Inscribirse Ahora</Button>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Duración</span>
              </div>
              <span className="font-medium">{course.duration}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-muted-foreground" />
                <span>Horas totales</span>
              </div>
              <span className="font-medium">{course.totalHours}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>Estudiantes</span>
              </div>
              <span className="font-medium">{course.students.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-muted-foreground" />
                <span>Calificación</span>
              </div>
              <span className="font-medium">{course.rating}/5</span>
            </div>
          </div>

          <div className="pt-4 border-t">
            <Badge variant="outline" className="w-full justify-center">
              Nivel {course.level}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tu Progreso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Completado</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <div className="text-sm text-muted-foreground">
            {completedLessons} de {totalLessons} lecciones completadas
          </div>

          <Button variant="outline" className="w-full bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Descargar Recursos
          </Button>
        </CardContent>
      </Card>

      {/* What you'll learn */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Lo que aprenderás</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <span>Automatizar tareas repetitivas</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <span>Crear scripts eficientes</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <span>Integrar APIs y servicios web</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <span>Desarrollar bots inteligentes</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
