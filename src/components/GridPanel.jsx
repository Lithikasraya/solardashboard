import React from 'react'

export default function GridPanel({totals={}}){
  const exportKwh = +( (totals.monthly || 0) * 0.15 ).toFixed(2)
  const importKwh = +( (totals.monthly || 0) * 0.05 ).toFixed(2)
  const net = +(exportKwh - importKwh).toFixed(2)

  return (
    <div>
      <h4 className="text-sm font-medium mb-2">Grid Interaction</h4>
      <div className="grid grid-cols-1 gap-3">
        <div className="flex items-center justify-between card-glass p-3 rounded-lg">
          <div>
            <div className="text-xs text-slate-300">Export to Grid</div>
            <div className="text-lg font-semibold text-cyan-400">{exportKwh} kWh</div>
          </div>
          <div className="text-cyan-500">⬆️</div>
        </div>

        <div className="flex items-center justify-between card-glass p-3 rounded-lg">
          <div>
            <div className="text-xs text-slate-300">Import from Grid</div>
            <div className="text-lg font-semibold text-blue-300">{importKwh} kWh</div>
          </div>
          <div className="text-blue-400">⬇️</div>
        </div>

        <div className="flex items-center justify-between card-glass p-3 rounded-lg">
          <div>
            <div className="text-xs text-slate-300">Net Balance</div>
            <div className={`text-lg font-semibold ${net>=0? 'text-green-400':'text-red-400'}`}>{net} kWh</div>
          </div>
          <div className="text-slate-400">Status: Online</div>
        </div>
      </div>
    </div>
  )
}
