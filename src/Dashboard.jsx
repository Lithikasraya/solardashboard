import React, { useEffect, useState } from 'react'
import MetricCard from './components/MetricCard'
import ChartSection from './components/ChartSection'
import StatusPanel from './components/StatusPanel'
import InsightsPanel from './components/InsightsPanel'
import RevenuePanel from './components/RevenuePanel'
import DistributionPanel from './components/DistributionPanel'
import Recommendations from './components/Recommendations'
import Notifications from './components/Notifications'
import PowerGauges from './components/PowerGauges'
import SolarCards from './components/SolarCards'
import GridPanel from './components/GridPanel'
import GridComparison from './components/GridComparison'
import CameraPanel from './components/CameraPanel'
import AlertsPanel from './components/AlertsPanel'
import SolarProductionPanel from './components/SolarProductionPanel'
import SolarConsumptionPanel from './components/SolarConsumptionPanel'
import EfficiencyPanel from './components/EfficiencyPanel'
import FinancialSummary from './components/FinancialSummary'
import MaintenanceAlerts from './components/MaintenanceAlerts'
import SystemHealthRing from './components/SystemHealthRing'
import SettingsDrawer from './components/SettingsDrawer'
import SmartInsight from './components/SmartInsight'
import { SunIcon, MoonIcon, Cog6ToothIcon } from '@heroicons/react/24/solid'

