import React, { useState } from 'react'

export default function MaintenanceAlerts(){
  const [open, setOpen] = useState(false)
  const alerts = [
    { id: 1, title: 'Panel cleaning reminder', when: '2 days' },
    { id: 2, title: 'Temperature warning', when: 'Now' },
    { id: 3, title: 'Low generation notice', when: '3 hours' },
    { id: 4, title: 'Inspection due', when: '7 days' }
  ]

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="card-glass p-2 rounded-full flex items-center gap-2 hover:scale-105 transition-transform">
        <span className="text-lg">🔔</span>
        <span className="text-xs font-medium dark:text-white text-slate-800">Alerts</span>
        <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs rounded-full bg-red-500 text-white">{alerts.length}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl p-3 z-50">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold dark:text-white text-slate-900">Maintenance Alerts</div>
            <button onClick={() => setOpen(false)} className="text-xs text-slate-500">Close</button>
          </div>
          <div className="space-y-2 text-xs">
            {alerts.map(a => (
              <div key={a.id} className="p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800">
                <div className="font-medium dark:text-white text-slate-900">{a.title}</div>
                <div className="text-xs dark:text-slate-400 text-slate-600">{a.when} ago</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
