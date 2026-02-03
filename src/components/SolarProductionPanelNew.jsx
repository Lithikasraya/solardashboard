import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Cell } from 'recharts'

export default function SolarProductionPanel({power=0, totals={}}){
  // Simulated historical data for generation comparisons
  const today = totals.daily || 12.5
  const yesterday = totals.daily ? totals.daily * 0.92 : 11.5
  const dayBeforeYesterday = totals.daily ? totals.daily * 0.88 : 11.0
  const monthly = totals.monthly || 350

  // Data for bar chart: Today, Yesterday, Day-Before - using radiant gradient colors
  const chartData = [
    { name: 'Today', generation: today, fill: 'url(#gradGenTodayNew)' },
    { name: 'Yesterday', generation: yesterday, fill: 'url(#gradGenYestNew)' },
    { name: 'Day-Before', generation: dayBeforeYesterday, fill: 'url(#gradGenPrevNew)' }
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold dark:text-white text-slate-900">☀️ Solar Production</h3>
        <div className="text-sm dark:text-slate-300 text-slate-600">Live: {power} kW</div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="card-glass p-4 rounded-lg">
          <div className="text-sm dark:text-slate-300 text-slate-600">Today's Generation</div>
          <div className="text-2xl font-bold text-yellow-400">{today.toFixed(2)} kWh</div>
        </div>
        <div className="card-glass p-4 rounded-lg">
          <div className="text-sm dark:text-slate-300 text-slate-600">Yesterday's Generation</div>
          <div className="text-2xl font-bold text-orange-400">{yesterday.toFixed(2)} kWh</div>
        </div>
        <div className="card-glass p-4 rounded-lg">
          <div className="text-sm dark:text-slate-300 text-slate-600">Monthly Total</div>
          <div className="text-2xl font-bold text-amber-400">{monthly.toFixed(2)} kWh</div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="card-glass p-4 rounded-lg">
        <h4 className="text-sm font-medium mb-3 dark:text-slate-200 text-slate-700">3-Day Generation Comparison</h4>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={chartData} margin={{top:5, right:30, left:0, bottom:5}}>
            <defs>
              <linearGradient id="gradGenTodayNew" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              <linearGradient id="gradGenYestNew" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <linearGradient id="gradGenPrevNew" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" />
            <YAxis stroke="rgba(255,255,255,0.3)" label={{ value: 'kWh', angle: -90, position: 'insideLeft' }} />
            <Tooltip 
              contentStyle={{backgroundColor: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px'}}
              labelStyle={{color: '#fff'}}
              formatter={(value) => `${value.toFixed(2)} kWh`}
            />
            <Bar dataKey="generation" radius={[6, 6, 0, 0]} barSize={32}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
