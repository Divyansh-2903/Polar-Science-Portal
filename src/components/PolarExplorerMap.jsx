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
  Search,
  Download,
  Share2,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export function PolarExplorerMap({ onNavigate }) {
  const [region, setRegion] = useState('antarctica'); // 'antarctica' | 'arctic' | 'himalayas'
  const [selectedStationId, setSelectedStationId] = useState('bharati');
  const [activeTab, setActiveTab] = useState('overview');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const stationsData = {
    bharati: {
      id: 'bharati',
      name: 'Bharati Research Station',
      status: 'Live',
      region: 'Antarctica',
      poleKey: 'antarctica',
      location: '69.41° S, 76.19° E',
      lat: -69.407,
      lon: 76.194,
      area: 'Larsemann Hills (Prydz Bay)',
      established: '2012 (31st IAE)',
      operatedBy: 'NCPOR / MoES',
      altitude: '35 m above sea level',
      currentTemp: '-9.6°C',
      windSpeed: '28 km/h ENE',
      pressure: '988 hPa',
      description: 'Bharati is India\'s third Antarctic base, constructed from 134 prefabricated shipping containers on stilts to withstand extreme katabatic winds without snow drifts. Scientists study coastal weather, marine biology, and satellite telemetry year-round.',
      tags: ['Satellite Ground Station', 'Oceanography', 'Solar & Cogeneration Power', 'Upper Atmosphere Physics'],
      color: '#0ea5e9',
      image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80',
      researchProjects: [
        'Satellite tracking of moving glaciers and coastal ice shelves',
        'Continuous automated weather telemetry (AWS WMO ID 89514)',
        'Marine ecosystem dynamics and phytoplankton chlorophyll tracking',
        'Direct satellite data reception for ISRO polar orbital missions'
      ],
      x: 640,
      y: 220
    },
    maitri: {
      id: 'maitri',
      name: 'Maitri Research Station',
      status: 'Live',
      region: 'Antarctica',
      poleKey: 'antarctica',
      location: '70.77° S, 11.73° E',
      lat: -70.766,
      lon: 11.733,
      area: 'Schirmacher Oasis (Queen Maud Land)',
      established: '1989 (8th IAE)',
      operatedBy: 'NCPOR / MoES',
      altitude: '117 m above sea level',
      currentTemp: '-11.8°C',
      windSpeed: '42 km/h S (Polar Wind)',
      pressure: '976 hPa',
      description: 'Maitri is India\'s second permanent Antarctic base, built on an ice-free rocky oasis beside Lake Priyadarshini. Scientists study changing weather, total column ozone recovery, geomagnetism, and paleoclimate lake sediment cores.',
      tags: ['Lake Priyadarshini Lab', 'Earth Magnetic Fields', 'Seismological Observatory', 'Dobson Ozone Spectrometer'],
      color: '#8b5cf6',
      image: 'https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&w=800&q=80',
      researchProjects: [
        'Dobson spectrophotometer total column ozone monitoring since 1989',
        'Global seismological network sensor for southern hemisphere earthquakes',
        'Freshwater ecology and extremophile microorganisms in oasis lakes',
        'Geodetic GPS measurements of Antarctic continental tectonic drift'
      ],
      x: 380,
      y: 160
    },
    dakshin_gangotri: {
      id: 'dakshin_gangotri',
      name: 'Dakshin Gangotri (Historical Base)',
      status: 'Preserved Memorial',
      region: 'Antarctica',
      poleKey: 'antarctica',
      location: '70.08° S, 12.00° E',
      lat: -70.083,
      lon: 12.000,
      area: 'Ice Shelf (Queen Maud Land)',
      established: '1983 (3rd IAE)',
      operatedBy: 'NCPOR / Indian Army Corps of Engineers',
      altitude: 'Ice Shelf Surface',
      currentTemp: '-14.2°C',
      windSpeed: '36 km/h',
      pressure: '980 hPa',
      description: 'India\'s historic first permanent Antarctic station, constructed in 1983 during the 3rd Indian Expedition. Naturally buried under ice accumulation by 1990, it is protected under the Antarctic Treaty as Historic Site and Monument No. 44.',
      tags: ['Historic Monument No. 44', 'First Indian Polar Winter Team', 'Antarctic Heritage Site'],
      color: '#f97316',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
      researchProjects: [
        'Historical wintering records from India\'s first polar science pioneers',
        'Long-term ice accumulation and compaction baseline records',
        'Commemorative plaques and heritage structural preservation monitoring'
      ],
      x: 350,
      y: 200
    },
    himadri: {
      id: 'himadri',
      name: 'Himadri Research Station',
      status: 'Live',
      region: 'Arctic',
      poleKey: 'arctic',
      location: '78.92° N, 11.93° E',
      lat: 78.924,
      lon: 11.928,
      area: 'Ny-Ålesund (Spitsbergen, Svalbard, Norway)',
      established: '2008',
      operatedBy: 'NCPOR / MoES',
      altitude: '15 m above sea level',
      currentTemp: '-1.2°C',
      windSpeed: '18 km/h NW',
      pressure: '1004 hPa',
      description: 'India\'s permanent high-latitude Arctic laboratory in Ny-Ålesund at 79°N. Focuses on aerosol chemistry, black carbon deposition, microbial diversity in cryosoils, and understanding how North Pole ice loss impacts India\'s summer monsoon rains.',
      tags: ['Aerosol Chemistry', 'Microbial Cryosoil Ecology', 'Monsoon Teleconnection', 'Kings Bay Fjord Studies'],
      color: '#10b981',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      researchProjects: [
        'Continuous multi-wavelength black carbon aerosol monitoring',
        'Arctic sea ice melt teleconnection modeling with Indian Monsoon rainfall',
        'Bacterial and micro-algal diversity under changing boreal seasonal cycles',
        'Year-round polar night atmospheric and optical sounding'
      ],
      x: 460,
      y: 190
    },
    indarc: {
      id: 'indarc',
      name: 'IndARC Moored Observatory',
      status: 'Live (Autonomous Underwater)',
      region: 'Arctic',
      poleKey: 'arctic',
      location: '78.98° N, 12.02° E',
      lat: 78.983,
      lon: 12.016,
      area: 'Kongsfjorden Fjord (Svalbard)',
      established: '2014',
      operatedBy: 'NCPOR / MoES',
      altitude: '-192 m (Subsurface Mooring)',
      currentTemp: '+1.8°C (Water temp at 45m)',
      windSpeed: 'Current: 0.24 m/s NW',
      pressure: '1015 hPa',
      description: 'India\'s first underwater moored observatory deployed in the Arctic. Anchored at 192 meters depth, it collects continuous hydrographic data (CTD, current profiles, nutrients) across seasonal ice cycles without being destroyed by surface pack ice.',
      tags: ['Underwater Mooring', 'Deep Ocean Sensors', 'Salinity & Currents', 'Atlantic Inflow Dynamics'],
      color: '#06b6d4',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      researchProjects: [
        'Multi-depth CTD sensor profiling of salinity, temperature and turbidity',
        'Acoustic Doppler Current Profiler (ADCP) tracking Atlantic water pulses',
        'Winter-to-summer water column transition without surface ship risk',
        'Marine acoustics and zooplankton seasonal migration patterns'
      ],
      x: 520,
      y: 220
    },
    himansh: {
      id: 'himansh',
      name: 'Himansh Cryosphere Station',
      status: 'Live',
      region: 'Himalayas',
      poleKey: 'himalayas',
      location: '32.41° N, 77.62° E',
      lat: 32.408,
      lon: 77.625,
      area: 'Chandra Basin, Lahaul-Spiti, Himachal Pradesh',
      established: '2016',
      operatedBy: 'NCPOR / MoES',
      altitude: '4,080 m above sea level',
      currentTemp: '-2.1°C',
      windSpeed: '24 km/h W (Mountain Wind)',
      pressure: '618 hPa',
      description: 'India\'s high-altitude research station in the Western Himalayas above 4,000 meters. Dedicated to monitoring glacier melt, mass balance equilibrium lines, and meltwater discharge across Siachen, Chhota Shigri, and Samudra Tapu glaciers.',
      tags: ['Third Pole Glacier Base', 'Chhota Shigri Stake Network', 'Drone Photogrammetry', 'Freshwater Runoff Monitoring'],
      color: '#6366f1',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      researchProjects: [
        'Continuous mass balance and ablation stake network at Chhota Shigri glacier',
        'Automatic Weather Station with sonic snow depth and radiation sensors',
        'High-resolution UAV drone mapping of glacier volume and crevasse movements',
        'Meltwater hydrological discharge measurements feeding the Indus river basin'
      ],
      x: 470,
      y: 250
    }
  };

  const currentStation = stationsData[selectedStationId] || stationsData.bharati;

  // Search filter functionality
  const handleSearch = (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (!q.trim()) return;

    const match = Object.values(stationsData).find(s => 
      s.name.toLowerCase().includes(q.toLowerCase()) ||
      s.area.toLowerCase().includes(q.toLowerCase()) ||
      s.region.toLowerCase().includes(q.toLowerCase())
    );
    if (match) {
      setRegion(match.poleKey);
      setSelectedStationId(match.id);
    }
  };

  // Download real station GeoJSON / Coordinates
  const handleDownloadGeoJSON = () => {
    const geojson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [currentStation.lon, currentStation.lat]
          },
          properties: {
            name: currentStation.name,
            id: currentStation.id,
            region: currentStation.region,
            area: currentStation.area,
            established: currentStation.established,
            operatedBy: currentStation.operatedBy,
            altitude: currentStation.altitude,
            currentTemp: currentStation.currentTemp,
            windSpeed: currentStation.windSpeed,
            pressure: currentStation.pressure,
            tags: currentStation.tags,
            organization: 'NCPOR / MoES, Government of India'
          }
        }
      ]
    };

    const blob = new Blob([JSON.stringify(geojson, null, 2)], { type: 'application/geo+json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `polar-station-${currentStation.id}-coordinates.geojson`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div style={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* ── Top Controls Bar: Three Poles Toggle & Station Selector ──────────── */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        background: '#ffffff',
        padding: '14px 20px',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
      }}>
        
        {/* Three Poles Switcher Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Polar Region:</span>
          <div style={{
            display: 'flex',
            background: '#f1f5f9',
            padding: '3px',
            borderRadius: '999px',
            border: '1px solid #e2e8f0',
            gap: '2px'
          }}>
            <button
              onClick={() => {
                setRegion('antarctica');
                setSelectedStationId('bharati');
              }}
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: region === 'antarctica' ? '#ffffff' : '#64748b',
                background: region === 'antarctica' ? '#0ea5e9' : 'transparent',
                boxShadow: region === 'antarctica' ? '0 2px 6px rgba(14,165,233,0.35)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.14s ease'
              }}
            >
              🇦🇶 Antarctica (3 Bases)
            </button>

            <button
              onClick={() => {
                setRegion('arctic');
                setSelectedStationId('himadri');
              }}
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: region === 'arctic' ? '#ffffff' : '#64748b',
                background: region === 'arctic' ? '#10b981' : 'transparent',
                boxShadow: region === 'arctic' ? '0 2px 6px rgba(16,185,129,0.35)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.14s ease'
              }}
            >
              🧊 Arctic (Himadri & IndARC)
            </button>

            <button
              onClick={() => {
                setRegion('himalayas');
                setSelectedStationId('himansh');
              }}
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: region === 'himalayas' ? '#ffffff' : '#64748b',
                background: region === 'himalayas' ? '#6366f1' : 'transparent',
                boxShadow: region === 'himalayas' ? '0 2px 6px rgba(99,102,241,0.35)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.14s ease'
              }}
            >
              🏔️ Himalayas (Third Pole)
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
          minWidth: '260px'
        }}>
          <Search size={15} color="#64748b" />
          <input
            type="text"
            placeholder="Find base: Bharati, Maitri, Himadri, Himansh..."
            value={searchQuery}
            onChange={handleSearch}
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '0.82rem',
              color: '#0f172a',
              width: '100%',
              fontFamily: 'var(--font-body)'
            }}
          />
        </div>

        {/* Quick Station Jump Chips */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {region === 'antarctica' && (
            <>
              {['bharati', 'maitri', 'dakshin_gangotri'].map((id) => (
                <button
                  key={id}
                  onClick={() => setSelectedStationId(id)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    background: selectedStationId === id ? '#eff6ff' : '#f8fafc',
                    color: selectedStationId === id ? '#1e6ef5' : '#475569',
                    border: `1.5px solid ${selectedStationId === id ? '#bfdbfe' : '#e2e8f0'}`,
                    cursor: 'pointer'
                  }}
                >
                  {stationsData[id].name.split(' ')[0]}
                </button>
              ))}
            </>
          )}

          {region === 'arctic' && (
            <>
              {['himadri', 'indarc'].map((id) => (
                <button
                  key={id}
                  onClick={() => setSelectedStationId(id)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    background: selectedStationId === id ? '#ecfdf5' : '#f8fafc',
                    color: selectedStationId === id ? '#059669' : '#475569',
                    border: `1.5px solid ${selectedStationId === id ? '#a7f3d0' : '#e2e8f0'}`,
                    cursor: 'pointer'
                  }}
                >
                  {id === 'himadri' ? 'Himadri (Ny-Ålesund)' : 'IndARC (Mooring)'}
                </button>
              ))}
            </>
          )}

          {region === 'himalayas' && (
            <button
              onClick={() => setSelectedStationId('himansh')}
              style={{
                padding: '4px 12px',
                borderRadius: '8px',
                fontSize: '0.74rem',
                fontWeight: 700,
                background: '#ede9fe',
                color: '#6366f1',
                border: '1.5px solid #c7d2fe',
                cursor: 'pointer'
              }}
            >
              Himansh (Spiti 4,080m)
            </button>
          )}
        </div>
      </div>

      {/* ── Main Map Workspace: Interactive Canvas (Left) + Dossier (Right) ──── */}
      <div className="map-workspace-grid">
        
        {/* Interactive Polar Canvas */}
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
          minHeight: 'clamp(380px, 55vh, 600px)'
        }}>
          
          {/* Subtle Grid Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.14,
            backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px), linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
            backgroundSize: '40px 40px, 80px 80px, 80px 80px',
            pointerEvents: 'none'
          }} />

          {/* SVG Polar Projection Map */}
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
              <radialGradient id="himalayaGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ede9fe" stopOpacity="0.95" />
                <stop offset="65%" stopColor="#c7d2fe" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0.25" />
              </radialGradient>
            </defs>

            {/* Coordinate Grid Circles */}
            <circle cx="480" cy="300" r="240" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.3" />
            <circle cx="480" cy="300" r="160" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.3" />
            <circle cx="480" cy="300" r="80" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.3" />

            {/* ── 1. ANTARCTICA VIEW ── */}
            {region === 'antarctica' && (
              <>
                <text x="480" y="555" fill="#38bdf8" fontSize="10" fontFamily="monospace" opacity="0.6" textAnchor="middle">60° S</text>
                <text x="480" y="475" fill="#38bdf8" fontSize="10" fontFamily="monospace" opacity="0.6" textAnchor="middle">70° S</text>
                <text x="480" y="395" fill="#38bdf8" fontSize="10" fontFamily="monospace" opacity="0.6" textAnchor="middle">80° S</text>

                {/* Antarctic Continental Landmass */}
                <path 
                  d="M480,120 C550,110 630,130 680,170 C730,210 760,260 740,320 C720,380 670,440 600,470 C530,500 450,510 390,480 C330,450 280,410 250,350 C220,290 230,220 270,170 C310,120 410,130 480,120 Z" 
                  fill="url(#antarcticaGlow)"
                  filter="drop-shadow(0 0 30px rgba(56, 189, 248, 0.2))"
                />

                {/* Ice Shelves */}
                <path d="M300,240 Q330,280 350,260 T380,220 Z" fill="#7dd3fc" opacity="0.6" />
                <path d="M580,400 Q620,430 650,390 T630,360 Z" fill="#7dd3fc" opacity="0.6" />

                {/* 45th IAE Nautical Route */}
                <path 
                  d="M740,40 C730,110 710,160 640,220" 
                  fill="none" 
                  stroke="#ef4444" 
                  strokeWidth="2.5" 
                  strokeDasharray="6 4"
                />
                <g transform="translate(690, 140)">
                  <circle cx="0" cy="0" r="14" fill="#ef4444" opacity="0.2" />
                  <circle cx="0" cy="0" r="6" fill="#ef4444" />
                  <text x="14" y="4" fill="#fecaca" fontSize="10" fontWeight="700">
                    45th IAE Ship Route (MV Vasiliy Golovnin)
                  </text>
                </g>

                {/* Pin: Maitri */}
                <g 
                  transform="translate(380, 160)" 
                  onClick={() => setSelectedStationId('maitri')}
                  style={{ cursor: 'pointer' }}
                >
                  <circle cx="0" cy="0" r="18" fill="#8b5cf6" opacity={selectedStationId === 'maitri' ? '0.45' : '0.15'} />
                  <circle cx="0" cy="0" r="6" fill="#8b5cf6" stroke="#ffffff" strokeWidth="2" />
                  <rect x="12" y="-12" width="70" height="22" rx="4" fill="#0f172a" opacity="0.88" />
                  <text x="20" y="3" fill="#ffffff" fontSize="11" fontWeight="700">Maitri</text>
                </g>

                {/* Pin: Bharati */}
                <g 
                  transform="translate(640, 220)" 
                  onClick={() => setSelectedStationId('bharati')}
                  style={{ cursor: 'pointer' }}
                >
                  <circle cx="0" cy="0" r="22" fill="#0ea5e9" opacity={selectedStationId === 'bharati' ? '0.45' : '0.15'} />
                  <circle cx="0" cy="0" r="7" fill="#0ea5e9" stroke="#ffffff" strokeWidth="2" />
                  <rect x="14" y="-14" width="80" height="24" rx="4" fill="#0f172a" opacity="0.88" />
                  <text x="22" y="3" fill="#ffffff" fontSize="12" fontWeight="700">Bharati</text>
                </g>

                {/* Pin: Dakshin Gangotri */}
                <g 
                  transform="translate(350, 200)" 
                  onClick={() => setSelectedStationId('dakshin_gangotri')}
                  style={{ cursor: 'pointer' }}
                >
                  <circle cx="0" cy="0" r="14" fill="#f97316" opacity={selectedStationId === 'dakshin_gangotri' ? '0.45' : '0.15'} />
                  <circle cx="0" cy="0" r="5" fill="#f97316" stroke="#ffffff" strokeWidth="1.5" />
                  <rect x="12" y="-10" width="105" height="20" rx="4" fill="#0f172a" opacity="0.88" />
                  <text x="18" y="4" fill="#fed7aa" fontSize="10" fontWeight="700">Dakshin Gangotri</text>
                </g>

                <circle cx="480" cy="300" r="3" fill="#ffffff" />
                <text x="480" y="318" fill="#ffffff" fontSize="9" opacity="0.8" textAnchor="middle">South Pole (90° S)</text>
              </>
            )}

            {/* ── 2. ARCTIC VIEW ── */}
            {region === 'arctic' && (
              <>
                <text x="480" y="555" fill="#38bdf8" fontSize="10" fontFamily="monospace" opacity="0.6" textAnchor="middle">70° N</text>
                <text x="480" y="475" fill="#38bdf8" fontSize="10" fontFamily="monospace" opacity="0.6" textAnchor="middle">80° N</text>

                {/* Svalbard Archipelago Shape */}
                <path 
                  d="M400,140 Q530,120 570,200 T490,340 T370,270 Z" 
                  fill="url(#antarcticaGlow)"
                  filter="drop-shadow(0 0 30px rgba(56, 189, 248, 0.2))"
                />

                {/* Kongsfjorden Inflow Flow */}
                <path 
                  d="M510,210 Q490,195 460,190" 
                  fill="none" 
                  stroke="#38bdf8" 
                  strokeWidth="2" 
                  strokeDasharray="4 3"
                />

                {/* Pin: Himadri */}
                <g 
                  transform="translate(460, 190)" 
                  onClick={() => setSelectedStationId('himadri')}
                  style={{ cursor: 'pointer' }}
                >
                  <circle cx="0" cy="0" r="22" fill="#10b981" opacity={selectedStationId === 'himadri' ? '0.5' : '0.2'} />
                  <circle cx="0" cy="0" r="7" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                  <rect x="14" y="-14" width="138" height="24" rx="4" fill="#0f172a" opacity="0.88" />
                  <text x="22" y="3" fill="#ffffff" fontSize="11" fontWeight="700">Himadri (Ny-Ålesund)</text>
                </g>

                {/* Pin: IndARC Mooring */}
                <g 
                  transform="translate(520, 220)" 
                  onClick={() => setSelectedStationId('indarc')}
                  style={{ cursor: 'pointer' }}
                >
                  <circle cx="0" cy="0" r="20" fill="#06b6d4" opacity={selectedStationId === 'indarc' ? '0.5' : '0.2'} />
                  <circle cx="0" cy="0" r="6" fill="#06b6d4" stroke="#ffffff" strokeWidth="2" />
                  <rect x="14" y="-14" width="130" height="24" rx="4" fill="#0f172a" opacity="0.88" />
                  <text x="22" y="3" fill="#67e8f9" fontSize="11" fontWeight="700">IndARC (Moored -192m)</text>
                </g>

                <circle cx="480" cy="300" r="3" fill="#ffffff" />
                <text x="480" y="318" fill="#ffffff" fontSize="9" opacity="0.8" textAnchor="middle">North Pole (90° N)</text>
              </>
            )}

            {/* ── 3. HIMALAYAS VIEW (The Third Pole) ── */}
            {region === 'himalayas' && (
              <>
                <text x="480" y="555" fill="#a5b4fc" fontSize="10" fontFamily="monospace" opacity="0.6" textAnchor="middle">30° N</text>
                <text x="480" y="475" fill="#a5b4fc" fontSize="10" fontFamily="monospace" opacity="0.6" textAnchor="middle">32° N (Himachal Range)</text>

                {/* Himalayan Mountain Ridge Contours */}
                <path 
                  d="M260,320 L340,240 L410,290 L470,220 L540,270 L620,200 L710,280 L760,340 L690,390 L520,380 L380,410 Z" 
                  fill="url(#himalayaGlow)"
                  filter="drop-shadow(0 0 30px rgba(99, 102, 241, 0.25))"
                />

                {/* Chandra River Valley Flow */}
                <path 
                  d="M400,240 Q450,260 510,270 T610,310" 
                  fill="none" 
                  stroke="#818cf8" 
                  strokeWidth="2.5" 
                  strokeDasharray="5 3"
                />

                {/* Glacier Markers */}
                <g transform="translate(420, 240)">
                  <polygon points="0,-8 6,4 -6,4" fill="#a5b4fc" opacity="0.8" />
                  <text x="10" y="2" fill="#c7d2fe" fontSize="9" fontWeight="600">Chhota Shigri Glacier</text>
                </g>

                <g transform="translate(540, 260)">
                  <polygon points="0,-8 6,4 -6,4" fill="#a5b4fc" opacity="0.8" />
                  <text x="10" y="2" fill="#c7d2fe" fontSize="9" fontWeight="600">Samudra Tapu Glacier</text>
                </g>

                {/* Pin: Himansh Station */}
                <g 
                  transform="translate(470, 250)" 
                  onClick={() => setSelectedStationId('himansh')}
                  style={{ cursor: 'pointer' }}
                >
                  <circle cx="0" cy="0" r="24" fill="#6366f1" opacity={selectedStationId === 'himansh' ? '0.5' : '0.2'} />
                  <circle cx="0" cy="0" r="8" fill="#6366f1" stroke="#ffffff" strokeWidth="2.5" />
                  <rect x="14" y="-15" width="165" height="26" rx="4" fill="#0f172a" opacity="0.9" />
                  <text x="22" y="3" fill="#ffffff" fontSize="12" fontWeight="700">Himansh Base (4,080m)</text>
                </g>

                <circle cx="480" cy="300" r="3" fill="#ffffff" />
                <text x="480" y="318" fill="#ffffff" fontSize="9" opacity="0.8" textAnchor="middle">Third Pole Central Axis</text>
              </>
            )}

          </svg>

          {/* Bottom Left Zoom Controls */}
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
              style={{ width: '32px', height: '32px', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', cursor: 'pointer' }}
              title="Zoom In"
            >
              <ZoomIn size={16} />
            </button>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }} />
            <button 
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.8))}
              style={{ width: '32px', height: '32px', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', cursor: 'pointer' }}
              title="Zoom Out"
            >
              <ZoomOut size={16} />
            </button>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }} />
            <button 
              onClick={() => setZoomLevel(1)}
              style={{ width: '32px', height: '32px', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', cursor: 'pointer' }}
              title="Reset View"
            >
              <RotateCcw size={14} />
            </button>
          </div>

          {/* Mini Region Indicator in Bottom Right */}
          <div style={{
            position: 'absolute',
            right: '18px',
            bottom: '18px',
            background: 'rgba(15, 23, 42, 0.88)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '10px',
            padding: '8px 14px',
            color: '#ffffff',
            fontSize: '0.74rem',
            fontWeight: 700,
            backdropFilter: 'blur(8px)'
          }}>
            📍 {currentStation.name} · {currentStation.altitude}
          </div>

        </div>

        {/* ── Right Station Detail Dossier Card ──────────────────────────────── */}
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
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '0 0 2px 0' }}>
                {currentStation.name}
              </h2>
              <div style={{ fontSize: '0.76rem', color: '#64748b' }}>
                {currentStation.area} · {currentStation.region}
              </div>
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              background: currentStation.status.includes('Live') ? '#ecfdf5' : '#fff7ed',
              color: currentStation.status.includes('Live') ? '#16a34a' : '#ea580c',
              border: `1px solid ${currentStation.status.includes('Live') ? '#a7f3d0' : '#fed7aa'}`,
              borderRadius: '999px',
              padding: '3px 10px',
              fontSize: '0.72rem',
              fontWeight: 700
            }}>
              {currentStation.status.includes('Live') && <span className="pulse-live" />}
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
              padding: '4px 10px',
              borderRadius: '6px',
              color: '#ffffff',
              fontSize: '0.74rem',
              fontWeight: 700
            }}>
              AWS Real-time: {currentStation.currentTemp}
            </div>
          </div>

          {/* Navigation Tabs (Overview, Weather, Research) */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid #e2e8f0',
            background: '#f8fafc',
            padding: '0 8px'
          }}>
            {['overview', 'weather', 'research'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '10px 16px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textTransform: 'capitalize',
                  color: activeTab === tab ? '#1e6ef5' : '#64748b',
                  borderBottom: activeTab === tab ? '2px solid #1e6ef5' : '2px solid transparent',
                  background: 'none',
                  cursor: 'pointer'
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
                {/* Station Metadata Grid */}
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
                    <div style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Coordinates</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>{currentStation.location}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Established</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>{currentStation.established}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Operated By</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>{currentStation.operatedBy}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Altitude</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>{currentStation.altitude}</div>
                  </div>
                </div>

                <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.55, margin: 0 }}>
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
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Current Temperature</span>
                  <strong style={{ fontSize: '0.88rem', color: '#0ea5e9', fontFamily: 'monospace' }}>{currentStation.currentTemp}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Wind Velocity</span>
                  <strong style={{ fontSize: '0.88rem', color: '#0f172a' }}>{currentStation.windSpeed}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Atmospheric Pressure</span>
                  <strong style={{ fontSize: '0.88rem', color: '#0f172a' }}>{currentStation.pressure}</strong>
                </div>
              </div>
            )}

            {activeTab === 'research' && (
              <div style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.55 }}>
                <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                  Active NCPOR Research Mandates:
                </div>
                <ul style={{ paddingLeft: '18px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {currentStation.researchProjects?.map((proj, idx) => (
                    <li key={idx}>{proj}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Action Buttons: Cross-Module Shortcuts & GeoJSON Download */}
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
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(30, 110, 245, 0.3)'
              }}
            >
              <span>Explore Data & Charts for {currentStation.name.split(' ')[0]}</span>
              <ExternalLink size={15} />
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
              <button
                onClick={() => onNavigate('media')}
                style={{
                  padding: '7px 4px',
                  borderRadius: '7px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  color: '#475569',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                📸 Media
              </button>

              <button
                onClick={() => onNavigate('expeditions')}
                style={{
                  padding: '7px 4px',
                  borderRadius: '7px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  color: '#475569',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                🚢 Activities
              </button>

              <button
                onClick={handleDownloadGeoJSON}
                style={{
                  padding: '7px 4px',
                  borderRadius: '7px',
                  background: downloadSuccess ? '#ecfdf5' : '#f8fafc',
                  border: `1px solid ${downloadSuccess ? '#a7f3d0' : '#e2e8f0'}`,
                  color: downloadSuccess ? '#059669' : '#475569',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
                title="Download GeoJSON Coordinates for GIS"
              >
                {downloadSuccess ? '✓ Saved' : '📥 GeoJSON'}
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
