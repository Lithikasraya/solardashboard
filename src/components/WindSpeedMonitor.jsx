import React from 'react'

export default function WindSpeedMonitor({windSpeed=0}){
  const getWindDirection = (speed) => {
    if(speed < 2) return '💨 Calm'
    if(speed < 5) return '🌬️ Light'
    if(speed < 10) return '🌊 Moderate'
    return '⚡ Strong'
  }

  const getWindColor = (speed) => {
    if(speed < 2) return 'text-blue-400'
    if(speed < 5) return 'text-emerald-400'
    if(speed < 10) return 'text-purple-400'
    return 'text-pink-400'
  }

  return (
    <div className="card-glass p-4 rounded-2xl shadow-lg space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold dark:text-white text-slate-900">🌬️ Wind Speed</h4>
        <div className="text-xs dark:text-slate-400 text-slate-600">Environment</div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div>
          <div className={`text-3xl font-bold ${getWindColor(windSpeed)}`}>{windSpeed.toFixed(1)}</div>
          <div className="text-xs dark:text-slate-400 text-slate-600">m/s</div>
        </div>
        <div className="text-4xl">{getWindDirection(windSpeed)}</div>
      </div>

      {/* Wind strength bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs dark:text-slate-300 text-slate-700">Wind Strength</span>
          <span className="text-xs font-medium dark:text-slate-400 text-slate-600">
            {windSpeed < 2 ? 'Calm' : windSpeed < 5 ? 'Light' : windSpeed < 10 ? 'Moderate' : 'Strong'}
          </span>
        </div>
        <div className="w-full h-1.5 dark:bg-slate-700 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-emerald-500 via-blue-500 to-pink-500"
            style={{width: `${Math.min(100, (windSpeed / 15) * 100)}%`}}
          />
        </div>
      </div>

      {/* Wind impact info */}
      <div className="text-xs dark:text-slate-400 text-slate-600 p-2 dark:bg-slate-800/50 bg-slate-100 rounded-lg">
        {windSpeed < 2 && '✓ Optimal conditions for solar operation'}
        {windSpeed >= 2 && windSpeed < 5 && '✓ Good wind conditions, minimal cooling'}
        {windSpeed >= 5 && windSpeed < 10 && '⚠️ Moderate wind - panels slightly cooled'}
        {windSpeed >= 10 && '⚠️ Strong winds detected - monitor panel stability'}
      </div>
    </div>
  )
}
