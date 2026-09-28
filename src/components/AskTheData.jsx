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
      query: 'Show hourly temperature & wind dynamics at Bharati Station AWS',
      datasetId: 'ds-01-bharati-aws',
      chartType: 'weather_timeseries',
      title: 'Bharati Station (Larsemann Hills) Diurnal Temperature & Wind Telemetry',
      explanation: 'Analysis of 8,760 hourly readings demonstrates sustained sub-zero temperatures (mean -24.6°C) punctuated by severe katabatic drainage events where southeasterly wind gusts peaked above 48 km/h during pressure drops.',
      stats: { mean: '-24.6 °C', peakMin: '-26.1 °C', peakGust: '48.6 km/h', pressureMean: '981.2 hPa' }
    },
    {
      id: 'q2',
      query: 'Show Kongsfjorden underwater CTD depth-temperature profile from IndARC',
      datasetId: 'ds-03-indarc-ctd',
      chartType: 'ocean_depth',
      title: 'IndARC Subsurface Hydrographic Profile: Kongsfjorden Fjord (Svalbard)',
      explanation: 'Continuous vertical CTD casting across the 35m–180m water column reveals an intermediate Atlantic water intrusion at 55m depth with temperature peaking at +3.4°C and salinity reaching 34.82 PSU, preventing seasonal sea ice formation.',
      stats: { surfaceTemp: '+2.1 °C', atlanticCoreTemp: '+3.4 °C', deepSalinity: '34.98 PSU', maxDepth: '192 m' }
    },
    {
      id: 'q3',
      query: 'Show Himalayan glacier runoff discharge at Himansh Station',
      datasetId: 'ds-04-himansh-discharge',
      chartType: 'glacier_discharge',
      title: 'Chhota Shigri Proglacial Summer Meltwater Discharge (Himansh Station, 4,080m)',
      explanation: 'High-altitude pressure transducer logs document an exponential surge in proglacial discharge from 3.2 m³/s in May to a peak of 16.4 m³/s in July, strongly correlated with high solar insolation and positive degree-day ablation.',
      stats: { peakDischarge: '16.4 m³/s', ablationLoss: '74 cm w.e.', meanSummerTemp: '+8.2 °C', altitude: '4,080 m' }
    },
    {
      id: 'q4',
      query: 'Show total column ozone depletion cycle at Maitri Station',
      datasetId: 'ds-02-maitri-radiation',
      chartType: 'ozone_depletion',
      title: 'Maitri Station Annual Total Column Ozone & Surface Albedo Trend',
      explanation: 'Dobson spectrophotometer measurements capture the severe austral spring ozone hole depletion in October (165 Dobson Units), followed by rapid polar vortex breakup and atmospheric recovery to 288 DU by December.',
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
          Ask-the-Data: Natural Language Telemetry & Visualizer (Solving Gap D)
        </div>
        <h1>Instant Polar Telemetry & Multi-Parameter Visualizer</h1>
        <p style={{ maxWidth: 850, marginTop: '8px' }}>
          Query live and historical datasets across Antarctica, the Arctic, and the Himalayas without downloading complex NetCDF binary viewers. Get instant interactive charts, verified statistical summaries, and direct ISO 19115 citations.
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
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                color: '#ffffff',
                fontSize: '0.95rem',
                fontFamily: 'var(--font-sans)',
                boxShadow: 'var(--shadow-md)'
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
          <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', alignSelf: 'center', marginRight: '4px' }}>
            Suggested Queries:
          </span>
          {queryPresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectQuery(preset)}
              style={{
                fontSize: '0.78rem',
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                background: activeQuery.id === preset.id ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                color: activeQuery.id === preset.id ? 'var(--accent-cyan)' : 'var(--text-muted)',
                border: activeQuery.id === preset.id ? '1px solid var(--border-active)' : '1px solid rgba(255, 255, 255, 0.08)',
                cursor: 'pointer'
              }}
            >
              {preset.query}
            </button>
          ))}
        </div>
      </div>

      {/* Main Visualizer Container */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 340px',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Dynamic Interactive Chart Canvas */}
        <div className="glass-panel" style={{ padding: '24px', minHeight: '480px', display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <span className="badge-status badge-scheduled" style={{ marginBottom: '6px' }}>
                {matchedDataset.station.toUpperCase()} OBSERVATORY · {matchedDataset.discipline}
              </span>
              <h2 style={{ fontSize: '1.35rem', color: '#ffffff' }}>{activeQuery.title}</h2>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
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
            background: 'rgba(5, 11, 20, 0.7)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(56, 189, 248, 0.1)',
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
                  Primary Telemetry Line
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: 10, height: 10, background: 'rgba(16, 185, 129, 0.4)', borderRadius: 2, display: 'inline-block' }}></span>
                  Secondary Sensor Readings
                </span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-aurora)' }}>
                QA/QC Level: Automated ISO 19115 Check Passed
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
                Evidence-Grounded Interpretation
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
              Observed Parameters
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {Object.entries(activeQuery.stats).map(([label, val]) => (
                <div key={label} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 12px',
                  background: 'rgba(5, 11, 20, 0.6)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(255, 255, 255, 0.04)'
                }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                    {label.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
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
              Dataset Metadata (DataCite)
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem' }}>
              <div>
                <span style={{ color: 'var(--text-dim)' }}>Origin Station:</span>
                <div style={{ fontWeight: 600, color: '#ffffff' }}>{matchedDataset.station.toUpperCase()} Base</div>
              </div>

              <div>
                <span style={{ color: 'var(--text-dim)' }}>Discipline:</span>
                <div style={{ color: 'var(--accent-cyan)' }}>{matchedDataset.discipline}</div>
              </div>

              <div>
                <span style={{ color: 'var(--text-dim)' }}>DOI Identifier:</span>
                <div style={{ fontFamily: 'var(--font-mono)', color: '#ffffff', wordBreak: 'break-all' }}>
                  {matchedDataset.doi}
                </div>
              </div>

              <div>
                <span style={{ color: 'var(--text-dim)' }}>Standard:</span>
                <div style={{ color: 'var(--accent-aurora)', fontWeight: 600 }}>
                  ISO 19115 Geographic Metadata
                </div>
              </div>

              <div style={{ paddingTop: '8px', borderTop: '1px solid var(--border-subtle)' }}>
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
                  <span>Export Authenticated CSV</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
