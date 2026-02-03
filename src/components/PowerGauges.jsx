import React from 'react'

function SemiGauge({label, value, max=100, color='#34d399', unit=''}){
  const pct = Math.min(100, Math.round((value/max)*100))
  return (
    <div className="card-glass p-4 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-slate-300">{label}</div>
        <div className="text-sm text-slate-400">{value}{unit}</div>
      </div>
      <div className="flex items-center justify-center">
        <svg viewBox="0 0 36 18" className="w-full h-14">
          <path d="M2 16 A16 16 0 0 1 34 16" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
          <path d="M2 16 A16 16 0 0 1 34 16" fill="none" strokeWidth="6" stroke={color} strokeLinecap="round" strokeDasharray={`${pct},100`} transform="translate(0,0)" />
          <text x="18" y="13" fill="#cbd5e1" fontSize="7" textAnchor="middle">{pct}%</text>
        </svg>
      </div>
    </div>
  )
}

export default function PowerGauges({metrics={}, totals={}}){
  const solarKW = +(metrics.power || 0).toFixed(2)
  const loadKW = Math.max(0, +(solarKW * 0.6).toFixed(2))
  const gridKW = +(solarKW - loadKW).toFixed(2)
  const battPct = Math.min(100, Math.round((totals.daily % 1) * 100))
  const temp = metrics.temp || 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <div className="lg:col-span-2 md:col-span-1">
        <SemiGauge label="Solar Production" value={solarKW} max={6} color="#f59e0b" unit=" kW" />
      </div>
      <div className="lg:col-span-2 md:col-span-1">
        <SemiGauge label="Total Load" value={loadKW} max={6} color="#60a5fa" unit=" kW" />
      </div>
      <div className="lg:col-span-2 md:col-span-1">
        <SemiGauge label="Grid Power" value={gridKW} max={6} color="#06b6d4" unit=" kW" />
      </div>
      <div className="lg:col-span-2 md:col-span-1">
        <SemiGauge label="Battery Power" value={Math.abs((battPct/100)*3).toFixed(2)} max={3} color="#a78bfa" unit=" kW" />
      </div>
      <div className="lg:col-span-2 md:col-span-1">
        <SemiGauge label="Battery Charge" value={battPct} max={100} color="#34d399" unit=" %" />
      </div>
      <div className="lg:col-span-2 md:col-span-1">
        <SemiGauge label="System Temp" value={temp} max={100} color={temp>50? '#fb7185' : '#f59e0b'} unit=" °C" />
      </div>
    </div>
  )
}
