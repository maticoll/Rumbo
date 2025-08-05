"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ThumbsUp, Reply } from "lucide-react"

interface Comment {
  id: number
  user: {
    name: string
    avatar: string
    initials: string
  }
  rating: number
  date: string
  content: string
  likes: number
  replies?: Comment[]
}

const sampleComments: Comment[] = [
  {
    id: 1,
    user: {
      name: "Ana García",
      avatar: "",
      initials: "AG",
    },
    rating: 5,
    date: "Hace 2 días",
    content:
      "Excelente curso! Las explicaciones son muy claras y los proyectos prácticos realmente ayudan a consolidar el aprendizaje. Recomendado 100%.",
    likes: 12,
  },
  {
    id: 2,
    user: {
      name: "Miguel Torres",
      avatar: "",
      initials: "MT",
    },
    rating: 4,
    date: "Hace 1 semana",
    content:
      "Muy buen contenido, aunque me hubiera gustado más ejemplos en algunos temas. El instructor explica muy bien y responde rápido las dudas.",
    likes: 8,
  },
  {
    id: 3,
    user: {
      name: "Laura Martínez",
      avatar: "",
      initials: "LM",
    },
    rating: 5,
    date: "Hace 2 semanas",
    content:
      "Increíble curso! Logré automatizar varios procesos en mi trabajo gracias a lo aprendido aquí. Los proyectos finales son muy útiles.",
    likes: 15,
  },
]

interface CourseCommentsProps {
  courseId: number
}

export function CourseComments({ courseId }: CourseCommentsProps) {
  const [comments, setComments] = useState<Comment[]>(sampleComments)
  const [newComment, setNewComment] = useState("")
  const [rating, setRating] = useState(5)

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        user: {
          name: "Tú",
          avatar: "",
          initials: "TU",
        },
        rating,
        date: "Ahora",
        content: newComment,
        likes: 0,
      }
      setComments([comment, ...comments])
      setNewComment("")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comentarios y Reseñas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add Comment */}
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="text-sm font-medium mb-2 block">Tu calificación</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setRating(star)} className="p-1">
                  <Star className={`h-5 w-5 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                </button>
              ))}
            </div>
          </div>

          <Textarea
            placeholder="Comparte tu experiencia con este curso..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
          />

          <Button onClick={handleSubmitComment} disabled={!newComment.trim()}>
            Publicar Comentario
          </Button>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b pb-4 last:border-b-0">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src={comment.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{comment.user.initials}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{comment.user.name}</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= comment.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">{comment.date}</span>
                  </div>

                  <p className="text-sm mb-3">{comment.content}</p>

                  <div className="flex items-center gap-4 text-sm">
                    <button className="flex items-center gap-1 text-muted-foreground hover:text-blue-600">
                      <ThumbsUp className="h-4 w-4" />
                      {comment.likes}
                    </button>
                    <button className="flex items-center gap-1 text-muted-foreground hover:text-blue-600">
                      <Reply className="h-4 w-4" />
                      Responder
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
