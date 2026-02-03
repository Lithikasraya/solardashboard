import React from 'react'

export default function SmartInsight({ message = 'Great sunlight today!', sub = 'You saved more energy than yesterday' }){
  return (
    <div className="card-glass p-3 rounded-lg flex items-start gap-3 hover:shadow-xl transition-all">
      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-400 flex items-center justify-center text-white text-lg">🌞</div>
      <div>
        <div className="text-sm font-semibold dark:text-white text-slate-900">{message}</div>
        <div className="text-xs dark:text-slate-400 text-slate-600">{sub}</div>
      </div>
    </div>
  )
}
