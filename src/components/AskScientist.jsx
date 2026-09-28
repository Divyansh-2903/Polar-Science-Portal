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
            <span>Connect Directly with Indian Polar Researchers</span>
          </div>
          <h1>Talk to Polar Scientists</h1>
          <p style={{ maxWidth: 880, marginTop: '8px', fontSize: '1.02rem' }}>
            Got questions about polar blizzards, glacier melt, or life on Antarctic ice? Ask real Indian expedition scientists directly and read answers verified from the field.
          </p>
        </div>
      </div>

      {/* Main Grid: Directory on Left, Q&A on Right */}
      <div className="ask-scientist-grid">
        
        {/* Researchers Directory */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>Meet the Scientists</h2>

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
                  borderColor: isSelected ? 'var(--blue-primary)' : 'var(--border-subtle)',
                  boxShadow: isSelected ? '0 4px 16px rgba(30, 110, 245, 0.15)' : 'none',
                  transition: 'all 200ms ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>{scientist.name}</h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
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
                        borderRadius: '9999px',
                        background: '#eff6ff',
                        color: '#1e6ef5',
                        border: '1px solid #bfdbfe'
                      }}
                    >
                      {exp}
                    </span>
                  ))}
                </div>

                <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '8px' }}>
                  Active Fieldwork: <strong style={{ color: '#0f172a' }}>{scientist.activeProjects}</strong>
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                Ask {selectedScientist.name}
              </h3>
            </div>

            <p style={{ fontSize: '0.84rem', color: '#64748b', marginBottom: '16px' }}>
              Have a question about polar weather, glacier melt, or life in Antarctica? Submit your inquiry to get an authenticated scientific explanation.
            </p>

            {submitSuccess && (
              <div style={{
                padding: '10px 14px',
                borderRadius: '8px',
                background: '#ecfdf5',
                border: '1px solid #a7f3d0',
                color: '#065f46',
                fontSize: '0.85rem',
                fontWeight: 600,
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
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  color: '#0f172a',
                  fontSize: '0.88rem',
                  fontFamily: 'var(--font-body)',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
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
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Recent Questions & Verified Answers</h3>

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
                  <span style={{ fontSize: '0.72rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                    {qa.verifiedDate}
                  </span>
                </div>

                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a' }}>
                  Q: "{qa.question}"
                </div>

                <p style={{
                  fontSize: '0.86rem',
                  color: '#334155',
                  lineHeight: 1.55,
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  borderLeft: '3px solid #10b981'
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
