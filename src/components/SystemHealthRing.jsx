import React from 'react'

export default function SystemHealthRing({ percent = 92, size = 64 }){
  const stroke = 8
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference
  // Color gradient: green -> amber -> red
  let color = '#10b981'
  if(percent < 70) color = '#f59e0b'
  if(percent < 45) color = '#ef4444'

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
      <g transform={`translate(${size/2}, ${size/2})`}>
        <circle r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
        <circle
          r={radius}
          fill="none"
          stroke="url(#healthGradient)"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.6s ease, stroke 0.3s ease' }}
        />
        <text x="0" y="4" textAnchor="middle" fontSize="12" fill="currentColor" className="dark:text-white text-slate-800 font-semibold">{percent}%</text>
      </g>
    </svg>
  )
}