export default function Dashboard(){
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('dashboardDark')
    return saved !== null ? JSON.parse(saved) : true
  })
  const [dataPoints, setDataPoints] = useState([])
  const [windSpeed, setWindSpeed] = useState(3.5)
  const [metrics, setMetrics] = useState({
    voltage: 360,
    current: 8.0,
    power: 2.88,
    temp: 35,
    lastUpdated: new Date(),
  })
  const [secondsSinceUpdate, setSecondsSinceUpdate] = useState(0)
  const [settings, setSettings] = useState({
    location: { name: 'Home', coords: [28.7041, 77.1025] },
    gridExport: true,
    cameraEnabled: true,
    liveMonitoring: true,
    alertsEnabled: true,
    refreshRate: 1.5,
  })

  // simple lifetime totals (kWh)
  const [totals, setTotals] = useState({ daily: 0, monthly: 0, yearly: 0, lifetime: 0 })

  // Fix dark/light mode with localStorage
  useEffect(()=>{
    localStorage.setItem('dashboardDark', JSON.stringify(dark))
    if(dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  },[dark])

  // Track seconds since last metrics update for live indicator
  useEffect(() => {
    const id = setInterval(() => {
      setSecondsSinceUpdate(Math.floor((Date.now() - new Date(metrics.lastUpdated)) / 1000))
    }, 1000)
    return () => clearInterval(id)
  }, [metrics.lastUpdated])

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

  // Simulate live updates
  useEffect(()=>{
    const id = setInterval(()=>{
      const voltage = +(250 + Math.random()*200).toFixed(1)
      const current = +(Math.random()*12).toFixed(2)
      const power = +((voltage * current)/1000).toFixed(3)
      const temp = +(25 + Math.random()*50).toFixed(1)
      const wind = +(Math.random()*12).toFixed(1)
      
      const point = { t: new Date(), power, voltage, current }
      setDataPoints(prev => {
        const next = [...prev.slice(-59), point]
        return next
      })
      setMetrics({ voltage, current, power, temp, lastUpdated: new Date() })
      setWindSpeed(wind)
      
      // accumulate simple kWh totals (approx): power(kW) * interval_hours
      const intervalHours = 1.5/3600 // since interval 1500ms, represent small increment
      const deltaKwh = power * intervalHours
      setTotals(prev => ({
        daily: +(prev.daily + deltaKwh).toFixed(3),
        monthly: +(prev.monthly + deltaKwh).toFixed(3),
        yearly: +(prev.yearly + deltaKwh).toFixed(3),
        lifetime: +(prev.lifetime + deltaKwh).toFixed(3)
      }))
    }, 2000)
    return ()=>clearInterval(id)
  },[])

  return (
    <div className="min-h-screen dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 bg-gradient-to-br from-sky-50 via-white to-yellow-50 p-6 transition-colors duration-500">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          {/* Mini solar panel image (inline SVG) */}
          <div className="mini-panel-image rounded-md overflow-hidden shadow-sm dark:shadow-[0_0_10px_rgba(255,204,0,0.08)]">
            <svg width="56" height="40" viewBox="0 0 56 40" xmlns="http://www.w3.org/2000/svg" className="block">
              <rect x="2" y="6" width="52" height="28" rx="3" fill="#0f172a" />
              <g fill="#ffd54a">
                <rect x="6" y="10" width="6" height="20" />
                <rect x="14" y="10" width="6" height="20" />
                <rect x="22" y="10" width="6" height="20" />
                <rect x="30" y="10" width="6" height="20" />
                <rect x="38" y="10" width="6" height="20" />
              </g>
            </svg>
          </div>

          <div>
            <h1 className="text-3xl font-bold dark:text-white text-slate-900">Solar Plant Monitoring</h1>
            <p className="text-sm dark:text-slate-400 text-slate-600">Real-Time Energy Performance & System Control • Live Data Streaming</p>
          </div>
        </div>

          <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <SystemHealthRing percent={92} />
            <div className="text-xs dark:text-slate-300 text-slate-600 text-right">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-shadow" />
                <span>Live</span>
              </div>
              <div className="text-[11px]">Last updated: {secondsSinceUpdate} sec ago</div>
            </div>
          </div>

          <MaintenanceAlerts />

          <button onClick={()=>setDark(!dark)} className="card-glass px-4 py-2 rounded-2xl flex items-center gap-2 transition-all hover:scale-105">
            {dark ? (
              <SunIcon className="w-5 h-5 text-yellow-400" />
            ) : (
              <MoonIcon className="w-5 h-5 text-slate-600" />
            )}
            <span className="text-sm dark:text-white text-slate-900">{dark? 'Dark' : 'Light'}</span>
          </button>
          
          {/* Settings button */}
          <button onClick={()=>setSettingsOpen(true)} aria-label="Open settings" className="ml-2 w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-105 settings-btn">
            <Cog6ToothIcon className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* SECTION 1: Solar Production */}
      <section className="mb-8">
        <h2 className="text-xl font-bold dark:text-white text-slate-900 mb-4 flex items-center gap-2">
          <span>🌞</span> Solar Production
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 card-glass p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 energy-pulse pulse-active">
            <SolarProductionPanel power={metrics.power} totals={totals} />
          </div>
          <div className="card-glass p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <EfficiencyPanel />
            <div className="mt-4">
              <SmartInsight message="🌞 Great sunlight today!" sub="You saved more energy than yesterday" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Financial Insights */}
      <section className="mb-8">
        <h2 className="text-xl font-bold dark:text-white text-slate-900 mb-4 flex items-center gap-2">
          <span>💰</span> Financial Insights
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="card-glass p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <FinancialSummary totals={totals} />
          </div>
          <div className="card-glass p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <GridComparison totals={totals} />
          </div>
        </div>
      </section>

      {/* SECTION 3: Solar Monitoring */}
      <section className="mb-8">
        <h2 className="text-xl font-bold dark:text-white text-slate-900 mb-4 flex items-center gap-2">
          <span>📹</span> Solar Plant Monitoring
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 card-glass p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <CameraPanel enabled={settings.cameraEnabled} live={settings.liveMonitoring} setEnabled={(val)=>setSettings({...settings, cameraEnabled: val})} />
          </div>
          <div className="card-glass p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <AlertsPanel metrics={metrics} totals={totals} />
          </div>
        </div>
      </section>

      {/* Legacy sections hidden */}
      <section className="hidden">
        <PowerGauges metrics={metrics} totals={totals} />
        <SolarCards totals={totals} />
        <GridPanel totals={totals} />
        <SolarConsumptionPanel power={metrics.power} totals={totals} />
      </section>

      <section className="hidden">
        <div className="card-glass p-4 rounded-2xl shadow-lg">
          <Notifications metrics={metrics} />
        </div>
      </section>

      <SettingsDrawer open={settingsOpen} onClose={()=>setSettingsOpen(false)} settings={settings} setSettings={setSettings} setDark={setDark} />

      <footer className="mt-8 text-sm dark:text-slate-400 text-slate-600 text-center">
        Last updated: {metrics.lastUpdated.toLocaleTimeString()} • Updated {secondsSinceUpdate} sec ago
      </footer>
    </div>
  )
}
