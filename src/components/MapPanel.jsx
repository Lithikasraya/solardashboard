import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'

export default function MapPanel({location, dataPoints}){
  const source = location?.coords || [28.7041,77.1025]
  const local = [source[0]+0.01, source[1]+0.01]
  const grid = [source[0]-0.015, source[1]-0.02]
  const flowColor = '#34d399'

  return (
    <div>
      <h3 className="text-lg font-medium">Installation Map</h3>
      <div className="mt-3 map-full rounded-2xl overflow-hidden">
        <MapContainer center={source} zoom={12} className="w-full h-full" scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={source}>
            <Popup>
              {location?.name || 'Site'}<br />Installed capacity: 3 kW
            </Popup>
          </Marker>
          <Marker position={local}>
            <Popup>Local usage area</Popup>
          </Marker>
          <Marker position={grid}>
            <Popup>Grid interconnection</Popup>
          </Marker>

          <Polyline positions={[source, local]} pathOptions={{color: flowColor, weight:4, opacity:0.6}} />
          <Polyline positions={[source, grid]} pathOptions={{color: '#60a5fa', weight:3, opacity:0.5}} />
        </MapContainer>
      </div>
    </div>
  )
}
