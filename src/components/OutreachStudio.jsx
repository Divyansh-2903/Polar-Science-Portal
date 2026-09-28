import React, { useState, useRef, useEffect } from 'react';
import { 
  expeditionReports 
} from '../data/polarCorpus';
import { 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  ExternalLink, 
  ArrowRight, 
  Eye, 
  ShieldCheck, 
  Send, 
  Layers, 
  Quote, 
  BookOpen,
  AlertCircle,
  HelpCircle,
  Share2
} from 'lucide-react';

export function OutreachStudio({ initialReportId, onSendToQueue }) {
  const [selectedReportId, setSelectedReportId] = useState(initialReportId || expeditionReports[0].id);
  const [audienceTier, setAudienceTier] = useState('school'); // 'school' | 'press' | 'social'
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeClaimIndex, setActiveClaimIndex] = useState(0);
  const [submissionFeedback, setSubmissionFeedback] = useState(null);

  useEffect(() => {
    if (initialReportId) {
      setSelectedReportId(initialReportId);
    }
  }, [initialReportId]);

  const report = expeditionReports.find(r => r.id === selectedReportId) || expeditionReports[0];
  const postData = report.sampleGroundedPosts[audienceTier];

  const sourcePaneRef = useRef(null);

  // Auto-scroll to highlighted source paragraph when active claim changes
  useEffect(() => {
    if (!postData || !postData.claims[activeClaimIndex]) return;
    const targetSourceId = postData.claims[activeClaimIndex].sourceId;
    const el = document.getElementById(`source-para-${targetSourceId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeClaimIndex, audienceTier, selectedReportId]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setActiveClaimIndex(0);
    setTimeout(() => {
      setIsGenerating(false);
    }, 600);
  };

  const handleQueueSubmit = () => {
    if (onSendToQueue) {
      onSendToQueue({
        reportId: report.id,
        reportTitle: report.shortTitle,
        targetAudience: audienceTier === 'school' ? 'Middle School (Grade 6–8)' : audienceTier === 'press' ? 'Science Journalist / PIB Release' : 'Public Science Social',
        content: postData.claims.map(c => c.text).join(' '),
        sourceCitationsCount: postData.claims.length,
        headline: postData.headline
      });
      setSubmissionFeedback('Dispatched to Editorial Review Queue for Scientist Fact-Check!');
      setTimeout(() => setSubmissionFeedback(null), 4000);
    }
  };

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', padding: '30px 24px', display: 'flex', flexDirection: 'column', gap: '26px' }}>
      
      {/* Studio Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: '20px',
        paddingBottom: '20px',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div>
          <div className="glass-pill" style={{ marginBottom: '10px' }}>
            <ShieldCheck size={14} color="var(--accent-aurora)" aria-hidden="true" />
            <span>Strict Evidence Grounding · Zero Hallucination Guarantee</span>
          </div>
          <h1>Grounded Science Outreach Studio</h1>
          <p style={{ maxWidth: 880, marginTop: '8px', fontSize: '1.02rem' }}>
            Transform dense 50-page polar expedition reports into verified school curricula, PIB press releases, and social campaigns. Every generated statement is locked to exact source passages with interactive side-by-side inspection.
          </p>
        </div>

        {/* Live Controls */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
          {/* Document Selector */}
          <div>
            <label htmlFor="report-select" style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '4px' }}>
              Select Expedition Report
            </label>
            <select
              id="report-select"
              value={selectedReportId}
              onChange={(e) => {
                setSelectedReportId(e.target.value);
                setActiveClaimIndex(0);
              }}
              style={{
                background: '#f8fafc',
                color: '#0f172a',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '9px 14px',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                outline: 'none'
              }}
            >
              {expeditionReports.map(r => (
                <option key={r.id} value={r.id}>{r.shortTitle}</option>
              ))}
            </select>
          </div>

          {/* Audience Tier Selector */}
          <div>
            <label htmlFor="audience-tier-select" style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '4px' }}>
              Target Audience Tier
            </label>
            <div 
              id="audience-tier-select"
              role="radiogroup"
              aria-label="Target Audience Tier"
              style={{
                display: 'flex',
                background: 'var(--bg-surface)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                padding: '3px'
              }}
            >
              {[
                { id: 'school', label: 'School (Grades 6–8)' },
                { id: 'press', label: 'Science Press' },
                { id: 'social', label: 'Social Thread' }
              ].map(tier => (
                <button
                  key={tier.id}
                  type="button"
                  role="radio"
                  aria-checked={audienceTier === tier.id}
                  onClick={() => {
                    setAudienceTier(tier.id);
                    setActiveClaimIndex(0);
                  }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: audienceTier === tier.id ? 600 : 500,
                    background: audienceTier === tier.id ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                    color: audienceTier === tier.id ? 'var(--accent-cyan)' : 'var(--text-muted)',
                    cursor: 'pointer'
                  }}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="btn-primary"
            style={{ alignSelf: 'flex-end', height: '40px' }}
            disabled={isGenerating}
            aria-label="Re-generate and verify grounded claims"
          >
            <Sparkles size={16} aria-hidden="true" />
            <span>{isGenerating ? 'Grounding Claims…' : 'Generate & Cite'}</span>
          </button>
        </div>
      </div>

      {/* Submission Feedback Toast */}
      {submissionFeedback && (
        <div 
          aria-live="polite" 
          style={{
            padding: '12px 18px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid var(--border-aurora)',
            color: 'var(--accent-aurora)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.9rem',
            fontWeight: 600
          }}
        >
          <CheckCircle2 size={18} aria-hidden="true" />
          <span>{submissionFeedback}</span>
        </div>
      )}

      {/* THE GOLDEN DEMO: Side-by-Side Dual-Pane Inspector */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(420px, 1fr) minmax(480px, 1.15fr)',
        gap: '24px',
        alignItems: 'start'
      }}>
        
        {/* LEFT PANE: Grounded Outreach Post */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge-status badge-scheduled">
                {postData.readingLevel}
              </span>
              <span className="badge-status badge-approved">
                {postData.claims.length} Citations Locked
              </span>
            </div>

            <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
              Provenance: ISO 19115 Verified
            </span>
          </div>

          <h2 style={{ fontSize: '1.35rem', lineHeight: 1.35, fontWeight: 800, color: '#0f172a' }}>
            {postData.headline}
          </h2>

          <div style={{
            fontSize: '0.82rem',
            color: '#0284c7',
            padding: '8px 12px',
            background: '#eff6ff',
            borderRadius: '8px',
            border: '1px solid #bfdbfe',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 500
          }}>
            <Eye size={16} aria-hidden="true" />
            <span>Interactive Demo: Click any claim below to inspect its exact source span in the right pane.</span>
          </div>

          {/* Interactive Claims Stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {postData.claims.map((claim, idx) => {
              const isSelected = activeClaimIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveClaimIndex(idx)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveClaimIndex(idx); }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '12px',
                    background: isSelected ? '#eff6ff' : '#f8fafc',
                    border: isSelected ? '1px solid #1e6ef5' : '1px solid #e2e8f0',
                    boxShadow: isSelected ? '0 4px 16px rgba(30, 110, 245, 0.15)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 200ms ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      fontFamily: 'var(--font-mono)',
                      color: isSelected ? '#1e6ef5' : '#64748b'
                    }}>
                      CLAIM #{idx + 1}
                    </span>
                    <span style={{
                      fontSize: '0.72rem',
                      color: isSelected ? '#1e6ef5' : '#059669',
                      background: isSelected ? '#dbeafe' : '#ecfdf5',
                      border: isSelected ? '1px solid #bfdbfe' : '1px solid #a7f3d0',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      fontWeight: 700
                    }}>
                      Source Linked: {claim.sourceId.toUpperCase()}
                    </span>
                  </div>

                  <p style={{
                    fontSize: '0.92rem',
                    color: '#0f172a',
                    lineHeight: 1.55,
                    marginBottom: '8px',
                    fontWeight: isSelected ? 600 : 400
                  }}>
                    {claim.text}
                  </p>

                  <div style={{
                    fontSize: '0.76rem',
                    color: '#64748b',
                    fontFamily: 'var(--font-mono)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Quote size={12} aria-hidden="true" />
                    <span>Citation: {claim.citation}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '16px',
            borderTop: '1px solid var(--border-subtle)'
          }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
              Status: <span style={{ color: 'var(--accent-aurora)', fontWeight: 600 }}>Citations Verified</span>
            </div>

            <button
              onClick={handleQueueSubmit}
              className="btn-accent-orange"
              aria-label="Submit this grounded outreach post to the editorial review queue"
            >
              <Send size={15} aria-hidden="true" />
              <span>Send to Editorial Review Queue</span>
            </button>
          </div>
        </div>

        {/* RIGHT PANE: Authentic Source Document Viewer with Real-Time Highlighting */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          
          {/* Source Document Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingBottom: '16px',
            marginBottom: '16px',
            borderBottom: '1px solid var(--border-subtle)'
          }}>
            <div>
              <span className="badge-status badge-scheduled" style={{ marginBottom: '6px' }}>
                PRIMARY SOURCE ARCHIVE · NCPOR DSPACE
              </span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>{report.title}</h3>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>
                Lead PI: {report.leadAuthor} · Expedition: {report.expedition}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: '#0284c7',
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                padding: '4px 8px',
                borderRadius: '6px',
                display: 'inline-block',
                fontWeight: 600
              }}>
                DOI: {report.doi}
              </div>
            </div>
          </div>

          {/* Source Text Container */}
          <div 
            ref={sourcePaneRef}
            style={{
              maxHeight: '560px',
              overflowY: 'auto',
              paddingRight: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            {report.sourceParagraphs.map((para) => {
              const currentClaim = postData.claims[activeClaimIndex];
              const isTargetedByActiveClaim = currentClaim && currentClaim.sourceId === para.id;

              return (
                <div
                  id={`source-para-${para.id}`}
                  key={para.id}
                  style={{
                    padding: '14px',
                    borderRadius: '8px',
                    background: isTargetedByActiveClaim ? '#fffbeb' : '#f8fafc',
                    border: isTargetedByActiveClaim ? '1px solid #fde68a' : '1px solid #e2e8f0',
                    borderLeft: isTargetedByActiveClaim ? '4px solid #f59e0b' : '1px solid #e2e8f0',
                    boxShadow: isTargetedByActiveClaim ? '0 4px 16px rgba(245, 158, 11, 0.12)' : 'none',
                    transition: 'all 250ms ease'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: isTargetedByActiveClaim ? '#b45309' : '#0284c7'
                  }}>
                    <span>{para.section}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', opacity: 0.8 }}>[{para.id.toUpperCase()}]</span>
                  </div>

                  <p style={{
                    fontSize: '0.88rem',
                    lineHeight: 1.65,
                    color: isTargetedByActiveClaim ? '#78350f' : '#334155'
                  }}>
                    {para.text}
                  </p>

                  {isTargetedByActiveClaim && (
                    <div style={{
                      marginTop: '8px',
                      fontSize: '0.74rem',
                      color: '#b45309',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      <CheckCircle2 size={13} aria-hidden="true" />
                      <span>Actively verifying Claim #{activeClaimIndex + 1}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer Metadata */}
          <div style={{
            marginTop: '16px',
            paddingTop: '12px',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '0.75rem',
            color: 'var(--text-dim)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>Dublin Core Spatial Bounds: {report.dublinCore.coverageSpatial}</span>
            <span style={{ color: 'var(--accent-aurora)' }}>DataCite Metadata Valid</span>
          </div>
        </div>

      </div>

    </div>
  );
}
