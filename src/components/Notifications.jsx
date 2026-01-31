import React from 'react'

export default function Notifications({metrics}){
  const alerts = []
  if(metrics.temp > 65) alerts.push({type:'warning', text:'Over-temperature warning'})
  if(metrics.power < 0.05) alerts.push({type:'danger', text:'Low generation — check system'})
  if(alerts.length===0) alerts.push({type:'info', text:'All systems nominal'})

  return (
    <div>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Alerts & Notifications</h4>
        <div className="text-sm text-slate-400">Bell 🔔</div>
      </div>
      <div className="mt-3 space-y-2">
        {alerts.map((a,i)=>(
          <div key={i} className={`p-3 rounded-lg ${a.type==='danger'? 'bg-red-600/20': a.type==='warning'? 'bg-yellow-600/10': 'bg-slate-700'} text-sm`}>{a.text}</div>
        ))}
      </div>
    </div>
  )
}
