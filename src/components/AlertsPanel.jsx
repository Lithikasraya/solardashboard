import React from 'react'

export default function AlertsPanel({metrics={}, totals={}}){
  const alerts = []
  
  if((metrics.temp||0) > 45) alerts.push({level:'critical', icon:'🔥', text:'Over-temperature detected'})
  if((metrics.temp||0) > 35) alerts.push({level:'warning', icon:'⚠️', text:'Temperature is elevated'})
  if((totals.daily||0) < 0.05) alerts.push({level:'warning', icon:'☁️', text:'Low generation today'})
  if((metrics.power||0) < 0.1) alerts.push({level:'info', icon:'ℹ️', text:'Low solar output'})

  // Add maintenance reminder
  alerts.push({level:'info', icon:'🔧', text:'Scheduled maintenance in 7 days'})

  const severityColor = (level) => {
    switch(level){
      case 'critical': return 'bg-red-900/40 border-red-700 dark:text-red-200 text-red-700'
      case 'warning': return 'bg-amber-900/40 border-amber-700 dark:text-amber-200 text-amber-700'
      default: return 'bg-blue-900/40 border-blue-700 dark:text-blue-200 text-blue-700'
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold dark:text-white text-slate-900">🔔 Maintenance & Alerts</h4>
        <div className="text-xs font-bold dark:text-slate-300 text-slate-600">{alerts.length} active</div>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {alerts.length===0 && (
          <div className="p-3 rounded-lg bg-emerald-900/30 border border-emerald-700 dark:text-emerald-200 text-emerald-700 text-sm">
            ✓ No active alerts - system operating normally
          </div>
        )}
        {alerts.map((a, i)=> (
          <div key={i} className={`p-3 rounded-lg border flex items-start justify-between ${severityColor(a.level)}`}>
            <div className="flex gap-2">
              <span className="text-lg">{a.icon}</span>
              <div>
                <div className="text-sm font-semibold">{a.text}</div>
                <div className="text-xs opacity-75 mt-1 capitalize">{a.level}</div>
              </div>
            </div>
            <button className="text-xs opacity-50 hover:opacity-100 transition-opacity">✕</button>
          </div>
        ))}
      </div>

      {/* Alert Summary */}
      <div className="card-glass p-3 rounded-lg text-xs dark:text-slate-400 text-slate-600 space-y-1">
        <div className="font-semibold dark:text-slate-200 text-slate-700">System Status: Operational</div>
        <div>Last check: Just now</div>
      </div>
    </div>
  )
}
