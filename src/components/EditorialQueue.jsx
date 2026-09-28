import React, { useState } from 'react';
import { 
  initialEditorialQueue 
} from '../data/polarCorpus';
import { 
  CheckCircle2, 
  Clock, 
  Send, 
  Calendar, 
  FileCheck, 
  UserCheck, 
  AlertCircle, 
  Share2, 
  Layers, 
  Filter, 
  ShieldCheck,
  ChevronRight,
  MessageSquare
} from 'lucide-react';

export function EditorialQueue({ queueItems, onUpdateQueueItem }) {
  const [activeItems, setActiveItems] = useState(queueItems || initialEditorialQueue);
  const [selectedItemForReview, setSelectedItemForReview] = useState(null);
  const [reviewerNoteInput, setReviewerNoteInput] = useState('');

  const columns = [
    { id: 'draft', title: 'AI Drafts (Pending)', icon: Clock, badgeClass: 'badge-draft' },
    { id: 'in_review', title: 'In Scientist Review', icon: UserCheck, badgeClass: 'badge-review' },
    { id: 'approved', title: 'Fact-Checked & Approved', icon: CheckCircle2, badgeClass: 'badge-approved' },
    { id: 'scheduled', title: 'Scheduled on Calendar', icon: Calendar, badgeClass: 'badge-scheduled' }
  ];

  const handleAdvanceStatus = (item) => {
    let nextStatus = 'in_review';
    if (item.status === 'draft') nextStatus = 'in_review';
    else if (item.status === 'in_review') nextStatus = 'approved';
    else if (item.status === 'approved') nextStatus = 'scheduled';
    else return;

    const updated = activeItems.map(it => it.id === item.id ? { ...it, status: nextStatus } : it);
    setActiveItems(updated);
    if (onUpdateQueueItem) onUpdateQueueItem(item.id, nextStatus);
  };

  const handleSaveReviewerNote = (itemId) => {
    if (!reviewerNoteInput.trim()) return;
    const updated = activeItems.map(it => it.id === itemId ? { ...it, reviewerNotes: reviewerNoteInput } : it);
    setActiveItems(updated);
    setSelectedItemForReview(null);
    setReviewerNoteInput('');
  };

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', padding: '30px 24px', display: 'flex', flexDirection: 'column', gap: '26px' }}>
      
      {/* Header */}
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
            <span>Institutional Scientific Governance</span>
          </div>
          <h1>Editorial Review Queue & Approval Governance</h1>
          <p style={{ maxWidth: 880, marginTop: '8px', fontSize: '1.02rem' }}>
            Nothing publishes unreviewed. Before any polar science finding reaches schools or journalists, it passes through this strict four-stage scientific verification gate staffed by NCPOR Principal Investigators.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            fontSize: '0.82rem',
            padding: '8px 14px',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(5, 11, 20, 0.7)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-dim)',
            fontFamily: 'var(--font-mono)'
          }}>
            Queue Status: <strong style={{ color: 'var(--accent-aurora)' }}>{activeItems.length} Active Items</strong>
          </div>
        </div>
      </div>

      {/* 4-Stage Kanban Board */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(280px, 1fr))',
        gap: '18px',
        alignItems: 'start'
      }}>
        {columns.map((col) => {
          const colItems = activeItems.filter(item => item.status === col.id);
          const ColIcon = col.icon;

          return (
            <div
              key={col.id}
              style={{
                background: 'rgba(13, 26, 48, 0.65)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                minHeight: '520px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}
            >
              {/* Column Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid rgba(56, 189, 248, 0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ColIcon size={16} color="var(--accent-cyan)" aria-hidden="true" />
                  <h3 style={{ fontSize: '0.92rem', color: '#ffffff' }}>{col.title}</h3>
                </div>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: 'var(--text-main)'
                }}>
                  {colItems.length}
                </span>
              </div>

              {/* Cards in Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                {colItems.length === 0 ? (
                  <div style={{
                    padding: '30px 10px',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    color: 'var(--text-dim)',
                    fontStyle: 'italic'
                  }}>
                    No items in this stage
                  </div>
                ) : (
                  colItems.map((item) => (
                    <div
                      key={item.id}
                      className="glass-panel"
                      style={{
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        border: '1px solid rgba(56, 189, 248, 0.15)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span className={`badge-status ${col.badgeClass}`}>
                          {item.targetAudience}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                          {item.sourceCitationsCount} Citations
                        </span>
                      </div>

                      <h4 style={{ fontSize: '0.92rem', color: '#ffffff', lineHeight: 1.4 }}>
                        {item.reportTitle}
                      </h4>

                      <p style={{
                        fontSize: '0.82rem',
                        color: 'var(--text-muted)',
                        lineHeight: 1.5,
                        background: 'rgba(5, 11, 20, 0.4)',
                        padding: '8px 10px',
                        borderRadius: 'var(--radius-sm)'
                      }}>
                        "{item.content.substring(0, 140)}…"
                      </p>

                      {/* Reviewer Note */}
                      <div style={{
                        fontSize: '0.76rem',
                        color: 'var(--accent-aurora)',
                        background: 'rgba(16, 185, 129, 0.08)',
                        padding: '6px 8px',
                        borderRadius: '4px',
                        borderLeft: '2px solid var(--accent-aurora)'
                      }}>
                        <strong>Fact-Check Note:</strong> {item.reviewerNotes || 'Assigned to NCPOR Cryosphere Division'}
                      </div>

                      {/* Channels & Target Date */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                        <span>Target: {item.targetPublishDate}</span>
                      </div>

                      {/* Progression CTA */}
                      {col.id !== 'scheduled' && (
                        <div style={{ paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                          <button
                            onClick={() => handleAdvanceStatus(item)}
                            style={{
                              width: '100%',
                              padding: '8px',
                              borderRadius: 'var(--radius-sm)',
                              background: col.id === 'draft' ? 'rgba(56, 189, 248, 0.15)' : col.id === 'in_review' ? 'rgba(16, 185, 129, 0.18)' : 'rgba(249, 115, 22, 0.18)',
                              color: col.id === 'draft' ? 'var(--accent-cyan)' : col.id === 'in_review' ? 'var(--accent-aurora)' : 'var(--accent-orange)',
                              border: '1px solid currentColor',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px'
                            }}
                          >
                            <span>
                              {col.id === 'draft' ? 'Assign Scientist Fact-Check' : col.id === 'in_review' ? 'Verify & Digitally Approve' : 'Schedule on Dissemination Calendar'}
                            </span>
                            <ChevronRight size={14} aria-hidden="true" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dissemination Campaign Calendar View */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <span className="badge-status badge-scheduled" style={{ marginBottom: '6px' }}>
              PUBLIC DISSEMINATION TIMELINE
            </span>
            <h2 style={{ fontSize: '1.25rem', color: '#ffffff' }}>Upcoming Polar Science Campaign Milestones</h2>
          </div>
          <button className="btn-secondary" style={{ fontSize: '0.82rem' }}>
            <Calendar size={15} aria-hidden="true" />
            <span>Sync with MoES National Science Calendar</span>
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px'
        }}>
          {[
            {
              date: '2026-10-15',
              title: 'National Student Innovation Week',
              target: 'Middle & High School Outreach Explainer',
              status: 'Approved & Scheduled'
            },
            {
              date: '2026-10-24',
              title: 'International Day of Climate Action',
              target: 'Himansh 10-Yr Glacier Decadal Loss Reel & X Thread',
              status: 'Scheduled'
            },
            {
              date: '2026-12-01',
              title: 'Antarctica Day (Treaty Milestone)',
              target: 'Bharati Station Winter Blizzard Technical Release',
              status: 'In Review'
            },
            {
              date: '2027-02-28',
              title: 'National Science Day 2027',
              target: 'IndARC Arctic Mooring Multi-Year Press Kit Release',
              status: 'Draft Queued'
            }
          ].map((milestone, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(5, 11, 20, 0.65)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>
                  {milestone.date}
                </span>
                <span className="badge-status badge-scheduled" style={{ fontSize: '0.68rem' }}>
                  {milestone.status}
                </span>
              </div>
              <h4 style={{ fontSize: '0.95rem', color: '#ffffff' }}>{milestone.title}</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{milestone.target}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
