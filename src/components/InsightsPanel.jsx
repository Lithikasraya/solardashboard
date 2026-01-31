import React from 'react'

export default function InsightsPanel({totals, maxCapacity, power}){
  const capPercent = Math.round((power / maxCapacity) * 100)
  const color = capPercent > 80 ? 'bg-green-400' : capPercent > 40 ? 'bg-yellow-400' : 'bg-red-400'
  return (
    <div>
      <h3 className="text-lg font-medium">Power & Energy Insights</h3>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="card-glass p-3 rounded-2xl">
          <div className="text-sm text-slate-300">Today's Power</div>
          <div className="text-2xl font-semibold">{power} kW</div>
          <div className="text-sm text-slate-400">Daily Energy: {totals.daily} kWh</div>
        </div>
        <div className="card-glass p-3 rounded-2xl">
          <div className="text-sm text-slate-300">Monthly / Yearly</div>
          <div className="text-2xl font-semibold">{totals.monthly} / {totals.yearly} kWh</div>
          <div className="text-sm text-slate-400">Lifetime: {totals.lifetime} kWh</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm text-slate-300 mb-2"> 
          <div>Capacity Usage</div>
          <div className="font-semibold">{capPercent}%</div>
        </div>
        <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
          <div className={`h-full ${color}`} style={{width:`${Math.max(0,Math.min(100,capPercent))}%`}} />
        </div>
      </div>

      <div className="mt-3 text-sm text-slate-400">
        <div>Exported vs Local usage: visualization below (approx)</div>
      </div>
    </div>
  )
}
