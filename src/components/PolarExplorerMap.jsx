import React, { useState } from 'react';
import { 
  MapPin, 
  Layers, 
  Compass, 
  Database, 
  Image as ImageIcon, 
  Radio, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ExternalLink, 
  Thermometer, 
  Wind, 
  Compass as CompassIcon,
  Calendar,
  Building2,
  Navigation,
  CheckCircle2,
  Search
} from 'lucide-react';

export function PolarExplorerMap({ onNavigate }) {
  const [region, setRegion] = useState('antarctica'); // 'antarctica' | 'arctic'
  const [selectedStationId, setSelectedStationId] = useState('bharati');
  const [activeTab, setActiveTab] = useState('overview');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const stationsData = {
    bharati: {
      id: 'bharati',
      name: 'Bharati Research Station',
      status: 'Live',
      region: 'Antarctica',
      location: '69.41° S, 76.19° E',
      area: 'Larsemann Hills (Prydz Bay)',
      established: '2012 (31st IAE)',
      operatedBy: 'NCPOR / MoES',
      altitude: '35 m above sea level',
      currentTemp: '-9.6°C',
      windSpeed: '28 km/h ENE',
      pressure: '988 hPa',
      description: 'Bharati is India\'s newest research station in Antarctica, supporting multidisciplinary research in earth sciences, atmosphere, biology and more.',
      tags: ['Satellite Ground Station', 'Oceanography', 'Clean Fuel Cogeneration', 'Atmospheric Physics'],
      color: '#0ea5e9',
      image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80',
      x: 640,
      y: 220
    },
    maitri: {
      id: 'maitri',
      name: 'Maitri Research Station',
      status: 'Live',
      region: 'Antarctica',
      location: '70.77° S, 11.73° E',
      area: 'Schirmacher Oasis (Queen Maud Land)',
      established: '1989 (8th IAE)',
      operatedBy: 'NCPOR / MoES',
      altitude: '117 m above sea level',
      currentTemp: '-11.8°C',
      windSpeed: '42 km/h S (Katabatic)',
      pressure: '976 hPa',
      description: 'Maitri is India\'s second permanent Antarctic research base, situated in an ice-free rocky oasis. It hosts year-round meteorological, geological and paleoclimatic studies.',
      tags: ['Lake Priyadarshini Monitoring', 'Geomagnetism', 'Seismology', 'Aerosol Observatory'],
      color: '#8b5cf6',
      image: 'https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&w=800&q=80',
      x: 380,
      y: 160
    },
    dakshin_gangotri: {
      id: 'dakshin_gangotri',
      name: 'Dakshin Gangotri (Historical)',
      status: 'Preserved Memorial',
      region: 'Antarctica',
      location: '70.08° S, 12.00° E',
      area: 'Ice Shelf (Queen Maud Land)',
      established: '1983 (3rd IAE)',
      operatedBy: 'NCPOR / Indian Army',
      altitude: 'Ice Shelf Surface',
      currentTemp: '-14.2°C',
      windSpeed: '36 km/h',
      pressure: '980 hPa',
      description: 'India\'s historic first permanent Antarctic station established during the 3rd Indian Antarctic Expedition. Submerged by continental ice in 1990 and designated as an Antarctic Treaty Historic Site.',
      tags: ['Historic Monument No. 44', 'First Overwintering', 'Antarctic Treaty Heritage'],
      color: '#f97316',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
      x: 350,
      y: 200
    },
    himadri: {
      id: 'himadri',
      name: 'Himadri Research Station',
      status: 'Live',
      region: 'Arctic',
      location: '78.92° N, 11.93° E',
      area: 'Ny-Ålesund (Spitsbergen, Svalbard)',
      established: '2008',
      operatedBy: 'NCPOR / MoES',
      altitude: '15 m above sea level',
      currentTemp: '-1.2°C',
      windSpeed: '18 km/h NW',
      pressure: '1004 hPa',
      description: 'India\'s permanent Arctic research base in the world\'s northernmost permanent civilian settlement. Focuses on aerosol radiative forcing, fjord dynamics, and Arctic microbial ecology.',
      tags: ['IndARC Underwater Observatory', 'Kongsfjorden Monitoring', 'Arctic Atmospheric Physics'],
      color: '#10b981',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      x: 480,
      y: 200
    }
  };

  const currentStation = stationsData[selectedStationId] || stationsData.bharati;

  return (
    <div style={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Top Controls Bar: Region Toggle & Search (Matches Reference Image 2) */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        background: '#ffffff',
        padding: '12px 18px',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
      }}>
        
        {/* Antarctica / Arctic Toggle Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>Polar Region:</span>
          <div style={{
            display: 'flex',
            background: '#f1f5f9',
            padding: '3px',
            borderRadius: '999px',
            border: '1px solid #e2e8f0'
          }}>
            <button
              onClick={() => {
                setRegion('antarctica');
                setSelectedStationId('bharati');
              }}
              style={{
                padding: '6px 16px',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: region === 'antarctica' ? '#ffffff' : '#64748b',
                background: region === 'antarctica' ? '#1e6ef5' : 'transparent',
                boxShadow: region === 'antarctica' ? '0 2px 6px rgba(30,110,245,0.35)' : 'none'
              }}
            >
              Antarctica
            </button>
            <button
              onClick={() => {
                setRegion('arctic');
                setSelectedStationId('himadri');
              }}
              style={{
                padding: '6px 16px',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: region === 'arctic' ? '#ffffff' : '#64748b',
                background: region === 'arctic' ? '#1e6ef5' : 'transparent',
                boxShadow: region === 'arctic' ? '0 2px 6px rgba(30,110,245,0.35)' : 'none'
              }}
            >
              Arctic
            </button>
          </div>
        </div>

        {/* Search location bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#f8fafc',
          border: '1px solid #cbd5e1',
          borderRadius: '999px',
          padding: '6px 16px',
          minWidth: '280px'
        }}>
          <Search size={16} color="#64748b" />
          <input
            type="text"
            placeholder="Search location, station, expedition..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '0.82rem',
              color: '#0f172a',
              width: '100%'
            }}
          />
        </div>

        {/* Quick Station Jump Chips */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {region === 'antarctica' ? (
            <>
              {['bharati', 'maitri', 'dakshin_gangotri'].map((id) => (
                <button
                  key={id}
                  onClick={() => setSelectedStationId(id)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    background: selectedStationId === id ? '#eff6ff' : '#f8fafc',
                    color: selectedStationId === id ? '#1e6ef5' : '#475569',
                    border: `1px solid ${selectedStationId === id ? '#bfdbfe' : '#e2e8f0'}`
                  }}
                >
                  {stationsData[id].name.split(' ')[0]}
                </button>
              ))}
            </>
          ) : (
            <button
              onClick={() => setSelectedStationId('himadri')}
              style={{
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '0.74rem',
                fontWeight: 600,
                background: '#ecfdf5',
                color: '#16a34a',
                border: '1px solid #bbf7d0'
              }}
            >
              Himadri (Svalbard)
            </button>
          )}
        </div>
      </div>

      {/* Main Map Workspace (Screen 2 Layout: Map on Left, Detail Dossier on Right) */}
      <div className="map-workspace-grid">
        
        {/* Interactive Polar Projection Map Canvas */}
        <div style={{
          position: 'relative',
          background: 'linear-gradient(180deg, #09152b 0%, #0d1e3d 100%)',
          borderRadius: '20px',
          border: '1px solid #1e293b',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 30px rgba(9, 21, 43, 0.3)',
          minHeight: 'clamp(320px, 50vh, 560px)'
        }}>
          
          {/* Coordinate Grid Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.15,
            backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px), linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
            backgroundSize: '40px 40px, 80px 80px, 80px 80px',
            pointerEvents: 'none'
          }} />

          {/* Detailed SVG Polar Projection Map */}
          <svg 
            viewBox="0 0 900 600" 
            style={{ 
              width: '100%', 
              height: '100%', 
              transform: `scale(${zoomLevel})`,
              transition: 'transform 0.3s ease'
            }}
          >
            <defs>
              <radialGradient id="antarcticaGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.95" />
                <stop offset="70%" stopColor="#bae6fd" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.25" />
              </radialGradient>
              <linearGradient id="iceShelf" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#1e40af" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Latitude Parallels */}
            <circle cx="480" cy="300" r="240" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.3" />
            <circle cx="480" cy="300" r="160" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.3" />
            <circle cx="480" cy="300" r="80" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.3" />
            
            {/* Degree Marks */}
            <text x="480" y="555" fill="#38bdf8" fontSize="10" fontFamily="monospace" opacity="0.6" textAnchor="middle">60° S</text>
            <text x="480" y="475" fill="#38bdf8" fontSize="10" fontFamily="monospace" opacity="0.6" textAnchor="middle">70° S</text>
            <text x="480" y="395" fill="#38bdf8" fontSize="10" fontFamily="monospace" opacity="0.6" textAnchor="middle">80° S</text>

            {region === 'antarctica' ? (
              <>
                {/* Antarctic Continental Landmass & Ice Shelves */}
                <path 
                  d="M480,120 
                     C550,110 630,130 680,170 
                     C730,210 760,260 740,320 
                     C720,380 670,440 600,470 
                     C530,500 450,510 390,480 
                     C330,450 280,410 250,350 
                     C220,290 230,220 270,170 
                     C310,120 410,130 480,120 Z" 
                  fill="url(#antarcticaGlow)"
                  filter="drop-shadow(0 0 30px rgba(56, 189, 248, 0.2))"
                />

                {/* Ronne & Ross Ice Shelves Cutouts */}
                <path d="M300,240 Q330,280 350,260 T380,220 Z" fill="#7dd3fc" opacity="0.6" />
                <path d="M580,400 Q620,430 650,390 T630,360 Z" fill="#7dd3fc" opacity="0.6" />

                {/* 45th Indian Antarctic Expedition Nautical Route (Dotted Red Line from Reference) */}
                <path 
                  d="M740,40 C730,110 710,160 640,220" 
                  fill="none" 
                  stroke="#ef4444" 
                  strokeWidth="2.5" 
                  strokeDasharray="6 4"
                />
                
                {/* Expedition Route Label & Vessel Marker */}
                <g transform="translate(690, 140)">
                  <circle cx="0" cy="0" r="14" fill="#ef4444" opacity="0.2" />
                  <circle cx="0" cy="0" r="6" fill="#ef4444" />
                  <text x="14" y="4" fill="#fecaca" fontSize="10" fontWeight="600" fontFamily="sans-serif">
                    Indian Antarctic Expedition Route (45th IAE)
                  </text>
                </g>

                {/* Station Pin: Maitri */}
                <g 
                  transform="translate(380, 160)" 
                  onClick={() => setSelectedStationId('maitri')}
                  style={{ cursor: 'pointer' }}
                >
                  <circle cx="0" cy="0" r="18" fill="#8b5cf6" opacity={selectedStationId === 'maitri' ? '0.4' : '0.15'} />
                  <circle cx="0" cy="0" r="6" fill="#8b5cf6" stroke="#ffffff" strokeWidth="2" />
                  <rect x="12" y="-12" width="70" height="22" rx="4" fill="#0f172a" opacity="0.85" />
                  <text x="20" y="3" fill="#ffffff" fontSize="11" fontWeight="700">Maitri</text>
                </g>

                {/* Station Pin: Bharati */}
                <g 
                  transform="translate(640, 220)" 
                  onClick={() => setSelectedStationId('bharati')}
                  style={{ cursor: 'pointer' }}
                >
                  <circle cx="0" cy="0" r="22" fill="#0ea5e9" opacity={selectedStationId === 'bharati' ? '0.4' : '0.15'} />
                  <circle cx="0" cy="0" r="7" fill="#0ea5e9" stroke="#ffffff" strokeWidth="2" />
                  <rect x="14" y="-14" width="80" height="24" rx="4" fill="#0f172a" opacity="0.85" />
                  <text x="22" y="3" fill="#ffffff" fontSize="12" fontWeight="700">Bharati</text>
                </g>

                {/* Station Pin: Dakshin Gangotri */}
                <g 
                  transform="translate(350, 200)" 
                  onClick={() => setSelectedStationId('dakshin_gangotri')}
                  style={{ cursor: 'pointer' }}
                >
                  <circle cx="0" cy="0" r="14" fill="#f97316" opacity={selectedStationId === 'dakshin_gangotri' ? '0.4' : '0.15'} />
                  <circle cx="0" cy="0" r="5" fill="#f97316" stroke="#ffffff" strokeWidth="1.5" />
                  <rect x="12" y="-10" width="105" height="20" rx="4" fill="#0f172a" opacity="0.85" />
                  <text x="18" y="4" fill="#fed7aa" fontSize="10" fontWeight="600">Dakshin Gangotri</text>
                </g>
              </>
            ) : (
              <>
                {/* Arctic / Svalbard Projection */}
                <path 
                  d="M420,160 Q520,140 560,220 T460,340 T380,260 Z" 
                  fill="url(#antarcticaGlow)"
                  filter="drop-shadow(0 0 30px rgba(56, 189, 248, 0.2))"
                />
                <g 
                  transform="translate(480, 200)" 
                  onClick={() => setSelectedStationId('himadri')}
                  style={{ cursor: 'pointer' }}
                >
                  <circle cx="0" cy="0" r="22" fill="#10b981" opacity="0.4" />
                  <circle cx="0" cy="0" r="7" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                  <rect x="14" y="-14" width="130" height="24" rx="4" fill="#0f172a" opacity="0.85" />
                  <text x="22" y="3" fill="#ffffff" fontSize="11" fontWeight="700">Himadri (Ny-Ålesund)</text>
                </g>
              </>
            )}

            {/* South Pole / Coordinates Center Marker */}
            <circle cx="480" cy="300" r="3" fill="#ffffff" />
            <text x="480" y="318" fill="#ffffff" fontSize="9" opacity="0.8" textAnchor="middle">South Pole (90° S)</text>
          </svg>

          {/* Bottom Left Zoom Controls (Matches Reference Image 2) */}
          <div style={{
            position: 'absolute',
            left: '18px',
            bottom: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            background: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '10px',
            padding: '4px',
            backdropFilter: 'blur(8px)',
            zIndex: 10
          }}>
            <button 
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.2))}
              style={{
                width: '32px',
                height: '32px',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '6px'
              }}
              title="Zoom In"
            >
              <ZoomIn size={16} />
            </button>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }} />
            <button 
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.8))}
              style={{
                width: '32px',
                height: '32px',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '6px'
              }}
              title="Zoom Out"
            >
              <ZoomOut size={16} />
            </button>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }} />
            <button 
              onClick={() => setZoomLevel(1)}
              style={{
                width: '32px',
                height: '32px',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '6px'
              }}
              title="Reset View"
            >
              <RotateCcw size={14} />
            </button>
          </div>

          {/* Inset Mini Globe in Bottom Right (Matches Reference Image 2) */}
          <div style={{
            position: 'absolute',
            right: '18px',
            bottom: '18px',
            width: '84px',
            height: '84px',
            borderRadius: '50%',
            border: '2px solid rgba(56, 189, 248, 0.4)',
            background: 'radial-gradient(circle at 35% 35%, #0369a1 0%, #082f49 100%)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: '#e0f2fe',
              opacity: 0.85,
              boxShadow: '0 0 10px rgba(224, 242, 254, 0.8)'
            }} />
          </div>

        </div>

        {/* Right Station Detail Dossier Card (Matches Reference Image 2) */}
        <div style={{
          background: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          
          {/* Header with Name & Live Status Badge */}
          <div style={{
            padding: '20px 22px 14px',
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '2px' }}>
                {currentStation.name}
              </h3>
              <div style={{ fontSize: '0.76rem', color: '#64748b' }}>
                {currentStation.area}
              </div>
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              background: currentStation.status === 'Live' ? '#ecfdf5' : '#fff7ed',
              color: currentStation.status === 'Live' ? '#16a34a' : '#ea580c',
              border: `1px solid ${currentStation.status === 'Live' ? '#a7f3d0' : '#fed7aa'}`,
              borderRadius: '999px',
              padding: '3px 10px',
              fontSize: '0.72rem',
              fontWeight: 700
            }}>
              {currentStation.status === 'Live' && <span className="pulse-live" />}
              <span>{currentStation.status}</span>
            </div>
          </div>

          {/* Photo Banner with station image */}
          <div style={{
            height: '140px',
            position: 'relative',
            background: '#0f172a',
            overflow: 'hidden'
          }}>
            <img 
              src={currentStation.image} 
              alt={currentStation.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.85
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '12px',
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(6px)',
              padding: '3px 8px',
              borderRadius: '6px',
              color: '#ffffff',
              fontSize: '0.7rem',
              fontWeight: 600
            }}>
              AWS Real-time: {currentStation.currentTemp}
            </div>
          </div>

          {/* Navigation Tabs (Overview, Weather, Research, Media) */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid #e2e8f0',
            background: '#f8fafc',
            padding: '0 8px'
          }}>
            {['overview', 'weather', 'research', 'media'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '10px 14px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  color: activeTab === tab ? '#1e6ef5' : '#64748b',
                  borderBottom: activeTab === tab ? '2px solid #1e6ef5' : '2px solid transparent',
                  background: 'none'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content Body */}
          <div style={{ padding: '18px 22px', flex: 1, display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto' }}>
            
            {activeTab === 'overview' && (
              <>
                {/* Station Metadata Key-Value Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '10px',
                  background: '#f8fafc',
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px solid #f1f5f9'
                }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Location</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>{currentStation.location}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Established</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>{currentStation.established}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Operated By</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>{currentStation.operatedBy}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Altitude</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>{currentStation.altitude}</div>
                  </div>
                </div>

                {/* Description */}
                <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.55 }}>
                  {currentStation.description}
                </p>

                {/* Research Focus Chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {currentStation.tags.map((t, idx) => (
                    <span 
                      key={idx}
                      style={{
                        background: '#eff6ff',
                        color: '#1e6ef5',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '6px',
                        border: '1px solid #dbeafe'
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'weather' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: '#f8fafc', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Current Temperature</span>
                  <strong style={{ fontSize: '0.85rem', color: '#0ea5e9', fontFamily: 'monospace' }}>{currentStation.currentTemp}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: '#f8fafc', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Wind Velocity</span>
                  <strong style={{ fontSize: '0.85rem', color: '#0f172a' }}>{currentStation.windSpeed}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: '#f8fafc', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Atmospheric Pressure</span>
                  <strong style={{ fontSize: '0.85rem', color: '#0f172a' }}>{currentStation.pressure}</strong>
                </div>
                <button
                  onClick={() => onNavigate('data')}
                  style={{
                    color: '#1e6ef5',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    textAlign: 'left',
                    marginTop: '6px'
                  }}
                >
                  View Interactive Charts for {currentStation.name} →
                </button>
              </div>
            )}

            {activeTab === 'research' && (
              <div style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.5 }}>
                <p>Ongoing Indian Polar Research Projects at {currentStation.name.split(' ')[0]}:</p>
                <ul style={{ paddingLeft: '18px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li>Continuous GPS geodetic mapping of ice shelf velocities</li>
                  <li>Basal ice core isotope profiling for paleoclimatic reconstitution</li>
                  <li>Deep geomagnetic pulsation recording with SQUID magnetometers</li>
                </ul>
              </div>
            )}

            {activeTab === 'media' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                <div style={{ height: '70px', borderRadius: '6px', background: '#e2e8f0', overflow: 'hidden' }}>
                  <img src="https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=300&q=80" alt="Field 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ height: '70px', borderRadius: '6px', background: '#e2e8f0', overflow: 'hidden' }}>
                  <img src="https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&w=300&q=80" alt="Field 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            )}

          </div>

          {/* Action Buttons: Cross-Module Shortcuts */}
          <div style={{ padding: '14px 22px', borderTop: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={() => onNavigate('data')}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                background: '#1e6ef5',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.84rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 2px 8px rgba(30, 110, 245, 0.3)'
              }}
            >
              <span>View Station Data & Charts</span>
              <ExternalLink size={15} />
            </button>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                onClick={() => onNavigate('media')}
                style={{
                  padding: '7px',
                  borderRadius: '7px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  color: '#475569',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                📸 Station Media
              </button>
              <button
                onClick={() => onNavigate('expeditions')}
                style={{
                  padding: '7px',
                  borderRadius: '7px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  color: '#475569',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                🚢 Ship Route
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
