import { Badge } from "@/components/ui/badge"
import { Star, Clock, Users, Award } from "lucide-react"

interface Course {
  title: string
  description: string
  instructor: string
  duration: string
  totalHours: string
  students: number
  rating: number
  level: string
  category: string
}

interface CourseHeaderProps {
  course: Course
}

export function CourseHeader({ course }: CourseHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl">
          <div className="flex items-center gap-4 mb-4">
            <Badge variant="secondary" className="bg-white/20 text-white">
              {course.category}
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white">
              {course.level}
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
          <p className="text-xl opacity-90 mb-6 max-w-3xl">{course.description}</p>

          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span>Instructor: {course.instructor}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>
                {course.duration} • {course.totalHours}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{course.students.toLocaleString()} estudiantes</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>
                {course.rating} ({course.students} reseñas)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
