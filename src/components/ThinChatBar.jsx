import React from 'react'

export default function ThinChatBar({ dark = false }){
  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 bottom-6 z-40">
      <div className="thin-chat-bar flex items-center gap-2 px-3 py-2 rounded-full">
        <div className="emoji-circle flex items-center justify-center shrink-0">
          <span className="text-sm">💬</span>
        </div>

        <button className="send-btn w-9 h-9 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.94 2.94a1.5 1.5 0 012.12 0l11 11a1.5 1.5 0 01-2.12 2.12L10 8.12 4.52 13.6A1.5 1.5 0 012.4 13.6l.54-3.08L2.94 2.94z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
