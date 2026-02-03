import React from 'react'

export default function SettingsPanel({settings={}, setSettings=()=>{}}){
  const updateSetting = (key, value) => {
    setSettings({...settings, [key]: value})
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold dark:text-white text-slate-900">⚙️ Dashboard Settings</h3>

      {/* Theme Toggle */}
      <div className="card-glass p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium dark:text-slate-200 text-slate-700">Theme</label>
          <span className="text-xs dark:text-slate-400 text-slate-500">Light/Dark available via header button</span>
        </div>
        <p className="text-xs dark:text-slate-400 text-slate-500">Use the sun/moon button in the header to toggle theme. Your preference is saved automatically.</p>
      </div>

      {/* Camera Control */}
      <div className="card-glass p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium dark:text-slate-200 text-slate-700">Camera Monitoring</label>
          <button 
            onClick={() => updateSetting('cameraEnabled', !settings.cameraEnabled)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              settings.cameraEnabled 
                ? 'bg-emerald-600 text-white' 
                : 'bg-slate-700 text-slate-300'
            }`}
          >
            {settings.cameraEnabled ? 'Enabled' : 'Disabled'}
          </button>
        </div>
        <p className="text-xs dark:text-slate-400 text-slate-500 mt-2">Enable or disable camera monitoring from the dashboard</p>
      </div>

      {/* Alerts Toggle */}
      <div className="card-glass p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium dark:text-slate-200 text-slate-700">System Alerts</label>
          <button 
            onClick={() => updateSetting('alertsEnabled', !settings.alertsEnabled)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              settings.alertsEnabled 
                ? 'bg-emerald-600 text-white' 
                : 'bg-slate-700 text-slate-300'
            }`}
          >
            {settings.alertsEnabled ? 'On' : 'Off'}
          </button>
        </div>
        <p className="text-xs dark:text-slate-400 text-slate-500 mt-2">Receive notifications for system warnings and maintenance alerts</p>
      </div>

      {/* Refresh Rate */}
      <div className="card-glass p-4 rounded-lg">
        <label className="text-sm font-medium dark:text-slate-200 text-slate-700 block mb-2">Data Refresh Rate</label>
        <select 
          value={settings.refreshRate || 1.5}
          onChange={(e) => updateSetting('refreshRate', parseFloat(e.target.value))}
          className="w-full p-2 rounded-lg bg-slate-800 dark:text-white text-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={0.5}>Very Fast (0.5s)</option>
          <option value={1.5}>Fast (1.5s)</option>
          <option value={3}>Normal (3s)</option>
          <option value={5}>Slow (5s)</option>
        </select>
        <p className="text-xs dark:text-slate-400 text-slate-500 mt-2">How frequently data updates are fetched</p>
      </div>

      {/* System Info */}
      <div className="card-glass p-4 rounded-lg bg-slate-800/50">
        <h4 className="text-sm font-semibold dark:text-slate-200 text-slate-700 mb-2">System Information</h4>
        <div className="space-y-1 text-xs dark:text-slate-400 text-slate-600">
          <div><strong>System Type:</strong> 3 kW Solar Plant</div>
          <div><strong>Monitoring Mode:</strong> Real-Time</div>
          <div><strong>Data Points:</strong> Streaming</div>
          <div><strong>Last Sync:</strong> Now</div>
        </div>
      </div>
    </div>
  )
}
