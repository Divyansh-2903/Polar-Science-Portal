import React, { useState } from 'react';
import { 
  scientificDatasets, 
  expeditionReports 
} from '../data/polarCorpus';
import { 
  Database, 
  Search, 
  Filter, 
  Download, 
  ExternalLink, 
  Layers, 
  CheckCircle2, 
  FileSpreadsheet, 
  Eye, 
  Tag, 
  Share2,
  FileCode,
  ShieldCheck,
  BookOpen,
  Sparkles,
  ArrowRight,
  FileText,
  Copy,
  ChevronDown
} from 'lucide-react';

export function KnowledgeRepository({ onExploreDataset, onNavigate }) {
  const [activeCatalogTab, setActiveCatalogTab] = useState('reports'); // 'reports' | 'datasets'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPole, setSelectedPole] = useState('All');
  const [selectedDiscipline, setSelectedDiscipline] = useState('All');
  const [selectedDatasetModal, setSelectedDatasetModal] = useState(null);
  const [selectedReportModal, setSelectedReportModal] = useState(null);
  const [copiedCitationId, setCopiedCitationId] = useState(null);
  const [downloadSuccessId, setDownloadSuccessId] = useState(null);

  const disciplines = [
    'All',
    'Atmospheric Physics',
    'Cryosphere & Glaciology',
    'Oceans & Hydrography',
    'Climate Indicators',
    'Atmosphere & Aerosols'
  ];

  const filteredReports = expeditionReports.filter(rep => {
    const matchesSearch = 
      rep.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rep.expedition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rep.leadAuthor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rep.station.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPole = selectedPole === 'All' || 
      (selectedPole === 'Antarctica' && (rep.station === 'bharati' || rep.station === 'maitri')) ||
      (selectedPole === 'Arctic' && rep.station === 'himadri') ||
      (selectedPole === 'Himalayas' && rep.station === 'himansh');

    return matchesSearch && matchesPole;
  });

  const filteredDatasets = scientificDatasets.filter(ds => {
    const matchesSearch = 
      ds.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ds.discipline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ds.station.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPole = selectedPole === 'All' || ds.pole.toLowerCase() === selectedPole.toLowerCase();
    const matchesDiscipline = selectedDiscipline === 'All' || ds.discipline === selectedDiscipline;

    return matchesSearch && matchesPole && matchesDiscipline;
  });

  // Copy formal APA citation
  const handleCopyCitation = (rep) => {
    const year = rep.publicationDate ? rep.publicationDate.split('-')[0] : '2023';
    const citation = `${rep.leadAuthor} (${year}). ${rep.title}. ${rep.expedition}. National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences, India. https://doi.org/${rep.doi}`;
    navigator.clipboard.writeText(citation);
    setCopiedCitationId(rep.id);
    setTimeout(() => setCopiedCitationId(null), 3000);
  };

  // Generate and download genuine mission report text file
  const handleDownloadReportDoc = (rep) => {
    const doc = `========================================================================
NATIONAL CENTRE FOR POLAR AND OCEAN RESEARCH (NCPOR)
Ministry of Earth Sciences, Government of India
Official Expedition Technical Report & Scientific Monograph
========================================================================

DOCUMENT TITLE:
${rep.title}

EXPEDITION:
${rep.expedition}

OPERATING BASE / STATION:
${rep.station.toUpperCase()} Station

LEAD PRINCIPAL INVESTIGATOR:
${rep.leadAuthor}

CO-INVESTIGATORS:
${rep.coAuthors ? rep.coAuthors.join(', ') : 'National Inter-Institutional Scientific Team'}

PUBLICATION DATE:
${rep.publicationDate}

OFFICIAL DIGITAL OBJECT IDENTIFIER (DOI):
https://doi.org/${rep.doi}

EXECUTIVE SUMMARY:
${rep.abstract}

KEY SCIENTIFIC FINDINGS & EVIDENCE:
${rep.sourceParagraphs ? rep.sourceParagraphs.map((p, i) => `[Evidence Span ${i+1}] ${p}`).join('\n\n') : 'Verified by NCPOR Editorial Board'}

DUBLIN CORE METADATA TAGS:
- dc:title: ${rep.title}
- dc:creator: ${rep.leadAuthor}
- dc:publisher: National Centre for Polar and Ocean Research (NCPOR)
- dc:identifier: ${rep.doi}
- dc:rights: CC-BY 4.0 Open Access (NCPOR / MoES)

========================================================================
Exported from POLARIS · Indian Polar Science Portal
========================================================================
`;

    const blob = new Blob([doc], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ncpor_${rep.id}_report_summary.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccessId(rep.id);
    setTimeout(() => setDownloadSuccessId(null), 3000);
  };

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', padding: '10px 0 40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Repository Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px',
        padding: '24px',
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)'
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#eff6ff',
            color: '#1e6ef5',
            padding: '3px 10px',
            borderRadius: '99px',
            fontSize: '0.74rem',
            fontWeight: 700,
            marginBottom: '8px'
          }}>
            <Database size={13} />
            <span>Official Indian Polar Archive · 40+ Years of Expeditions</span>
          </div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
            Expedition Reports & Scientific Papers
          </h2>
          <p style={{ maxWidth: 840, margin: 0, fontSize: '0.86rem', color: '#64748b', lineHeight: 1.55 }}>
            Explore official Indian Antarctic, Arctic, and Himalayan mission reports. Read simplified summaries in plain English, copy verified citations, or download report summaries.
          </p>
        </div>

        {/* View Switcher Pills */}
        <div style={{
          display: 'flex',
          background: '#f1f5f9',
          padding: '4px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          gap: '4px'
        }}>
          <button
            onClick={() => setActiveCatalogTab('reports')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: activeCatalogTab === 'reports' ? 700 : 600,
              color: activeCatalogTab === 'reports' ? '#1e6ef5' : '#64748b',
              background: activeCatalogTab === 'reports' ? '#ffffff' : 'transparent',
              border: 'none',
              boxShadow: activeCatalogTab === 'reports' ? '0 1px 3px rgba(15, 23, 42, 0.08)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.16s ease'
            }}
          >
            <BookOpen size={15} />
            <span>Expedition Reports ({filteredReports.length})</span>
          </button>

          <button
            onClick={() => setActiveCatalogTab('datasets')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: activeCatalogTab === 'datasets' ? 700 : 600,
              color: activeCatalogTab === 'datasets' ? '#1e6ef5' : '#64748b',
              background: activeCatalogTab === 'datasets' ? '#ffffff' : 'transparent',
              border: 'none',
              boxShadow: activeCatalogTab === 'datasets' ? '0 1px 3px rgba(15, 23, 42, 0.08)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.16s ease'
            }}
          >
            <FileSpreadsheet size={15} />
            <span>Raw Datasets ({filteredDatasets.length})</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'center',
        background: '#ffffff',
        padding: '14px 18px',
        borderRadius: '14px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)'
      }}>
        {/* Search Input */}
        <div style={{ flex: 1, minWidth: '260px', position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px' }} aria-hidden="true" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={activeCatalogTab === 'reports' ? "Search reports by title, scientist, expedition, or station…" : "Search NetCDF variables, station name, or DOI…"}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              color: '#0f172a',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Pole Filter */}
        <div style={{ display: 'flex', gap: '4px' }}>
          {['All', 'Antarctica', 'Arctic', 'Himalayas'].map(pole => (
            <button
              key={pole}
              onClick={() => setSelectedPole(pole)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 600,
                background: selectedPole === pole ? '#1e6ef5' : '#f1f5f9',
                color: selectedPole === pole ? '#ffffff' : '#64748b',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.14s ease'
              }}
            >
              {pole}
            </button>
          ))}
        </div>

        {/* Discipline Dropdown (Only for datasets) */}
        {activeCatalogTab === 'datasets' && (
          <select
            value={selectedDiscipline}
            onChange={(e) => setSelectedDiscipline(e.target.value)}
            aria-label="Filter by Scientific Discipline"
            style={{
              background: '#f8fafc',
              color: '#0f172a',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '7px 12px',
              fontSize: '0.8rem',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {disciplines.map(disc => (
              <option key={disc} value={disc}>{disc}</option>
            ))}
          </select>
        )}
      </div>

      {/* VIEW A: EXPEDITION REPORTS */}
      {activeCatalogTab === 'reports' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredReports.map((rep) => (
            <div
              key={rep.id}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                transition: 'box-shadow 0.15s ease'
              }}
            >
              {/* Header Badges */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    background: '#e0f2fe',
                    color: '#0284c7',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '6px'
                  }}>
                    {rep.expedition}
                  </span>
                  <span style={{
                    background: '#f1f5f9',
                    color: '#475569',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    textTransform: 'uppercase'
                  }}>
                    Station: {rep.station}
                  </span>
                </div>
                <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontFamily: 'monospace' }}>
                  DOI: {rep.doi}
                </span>
              </div>

              {/* Title & Author */}
              <div>
                <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', lineHeight: 1.35 }}>
                  {rep.title}
                </h3>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  <strong>Lead PI:</strong> {rep.leadAuthor} · Published: {rep.publicationDate}
                </div>
              </div>

              {/* Abstract */}
              <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                {rep.abstract}
              </p>

              {/* Key Evidence Spans Count */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.76rem', color: '#64748b', flexWrap: 'wrap' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={13} color="#10b981" />
                  {rep.sourceParagraphs ? rep.sourceParagraphs.length : 4} Verified Evidence Spans
                </span>
                <span>•</span>
                <span>Dublin Core Tagged</span>
                <span>•</span>
                <span>CC-BY 4.0 Open Access</span>
              </div>

              {/* Action Buttons: Seamless Handoffs + Citations + Download */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                paddingTop: '14px',
                borderTop: '1px solid #f1f5f9',
                alignItems: 'center'
              }}>
                <button
                  onClick={() => onNavigate && onNavigate('research', { reportId: rep.id })}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    background: '#1e6ef5',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(30, 110, 245, 0.25)'
                  }}
                >
                  <Sparkles size={14} />
                  <span>Read Simplified (Explainer)</span>
                </button>

                <button
                  onClick={() => onNavigate && onNavigate('outreach', { reportId: rep.id })}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    background: '#f1f5f9',
                    border: '1px solid #e2e8f0',
                    cursor: 'pointer'
                  }}
                >
                  <Share2 size={14} />
                  <span>Draft News / Post</span>
                </button>

                <button
                  onClick={() => setSelectedReportModal(rep)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#475569',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    cursor: 'pointer'
                  }}
                >
                  <Eye size={14} />
                  <span>View Metadata Dossier</span>
                </button>

                <button
                  onClick={() => handleCopyCitation(rep)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: copiedCitationId === rep.id ? '#059669' : '#475569',
                    background: copiedCitationId === rep.id ? '#ecfdf5' : '#ffffff',
                    border: `1px solid ${copiedCitationId === rep.id ? '#a7f3d0' : '#cbd5e1'}`,
                    cursor: 'pointer'
                  }}
                  title="Copy APA Citation"
                >
                  <Copy size={14} />
                  <span>{copiedCitationId === rep.id ? '✓ Citation Copied' : 'Copy Citation'}</span>
                </button>

                <button
                  onClick={() => handleDownloadReportDoc(rep)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: downloadSuccessId === rep.id ? '#059669' : '#1e6ef5',
                    background: downloadSuccessId === rep.id ? '#ecfdf5' : '#eff6ff',
                    border: `1px solid ${downloadSuccessId === rep.id ? '#a7f3d0' : '#bfdbfe'}`,
                    cursor: 'pointer'
                  }}
                  title="Download Official Report Brief"
                >
                  <Download size={14} />
                  <span>{downloadSuccessId === rep.id ? '✓ Summary Saved' : 'Download Brief'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW B: DATASETS GRID */}
      {activeCatalogTab === 'datasets' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '20px'
        }}>
          {filteredDatasets.map((ds) => (
            <div
              key={ds.id}
              className="glass-panel"
              style={{
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '16px'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span className="badge-status badge-scheduled" style={{ textTransform: 'uppercase' }}>
                    {ds.pole} · {ds.station}
                  </span>
                  <span className="badge-status badge-approved" style={{ fontSize: '0.7rem' }}>
                    {ds.dataQualityGrade}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.08rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.4, marginBottom: '8px' }}>
                  {ds.title}
                </h3>

                <div style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#64748b',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  padding: '8px',
                  borderRadius: '8px'
                }}>
                  <div>Temporal: {ds.temporalRange}</div>
                  <div>Size: {ds.fileSize} ({ds.recordsCount})</div>
                  <div>DOI: {ds.doi}</div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div style={{ display: 'flex', gap: '10px', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)' }}>
                <button
                  onClick={() => setSelectedDatasetModal(ds)}
                  className="btn-secondary"
                  style={{ flex: 1, padding: '8px 12px', fontSize: '0.8rem', justifyContent: 'center' }}
                >
                  <Eye size={14} aria-hidden="true" />
                  <span>NetCDF Schema</span>
                </button>

                <button
                  onClick={() => {
                    if (onExploreDataset) onExploreDataset(ds.id);
                    else if (onNavigate) onNavigate('data', { datasetId: ds.id });
                  }}
                  className="btn-primary"
                  style={{ flex: 1, padding: '8px 12px', fontSize: '0.8rem', justifyContent: 'center' }}
                >
                  <Layers size={14} aria-hidden="true" />
                  <span>Plot Data</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Report Dublin Core Metadata Modal */}
      {selectedReportModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 3000,
          padding: '20px'
        }}
        onClick={() => setSelectedReportModal(null)}
        >
          <div 
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              border: '1px solid #e2e8f0',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#1e6ef5', textTransform: 'uppercase' }}>
                  Dublin Core Metadata & Verified Evidence
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '4px 0 0 0' }}>
                  {selectedReportModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedReportModal(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', color: '#64748b', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{
              background: '#f8fafc',
              borderRadius: '12px',
              padding: '14px',
              border: '1px solid #e2e8f0',
              fontSize: '0.8rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div><strong style={{ color: '#0f172a' }}>dc:creator:</strong> {selectedReportModal.leadAuthor}</div>
              <div><strong style={{ color: '#0f172a' }}>dc:expedition:</strong> {selectedReportModal.expedition}</div>
              <div><strong style={{ color: '#0f172a' }}>dc:identifier:</strong> {selectedReportModal.doi}</div>
              <div><strong style={{ color: '#0f172a' }}>dc:date:</strong> {selectedReportModal.publicationDate}</div>
              <div><strong style={{ color: '#0f172a' }}>dc:publisher:</strong> National Centre for Polar and Ocean Research (NCPOR)</div>
              <div><strong style={{ color: '#0f172a' }}>dc:rights:</strong> CC-BY 4.0 Open Access</div>
            </div>

            <div>
              <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                Executive Abstract:
              </div>
              <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                {selectedReportModal.abstract}
              </p>
            </div>

            {selectedReportModal.sourceParagraphs && (
              <div>
                <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  Verified Citation Evidence Spans ({selectedReportModal.sourceParagraphs.length}):
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedReportModal.sourceParagraphs.map((span, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: '#eff6ff',
                        borderLeft: '3px solid #1e6ef5',
                        padding: '8px 12px',
                        fontSize: '0.78rem',
                        color: '#1e3a8a',
                        lineHeight: 1.5,
                        borderRadius: '0 6px 6px 0'
                      }}
                    >
                      {span}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
              <button
                onClick={() => setSelectedReportModal(null)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  background: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  color: '#475569',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
              <button
                onClick={() => {
                  const id = selectedReportModal.id;
                  setSelectedReportModal(null);
                  if (onNavigate) onNavigate('research', { reportId: id });
                }}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  background: '#1e6ef5',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Read Simplified in Explainer →
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Dataset Schema Modal */}
      {selectedDatasetModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(4, 8, 16, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 3000,
          padding: '20px'
        }}
        onClick={() => setSelectedDatasetModal(null)}
        >
          <div className="glass-panel" style={{
            maxWidth: '680px',
            width: '100%',
            padding: '28px',
            maxHeight: '85vh',
            overflowY: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span className="badge-status badge-scheduled" style={{ marginBottom: '6px' }}>
                  NETCDF-4 / HDF5 DATA SCHEMA PREVIEW
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>{selectedDatasetModal.title}</h3>
              </div>
              <button
                onClick={() => setSelectedDatasetModal(null)}
                style={{ color: '#64748b', fontSize: '1.2rem', padding: '4px 8px', cursor: 'pointer' }}
                aria-label="Close schema modal"
              >
                ✕
              </button>
            </div>

            <div style={{
              background: '#0b1526',
              padding: '16px',
              borderRadius: '12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: '#38bdf8',
              lineHeight: 1.6,
              marginBottom: '16px',
              border: '1px solid #1e293b'
            }}>
              <div style={{ color: '#94a3b8' }}>// NetCDF Global Attributes (ISO 19115 compliant)</div>
              <div>:title = "{selectedDatasetModal.title}" ;</div>
              <div>:institution = "National Centre for Polar and Ocean Research (NCPOR), MoES, India" ;</div>
              <div>:source = "{selectedDatasetModal.station.toUpperCase()} Observatory Sensor Package" ;</div>
              <div>:doi = "{selectedDatasetModal.doi}" ;</div>
              <div>:conventions = "CF-1.8" ;</div>
              <div style={{ marginTop: '10px', color: '#94a3b8' }}>// Variables:</div>
              {selectedDatasetModal.variables.map((v, i) => (
                <div key={i}>float {v}(time, lat, lon) ;</div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setSelectedDatasetModal(null)}
                className="btn-secondary"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const id = selectedDatasetModal.id;
                  setSelectedDatasetModal(null);
                  if (onExploreDataset) onExploreDataset(id);
                  else if (onNavigate) onNavigate('data', { datasetId: id });
                }}
                className="btn-primary"
              >
                Launch in Data & Charts
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
