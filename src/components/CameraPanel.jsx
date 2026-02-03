import React from 'react'

export default function CameraPanel({enabled=true, setEnabled=()=>{}, live=true}){
  const status = enabled ? 'online' : 'offline'
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold flex items-center gap-3 dark:text-white text-slate-900">
          <span>📹 Solar Plant Camera</span>
          {/* Small Live pill next to title */}
          {live && (
            <span className="inline-flex items-center gap-2 text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-shadow" />
              <span className="font-medium">Live</span>
            </span>
          )}
        </h4>
        <div className={`text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1 ${enabled ? 'dark:bg-emerald-900/50 bg-emerald-100 dark:text-emerald-300 text-emerald-700':'dark:bg-red-900/50 bg-red-100 dark:text-red-300 text-red-700'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${enabled ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`} />
          {enabled ? 'ON' : 'OFF'}
        </div>
      </div>

      <div className="w-full h-48 dark:bg-black/60 bg-slate-900/40 rounded-lg overflow-hidden flex items-center justify-center border-2 dark:border-slate-700/50 border-slate-300/30 transition-all duration-300">
        {enabled ? (
          <div className="text-center space-y-2">
            <div className="text-6xl animate-pulse">📹</div>
            <div className="dark:text-slate-300 text-slate-700 text-sm font-medium">Live Monitoring Active</div>
            <div className="dark:text-slate-400 text-slate-600 text-xs">Camera streaming solar plant data</div>
          </div>
        ) : (
          <div className="text-center space-y-2">
            <div className="text-6xl opacity-40">🎥</div>
            <div className="dark:text-slate-400 text-slate-600 text-sm">Camera Disabled</div>
            <div className="dark:text-slate-500 text-slate-500 text-xs">Click buttons below to enable</div>
          </div>
        )}
      </div>

      {/* Control Buttons - Small and Clean */}
      <div className="flex gap-2 justify-center">
        <button 
          onClick={() => setEnabled(true)}
          className={`px-4 py-2 rounded-lg font-medium text-xs transition-all duration-300 ${
            enabled 
              ? 'dark:bg-emerald-600/80 dark:hover:bg-emerald-600 dark:text-white bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg dark:shadow-emerald-500/30' 
              : 'dark:bg-slate-700/50 dark:hover:bg-slate-700 dark:text-slate-300 bg-slate-300 hover:bg-slate-400 text-slate-800'
          }`}
        >
          ✓ ON
        </button>
        <button 
          onClick={() => setEnabled(false)}
          className={`px-4 py-2 rounded-lg font-medium text-xs transition-all duration-300 ${
            !enabled 
              ? 'dark:bg-red-600/80 dark:hover:bg-red-600 dark:text-white bg-red-500 hover:bg-red-600 text-white shadow-lg dark:shadow-red-500/30' 
              : 'dark:bg-slate-700/50 dark:hover:bg-slate-700 dark:text-slate-300 bg-slate-300 hover:bg-slate-400 text-slate-800'
          }`}
        >
          ✕ OFF
        </button>
      </div>
    </div>
  )
}
