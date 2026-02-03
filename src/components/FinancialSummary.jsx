import React from 'react'

export default function FinancialSummary({ totals = {} }) {
  // Simulated financial metrics (based on current generation)
  const costPerKwh = 8; // ₹ per kWh (approximate grid rate)
  const gridSoldRate = 6; // ₹ per kWh (export rate)
  
  const dailyGeneration = totals.daily || 12.5;
  const monthlyGeneration = totals.monthly || 350;
  
  // Financial calculations
  const dailySavings = dailyGeneration * costPerKwh; // Cost savings vs grid (self-consumption)
  const dailyGridEarnings = dailyGeneration * 0.4 * gridSoldRate; // Assume 40% exported
  const monthlySavings = monthlyGeneration * costPerKwh;
  const monthlyGridEarnings = monthlyGeneration * 0.4 * gridSoldRate;
  
  const totalDailyValue = dailySavings + dailyGridEarnings;
  const totalMonthlyValue = monthlySavings + monthlyGridEarnings;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold dark:text-white text-slate-900">💰 Financial Summary</h3>
      
      {/* Daily Cards */}
      <div className="space-y-3">
        <div className="card-glass p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-xs dark:text-slate-400 text-slate-600">Daily Value Generated</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                ₹ {totalDailyValue.toFixed(0)}
              </div>
            </div>
            <div className="text-3xl">💵</div>
          </div>
          <div className="text-xs dark:text-slate-500 text-slate-500 space-y-1">
            <div>Self-use savings: ₹ {dailySavings.toFixed(0)}</div>
            <div>Grid export earnings: ₹ {dailyGridEarnings.toFixed(0)}</div>
          </div>
        </div>

        <div className="card-glass p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-xs dark:text-slate-400 text-slate-600">Monthly Value Generated</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
                ₹ {totalMonthlyValue.toFixed(0)}
              </div>
            </div>
            <div className="text-3xl">📈</div>
          </div>
          <div className="text-xs dark:text-slate-500 text-slate-500 space-y-1">
            <div>Monthly self-savings: ₹ {monthlySavings.toFixed(0)}</div>
            <div>Monthly grid earnings: ₹ {monthlyGridEarnings.toFixed(0)}</div>
          </div>
        </div>
      </div>

      {/* Comparison Bar */}
      <div className="card-glass p-4 rounded-lg">
        <div className="text-xs font-medium dark:text-slate-300 text-slate-700 mb-3">Comparison: Cost Savings vs Grid Earnings</div>
        <div className="space-y-2">
          {/* Self-savings bar */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs dark:text-slate-400 text-slate-600">Savings (60% self-use)</span>
              <span className="text-xs font-semibold dark:text-yellow-400 text-yellow-600">{(dailySavings).toFixed(0)} ₹/day</span>
            </div>
            <div className="w-full h-2 dark:bg-slate-700 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                style={{width: `${Math.min(100, (dailySavings / 150) * 100)}%`}}
              />
            </div>
          </div>

          {/* Grid earnings bar */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs dark:text-slate-400 text-slate-600">Grid Export (40% exported)</span>
              <span className="text-xs font-semibold dark:text-emerald-400 text-emerald-600">{(dailyGridEarnings).toFixed(0)} ₹/day</span>
            </div>
            <div className="w-full h-2 dark:bg-slate-700 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-green-400 rounded-full"
                style={{width: `${Math.min(100, (dailyGridEarnings / 150) * 100)}%`}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
