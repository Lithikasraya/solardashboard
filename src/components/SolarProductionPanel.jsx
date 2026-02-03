import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts'

export default function SolarProductionPanel({power=0, totals={}}){
  // Simulated historical data for generation comparisons
  const today = totals.daily || 12.5
  const yesterday = totals.daily ? totals.daily * 0.92 : 11.5
  const dayBeforeYesterday = totals.daily ? totals.daily * 0.88 : 11.0
  const monthly = totals.monthly || 350

  // Data for bar chart: Today, Yesterday, Day-Before - using radiant gradient colors
  const chartData = [
    { name: 'Today', generation: today, fill: 'url(#gradGenToday)' },
    { name: 'Yesterday', generation: yesterday, fill: 'url(#gradGenYest)' },
    { name: 'Day-Before', generation: dayBeforeYesterday, fill: 'url(#gradGenPrev)' }
  ]

  // Hourly generation data (simulated)
  const hourlyData = [
    { hour: '6AM', kWh: 0.2, fill: 'url(#gradHourGreen)' },
    { hour: '8AM', kWh: 2.1, fill: 'url(#gradHourGreen)' },
    { hour: '10AM', kWh: 3.8, fill: 'url(#gradHourBlue)' },
    { hour: '12PM', kWh: 4.2, fill: 'url(#gradHourBlue)' },
    { hour: '2PM', kWh: 3.9, fill: 'url(#gradHourPurple)' },
    { hour: '4PM', kWh: 2.5, fill: 'url(#gradHourPurple)' },
    { hour: '6PM', kWh: 0.8, fill: 'url(#gradHourPink)' }
  ]

  // Monthly comparison data (simulated)
  const monthlyData = [
    { month: 'Jan', total: 280, fill: 'url(#gradMonthGreen)' },
    { month: 'Feb', total: 320, fill: 'url(#gradMonthBlue)' },
    { month: 'Mar', total: 380, fill: 'url(#gradMonthPurple)' },
    { month: 'Apr', total: 420, fill: 'url(#gradMonthPink)' },
    { month: 'May', total: 450, fill: 'url(#gradMonthGreen)' },
    { month: 'Jun', total: 480, fill: 'url(#gradMonthBlue)' }
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <div className="text-sm dark:text-slate-300 text-slate-600">Live: {power} kW</div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="card-glass p-4 rounded-lg">
          <div className="text-sm dark:text-slate-300 text-slate-600">Today's Generation</div>
          <div className="text-2xl font-bold gradient-text-rad">{today.toFixed(2)} kWh</div>
        </div>
        <div className="card-glass p-4 rounded-lg">
          <div className="text-sm dark:text-slate-300 text-slate-600">Yesterday's Generation</div>
          <div className="text-2xl font-bold gradient-text-rad">{yesterday.toFixed(2)} kWh</div>
        </div>
        <div className="card-glass p-4 rounded-lg">
          <div className="text-sm dark:text-slate-300 text-slate-600">Monthly Total</div>
          <div className="text-2xl font-bold gradient-text-rad">{monthly.toFixed(2)} kWh</div>
        </div>
      </div>

      {/* Bar Chart - 3 Day Comparison */}
      <div className="card-glass p-4 rounded-lg">
        <h4 className="text-sm font-medium mb-3 dark:text-slate-200 text-slate-700">3-Day Generation Comparison</h4>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={chartData} margin={{top:5, right:30, left:0, bottom:5}}>
            <defs>
              <linearGradient id="gradGenToday" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              <linearGradient id="gradGenYest" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <linearGradient id="gradGenPrev" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="name" stroke="currentColor" className="dark:text-slate-300 text-slate-700" />
            <YAxis stroke="currentColor" label={{ value: 'kWh', angle: -90, position: 'insideLeft', fill: 'currentColor' }} className="dark:text-slate-300 text-slate-700" />
            <Tooltip 
              contentStyle={{backgroundColor: 'rgba(15,23,42,0.95)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '8px', color: '#fff'}}
              labelStyle={{color: '#e0f2fe'}}
              formatter={(value) => `${value.toFixed(2)} kWh`}
            />
            <Bar dataKey="generation" radius={[6, 6, 0, 0]} barSize={32}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart - Hourly Generation */}
      <div className="card-glass p-4 rounded-lg">
        <h4 className="text-sm font-medium mb-3 dark:text-slate-200 text-slate-700">Hourly Generation (Today)</h4>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={hourlyData} margin={{top:5, right:30, left:0, bottom:5}}>
            <defs>
              <linearGradient id="gradHourGreen" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
              <linearGradient id="gradHourBlue" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
              <linearGradient id="gradHourPurple" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
              <linearGradient id="gradHourPink" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#f472b6" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="hour" stroke="currentColor" className="dark:text-slate-300 text-slate-700" />
            <YAxis stroke="currentColor" label={{ value: 'kWh', angle: -90, position: 'insideLeft', fill: 'currentColor' }} className="dark:text-slate-300 text-slate-700" />
            <Tooltip 
              contentStyle={{backgroundColor: 'rgba(15,23,42,0.95)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '8px', color: '#fff'}}
              labelStyle={{color: '#e0f2fe'}}
              formatter={(value) => `${value.toFixed(2)} kWh`}
            />
            <Bar dataKey="kWh" radius={[5, 5, 0, 0]} barSize={24}>
              {hourlyData.map((entry, index) => (
                <Cell key={`hour-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart - Monthly Comparison */}
      <div className="card-glass p-4 rounded-lg">
        <h4 className="text-sm font-medium mb-3 dark:text-slate-200 text-slate-700">Monthly Generation Trend</h4>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={monthlyData} margin={{top:5, right:30, left:0, bottom:5}}>
            <defs>
              <linearGradient id="gradMonthGreen" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
              <linearGradient id="gradMonthBlue" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
              <linearGradient id="gradMonthPurple" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
              <linearGradient id="gradMonthPink" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#f472b6" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" stroke="currentColor" className="dark:text-slate-300 text-slate-700" />
            <YAxis stroke="currentColor" label={{ value: 'kWh', angle: -90, position: 'insideLeft', fill: 'currentColor' }} className="dark:text-slate-300 text-slate-700" />
            <Tooltip 
              contentStyle={{backgroundColor: 'rgba(15,23,42,0.95)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '8px', color: '#fff'}}
              labelStyle={{color: '#e0f2fe'}}
              formatter={(value) => `${value.toFixed(0)} kWh`}
            />
            <Bar dataKey="total" radius={[5, 5, 0, 0]} barSize={28}>
              {monthlyData.map((entry, index) => (
                <Cell key={`month-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
