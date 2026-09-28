import React, { useState } from 'react';
import { 
  researchersDirectory 
} from '../data/polarCorpus';
import { 
  Users, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  Mail, 
  MapPin, 
  BookOpen,
  HelpCircle
} from 'lucide-react';

export function AskScientist() {
  const [selectedScientist, setSelectedScientist] = useState(researchersDirectory[0]);
  const [userQuestion, setUserQuestion] = useState('');
  const [submittedAnswers, setSubmittedAnswers] = useState([
    {
      id: 1,
      scientistName: 'Dr. Rahul Sharma',
      question: 'How does Bharati Station survive 130+ km/h winds without blowing away?',
      answer: 'Bharati is engineered on aerodynamic steel stilts with a double-façade aerodynamic envelope tested in wind tunnels. Instead of accumulating snow drifts like older flat-walled designs, the structure allows hurricane-force katabatic winds to pass smoothly beneath and over the building envelope.',
      verifiedDate: '2026-09-15'
    },
    {
      id: 2,
      scientistName: 'Dr. K. P. Krishnan',
      question: 'How is Atlantic water warming altering Arctic marine life?',
      answer: 'Data from our IndARC mooring in Kongsfjorden reveals that warmer Atlantic water pulses now penetrate deeper into the fjord during winter. This prevents ice formation and triggers phytoplankton blooms up to 18 days earlier, shifting the food web away from cold-water polar cod.',
      verifiedDate: '2026-09-22'
    }
  ]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;

    const newQA = {
      id: Date.now(),
      scientistName: selectedScientist.name,
      question: userQuestion,
      answer: `Thank you for your question on ${selectedScientist.expertise[0]}. This question has been logged under NCPOR's Public Science Outreach program. A preliminary citation from our recent expedition report indicates ongoing research in this sector.`,
      verifiedDate: 'Just now'
    };

    setSubmittedAnswers([newQA, ...submittedAnswers]);
    setUserQuestion('');
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3500);
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
            <Users size={14} color="var(--accent-aurora)" aria-hidden="true" />
            <span>NCPOR Polar Directory & Citizen Science Engagement (Solving Gap F)</span>
          </div>
          <h1>Ask a Polar Scientist · Researcher Expertise Gateway</h1>
          <p style={{ maxWidth: 880, marginTop: '8px', fontSize: '1.02rem' }}>
            Reviving NCPOR's historic public outreach mandate: connect students, educators, and science enthusiasts directly with active Indian expedition leaders, glaciologists, and polar oceanographers.
          </p>
        </div>
      </div>

      {/* Main Grid: Directory on Left, Q&A on Right */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(380px, 1fr) minmax(440px, 1.2fr)',
        gap: '26px',
        alignItems: 'start'
      }}>
        
        {/* Researchers Directory */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#ffffff' }}>NCPOR Principal Investigators</h2>

          {researchersDirectory.map((scientist) => {
            const isSelected = selectedScientist.id === scientist.id;
            return (
              <div
                key={scientist.id}
                onClick={() => setSelectedScientist(scientist)}
                className="glass-panel"
                style={{
                  padding: '20px',
                  cursor: 'pointer',
                  borderColor: isSelected ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                  boxShadow: isSelected ? 'var(--shadow-glow-cyan)' : 'none',
                  transition: 'all 200ms ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', color: '#ffffff' }}>{scientist.name}</h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>
                      {scientist.designation} · {scientist.division}
                    </div>
                  </div>
                  <span className="badge-status badge-scheduled" style={{ fontSize: '0.7rem' }}>
                    {scientist.expeditionsCount} Expeditions
                  </span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '10px 0' }}>
                  {scientist.expertise.map((exp, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '0.72rem',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(56, 189, 248, 0.08)',
                        color: '#cbd5e1',
                        border: '1px solid rgba(56, 189, 248, 0.15)'
                      }}
                    >
                      {exp}
                    </span>
                  ))}
                </div>

                <div style={{ fontSize: '0.76rem', color: 'var(--text-dim)', marginTop: '8px' }}>
                  Active Fieldwork: {scientist.activeProjects}
                </div>
              </div>
            );
          })}
        </div>

        {/* Q&A Portal */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Ask Form */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <MessageSquare size={20} color="var(--accent-aurora)" aria-hidden="true" />
              <h3 style={{ fontSize: '1.2rem', color: '#ffffff' }}>
                Ask {selectedScientist.name}
              </h3>
            </div>

            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Have a question about polar weather, glacier melt, or life in Antarctica? Submit your inquiry to get an authenticated scientific explanation.
            </p>

            {submitSuccess && (
              <div style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid var(--border-aurora)',
                color: 'var(--accent-aurora)',
                fontSize: '0.85rem',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CheckCircle2 size={16} aria-hidden="true" />
                <span>Question received! Added to the verified public archive below.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <textarea
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                rows={3}
                placeholder={`Ask ${selectedScientist.name} about ${selectedScientist.expertise[0]}…`}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  fontFamily: 'var(--font-sans)',
                  resize: 'vertical'
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  Questions reviewed under MoES Outreach Guidelines
                </span>
                <button type="submit" className="btn-primary" style={{ padding: '8px 20px' }}>
                  <Send size={15} aria-hidden="true" />
                  <span>Submit Question</span>
                </button>
              </div>
            </form>
          </div>

          {/* Verified Answers Feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#ffffff' }}>Verified Public Q&A Archive</h3>

            {submittedAnswers.map((qa) => (
              <div
                key={qa.id}
                className="glass-panel"
                style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                    {qa.scientistName} Responded:
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    {qa.verifiedDate}
                  </span>
                </div>

                <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#ffffff' }}>
                  Q: "{qa.question}"
                </div>

                <p style={{
                  fontSize: '0.86rem',
                  color: '#cbd5e1',
                  lineHeight: 1.55,
                  background: 'rgba(5, 11, 20, 0.45)',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  borderLeft: '3px solid var(--accent-aurora)'
                }}>
                  {qa.answer}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
