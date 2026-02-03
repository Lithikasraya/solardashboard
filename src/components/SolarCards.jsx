import React from 'react'

export default function SolarCards({totals={}}){
  const today = totals.daily || 0
  const month = totals.monthly || 0
  const peak = Math.max(0, +(today*0.12).toFixed(2))

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="card-glass p-4 rounded-2xl">
        <div className="text-sm text-slate-300">Today's Generation</div>
        <div className="text-2xl font-semibold text-yellow-400">{today} kWh</div>
      </div>
      <div className="card-glass p-4 rounded-2xl">
        <div className="text-sm text-slate-300">Monthly Generation</div>
        <div className="text-2xl font-semibold text-orange-400">{month} kWh</div>
      </div>
      <div className="card-glass p-4 rounded-2xl">
        <div className="text-sm text-slate-300">Peak Power</div>
        <div className="text-2xl font-semibold text-red-400">{peak} kW</div>
      </div>
    </div>
  )
}
