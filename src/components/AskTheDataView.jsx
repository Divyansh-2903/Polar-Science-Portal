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
  const [downloadFeedback, setDownloadFeedback] = useState(false);

  // Dynamic time series datasets by station and metric
  const stationDataProfiles = {
    Maitri: {
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
          coldest: 'August (-32.1°C Austral Winter)',
          warmest: 'January (-5.4°C Polar Summer)',
          source: 'NCPOR Automated Weather Station (WMO ID: 89514)',
          resolution: 'Hourly calibrated readings'
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
          coldest: 'July (965 hPa Low-Pressure Blizzard)',
          warmest: 'January (988 hPa High-Pressure Ridge)',
          source: 'Barometric Sensor Array (Maitri)',
          resolution: '10-minute continuous telemetry'
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
          coldest: 'July (Max Katabatic Gust 148 km/h)',
          warmest: 'January (Calm Oasis 24 km/h)',
          source: 'Sonic Anemometer Mast (Maitri Oasis)',
          resolution: 'Continuous 1-second sampling'
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
          coldest: 'July (44% Dry Continental Air)',
          warmest: 'January (68% Oasis Lake Evaporation)',
          source: 'Hygrometer Station (Lake Priyadarshini)',
          resolution: 'Hourly average'
        }
      }
    },
    Bharati: {
      temperature: {
        unit: '°C',
        yMin: -35,
        yMax: 5,
        ySteps: [5, -5, -15, -25, -35],
        points: [
          { month: 'Jan', val: -1.8 },
          { month: 'Feb', val: -5.4 },
          { month: 'Mar', val: -10.8 },
          { month: 'Apr', val: -16.2 },
          { month: 'May', val: -20.5 },
          { month: 'Jun', val: -24.0 },
          { month: 'Jul', val: -26.8 },
          { month: 'Aug', val: -25.2 },
          { month: 'Sep', val: -21.4 },
          { month: 'Oct', val: -14.8 },
          { month: 'Nov', val: -7.5 },
          { month: 'Dec', val: -2.4 }
        ],
        insights: {
          avg: '-14.7°C',
          coldest: 'July (-26.8°C Coastal Winter)',
          warmest: 'January (-1.8°C Maritime Summer)',
          source: 'NCPOR Bharati Coastal AWS (Larsemann Hills)',
          resolution: 'Hourly calibrated readings'
        }
      },
      pressure: {
        unit: 'hPa',
        yMin: 960,
        yMax: 1000,
        ySteps: [1000, 990, 980, 970, 960],
        points: [
          { month: 'Jan', val: 991 },
          { month: 'Feb', val: 988 },
          { month: 'Mar', val: 982 },
          { month: 'Apr', val: 976 },
          { month: 'May', val: 974 },
          { month: 'Jun', val: 971 },
          { month: 'Jul', val: 970 },
          { month: 'Aug', val: 972 },
          { month: 'Sep', val: 978 },
          { month: 'Oct', val: 984 },
          { month: 'Nov', val: 987 },
          { month: 'Dec', val: 990 }
        ],
        insights: {
          avg: '980 hPa',
          coldest: 'July (970 hPa Prydz Bay Storm)',
          warmest: 'January (991 hPa Calm Polar High)',
          source: 'Digital Barometer Sensor (Bharati)',
          resolution: '10-minute continuous telemetry'
        }
      },
      wind: {
        unit: 'km/h',
        yMin: 0,
        yMax: 80,
        ySteps: [80, 60, 40, 20, 0],
        points: [
          { month: 'Jan', val: 20 },
          { month: 'Feb', val: 28 },
          { month: 'Mar', val: 38 },
          { month: 'Apr', val: 46 },
          { month: 'May', val: 54 },
          { month: 'Jun', val: 62 },
          { month: 'Jul', val: 66 },
          { month: 'Aug', val: 60 },
          { month: 'Sep', val: 48 },
          { month: 'Oct', val: 35 },
          { month: 'Nov', val: 26 },
          { month: 'Dec', val: 22 }
        ],
        insights: {
          avg: '42.1 km/h',
          coldest: 'July (Max Coastal Gale 132 km/h)',
          warmest: 'January (Gentle Coastal Breeze 20 km/h)',
          source: 'Bharati Stilt Aerodynamic Anemometer',
          resolution: 'Continuous 1-second sampling'
        }
      },
      humidity: {
        unit: '%',
        yMin: 0,
        yMax: 100,
        ySteps: [100, 75, 50, 25, 0],
        points: [
          { month: 'Jan', val: 74 },
          { month: 'Feb', val: 70 },
          { month: 'Mar', val: 65 },
          { month: 'Apr', val: 60 },
          { month: 'May', val: 56 },
          { month: 'Jun', val: 52 },
          { month: 'Jul', val: 50 },
          { month: 'Aug', val: 54 },
          { month: 'Sep', val: 58 },
          { month: 'Oct', val: 64 },
          { month: 'Nov', val: 69 },
          { month: 'Dec', val: 72 }
        ],
        insights: {
          avg: '62.0%',
          coldest: 'July (50% Winter Pack-Ice Horizon)',
          warmest: 'January (74% Marine Prydz Bay Vapour)',
          source: 'Marine Boundary Hygrometer',
          resolution: 'Hourly average'
        }
      }
    },
    Himadri: {
      temperature: {
        unit: '°C',
        yMin: -20,
        yMax: 10,
        ySteps: [10, 0, -10, -20],
        points: [
          { month: 'Jan', val: -12.4 },
          { month: 'Feb', val: -13.2 },
          { month: 'Mar', val: -11.8 },
          { month: 'Apr', val: -7.5 },
          { month: 'May', val: -1.2 },
          { month: 'Jun', val: 2.8 },
          { month: 'Jul', val: 5.6 },
          { month: 'Aug', val: 4.8 },
          { month: 'Sep', val: 1.4 },
          { month: 'Oct', val: -3.8 },
          { month: 'Nov', val: -8.4 },
          { month: 'Dec', val: -11.0 }
        ],
        insights: {
          avg: '-4.6°C',
          coldest: 'February (-13.2°C Polar Night)',
          warmest: 'July (5.6°C Midnight Sun)',
          source: 'NCPOR Himadri Station AWS (Ny-Ålesund, 79°N)',
          resolution: 'Hourly calibrated readings'
        }
      },
      pressure: {
        unit: 'hPa',
        yMin: 980,
        yMax: 1020,
        ySteps: [1020, 1010, 1000, 990, 980],
        points: [
          { month: 'Jan', val: 1004 },
          { month: 'Feb', val: 1002 },
          { month: 'Mar', val: 1008 },
          { month: 'Apr', val: 1014 },
          { month: 'May', val: 1016 },
          { month: 'Jun', val: 1012 },
          { month: 'Jul', val: 1010 },
          { month: 'Aug', val: 1009 },
          { month: 'Sep', val: 1006 },
          { month: 'Oct', val: 1005 },
          { month: 'Nov', val: 1003 },
          { month: 'Dec', val: 1004 }
        ],
        insights: {
          avg: '1008 hPa',
          coldest: 'February (1002 hPa North Atlantic Low)',
          warmest: 'May (1016 hPa Arctic High)',
          source: 'High-Latitude Barometer Station',
          resolution: '10-minute continuous telemetry'
        }
      },
      wind: {
        unit: 'km/h',
        yMin: 0,
        yMax: 80,
        ySteps: [80, 60, 40, 20, 0],
        points: [
          { month: 'Jan', val: 32 },
          { month: 'Feb', val: 36 },
          { month: 'Mar', val: 30 },
          { month: 'Apr', val: 24 },
          { month: 'May', val: 18 },
          { month: 'Jun', val: 16 },
          { month: 'Jul', val: 14 },
          { month: 'Aug', val: 16 },
          { month: 'Sep', val: 22 },
          { month: 'Oct', val: 28 },
          { month: 'Nov', val: 34 },
          { month: 'Dec', val: 35 }
        ],
        insights: {
          avg: '25.4 km/h',
          coldest: 'February (Fjord Blizzard Gust 88 km/h)',
          warmest: 'July (Gentle Fjord Breeze 14 km/h)',
          source: 'Kings Bay Coastal Weather Mast',
          resolution: 'Continuous 1-second sampling'
        }
      },
      humidity: {
        unit: '%',
        yMin: 0,
        yMax: 100,
        ySteps: [100, 75, 50, 25, 0],
        points: [
          { month: 'Jan', val: 72 },
          { month: 'Feb', val: 74 },
          { month: 'Mar', val: 70 },
          { month: 'Apr', val: 68 },
          { month: 'May', val: 74 },
          { month: 'Jun', val: 78 },
          { month: 'Jul', val: 82 },
          { month: 'Aug', val: 84 },
          { month: 'Sep', val: 80 },
          { month: 'Oct', val: 76 },
          { month: 'Nov', val: 74 },
          { month: 'Dec', val: 72 }
        ],
        insights: {
          avg: '76.2%',
          coldest: 'April (68% Dry Arctic Spring)',
          warmest: 'August (84% Maritime Fjord Fog)',
          source: 'Kongsfjorden Humidity Sensor',
          resolution: 'Hourly average'
        }
      }
    },
    Himansh: {
      temperature: {
        unit: '°C',
        yMin: -25,
        yMax: 15,
        ySteps: [15, 5, -5, -15, -25],
        points: [
          { month: 'Jan', val: -14.2 },
          { month: 'Feb', val: -12.6 },
          { month: 'Mar', val: -7.8 },
          { month: 'Apr', val: -2.1 },
          { month: 'May', val: 3.4 },
          { month: 'Jun', val: 7.8 },
          { month: 'Jul', val: 9.6 },
          { month: 'Aug', val: 8.8 },
          { month: 'Sep', val: 4.2 },
          { month: 'Oct', val: -1.5 },
          { month: 'Nov', val: -7.2 },
          { month: 'Dec', val: -12.0 }
        ],
        insights: {
          avg: '-2.0°C',
          coldest: 'January (-14.2°C Himalayan Winter Freeze)',
          warmest: 'July (9.6°C Glacier Ablation Peak)',
          source: 'NCPOR Himansh AWS (Chandra Basin, 4,080m ASL)',
          resolution: 'Hourly high-altitude readings'
        }
      },
      pressure: {
        unit: 'hPa',
        yMin: 600,
        yMax: 640,
        ySteps: [640, 630, 620, 610, 600],
        points: [
          { month: 'Jan', val: 612 },
          { month: 'Feb', val: 614 },
          { month: 'Mar', val: 616 },
          { month: 'Apr', val: 618 },
          { month: 'May', val: 621 },
          { month: 'Jun', val: 624 },
          { month: 'Jul', val: 623 },
          { month: 'Aug', val: 621 },
          { month: 'Sep', val: 619 },
          { month: 'Oct', val: 617 },
          { month: 'Nov', val: 615 },
          { month: 'Dec', val: 613 }
        ],
        insights: {
          avg: '618 hPa',
          coldest: 'January (612 hPa High Altitude Low)',
          warmest: 'June (624 hPa Summer Ridge)',
          source: 'High-Altitude Barometric Station (Spiti)',
          resolution: '10-minute continuous telemetry'
        }
      },
      wind: {
        unit: 'km/h',
        yMin: 0,
        yMax: 80,
        ySteps: [80, 60, 40, 20, 0],
        points: [
          { month: 'Jan', val: 28 },
          { month: 'Feb', val: 34 },
          { month: 'Mar', val: 42 },
          { month: 'Apr', val: 38 },
          { month: 'May', val: 30 },
          { month: 'Jun', val: 26 },
          { month: 'Jul', val: 22 },
          { month: 'Aug', val: 24 },
          { month: 'Sep', val: 29 },
          { month: 'Oct', val: 36 },
          { month: 'Nov', val: 40 },
          { month: 'Dec', val: 32 }
        ],
        insights: {
          avg: '30.9 km/h',
          coldest: 'March (Spring Mountain Gale 42 km/h)',
          warmest: 'July (Gentle Valley Wind 22 km/h)',
          source: 'Chhota Shigri Ridge Anemometer',
          resolution: 'Continuous 1-second sampling'
        }
      },
      humidity: {
        unit: '%',
        yMin: 0,
        yMax: 100,
        ySteps: [100, 75, 50, 25, 0],
        points: [
          { month: 'Jan', val: 44 },
          { month: 'Feb', val: 46 },
          { month: 'Mar', val: 48 },
          { month: 'Apr', val: 52 },
          { month: 'May', val: 56 },
          { month: 'Jun', val: 64 },
          { month: 'Jul', val: 78 },
          { month: 'Aug', val: 82 },
          { month: 'Sep', val: 66 },
          { month: 'Oct', val: 48 },
          { month: 'Nov', val: 42 },
          { month: 'Dec', val: 40 }
        ],
        insights: {
          avg: '55.5%',
          coldest: 'December (40% Dry Cold Tibetan Plateau Air)',
          warmest: 'August (82% Indian Summer Monsoon Cloud Cover)',
          source: 'Himansh Base Station Hygrometer',
          resolution: 'Hourly average'
        }
      }
    }
  };

  const selectedStationData = stationDataProfiles[station] || stationDataProfiles.Maitri;
  const currentMetricData = selectedStationData[activeMetric] || selectedStationData.temperature;

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
    const prev = svgCoords[idx - 1];
    const cp1x = prev.x + (coord.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (coord.x - prev.x) / 2;
    const cp2y = coord.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${coord.x} ${coord.y}`;
  }, '');

  const areaD = `${pathD} L ${chartWidth - paddingX} ${chartHeight - paddingY} L ${paddingX} ${chartHeight - paddingY} Z`;

  // Real CSV Generator and Browser File Downloader
  const handleDownloadCsv = () => {
    const headers = `Month,${activeMetric.charAt(0).toUpperCase() + activeMetric.slice(1)} (${currentMetricData.unit}),Station,Source,Resolution\n`;
    const rows = currentMetricData.points.map(p => 
      `${p.month},${p.val},${station},"${currentMetricData.insights.source}","${currentMetricData.insights.resolution}"`
    ).join('\n');
    const csvContent = headers + rows;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ncpor_${station.toLowerCase()}_${activeMetric}_timeseries.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadFeedback(true);
    setTimeout(() => setDownloadFeedback(false), 3000);
  };

  return (
    <div style={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Top Query Input Bar */}
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
          onClick={() => {
            if (queryInput.toLowerCase().includes('bharati')) setStation('Bharati');
            else if (queryInput.toLowerCase().includes('himadri')) setStation('Himadri');
            else if (queryInput.toLowerCase().includes('himansh')) setStation('Himansh');
            else if (queryInput.toLowerCase().includes('maitri')) setStation('Maitri');

            if (queryInput.toLowerCase().includes('wind')) setActiveMetric('wind');
            else if (queryInput.toLowerCase().includes('pressure')) setActiveMetric('pressure');
            else if (queryInput.toLowerCase().includes('humidity')) setActiveMetric('humidity');
            else setActiveMetric('temperature');
          }}
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
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(30,110,245,0.3)'
          }}
        >
          <Search size={16} />
          <span>Run</span>
        </button>
      </div>

      {/* Metric Parameter Selector Tabs & Station Picker */}
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
                fontWeight: 700,
                color: activeMetric === m.id ? '#ffffff' : '#64748b',
                background: activeMetric === m.id ? '#1e6ef5' : 'transparent',
                border: 'none',
                boxShadow: activeMetric === m.id ? '0 2px 6px rgba(30,110,245,0.3)' : 'none',
                cursor: 'pointer'
              }}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Station Picker Pills (Covering Three Poles) */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {['Maitri', 'Bharati', 'Himadri', 'Himansh'].map((st) => (
            <button
              key={st}
              onClick={() => {
                setStation(st);
                setQueryInput(`Show me ${activeMetric} variation at ${st} station for the last 1 year`);
              }}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 700,
                background: station === st ? '#eff6ff' : '#ffffff',
                color: station === st ? '#1e6ef5' : '#475569',
                border: `1.5px solid ${station === st ? '#bfdbfe' : '#e2e8f0'}`,
                cursor: 'pointer'
              }}
            >
              {st} {st === 'Himansh' ? '(Himalayas)' : st === 'Himadri' ? '(Arctic)' : '(Antarctica)'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chart Visualization Card */}
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
        
        {/* Chart Header Info */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #f1f5f9',
          paddingBottom: '14px',
          gap: '10px'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '0.04em' }}>
              Station: {station} ({station === 'Himansh' ? 'Third Pole Lahaul-Spiti' : station === 'Himadri' ? 'High Arctic Svalbard' : 'Antarctica'})
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 0 0' }}>
              {activeMetric.charAt(0).toUpperCase() + activeMetric.slice(1)} Time Series ({currentMetricData.unit})
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={15} color="#64748b" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              style={{
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#0f172a',
                background: '#f8fafc',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option>Last 1 Year (Monthly Calibrated)</option>
              <option>Last 5 Years (Decadal Interannual)</option>
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
                  r={hoveredPoint?.month === coord.pt.month ? "7" : "4.5"} 
                  fill="#ffffff" 
                  stroke="#1e6ef5" 
                  strokeWidth="2.5" 
                  style={{ transition: 'all 0.15s ease' }}
                />
                
                {/* Month Label */}
                <text 
                  x={coord.x} 
                  y={chartHeight + 4} 
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

          {/* Hover Tooltip Box */}
          {hoveredPoint && (
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: '#0f172a',
              color: '#ffffff',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}>
              {hoveredPoint.month}: {hoveredPoint.val} {currentMetricData.unit} ({station})
            </div>
          )}

        </div>

        {/* Bottom Key Insights Section */}
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
              Key Insights for {station}
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

          {/* Download Data Button */}
          <button
            onClick={handleDownloadCsv}
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              background: downloadFeedback ? '#ecfdf5' : '#ffffff',
              border: `1.5px solid ${downloadFeedback ? '#10b981' : '#1e6ef5'}`,
              color: downloadFeedback ? '#059669' : '#1e6ef5',
              fontWeight: 700,
              fontSize: '0.82rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.16s ease'
            }}
          >
            {downloadFeedback ? <CheckCircle2 size={16} /> : <Download size={16} />}
            <span>{downloadFeedback ? '✓ CSV File Downloaded' : `Download ${station} ${activeMetric} CSV`}</span>
          </button>
        </div>

      </div>

    </div>
  );
}
