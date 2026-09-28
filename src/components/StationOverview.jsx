import React, { useState } from 'react';
import { 
  polarStations, 
  expeditionReports, 
  scientificDatasets, 
  mediaAssets 
} from '../data/polarCorpus';
import { 
  Thermometer, 
  Wind, 
  Gauge, 
  Sun, 
  Compass, 
  MapPin, 
  ArrowRight, 
  FileText, 
  Database, 
  Film, 
  Layers, 
  Activity,
  Calendar
} from 'lucide-react';

export function StationOverview({ onNavigateToStudio, onNavigateToDataset }) {
  const [selectedPole, setSelectedPole] = useState('All');
  const [activeStationId, setActiveStationId] = useState('bharati');

  const filteredStations = selectedPole === 'All' 
    ? polarStations 
    : polarStations.filter(s => s.pole.toLowerCase() === selectedPole.toLowerCase());

  const activeStation = polarStations.find(s => s.id === activeStationId) || polarStations[0];

  // Linked items in the Knowledge Graph for the active station
  const linkedReport = expeditionReports.find(r => r.station === activeStation.id);
  const linkedDataset = scientificDatasets.find(d => d.station === activeStation.id);
  const linkedMedia = mediaAssets.find(m => m.station === activeStation.id);

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', padding: '30px 24px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* Hero Header with Pole Filter */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: '20px',
        paddingBottom: '20px',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div>
          <div className="glass-pill" style={{ marginBottom: '10px' }}>
            <Activity size={14} color="var(--accent-aurora)" />
            India's 4 Permanent Polar Bases
          </div>
          <h1>India's Research Stations in the Polar Regions</h1>
          <p style={{ maxWidth: 780, marginTop: '8px', fontSize: '1.02rem' }}>
            Live weather updates and continuous environmental tracking from Antarctica, the high Arctic, and Himalayan mountain glaciers.
          </p>
        </div>

        {/* Pole Filter Pills */}
        <div style={{
          display: 'flex',
          gap: '8px',
          background: 'var(--bg-surface)',
          padding: '4px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)'
        }}>
          {['All', 'Antarctica', 'Arctic', 'Himalayas'].map((pole) => (
            <button
              key={pole}
              onClick={() => setSelectedPole(pole)}
              style={{
                padding: '7px 16px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: selectedPole === pole ? '#ffffff' : 'var(--text-muted)',
                backgroundColor: selectedPole === pole ? 'var(--accent-cyan)' : 'transparent',
                color: selectedPole === pole ? 'var(--text-inverse)' : 'var(--text-muted)',
                boxShadow: selectedPole === pole ? '0 2px 10px rgba(56, 189, 248, 0.4)' : 'none'
              }}
            >
              {pole === 'All' ? 'All Poles' : pole}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Stations */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
        gap: '20px'
      }}>
        {filteredStations.map((station) => {
          const isSelected = activeStationId === station.id;
          return (
            <div
              key={station.id}
              onClick={() => setActiveStationId(station.id)}
              className="glass-panel"
              style={{
                padding: '20px',
                cursor: 'pointer',
                borderColor: isSelected ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                boxShadow: isSelected ? 'var(--shadow-glow-cyan)' : 'var(--shadow-md)',
                transform: isSelected ? 'translateY(-3px)' : 'none',
                transition: 'all var(--transition-normal)'
              }}
            >
              {/* Station Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div>
                  <span style={{
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: station.pole === 'Antarctica' ? 'var(--accent-cyan)' : station.pole === 'Arctic' ? 'var(--accent-aurora)' : 'var(--accent-orange)',
                    fontWeight: 700
                  }}>
                    {station.pole}
                  </span>
                  <h3 style={{ fontSize: '1.25rem', marginTop: '2px' }}>{station.name}</h3>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.75rem',
                  color: 'var(--accent-aurora)',
                  background: 'rgba(16, 185, 129, 0.1)',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-full)'
                }}>
                  <span className="pulse-dot" style={{ width: 6, height: 6 }}></span>
                  <span>{station.status.split(' ')[0]}</span>
                </div>
              </div>

              {/* Station Image Banner */}
              <div style={{
                height: '140px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                position: 'relative',
                marginBottom: '16px'
              }}>
                <img 
                  src={station.image} 
                  alt={station.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(13, 26, 48, 0.9) 0%, transparent 60%)'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '12px',
                  right: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#e2e8f0'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={12} color="var(--accent-cyan)" />
                    {station.coordinates.lat}°, {station.coordinates.lng}°
                  </span>
                  <span>{station.altitude}</span>
                </div>
              </div>

              {/* Live Environmental Telemetry Readings */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                background: '#f8fafc',
                padding: '14px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Thermometer size={16} color="var(--accent-cyan)" />
                  <div>
                    <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600 }}>Temperature</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
                      {station.currentWeather.temperature > 0 ? `+${station.currentWeather.temperature}` : station.currentWeather.temperature}°C
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Wind size={16} color="var(--accent-aurora)" />
                  <div>
                    <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600 }}>Wind Speed</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
                      {station.currentWeather.windSpeed} km/h
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Gauge size={16} color="var(--accent-orange)" />
                  <div>
                    <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600 }}>Pressure</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
                      {station.currentWeather.pressure} hPa
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sun size={16} color="#d97706" />
                  <div>
                    <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600 }}>Solar Flux</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
                      {station.currentWeather.solarRadiation} W/m²
                    </div>
                  </div>
                </div>
              </div>

              {/* Station State Description */}
              <div style={{ 
                marginTop: '12px', 
                fontSize: '0.78rem', 
                color: 'var(--accent-cyan)', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px' 
              }}>
                <span className="pulse-dot" style={{ width: 5, height: 5 }}></span>
                {station.currentWeather.seasonState}
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Station Connected Knowledge Graph (Solving Gap A: Connection) */}
      <div className="glass-panel" style={{ padding: '28px', marginTop: '10px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
          <div>
            <div className="glass-pill" style={{ marginBottom: '8px' }}>
              <Layers size={13} color="var(--accent-cyan)" />
              Connected Science Hub
            </div>
            <h2>What We've Learned at {activeStation.name}</h2>
            <p style={{ maxWidth: 850, marginTop: '4px' }}>
              {activeStation.description}
            </p>
          </div>

          <button
            onClick={() => onNavigateToStudio(linkedReport?.id)}
            className="btn-accent-orange"
            style={{ fontSize: '0.85rem' }}
          >
            <FileText size={16} />
            <span>Create News Story for this Station</span>
          </button>
        </div>

        {/* Entity Relationships: Paper ➔ Dataset ➔ Media ➔ Schematic */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
          gap: '20px'
        }}>
          {/* Linked Research Report */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '14px',
            padding: '18px',
            color: '#0f172a'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0284c7', marginBottom: '10px' }}>
              <FileText size={18} />
              <span style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase' }}>Expedition Report</span>
            </div>
            {linkedReport ? (
              <>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px', color: '#0f172a' }}>{linkedReport.shortTitle}</h4>
                <p style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '12px', lineHeight: 1.5 }}>
                  {linkedReport.abstract.substring(0, 160)}...
                </p>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '14px', fontFamily: 'var(--font-mono)' }}>
                  DOI: {linkedReport.doi}
                </div>
                <button
                  onClick={() => onNavigateToStudio(linkedReport.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#1e6ef5',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer'
                  }}
                >
                  Create News Story <ArrowRight size={14} />
                </button>
              </>
            ) : (
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>No direct field report mapped for current season.</p>
            )}
          </div>

          {/* Linked Scientific Dataset */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '14px',
            padding: '18px',
            color: '#0f172a'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669', marginBottom: '10px' }}>
              <Database size={18} />
              <span style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase' }}>Related Science Dataset</span>
            </div>
            {linkedDataset ? (
              <>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px', color: '#0f172a' }}>{linkedDataset.title}</h4>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                  <span className="badge-status badge-scheduled">{linkedDataset.format}</span>
                  <span className="badge-status badge-approved">{linkedDataset.dataQualityGrade}</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '14px', fontFamily: 'var(--font-mono)' }}>
                  Records: {linkedDataset.recordsCount} ({linkedDataset.fileSize})
                </div>
                <button
                  onClick={() => onNavigateToDataset(linkedDataset.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#059669',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer'
                  }}
                >
                  View Interactive Dataset <ArrowRight size={14} />
                </button>
              </>
            ) : (
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Live weather reports updated round the clock.</p>
            )}
          </div>

          {/* Linked Media Asset */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '14px',
            padding: '18px',
            color: '#0f172a'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ea580c', marginBottom: '10px' }}>
              <Film size={18} />
              <span style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase' }}>Photos & Videos</span>
            </div>
            {linkedMedia ? (
              <>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px', color: '#0f172a' }}>{linkedMedia.title}</h4>
                <div style={{ fontSize: '0.78rem', color: '#475569', marginBottom: '8px' }}>
                  {linkedMedia.type} · {linkedMedia.resolution}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '12px', fontFamily: 'var(--font-mono)' }}>
                  EXIF: {linkedMedia.exif.camera} · {linkedMedia.exif.lens}
                </div>
                <span style={{ fontSize: '0.75rem', color: '#ea580c', fontWeight: 700 }}>
                  {linkedMedia.license}
                </span>
              </>
            ) : (
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>No media linked directly.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
