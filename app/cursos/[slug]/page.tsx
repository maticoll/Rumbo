import { notFound } from "next/navigation"
import { CourseHeader } from "@/components/course-header"
import { CourseContent } from "@/components/course-content"
import { CourseSidebar } from "@/components/course-sidebar"
import { CourseComments } from "@/components/course-comments"
import { CourseCertificate } from "@/components/course-certificate"

const coursesData = {
  "automatizacion-python": {
    id: 1,
    title: "Automatización con Python",
    description: "Aprende a automatizar tareas repetitivas usando Python. Desde scripts básicos hasta bots avanzados.",
    instructor: "Dr. Carlos Mendoza",
    duration: "8 semanas",
    totalHours: "32 horas",
    students: 2150,
    rating: 4.9,
    level: "Principiante",
    category: "Programación",
    price: "$299",
    modules: [
      {
        id: 1,
        title: "Introducción a Python para Automatización",
        duration: "4 horas",
        lessons: [
          { id: 1, title: "¿Qué es la automatización?", duration: "15 min", completed: true },
          { id: 2, title: "Configurando el entorno Python", duration: "20 min", completed: true },
          { id: 3, title: "Sintaxis básica de Python", duration: "45 min", completed: false },
          { id: 4, title: "Librerías esenciales", duration: "30 min", completed: false },
          { id: 5, title: "Tu primer script automatizado", duration: "90 min", completed: false },
        ],
      },
      {
        id: 2,
        title: "Automatización de Archivos y Carpetas",
        duration: "6 horas",
        lessons: [
          { id: 6, title: "Manipulación de archivos", duration: "45 min", completed: false },
          { id: 7, title: "Organización automática de carpetas", duration: "60 min", completed: false },
          { id: 8, title: "Procesamiento de archivos CSV", duration: "75 min", completed: false },
          { id: 9, title: "Automatización de backups", duration: "90 min", completed: false },
          { id: 10, title: "Proyecto práctico", duration: "90 min", completed: false },
        ],
      },
      {
        id: 3,
        title: "Web Scraping y APIs",
        duration: "8 horas",
        lessons: [
          { id: 11, title: "Introducción al web scraping", duration: "30 min", completed: false },
          { id: 12, title: "Beautiful Soup y requests", duration: "90 min", completed: false },
          { id: 13, title: "Manejo de APIs REST", duration: "75 min", completed: false },
          { id: 14, title: "Automatización de redes sociales", duration: "120 min", completed: false },
          { id: 15, title: "Proyecto final", duration: "105 min", completed: false },
        ],
      },
      {
        id: 4,
        title: "Bots y Automatización Avanzada",
        duration: "14 horas",
        lessons: [
          { id: 16, title: "Creando bots de Telegram", duration: "120 min", completed: false },
          { id: 17, title: "Automatización de emails", duration: "90 min", completed: false },
          { id: 18, title: "Selenium para automatización web", duration: "150 min", completed: false },
          { id: 19, title: "Programación de tareas", duration: "105 min", completed: false },
          { id: 20, title: "Proyecto final integrador", duration: "375 min", completed: false },
        ],
      },
    ],
  },
  "rpa-uipath": {
    id: 2,
    title: "RPA con UiPath",
    description:
      "Domina la automatización robótica de procesos con UiPath. Automatiza procesos empresariales complejos.",
    instructor: "Ing. María González",
    duration: "10 semanas",
    totalHours: "40 horas",
    students: 1680,
    rating: 4.8,
    level: "Intermedio",
    category: "RPA",
    price: "$399",
    modules: [
      {
        id: 1,
        title: "Fundamentos de RPA y UiPath",
        duration: "8 horas",
        lessons: [
          { id: 1, title: "¿Qué es RPA?", duration: "20 min", completed: false },
          { id: 2, title: "Instalación de UiPath Studio", duration: "30 min", completed: false },
          { id: 3, title: "Interface de UiPath", duration: "45 min", completed: false },
          { id: 4, title: "Primer robot básico", duration: "90 min", completed: false },
          { id: 5, title: "Variables y argumentos", duration: "75 min", completed: false },
          { id: 6, title: "Actividades básicas", duration: "120 min", completed: false },
        ],
      },
      {
        id: 2,
        title: "Automatización de Aplicaciones Web",
        duration: "10 horas",
        lessons: [
          { id: 7, title: "Selectores web", duration: "60 min", completed: false },
          { id: 8, title: "Interacción con formularios", duration: "90 min", completed: false },
          { id: 9, title: "Extracción de datos web", duration: "120 min", completed: false },
          { id: 10, title: "Manejo de errores", duration: "75 min", completed: false },
          { id: 11, title: "Proyecto web completo", duration: "135 min", completed: false },
        ],
      },
      {
        id: 3,
        title: "Automatización de Excel y Documentos",
        duration: "12 horas",
        lessons: [
          { id: 12, title: "Actividades de Excel", duration: "90 min", completed: false },
          { id: 13, title: "Manipulación de datos", duration: "105 min", completed: false },
          { id: 14, title: "Generación de reportes", duration: "120 min", completed: false },
          { id: 15, title: "Automatización de Word y PDF", duration: "90 min", completed: false },
          { id: 16, title: "Integración con email", duration: "75 min", completed: false },
          { id: 17, title: "Proyecto empresarial", duration: "240 min", completed: false },
        ],
      },
      {
        id: 4,
        title: "Orquestador y Despliegue",
        duration: "10 horas",
        lessons: [
          { id: 18, title: "UiPath Orchestrator", duration: "90 min", completed: false },
          { id: 19, title: "Publicación de robots", duration: "75 min", completed: false },
          { id: 20, title: "Programación y monitoreo", duration: "105 min", completed: false },
          { id: 21, title: "Mejores prácticas", duration: "60 min", completed: false },
          { id: 22, title: "Proyecto final", duration: "270 min", completed: false },
        ],
      },
    ],
  },
  // Agregar más cursos aquí...
}

export default function CoursePage({ params }: { params: { slug: string } }) {
  const course = coursesData[params.slug as keyof typeof coursesData]

  if (!course) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CourseHeader course={course} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <CourseContent course={course} />
            <CourseComments courseId={course.id} />
            <CourseCertificate courseName={course.title} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <CourseSidebar course={course} />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return Object.keys(coursesData).map((slug) => ({
    slug,
  }))
}
