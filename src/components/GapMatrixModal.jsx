import React from 'react';
import { gapMatrix, theSixGaps } from '../data/gapMatrixData';
import { 
  ShieldAlert, 
  CheckCircle2, 
  X, 
  Sparkles, 
  ArrowRight,
  HelpCircle,
  FileCheck
} from 'lucide-react';

export function GapMatrixModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="gap-matrix-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(3, 7, 14, 0.88)',
        backdropFilter: 'blur(10px)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div 
        className="glass-panel"
        style={{
          maxWidth: '1080px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '32px',
          border: '1px solid var(--border-active)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(56, 189, 248, 0.2)'
        }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
          <div>
            <div className="glass-pill" style={{ marginBottom: '8px' }}>
              <ShieldAlert size={14} color="var(--accent-orange)" aria-hidden="true" />
              <span>SIH Pitch Defense · The Core Hackathon Differentiator</span>
            </div>
            <h2 id="gap-matrix-title" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>
              NCPOR Current Systems vs. Polaris Innovation Matrix
            </h2>
            <p style={{ maxWidth: 850, marginTop: '6px', fontSize: '0.9rem', color: '#475569' }}>
              Why this portal is essential: Addressing the 6 systemic gaps in current polar data infrastructure without duplicating existing archives.
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Comparison Modal"
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              background: '#f1f5f9',
              color: '#475569',
              fontSize: '1rem',
              cursor: 'pointer',
              border: '1px solid #e2e8f0'
            }}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* The Master Comparison Table */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '1.15rem', color: '#0284c7', fontWeight: 800, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} aria-hidden="true" />
            The Master Comparison Table (Core Evaluation Slide)
          </h3>

          <div style={{
            overflowX: 'auto',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            background: '#ffffff'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '14px 18px', color: '#0f172a', fontWeight: 700 }}>Capability</th>
                  <th style={{ padding: '14px 18px', color: '#64748b', fontWeight: 600 }}>Already Exists at NCPOR (NPDC)</th>
                  <th style={{ padding: '14px 18px', color: '#1e6ef5', fontWeight: 700 }}>What Polaris Adds (Our SIH Innovation)</th>
                </tr>
              </thead>
              <tbody>
                {gapMatrix.map((item, idx) => (
                  <tr 
                    key={item.id}
                    style={{ 
                      borderBottom: idx < gapMatrix.length - 1 ? '1px solid #f1f5f9' : 'none',
                      background: idx % 2 === 0 ? '#ffffff' : '#f8fafc'
                    }}
                  >
                    <td style={{ padding: '14px 18px', fontWeight: 700, color: '#0f172a', verticalAlign: 'top' }}>
                      {item.category}
                    </td>
                    <td style={{ padding: '14px 18px', color: '#64748b', verticalAlign: 'top', lineHeight: 1.5 }}>
                      {item.ncporCurrent}
                    </td>
                    <td style={{ padding: '14px 18px', color: '#0f172a', verticalAlign: 'top', lineHeight: 1.5 }}>
                      <strong style={{ color: '#0284c7' }}>{item.polarisInnovation}</strong>
                      <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>
                        {item.impact}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* The 6 Critical Gaps Breakdown */}
        <div>
          <h3 style={{ fontSize: '1.15rem', color: '#059669', fontWeight: 800, marginBottom: '14px' }}>
            The 6 Research & Systems Gaps We Solve
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '14px'
          }}>
            {theSixGaps.map((gap) => (
              <div
                key={gap.letter}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: '#eff6ff',
                    color: '#1e6ef5',
                    border: '1px solid #bfdbfe',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    {gap.letter}
                  </span>
                  <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.92rem' }}>
                    {gap.title}
                  </span>
                </div>

                <div style={{ fontSize: '0.82rem', color: '#475569', fontStyle: 'italic' }}>
                  "{gap.question}"
                </div>

                <div style={{ fontSize: '0.8rem', color: '#059669', marginTop: '4px' }}>
                  <strong>Solution:</strong> {gap.solution}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <div style={{ marginTop: '26px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            className="btn-primary"
            style={{ padding: '10px 24px' }}
          >
            Return to Portal
          </button>
        </div>
      </div>
    </div>
  );
}
