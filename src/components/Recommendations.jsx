import React from 'react'

export default function Recommendations({metrics, settings}){
  const recs = []
  if(metrics.power > 2.5) recs.push('High generation detected – run heavy appliances now')
  if(metrics.temp > 60) recs.push('High panel temperature — consider inspection')
  if(!settings.gridExport) recs.push('Grid export is OFF — enable to sell surplus energy')
  if(recs.length===0) recs.push('System operating normally — no immediate actions')

  return (
    <div>
      <h4 className="text-sm font-medium">Smart Recommendations</h4>
      <ul className="mt-2 text-sm text-slate-300 space-y-1">
        {recs.map((r,i)=>(<li key={i}>• {r}</li>))}
      </ul>
    </div>
  )
}
