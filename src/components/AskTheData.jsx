import React, { useState } from 'react';
import { 
  scientificDatasets 
} from '../data/polarCorpus';
import { 
  BarChart3, 
  Search, 
  Download, 
  CheckCircle, 
  ExternalLink, 
  TrendingDown, 
  TrendingUp, 
  Info, 
  Layers,
  Sparkles,
  FileSpreadsheet
} from 'lucide-react';

export function AskTheData({ preselectedDatasetId }) {
  const queryPresets = [
    {
      id: 'q1',
      query: 'Show Bharati Station temperature & wind speeds',
      datasetId: 'ds-01-bharati-aws',
      chartType: 'weather_timeseries',
      title: 'Bharati Station Hourly Temperature & Wind Records',
      explanation: 'Based on 8,760 hourly readings, Bharati station stays deeply frozen year-round (average -24.6°C). Sudden blizzards and strong mountain winds frequently cause gusts above 48 km/h when air pressure drops.',
      stats: { mean: '-24.6 °C', peakMin: '-26.1 °C', peakGust: '48.6 km/h', pressureMean: '981.2 hPa' }
    },
    {
      id: 'q2',
      query: 'Show Arctic ocean temperature by depth from IndARC',
      datasetId: 'ds-03-indarc-ctd',
      chartType: 'ocean_depth',
      title: 'IndARC Ocean Water Temperatures by Depth: Kongsfjorden (Svalbard)',
      explanation: 'Underwater sensors between 35 and 180 meters deep reveal a stream of warm Atlantic water pushing in at 55 meters depth (reaching +3.4°C). This warmer salty water prevents sea ice from freezing over the bay.',
      stats: { surfaceTemp: '+2.1 °C', atlanticCoreTemp: '+3.4 °C', deepSalinity: '34.98 PSU', maxDepth: '192 m' }
    },
    {
      id: 'q3',
      query: 'Show Himalayan glacier meltwater flow at Himansh Station',
      datasetId: 'ds-04-himansh-discharge',
      chartType: 'glacier_discharge',
      title: 'Glacier Summer Meltwater Flow (Himansh Station, 4,080m)',
      explanation: 'Water gauges reveal summer meltwater flow jumps from 3.2 cubic meters per second in May to a high of 16.4 cubic meters in July as warm summer sunshine melts mountain ice.',
      stats: { peakDischarge: '16.4 m³/s', ablationLoss: '74 cm w.e.', meanSummerTemp: '+8.2 °C', altitude: '4,080 m' }
    },
    {
      id: 'q4',
      query: 'Show South Pole ozone layer changes at Maitri Station',
      datasetId: 'ds-02-maitri-radiation',
      chartType: 'ozone_depletion',
      title: 'Maitri Station Annual Ozone Layer & Sunlight Reflection',
      explanation: 'Atmospheric sensors record the lowest ozone levels in October during the Antarctic spring (165 Dobson Units), followed by rapid natural recovery back to healthy levels (288 DU) by December.',
      stats: { springMinimum: '165 DU', summerBaseline: '295 DU', meanAlbedo: '0.82', uvbPeak: '2.1 W/m²' }
    }
  ];

  const [activeQuery, setActiveQuery] = useState(queryPresets[0]);
  const [customInput, setCustomInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const matchedDataset = scientificDatasets.find(d => d.id === activeQuery.datasetId) || scientificDatasets[0];

  const handleSelectQuery = (preset) => {
    setIsProcessing(true);
    setTimeout(() => {
      setActiveQuery(preset);
      setIsProcessing(false);
    }, 280);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      // Intelligently route prompt
      const lower = customInput.toLowerCase();
      if (lower.includes('arctic') || lower.includes('ocean') || lower.includes('indarc') || lower.includes('fjord')) {
        setActiveQuery(queryPresets[1]);
      } else if (lower.includes('himalay') || lower.includes('glacier') || lower.includes('himansh') || lower.includes('melt')) {
        setActiveQuery(queryPresets[2]);
      } else if (lower.includes('ozone') || lower.includes('maitri') || lower.includes('sun')) {
        setActiveQuery(queryPresets[3]);
      } else {
        setActiveQuery(queryPresets[0]);
      }
      setIsProcessing(false);
    }, 350);
  };

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', padding: '30px 24px', display: 'flex', flexDirection: 'column', gap: '26px' }}>
      
      {/* Title & Natural Language Search Bar */}
      <div>
        <div className="glass-pill" style={{ marginBottom: '10px' }}>
          <Sparkles size={14} color="var(--accent-cyan)" />
          Instant Chart Maker · Turn Questions into Live Graphs
        </div>
        <h1>Instant Polar Charts & Data Explorer</h1>
        <p style={{ maxWidth: 850, marginTop: '8px' }}>
          Explore real scientific records across Antarctica, the Arctic, and the Himalayas without needing difficult software or coding skills. Type a question in plain English to get interactive charts and simple summaries instantly.
        </p>

        {/* Search Input */}
        <form onSubmit={handleCustomSubmit} style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <div style={{
            flex: 1,
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Search size={20} color="var(--accent-cyan)" style={{ position: 'absolute', left: '16px' }} />
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Ask anything: e.g. 'Show temperature trend at Bharati Station' or 'Kongsfjorden water salinity profile'..."
              style={{
                width: '100%',
                padding: '14px 16px 14px 48px',
                background: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '12px',
                color: '#0f172a',
                fontSize: '0.95rem',
                fontFamily: 'var(--font-body)',
                outline: 'none',
                boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)'
              }}
            />
          </div>
          <button type="submit" className="btn-primary" style={{ padding: '0 24px' }}>
            <Sparkles size={16} />
            <span>Ask Data</span>
          </button>
        </form>

        {/* Preset Prompt Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '14px' }}>
          <span style={{ fontSize: '0.78rem', color: '#64748b', alignSelf: 'center', marginRight: '4px', fontWeight: 600 }}>
            Suggested Queries:
          </span>
          {queryPresets.map((preset) => {
            const isSelected = activeQuery.id === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectQuery(preset)}
                style={{
                  fontSize: '0.78rem',
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  background: isSelected ? '#eff6ff' : '#f1f5f9',
                  color: isSelected ? '#1e6ef5' : '#475569',
                  border: isSelected ? '1px solid #bfdbfe' : '1px solid #e2e8f0',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.16s ease'
                }}
              >
                {preset.query}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Visualizer Container */}
      <div className="ask-data-grid">
        {/* Dynamic Interactive Chart Canvas */}
        <div className="glass-panel" style={{ padding: '24px', minHeight: '480px', display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <span className="badge-status badge-scheduled" style={{ marginBottom: '6px' }}>
                {matchedDataset.station.toUpperCase()} OBSERVATORY · {matchedDataset.discipline}
              </span>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>{activeQuery.title}</h2>
              <div style={{ fontSize: '0.78rem', color: '#64748b', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                Temporal Range: {matchedDataset.temporalRange} · Variables: {matchedDataset.variables.slice(0, 3).join(', ')}
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="btn-secondary"
              style={{ padding: '8px 14px', fontSize: '0.82rem' }}
            >
              {downloadSuccess ? (
                <>
                  <CheckCircle size={15} color="var(--accent-aurora)" />
                  <span style={{ color: 'var(--accent-aurora)' }}>CSV Downloaded</span>
                </>
              ) : (
                <>
                  <Download size={15} />
                  <span>Download NetCDF/CSV</span>
                </>
              )}
            </button>
          </div>

          {/* Interactive Chart Canvas / SVG Engine */}
          <div style={{
            flex: 1,
            minHeight: '280px',
            background: '#071322',
            borderRadius: '12px',
            border: '1px solid #1e293b',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative'
          }}>
            {activeQuery.chartType === 'weather_timeseries' && (
              <svg viewBox="0 0 700 240" style={{ width: '100%', height: '100%' }}>
                {/* Grid lines */}
                <line x1="50" y1="30" x2="680" y2="30" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                <line x1="50" y1="90" x2="680" y2="90" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                <line x1="50" y1="150" x2="680" y2="150" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                <line x1="50" y1="210" x2="680" y2="210" stroke="rgba(255,255,255,0.15)" />

                {/* Y-axis labels */}
                <text x="40" y="34" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="var(--font-mono)">-20°C</text>
                <text x="40" y="94" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="var(--font-mono)">-24°C</text>
                <text x="40" y="154" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="var(--font-mono)">-28°C</text>
                <text x="40" y="214" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="var(--font-mono)">-32°C</text>

                {/* Temperature Curve */}
                <path
                  d="M 60 110 C 140 130, 200 90, 280 80 C 360 70, 420 140, 500 120 C 580 100, 640 160, 670 140"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                />

                {/* Area Gradient fill */}
                <path
                  d="M 60 110 C 140 130, 200 90, 280 80 C 360 70, 420 140, 500 120 C 580 100, 640 160, 670 140 L 670 210 L 60 210 Z"
                  fill="url(#tempGlow)"
                  opacity="0.3"
                />

                {/* Wind Speed bars */}
                {[
                  { x: 100, h: 45, val: '38.4' },
                  { x: 220, h: 55, val: '41.2' },
                  { x: 340, h: 68, val: '45.0' },
                  { x: 460, h: 62, val: '42.1' },
                  { x: 580, h: 85, val: '48.6' },
                ].map((bar, i) => (
                  <g key={i}>
                    <rect
                      x={bar.x}
                      y={210 - bar.h}
                      width="14"
                      height={bar.h}
                      fill="rgba(16, 185, 129, 0.4)"
                      rx="3"
                    />
                    <text x={bar.x + 7} y={202 - bar.h} fill="#34d399" fontSize="9" textAnchor="middle" fontFamily="var(--font-mono)">
                      {bar.val}
                    </text>
                  </g>
                ))}

                {/* Gradients */}
                <defs>
                  <linearGradient id="tempGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* X-axis time marks */}
                <text x="60" y="228" fill="#64748b" fontSize="10" fontFamily="var(--font-mono)">00:00 UTC</text>
                <text x="210" y="228" fill="#64748b" fontSize="10" fontFamily="var(--font-mono)">06:00</text>
                <text x="360" y="228" fill="#64748b" fontSize="10" fontFamily="var(--font-mono)">12:00</text>
                <text x="510" y="228" fill="#64748b" fontSize="10" fontFamily="var(--font-mono)">18:00</text>
                <text x="660" y="228" fill="#64748b" fontSize="10" fontFamily="var(--font-mono)">24:00</text>
              </svg>
            )}

            {activeQuery.chartType === 'ocean_depth' && (
              <svg viewBox="0 0 700 240" style={{ width: '100%', height: '100%' }}>
                {/* Vertical Depth Profile */}
                <line x1="80" y1="20" x2="660" y2="20" stroke="rgba(255,255,255,0.06)" />
                <line x1="80" y1="80" x2="660" y2="80" stroke="rgba(255,255,255,0.06)" />
                <line x1="80" y1="140" x2="660" y2="140" stroke="rgba(255,255,255,0.06)" />
                <line x1="80" y1="200" x2="660" y2="200" stroke="rgba(255,255,255,0.06)" />

                <text x="70" y="24" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="var(--font-mono)">35m</text>
                <text x="70" y="84" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="var(--font-mono)">55m (TAW)</text>
                <text x="70" y="144" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="var(--font-mono)">100m</text>
                <text x="70" y="204" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="var(--font-mono)">180m</text>

                {/* Atlantic Temperature Pulse Curve */}
                <path
                  d="M 180 20 C 380 40, 520 80, 560 90 C 580 100, 320 140, 260 170 C 220 190, 190 200, 160 210"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="3.5"
                />

                {/* Salinity curve */}
                <path
                  d="M 220 20 C 260 50, 420 80, 460 90 C 490 120, 510 160, 540 210"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  strokeDasharray="5 3"
                />

                <circle cx="560" cy="90" r="6" fill="#f97316" stroke="#ffffff" strokeWidth="2" />
                <text x="575" y="94" fill="#fb923c" fontSize="11" fontWeight="bold" fontFamily="var(--font-mono)">
                  +3.4°C Atlantic Core (55m)
                </text>
              </svg>
            )}

            {activeQuery.chartType === 'glacier_discharge' && (
              <svg viewBox="0 0 700 240" style={{ width: '100%', height: '100%' }}>
                {/* Glacier Runoff Bar chart */}
                <line x1="50" y1="210" x2="680" y2="210" stroke="rgba(255,255,255,0.2)" />
                {[
                  { month: 'May', val: 3.2, h: 35 },
                  { month: 'Jun', val: 8.6, h: 85 },
                  { month: 'Jul (Peak)', val: 16.4, h: 165 },
                  { month: 'Aug', val: 14.1, h: 140 },
                  { month: 'Sep', val: 5.8, h: 60 },
                  { month: 'Oct', val: 1.9, h: 22 },
                ].map((d, i) => (
                  <g key={i}>
                    <rect
                      x={80 + i * 95}
                      y={210 - d.h}
                      width="42"
                      height={d.h}
                      fill="url(#glacierBar)"
                      rx="4"
                    />
                    <text x={101 + i * 95} y={198 - d.h} fill="#7dd3fc" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="var(--font-mono)">
                      {d.val} m³/s
                    </text>
                    <text x={101 + i * 95} y="226" fill="#94a3b8" fontSize="11" textAnchor="middle" fontFamily="var(--font-sans)">
                      {d.month}
                    </text>
                  </g>
                ))}
                <defs>
                  <linearGradient id="glacierBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#0369a1" />
                  </linearGradient>
                </defs>
              </svg>
            )}

            {activeQuery.chartType === 'ozone_depletion' && (
              <svg viewBox="0 0 700 240" style={{ width: '100%', height: '100%' }}>
                {/* Ozone Hole V-shaped Dip */}
                <line x1="60" y1="40" x2="670" y2="40" stroke="rgba(255,255,255,0.06)" />
                <line x1="60" y1="120" x2="670" y2="120" stroke="rgba(255,255,255,0.06)" />
                <line x1="60" y1="190" x2="670" y2="190" stroke="rgba(255,255,255,0.06)" />

                <text x="50" y="44" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="var(--font-mono)">300 DU</text>
                <text x="50" y="124" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="var(--font-mono)">220 DU</text>
                <text x="50" y="194" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="var(--font-mono)">150 DU</text>

                <path
                  d="M 80 50 C 160 60, 260 100, 360 180 C 440 170, 540 80, 640 60"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="3.5"
                />

                <circle cx="360" cy="180" r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                <text x="360" y="208" fill="#f87171" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="var(--font-mono)">
                  Spring Ozone Minimum: 165 DU (Oct)
                </text>
              </svg>
            )}

            {/* Legend & Unit */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '16px',
              fontSize: '0.78rem',
              color: 'var(--text-muted)'
            }}>
              <div style={{ display: 'flex', gap: '14px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: 12, height: 3, background: 'var(--accent-cyan)', display: 'inline-block' }}></span>
                  Main Measurement Line
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: 10, height: 10, background: 'rgba(16, 185, 129, 0.4)', borderRadius: 2, display: 'inline-block' }}></span>
                  Wind Speed Readings
                </span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-aurora)' }}>
                Data Quality: Verified & Checked
              </span>
            </div>
          </div>

          {/* AI Grounded Explanation */}
          <div style={{
            marginTop: '20px',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(56, 189, 248, 0.05)',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start'
          }}>
            <Sparkles size={20} color="var(--accent-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '4px' }}>
                What This Chart Means (Plain English)
              </div>
              <p style={{ fontSize: '0.88rem', color: '#e2e8f0', lineHeight: 1.55 }}>
                {activeQuery.explanation}
              </p>
            </div>
          </div>
        </div>

        {/* Statistical Metrics & Provenance Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Key Metrics */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 size={16} color="var(--accent-cyan)" />
              Key Numbers at a Glance
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {Object.entries(activeQuery.stats).map(([label, val]) => (
                <div key={label} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 14px',
                  background: '#f8fafc',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <span style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'capitalize', fontWeight: 500 }}>
                    {label.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dataset Provenance Card */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={16} color="var(--accent-aurora)" />
              Dataset Details & Source
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem' }}>
              <div>
                <span style={{ color: '#64748b' }}>Origin Station:</span>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>{matchedDataset.station.toUpperCase()} Base</div>
              </div>

              <div>
                <span style={{ color: '#64748b' }}>Discipline:</span>
                <div style={{ color: '#0284c7', fontWeight: 600 }}>{matchedDataset.discipline}</div>
              </div>

              <div>
                <span style={{ color: '#64748b' }}>DOI Identifier:</span>
                <div style={{ fontFamily: 'var(--font-mono)', color: '#0f172a', wordBreak: 'break-all', fontWeight: 600 }}>
                  {matchedDataset.doi}
                </div>
              </div>

              <div>
                <span style={{ color: '#64748b' }}>Standard:</span>
                <div style={{ color: '#059669', fontWeight: 700 }}>
                  Official Global Scientific Standard
                </div>
              </div>

              <div style={{ paddingTop: '8px', borderTop: '1px solid #e2e8f0' }}>
                <button
                  onClick={handleDownload}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(56, 189, 248, 0.1)',
                    border: '1px solid var(--border-active)',
                    color: 'var(--accent-cyan)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <FileSpreadsheet size={15} />
                  <span>Download Data (Spreadsheet CSV)</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
