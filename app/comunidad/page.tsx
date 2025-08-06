"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Heart, Share2, Search, Plus, TrendingUp, Users, BookOpen, HelpCircle, Lightbulb, Code, Zap, Filter, Pin, CheckCircle } from 'lucide-react'

interface Post {
  id: number
  author: {
    name: string
    avatar: string
    initials: string
    level: string
    verified: boolean
  }
  title: string
  content: string
  category: string
  tags: string[]
  timestamp: string
  likes: number
  replies: number
  isPinned?: boolean
  isResolved?: boolean
}

const samplePosts: Post[] = [
  {
    id: 1,
    author: {
      name: "María González",
      avatar: "",
      initials: "MG",
      level: "Experto",
      verified: true,
    },
    title: "¿Cómo automatizar el procesamiento de facturas con UiPath?",
    content:
      "Hola comunidad! Estoy trabajando en un proyecto para automatizar el procesamiento de facturas PDF. ¿Alguien tiene experiencia con Document Understanding en UiPath? Me gustaría saber qué actividades recomiendan para extraer datos específicos como fechas, montos y números de factura.",
    category: "RPA",
    tags: ["UiPath", "PDF", "Document Understanding"],
    timestamp: "Hace 2 horas",
    likes: 15,
    replies: 8,
    isPinned: true,
  },
  {
    id: 2,
    author: {
      name: "Carlos Mendoza",
      avatar: "",
      initials: "CM",
      level: "Mentor",
      verified: true,
    },
    title: "Tutorial: Web Scraping ético con Python y Beautiful Soup",
    content:
      "Comparto un tutorial completo sobre web scraping responsable. Incluye mejores prácticas, manejo de rate limiting, y cómo respetar robots.txt. ¿Qué otros temas les gustaría que cubra en futuros tutoriales?",
    category: "Python",
    tags: ["Python", "Web Scraping", "Tutorial"],
    timestamp: "Hace 4 horas",
    likes: 32,
    replies: 12,
    isResolved: true,
  },
  {
    id: 3,
    author: {
      name: "Ana Rodríguez",
      avatar: "",
      initials: "AR",
      level: "Intermedio",
      verified: false,
    },
    title: "Ayuda: Error en Power Automate con SharePoint",
    content:
      "Tengo un flujo que debe crear carpetas en SharePoint automáticamente, pero me da error 'Forbidden'. Ya verifiqué los permisos y parecen estar correctos. ¿Alguien ha tenido este problema?",
    category: "Power Automate",
    tags: ["Power Automate", "SharePoint", "Error"],
    timestamp: "Hace 6 horas",
    likes: 7,
    replies: 5,
  },
  {
    id: 4,
    author: {
      name: "Luis Torres",
      avatar: "",
      initials: "LT",
      level: "Principiante",
      verified: false,
    },
    title: "¿Qué curso tomar después de completar Python básico?",
    content:
      "Acabo de terminar el curso de Automatización con Python y me encantó! ¿Qué recomiendan como siguiente paso? Estoy entre RPA con UiPath o profundizar más en Python con APIs.",
    category: "Carrera",
    tags: ["Carrera", "Python", "RPA"],
    timestamp: "Hace 8 horas",
    likes: 12,
    replies: 15,
  },
  {
    id: 5,
    author: {
      name: "Sofia Chen",
      avatar: "",
      initials: "SC",
      level: "Avanzado",
      verified: true,
    },
    title: "Compartiendo mi experiencia: De manual a automatizado en 6 meses",
    content:
      "Hace 6 meses era analista haciendo todo manualmente. Hoy lidero un equipo de automatización. Quiero compartir mi experiencia y los errores que cometí para que otros puedan evitarlos.",
    category: "Experiencias",
    tags: ["Carrera", "Experiencia", "Motivación"],
    timestamp: "Hace 1 día",
    likes: 45,
    replies: 23,
  },
]

const categories = ["Todos", "Python", "RPA", "Power Automate", "Selenium", "APIs", "Carrera", "Experiencias"]

export default function ComunidadPage() {
  const [posts, setPosts] = useState<Post[]>(samplePosts)
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewPostForm, setShowNewPostForm] = useState(false)
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
  })

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "Todos" || post.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const handleCreatePost = () => {
    if (newPost.title && newPost.content && newPost.category) {
      const post: Post = {
        id: posts.length + 1,
        author: {
          name: "Tú",
          avatar: "",
          initials: "TU",
          level: "Miembro",
          verified: false,
        },
        title: newPost.title,
        content: newPost.content,
        category: newPost.category,
        tags: newPost.tags.split(",").map((tag) => tag.trim()),
        timestamp: "Ahora",
        likes: 0,
        replies: 0,
      }
      setPosts([post, ...posts])
      setNewPost({ title: "", content: "", category: "", tags: "" })
      setShowNewPostForm(false)
    }
  }

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)),
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Comunidad RUMBO</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Conecta, aprende y crece junto a miles de profesionales en automatización. Comparte conocimiento y resuelve
            dudas en comunidad.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Estadísticas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Miembros activos</span>
                  <span className="font-semibold">12,450</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Posts esta semana</span>
                  <span className="font-semibold">234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Respuestas</span>
                  <span className="font-semibold">1,567</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Expertos online</span>
                  <span className="font-semibold text-green-600">45</span>
                </div>
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "María González", points: 2450, level: "Experto" },
                  { name: "Carlos Mendoza", points: 1890, level: "Mentor" },
                  { name: "Sofia Chen", points: 1567, level: "Avanzado" },
                ].map((contributor, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{contributor.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {contributor.points} puntos • {contributor.level}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Enlaces Rápidos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Guías y Tutoriales
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Code className="h-4 w-4 mr-2" />
                  Código Compartido
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Zap className="h-4 w-4 mr-2" />
                  Proyectos Destacados
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  FAQ
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar en la comunidad..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-48">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={() => setShowNewPostForm(!showNewPostForm)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Post
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* New Post Form */}
            {showNewPostForm && (
              <Card>
                <CardHeader>
                  <CardTitle>Crear Nuevo Post</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Título de tu post..."
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  />
                  <Textarea
                    placeholder="Describe tu pregunta, comparte tu experiencia o inicia una discusión..."
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    rows={4}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Select value={newPost.category} onValueChange={(value) => setNewPost({ ...newPost, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.slice(1).map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Tags (separados por comas)"
                      value={newPost.tags}
                      onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleCreatePost} disabled={!newPost.title || !newPost.content || !newPost.category}>
                      Publicar
                    </Button>
                    <Button variant="outline" onClick={() => setShowNewPostForm(false)}>
                      Cancelar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{post.author.initials}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{post.author.name}</span>
                          {post.author.verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
                          <Badge variant="outline" className="text-xs">
                            {post.author.level}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                          {post.isPinned && <Pin className="h-4 w-4 text-orange-500" />}
                          {post.isResolved && <CheckCircle className="h-4 w-4 text-green-500" />}
                        </div>

                        <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 cursor-pointer">
                          {post.title}
                        </h3>

                        <p className="text-muted-foreground mb-3 line-clamp-3">{post.content}</p>

                        <div className="flex items-center gap-2 mb-4">
                          <Badge variant="secondary">{post.category}</Badge>
                          {post.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(post.id)}
                            className="text-muted-foreground hover:text-red-500"
                          >
                            <Heart className="h-4 w-4 mr-1" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            {post.replies}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-green-500">
                            <Share2 className="h-4 w-4 mr-1" />
                            Compartir
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No se encontraron posts</h3>
                  <p className="text-muted-foreground">
                    Intenta cambiar los filtros o crear el primer post sobre este tema.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
