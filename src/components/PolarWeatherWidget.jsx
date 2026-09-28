import React, { useState, useEffect } from 'react';
import { 
  Thermometer, 
  Wind, 
  Gauge, 
  Droplets, 
  ExternalLink, 
  MapPin, 
  ArrowRight,
  Radio,
  RotateCw
} from 'lucide-react';

export const polarStationsWeather = [
  {
    id: 'maitri',
    name: 'Antarctica - Maitri',
    shortName: 'Maitri',
    region: 'Antarctica',
    subRegion: 'Schirmacher Oasis',
    coords: '70°45′57″ S, 11°44′09″ E',
    altitude: '117 m ASL',
    temp: '-13.1° C',
    tempNum: -13.1,
    condition: 'Freezing · Polar Sky',
    wind: '42 km/h S',
    pressure: '976 hPa',
    humidity: '64%',
    timestamp: '27 Sep 2026 11:00 PM',
    sensorType: 'Automated Weather Station',
    images: ['/stations/maitri-1.jpg', '/stations/maitri-2.jpg'],
    color: '#8b5cf6',
    accentBg: '#eff6ff',
    tempColor: '#dc2626',
    status: 'Live Weather'
  },
  {
    id: 'bharati',
    name: 'Antarctica - Bharati',
    shortName: 'Bharati',
    region: 'Antarctica',
    subRegion: 'Larsemann Hills',
    coords: '69°24′28″ S, 76°11′14″ E',
    altitude: '35 m ASL',
    temp: '-20.3° C',
    tempNum: -20.3,
    condition: 'Cold Wind · Ice Shelf',
    wind: '28 km/h ENE',
    pressure: '988 hPa',
    humidity: '58%',
    timestamp: '27 Sep 2026 11:00 PM',
    sensorType: 'Coastal Station Network',
    images: ['/stations/bharati-1.jpg', '/stations/bharati-2.jpg'],
    color: '#0ea5e9',
    accentBg: '#eff6ff',
    tempColor: '#dc2626',
    status: 'Live Weather'
  },
  {
    id: 'himansh',
    name: 'Himalaya - Himansh',
    shortName: 'Himansh',
    region: 'Himalaya',
    subRegion: 'Chandra Basin, Spiti',
    coords: '32°24′ N, 77°37′ E',
    altitude: '4,590 m ASL',
    temp: '3.9° C',
    tempNum: 3.9,
    condition: 'High Mountain Glacier',
    wind: '14 km/h W',
    pressure: '582 hPa',
    humidity: '42%',
    timestamp: '27 Sep 2026 11:00 PM',
    sensorType: 'Mountain Weather Station',
    images: ['/stations/himansh-1.jpg', '/stations/himansh-2.jpg'],
    color: '#f59e0b',
    accentBg: '#fffbeb',
    tempColor: '#d97706',
    status: 'Live Weather'
  },
  {
    id: 'himadri',
    name: 'Arctic - Himadri',
    shortName: 'Himadri',
    region: 'Arctic',
    subRegion: 'Ny-Ålesund, Svalbard',
    coords: '78°55′ N, 11°56′ E',
    altitude: '15 m ASL',
    temp: '2.7° C',
    tempNum: 2.7,
    condition: 'Arctic Coastal Breeze',
    wind: '18 km/h NW',
    pressure: '1004 hPa',
    humidity: '76%',
    timestamp: '27 Sep 2026 11:00 PM',
    sensorType: 'Arctic Weather Station',
    images: ['/stations/himadri-1.jpg', '/stations/himadri-2.jpg'],
    color: '#10b981',
    accentBg: '#ecfdf5',
    tempColor: '#059669',
    status: 'Live Weather'
  }
];

