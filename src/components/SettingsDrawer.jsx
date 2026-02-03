import React from 'react'

export default function SettingsDrawer({ open = false, onClose = () => {}, settings = {}, setSettings = () => {}, setDark = () => {} }) {
  if (!open) return null;

  const updateSetting = (key, value) => {
    setSettings({ ...settings, [key]: value })
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        style={{ zIndex: 40 }}
      />

      {/* Drawer */}
      <div 
        className={`fixed right-0 top-0 h-screen w-full max-w-md dark:bg-slate-900 bg-white shadow-2xl transform transition-transform duration-300 overflow-y-auto ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ zIndex: 50 }}
      >
        {/* Header */}
        <div className="sticky top-0 dark:bg-slate-800/80 bg-slate-100/80 backdrop-blur-md border-b dark:border-slate-700 border-slate-200 p-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold dark:text-white text-slate-900">Settings</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
            title="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 dark:text-white text-slate-900" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Settings Content */}
        <div className="p-6 space-y-6">
          {/* Theme Toggle */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold dark:text-slate-200 text-slate-700 uppercase tracking-wide">Appearance</h3>
            <div className="card-glass p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium dark:text-slate-200 text-slate-700">Dark Mode</label>
                <button 
                  onClick={() => setDark(prev => !prev)}
                  className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-300 dark:bg-emerald-600 transition-colors"
                >
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform dark:translate-x-6 translate-x-1" />
                </button>
              </div>
              <p className="text-xs dark:text-slate-400 text-slate-600 mt-2">Toggle between dark and light themes</p>
            </div>
          </div>

          {/* Monitoring Settings */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold dark:text-slate-200 text-slate-700 uppercase tracking-wide">Monitoring</h3>
            
            {/* Camera Control */}
            <div className="card-glass p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium dark:text-slate-200 text-slate-700">Camera Monitoring</label>
                <button 
                  onClick={() => updateSetting('cameraEnabled', !settings.cameraEnabled)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    settings.cameraEnabled 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {settings.cameraEnabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>
              <p className="text-xs dark:text-slate-400 text-slate-600">Enable camera monitoring for the solar plant</p>
            </div>

            {/* Live Monitoring */}
            <div className="card-glass p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium dark:text-slate-200 text-slate-700">Live Monitoring Indicator</label>
                <button 
                  onClick={() => updateSetting('liveMonitoring', !settings.liveMonitoring)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    settings.liveMonitoring 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {settings.liveMonitoring ? 'Visible' : 'Hidden'}
                </button>
              </div>
              <p className="text-xs dark:text-slate-400 text-slate-600">Show the live pill indicator next to camera section</p>
            </div>

            {/* Alerts Toggle */}
            <div className="card-glass p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium dark:text-slate-200 text-slate-700">System Alerts</label>
                <button 
                  onClick={() => updateSetting('alertsEnabled', !settings.alertsEnabled)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    settings.alertsEnabled 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {settings.alertsEnabled ? 'On' : 'Off'}
                </button>
              </div>
              <p className="text-xs dark:text-slate-400 text-slate-600">Receive notifications for warnings and maintenance alerts</p>
            </div>
          </div>

          {/* Data Settings */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold dark:text-slate-200 text-slate-700 uppercase tracking-wide">Data</h3>
            <div className="card-glass p-4 rounded-lg">
              <label className="text-sm font-medium dark:text-slate-200 text-slate-700 block mb-3">Data Refresh Rate</label>
              <select 
                value={settings.refreshRate || 1.5}
                onChange={(e) => updateSetting('refreshRate', parseFloat(e.target.value))}
                className="w-full p-2 rounded-lg bg-slate-100 dark:bg-slate-800 dark:text-white text-slate-900 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              >
                <option value={0.5}>Very Fast (0.5s)</option>
                <option value={1.5}>Fast (1.5s) - Default</option>
                <option value={3}>Normal (3s)</option>
                <option value={5}>Slow (5s)</option>
              </select>
              <p className="text-xs dark:text-slate-400 text-slate-600 mt-2">How frequently dashboard data updates</p>
            </div>
          </div>

          {/* System Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold dark:text-slate-200 text-slate-700 uppercase tracking-wide">System Information</h3>
            <div className="card-glass p-4 rounded-lg bg-slate-100/50 dark:bg-slate-800/50">
              <div className="space-y-2 text-xs dark:text-slate-400 text-slate-600">
                <div className="flex justify-between">
                  <span>System Type:</span>
                  <span className="font-medium dark:text-slate-300 text-slate-700">3 kW Solar Plant</span>
                </div>
                <div className="flex justify-between">
                  <span>Monitoring Mode:</span>
                  <span className="font-medium dark:text-slate-300 text-slate-700">Real-Time</span>
                </div>
                <div className="flex justify-between">
                  <span>Data Streaming:</span>
                  <span className="font-medium dark:text-slate-300 text-slate-700">Live</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Sync:</span>
                  <span className="font-medium dark:text-slate-300 text-slate-700">Now</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 dark:bg-slate-800/80 bg-slate-100/80 backdrop-blur-md border-t dark:border-slate-700 border-slate-200 p-6">
          <button 
            onClick={onClose}
            className="w-full px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </>
  )
}
