import React, { useState } from 'react';
import {
  Search,
  ArrowRight,
  MapPin,
  Sparkles,
  BarChart3,
  Compass,
  Share2,
  ChevronRight,
  Database,
  Satellite,
  Users,
  Globe,
  BookOpen,
  Film,
  Shield,
  Zap,
  Navigation,
  Activity,
  FileText
} from 'lucide-react';
import { quickActions } from '../data/portalData';
import { PolarWeatherWidget } from './PolarWeatherWidget';

export function PolarCommandCenter({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');

  const getActionIcon = (id) => {
    const icons = {
      reports: <FileText size={20} color="#a78bfa" />,
      datasets: <Database size={20} color="#38bdf8" />,
      publications: <BookOpen size={20} color="#60a5fa" />,
      media: <Film size={20} color="#f472b6" />,
      activities: <Compass size={20} color="#34d399" />,
      studio: <Share2 size={20} color="#fb923c" />,
      // Backwards compatibility
      map: <MapPin size={20} color="#1e6ef5" />,
      data: <BarChart3 size={20} color="#0ea5e9" />,
      papers: <BookOpen size={20} color="#8b5cf6" />,
      ai: <Sparkles size={20} color="#10b981" />,
      replay: <Compass size={20} color="#10b981" />,
    };
    return icons[id] || <Sparkles size={20} color="#38bdf8" />;
  };

  const getActionColor = (id) => {
    const colors = {
      reports: 'rgba(167,139,250,0.18)',
      datasets: 'rgba(56,189,248,0.18)',
      publications: 'rgba(96,165,250,0.18)',
      media: 'rgba(244,114,182,0.18)',
      activities: 'rgba(52,211,153,0.18)',
      studio: 'rgba(251,146,60,0.18)',
      // Backwards compatibility
      map: 'rgba(30,110,245,0.14)',
      data: 'rgba(14,165,233,0.14)',
      papers: 'rgba(139,92,246,0.14)',
      ai: 'rgba(16,185,129,0.14)',
      replay: 'rgba(16,185,129,0.14)',
    };
    return colors[id] || 'rgba(56,189,248,0.18)';
  };

  // ── About / feature data ──────────────────────────────────────────────────
  const features = [
    {
      icon: <Database size={24} color="#1e6ef5" />,
      iconBg: '#eff6ff',
      title: 'Unified Dataset Catalog',
      body: '700+ verified polar datasets spanning atmospheric physics, glaciology, geomagnetism, oceanography, and biology — all discoverable through a single semantic search engine with ISO 19115-compliant metadata.'
    },
    {
      icon: <Satellite size={24} color="#8b5cf6" />,
      iconBg: '#f5f3ff',
      title: 'Live AWS Telemetry',
      body: 'Real-time sensor feeds from Automated Weather Stations at Maitri, Bharati, Himadri, and Himansh. Temperature, wind, pressure, humidity, and albedo streamed and visualised in-browser with interactive charts.'
    },
    {
      icon: <Sparkles size={24} color="#0ea5e9" />,
      iconBg: '#e0f2fe',
      title: 'Ask Polar AI',
      body: 'Evidence-grounded RAG (Retrieval-Augmented Generation) system trained on NCPOR publications, expedition reports, and DSpace archives. Every answer is anchored to exact source paragraphs — zero hallucination.'
    },
    {
      icon: <Globe size={24} color="#10b981" />,
      iconBg: '#ecfdf5',
      title: 'Interactive Polar Map',
      body: 'Dual-polar stereographic projections (EPSG:3031 Antarctic / EPSG:3413 Arctic) connecting station geography directly to expedition routes, research vessels, historical telemetry, and species observation layers.'
    },
    {
      icon: <BookOpen size={24} color="#f59e0b" />,
      iconBg: '#fffbeb',
      title: 'Multi-Tier Research Explainer',
      body: 'Any peer-reviewed paper instantly transformed into four audience-calibrated summaries — Researcher, College Student, School Curriculum, and General Public — each locked to verified source spans with citation trails.'
    },
    {
      icon: <Film size={24} color="#ef4444" />,
      iconBg: '#fef2f2',
      title: 'Media Vault',
      body: 'Curated library of 4K field photography, drone footage, and expedition videos with full EXIF geolocation metadata, Creative Commons licensing tags, and bulk download for press and educational use.'
    },
    {
      icon: <Share2 size={24} color="#f97316" />,
      iconBg: '#fff7ed',
      title: 'Outreach Studio',
      body: 'AI-assisted campaign generator that converts a single scientific report into PIB press releases, Twitter/X threads, Instagram carousels, and school explainers — all routed through a mandatory four-stage editorial review gate before publication.'
    },
    {
      icon: <Navigation size={24} color="#06b6d4" />,
      iconBg: '#ecfeff',
      title: 'Expedition Replay',
      body: 'Time-scrubbed playback of the 45th Indian Antarctic Expedition route — MV Vasiliy Golovnin\'s full voyage from Mormugao Port to the Southern Ocean — with waypoints, daily logs, and weather conditions at each position.'
    },
    {
      icon: <Shield size={24} color="#64748b" />,
      iconBg: '#f8fafc',
      title: 'Editorial Review Queue',
      body: 'Four-stage Kanban scientific governance gate (Draft → Scientist Review → Editor Check → Approved for Publish) ensuring every piece of public-facing content is fact-checked and citation-verified before dissemination.'
    },
  ];

  const poles = [
    {
      region: 'ANTARCTICA',
      badge: 'South Pole',
      badgeColor: '#0284c7',
      badgeBg: '#e0f2fe',
      stations: ['Maitri', 'Bharati'],
      desc: 'Schirmacher Oasis & Larsemann Hills — year-round atmospheric physics, geomagnetism, and sea-ice monitoring since 1989.',
      screen: 'explore',
    },
    {
      region: 'ARCTIC',
      badge: 'North Pole',
      badgeColor: '#059669',
      badgeBg: '#ecfdf5',
      stations: ['Himadri', 'IndARC'],
      desc: 'Ny-Ålesund, Svalbard — subsurface CTD mooring tracking warm Atlantic water intrusion and aerosol radiative forcing since 2008.',
      screen: 'explore',
    },
    {
      region: 'HIMALAYAS',
      badge: 'Third Pole',
      badgeColor: '#d97706',
      badgeBg: '#fffbeb',
      stations: ['Himansh'],
      desc: 'Chandra Basin, HP at 4,080 m — high-altitude glacier mass-balance, meltwater runoff, and cryospheric change monitoring since 2016.',
      screen: 'data',
    },
  ];

  return (
    <div style={{ width: '100%' }}>

      {/* ════════════════════════════════════════
          HERO — Full-Screen Polar Station Image
         ════════════════════════════════════════ */}
      <div className="hero-viewport-container" style={{
        width: '100%',
        minHeight: 'calc(100vh - 60px)',
        color: '#ffffff'
      }}>

        {/* Hero background — user's polar station photograph */}
        <img
          src="/hero-polar-station.jpg"
          alt="Indian Polar Research Station at Antarctic sunset with aurora"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            zIndex: 0
          }}
        />

        {/* Gradient overlay — gentle at top, strong at bottom for legibility */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(4,12,28,0.22) 0%, rgba(4,12,28,0.12) 30%, rgba(4,12,28,0.65) 60%, rgba(4,12,28,0.95) 100%)',
          zIndex: 1
        }} />

        {/* Hero Content — anchored to bottom-left */}
        <div className="hero-content-wrapper">

          {/* Upper Hero Split: Left Headline + Right Live Weather Widget */}
          <div className="hero-split-row">

            {/* Headline block — Ready to Explore Polar Science */}
            <div className="hero-headline-block">

              <h1 style={{
                fontSize: 'clamp(2.5rem, 4.4vw, 3.8rem)',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: '14px',
                textShadow: '0 2px 16px rgba(0,0,0,0.9), 0 4px 30px rgba(0,0,0,0.85)'
              }}>
                Ready to Explore<br />
                <span style={{
                  color: '#38bdf8',
                  textShadow: '0 2px 16px rgba(0,0,0,0.9), 0 4px 30px rgba(0,0,0,0.85)'
                }}>
                  Polar Science?
                </span>
              </h1>

              <p style={{
                fontSize: '1.04rem',
                color: '#cbd5e1',
                lineHeight: 1.62,
                marginBottom: '22px',
                maxWidth: '560px',
                textShadow: '0 1px 8px rgba(0,0,0,0.45)'
              }}>
                Dive into datasets, track live expeditions, and ask our AI anything about India's polar research.
              </p>

              {/* Search bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) onNavigate('ai');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'rgba(255,255,255,0.97)',
                  borderRadius: '12px',
                  padding: '6px 6px 6px 20px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
                  maxWidth: '540px',
                  width: '100%',
                  marginBottom: '16px'
                }}
              >
                <Search size={18} color="#64748b" style={{ marginRight: '10px', flexShrink: 0 }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search research, datasets, expeditions, stations..."
                  style={{
                    border: 'none',
                    outline: 'none',
                    flex: 1,
                    fontSize: '0.9rem',
                    color: '#0f172a',
                    background: 'transparent',
                    fontFamily: 'var(--font-body)'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: '#1e6ef5',
                    color: '#ffffff',
                    padding: '9px 20px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 14px rgba(30,110,245,0.45)'
                  }}
                >
                  Ask AI
                  <ArrowRight size={16} />
                </button>
              </form>

              {/* Quick Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => onNavigate('explore')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#ffffff',
                    color: '#0f172a',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.16s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
                  }}
                >
                  <Globe size={16} />
                  Explore Polar Map
                </button>

                <button
                  onClick={() => onNavigate('ai')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#1e6ef5',
                    color: '#ffffff',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    boxShadow: '0 4px 16px rgba(30,110,245,0.4)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.16s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.background = '#1656c7';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.background = '#1e6ef5';
                  }}
                >
                  <Sparkles size={16} />
                  Ask Polar AI
                </button>
              </div>

            </div>

            {/* Right Side: Live Weather at Indian Polar Stations Widget */}
            <div className="hero-weather-col">
              <PolarWeatherWidget onNavigate={onNavigate} />
            </div>

          </div>

          {/* Quick-action bento row */}
          <div className="hero-bento-grid">
            {quickActions.map((qa) => (
              <div
                key={qa.id}
                onClick={() => onNavigate(qa.screen)}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(14px)',
                  border: '1px solid rgba(255,255,255,0.11)',
                  borderRadius: '14px',
                  padding: '15px 13px',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.11)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  background: getActionColor(qa.id),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {getActionIcon(qa.id)}
                </div>
                <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '0.82rem', lineHeight: 1.25 }}>
                  {qa.title}
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.7rem', lineHeight: 1.4 }}>
                  {qa.desc}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ════════════════════════════════════════
          ABOUT SECTION
         ════════════════════════════════════════ */}
      <div style={{ background: '#f8fafc' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '80px 48px 96px' }}>

          {/* Section header */}
          <div style={{ maxWidth: '700px', marginBottom: '64px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '0.72rem', fontWeight: 800, color: '#1e6ef5',
              background: '#eff6ff', border: '1px solid #bfdbfe',
              padding: '5px 12px', borderRadius: '6px',
              letterSpacing: '0.06em', textTransform: 'uppercase',
              marginBottom: '18px'
            }}>
              <Zap size={12} />
              About Polaris
            </div>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
              fontWeight: 800,
              color: '#0f172a',
              lineHeight: 1.18,
              letterSpacing: '-0.025em',
              marginBottom: '16px'
            }}>
              India's Window to the Three Poles
            </h2>
            <p style={{
              fontSize: '1.05rem',
              color: '#475569',
              lineHeight: 1.7
            }}>
              <strong style={{ color: '#0f172a' }}>Polaris</strong> is an integrated science dissemination portal built for the
              National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences,
              Government of India. It bridges the gap between field research and public understanding —
              making decades of polar data discoverable, understandable, and shareable for scientists,
              students, journalists, and citizens alike.
            </p>
          </div>

          {/* Three Poles overview strip */}
          <div className="poles-overview-grid">
            {poles.map((pole) => (
              <div
                key={pole.region}
                onClick={() => onNavigate(pole.screen)}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '24px',
                  cursor: 'pointer',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.09)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span style={{
                    fontSize: '0.7rem', fontWeight: 800,
                    color: pole.badgeColor, background: pole.badgeBg,
                    padding: '3px 10px', borderRadius: '5px',
                    letterSpacing: '0.05em'
                  }}>
                    {pole.badge} · {pole.region}
                  </span>
                  <span className="pulse-live" />
                </div>
                <div style={{ display: 'flex', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
                  {pole.stations.map(s => (
                    <span key={s} style={{
                      fontSize: '0.8rem', fontWeight: 700,
                      color: '#0f172a', background: '#f1f5f9',
                      padding: '3px 10px', borderRadius: '6px'
                    }}>{s}</span>
                  ))}
                </div>
                <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.55, margin: '0 0 14px' }}>
                  {pole.desc}
                </p>
                <span style={{
                  fontSize: '0.78rem', color: '#1e6ef5', fontWeight: 700,
                  display: 'inline-flex', alignItems: 'center', gap: '4px'
                }}>
                  Explore on Map <ArrowRight size={13} />
                </span>
              </div>
            ))}
          </div>

          {/* Features grid */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{
              fontSize: '1.5rem', fontWeight: 800, color: '#0f172a',
              letterSpacing: '-0.02em', marginBottom: '6px'
            }}>
              Portal Capabilities
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '36px' }}>
              Everything you need to discover, understand, and share India's polar science.
            </p>
          </div>

          <div className="capabilities-grid">
            {features.map((f, i) => (
              <div
                key={i}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e8edf4',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 1px 4px rgba(15,23,42,0.04)',
                  transition: 'box-shadow 0.15s ease, transform 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,23,42,0.08)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 1px 4px rgba(15,23,42,0.04)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: '46px', height: '46px',
                  borderRadius: '12px',
                  background: f.iconBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  {f.icon}
                </div>
                <h4 style={{
                  fontSize: '0.96rem', fontWeight: 800,
                  color: '#0f172a', margin: '0 0 8px',
                  lineHeight: 1.25
                }}>
                  {f.title}
                </h4>
                <p style={{
                  fontSize: '0.8rem', color: '#64748b',
                  lineHeight: 1.65, margin: 0
                }}>
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
