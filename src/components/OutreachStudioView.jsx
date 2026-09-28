import React, { useState } from 'react';
import { 
  Share2, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Globe, 
  Edit3,
  ExternalLink
} from 'lucide-react';

export function OutreachStudioView({ onNavigate, onSendToQueue }) {
  const [contentType, setContentType] = useState('instagram'); // 'article' | 'instagram' | 'x' | 'youtube'
  const [isEditing, setIsEditing] = useState(false);
  const [selectedResearch, setSelectedResearch] = useState('Changes in Antarctic Sea Ice and its Impact on Global Climate');
  const [headline, setHeadline] = useState("India's Polar Research is Helping Us Understand Our Changing Planet");
  const [caption, setCaption] = useState("Scientists at NCPOR are studying Antarctic sea ice to uncover how atmospheric warming affects Indian climate. #PolarScience #Antarctica #NCPOR");
  const [statusMsg, setStatusMsg] = useState(null);

  const contentPresets = {
    article: {
      type: 'Website Article',
      headline: 'Cryospheric Teleconnections: How Antarctic Sea Ice Influences Indian Monsoons',
      caption: 'Over four decades of continuous monitoring at Maitri and Bharati stations confirm that fluctuations in Southern Ocean sea ice directly modulate sea surface temperatures across the equatorial Indian Ocean, impacting the summer monsoon dynamics.',
      image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80',
      length: '550 Words · Target: Science Portal Feature'
    },
    instagram: {
      type: 'Instagram Post',
      headline: "India's Polar Research is Helping Us Understand Our Changing Planet",
      caption: 'Scientists at NCPOR are studying Antarctic sea ice to uncover how atmospheric warming affects Indian climate. From ice coring to satellite tracking, India’s polar presence stands strong! 🇮🇳❄️ #PolarScience #Antarctica #NCPOR #MoES #ThreePoles',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      length: 'Carousel Visual + 45-Word Caption'
    },
    x: {
      type: 'X (Twitter) Thread',
      headline: '🧵 1/4 How does melting Antarctic ice affect rainfall in India?',
      caption: 'Researchers from @ncpogoa analyze 40 years of polar ice records showing a direct teleconnection with Indian monsoon stability. Every fraction of a degree matters in the Southern Ocean. #ClimateScience #Antarctica',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
      length: '240 chars per tweet · 4-tweet thread'
    },
    youtube: {
      type: 'YouTube Short / Reel Script',
      headline: '[Hook] Why are Indian scientists living in sub-zero Antarctica?',
      caption: '[0:00 - 0:05] B-roll of MV Vasiliy Golovnin breaking pack ice.\n[0:05 - 0:15] Voiceover: Inside Bharati station, Indian researchers are uncovering Earth’s climate secrets through 1,000-year-old ice cores!\n[0:15 - 0:30] Call to action: Explore our interactive polar portal.',
      image: 'https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&w=800&q=80',
      length: '30-second paced script · Video production ready'
    }
  };

  const handleSelectPreset = (key) => {
    setContentType(key);
    setHeadline(contentPresets[key].headline);
    setCaption(contentPresets[key].caption);
  };

  const handleApproveAndSchedule = () => {
    if (onSendToQueue) {
      onSendToQueue({
        reportId: 'rep-sea-ice-2024',
        reportTitle: selectedResearch,
        targetAudience: contentPresets[contentType].type,
        content: `${headline} — ${caption}`,
        sourceCitationsCount: 3,
        headline: headline
      });
    }
    setStatusMsg('Approved & dispatched to Editorial Review Queue!');
    setTimeout(() => setStatusMsg(null), 3500);
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Outreach Studio Card (Matches Reference Screen 7) */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '20px',
        padding: '24px 28px',
        boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        
        {/* Source Research Dropdown */}
        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
            Source Research Publication
          </label>
          <select 
            value={selectedResearch}
            onChange={(e) => setSelectedResearch(e.target.value)}
            style={{
              width: '100%',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '9px 12px',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#0f172a',
              background: '#f8fafc',
              outline: 'none'
            }}
          >
            <option>Changes in Antarctic Sea Ice and its Impact on Global Climate</option>
            <option>Cryospheric Mass Balance at Maitri & Bharati Stations (NCPOR Technical Report)</option>
            <option>IndARC Kongsfjorden Mooring Telemetry & Arctic Fjord Circulation</option>
          </select>
        </div>

        {/* Content Type Selector */}
        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
            Content Output Format
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleSelectPreset('article')}
              style={{
                background: contentType === 'article' ? '#1e6ef5' : '#f1f5f9',
                color: contentType === 'article' ? '#ffffff' : '#475569',
                border: `1px solid ${contentType === 'article' ? '#1e6ef5' : '#e2e8f0'}`,
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Website Article
            </button>

            <button
              onClick={() => handleSelectPreset('instagram')}
              style={{
                background: contentType === 'instagram' ? '#1e6ef5' : '#f1f5f9',
                color: contentType === 'instagram' ? '#ffffff' : '#475569',
                border: `1px solid ${contentType === 'instagram' ? '#1e6ef5' : '#e2e8f0'}`,
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Instagram Post
            </button>

            <button
              onClick={() => handleSelectPreset('x')}
              style={{
                background: contentType === 'x' ? '#1e6ef5' : '#f1f5f9',
                color: contentType === 'x' ? '#ffffff' : '#475569',
                border: `1px solid ${contentType === 'x' ? '#1e6ef5' : '#e2e8f0'}`,
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              X (Twitter) Thread
            </button>

            <button
              onClick={() => handleSelectPreset('youtube')}
              style={{
                background: contentType === 'youtube' ? '#1e6ef5' : '#f1f5f9',
                color: contentType === 'youtube' ? '#ffffff' : '#475569',
                border: `1px solid ${contentType === 'youtube' ? '#1e6ef5' : '#e2e8f0'}`,
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              YouTube Script
            </button>
          </div>
        </div>

        {/* Social Card Preview (Matches Reference Screen 7) */}
        <div style={{
          border: '1px solid #e2e8f0',
          borderRadius: '14px',
          padding: '16px',
          background: '#f8fafc'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.74rem',
            fontWeight: 700,
            color: '#64748b',
            marginBottom: '10px'
          }}>
            <span>Generated Content Preview · {contentPresets[contentType].type}</span>
            <span 
              onClick={() => setIsEditing(!isEditing)}
              style={{ color: '#1e6ef5', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <Edit3 size={12} />
              <span>{isEditing ? 'Done Editing' : 'Edit Copy'}</span>
            </span>
          </div>

          <div style={{
            height: '140px',
            borderRadius: '8px',
            overflow: 'hidden',
            marginBottom: '12px',
            background: '#e2e8f0'
          }}>
            <img 
              src={contentPresets[contentType].image} 
              alt="Post preview" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>

          {isEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  outline: 'none'
                }}
              />
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={3}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.8rem',
                  outline: 'none',
                  resize: 'none'
                }}
              />
            </div>
          ) : (
            <>
              <strong style={{ fontSize: '0.94rem', fontWeight: 800, color: '#0f172a', display: 'block', marginBottom: '6px', lineHeight: 1.35 }}>
                {headline}
              </strong>
              <p style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '16px', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                {caption}
              </p>
            </>
          )}

          {statusMsg && (
            <div style={{
              padding: '8px 12px',
              borderRadius: '6px',
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              color: '#059669',
              fontSize: '0.78rem',
              fontWeight: 600,
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <CheckCircle2 size={14} />
              <span>{statusMsg}</span>
            </div>
          )}

          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={handleApproveAndSchedule}
              style={{
                flex: 1,
                background: '#1e6ef5',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 16px',
                fontSize: '0.84rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 2px 8px rgba(30, 110, 245, 0.3)'
              }}
            >
              <CheckCircle2 size={16} />
              <span>Approve & Schedule</span>
            </button>

            {onNavigate && (
              <button
                onClick={() => onNavigate('studio_full')}
                style={{
                  background: '#ffffff',
                  color: '#1e6ef5',
                  border: '1px solid #bfdbfe',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                title="Open Side-by-Side Source Citation Inspector"
              >
                <span>Full Studio</span>
                <ExternalLink size={13} />
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
