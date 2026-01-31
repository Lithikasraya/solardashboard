import React from 'react'

export default function SettingsPanel({settings, setSettings}){
  const changeCurrency = (c)=> setSettings(s=>({...s, currency:c}))
  const changeTariff = (v)=> setSettings(s=>({...s, tariff: +v}))
  const toggleExport = ()=> setSettings(s=>({...s, gridExport: !s.gridExport}))

  return (
    <div>
      <h3 className="text-lg font-medium">Settings</h3>
      <div className="mt-3 space-y-3">
        <div className="card-glass p-3 rounded-2xl">
          <div className="text-sm text-slate-300">Currency</div>
          <div className="mt-2 flex gap-2">
            <button onClick={()=>changeCurrency('₹')} className={`px-3 py-1 rounded ${settings.currency==='₹'? 'bg-slate-600': 'bg-slate-700'}`}>₹</button>
            <button onClick={()=>changeCurrency('$')} className={`px-3 py-1 rounded ${settings.currency==='$'? 'bg-slate-600': 'bg-slate-700'}`}>$</button>
          </div>
        </div>

        <div className="card-glass p-3 rounded-2xl">
          <div className="flex items-center justify-between text-sm text-slate-300">Tariff ({settings.currency}/kWh)
            <input type="number" value={settings.tariff} onChange={(e)=>changeTariff(e.target.value)} className="ml-2 w-20 text-slate-900 p-1 rounded" />
          </div>
        </div>

        <div className="card-glass p-3 rounded-2xl flex items-center justify-between">
          <div className="text-sm text-slate-300">Export to Grid</div>
          <button onClick={toggleExport} className={`px-3 py-1 rounded ${settings.gridExport? 'bg-green-400 text-slate-900': 'bg-slate-700'}`}>{settings.gridExport? 'ON': 'OFF'}</button>
        </div>
      </div>
    </div>
  )
}
