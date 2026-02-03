import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

export default function SolarConsumptionPanel({power=0, totals={}}){
  const consumed = +(power * 0.65).toFixed(2)
  const excess = +(power * 0.35).toFixed(2)
  const selfUsePercent = 65

  const pieData = [
    { name: 'Used', value: 65, fill: '#3b82f6' },
    { name: 'Unused', value: 35, fill: '#94a3b8' }
  ]

  const energyUsed = +(totals.daily * 0.7).toFixed(2)
  const energyExported = +(totals.daily * 0.3).toFixed(2)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold dark:text-white text-slate-900">⚡ Power Consumption</h3>
        <div className="text-sm dark:text-slate-300 text-slate-600">Consumed: {consumed} kW</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="card-glass p-4 rounded-lg">
          <div className="text-sm dark:text-slate-300 text-slate-600">Power Consumed from Solar</div>
          <div className="text-2xl font-bold text-blue-400">{consumed} kW</div>
        </div>
        <div className="card-glass p-4 rounded-lg">
          <div className="text-sm dark:text-slate-300 text-slate-600">Excess Power (Exportable)</div>
          <div className="text-2xl font-bold text-slate-400">{excess} kW</div>
        </div>
        <div className="card-glass p-4 rounded-lg">
          <div className="text-sm dark:text-slate-300 text-slate-600">Energy Consumed (Today)</div>
          <div className="text-2xl font-bold text-green-400">{energyUsed} kWh</div>
        </div>
        <div className="card-glass p-4 rounded-lg">
          <div className="text-sm dark:text-slate-300 text-slate-600">Energy Exported (Today)</div>
          <div className="text-2xl font-bold text-cyan-400">{energyExported} kWh</div>
        </div>
      </div>

      {/* Self-consumption Progress Bar */}
      <div className="card-glass p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium dark:text-slate-200 text-slate-700">Self-Consumption Rate</div>
          <div className="text-sm font-bold text-green-400">{selfUsePercent}%</div>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
          <div 
            style={{width: `${selfUsePercent}%`}}
            className="h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all"
          />
        </div>
        <p className="text-xs dark:text-slate-400 text-slate-500 mt-2">High self-consumption indicates efficient solar utilization</p>
      </div>

      {/* Pie Chart */}
      <div className="card-glass p-4 rounded-lg flex items-center justify-center">
        <div className="w-32 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                dataKey="value"
                label={false}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="ml-4 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm dark:text-slate-300 text-slate-600">Used: 65%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-500"></div>
            <span className="text-sm dark:text-slate-300 text-slate-600">Unused: 35%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
