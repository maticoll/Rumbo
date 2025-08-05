"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Award, Download, Eye } from "lucide-react"

interface CourseCertificateProps {
  courseName: string
}

export function CourseCertificate({ courseName }: CourseCertificateProps) {
  const [studentName, setStudentName] = useState("Juan Pérez")
  const [showPreview, setShowPreview] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5" />
          Certificado de Finalización
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Al completar este curso, recibirás un certificado personalizado que podrás descargar y compartir.
        </p>

        <div className="space-y-2">
          <Label htmlFor="studentName">Nombre del estudiante</Label>
          <Input
            id="studentName"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Ingresa tu nombre completo"
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowPreview(!showPreview)} className="flex-1">
            <Eye className="h-4 w-4 mr-2" />
            {showPreview ? "Ocultar" : "Vista Previa"}
          </Button>
          <Button className="flex-1" disabled>
            <Download className="h-4 w-4 mr-2" />
            Descargar (Completa el curso)
          </Button>
        </div>

        {showPreview && (
          <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-dashed border-blue-200">
            <div className="text-center space-y-4">
              {/* Certificate Header */}
              <div className="space-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  RUMBO
                </h2>
                <p className="text-sm text-muted-foreground">Plataforma de Automatización</p>
              </div>

              {/* Certificate Content */}
              <div className="space-y-4 py-6">
                <h3 className="text-lg font-semibold">Certificado de Finalización</h3>
                <p className="text-sm">Se otorga el presente certificado a</p>

                <div className="py-4">
                  <h4 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-200 pb-2 inline-block">
                    {studentName || "Nombre del Estudiante"}
                  </h4>
                </div>

                <p className="text-sm">Por haber completado exitosamente el curso</p>

                <h5 className="text-lg font-semibold text-purple-600">{courseName}</h5>

                <div className="flex justify-between items-center pt-6 text-xs text-muted-foreground">
                  <div>
                    <p>Fecha de finalización</p>
                    <p className="font-medium">{new Date().toLocaleDateString()}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <p className="mt-1 font-medium">Certificado Oficial</p>
                  </div>
                  <div className="text-right">
                    <p>ID del Certificado</p>
                    <p className="font-medium">RMB-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                  </div>
                </div>
              </div>

              {/* Certificate Footer */}
              <div className="border-t pt-4">
                <p className="text-xs text-muted-foreground">
                  Este certificado verifica que el estudiante ha completado satisfactoriamente todos los módulos y
                  proyectos del curso.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
