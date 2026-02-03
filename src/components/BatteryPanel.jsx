import React from 'react'

export default function BatteryPanel(){
  const charged = 12.4
  const discharged = 9.1
  const efficiency = 82

  return (
    <div>
      <h4 className="text-sm font-medium mb-2">Battery Monitoring</h4>
      <div className="card-glass p-3 rounded-lg space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-300">Charged Energy</div>
          <div className="text-sm font-semibold">{charged} kWh</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-300">Discharged Energy</div>
          <div className="text-sm font-semibold">{discharged} kWh</div>
        </div>
        <div>
          <div className="text-xs text-slate-300">Battery Efficiency</div>
          <div className="w-full bg-slate-800 rounded-full h-2 mt-1">
            <div style={{width: `${efficiency}%`}} className="h-2 rounded-full bg-amber-400" />
          </div>
        </div>
      </div>
    </div>
  )
}
