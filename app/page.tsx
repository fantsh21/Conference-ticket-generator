"use client"

import { useState } from "react"
import { TicketForm } from "@/components/ticket-form"
import { ConferenceTicket } from "@/components/conference-ticket"

interface TicketFormData {
  fullName: string
  email: string
  githubUsername: string
  avatar: File | null
  avatarPreview: string | null
}

export default function Home() {
  const [showForm, setShowForm] = useState(true)
  const [ticketData, setTicketData] = useState<TicketFormData | null>(null)

  const handleFormSubmit = (data: TicketFormData) => {
    setTicketData(data)
    setShowForm(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-orange-400 to-pink-500 opacity-20 blur-3xl"></div>
      </div>

      {/* Enhanced responsive container with better mobile spacing */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Responsive header with better mobile sizing */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm sm:text-base">✈</span>
            </div>
            <h1 className="text-white text-xl sm:text-2xl font-semibold">Coding Conf</h1>
          </div>
        </div>

        {/* Responsive container with better mobile/desktop sizing */}
        <div className="max-w-md mx-auto lg:max-w-2xl">
          {showForm ? (
            <>
              {/* Responsive title and description */}
              <div className="text-center text-white mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 px-2">
                  Your Journey to Coding Conf 2025 Starts Here!
                </h2>
                <p className="text-gray-300 text-sm sm:text-base px-4">
                  Secure your spot at next year's biggest coding conference.
                </p>
              </div>

              {/* Enhanced mobile form container */}
              <div className="glass-effect rounded-lg p-4 sm:p-6 mx-2 sm:mx-0">
                <TicketForm onSubmit={handleFormSubmit} />
              </div>
            </>
          ) : (
            /* Responsive success page layout */
            <div className="text-center text-white px-2 sm:px-0">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 leading-tight">
                Congrats, <span className="text-orange-400">{ticketData?.fullName}</span>! Your ticket is ready.
              </h2>
              <p className="text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base px-2">
                We've emailed your ticket to {ticketData?.email} and will send updates in the run up to the event.
              </p>
              {/* Responsive ticket display */}
              <div className="px-2 sm:px-0">{ticketData && <ConferenceTicket ticketData={ticketData} />}</div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
