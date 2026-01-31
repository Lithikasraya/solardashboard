import React, { useEffect, useState } from 'react'
import MetricCard from './components/MetricCard'
import ChartSection from './components/ChartSection'
import StatusPanel from './components/StatusPanel'
import InsightsPanel from './components/InsightsPanel'
import RevenuePanel from './components/RevenuePanel'
import MapPanel from './components/MapPanel'
import DistributionPanel from './components/DistributionPanel'
import Recommendations from './components/Recommendations'
import Notifications from './components/Notifications'
import SettingsPanel from './components/SettingsPanel'
import { SunIcon } from '@heroicons/react/24/solid'

export default function Dashboard(){
  const [dark, setDark] = useState(true)
  const [dataPoints, setDataPoints] = useState([])
  const [metrics, setMetrics] = useState({
    voltage: 360,
    current: 8.0,
    power: 2.88,
    temp: 35,
    lastUpdated: new Date(),
  })
  const [settings, setSettings] = useState({
    currency: '₹',
    tariff: 6.5, // currency per kWh
    location: { name: 'Home', coords: [28.7041, 77.1025] },
    gridExport: true,
  })

  // simple lifetime totals (kWh)
  const [totals, setTotals] = useState({ daily: 0, monthly: 0, yearly: 0, lifetime: 0 })

  useEffect(()=>{
    if(dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  },[dark])

  // Initialize small history
  useEffect(()=>{
    const initial = []
    for(let i=0;i<20;i++){
      initial.push({
        t: new Date(Date.now() - (20-i)*1000),
        power: +(Math.random()*3).toFixed(2),
        voltage: 250 + Math.random()*200,
        current: Math.random()*12
      })
    }
    setDataPoints(initial)
  },[])

  // Simulate updates
  useEffect(()=>{
    const id = setInterval(()=>{
      const voltage = +(250 + Math.random()*200).toFixed(1)
      const current = +(Math.random()*12).toFixed(2)
      const power = +((voltage * current)/1000).toFixed(3)
      const temp = +(25 + Math.random()*50).toFixed(1)
      const point = { t: new Date(), power, voltage, current }
      setDataPoints(prev => {
        const next = [...prev.slice(-59), point]
        return next
      })
      setMetrics({ voltage, current, power, temp, lastUpdated: new Date() })
      // accumulate simple kWh totals (approx): power(kW) * interval_hours
      const intervalHours = 1.5/3600 // since interval 1500ms, represent small increment
      const deltaKwh = power * intervalHours
      setTotals(prev => ({
        daily: +(prev.daily + deltaKwh).toFixed(3),
        monthly: +(prev.monthly + deltaKwh).toFixed(3),
        yearly: +(prev.yearly + deltaKwh).toFixed(3),
        lifetime: +(prev.lifetime + deltaKwh).toFixed(3)
      }))
    }, 1500)
    return ()=>clearInterval(id)
  },[])

  return (
    <div className="min-h-screen p-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">3 kW Solar Panel Monitoring Dashboard</h1>
          <p className="text-sm text-slate-300">Real-Time Energy Performance</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={()=>setDark(!dark)} className="card-glass px-3 py-2 rounded-2xl flex items-center gap-2">
            <SunIcon className="w-5 h-5 text-yellow-400" />
            <span className="text-sm">{dark? 'Dark' : 'Light'}</span>
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard title="Voltage" value={metrics.voltage} unit="V" icon="⚡" thresholds={[300,400]} />
        <MetricCard title="Current" value={metrics.current} unit="A" icon="🔋" thresholds={[4,9]} />
        <MetricCard title="Power" value={metrics.power} unit="kW" icon="⚡" thresholds={[1.5,2.7]} max={3} />
        <MetricCard title="Panel Temp" value={metrics.temp} unit="°C" icon="🌡️" thresholds={[40,60]} />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2 card-glass p-4 rounded-2xl shadow-lg">
          <MapPanel location={settings.location} dataPoints={dataPoints} />
        </div>
        <div className="card-glass p-4 rounded-2xl shadow-lg">
          <SettingsPanel settings={settings} setSettings={setSettings} />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2 card-glass p-4 rounded-2xl shadow-lg">
          <InsightsPanel totals={totals} maxCapacity={3} power={metrics.power} />
          <div className="mt-4"><ChartSection data={dataPoints} maxPower={3} /></div>
        </div>
        <div className="card-glass p-4 rounded-2xl shadow-lg space-y-4">
          <RevenuePanel totals={totals} settings={settings} />
          <DistributionPanel metrics={metrics} />
          <Recommendations metrics={metrics} settings={settings} />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4">
        <div className="card-glass p-4 rounded-2xl shadow-lg">
          <Notifications metrics={metrics} />
        </div>
      </section>

      <footer className="mt-6 text-sm text-slate-400">Last updated: {metrics.lastUpdated.toLocaleTimeString()}</footer>
    </div>
  )
}
