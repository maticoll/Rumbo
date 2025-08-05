"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, CheckCircle, Clock, ChevronDown, ChevronRight } from "lucide-react"

interface Lesson {
  id: number
  title: string
  duration: string
  completed: boolean
}

interface Module {
  id: number
  title: string
  duration: string
  lessons: Lesson[]
}

interface Course {
  modules: Module[]
}

interface CourseContentProps {
  course: Course
}

export function CourseContent({ course }: CourseContentProps) {
  const [expandedModules, setExpandedModules] = useState<number[]>([1])
  const [currentLesson, setCurrentLesson] = useState<number>(1)

  const toggleModule = (moduleId: number) => {
    setExpandedModules((prev) => (prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]))
  }

  const currentLessonData = course.modules
    .flatMap((module) => module.lessons)
    .find((lesson) => lesson.id === currentLesson)

  return (
    <div className="space-y-6">
      {/* Video Player */}
      <Card>
        <CardContent className="p-0">
          <div className="aspect-video bg-gray-900 rounded-t-lg flex items-center justify-center relative">
            <div className="text-center text-white">
              <Play className="h-16 w-16 mx-auto mb-4 opacity-80" />
              <h3 className="text-xl font-semibold mb-2">{currentLessonData?.title || "Selecciona una lección"}</h3>
              <p className="opacity-80">{currentLessonData?.duration || "Duración: --"}</p>
            </div>
            {/* Video Controls Overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black/50 rounded-lg p-3">
                <div className="flex items-center justify-between text-white text-sm">
                  <span>0:00</span>
                  <div className="flex-1 mx-4 h-1 bg-white/30 rounded-full">
                    <div className="h-full w-0 bg-blue-500 rounded-full"></div>
                  </div>
                  <span>{currentLessonData?.duration || "0:00"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">{currentLessonData?.title}</h4>
                <p className="text-sm text-muted-foreground">
                  Lección {currentLesson} • {currentLessonData?.duration}
                </p>
              </div>
              <Button>
                <Play className="h-4 w-4 mr-2" />
                Reproducir
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Modules */}
      <Card>
        <CardHeader>
          <CardTitle>Contenido del Curso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {course.modules.map((module) => (
            <div key={module.id} className="border rounded-lg">
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {expandedModules.includes(module.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                    <div>
                      <h4 className="font-semibold">{module.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {module.lessons.length} lecciones • {module.duration}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {module.lessons.filter((l) => l.completed).length}/{module.lessons.length}
                  </Badge>
                </div>
              </button>

              {expandedModules.includes(module.id) && (
                <div className="border-t">
                  {module.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => setCurrentLesson(lesson.id)}
                      className={`w-full p-3 text-left hover:bg-gray-50 transition-colors border-b last:border-b-0 ${
                        currentLesson === lesson.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {lesson.completed ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Play className="h-4 w-4 text-gray-400" />
                          )}
                          <span className="text-sm">{lesson.title}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {lesson.duration}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
