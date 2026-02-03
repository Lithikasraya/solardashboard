import React from 'react'

function CircularProgress({percent=75, label='', color='#34d399'}){
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (percent / 100) * circumference
  
  return (
    <div className="flex flex-col items-center justify-center">
      <svg width={120} height={120} className="transform -rotate-90">
        <circle cx={60} cy={60} r={45} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={6} />
        <circle 
          cx={60} 
          cy={60} 
          r={45} 
          fill="none" 
          stroke={color} 
          strokeWidth={6}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{transition: 'stroke-dashoffset 0.5s ease'}}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-2xl font-bold" style={{color}}>{percent}%</div>
        <div className="text-xs dark:text-slate-400 text-slate-500">{label}</div>
      </div>
    </div>
  )
}

export default function EfficiencyPanel(){
  const solarEfficiency = 18.5
  const inverterEfficiency = 96.2
  const systemEfficiency = 17.8
  const losses = 2.2

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold dark:text-white text-slate-900">🔧 System Efficiency</h3>

      {/* Efficiency Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card-glass p-4 rounded-lg flex flex-col items-center justify-center relative">
          <CircularProgress percent={Math.round(solarEfficiency)} label="Solar Panel" color="#f59e0b" />
        </div>
        <div className="card-glass p-4 rounded-lg flex flex-col items-center justify-center relative">
          <CircularProgress percent={Math.round(inverterEfficiency)} label="Inverter" color="#34d399" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="card-glass p-4 rounded-lg space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm dark:text-slate-300 text-slate-600">Overall System Efficiency</span>
            <span className="text-sm font-bold text-emerald-400">{systemEfficiency.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div style={{width: `${systemEfficiency}%`}} className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-400" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm dark:text-slate-300 text-slate-600">Energy Loss</span>
            <span className="text-sm font-bold text-red-400">{losses.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div style={{width: `${losses}%`}} className="h-2 rounded-full bg-gradient-to-r from-red-500 to-red-400" />
          </div>
        </div>
      </div>

      {/* Health Status */}
      <div className="card-glass p-4 rounded-lg">
        <h4 className="text-sm font-medium mb-3 dark:text-slate-200 text-slate-700">System Health Status</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 rounded bg-emerald-900/30">
            <span className="text-sm dark:text-slate-300 text-slate-600">✓ Panels Operating</span>
            <span className="text-xs bg-emerald-600 px-2 py-1 rounded text-white">Optimal</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-emerald-900/30">
            <span className="text-sm dark:text-slate-300 text-slate-600">✓ Inverter Status</span>
            <span className="text-xs bg-emerald-600 px-2 py-1 rounded text-white">Normal</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-amber-900/30">
            <span className="text-sm dark:text-slate-300 text-slate-600">⚠ Temperature</span>
            <span className="text-xs bg-amber-600 px-2 py-1 rounded text-white">Moderate</span>
          </div>
        </div>
      </div>
    </div>
  )
}
