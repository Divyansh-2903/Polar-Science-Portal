import React, { useState } from 'react';
import { Header } from './components/Header';
import { PolarCommandCenter } from './components/PolarCommandCenter';
import { PolarExplorerMap } from './components/PolarExplorerMap';
import { DatasetsHub } from './components/DatasetsHub';
import { AskPolarAI } from './components/AskPolarAI';
import { ExpeditionReplay } from './components/ExpeditionReplay';
import { ExplainResearch } from './components/ExplainResearch';
import { OutreachHub } from './components/OutreachHub';
import { EditorialQueue } from './components/EditorialQueue';
import { MediaVault } from './components/MediaVault';
import { AskScientist } from './components/AskScientist';
import { AnomalyAlerts } from './components/AnomalyAlerts';
import { KnowledgeRepository } from './components/KnowledgeRepository';
import { GapMatrixModal } from './components/GapMatrixModal';
import { initialEditorialQueue } from './data/polarCorpus';
import { 
  Compass, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck,
  Sparkles,
  Database,
  ArrowUp
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'explore' | 'data' | 'papers' | 'ai' | 'expeditions' | 'research' | 'outreach' | 'review' | 'media' | 'scientist' | 'anomalies'
  const [isGapMatrixOpen, setIsGapMatrixOpen] = useState(false);
  const [editorialQueue, setEditorialQueue] = useState(initialEditorialQueue);
  const [preselectedReportId, setPreselectedReportId] = useState(null);
  const [preselectedDatasetId, setPreselectedDatasetId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Centralized navigation handler
  const handleNavigate = (target, metadata = {}) => {
    let tabKey = target;
    if (target === 'map') tabKey = 'explore';
    else if (target === 'data' || target === 'charts') tabKey = 'data';
    else if (target === 'papers' || target === 'repository') tabKey = 'papers';
    else if (target === 'ai') tabKey = 'ai';
    else if (target === 'replay' || target === 'voyages' || target === 'expeditions') tabKey = 'expeditions';
    else if (target === 'explain' || target === 'explainer' || target === 'research') tabKey = 'research';
    else if (target === 'studio' || target === 'outreach' || target === 'drafts') tabKey = 'outreach';
    else if (target === 'insight' || target === 'anomalies' || target === 'alerts') tabKey = 'anomalies';
    else if (target === 'home' || target === 'overview') tabKey = 'home';
    else if (target === 'review' || target === 'approvals' || target === 'editorial_queue') tabKey = 'review';
    else if (target === 'media') tabKey = 'media';
    else if (target === 'scientist' || target === 'qa') tabKey = 'scientist';

    if (metadata.datasetId) setPreselectedDatasetId(metadata.datasetId);
    if (metadata.reportId) setPreselectedReportId(metadata.reportId);

    setActiveTab(tabKey);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add new item generated in Outreach Studio to the Editorial Review Queue
  const handleSendToQueue = (newItem) => {
    const queueItem = {
      id: `post-ed-${Date.now()}`,
      reportId: newItem.reportId || 'rep-sea-ice-2024',
      reportTitle: newItem.reportTitle || 'Polar Science Monograph',
      targetAudience: newItem.targetAudience || 'Public Science Outreach',
      status: 'in_review',
      assignedReviewer: 'Dr. Rahul Sharma (Scientist-F, Cryosphere)',
      content: newItem.content,
      sourceCitationsCount: newItem.sourceCitationsCount || 3,
      reviewerNotes: 'Pending secondary sign-off against DSpace raw archive.',
      targetPublishDate: '2026-11-20 (National Polar Campaign)',
      channels: ['MoES Science Portal', 'PIB Science Wire', 'School Outreach']
    };

    setEditorialQueue([queueItem, ...editorialQueue]);
    setToastMessage({
      title: 'Item Dispatched to Editorial Review Queue',
      desc: 'Transferred to "In Scientist Review" state with citation locks intact.',
      action: () => setActiveTab('review')
    });

    setTimeout(() => {
      setToastMessage(null);
    }, 6000);
  };

  const handleUpdateQueueStatus = (itemId, newStatus) => {
    setEditorialQueue(prev => prev.map(item => item.id === itemId ? { ...item, status: newStatus } : item));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      
      {/* Accessible Skip Link */}
      <a 
        href="#main-content" 
        style={{
          position: 'absolute',
          top: '-100px',
          left: '20px',
          background: '#1e6ef5',
          color: '#ffffff',
          padding: '10px 16px',
          borderRadius: '4px',
          fontWeight: 700,
          zIndex: 2000,
          transition: 'top 200ms ease'
        }}
        onFocus={(e) => { e.currentTarget.style.top = '20px'; }}
        onBlur={(e) => { e.currentTarget.style.top = '-100px'; }}
      >
        Skip to main content
      </a>

      {/* Primary Portal Navigation Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={handleNavigate} 
        onOpenGapMatrix={() => setIsGapMatrixOpen(true)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div 
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 1500,
            background: 'rgba(15, 23, 42, 0.96)',
            border: '1px solid #10b981',
            boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
            borderRadius: '12px',
            padding: '16px 20px',
            maxWidth: '420px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            animation: 'fadeIn 0.25s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} color="#10b981" aria-hidden="true" />
            <strong style={{ color: '#ffffff', fontSize: '0.92rem' }}>{toastMessage.title}</strong>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#cbd5e1', margin: 0 }}>
            {toastMessage.desc}
          </p>
          {toastMessage.action && (
            <button
              onClick={toastMessage.action}
              style={{
                alignSelf: 'flex-start',
                color: '#38bdf8',
                fontSize: '0.78rem',
                fontWeight: 600,
                marginTop: '4px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>View Review Queue</span> →
            </button>
          )}
        </div>
      )}

      {/* Main Portal Viewport */}
      <main id="main-content" style={{ flex: 1 }}>
        
        {/* VIEW 1: HOME (Full-Screen Immersive Command Center) */}
        {activeTab === 'home' && (
          <div style={{ width: '100%', margin: 0, padding: 0 }}>
            <PolarCommandCenter onNavigate={handleNavigate} />
          </div>
        )}

        {/* VIEW 2: EXPLORE POLAR MAP (Circumpolar Stereographic Map, Tracks & Dossier) */}
        {activeTab === 'explore' && (
          <div className="main-wrapper" style={{ padding: '0 24px', margin: '28px auto 0' }}>
            <PolarExplorerMap onNavigate={handleNavigate} />
          </div>
        )}

        {/* VIEW 3: DATASETS & IN-BROWSER VISUALIZER (Data & Charts) */}
        {activeTab === 'data' && (
          <DatasetsHub preselectedDatasetId={preselectedDatasetId} />
        )}

        {/* VIEW 4: RESEARCH PAPERS & EXPEDITION REPORTS (Archive, Dublin Core & Action Handoffs) */}
        {activeTab === 'papers' && (
          <div className="main-wrapper" style={{ padding: '0 24px', margin: '28px auto 0' }}>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
                Research Papers & Expedition Reports
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                Explore official monographs, peer-reviewed publications, and expedition archives from 40+ years of Indian polar missions.
              </p>
            </div>
            <KnowledgeRepository 
              onExploreDataset={(id) => handleNavigate('data', { datasetId: id })} 
              onNavigate={handleNavigate}
            />
          </div>
        )}

        {/* VIEW 5: ASK POLAR AI (Evidence-Grounded RAG Search) */}
        {activeTab === 'ai' && (
          <div className="main-wrapper" style={{ padding: '0 24px', margin: '28px auto 0' }}>
            <AskPolarAI onNavigate={handleNavigate} />
          </div>
        )}

        {/* VIEW 6: EXPEDITION REPLAY (Ship Journey Tracker: 45th Indian Antarctic Expedition) */}
        {activeTab === 'expeditions' && (
          <div className="main-wrapper" style={{ padding: '0 24px', margin: '28px auto 0' }}>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
                Ship Journey Tracker: 45th Indian Antarctic Expedition
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                Follow MV Vasiliy Golovnin's voyage from Mormugao Port Goa to the Southern Ocean and Antarctic research bases.
              </p>
            </div>
            <ExpeditionReplay onNavigate={handleNavigate} />
          </div>
        )}

        {/* VIEW 7: RESEARCH EXPLAINER (Simplified Research at 4 Reading Levels) */}
        {activeTab === 'research' && (
          <div className="main-wrapper" style={{ padding: '0 24px', margin: '28px auto 0' }}>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
                Simplified Research Explainer
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                Read complex peer-reviewed glaciological and climate publications simplified for Researchers, College Students, School Curricula, and the Public.
              </p>
            </div>
            <ExplainResearch onNavigate={handleNavigate} preselectedReportId={preselectedReportId} />
          </div>
        )}

        {/* VIEW 8: POST & NEWS GENERATOR (Draft Posts with Citation Locks) */}
        {activeTab === 'outreach' && (
          <OutreachHub 
            initialReportId={preselectedReportId} 
            onSendToQueue={handleSendToQueue} 
            onNavigate={handleNavigate} 
          />
        )}

        {/* VIEW 9: SCIENTIST APPROVALS (Editorial Review Governance Queue) */}
        {activeTab === 'review' && (
          <div style={{ width: '100%', maxWidth: 1600, margin: '0 auto', padding: '24px 28px' }}>
            <EditorialQueue 
              queueItems={editorialQueue} 
              onUpdateQueueItem={handleUpdateQueueStatus} 
            />
          </div>
        )}

        {/* VIEW 10: MEDIA VAULT (Photos & Videos with EXIF Data) */}
        {activeTab === 'media' && (
          <div style={{ width: '100%', maxWidth: 1600, margin: '0 auto', padding: '24px 28px' }}>
            <MediaVault />
          </div>
        )}

        {/* VIEW 11: ASK A SCIENTIST (Citizen & Student Q&A) */}
        {activeTab === 'scientist' && (
          <div style={{ width: '100%', maxWidth: 1600, margin: '0 auto', padding: '24px 28px' }}>
            <AskScientist />
          </div>
        )}

        {/* VIEW 12: WEATHER & STATION ALERTS */}
        {activeTab === 'anomalies' && (
          <div className="main-wrapper" style={{ padding: '0 24px', margin: '28px auto 0' }}>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
                Weather & Station Alerts
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                Real-time automated detection of statistical outliers and extreme weather storms across Maitri, Bharati, Himadri, and IndARC.
              </p>
            </div>
            <AnomalyAlerts onNavigate={handleNavigate} />
          </div>
        )}

      </main>

      {/* SIH Pitch Defense Benchmark Modal */}
      <GapMatrixModal 
        isOpen={isGapMatrixOpen} 
        onClose={() => setIsGapMatrixOpen(false)} 
      />

      {/* ─── FOOTER ─── */}
      <footer style={{
        backgroundColor: '#0c1522',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        color: '#94a3b8'
      }}>
        {/* Main footer grid */}
        <div style={{
          maxWidth: 1360,
          margin: '0 auto',
          padding: '52px 40px 40px',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '48px',
        }}>
          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: 'linear-gradient(135deg, #1e6ef5 0%, #0284c7 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#ffffff', flexShrink: 0
              }}>
                <Compass size={18} />
              </div>
              <strong style={{
                color: '#ffffff',
                fontSize: '1.25rem',
                fontFamily: 'var(--font-heading)',
                letterSpacing: '-0.025em',
                fontWeight: 800
              }}>
                Polaris
              </strong>
            </div>
            <p style={{ fontSize: '0.82rem', lineHeight: 1.7, color: '#64748b', maxWidth: '300px', marginBottom: '18px' }}>
              India's integrated polar science dissemination portal — connecting research, datasets, expeditions, 
              and outreach across Antarctica, the Arctic, and the Himalayas.
            </p>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontSize: '0.72rem', color: '#10b981', fontWeight: 600
            }}>
              <span className="pulse-live" style={{ width: 6, height: 6 }} />
              All Systems Operational
            </div>
            <div style={{ marginTop: '12px', fontSize: '0.72rem', color: '#475569' }}>
              NCPOR / MoES · Government of India · SIH Problem SIH26063
            </div>
          </div>

          {/* Portal links */}
          <div>
            <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.82rem', marginBottom: '16px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Portal
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Station Map', tab: 'explore' },
                { label: 'Data & Charts', tab: 'data' },
                { label: 'Research Papers', tab: 'papers' },
                { label: 'Photos & Videos', tab: 'media' },
                { label: 'Simplified Explainer', tab: 'research' },
                { label: 'Draft Posts', tab: 'outreach' },
                { label: 'Scientist Approvals', tab: 'review' },
                { label: 'Ship Tracker', tab: 'expeditions' },
              ].map(link => (
                <li key={link.tab}>
                  <button
                    onClick={() => handleNavigate(link.tab)}
                    style={{
                      color: '#64748b', fontSize: '0.82rem', fontWeight: 500,
                      background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                      transition: 'color 0.13s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#e2e8f0'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b'; }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Stations */}
          <div>
            <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.82rem', marginBottom: '16px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Field Stations
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'Maitri', loc: 'Schirmacher Oasis, Antarctica', color: '#38bdf8' },
                { name: 'Bharati', loc: 'Larsemann Hills, Antarctica', color: '#38bdf8' },
                { name: 'Himadri', loc: 'Ny-Ålesund, Svalbard, Arctic', color: '#4ade80' },
                { name: 'Himansh', loc: 'Chandra Basin, Himalayas', color: '#fbbf24' },
              ].map(st => (
                <li key={st.name}>
                  <div style={{ color: st.color, fontSize: '0.8rem', fontWeight: 700 }}>{st.name}</div>
                  <div style={{ color: '#475569', fontSize: '0.74rem', marginTop: '2px' }}>{st.loc}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Standards */}
          <div>
            <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.82rem', marginBottom: '16px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Standards & Governance
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.78rem', color: '#64748b' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#1e6ef5', flexShrink: 0, marginTop: '1px' }}>→</span>
                ISO 19115 Geographic Metadata
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#1e6ef5', flexShrink: 0, marginTop: '1px' }}>→</span>
                DataCite DOI Persistent Identifiers
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#1e6ef5', flexShrink: 0, marginTop: '1px' }}>→</span>
                Dublin Core · 700+ Verified Datasets
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#1e6ef5', flexShrink: 0, marginTop: '1px' }}>→</span>
                4-Stage Editorial Review Queue
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#1e6ef5', flexShrink: 0, marginTop: '1px' }}>→</span>
                CC-BY 4.0 Open Access Licensing
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div style={{
          maxWidth: 1360,
          margin: '0 auto',
          padding: '18px 40px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <span style={{ fontSize: '0.76rem', color: '#334155' }}>
            © 2025–2026 National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences, Government of India.
          </span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <button
              onClick={() => setIsGapMatrixOpen(true)}
              style={{
                color: '#475569', fontSize: '0.74rem', fontWeight: 600,
                background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                transition: 'color 0.13s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#cbd5e1'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#475569'; }}
            >
              SIH Evaluation Matrix
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                color: '#475569', fontSize: '0.74rem', fontWeight: 600,
                background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                transition: 'color 0.13s ease',
                display: 'inline-flex', alignItems: 'center', gap: '4px'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#cbd5e1'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#475569'; }}
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
