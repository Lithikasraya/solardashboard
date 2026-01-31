import React from 'react'

function colorFor(value, thresholds){
  if(!thresholds) return 'text-green-400'
  const [low, high] = thresholds
  if(value < low) return 'text-yellow-400'
  if(value >= high) return 'text-red-400'
  return 'text-green-400'
}

export default function MetricCard({title, value, unit, icon, thresholds, max}){
  const color = colorFor(value, thresholds)
  const percent = max? Math.min(100, Math.round((value/max)*100)) : null
  return (
    <div className="card-glass p-4 rounded-2xl shadow-lg transition-smooth">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{icon}</div>
          <div>
            <div className="text-sm text-slate-300">{title}</div>
            <div className={`text-2xl font-semibold ${color}`}>{value} <span className="text-sm text-slate-400">{unit}</span></div>
          </div>
        </div>
        {percent !== null && (
          <div className="w-16 h-16 flex items-center justify-center">
            <svg viewBox="0 0 36 36" className="w-12 h-12">
              <path d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2z" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
              <path d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2z" fill="none" strokeWidth="4" strokeDasharray={`${percent},100`} strokeLinecap="round" stroke="#34d399" transform="rotate(-90 18 18)" />
              <text x="18" y="21" fill="#cbd5e1" fontSize="6" textAnchor="middle">{percent}%</text>
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}
