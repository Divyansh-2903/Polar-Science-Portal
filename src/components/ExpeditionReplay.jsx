import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Compass, 
  Anchor, 
  Ship, 
  Calendar, 
  MapPin, 
  FileText, 
  Image as ImageIcon, 
  Database, 
  ArrowRight, 
  ChevronRight, 
  Wind, 
  Thermometer, 
  Waves,
  CheckCircle2,
  Clock
} from 'lucide-react';

export function ExpeditionReplay({ onNavigate }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentDayIndex, setCurrentDayIndex] = useState(1); // 0 to 4
  const [activeMediaFilter, setActiveMediaFilter] = useState('all'); // 'all' | 'photos' | 'data' | 'reports'

  const stages = [
    {
      id: 1,
      title: 'Departure from Goa',
      date: 'Nov 2024',
      status: 'completed',
      day: 1,
      coords: '15.40° N, 73.80° E',
      locationName: 'Mormugao Port, Goa',
      speed: '14.2 knots',
      heading: '185° S',
      seaTemp: '28.4°C',
      airTemp: '29.1°C',
      waveHeight: '1.2 m',
      desc: 'The 45th Indian expedition set sail from Goa aboard the polar ice-breaker ship, carrying 48 scientists, food supplies, cold-weather survival gear, and research instruments.',
      photo: 'https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&w=800&q=80',
      photosCount: 18,
      datasetsCount: 4,
      reportsCount: 3
    },
    {
      id: 2,
      title: 'Voyage through Southern Ocean',
      date: 'Nov - Dec 2024 (Active)',
      status: 'active',
      day: 12,
      coords: '54.20° S, 12.10° E',
      locationName: 'Southern Ocean (Roaring Forties)',
      speed: '12.4 knots',
      heading: '172° S',
      seaTemp: '1.4°C',
      airTemp: '-2.8°C',
      waveHeight: '4.8 m',
      desc: 'The ship crossed rough stormy waters in the Southern Ocean as waves reached nearly 5 meters. Scientists measured ocean water saltiness, currents, and deep-sea temperatures along the way.',
      photo: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80',
      photosCount: 12,
      datasetsCount: 3,
      reportsCount: 2
    },
    {
      id: 3,
      title: 'Arrival at Antarctica',
      date: 'Dec 2024',
      status: 'upcoming',
      day: 28,
      coords: '69.41° S, 76.19° E',
      locationName: 'Prydz Bay (Bharati Station Coast)',
      speed: '6.1 knots',
      heading: '140° SE',
      seaTemp: '-1.6°C',
      airTemp: '-9.2°C',
      waveHeight: '0.8 m (Pack Ice)',
      desc: 'Arriving at the thick Antarctic sea ice near Bharati base. Helicopters scout safe routes across the ice to unload fuel, vehicles, and scientific equipment.',
      photo: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
      photosCount: 24,
      datasetsCount: 7,
      reportsCount: 5
    },
    {
      id: 4,
      title: 'Research Operations',
      date: 'Dec 2024 - Mar 2025',
      status: 'upcoming',
      day: 45,
      coords: '70.77° S, 11.73° E',
      locationName: 'Maitri Oasis & Schirmacher Glacier',
      speed: '0.0 knots (Stationary)',
      heading: 'Base Ops',
      seaTemp: 'N/A (Continental)',
      airTemp: '-14.6°C',
      waveHeight: '0.0 m',
      desc: 'Busy summer field season: scientists drill ancient ice cores, fly camera drones over glaciers, and take mud samples from fresh lakes to study Earth\'s past climate.',
      photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      photosCount: 36,
      datasetsCount: 12,
      reportsCount: 8
    },
    {
      id: 5,
      title: 'Return to India',
      date: 'Mar 2025',
      status: 'upcoming',
      day: 70,
      coords: '15.40° N, 73.80° E',
      locationName: 'Goa Homecoming',
      speed: '13.8 knots',
      heading: '005° N',
      seaTemp: '27.9°C',
      airTemp: '28.8°C',
      waveHeight: '1.4 m',
      desc: 'The expedition sails back home across the Indian Ocean, safely bringing home 400 kg of precious frozen Antarctic ice samples for Indian university laboratories.',
      photo: 'https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&w=800&q=80',
      photosCount: 15,
      datasetsCount: 5,
      reportsCount: 4
    }
  ];

  const currentStage = stages[currentDayIndex];

  // Auto-play timer
  React.useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentDayIndex((prev) => (prev + 1) % stages.length);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* 3-Column Expedition Replay Layout (Matches Reference Screen 5) */}
      <div className="expedition-replay-grid">
        
        {/* Left Column: Stage Timeline */}
        <div className="expedition-col-left">
          <div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '6px' }}>
                Select Polar Expedition
              </label>
              <select 
                style={{
                  width: '100%',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  padding: '9px 12px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: '#0f172a',
                  background: '#f8fafc',
                  outline: 'none'
                }}
              >
                <option>45th Indian Antarctic Expedition (2024–2025)</option>
                <option>44th Indian Antarctic Expedition (2023–2024)</option>
                <option>16th Indian Arctic Expedition (Svalbard 2024)</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative' }}>
              {stages.map((stage, idx) => {
                const isSelected = idx === currentDayIndex;
                const isPast = idx < currentDayIndex;
                return (
                  <div 
                    key={stage.id}
                    onClick={() => setCurrentDayIndex(idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      cursor: 'pointer',
                      padding: '8px 10px',
                      borderRadius: '10px',
                      background: isSelected ? '#eff6ff' : 'transparent',
                      border: `1px solid ${isSelected ? '#bfdbfe' : 'transparent'}`,
                      transition: 'all 0.16s ease'
                    }}
                  >
                    <div style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: isSelected ? '#1e6ef5' : isPast ? '#059669' : '#e2e8f0',
                      color: isSelected || isPast ? '#ffffff' : '#64748b',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {isPast ? '✓' : stage.id}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '0.86rem',
                        fontWeight: isSelected ? 800 : 600,
                        color: isSelected ? '#1e6ef5' : isPast ? '#0f172a' : '#64748b'
                      }}>
                        {stage.title}
                      </div>
                      <div style={{
                        fontSize: '0.72rem',
                        color: isSelected ? '#1e6ef5' : '#94a3b8',
                        fontWeight: isSelected ? 600 : 500
                      }}>
                        {stage.date}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{
            padding: '12px 14px',
            background: '#f8fafc',
            borderRadius: '10px',
            border: '1px solid #e2e8f0',
            fontSize: '0.76rem',
            color: '#475569',
            marginTop: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#0f172a', marginBottom: '2px' }}>
              <Compass size={14} color="#1e6ef5" />
              <span>NCPOR Polar Operations</span>
            </div>
            <span>Ship positions tracked live via satellite navigation.</span>
          </div>
        </div>

        {/* Center Column: Nautical Route & Visualizer with Scrub Bar */}
        <div style={{
          background: 'linear-gradient(180deg, #091a2e 0%, #0d2238 60%, #112a45 100%)',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)'
        }}>
          
          {/* Subtle Polar Ocean Map SVG Texture */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none' }}>
            <svg width="100%" height="100%" viewBox="0 0 400 300">
              <path d="M20,50 Q100,10 180,60 T350,90" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" />
              <path d="M10,120 Q120,90 220,140 T380,180" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" />
              <path d="M30,220 Q160,180 260,240 T390,260" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="200" cy="150" r="90" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="2 3" />
            </svg>
          </div>

          {/* Top Bar: Route Name & Speed */}
          <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="pulse-live" />
              <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#f8fafc' }}>
                {currentStage.locationName}
              </span>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(8px)',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '0.74rem',
              fontFamily: 'var(--font-mono)',
              color: '#38bdf8'
            }}>
              Speed: {currentStage.speed}
            </div>
          </div>

          {/* Center Vessel Showcase */}
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', margin: '20px 0' }}>
            <div style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, rgba(15, 35, 65, 0.8) 100%)',
              border: '2px solid rgba(56, 189, 248, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px',
              boxShadow: '0 0 24px rgba(56, 189, 248, 0.3)'
            }}>
              <Ship size={42} color="#38bdf8" />
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px', letterSpacing: '-0.01em' }}>
              MV Vasiliy Golovnin
            </h3>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '14px' }}>
              Heavy Polar Ice-Breaker & Research Vessel
            </div>

            {/* Live Nautical Gauge Badges */}
            <div style={{ display: 'inline-flex', gap: '14px', background: 'rgba(0,0,0,0.3)', padding: '6px 16px', borderRadius: '99px', fontSize: '0.74rem' }}>
              <span style={{ color: '#cbd5e1' }}>Heading: <strong style={{ color: '#ffffff' }}>{currentStage.heading}</strong></span>
              <span style={{ color: '#cbd5e1' }}>Sea Temp: <strong style={{ color: '#38bdf8' }}>{currentStage.seaTemp}</strong></span>
              <span style={{ color: '#cbd5e1' }}>Wave: <strong style={{ color: '#ffffff' }}>{currentStage.waveHeight}</strong></span>
            </div>
          </div>

          {/* Bottom Scrub Control Bar (Matches Reference Image 5) */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(16px)',
            borderRadius: '12px',
            padding: '14px 18px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            {/* Play/Pause Toggle */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: '#1e6ef5',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 10px rgba(30, 110, 245, 0.5)',
                flexShrink: 0
              }}
              title={isPlaying ? 'Pause replay' : 'Play voyage replay'}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: 2 }} />}
            </button>

            {/* Interactive Progress Bar */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', fontWeight: 700, marginBottom: '6px' }}>
                <span style={{ color: '#ffffff' }}>Day {currentStage.day} – {currentStage.title}</span>
                <span style={{ color: '#93c5fd', fontFamily: 'var(--font-mono)' }}>
                  Stage {currentStage.id} of 5 ({Math.round(((currentDayIndex + 1) / stages.length) * 100)}%)
                </span>
              </div>

              {/* Clickable Step Segments */}
              <div style={{ display: 'flex', gap: '4px', height: '6px' }}>
                {stages.map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => setCurrentDayIndex(idx)}
                    style={{
                      flex: 1,
                      height: '100%',
                      borderRadius: '4px',
                      background: idx <= currentDayIndex ? '#1e6ef5' : 'rgba(255, 255, 255, 0.2)',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease'
                    }}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={() => setCurrentDayIndex(0)}
              style={{ color: '#94a3b8', padding: '4px', display: 'flex', alignItems: 'center' }}
              title="Reset to Day 1"
            >
              <RotateCcw size={16} />
            </button>
          </div>

        </div>

        {/* Right Column: Daily Log Entry & Media (Matches Reference Image 5) */}
        <div style={{
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#ffffff'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Day {currentStage.day} – {currentStage.title.split(' ')[0]}
                </h4>
                <div style={{ fontSize: '0.74rem', color: '#64748b', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                  {currentStage.coords}
                </div>
              </div>

              <span style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '6px',
                background: currentStage.status === 'completed' ? '#ecfdf5' : currentStage.status === 'active' ? '#eff6ff' : '#f1f5f9',
                color: currentStage.status === 'completed' ? '#059669' : currentStage.status === 'active' ? '#1e6ef5' : '#64748b'
              }}>
                {currentStage.status.toUpperCase()}
              </span>
            </div>

            {/* Field Image Preview */}
            <div style={{
              height: '130px',
              borderRadius: '10px',
              overflow: 'hidden',
              margin: '12px 0',
              background: '#e2e8f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}>
              <img 
                src={currentStage.photo} 
                alt={currentStage.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <p style={{ fontSize: '0.82rem', color: '#334155', lineHeight: 1.55, margin: '0 0 16px 0' }}>
              {currentStage.desc}
            </p>
          </div>

          {/* Filter Action Buttons */}
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>
              Connected Field Assets
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button 
                onClick={() => setActiveMediaFilter('photos')}
                style={{
                  flex: 1,
                  border: '1px solid #e2e8f0',
                  background: activeMediaFilter === 'photos' ? '#eff6ff' : '#f8fafc',
                  padding: '7px 4px',
                  borderRadius: '6px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  color: activeMediaFilter === 'photos' ? '#1e6ef5' : '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <ImageIcon size={12} />
                <span>Photos ({currentStage.photosCount})</span>
              </button>

              <button 
                onClick={() => {
                  setActiveMediaFilter('data');
                  if (onNavigate) onNavigate('data');
                }}
                style={{
                  flex: 1,
                  border: '1px solid #e2e8f0',
                  background: activeMediaFilter === 'data' ? '#eff6ff' : '#f8fafc',
                  padding: '7px 4px',
                  borderRadius: '6px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  color: activeMediaFilter === 'data' ? '#1e6ef5' : '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <Database size={12} />
                <span>Datasets ({currentStage.datasetsCount})</span>
              </button>

              <button 
                onClick={() => setActiveMediaFilter('reports')}
                style={{
                  flex: 1,
                  border: '1px solid #e2e8f0',
                  background: activeMediaFilter === 'reports' ? '#eff6ff' : '#f8fafc',
                  padding: '7px 4px',
                  borderRadius: '6px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  color: activeMediaFilter === 'reports' ? '#1e6ef5' : '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <FileText size={12} />
                <span>Reports ({currentStage.reportsCount})</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
