import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts'

function timeLabel(t){
  return new Date(t).toLocaleTimeString()
}

export default function ChartSection({data, maxPower=3}){
  const recent = data.map(d=>({
    time: timeLabel(d.t),
    power: +d.power,
    voltage: Math.round(d.voltage),
    current: +(+d.current).toFixed(2)
  }))

  const latest = data.length? data[data.length-1].power : 0
  const pct = Math.round((latest/maxPower)*100)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Power vs Time</h3>
        <div className="text-sm text-slate-300">Utilization: {pct}%</div>
      </div>

      <div style={{width:'100%', height:220}}>
        <ResponsiveContainer>
          <LineChart data={recent}>
            <XAxis dataKey="time" hide />
            <YAxis domain={[0, maxPower]} />
            <Tooltip />
            <Line type="monotone" dataKey="power" stroke="#34d399" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div style={{height:180}} className="card-glass p-3 rounded-2xl">
          <h4 className="text-sm text-slate-300 mb-2">Voltage & Current</h4>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={recent}>
              <XAxis dataKey="time" hide />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="voltage" fill="#60a5fa" />
              <Bar dataKey="current" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card-glass p-4 rounded-2xl flex flex-col items-center justify-center">
          <h4 className="text-sm text-slate-300 mb-2">Power Utilization</h4>
          <div className="w-36 h-36 flex items-center justify-center">
            <svg viewBox="0 0 36 36" className="w-32 h-32">
              <path d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2z" fill="none" stroke="#0f172a" strokeWidth="4" />
              <circle r="15.9155" cx="18" cy="18" fill="none" stroke="#e6e6e6" strokeWidth="2" strokeOpacity="0.06" />
              <path d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2z" fill="none" strokeWidth="4" strokeDasharray={`${pct},100`} strokeLinecap="round" stroke="#34d399" transform="rotate(-90 18 18)" />
              <text x="18" y="21" fill="#cbd5e1" fontSize="6" textAnchor="middle">{pct}%</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
