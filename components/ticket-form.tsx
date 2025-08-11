"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"

interface TicketFormData {
  fullName: string
  email: string
  githubUsername: string
  avatar: File | null
  avatarPreview: string | null
}

interface TicketFormProps {
  onSubmit: (data: TicketFormData) => void
}

export function TicketForm({ onSubmit }: TicketFormProps) {
  const [formData, setFormData] = useState<TicketFormData>({
    fullName: "",
    email: "",
    githubUsername: "",
    avatar: null,
    avatarPreview: null,
  })

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          avatar: file,
          avatarPreview: e.target?.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          avatar: file,
          avatarPreview: e.target?.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.fullName && formData.email) {
      onSubmit(formData)
    }
  }

  const isFormValid = formData.fullName.trim() && formData.email.trim()

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="space-y-2">
        <Label className="text-white text-sm font-medium">Upload Avatar</Label>
        <div
          className="border-2 border-dashed border-white/30 rounded-lg p-6 sm:p-8 text-center hover:border-white/50 transition-colors cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById("avatar-upload")?.click()}
        >
          {formData.avatarPreview ? (
            <div className="flex flex-col items-center space-y-2">
              <img
                src={formData.avatarPreview || "/placeholder.svg"}
                alt="Avatar preview"
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
              />
              <p className="text-white/70 text-xs sm:text-sm">Click to change</p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-lg flex items-center justify-center">
                <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-white/70" />
              </div>
              <p className="text-white/70 text-xs sm:text-sm">Drag and drop or click to upload</p>
            </div>
          )}
          <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
        </div>
        <p className="text-white/50 text-xs">Upload your photo (JPG or PNG, max size: 5MB)</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-white text-sm font-medium">
          Full Name
        </Label>
        <Input
          id="fullName"
          type="text"
          value={formData.fullName}
          onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20 h-11 sm:h-12"
          placeholder="Enter your full name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-white text-sm font-medium">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20 h-11 sm:h-12"
          placeholder="example@email.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="github" className="text-white text-sm font-medium">
          GitHub Username
        </Label>
        <Input
          id="github"
          type="text"
          value={formData.githubUsername}
          onChange={(e) => setFormData((prev) => ({ ...prev, githubUsername: e.target.value }))}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20 h-11 sm:h-12"
          placeholder="@yourusername"
        />
      </div>

      <Button
        type="submit"
        disabled={!isFormValid}
        className="w-full bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-semibold py-3 sm:py-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
      >
        Generate My Ticket
      </Button>
    </form>
  )
}
