import React, { useState } from 'react';
import { OutreachStudio } from './OutreachStudio';
import { OutreachStudioView } from './OutreachStudioView';
import { 
  Sparkles, 
  Share2, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  BookOpen, 
  Layers
} from 'lucide-react';

export function OutreachHub({ initialReportId, onSendToQueue, onNavigate }) {
  const [activeOutreachTab, setActiveOutreachTab] = useState('grounded_studio'); // 'grounded_studio' | 'social_cards'

  return (
    <div style={{ width: '100%', maxWidth: 1600, margin: '0 auto', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Top Banner */}
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
            background: '#ecfdf5',
            color: '#059669',
            padding: '3px 10px',
            borderRadius: '99px',
            fontSize: '0.74rem',
            fontWeight: 700,
            marginBottom: '8px'
          }}>
            <ShieldCheck size={13} />
            <span>100% Fact-Checked · Backed by Real Expedition Reports</span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
            Polar Content Studio
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0, maxWidth: 840, lineHeight: 1.55 }}>
            Turn heavy polar research reports into simple school lessons, easy news updates, and social media posts. Every statement points back to the exact report page, and real scientists review everything before it gets published.
          </p>
        </div>

        {/* View Toggle Tabs */}
        <div style={{
          display: 'flex',
          background: '#f1f5f9',
          padding: '4px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          gap: '4px'
        }}>
          <button
            onClick={() => setActiveOutreachTab('grounded_studio')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: activeOutreachTab === 'grounded_studio' ? 700 : 600,
              color: activeOutreachTab === 'grounded_studio' ? '#1e6ef5' : '#64748b',
              background: activeOutreachTab === 'grounded_studio' ? '#ffffff' : 'transparent',
              boxShadow: activeOutreachTab === 'grounded_studio' ? '0 1px 3px rgba(15, 23, 42, 0.08)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.16s ease'
            }}
          >
            <ShieldCheck size={15} />
            <span>Side-by-Side Source Inspector</span>
          </button>

          <button
            onClick={() => setActiveOutreachTab('social_cards')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: activeOutreachTab === 'social_cards' ? 700 : 600,
              color: activeOutreachTab === 'social_cards' ? '#1e6ef5' : '#64748b',
              background: activeOutreachTab === 'social_cards' ? '#ffffff' : 'transparent',
              boxShadow: activeOutreachTab === 'social_cards' ? '0 1px 3px rgba(15, 23, 42, 0.08)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.16s ease'
            }}
          >
            <Share2 size={15} />
            <span>Social & Campaign Generator</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div>
        {activeOutreachTab === 'grounded_studio' ? (
          <div style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)' }}>
            <OutreachStudio initialReportId={initialReportId} onSendToQueue={onSendToQueue} />
          </div>
        ) : (
          <div style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)' }}>
            <OutreachStudioView onNavigate={onNavigate} onSendToQueue={onSendToQueue} />
          </div>
        )}
      </div>

    </div>
  );
}
