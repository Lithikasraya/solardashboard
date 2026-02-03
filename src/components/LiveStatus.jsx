import React from 'react'

export default function LiveStatus(){
  return (
    <div className="card-glass p-4 rounded-2xl shadow-lg">
      <div className="flex items-center gap-3">
        <div className="live-indicator"></div>
        <div>
          <div className="text-sm font-semibold dark:text-emerald-300 text-emerald-600">Live Solar Monitoring</div>
          <div className="text-xs dark:text-slate-400 text-slate-600">Real-time data streaming</div>
        </div>
      </div>

      {/* Status details */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <div className="dark:bg-slate-800/50 bg-slate-100 p-2 rounded">
          <div className="dark:text-slate-400 text-slate-600">Status</div>
          <div className="font-semibold dark:text-emerald-400 text-emerald-600">✓ Connected</div>
        </div>
        <div className="dark:bg-slate-800/50 bg-slate-100 p-2 rounded">
          <div className="dark:text-slate-400 text-slate-600">Data Update</div>
          <div className="font-semibold dark:text-cyan-400 text-cyan-600">2.0 sec</div>
        </div>
      </div>
    </div>
  )
}
