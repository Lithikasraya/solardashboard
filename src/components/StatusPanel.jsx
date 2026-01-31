import React from 'react'

export default function StatusPanel({metrics}){
  const {power, temp, current} = metrics
  let status = 'Normal'
  let statusColor = 'bg-green-600'
  if(power > 2.8 || temp > 65) { status = 'Overload'; statusColor = 'bg-yellow-500' }
  if(current <= 0.02) { status = 'Offline'; statusColor = 'bg-gray-600' }

  const efficiency = Math.round((power/3)*100)
  const warnings = []
  if(temp > 60) warnings.push('High panel temperature')
  if(power > 2.9) warnings.push('Power near maximum capacity')

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">System Health</h3>
          <p className="text-sm text-slate-300">Status overview & warnings</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm ${statusColor} text-slate-900`}>{status}</div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-300">Efficiency</div>
          <div className="font-semibold">{efficiency}%</div>
        </div>
        <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
          <div style={{width:`${Math.max(0,Math.min(100,efficiency))}%`}} className="h-full bg-green-400" />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium">Warnings</h4>
        {warnings.length? (
          <ul className="mt-2 space-y-1 text-sm text-amber-200">
            {warnings.map((w,i)=>(<li key={i}>• {w}</li>))}
          </ul>
        ) : (
          <p className="text-sm text-slate-400 mt-2">No warnings.</p>
        )}
      </div>

      <div className="text-sm text-slate-300">
        <div>Voltage: <span className="font-medium">{Math.round(metrics.voltage)} V</span></div>
        <div>Current: <span className="font-medium">{metrics.current} A</span></div>
        <div>Power: <span className="font-medium">{metrics.power} kW</span></div>
        <div>Panel Temp: <span className="font-medium">{metrics.temp} °C</span></div>
      </div>

      <div className="pt-2 border-t border-slate-700">
        <button className="mt-2 w-full bg-slate-700 hover:bg-slate-600 text-slate-100 py-2 rounded-2xl transition-all">Export Data (CSV)</button>
      </div>
    </div>
  )
}
