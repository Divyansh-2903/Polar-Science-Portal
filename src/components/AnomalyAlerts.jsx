import React, { useState } from 'react';
import { 
  AlertTriangle, 
  TrendingUp, 
  Activity, 
  Clock, 
  MapPin, 
  Download, 
  Bell, 
  CheckCircle2, 
  ExternalLink, 
  ChevronRight,
  ShieldAlert,
  Info
} from 'lucide-react';

export function AnomalyAlerts({ onNavigate }) {
  const [selectedAlertId, setSelectedAlertId] = useState('maitri_temp');
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const alerts = [
    {
      id: 'maitri_temp',
      station: 'Maitri Research Station',
      region: 'Antarctica (Schirmacher Oasis)',
      title: 'Unusual Warm Weather Spike at Maitri',
      deviation: '+4.2°C',
      observedVal: '-11.8°C',
      baselineVal: '-16.0°C',
      timestamp: '12 Jan 2025, 14:30 IST',
      severity: 'high',
      isNew: true,
      description: 'The temperature is 4.2°C warmer than normal for this time of year. Ice sensors show sunlight warming the snow faster than usual, with warm ocean winds blowing inland across the Antarctic ice shelf.',
      chart: {
        baseline: 'M30,80 Q120,76 210,72 T310,68',
        current: 'M30,80 Q120,76 210,38 T310,26',
        peakVal: '+11.3°C Max',
        peakX: 310,
        peakY: 26,
        labels: ['1 Jan', '5 Jan', '10 Jan']
      },
      mechanisms: [
        'Warm weather system held steady over the Antarctic coast',
        'Snow surface is darker than usual and absorbing extra sunlight',
        'Warm ocean air blowing inland from the Southern Ocean'
      ]
    },
    {
      id: 'bharati_wind',
      station: 'Bharati Research Station',
      region: 'Antarctica (Larsemann Hills)',
      title: 'High-Speed Polar Blizzard at Bharati',
      deviation: '+38 km/h',
      observedVal: '112 km/h',
      baselineVal: '74 km/h',
      timestamp: '12 Jan 2025, 11:15 IST',
      severity: 'medium',
      isNew: false,
      description: 'Violent blizzard wind gusts over 112 km/h detected at Bharati station. Outdoor equipment and satellite dishes have been safely locked down to prevent storm damage.',
      chart: {
        baseline: 'M30,85 Q120,78 210,70 T310,75',
        current: 'M30,85 Q120,60 210,30 T310,20',
        peakVal: '112 km/h',
        peakX: 310,
        peakY: 20,
        labels: ['1 Jan', '5 Jan', '10 Jan']
      },
      mechanisms: [
        'Heavy cold air rushing down rapidly from high ice plateaus toward the sea',
        'Sudden drop in coastal air pressure creating powerful storm winds',
        'Blowing snow creating near-zero visibility around station buildings'
      ]
    },
    {
      id: 'indarc_salinity',
      station: 'IndARC Moored Observatory',
      region: 'Arctic (Kongsfjorden, Svalbard)',
      title: 'Warm Atlantic Ocean Current Reaches Arctic Fjord',
      deviation: '+1.8°C',
      observedVal: '2.4°C (at 100m depth)',
      baselineVal: '0.6°C',
      timestamp: '11 Jan 2025, 19:45 IST',
      severity: 'medium',
      isNew: false,
      description: 'Underwater ocean sensors 100 meters deep recorded an unusual surge of warm, salty Atlantic ocean water pushing into the Arctic fjord, pushing out colder Arctic waters.',
      chart: {
        baseline: 'M30,80 Q120,82 210,78 T310,76',
        current: 'M30,80 Q120,70 210,45 T310,30',
        peakVal: '+1.8°C Pulse',
        peakX: 310,
        peakY: 30,
        labels: ['1 Jan', '5 Jan', '10 Jan']
      },
      mechanisms: [
        'Stronger warm ocean current flowing north from the Atlantic',
        'Warm, salty water rising closer to the surface inside the bay',
        'Shifting where Arctic sea life and polar fish feed during winter'
      ]
    }
  ];

  const currentAlert = alerts.find(a => a.id === selectedAlertId) || alerts[0];

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Alert Container Card (Matches Reference Screen 8) */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '20px',
        padding: '24px 28px',
        boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px'
      }}>
        
        {/* Alerts Switcher Pills */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {alerts.map((al) => (
              <button
                key={al.id}
                onClick={() => setSelectedAlertId(al.id)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: selectedAlertId === al.id ? 700 : 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: selectedAlertId === al.id ? (al.id === 'maitri_temp' ? '#fef2f2' : '#eff6ff') : '#f8fafc',
                  color: selectedAlertId === al.id ? (al.id === 'maitri_temp' ? '#dc2626' : '#1e6ef5') : '#64748b',
                  border: `1px solid ${selectedAlertId === al.id ? (al.id === 'maitri_temp' ? '#fecaca' : '#bfdbfe') : '#e2e8f0'}`
                }}
              >
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: al.id === 'maitri_temp' ? '#dc2626' : '#1e6ef5'
                }} />
                <span>{al.station.split(' ')[0]}: {al.deviation}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsSubscribed(!isSubscribed)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.76rem',
              fontWeight: 600,
              padding: '6px 14px',
              borderRadius: '6px',
              background: isSubscribed ? '#ecfdf5' : '#f8fafc',
              color: isSubscribed ? '#059669' : '#475569',
              border: `1px solid ${isSubscribed ? '#a7f3d0' : '#cbd5e1'}`
            }}
          >
            <Bell size={13} />
            <span>{isSubscribed ? 'Subscribed to Weather Alerts' : 'Get Live Weather Alerts'}</span>
          </button>
        </div>

        {/* Primary Anomaly Banner (Matches Reference Screen 8) */}
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '12px',
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <AlertTriangle size={18} color="#dc2626" />
              <strong style={{ fontSize: '0.96rem', color: '#dc2626', fontWeight: 800 }}>
                {currentAlert.title}
              </strong>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#991b1b', lineHeight: 1.5 }}>
              {currentAlert.description}
            </div>
          </div>

          {currentAlert.isNew && (
            <span style={{
              background: '#dc2626',
              color: '#ffffff',
              fontSize: '0.68rem',
              fontWeight: 800,
              padding: '3px 8px',
              borderRadius: '4px',
              letterSpacing: '0.04em',
              flexShrink: 0
            }}>
              NEW
            </span>
          )}
        </div>

        {/* Dual-Line Anomaly Graph (Matches Reference Screen 8 SVG) */}
        <div style={{
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '18px 22px',
          background: '#ffffff'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.82rem',
            marginBottom: '14px',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <strong style={{ color: '#0f172a', fontWeight: 700 }}>
              {currentAlert.station} – Weather Comparison vs 10-Year Average
            </strong>

            <div style={{ display: 'flex', gap: '16px', fontSize: '0.76rem', fontWeight: 600 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#dc2626' }}>
                <span style={{ width: 10, height: 10, background: '#dc2626', borderRadius: 2 }} />
                <span>Current Year (2025)</span>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#1e6ef5' }}>
                <span style={{ width: 10, height: 2, background: '#1e6ef5' }} />
                <span>10-Year Average (2015–2024 Baseline)</span>
              </span>
            </div>
          </div>

          {/* SVG Line Chart */}
          <div style={{ width: '100%', height: '140px' }}>
            <svg viewBox="0 0 400 130" style={{ width: '100%', height: '100%' }}>
              {/* Horizontal Reference Grid */}
              <line x1="20" y1="25" x2="380" y2="25" stroke="#f1f5f9" strokeWidth="1.5" />
              <line x1="20" y1="60" x2="380" y2="60" stroke="#f1f5f9" strokeWidth="1.5" />
              <line x1="20" y1="95" x2="380" y2="95" stroke="#f1f5f9" strokeWidth="1.5" />

              {/* Baseline dashed blue line */}
              <path 
                d={currentAlert.chart.baseline} 
                fill="none" 
                stroke="#1e6ef5" 
                strokeWidth="2.5" 
                strokeDasharray="5 3" 
              />

              {/* Spike current year red line */}
              <path 
                d={currentAlert.chart.current} 
                fill="none" 
                stroke="#dc2626" 
                strokeWidth="3" 
              />
              <circle cx={currentAlert.chart.peakX} cy={currentAlert.chart.peakY} r="5" fill="#dc2626" />
              <text 
                x={currentAlert.chart.peakX} 
                y={currentAlert.chart.peakY - 10} 
                fill="#dc2626" 
                fontSize="11" 
                fontWeight="800" 
                textAnchor="middle"
              >
                {currentAlert.chart.peakVal}
              </text>

              {/* X-axis date labels */}
              <text x="35" y="118" fill="#94a3b8" fontSize="10" fontWeight="600">{currentAlert.chart.labels[0]}</text>
              <text x="210" y="118" fill="#94a3b8" fontSize="10" fontWeight="600" textAnchor="middle">{currentAlert.chart.labels[1]}</text>
              <text x="365" y="118" fill="#94a3b8" fontSize="10" fontWeight="600" textAnchor="end">{currentAlert.chart.labels[2]}</text>
            </svg>
          </div>
        </div>

        {/* Alert Details Grid (Matches Reference Screen 8 bottom bar) */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.84rem',
          background: '#f8fafc',
          padding: '12px 18px',
          borderRadius: '10px',
          border: '1px solid #e2e8f0',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <div style={{ color: '#0f172a' }}>
              Recorded Value: <strong>{currentAlert.observedVal}</strong> | Difference: <strong style={{ color: '#dc2626' }}>{currentAlert.deviation}</strong> (vs normal {currentAlert.baselineVal})
            </div>
            <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '2px' }}>
              Recorded on: {currentAlert.timestamp} · Checked by Weather Quality Control
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setShowDetailedAnalysis(!showDetailedAnalysis)}
              style={{
                background: '#1e6ef5',
                color: '#ffffff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 6px rgba(30, 110, 245, 0.25)'
              }}
            >
              <span>{showDetailedAnalysis ? 'Hide Details' : 'Why Did This Happen?'}</span>
              <ChevronRight size={14} />
            </button>

            {onNavigate && (
              <button
                onClick={() => onNavigate('data')}
                style={{
                  background: '#ffffff',
                  color: '#1e6ef5',
                  border: '1px solid #bfdbfe',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                View Full Weather Dataset
              </button>
            )}
          </div>
        </div>

        {/* Expandable Detailed Analysis Drawer */}
        {showDetailedAnalysis && (
          <div style={{
            background: '#ffffff',
            border: '1px solid #bfdbfe',
            borderRadius: '12px',
            padding: '18px 22px',
            boxShadow: '0 4px 12px rgba(30, 110, 245, 0.08)'
          }}>
            <h5 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              What Caused This Weather Change?
            </h5>
            <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.6, marginBottom: '12px' }}>
              Our weather monitors detected a sudden jump that differs sharply from historical averages. Satellite maps confirm a high-pressure air pocket pushed warm ocean air across the coastal ridge, warming the ice surface faster than usual.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
              {currentAlert.mechanisms.map((mech, idx) => (
                <div key={idx} style={{ background: '#f8fafc', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.78rem' }}>
                  <div style={{ color: '#1e6ef5', fontWeight: 700, marginBottom: '2px' }}>Key Reason {idx + 1}</div>
                  <div style={{ color: '#334155' }}>{mech}</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
