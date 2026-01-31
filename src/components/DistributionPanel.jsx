import React from 'react'

export default function DistributionPanel({metrics}){
  const used = Math.max(0, Math.min(100, Math.round((Math.random()*60)+20)))
  const exported = 100 - used
  const battery = Math.max(0, Math.min(30, Math.round(Math.random()*20)))

  return (
    <div>
      <h4 className="text-sm font-medium">Power Distribution</h4>
      <div className="mt-3 flex items-center gap-4">
        <div className="w-28 h-28 flex items-center justify-center">
          <svg viewBox="0 0 36 36" className="w-24 h-24">
            <path d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2z" fill="none" stroke="#0f172a" strokeWidth="4" />
            <path d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2z" fill="none" strokeWidth="4" strokeDasharray={`${used},100`} strokeLinecap="round" stroke="#34d399" transform="rotate(-90 18 18)" />
            <text x="18" y="20" fill="#cbd5e1" fontSize="5" textAnchor="middle">Used {used}%</text>
          </svg>
        </div>
        <div className="flex-1">
          <div className="text-sm text-slate-300">Owner Use: <span className="font-semibold">{used}%</span></div>
          <div className="text-sm text-slate-300">Exported: <span className="font-semibold">{exported}%</span></div>
          <div className="text-sm text-slate-300">Battery: <span className="font-semibold">{battery}%</span></div>
        </div>
      </div>
    </div>
  )
}
