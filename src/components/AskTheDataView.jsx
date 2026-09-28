import React, { useState } from 'react';
import { 
  BarChart3, 
  Search, 
  Download, 
  ChevronDown, 
  Calendar, 
  FileSpreadsheet, 
  RefreshCw, 
  Info, 
  CheckCircle2, 
  TrendingDown, 
  TrendingUp,
  Sliders,
  Filter
} from 'lucide-react';

export function AskTheDataView() {
  const [queryInput, setQueryInput] = useState('Show me temperature variation at Maitri station for the last 1 year');
  const [activeMetric, setActiveMetric] = useState('temperature'); // 'temperature' | 'pressure' | 'wind' | 'humidity'
  const [timeRange, setTimeRange] = useState('Last 1 Year');
  const [station, setStation] = useState('Maitri');
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Time series data points across months (Jan to Dec)
  const monthlyData = {
    temperature: {
      unit: '°C',
      yMin: -40,
      yMax: 0,
      ySteps: [0, -10, -20, -30, -40],
      points: [
        { month: 'Jan', val: -5.4 },
        { month: 'Feb', val: -9.8 },
        { month: 'Mar', val: -15.2 },
        { month: 'Apr', val: -21.0 },
        { month: 'May', val: -26.4 },
        { month: 'Jun', val: -29.1 },
        { month: 'Jul', val: -30.8 },
        { month: 'Aug', val: -32.1 },
        { month: 'Sep', val: -27.5 },
        { month: 'Oct', val: -19.4 },
        { month: 'Nov', val: -11.2 },
        { month: 'Dec', val: -6.1 }
      ],
      insights: {
        avg: '-18.6°C',
        coldest: 'August (-32.1°C)',
        warmest: 'January (-5.4°C)',
        source: 'NCPOR AWS - Maitri Station',
        resolution: 'Hourly (WMO Station ID: 89514)'
      }
    },
    pressure: {
      unit: 'hPa',
      yMin: 960,
      yMax: 1000,
      ySteps: [1000, 990, 980, 970, 960],
      points: [
        { month: 'Jan', val: 988 },
        { month: 'Feb', val: 984 },
        { month: 'Mar', val: 978 },
        { month: 'Apr', val: 972 },
        { month: 'May', val: 969 },
        { month: 'Jun', val: 966 },
        { month: 'Jul', val: 965 },
        { month: 'Aug', val: 967 },
        { month: 'Sep', val: 973 },
        { month: 'Oct', val: 979 },
        { month: 'Nov', val: 983 },
        { month: 'Dec', val: 987 }
      ],
      insights: {
        avg: '976 hPa',
        coldest: 'July (965 hPa Storm System)',
        warmest: 'January (988 hPa Clear Sky)',
        source: 'Barometric Air Pressure Sensor',
        resolution: '10-minute automated logging'
      }
    },
    wind: {
      unit: 'km/h',
      yMin: 0,
      yMax: 80,
      ySteps: [80, 60, 40, 20, 0],
      points: [
        { month: 'Jan', val: 24 },
        { month: 'Feb', val: 32 },
        { month: 'Mar', val: 45 },
        { month: 'Apr', val: 56 },
        { month: 'May', val: 68 },
        { month: 'Jun', val: 74 },
        { month: 'Jul', val: 78 },
        { month: 'Aug', val: 72 },
        { month: 'Sep', val: 58 },
        { month: 'Oct', val: 42 },
        { month: 'Nov', val: 31 },
        { month: 'Dec', val: 26 }
      ],
      insights: {
        avg: '48.8 km/h',
        coldest: 'July (Max Gust 148 km/h Winter Blizzard)',
        warmest: 'January (Calm 24 km/h)',
        source: 'Wind Speed Sensor Station',
        resolution: 'Continuous live recordings'
      }
    },
    humidity: {
      unit: '%',
      yMin: 0,
      yMax: 100,
      ySteps: [100, 75, 50, 25, 0],
      points: [
        { month: 'Jan', val: 68 },
        { month: 'Feb', val: 64 },
        { month: 'Mar', val: 58 },
        { month: 'Apr', val: 52 },
        { month: 'May', val: 48 },
        { month: 'Jun', val: 45 },
        { month: 'Jul', val: 44 },
        { month: 'Aug', val: 46 },
        { month: 'Sep', val: 51 },
        { month: 'Oct', val: 57 },
        { month: 'Nov', val: 62 },
        { month: 'Dec', val: 66 }
      ],
      insights: {
        avg: '55.2%',
        coldest: 'July (44% Dry Polar Air)',
        warmest: 'January (68% Ocean Breeze)',
        source: 'Automated Humidity Sensor',
        resolution: 'Hourly average'
      }
    }
  };

  const currentMetricData = monthlyData[activeMetric];

  // Helper to calculate SVG Coordinates
  const chartWidth = 760;
  const chartHeight = 220;
  const paddingX = 40;
  const paddingY = 20;

  const getSvgCoordinates = (pts, yMin, yMax) => {
    return pts.map((pt, index) => {
      const x = paddingX + (index / (pts.length - 1)) * (chartWidth - paddingX * 2);
      const ratio = (pt.val - yMin) / (yMax - yMin);
      const y = chartHeight - paddingY - ratio * (chartHeight - paddingY * 2);
      return { x, y, pt };
    });
  };

  const svgCoords = getSvgCoordinates(currentMetricData.points, currentMetricData.yMin, currentMetricData.yMax);

  const pathD = svgCoords.reduce((acc, coord, idx) => {
    if (idx === 0) return `M ${coord.x} ${coord.y}`;
    // Spline curve smoothing
    const prev = svgCoords[idx - 1];
    const cp1x = prev.x + (coord.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (coord.x - prev.x) / 2;
    const cp2y = coord.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${coord.x} ${coord.y}`;
  }, '');

  const areaD = `${pathD} L ${chartWidth - paddingX} ${chartHeight - paddingY} L ${paddingX} ${chartHeight - paddingY} Z`;

  return (
    <div style={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Top Query Input Bar (Matches Reference Image 4) */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '12px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          flex: 1,
          background: '#f8fafc',
          border: '1px solid #cbd5e1',
          borderRadius: '10px',
          padding: '8px 14px'
        }}>
          <Search size={18} color="#64748b" />
          <input
            type="text"
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '0.88rem',
              color: '#0f172a',
              width: '100%',
              fontFamily: 'var(--font-body)'
            }}
          />
        </div>

        <button
          style={{
            background: '#1e6ef5',
            color: '#ffffff',
            padding: '10px 22px',
            borderRadius: '10px',
            fontSize: '0.88rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 8px rgba(30,110,245,0.3)'
          }}
        >
          <Search size={16} />
          <span>Run</span>
        </button>
      </div>

      {/* Metric Parameter Selector Tabs (Matches Reference Image 4) */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        <div style={{
          display: 'flex',
          background: '#ffffff',
          padding: '4px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          gap: '4px'
        }}>
          {[
            { id: 'temperature', label: 'Temperature' },
            { id: 'pressure', label: 'Pressure' },
            { id: 'wind', label: 'Wind Speed' },
            { id: 'humidity', label: 'Humidity' }
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveMetric(m.id)}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: activeMetric === m.id ? '#ffffff' : '#64748b',
                background: activeMetric === m.id ? '#1e6ef5' : 'transparent',
                boxShadow: activeMetric === m.id ? '0 2px 6px rgba(30,110,245,0.3)' : 'none'
              }}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Station Picker Pills */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {['Maitri', 'Bharati', 'Himadri'].map((st) => (
            <button
              key={st}
              onClick={() => setStation(st)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 600,
                background: station === st ? '#eff6ff' : '#ffffff',
                color: station === st ? '#1e6ef5' : '#475569',
                border: `1px solid ${station === st ? '#bfdbfe' : '#e2e8f0'}`
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chart Visualization Card (Matches Reference Image 4) */}
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        border: '1px solid #e2e8f0',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        
        {/* Chart Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #f1f5f9',
          paddingBottom: '14px'
        }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              {station} Station – {activeMetric === 'temperature' ? 'Air Temperature' : activeMetric.charAt(0).toUpperCase() + activeMetric.slice(1)}
            </h3>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
              Calibrated Automated Weather Station Records ({currentMetricData.unit})
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#0f172a',
                background: '#f8fafc',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option>Last 1 Year</option>
              <option>Last 5 Years</option>
              <option>Decadal Baseline (2015-2025)</option>
            </select>
          </div>
        </div>

        {/* Interactive SVG Line Graph */}
        <div style={{ position: 'relative', width: '100%', overflowX: 'auto', padding: '10px 0' }}>
          
          <svg 
            viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
            style={{ width: '100%', minWidth: '600px', height: '240px', overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e6ef5" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#1e6ef5" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid Lines & Y-Axis Labels */}
            {currentMetricData.ySteps.map((val) => {
              const ratio = (val - currentMetricData.yMin) / (currentMetricData.yMax - currentMetricData.yMin);
              const y = chartHeight - paddingY - ratio * (chartHeight - paddingY * 2);
              return (
                <g key={val}>
                  <line 
                    x1={paddingX} 
                    y1={y} 
                    x2={chartWidth - paddingX} 
                    y2={y} 
                    stroke="#e2e8f0" 
                    strokeDasharray="4 4" 
                  />
                  <text 
                    x={paddingX - 10} 
                    y={y + 4} 
                    fill="#94a3b8" 
                    fontSize="11" 
                    fontWeight="600"
                    textAnchor="end"
                    fontFamily="monospace"
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {/* Area Fill Under Curve */}
            <path d={areaD} fill="url(#areaGradient)" />

            {/* Main Smooth Line */}
            <path 
              d={pathD} 
              fill="none" 
              stroke="#1e6ef5" 
              strokeWidth="2.8" 
              strokeLinecap="round" 
            />

            {/* Interactive Data Points */}
            {svgCoords.map((coord, idx) => (
              <g 
                key={idx}
                onMouseEnter={() => setHoveredPoint(coord.pt)}
                onMouseLeave={() => setHoveredPoint(null)}
                style={{ cursor: 'pointer' }}
              >
                <circle 
                  cx={coord.x} 
                  cy={coord.y} 
                  r="5" 
                  fill="#ffffff" 
                  stroke="#1e6ef5" 
                  strokeWidth="2.5" 
                />
                
                {/* Month Label on X Axis */}
                <text 
                  x={coord.x} 
                  y={chartHeight - 4} 
                  fill="#64748b" 
                  fontSize="11" 
                  fontWeight="600" 
                  textAnchor="middle"
                >
                  {coord.pt.month}
                </text>
              </g>
            ))}
          </svg>

          {/* Floating Hover Tooltip */}
          {hoveredPoint && (
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: '#0f172a',
              color: '#ffffff',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}>
              {hoveredPoint.month}: {hoveredPoint.val} {currentMetricData.unit}
            </div>
          )}

        </div>

        {/* Bottom Key Insights Section (Matches Reference Image 4) */}
        <div style={{
          borderTop: '1px solid #f1f5f9',
          paddingTop: '18px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '20px'
        }}>
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              Key Insights
            </div>
            
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              fontSize: '0.82rem',
              color: '#475569'
            }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#1e6ef5' }}>◆</span>
                <span><strong>Average {activeMetric}:</strong> {currentMetricData.insights.avg}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#0ea5e9' }}>◆</span>
                <span><strong>Lowest Point:</strong> {currentMetricData.insights.coldest}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#f59e0b' }}>◆</span>
                <span><strong>Highest Point:</strong> {currentMetricData.insights.warmest}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#10b981' }}>◆</span>
                <span><strong>Data source:</strong> {currentMetricData.insights.source}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#8b5cf6' }}>◆</span>
                <span><strong>Recording frequency:</strong> {currentMetricData.insights.resolution}</span>
              </li>
            </ul>
          </div>

          {/* Download Data Button (Matches Reference Image 4) */}
          <button
            onClick={() => {
              alert(`Downloading verified CSV dataset for ${station} station (${activeMetric}).`);
            }}
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              background: '#ffffff',
              border: '1.5px solid #1e6ef5',
              color: '#1e6ef5',
              fontWeight: 700,
              fontSize: '0.82rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <Download size={16} />
            <span>Download Data</span>
          </button>
        </div>

      </div>

    </div>
  );
}
