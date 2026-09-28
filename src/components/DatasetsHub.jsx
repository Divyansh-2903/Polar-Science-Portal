import React, { useState } from 'react';
import { AskTheDataView } from './AskTheDataView';
import { AskTheData } from './AskTheData';
import { scientificDatasets } from '../data/polarCorpus';
import { 
  BarChart3, 
  Database, 
  Sparkles, 
  Layers, 
  Search, 
  FileSpreadsheet, 
  CheckCircle2, 
  Info,
  Sliders,
  Download,
  Filter,
  ArrowRight,
  Eye,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export function DatasetsHub({ preselectedDatasetId }) {
  const [activeSubTab, setActiveSubTab] = useState('visualizer'); // 'visualizer' | 'query' | 'catalog'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPole, setSelectedPole] = useState('All');
  const [selectedDiscipline, setSelectedDiscipline] = useState('All');
  const [expandedPreviewId, setExpandedPreviewId] = useState(null);
  const [downloadSuccessId, setDownloadSuccessId] = useState(null);

  const disciplines = [
    'All',
    'Atmospheric Physics',
    'Cryosphere & Glaciology',
    'Oceans & Hydrography',
    'Climate Indicators',
    'Atmosphere & Aerosols'
  ];

  const filteredDatasets = scientificDatasets.filter(ds => {
    const matchesSearch = 
      ds.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ds.station.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ds.variables.some(v => v.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ds.doi.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPole = selectedPole === 'All' || ds.pole.toLowerCase() === selectedPole.toLowerCase();
    const matchesDiscipline = selectedDiscipline === 'All' || ds.discipline === selectedDiscipline;

    return matchesSearch && matchesPole && matchesDiscipline;
  });

  // Download real sample dataset as CSV
  const handleDownloadDatasetCsv = (ds) => {
    if (!ds.sampleData || ds.sampleData.length === 0) return;

    const keys = Object.keys(ds.sampleData[0]);
    const header = keys.join(',') + '\n';
    const rows = ds.sampleData.map(row => keys.map(k => `"${row[k]}"`).join(',')).join('\n');
    const csvContent = header + rows;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${ds.id}_data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccessId(ds.id);
    setTimeout(() => setDownloadSuccessId(null), 3000);
  };

  return (
    <div style={{ width: '100%', maxWidth: 1600, margin: '0 auto', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* ── Top Header Banner ──────────────────────────────────────────────── */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '20px',
        padding: '24px 28px',
        boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px'
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#eff6ff',
            color: '#1e6ef5',
            padding: '3px 12px',
            borderRadius: '99px',
            fontSize: '0.74rem',
            fontWeight: 700,
            marginBottom: '8px'
          }}>
            <Database size={13} />
            <span>Indian Polar Data Center · Verified Primary Datasets</span>
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
            Data & Interactive Charts
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0, maxWidth: 840, lineHeight: 1.55 }}>
            Explore real weather records, glacier mass balance measurements, and ocean hydrography across Antarctica, the Arctic, and the Himalayas. Generate interactive charts online or preview and download raw data files.
          </p>
        </div>

        {/* Sub-Navigation Switcher Tabs */}
        <div style={{
          display: 'flex',
          background: '#f1f5f9',
          padding: '4px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          gap: '4px'
        }}>
          <button
            onClick={() => setActiveSubTab('visualizer')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 18px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: activeSubTab === 'visualizer' ? 700 : 600,
              color: activeSubTab === 'visualizer' ? '#1e6ef5' : '#64748b',
              background: activeSubTab === 'visualizer' ? '#ffffff' : 'transparent',
              boxShadow: activeSubTab === 'visualizer' ? '0 1px 3px rgba(15, 23, 42, 0.08)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.16s ease'
            }}
          >
            <BarChart3 size={15} />
            <span>Interactive Charts</span>
          </button>

          <button
            onClick={() => setActiveSubTab('query')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 18px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: activeSubTab === 'query' ? 700 : 600,
              color: activeSubTab === 'query' ? '#1e6ef5' : '#64748b',
              background: activeSubTab === 'query' ? '#ffffff' : 'transparent',
              boxShadow: activeSubTab === 'query' ? '0 1px 3px rgba(15, 23, 42, 0.08)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.16s ease'
            }}
          >
            <Sparkles size={15} />
            <span>Natural Language Plotter</span>
          </button>

          <button
            onClick={() => setActiveSubTab('catalog')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 18px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: activeSubTab === 'catalog' ? 700 : 600,
              color: activeSubTab === 'catalog' ? '#1e6ef5' : '#64748b',
              background: activeSubTab === 'catalog' ? '#ffffff' : 'transparent',
              boxShadow: activeSubTab === 'catalog' ? '0 1px 3px rgba(15, 23, 42, 0.08)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.16s ease'
            }}
          >
            <Database size={15} />
            <span>Dataset Catalog ({scientificDatasets.length})</span>
          </button>
        </div>
      </div>

      {/* ── SUBTAB 1: INTERACTIVE CHARTS ────────────────────────────────────── */}
      {activeSubTab === 'visualizer' && (
        <div style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '24px 28px', boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)' }}>
          <AskTheDataView />
        </div>
      )}

      {/* ── SUBTAB 2: NATURAL LANGUAGE PLOTTER ──────────────────────────────── */}
      {activeSubTab === 'query' && (
        <div style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)' }}>
          <AskTheData preselectedDatasetId={preselectedDatasetId} />
        </div>
      )}

      {/* ── SUBTAB 3: SCIENTIFIC DATASET CATALOG ────────────────────────────── */}
      {activeSubTab === 'catalog' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Search & Filter Toolbar */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '16px 20px',
            boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px'
          }}>
            {/* Search Input */}
            <div style={{
              flex: 1,
              minWidth: '280px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '10px',
              padding: '8px 14px'
            }}>
              <Search size={16} color="#64748b" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search variables (temperature, radiation, CTD), station, or DOI..."
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  fontSize: '0.84rem',
                  color: '#0f172a',
                  width: '100%',
                  fontFamily: 'var(--font-body)'
                }}
              />
            </div>

            {/* Region Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.76rem', color: '#64748b', fontWeight: 600 }}>Region:</span>
              <div style={{ display: 'flex', background: '#f1f5f9', padding: '3px', borderRadius: '8px', gap: '3px' }}>
                {['All', 'Antarctica', 'Arctic', 'Himalayas'].map(pole => (
                  <button
                    key={pole}
                    onClick={() => setSelectedPole(pole)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '6px',
                      fontSize: '0.76rem',
                      fontWeight: selectedPole === pole ? 700 : 500,
                      color: selectedPole === pole ? '#1e6ef5' : '#475569',
                      background: selectedPole === pole ? '#ffffff' : 'transparent',
                      border: 'none',
                      boxShadow: selectedPole === pole ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {pole}
                  </button>
                ))}
              </div>
            </div>

            {/* Discipline Dropdown Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.76rem', color: '#64748b', fontWeight: 600 }}>Discipline:</span>
              <select
                value={selectedDiscipline}
                onChange={(e) => setSelectedDiscipline(e.target.value)}
                style={{
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: '#0f172a',
                  background: '#f8fafc',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                {disciplines.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Dataset Cards List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredDatasets.map(ds => {
              const isExpanded = expandedPreviewId === ds.id;
              return (
                <div
                  key={ds.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '22px 24px',
                    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    transition: 'all 0.16s ease'
                  }}
                >
                  {/* Card Header */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                    <div style={{ flex: 1, minWidth: '280px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <span style={{
                          background: ds.pole === 'Antarctica' ? '#eff6ff' : ds.pole === 'Arctic' ? '#ecfdf5' : '#ede9fe',
                          color: ds.pole === 'Antarctica' ? '#1e6ef5' : ds.pole === 'Arctic' ? '#059669' : '#6366f1',
                          padding: '3px 10px',
                          borderRadius: '99px',
                          fontSize: '0.72rem',
                          fontWeight: 700
                        }}>
                          {ds.pole} · {ds.station.toUpperCase()}
                        </span>

                        <span style={{
                          background: '#f1f5f9',
                          color: '#475569',
                          padding: '3px 10px',
                          borderRadius: '99px',
                          fontSize: '0.72rem',
                          fontWeight: 600
                        }}>
                          {ds.discipline}
                        </span>

                        <span style={{
                          background: '#ecfdf5',
                          color: '#059669',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          border: '1px solid #a7f3d0',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <ShieldCheck size={12} />
                          <span>{ds.dataQualityGrade}</span>
                        </span>
                      </div>

                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.01em' }}>
                        {ds.title}
                      </h3>
                      
                      <div style={{ fontSize: '0.76rem', color: '#64748b' }}>
                        DOI: <span style={{ fontFamily: 'monospace', color: '#0f172a' }}>{ds.doi}</span> · Temporal Range: {ds.temporalRange}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>
                        {ds.recordsCount}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                        {ds.format} ({ds.fileSize})
                      </span>
                    </div>
                  </div>

                  {/* Variables Badges */}
                  <div>
                    <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700, marginBottom: '6px' }}>
                      Recorded Parameters / Variables:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {ds.variables.map((v, i) => (
                        <span
                          key={i}
                          style={{
                            background: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            color: '#334155',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            fontFamily: 'monospace'
                          }}
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sample Table Preview (Collapsible) */}
                  {isExpanded && ds.sampleData && (
                    <div style={{
                      background: '#f8fafc',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      padding: '16px',
                      overflowX: 'auto',
                      animation: 'fadeIn 0.2s ease'
                    }}>
                      <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FileSpreadsheet size={14} color="#1e6ef5" />
                        <span>Live Tabular Preview (First {ds.sampleData.length} records):</span>
                      </div>

                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                        <thead>
                          <tr style={{ background: '#e2e8f0', textAlign: 'left' }}>
                            {Object.keys(ds.sampleData[0]).map(col => (
                              <th key={col} style={{ padding: '8px 12px', fontWeight: 700, color: '#1e293b' }}>
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {ds.sampleData.map((row, rIdx) => (
                            <tr key={rIdx} style={{ borderBottom: '1px solid #e2e8f0', background: rIdx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                              {Object.values(row).map((val, cIdx) => (
                                <td key={cIdx} style={{ padding: '8px 12px', fontFamily: 'monospace', color: '#334155' }}>
                                  {val}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Actions Row */}
                  <div style={{
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: '12px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px'
                  }}>
                    <button
                      onClick={() => setExpandedPreviewId(isExpanded ? null : ds.id)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'transparent',
                        border: 'none',
                        color: '#1e6ef5',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                      <span>{isExpanded ? 'Hide Sample Table' : 'Preview Data Rows'}</span>
                    </button>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleDownloadDatasetCsv(ds)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: downloadSuccessId === ds.id ? '#ecfdf5' : '#ffffff',
                          border: `1.5px solid ${downloadSuccessId === ds.id ? '#10b981' : '#e2e8f0'}`,
                          color: downloadSuccessId === ds.id ? '#059669' : '#0f172a',
                          padding: '7px 14px',
                          borderRadius: '8px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {downloadSuccessId === ds.id ? <CheckCircle2 size={14} /> : <Download size={14} />}
                        <span>{downloadSuccessId === ds.id ? '✓ Downloaded CSV' : 'Download CSV'}</span>
                      </button>

                      <button
                        onClick={() => setActiveSubTab('visualizer')}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: '#1e6ef5',
                          border: 'none',
                          color: '#ffffff',
                          padding: '7px 14px',
                          borderRadius: '8px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          boxShadow: '0 2px 6px rgba(30,110,245,0.3)'
                        }}
                      >
                        <BarChart3 size={14} />
                        <span>Plot in Visualizer</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
}
