import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts'

export default function GridComparison({ totals = {} }) {
  // Simulated grid metrics
  const dailyGeneration = totals.daily || 12.5;
  const exportedToGrid = dailyGeneration * 0.4; // 40% exported
  const selfConsumption = dailyGeneration * 0.6; // 60% self-consumed
  
  const gridExportRate = 6; // ₹ per kWh
  const gridCostRate = 8; // ₹ per kWh (avoided cost)
  
  const gridEarnings = exportedToGrid * gridExportRate;
  const costSavedSelfUse = selfConsumption * gridCostRate;
  const costWithoutGridBenefit = dailyGeneration * gridCostRate; // Full cost if no export
  const costWithGridBenefit = costWithoutGridBenefit - gridEarnings; // Reduced cost due to export earnings
  
  // Chart data
  const chartData = [
    { category: 'Without Grid\nBenefit', value: costWithoutGridBenefit, fill: 'url(#gridGrad1)' },
    { category: 'With Grid\nBenefit', value: costWithGridBenefit, fill: 'url(#gridGrad2)' }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold dark:text-white text-slate-900">🔌 Grid Cost Comparison</h3>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="card-glass p-4 rounded-lg">
          <div className="text-xs dark:text-slate-400 text-slate-600">Power Exported to Grid</div>
          <div className="text-2xl font-bold text-cyan-400">{exportedToGrid.toFixed(2)} kWh</div>
          <div className="text-xs dark:text-slate-500 text-slate-500 mt-1">Earned: ₹ {gridEarnings.toFixed(0)}</div>
        </div>
        <div className="card-glass p-4 rounded-lg">
          <div className="text-xs dark:text-slate-400 text-slate-600">Self-Consumed</div>
          <div className="text-2xl font-bold text-amber-400">{selfConsumption.toFixed(2)} kWh</div>
          <div className="text-xs dark:text-slate-500 text-slate-500 mt-1">Saved: ₹ {costSavedSelfUse.toFixed(0)}</div>
        </div>
      </div>

      {/* Comparison Chart */}
      <div className="card-glass p-4 rounded-lg">
        <h4 className="text-sm font-medium mb-3 dark:text-slate-200 text-slate-700">Daily Cost Comparison</h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} margin={{top:5, right:30, left:0, bottom:20}}>
            <defs>
              <linearGradient id="gridGrad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                <stop offset="100%" stopColor="#ec4899" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="gridGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={1} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="category" stroke="currentColor" tick={{fill: 'currentColor'}} />
            <YAxis stroke="currentColor" tick={{fill: 'currentColor'}} label={{ value: '₹', angle: -90, position: 'insideLeft' }} />
            <Tooltip 
              contentStyle={{backgroundColor: 'rgba(15,23,42,0.95)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '8px', color: '#fff'}}
              labelStyle={{color: '#fff'}}
              formatter={(value) => `₹ ${value.toFixed(0)}`}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-3 text-xs dark:text-slate-400 text-slate-600 space-y-1">
          <div><strong>Without Grid Benefit:</strong> ₹ {costWithoutGridBenefit.toFixed(0)} (full consumption cost)</div>
          <div><strong>With Grid Benefit:</strong> ₹ {costWithGridBenefit.toFixed(0)} (after export earnings)</div>
          <div className="text-emerald-400 font-medium">Savings: ₹ {(costWithoutGridBenefit - costWithGridBenefit).toFixed(0)}/day</div>
        </div>
      </div>
    </div>
  )
}
