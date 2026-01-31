import React from 'react'

export default function RevenuePanel({totals, settings}){
  const {currency, tariff} = settings
  // simplistic revenue calc: revenue = exported_kwh * tariff; assume 40% exported
  const exportedFactor = settings.gridExport? 0.4 : 0.05
  const todayEarned = +(totals.daily * exportedFactor * tariff).toFixed(2)
  const monthly = +(totals.monthly * exportedFactor * tariff).toFixed(2)
  const lifetime = +(totals.lifetime * exportedFactor * tariff).toFixed(2)
  const paybackYears = lifetime > 0 ? +(50000 / lifetime).toFixed(1) : '—' // placeholder system cost 50k

  return (
    <div>
      <h3 className="text-lg font-medium">Revenue & Savings</h3>
      <div className="mt-3 grid grid-cols-1 gap-3">
        <div className="flex items-center justify-between card-glass p-3 rounded-2xl">
          <div>
            <div className="text-sm text-slate-300">Money Earned Today</div>
            <div className="text-2xl font-semibold">{currency}{todayEarned}</div>
          </div>
          <div className="text-sm text-slate-400">Tariff: {currency}{tariff}/kWh</div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="card-glass p-3 rounded-2xl">
            <div className="text-sm text-slate-300">Monthly Revenue</div>
            <div className="font-semibold">{currency}{monthly}</div>
          </div>
          <div className="card-glass p-3 rounded-2xl">
            <div className="text-sm text-slate-300">Lifetime Earnings</div>
            <div className="font-semibold">{currency}{lifetime}</div>
          </div>
        </div>

        <div className="card-glass p-3 rounded-2xl">
          <div className="text-sm text-slate-300">ROI / Payback</div>
          <div className="font-semibold">{paybackYears} years (est.)</div>
        </div>
      </div>
    </div>
  )
}
