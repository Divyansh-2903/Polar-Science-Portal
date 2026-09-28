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
            <span>Scientist Review Gate</span>
          </div>
          <h1>Scientist Review & Fact-Check Gate</h1>
          <p style={{ maxWidth: 880, marginTop: '8px', fontSize: '1.02rem' }}>
            Nothing publishes without review. Before any polar science post reaches schools, news reporters, or social media, real Indian scientists fact-check every sentence to ensure 100% accuracy.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            fontSize: '0.82rem',
            padding: '8px 16px',
            borderRadius: '9999px',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            color: '#475569',
            fontFamily: 'var(--font-mono)',
            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.05)'
          }}>
            Queue Status: <strong style={{ color: '#059669' }}>{activeItems.length} Active Items</strong>
          </div>
        </div>
      </div>

      {/* 4-Stage Kanban Board */}
      <div className="editorial-kanban-grid">
        {columns.map((col) => {
          const colItems = activeItems.filter(item => item.status === col.id);
          const ColIcon = col.icon;

          return (
            <div
              key={col.id}
              className="editorial-kanban-col"
            >
              {/* Column Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ColIcon size={16} color="var(--accent-cyan)" aria-hidden="true" />
                  <h3 style={{ fontSize: '0.94rem', fontWeight: 800, color: '#0f172a' }}>{col.title}</h3>
                </div>
                <span style={{
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  background: '#e2e8f0',
                  color: '#334155'
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
                    color: '#94a3b8',
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
                        gap: '10px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span className={`badge-status ${col.badgeClass}`}>
                          {item.targetAudience}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                          {item.sourceCitationsCount} Citations
                        </span>
                      </div>

                      <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.4 }}>
                        {item.reportTitle}
                      </h4>

                      <p style={{
                        fontSize: '0.82rem',
                        color: '#334155',
                        lineHeight: 1.5,
                        background: '#f1f5f9',
                        padding: '8px 10px',
                        borderRadius: '8px'
                      }}>
                        "{item.content.substring(0, 140)}…"
                      </p>

                      {/* Reviewer Note */}
                      <div style={{
                        fontSize: '0.76rem',
                        color: '#065f46',
                        background: '#ecfdf5',
                        padding: '6px 8px',
                        borderRadius: '4px',
                        borderLeft: '3px solid #10b981'
                      }}>
                        <strong>Fact-Check Note:</strong> {item.reviewerNotes || 'Assigned to NCPOR Cryosphere Division'}
                      </div>

                      {/* Channels & Target Date */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: '#64748b' }}>
                        <span>Target: {item.targetPublishDate}</span>
                      </div>

                      {/* Progression CTA */}
                      {col.id !== 'scheduled' && (
                        <div style={{ paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
                          <button
                            onClick={() => handleAdvanceStatus(item)}
                            style={{
                              width: '100%',
                              padding: '8px',
                              borderRadius: '8px',
                              background: col.id === 'draft' ? '#eff6ff' : col.id === 'in_review' ? '#ecfdf5' : '#fff7ed',
                              color: col.id === 'draft' ? '#1e6ef5' : col.id === 'in_review' ? '#059669' : '#ea580c',
                              border: col.id === 'draft' ? '1px solid #bfdbfe' : col.id === 'in_review' ? '1px solid #a7f3d0' : '1px solid #fed7aa',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px',
                              cursor: 'pointer',
                              transition: 'all 0.16s ease'
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
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>Upcoming Polar Science Campaign Milestones</h2>
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
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
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
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>{milestone.title}</h4>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>{milestone.target}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
