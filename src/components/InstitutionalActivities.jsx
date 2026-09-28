import React, { useState } from 'react';
import { institutionalActivities } from '../data/polarCorpus';
import { ExpeditionReplay } from './ExpeditionReplay';
import { 
  Compass, 
  Search, 
  Filter, 
  ExternalLink, 
  FileText, 
  Database, 
  BookOpen, 
  Film, 
  MapPin, 
  Calendar, 
  Users, 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Navigation,
  CheckCircle2,
  ChevronRight,
  Info
} from 'lucide-react';

export function InstitutionalActivities({ onNavigate }) {
  const [activeMainTab, setActiveMainTab] = useState('catalog'); // 'catalog' | 'ship_tracker'
  const [selectedSource, setSelectedSource] = useState('All'); // 'All' | 'NCPOR News' | 'NCPOR Annual Reports' | 'NCPOR Expedition pages' | 'MoES'
  const [selectedPole, setSelectedPole] = useState('All'); // 'All' | 'Antarctica' | 'Arctic' | 'Himalayas'
  const [selectedType, setSelectedType] = useState('All'); // 'All' | 'Expedition' | 'Milestone' | 'Ministry'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeActivityModal, setActiveActivityModal] = useState(null);

  // The 4 authentic sources defined in POLARIS MVP specification
  const primarySources = [
    { id: 'All', label: 'All Sources', desc: 'All 4 verified streams' },
    { id: 'NCPOR News', label: '1. NCPOR News', desc: 'Institutional events & announcements' },
    { id: 'NCPOR Annual Reports', label: '2. NCPOR Annual Reports', desc: 'Historical institutional activities' },
    { id: 'NCPOR Expedition pages', label: '3. NCPOR Expedition pages', desc: 'Expedition & field activities' },
    { id: 'MoES', label: '4. MoES', desc: 'Ministry-level polar activities' },
  ];

  const filteredActivities = institutionalActivities.filter(item => {
    const matchesSearch = 
      item.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.people.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSource = selectedSource === 'All' || item.sourceCategory === selectedSource;
    const matchesPole = selectedPole === 'All' || item.pole === selectedPole || item.pole === 'All';
    const matchesType = selectedType === 'All' || 
      (selectedType === 'Expedition' && item.type.includes('Expedition')) ||
      (selectedType === 'Milestone' && item.type.includes('Milestone')) ||
      (selectedType === 'Ministry' && item.type.includes('Ministry'));

    return matchesSearch && matchesSource && matchesPole && matchesType;
  });

  return (
    <div style={{ width: '100%', maxWidth: 1600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* ── Top Header Banner ──────────────────────────────────────────────── */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '20px',
        padding: '26px 28px',
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
            background: '#ecfdf5',
            color: '#059669',
            padding: '3px 12px',
            borderRadius: '99px',
            fontSize: '0.74rem',
            fontWeight: 700,
            marginBottom: '8px',
            border: '1px solid #a7f3d0'
          }}>
            <ShieldCheck size={14} />
            <span>Official Institutional Records · NCPOR & Ministry of Earth Sciences</span>
          </div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
            Institutional Activities & Expeditions
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0, maxWidth: 880, lineHeight: 1.55 }}>
            Structured repository of authentic Indian polar missions, historical milestones, annual reports, and ministry actions. Each record connects directly to verified field reports, datasets, publications, and media.
          </p>
        </div>

        {/* View Switcher: Structured Catalog vs Ship Tracker */}
        <div style={{
          display: 'flex',
          background: '#f1f5f9',
          padding: '4px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          gap: '4px'
        }}>
          <button
            onClick={() => setActiveMainTab('catalog')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 18px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: activeMainTab === 'catalog' ? 700 : 600,
              color: activeMainTab === 'catalog' ? '#1e6ef5' : '#64748b',
              background: activeMainTab === 'catalog' ? '#ffffff' : 'transparent',
              boxShadow: activeMainTab === 'catalog' ? '0 1px 3px rgba(15, 23, 42, 0.08)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.16s ease'
            }}
          >
            <Compass size={16} />
            <span>Structured Activities ({institutionalActivities.length})</span>
          </button>

          <button
            onClick={() => setActiveMainTab('ship_tracker')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 18px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: activeMainTab === 'ship_tracker' ? 700 : 600,
              color: activeMainTab === 'ship_tracker' ? '#1e6ef5' : '#64748b',
              background: activeMainTab === 'ship_tracker' ? '#ffffff' : 'transparent',
              boxShadow: activeMainTab === 'ship_tracker' ? '0 1px 3px rgba(15, 23, 42, 0.08)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.16s ease'
            }}
          >
            <Navigation size={16} />
            <span>Ship Journey Tracker (45th IAE)</span>
          </button>
        </div>
      </div>

      {/* ── TAB 1: STRUCTURED ACTIVITIES CATALOG ────────────────────────────── */}
      {activeMainTab === 'catalog' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* 4 Authentic Sources Filter Row */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '16px 20px',
            boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={16} color="#1e6ef5" />
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>
                  Filter by Primary Source Stream:
                </span>
                <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                  (Sourced from authentic institutional publications)
                </span>
              </div>
              <span style={{ fontSize: '0.76rem', color: '#64748b', fontWeight: 600 }}>
                Showing {filteredActivities.length} of {institutionalActivities.length} records
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '10px' }}>
              {primarySources.map(src => {
                const isSelected = selectedSource === src.id;
                return (
                  <button
                    key={src.id}
                    onClick={() => setSelectedSource(src.id)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: `1.5px solid ${isSelected ? '#1e6ef5' : '#e2e8f0'}`,
                      background: isSelected ? '#eff6ff' : '#f8fafc',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.16s ease'
                    }}
                  >
                    <div style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: isSelected ? '#1e6ef5' : '#0f172a',
                      marginBottom: '2px'
                    }}>
                      {src.label}
                    </div>
                    <div style={{
                      fontSize: '0.7rem',
                      color: isSelected ? '#2563eb' : '#64748b',
                      lineHeight: 1.3
                    }}>
                      {src.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search & Region Toolbar */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '14px 18px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)'
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
                placeholder="Search activity name, participating researchers, location, or source..."
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
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.76rem' }}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Region / Pole Filter */}
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

            {/* Type Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.76rem', color: '#64748b', fontWeight: 600 }}>Type:</span>
              <div style={{ display: 'flex', background: '#f1f5f9', padding: '3px', borderRadius: '8px', gap: '3px' }}>
                {['All', 'Expedition', 'Milestone', 'Ministry'].map(t => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '6px',
                      fontSize: '0.76rem',
                      fontWeight: selectedType === t ? 700 : 500,
                      color: selectedType === t ? '#1e6ef5' : '#475569',
                      background: selectedType === t ? '#ffffff' : 'transparent',
                      border: 'none',
                      boxShadow: selectedType === t ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Structured Activity Cards Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredActivities.map((act) => (
              <div
                key={act.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '22px 24px',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  transition: 'all 0.18s ease'
                }}
              >
                {/* Header Row: Activity Name, Type Badge, Source Pill */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                  <div style={{ flex: 1, minWidth: '280px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{
                        background: act.badgeBg,
                        color: act.badgeColor,
                        padding: '3px 10px',
                        borderRadius: '99px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        border: `1px solid ${act.badgeColor}33`
                      }}>
                        {act.type}
                      </span>

                      <span style={{
                        background: '#f1f5f9',
                        color: '#475569',
                        padding: '3px 10px',
                        borderRadius: '99px',
                        fontSize: '0.72rem',
                        fontWeight: 600
                      }}>
                        Source: {act.sourceCategory}
                      </span>

                      <span style={{
                        background: '#f8fafc',
                        color: '#059669',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        border: '1px solid #d1fae5'
                      }}>
                        ✓ {act.status}
                      </span>
                    </div>

                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.01em' }}>
                      Activity: {act.activity}
                    </h2>
                    <p style={{ fontSize: '0.84rem', color: '#475569', margin: 0, lineHeight: 1.55 }}>
                      {act.summary}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                    <span style={{
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: '#0f172a',
                      background: '#f8fafc',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0'
                    }}>
                      🗓️ {act.date}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 500 }}>
                      Region: {act.pole}
                    </span>
                  </div>
                </div>

                {/* Structured Metadata Key-Value Spec (Exact User Specification) */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '12px',
                  background: '#f8fafc',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: '1px solid #f1f5f9'
                }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.04em' }}>
                      Location
                    </div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={13} color="#0ea5e9" />
                      <span>{act.location}</span>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.04em' }}>
                      Organization
                    </div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Building2 size={13} color="#8b5cf6" />
                      <span>{act.organization}</span>
                    </div>
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.04em' }}>
                      People & Participating Institutions
                    </div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Users size={13} color="#f59e0b" />
                      <span>{act.people}</span>
                    </div>
                  </div>
                </div>

                {/* ── RELATED ITEMS BLOCK (Reports • Publications • Datasets • Photos • Videos) ── */}
                <div style={{
                  borderTop: '1px solid #f1f5f9',
                  paddingTop: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 800, letterSpacing: '0.05em' }}>
                    Related Entities (Click to explore in portal modules):
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                    
                    {/* Related Reports */}
                    {act.related.reports?.map((rep, idx) => (
                      <button
                        key={idx}
                        onClick={() => onNavigate('papers')}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          background: '#eff6ff',
                          color: '#1e6ef5',
                          border: '1px solid #bfdbfe',
                          borderRadius: '8px',
                          padding: '5px 10px',
                          fontSize: '0.74rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.14s ease'
                        }}
                        title="View Report in Research Papers Hub"
                      >
                        <FileText size={13} />
                        <span>Report: {rep.title.length > 38 ? rep.title.substring(0, 38) + '…' : rep.title}</span>
                      </button>
                    ))}

                    {/* Related Publications */}
                    {act.related.publications?.map((pub, idx) => (
                      <button
                        key={idx}
                        onClick={() => onNavigate('research')}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          background: '#f5f3ff',
                          color: '#7c3aed',
                          border: '1px solid #ddd6fe',
                          borderRadius: '8px',
                          padding: '5px 10px',
                          fontSize: '0.74rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                        title="Read Simplified Paper Explainer"
                      >
                        <BookOpen size={13} />
                        <span>Pub: {pub.title.length > 36 ? pub.title.substring(0, 36) + '…' : pub.title}</span>
                      </button>
                    ))}

                    {/* Related Datasets */}
                    {act.related.datasets?.map((ds, idx) => (
                      <button
                        key={idx}
                        onClick={() => onNavigate('data')}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          background: '#f0fdf4',
                          color: '#16a34a',
                          border: '1px solid #bbf7d0',
                          borderRadius: '8px',
                          padding: '5px 10px',
                          fontSize: '0.74rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                        title="Explore Raw Dataset"
                      >
                        <Database size={13} />
                        <span>Dataset: {ds.title.length > 36 ? ds.title.substring(0, 36) + '…' : ds.title}</span>
                      </button>
                    ))}

                    {/* Related Photos & Videos */}
                    {act.related.photos?.length > 0 && (
                      <button
                        onClick={() => onNavigate('media')}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          background: '#fdf2f8',
                          color: '#db2777',
                          border: '1px solid #fbcfe8',
                          borderRadius: '8px',
                          padding: '5px 10px',
                          fontSize: '0.74rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                        title="View Expedition Photography"
                      >
                        <Film size={13} />
                        <span>Photos ({act.related.photos.length})</span>
                      </button>
                    )}

                    {act.related.videos?.length > 0 && (
                      <button
                        onClick={() => onNavigate('media')}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          background: '#fff7ed',
                          color: '#ea580c',
                          border: '1px solid #fed7aa',
                          borderRadius: '8px',
                          padding: '5px 10px',
                          fontSize: '0.74rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                        title="Watch Expedition Video"
                      >
                        <Film size={13} />
                        <span>Videos ({act.related.videos.length})</span>
                      </button>
                    )}

                  </div>
                </div>

                {/* Footer Row: Source Citation & Deep-Dive Action */}
                <div style={{
                  borderTop: '1px solid #f1f5f9',
                  paddingTop: '10px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px'
                }}>
                  <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                    <strong style={{ color: '#0f172a' }}>Source:</strong> {act.source}
                  </div>

                  <button
                    onClick={() => setActiveActivityModal(act)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: 'transparent',
                      border: 'none',
                      color: '#1e6ef5',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      padding: '4px 8px'
                    }}
                  >
                    <span>View Structured Record Dossier</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* ── TAB 2: SHIP JOURNEY TRACKER ────────────────────────────────────── */}
      {activeMainTab === 'ship_tracker' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '16px 22px',
            boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 2px 0' }}>
                MV Vasiliy Golovnin Voyage Tracker: 45th Indian Antarctic Expedition
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>
                Interactive nautical telemetry from Mormugao Port, Goa across the Roaring Forties to Bharati & Maitri Stations.
              </p>
            </div>
            <div style={{
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              color: '#059669',
              padding: '4px 12px',
              borderRadius: '99px',
              fontSize: '0.75rem',
              fontWeight: 700
            }}>
              ● Active Expedition Ship
            </div>
          </div>

          <ExpeditionReplay onNavigate={onNavigate} />
        </div>
      )}

      {/* ── STRUCTURED RECORD DOSSIER MODAL ─────────────────────────────────── */}
      {activeActivityModal && (
        <div 
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3000,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setActiveActivityModal(null)}
        >
          <div 
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid #e2e8f0',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
              <div>
                <span style={{
                  background: activeActivityModal.badgeBg,
                  color: activeActivityModal.badgeColor,
                  padding: '3px 10px',
                  borderRadius: '99px',
                  fontSize: '0.72rem',
                  fontWeight: 700
                }}>
                  {activeActivityModal.type}
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: '8px 0 2px 0' }}>
                  {activeActivityModal.activity}
                </h3>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                  Source Stream: {activeActivityModal.sourceCategory}
                </div>
              </div>

              <button
                onClick={() => setActiveActivityModal(null)}
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  fontWeight: 700,
                  color: '#64748b'
                }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
              {activeActivityModal.summary}
            </p>

            <div style={{
              background: '#f8fafc',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ fontSize: '0.8rem' }}>
                <strong style={{ color: '#0f172a' }}>Date:</strong> {activeActivityModal.date}
              </div>
              <div style={{ fontSize: '0.8rem' }}>
                <strong style={{ color: '#0f172a' }}>Location:</strong> {activeActivityModal.location}
              </div>
              <div style={{ fontSize: '0.8rem' }}>
                <strong style={{ color: '#0f172a' }}>Organization:</strong> {activeActivityModal.organization}
              </div>
              <div style={{ fontSize: '0.8rem' }}>
                <strong style={{ color: '#0f172a' }}>People / Teams:</strong> {activeActivityModal.people}
              </div>
              <div style={{ fontSize: '0.8rem' }}>
                <strong style={{ color: '#0f172a' }}>Official Citation:</strong> {activeActivityModal.source}
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0f172a', margin: '0 0 8px 0' }}>
                Quick Action Links:
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                <button
                  onClick={() => {
                    setActiveActivityModal(null);
                    onNavigate('papers');
                  }}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #bfdbfe',
                    background: '#eff6ff',
                    color: '#1e6ef5',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  📄 View Expedition Reports →
                </button>
                <button
                  onClick={() => {
                    setActiveActivityModal(null);
                    onNavigate('data');
                  }}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #bbf7d0',
                    background: '#f0fdf4',
                    color: '#16a34a',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  📊 Explore Associated Data →
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
