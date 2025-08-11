interface TicketData {
  fullName: string
  email: string
  githubUsername: string
  avatar: File | null
  avatarPreview: string | null
}

interface ConferenceTicketProps {
  ticketData: TicketData
}

export function ConferenceTicket({ ticketData }: ConferenceTicketProps) {
  // Generate a random ticket ID
  const ticketId = Math.random().toString(36).substr(2, 6).toUpperCase()

  return (
    <div className="relative max-w-sm mx-auto">
      <div className="ticket-card p-4 sm:p-6 text-white relative overflow-hidden">
        {/* Ticket notches - responsive sizing */}
        <div className="absolute top-1/2 -left-2 sm:-left-3 w-4 h-4 sm:w-6 sm:h-6 bg-purple-900 rounded-full transform -translate-y-1/2"></div>
        <div className="absolute top-1/2 -right-2 sm:-right-3 w-4 h-4 sm:w-6 sm:h-6 bg-purple-900 rounded-full transform -translate-y-1/2"></div>

        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 text-right">
          <div className="text-white/60 text-xs font-mono transform rotate-90 origin-center">{ticketId}</div>
        </div>

        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-orange-400 to-pink-500 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xs">✈</span>
          </div>
          <h3 className="text-white font-semibold text-sm sm:text-base">Coding Conf</h3>
        </div>

        <div className="mb-4 sm:mb-6">
          <p className="text-white/70 text-xs sm:text-sm">Jan 31, 2025 / Austin, TX</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-white/20 flex items-center justify-center flex-shrink-0">
            {ticketData.avatarPreview ? (
              <img
                src={ticketData.avatarPreview || "/placeholder.svg"}
                alt={ticketData.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
                <span className="text-white font-semibold text-sm sm:text-lg">
                  {ticketData.fullName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-white text-sm sm:text-base truncate">{ticketData.fullName}</h4>
            {ticketData.githubUsername && (
              <p className="text-white/70 text-xs sm:text-sm truncate">@{ticketData.githubUsername.replace("@", "")}</p>
            )}
          </div>
        </div>

        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5 pointer-events-none"></div>
      </div>

      <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3">
        <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-lg font-medium transition-colors border border-white/20 text-sm sm:text-base">
          Download Ticket
        </button>
        <button className="flex-1 bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white py-3 px-4 rounded-lg font-medium transition-all text-sm sm:text-base">
          Share Ticket
        </button>
      </div>
    </div>
  )
}