export function PolarWeatherWidget({ onNavigate }) {
  const [selectedStationIndex, setSelectedStationIndex] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isAutoCycle, setIsAutoCycle] = useState(true);

  const currentStation = polarStationsWeather[selectedStationIndex];

  // Auto-cycle through stations every 6 seconds if user is not interacting
  useEffect(() => {
    if (!isAutoCycle) return;
    const interval = setInterval(() => {
      setSelectedStationIndex((prev) => (prev + 1) % polarStationsWeather.length);
      setActiveSlideIndex(0);
    }, 6500);
    return () => clearInterval(interval);
  }, [isAutoCycle]);

  return (
    <div
      className="weather-widget-card"
      onMouseEnter={() => setIsAutoCycle(false)}
      onMouseLeave={() => setIsAutoCycle(true)}
      style={{
        background: 'rgba(255, 255, 255, 0.94)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(226, 232, 240, 0.9)',
        borderRadius: '20px',
        padding: '18px 20px',
        boxShadow: '0 20px 48px rgba(15, 23, 42, 0.22), 0 2px 6px rgba(15, 23, 42, 0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '100%',
        maxWidth: '430px',
        transition: 'all 0.2s ease'
      }}
    >
      {/* Widget Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #f1f5f9',
        paddingBottom: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="pulse-live" style={{ width: 8, height: 8 }} />
          <div>
            <h3 style={{
              fontSize: '0.94rem',
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}>
              Weather at Indian Polar Stations
            </h3>
            <div style={{
              fontSize: '0.68rem',
              color: '#64748b',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              marginTop: '1px'
            }}>
              <span>Live Weather Feed</span>
              <span>·</span>
              <a
                href="https://data.ncpor.res.in/"
                target="_blank"
                rel="noreferrer"
                style={{
                  color: '#1e6ef5',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '2px',
                  fontWeight: 600
                }}
              >
                data.ncpor.res.in
                <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setSelectedStationIndex((prev) => (prev + 1) % polarStationsWeather.length);
            setActiveSlideIndex(0);
          }}
          title="Cycle to next station"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            padding: '4px 7px',
            fontSize: '0.68rem',
            fontWeight: 600,
            color: '#475569',
            cursor: 'pointer'
          }}
        >
          <RotateCw size={11} />
          <span>Next</span>
        </button>
      </div>

      {/* Station Selector Chips */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '6px',
        background: '#f1f5f9',
        padding: '3px',
        borderRadius: '10px',
        border: '1px solid #e2e8f0'
      }}>
        {polarStationsWeather.map((station, idx) => {
          const isSelected = idx === selectedStationIndex;
          return (
            <button
              key={station.id}
              onClick={() => {
                setSelectedStationIndex(idx);
                setActiveSlideIndex(0);
                setIsAutoCycle(false);
              }}
              style={{
                background: isSelected ? '#ffffff' : 'transparent',
                borderRadius: '8px',
                border: isSelected ? '1px solid #cbd5e1' : '1px solid transparent',
                padding: '5px 4px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                boxShadow: isSelected ? '0 1px 3px rgba(15, 23, 42, 0.08)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <span style={{
                fontSize: '0.72rem',
                fontWeight: isSelected ? 800 : 600,
                color: isSelected ? '#0f172a' : '#64748b',
                lineHeight: 1.1
              }}>
                {station.shortName}
              </span>
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                color: isSelected ? station.tempColor : '#94a3b8',
                marginTop: '1px'
              }}>
                {station.temp.replace(' ', '')}
              </span>
            </button>
          );
        })}
      </div>

      {/* Station Image Card with Dots Slider (Matches NCPOR format) */}
      <div style={{
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        height: '148px',
        background: '#09152b',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <img
          src={currentStation.images[activeSlideIndex] || currentStation.images[0]}
          alt={currentStation.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.25s ease'
          }}
        />

        {/* Gradient overlay for text legibility */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(15, 23, 42, 0.75) 0%, rgba(15, 23, 42, 0.1) 60%, rgba(15, 23, 42, 0.35) 100%)'
        }} />

        {/* Top Badges over image */}
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '10px',
          right: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{
            fontSize: '0.68rem',
            fontWeight: 800,
            background: 'rgba(15, 23, 42, 0.8)',
            color: '#ffffff',
            padding: '3px 8px',
            borderRadius: '6px',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            {currentStation.region}
          </span>

          <span style={{
            fontSize: '0.66rem',
            fontWeight: 700,
            background: 'rgba(16, 185, 129, 0.9)',
            color: '#ffffff',
            padding: '3px 7px',
            borderRadius: '6px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Radio size={10} />
            {currentStation.status}
          </span>
        </div>

        {/* Bottom Location Tag over image */}
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '10px',
          right: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          color: '#ffffff'
        }}>
          <div style={{ fontSize: '0.74rem', fontWeight: 600, textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
            <MapPin size={11} style={{ display: 'inline', marginRight: '3px', verticalAlign: '-1px' }} />
            {currentStation.subRegion}
          </div>

          {/* Dots Indicator (Matches NCPOR .img_dot) */}
          <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: '12px' }}>
            {currentStation.images.map((_, i) => (
              <span
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSlideIndex(i);
                  setIsAutoCycle(false);
                }}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: activeSlideIndex === i ? '#38bdf8' : 'rgba(255, 255, 255, 0.5)',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Temperature Display (Exact NCPOR wording format) */}
      <div style={{
        background: '#f8fafc',
        borderRadius: '12px',
        padding: '10px 14px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        <div>
          <div style={{
            fontSize: '0.82rem',
            fontWeight: 800,
            color: '#0f172a',
            marginBottom: '2px'
          }}>
            {currentStation.name}:
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '6px'
          }}>
            <Thermometer size={22} color={currentStation.tempColor} style={{ flexShrink: 0, alignSelf: 'center' }} />
            <strong style={{
              fontSize: '1.65rem',
              fontWeight: 800,
              color: currentStation.tempColor,
              letterSpacing: '-0.03em',
              fontFamily: 'var(--font-heading)',
              lineHeight: 1
            }}>
              {currentStation.temp}
            </strong>
          </div>
        </div>

        {/* Condition & Coordinates */}
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            color: '#0284c7',
            background: '#e0f2fe',
            padding: '2px 8px',
            borderRadius: '6px',
            display: 'inline-block',
            marginBottom: '3px'
          }}>
            {currentStation.condition}
          </div>
          <div style={{ fontSize: '0.68rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
            Alt: {currentStation.altitude}
          </div>
        </div>
      </div>

      {/* Auxiliary Telemetry Metrics (Wind, Pressure, Humidity) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '8px',
        padding: '6px 2px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: '#ffffff',
          border: '1px solid #f1f5f9',
          borderRadius: '8px',
          padding: '6px 8px'
        }}>
          <Wind size={13} color="#0284c7" />
          <div>
            <div style={{ fontSize: '0.62rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Wind</div>
            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#0f172a' }}>{currentStation.wind}</div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: '#ffffff',
          border: '1px solid #f1f5f9',
          borderRadius: '8px',
          padding: '6px 8px'
        }}>
          <Gauge size={13} color="#0284c7" />
          <div>
            <div style={{ fontSize: '0.62rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Pressure</div>
            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#0f172a' }}>{currentStation.pressure}</div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: '#ffffff',
          border: '1px solid #f1f5f9',
          borderRadius: '8px',
          padding: '6px 8px'
        }}>
          <Droplets size={13} color="#0284c7" />
          <div>
            <div style={{ fontSize: '0.62rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Humidity</div>
            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#0f172a' }}>{currentStation.humidity}</div>
          </div>
        </div>
      </div>

      {/* Timestamp & Footer Link */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid #f1f5f9',
        paddingTop: '8px',
        fontSize: '0.72rem'
      }}>
        {/* Timestamp format matching data.ncpor.res.in exact green style */}
        <div style={{
          color: '#15803d',
          fontWeight: 700,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem'
        }}>
          {currentStation.timestamp}
        </div>

        {/* Quick link into the Map */}
        {onNavigate && (
          <button
            onClick={() => onNavigate('explore')}
            style={{
              color: '#1e6ef5',
              fontWeight: 700,
              fontSize: '0.74rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '2px 4px',
              borderRadius: '4px'
            }}
          >
            <span>Explore Map</span>
            <ArrowRight size={12} />
          </button>
        )}
      </div>
    </div>
  );
}
