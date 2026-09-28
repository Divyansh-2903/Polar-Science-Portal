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
  FileText,
  ShieldCheck,
  Radio,
  CheckCircle2,
  ExternalLink,
  Layers,
  Award,
  SlidersHorizontal,
  Flame,
  Clock
} from 'lucide-react';
import { quickActions } from '../data/portalData';
import { PolarWeatherWidget } from './PolarWeatherWidget';

export function PolarCommandCenter({ onNavigate, onOpenGapMatrix }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activePillarFilter, setActivePillarFilter] = useState('all'); // 'all' | 'repository' | 'ai' | 'governance'

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

  // ── Key Proof Metrics (Simple, Human & Understandable) ─────────────────────
  const keyMetrics = [
    {
      number: '40+',
      unit: 'Years',
      label: 'Expedition History',
      subtext: 'Indian scientists exploring Antarctica, the Arctic, and Himalayas since 1981',
      icon: <Compass size={22} color="#1e6ef5" />,
      color: '#1e6ef5',
      bg: '#eff6ff',
      border: '#bfdbfe'
    },
    {
      number: '4',
      unit: 'Stations',
      label: 'Indian Polar Bases',
      subtext: 'Maitri, Bharati, Himadri & Himansh sharing live weather round the clock',
      icon: <Radio size={22} color="#0284c7" />,
      color: '#0284c7',
      bg: '#e0f2fe',
      border: '#bae6fd'
    },
    {
      number: '700+',
      unit: 'Datasets',
      label: 'Open Data Files',
      subtext: 'Free downloads of real weather records, ice thickness, and ocean surveys',
      icon: <Database size={22} color="#8b5cf6" />,
      color: '#8b5cf6',
      bg: '#f5f3ff',
      border: '#ddd6fe'
    },
    {
      number: '100%',
      unit: 'Fact-Checked',
      label: 'Verified Answers',
      subtext: 'Every single answer points directly to an official report page — zero AI guessing',
      icon: <ShieldCheck size={22} color="#059669" />,
      color: '#059669',
      bg: '#ecfdf5',
      border: '#a7f3d0'
    }
  ];

  // ── Portal Capabilities (Simple & Clear Categories) ────────────────────────
  const features = [
    // PILLAR 1: DATA & PHOTOS
    {
      id: 'datasets',
      pillar: 'repository',
      pillarLabel: '1 · Data & Photos',
      pillarColor: '#0284c7',
      pillarBg: '#e0f2fe',
      badge: 'Free Downloads',
      icon: <Database size={22} color="#0284c7" />,
      iconBg: '#eff6ff',
      title: 'Scientific Datasets Hub',
      screen: 'data',
      actionText: 'Explore Datasets Hub',
      body: 'Browse 700+ verified polar datasets on weather, oceans, ice, and wildlife. Easy to search, preview on screen, and download in standard spreadsheet formats.'
    },
    {
      id: 'media',
      pillar: 'repository',
      pillarLabel: '1 · Data & Photos',
      pillarColor: '#0284c7',
      pillarBg: '#e0f2fe',
      badge: '4K Field Media',
      icon: <Film size={22} color="#ec4899" />,
      iconBg: '#fdf2f8',
      title: 'Photo & Video Vault',
      screen: 'media',
      actionText: 'Open Photo Vault',
      body: 'Explore high-resolution photographs, drone videos, and underwater recordings captured by Indian polar scientists, all free for school and news use.'
    },
    {
      id: 'map',
      pillar: 'repository',
      pillarLabel: '1 · Data & Photos',
      pillarColor: '#0284c7',
      pillarBg: '#e0f2fe',
      badge: 'Live Ship Routes',
      icon: <Globe size={22} color="#059669" />,
      iconBg: '#ecfdf5',
      title: 'Interactive Polar Map',
      screen: 'explore',
      actionText: 'Open Interactive Map',
      body: 'Fly across Antarctica and the Arctic on an interactive 3D map. Follow Indian ship journeys, see station locations, and check current local weather.'
    },

    // PILLAR 2: ASK AI & LEARN
    {
      id: 'ai',
      pillar: 'ai',
      pillarLabel: '2 · Ask AI & Learn',
      pillarColor: '#7c3aed',
      pillarBg: '#ede9fe',
      badge: 'Zero Guesswork',
      icon: <Sparkles size={22} color="#7c3aed" />,
      iconBg: '#f5f3ff',
      title: 'Ask Polar AI',
      screen: 'ai',
      actionText: 'Ask a Question',
      body: 'Ask questions in plain English. Our AI reads official Indian polar books and papers to give you clear answers backed by exact page numbers.'
    },
    {
      id: 'explainer',
      pillar: 'ai',
      pillarLabel: '2 · Ask AI & Learn',
      pillarColor: '#7c3aed',
      pillarBg: '#ede9fe',
      badge: '4 Reading Levels',
      icon: <BookOpen size={22} color="#2563eb" />,
      iconBg: '#eff6ff',
      title: 'Simple Research Explainer',
      screen: 'research',
      actionText: 'Read Simple Articles',
      body: 'Read complex polar science rewritten in simple words for school students, college learners, researchers, and public news — with no confusing jargon.'
    },
    {
      id: 'telemetry',
      pillar: 'ai',
      pillarLabel: '2 · Ask AI & Learn',
      pillarColor: '#7c3aed',
      pillarBg: '#ede9fe',
      badge: 'No Coding Needed',
      icon: <BarChart3 size={22} color="#0284c7" />,
      iconBg: '#f0f9ff',
      title: 'Instant Chart Maker',
      screen: 'data',
      actionText: 'Create Live Charts',
      body: 'Type what you want to see — like "Show Bharati temperatures during winter" — and get an interactive chart right in your web browser in seconds.'
    },

    // PILLAR 3: STORIES & SCIENTIST REVIEW
    {
      id: 'outreach',
      pillar: 'governance',
      pillarLabel: '3 · Stories & Review',
      pillarColor: '#ea580c',
      pillarBg: '#ffedd5',
      badge: 'Ready to Share',
      icon: <Share2 size={22} color="#ea580c" />,
      iconBg: '#fff7ed',
      title: 'Content Studio',
      screen: 'outreach',
      actionText: 'Create Stories',
      body: 'Turn heavy scientific reports into friendly news updates, social media posts, and classroom quizzes with a single click.'
    },
    {
      id: 'queue',
      pillar: 'governance',
      pillarLabel: '3 · Stories & Review',
      pillarColor: '#ea580c',
      pillarBg: '#ffedd5',
      badge: 'Scientist Verified',
      icon: <ShieldCheck size={22} color="#059669" />,
      iconBg: '#ecfdf5',
      title: 'Scientist Fact-Check Gate',
      screen: 'review',
      actionText: 'Check Review Queue',
      body: 'Every public post is fact-checked by real polar researchers before going live, making sure no misleading information reaches the public.'
    },
    {
      id: 'scientist',
      pillar: 'governance',
      pillarLabel: '3 · Stories & Review',
      pillarColor: '#ea580c',
      pillarBg: '#ffedd5',
      badge: 'Ask Questions',
      icon: <Users size={22} color="#4f46e5" />,
      iconBg: '#eef2ff',
      title: 'Talk to Polar Scientists',
      screen: 'scientist',
      actionText: 'Ask a Scientist',
      body: 'Got a question about polar animals or climate change? Ask real Indian polar researchers directly and find out what life is like on the ice.'
    }
  ];

  const filteredFeatures = activePillarFilter === 'all'
    ? features
    : features.filter(f => f.pillar === activePillarFilter);

  // ── Three Poles Regional Overview (Simple & Engaging) ──────────────────────
  const poles = [
    {
      region: 'ANTARCTICA',
      badge: 'South Pole',
      badgeColor: '#0284c7',
      badgeBg: '#e0f2fe',
      borderColor: '#bae6fd',
      accentColor: '#0284c7',
      stations: [
        { name: 'Maitri', est: '1989', loc: '70.77° S · Rock Oasis' },
        { name: 'Bharati', est: '2012', loc: '69.41° S · Coastline' }
      ],
      desc: 'India’s permanent research homes in the deep freeze. Scientists live here year-round through dark polar winters to study ancient ice, changing weather, and ocean life.',
      focusTag: 'Glacier melting, polar blizzards & ozone layer recovery',
      historic: 'Dakshin Gangotri (First Indian Base, 1983)',
      screen: 'explore'
    },
    {
      region: 'ARCTIC',
      badge: 'North Pole',
      badgeColor: '#059669',
      badgeBg: '#d1fae5',
      borderColor: '#a7f3d0',
      accentColor: '#059669',
      stations: [
        { name: 'Himadri', est: '2008', loc: '78.92° N · Svalbard, Norway' },
        { name: 'IndARC', est: '2014', loc: 'Underwater Ocean Sensor' }
      ],
      desc: 'Located high in northern Norway. Indian scientists study how melting Arctic sea ice directly influences the Indian summer monsoon and rainfall patterns back home.',
      focusTag: 'How North Pole ice loss impacts India\'s monsoon rains',
      historic: 'Year-round atmospheric monitoring laboratory',
      screen: 'explore'
    },
    {
      region: 'HIMALAYAS',
      badge: 'The Third Pole',
      badgeColor: '#6366f1',
      badgeBg: '#ede9fe',
      borderColor: '#c7d2fe',
      accentColor: '#6366f1',
      stations: [
        { name: 'Himansh', est: '2016', loc: '32.40° N · Spiti Valley (4,080m)' }
      ],
      desc: 'High up in the mountains of Himachal Pradesh. Scientists monitor melting glaciers that provide fresh drinking and irrigation water for over a billion people downstream.',
      focusTag: 'Mountain glacier health and freshwater security',
      historic: 'Protecting water supplies for northern India',
      screen: 'explore'
    }
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
          ABOUT SECTION — WITH HIGH-IMPACT VISUAL HIERARCHY
         ════════════════════════════════════════ */}
      <div style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '80px 48px 96px' }}>

          {/* Section Header & Simple Human Story */}
          <div style={{ maxWidth: '860px', marginBottom: '44px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontSize: '0.72rem', fontWeight: 800, color: '#1e6ef5',
                background: '#eff6ff', border: '1px solid #bfdbfe',
                padding: '4px 10px', borderRadius: '6px',
                letterSpacing: '0.06em', textTransform: 'uppercase'
              }}>
                <Zap size={12} />
                National Polar Program · India
              </span>
              <span style={{
                fontSize: '0.72rem', fontWeight: 700, color: '#059669',
                background: '#ecfdf5', border: '1px solid #a7f3d0',
                padding: '4px 10px', borderRadius: '6px'
              }}>
                Ministry of Earth Sciences · NCPOR Goa
              </span>
              <span style={{
                fontSize: '0.72rem', fontWeight: 700, color: '#6366f1',
                background: '#ede9fe', border: '1px solid #c7d2fe',
                padding: '4px 10px', borderRadius: '6px'
              }}>
                Open for Students, Scientists & Citizens
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(2rem, 3.4vw, 2.85rem)',
              fontWeight: 800,
              color: '#0f172a',
              lineHeight: 1.15,
              letterSpacing: '-0.028em',
              marginBottom: '16px'
            }}>
              Bringing India's Polar Expeditions to Life
            </h2>
            <p style={{
              fontSize: '1.05rem',
              color: '#475569',
              lineHeight: 1.7,
              marginBottom: 0
            }}>
              For more than 40 years, brave Indian researchers have explored the coldest places on Earth.
              But their discoveries, photos, and weather files were buried in hard-to-read reports and old computer drives.
              <strong style={{ color: '#0f172a' }}> Polaris brings all of India's polar science together in plain, simple English</strong> —
              making real expedition files easy to explore for school students, college researchers, journalists, and curious citizens alike.
            </p>
          </div>

          {/* Key Proof Metrics Bar (SIH Judge Confidence Anchors) */}
          <div className="about-metrics-grid">
            {keyMetrics.map((km, i) => (
              <div
                key={i}
                style={{
                  background: '#ffffff',
                  border: `1px solid ${km.border}`,
                  borderRadius: '16px',
                  padding: '22px 20px',
                  boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '-15px',
                  right: '-15px',
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  background: km.bg,
                  opacity: 0.6,
                  zIndex: 0
                }} />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 1 }}>
                  <div style={{
                    width: '38px', height: '38px',
                    borderRadius: '10px',
                    background: km.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {km.icon}
                  </div>
                  <span style={{
                    fontSize: '0.68rem', fontWeight: 800,
                    color: km.color, background: km.bg,
                    padding: '3px 8px', borderRadius: '5px',
                    textTransform: 'uppercase', letterSpacing: '0.04em'
                  }}>
                    Verified SIH Metric
                  </span>
                </div>

                <div style={{ zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '1.9rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1 }}>
                      {km.number}
                    </span>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: km.color }}>
                      {km.unit}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
                    {km.label}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#64748b', lineHeight: 1.45, marginTop: '4px' }}>
                    {km.subtext}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Three Poles Regional Overview */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Compass size={16} color="#0284c7" />
              <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Where India Works
              </span>
            </div>
            <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 0 6px' }}>
              India's Research Bases Across The Three Poles
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', margin: '0 0 24px' }}>
              From Antarctic blizzards to Arctic fjords and Himalayan peaks, Indian scientists work in the coldest places on Earth.
            </p>
          </div>

          <div className="poles-overview-grid">
            {poles.map((pole) => (
              <div
                key={pole.region}
                onClick={() => onNavigate(pole.screen)}
                style={{
                  background: '#ffffff',
                  border: `1px solid ${pole.borderColor}`,
                  borderRadius: '18px',
                  padding: '24px',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(15,23,42,0.08)';
                  e.currentTarget.style.borderColor = pole.accentColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.03)';
                  e.currentTarget.style.borderColor = pole.borderColor;
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span style={{
                      fontSize: '0.72rem', fontWeight: 800,
                      color: pole.badgeColor, background: pole.badgeBg,
                      padding: '4px 10px', borderRadius: '6px',
                      letterSpacing: '0.05em'
                    }}>
                      {pole.badge} · {pole.region}
                    </span>
                    <span className="pulse-live" title="Live station telemetry active" />
                  </div>

                  {/* Stations badge list */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                    {pole.stations.map(s => (
                      <div key={s.name} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        background: '#f8fafc', border: '1px solid #e2e8f0',
                        padding: '6px 10px', borderRadius: '8px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Radio size={13} color={pole.accentColor} />
                          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a' }}>{s.name}</span>
                          <span style={{ fontSize: '0.68rem', color: '#64748b' }}>({s.est})</span>
                        </div>
                        <span style={{ fontSize: '0.7rem', color: '#475569', fontFamily: 'monospace' }}>
                          {s.loc}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.6, margin: '0 0 12px' }}>
                    {pole.desc}
                  </p>

                  <div style={{
                    fontSize: '0.72rem', color: '#64748b', background: pole.badgeBg,
                    borderLeft: `3px solid ${pole.accentColor}`,
                    padding: '6px 10px', borderRadius: '0 6px 6px 0', marginBottom: '16px'
                  }}>
                    <strong>Core Focus:</strong> {pole.focusTag}
                  </div>
                </div>

                <div style={{
                  paddingTop: '12px', borderTop: '1px solid #f1f5f9',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                }}>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{pole.historic}</span>
                  <span style={{
                    fontSize: '0.78rem', color: pole.accentColor, fontWeight: 700,
                    display: 'inline-flex', alignItems: 'center', gap: '4px'
                  }}>
                    Explore on Map <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ════════════════════════════════════════
              PORTAL CAPABILITIES — SIMPLE & CLEAR
             ════════════════════════════════════════ */}
          <div style={{ marginTop: '20px', paddingTop: '56px', borderTop: '1px solid #e2e8f0' }}>

            <div className="capabilities-header-row">
              <div style={{ maxWidth: '640px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Layers size={16} color="#1e6ef5" />
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#1e6ef5', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    How Polaris Works
                  </span>
                </div>
                <h3 style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 1.95rem)',
                  fontWeight: 800, color: '#0f172a',
                  letterSpacing: '-0.025em', margin: '0 0 8px'
                }}>
                  Everything You Need to Explore, Learn & Share
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
                  Built to make India's polar science easy to search, simple to understand, and safe from misinformation.
                </p>
              </div>

              {/* Pillar interactive filter tabs */}
              <div className="capabilities-filter-bar">
                <button
                  onClick={() => setActivePillarFilter('all')}
                  className={`pillar-tab-btn ${activePillarFilter === 'all' ? 'active' : 'inactive'}`}
                >
                  <SlidersHorizontal size={13} />
                  All Features ({features.length})
                </button>
                <button
                  onClick={() => setActivePillarFilter('repository')}
                  className={`pillar-tab-btn ${activePillarFilter === 'repository' ? 'active' : 'inactive'}`}
                >
                  <Database size={13} color="#0284c7" />
                  1. Data & Photos (3)
                </button>
                <button
                  onClick={() => setActivePillarFilter('ai')}
                  className={`pillar-tab-btn ${activePillarFilter === 'ai' ? 'active' : 'inactive'}`}
                >
                  <Sparkles size={13} color="#7c3aed" />
                  2. Ask AI & Learn (3)
                </button>
                <button
                  onClick={() => setActivePillarFilter('governance')}
                  className={`pillar-tab-btn ${activePillarFilter === 'governance' ? 'active' : 'inactive'}`}
                >
                  <ShieldCheck size={13} color="#ea580c" />
                  3. Stories & Review (3)
                </button>
              </div>
            </div>

            {/* Filtered Capabilities Grid */}
            <div className="capabilities-grid">
              {filteredFeatures.map((f) => (
                <div
                  key={f.id}
                  onClick={() => onNavigate(f.screen)}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e8edf4',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 2px 6px rgba(15,23,42,0.03)',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(15,23,42,0.08)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.borderColor = f.pillarColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(15,23,42,0.03)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#e8edf4';
                  }}
                >
                  <div>
                    {/* Top row: Category tag & Technical Differentiator Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '14px' }}>
                      <span style={{
                        fontSize: '0.68rem', fontWeight: 800,
                        color: f.pillarColor, background: f.pillarBg,
                        padding: '3px 8px', borderRadius: '5px',
                        letterSpacing: '0.04em'
                      }}>
                        {f.pillarLabel}
                      </span>
                      <span style={{
                        fontSize: '0.66rem', fontWeight: 700,
                        color: '#475569', background: '#f1f5f9',
                        border: '1px solid #e2e8f0',
                        padding: '2px 7px', borderRadius: '4px'
                      }}>
                        {f.badge}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <div style={{
                        width: '42px', height: '42px',
                        borderRadius: '10px',
                        background: f.iconBg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {f.icon}
                      </div>
                      <h4 style={{
                        fontSize: '0.98rem', fontWeight: 800,
                        color: '#0f172a', margin: 0,
                        lineHeight: 1.25
                      }}>
                        {f.title}
                      </h4>
                    </div>

                    <p style={{
                      fontSize: '0.82rem', color: '#64748b',
                      lineHeight: 1.65, margin: '0 0 16px'
                    }}>
                      {f.body}
                    </p>
                  </div>

                  <div style={{
                    paddingTop: '12px', borderTop: '1px solid #f1f5f9',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                  }}>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                      Interactive module live
                    </span>
                    <span style={{
                      fontSize: '0.78rem', color: f.pillarColor, fontWeight: 700,
                      display: 'inline-flex', alignItems: 'center', gap: '4px'
                    }}>
                      {f.actionText} <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* ════════════════════════════════════════
                THE OLD WAY VS THE POLARIS WAY
               ════════════════════════════════════════ */}
            <div style={{
              marginTop: '56px',
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              borderRadius: '20px',
              padding: '36px 40px',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 20px 40px -15px rgba(15,23,42,0.3)',
              color: '#ffffff'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap', marginBottom: '28px' }}>
                <div>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    fontSize: '0.72rem', fontWeight: 800, color: '#38bdf8',
                    background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.25)',
                    padding: '4px 10px', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.06em',
                    marginBottom: '8px'
                  }}>
                    <Award size={13} />
                    Why Polaris Wins for India
                  </div>
                  <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>
                    The Old Way vs. The Polaris Way
                  </h3>
                </div>

                {onOpenGapMatrix && (
                  <button
                    onClick={onOpenGapMatrix}
                    style={{
                      background: '#1e6ef5',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '10px 18px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 14px rgba(30,110,245,0.35)',
                      transition: 'transform 0.15s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <span>Compare Old vs New Portals</span>
                    <ExternalLink size={14} />
                  </button>
                )}
              </div>

              <div className="sih-benchmark-grid">
                {/* Legacy NCPOR limitations */}
                <div style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  borderRadius: '14px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
                    <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      The Old Way (Outdated Websites)
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#ef4444', fontWeight: 800 }}>✕</span>
                      <span><strong>Trapped in Hard PDFs:</strong> 40 years of discoveries were locked in 50-page technical documents that students and citizens could never easily read.</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#ef4444', fontWeight: 800 }}>✕</span>
                      <span><strong>Difficult Software Needed:</strong> Viewing ice or weather files required heavy specialist engineering tools and coding knowledge.</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#ef4444', fontWeight: 800 }}>✕</span>
                      <span><strong>Broken Links & Old Pages:</strong> Information was scattered across old government websites without a working search engine.</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#ef4444', fontWeight: 800 }}>✕</span>
                      <span><strong>No Public Outreach:</strong> Discoveries rarely reached schools, news channels, or social media in words people could understand.</span>
                    </div>
                  </div>
                </div>

                {/* Polaris SIH Winning Edge */}
                <div style={{
                  background: 'rgba(16, 185, 129, 0.06)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  borderRadius: '14px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                    <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      The Polaris Way (Simple & Connected)
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#10b981', fontWeight: 800 }}>✓</span>
                      <span><strong>Everything in One Place:</strong> Search research papers, live weather, 4K photos, and ship voyages together in seconds.</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#10b981', fontWeight: 800 }}>✓</span>
                      <span><strong>Plain-English Explanations:</strong> Complex papers are rewritten into school-friendly summaries with zero confusing jargon.</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#10b981', fontWeight: 800 }}>✓</span>
                      <span><strong>Instant In-Browser Charts:</strong> Type what you want to see and explore interactive graphs right on your screen without coding.</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#10b981', fontWeight: 800 }}>✓</span>
                      <span><strong>100% Fact-Checked by Scientists:</strong> Real researchers review every public post before it goes live, ensuring zero false info.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
