import React, { useState, useRef, useEffect } from 'react';
import { 
  Compass, 
  MapPin, 
  Sparkles, 
  BarChart3, 
  Navigation, 
  BookOpen, 
  Share2, 
  CheckCircle2, 
  Film, 
  Users,
  ShieldAlert,
  ChevronDown,
  Layers,
  Menu,
  X
} from 'lucide-react';

export function Header({ activeTab, setActiveTab, onOpenGapMatrix }) {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const moreRef = useRef(null);

  // Close dropdown and mobile menu when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event) {
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setIsMoreOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsMoreOpen(false);
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Primary navigation tabs
  const primaryLinks = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'explore', label: 'Map', icon: MapPin },
    { id: 'data', label: 'Data', icon: BarChart3 },
    { id: 'papers', label: 'Papers', icon: BookOpen },
    { id: 'media', label: 'Media', icon: Film },
  ];

  // Action tools & publishing modules accessible via sleek dropdown
  const secondaryLinks = [
    { 
      id: 'research', 
      label: 'Explainer', 
      desc: 'Read science in plain English (4 reading levels)', 
      icon: Sparkles 
    },
    { 
      id: 'outreach', 
      label: 'Content Studio', 
      desc: 'Create easy news stories & social media posts', 
      icon: Share2 
    },
    { 
      id: 'review', 
      label: 'Approvals', 
      desc: 'Scientist review & fact-checking gate', 
      icon: CheckCircle2,
      badge: '4 Active'
    },
    { 
      id: 'expeditions', 
      label: 'Voyages', 
      desc: 'Track expedition ships from India to Antarctica', 
      icon: Navigation 
    },
    { 
      id: 'ai', 
      label: 'Ask AI', 
      desc: 'Ask questions and get answers from official reports', 
      icon: Sparkles 
    },
    { 
      id: 'scientist', 
      label: 'Q&A', 
      desc: 'Ask questions directly to real polar researchers', 
      icon: Users 
    },
    { 
      id: 'anomalies', 
      label: 'Alerts', 
      desc: 'Live blizzard alerts & polar storm warnings', 
      icon: ShieldAlert 
    },
  ];

  const isSecondaryActive = secondaryLinks.some(link => link.id === activeTab);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(226, 232, 240, 0.85)',
      boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)'
    }}>
      <div className="header-inner">
        
        {/* Clean Modern Brand Lockup */}
        <div 
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '11px',
            cursor: 'pointer',
            userSelect: 'none',
            flexShrink: 0
          }}
        >
          <img 
            src="/polaris-logo.png" 
            alt="Polaris Logo" 
            style={{
              width: '38px',
              height: '38px',
              objectFit: 'contain',
              borderRadius: '50%',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.15)',
              border: '1px solid rgba(30, 110, 245, 0.2)'
            }}
          />

          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.45rem',
            fontWeight: 800,
            color: '#09121f',
            letterSpacing: '-0.035em',
            lineHeight: 1
          }}>
            Polaris
          </span>
        </div>

        {/* Clean Curated Navigation Bar */}
        <nav className="header-desktop-nav">
          {primaryLinks.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  background: isActive ? '#ffffff' : 'transparent',
                  border: isActive ? '1px solid #e2e8f0' : '1px solid transparent',
                  borderRadius: '7px',
                  padding: '5px 13px',
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#1e6ef5' : '#475569',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 1px 3px rgba(15, 23, 42, 0.07)' : 'none',
                  transition: 'all 0.13s ease'
                }}
              >
                <Icon size={14} color={isActive ? '#1e6ef5' : '#64748b'} />
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* More Modules Dropdown */}
          <div ref={moreRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setIsMoreOpen(prev => !prev)}
              aria-expanded={isMoreOpen}
              style={{
                background: isSecondaryActive ? '#ffffff' : isMoreOpen ? '#ffffff' : 'transparent',
                border: isSecondaryActive ? '1px solid #e2e8f0' : '1px solid transparent',
                borderRadius: '7px',
                padding: '5px 11px',
                fontSize: '0.8rem',
                fontWeight: isSecondaryActive ? 700 : 500,
                color: isSecondaryActive ? '#1e6ef5' : '#475569',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                whiteSpace: 'nowrap',
                boxShadow: isSecondaryActive ? '0 1px 3px rgba(15, 23, 42, 0.07)' : 'none',
                transition: 'all 0.13s ease'
              }}
            >
              <Layers size={14} color={isSecondaryActive ? '#1e6ef5' : '#64748b'} />
              <span>Tools</span>
              <ChevronDown 
                size={13} 
                style={{ 
                  transform: isMoreOpen ? 'rotate(180deg)' : 'none', 
                  transition: 'transform 0.15s ease' 
                }} 
              />
            </button>

            {/* Dropdown Menu */}
            {isMoreOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '300px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '8px',
                boxShadow: '0 12px 32px rgba(15, 23, 42, 0.12), 0 2px 6px rgba(15, 23, 42, 0.06)',
                zIndex: 1100,
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                animation: 'fadeIn 0.15s ease'
              }}>
                <div style={{ 
                  padding: '6px 10px 4px', 
                  fontSize: '0.7rem', 
                  fontWeight: 700, 
                  color: '#94a3b8', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em' 
                }}>
                  Tools & Publishing
                </div>

                {secondaryLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMoreOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        padding: '10px',
                        borderRadius: '10px',
                        background: isActive ? '#eff6ff' : 'transparent',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.background = '#f8fafc';
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <div style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '8px',
                        background: isActive ? '#1e6ef5' : '#f1f5f9',
                        color: isActive ? '#ffffff' : '#1e6ef5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}>
                        <Icon size={16} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between',
                          fontSize: '0.84rem', 
                          fontWeight: 700, 
                          color: isActive ? '#1e6ef5' : '#0f172a' 
                        }}>
                          <span>{item.label}</span>
                          {item.badge && (
                            <span style={{
                              fontSize: '0.66rem',
                              fontWeight: 700,
                              color: '#059669',
                              background: '#ecfdf5',
                              padding: '2px 6px',
                              borderRadius: '99px',
                              border: '1px solid #d1fae5'
                            }}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px', lineHeight: 1.3 }}>
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div style={{ height: '1px', background: '#f1f5f9', margin: '4px 0' }} />

                {/* Quick Link to SIH Benchmark Matrix */}
                <div
                  onClick={() => {
                    setIsMoreOpen(false);
                    onOpenGapMatrix();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    background: '#f8fafc',
                    cursor: 'pointer',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: '#334155'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#f1f5f9'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#f8fafc'; }}
                >
                  <ShieldAlert size={15} color="#1e6ef5" />
                  <span>View SIH Evaluation Matrix</span>
                </div>

              </div>
            )}
          </div>
        </nav>

        {/* Mobile Navigation Toggle Button */}
        <button
          className="header-mobile-toggle"
          onClick={() => setIsMobileMenuOpen(prev => !prev)}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

      </div>

      {/* Responsive Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="header-mobile-drawer">
          <div>
            <div style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              color: '#94a3b8',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '8px',
              paddingLeft: '4px'
            }}>
              Primary Sections
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {primaryLinks.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="header-mobile-link"
                    style={{
                      background: isActive ? '#eff6ff' : '#f8fafc',
                      border: isActive ? '1px solid #bfdbfe' : '1px solid #e2e8f0',
                      color: isActive ? '#1e6ef5' : '#0f172a',
                      width: '100%',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: isActive ? '#1e6ef5' : '#e2e8f0',
                      color: isActive ? '#ffffff' : '#64748b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={16} />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ height: '1px', background: '#e2e8f0', margin: '4px 0' }} />

          <div>
            <div style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              color: '#94a3b8',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '8px',
              paddingLeft: '4px'
            }}>
              Tools & Capabilities
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {secondaryLinks.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      background: isActive ? '#eff6ff' : '#f8fafc',
                      border: isActive ? '1px solid #bfdbfe' : '1px solid #e2e8f0',
                      cursor: 'pointer',
                      minHeight: '44px'
                    }}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: isActive ? '#1e6ef5' : '#f1f5f9',
                      color: isActive ? '#ffffff' : '#1e6ef5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      <Icon size={16} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.86rem',
                        fontWeight: 700,
                        color: isActive ? '#1e6ef5' : '#0f172a'
                      }}>
                        <span>{item.label}</span>
                        {item.badge && (
                          <span style={{
                            fontSize: '0.66rem',
                            fontWeight: 700,
                            color: '#059669',
                            background: '#ecfdf5',
                            padding: '2px 6px',
                            borderRadius: '99px',
                            border: '1px solid #d1fae5'
                          }}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '2px', lineHeight: 1.3 }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ height: '1px', background: '#e2e8f0', margin: '4px 0' }} />

          {/* Quick Link to SIH Benchmark Matrix */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenGapMatrix();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 14px',
              borderRadius: '10px',
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              color: '#1e6ef5',
              cursor: 'pointer',
              fontSize: '0.84rem',
              fontWeight: 700,
              minHeight: '44px',
              width: '100%'
            }}
          >
            <ShieldAlert size={16} />
            <span>View SIH Evaluation Matrix</span>
          </button>
        </div>
      )}
    </header>
  );
}
