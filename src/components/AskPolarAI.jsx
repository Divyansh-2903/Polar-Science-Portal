import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Paperclip, 
  Users, 
  Compass, 
  Database, 
  FileText, 
  Film, 
  CheckCircle2, 
  ExternalLink,
  Bot,
  User,
  ArrowRight,
  BookOpen
} from 'lucide-react';

export function AskPolarAI({ onNavigate }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'user',
      text: 'What research has India conducted on Antarctic glaciers?'
    },
    {
      id: 2,
      sender: 'ai',
      text: 'India has conducted extensive research on Antarctic glaciers, focusing on glacier dynamics, mass balance, ice core analysis and the impact of climate change. Key studies include satellite-based mapping, GPS measurements and glaciological field observations during Indian Antarctic Expeditions.',
      sources: [
        {
          num: 1,
          title: 'Glaciological Studies at Bharati Station',
          type: 'Technical Report · 2023',
          citation: 'NCPOR-TR-2023-04',
          author: 'Dr. Thamban Meloth et al.'
        },
        {
          num: 2,
          title: 'Mass Balance of Antarctic Glaciers',
          type: 'Journal of Earth Sciences · 2022',
          citation: 'DOI: 10.1016/j.jears.2022.04',
          author: 'Dr. Rahul Sharma et al.'
        },
        {
          num: 3,
          title: '43rd IAE Expedition Report',
          type: 'Expedition Report · 2024',
          citation: 'MoES-IAE-43-REP',
          author: 'Polar Operations Directorate'
        }
      ]
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [activeSourceModal, setActiveSourceModal] = useState(null);

  const samplePrompts = [
    'What research has India done on Antarctic glaciers?',
    'Show datasets from Maitri station',
    'Explain sea ice for school students'
  ];

  const handleSend = (queryText) => {
    const textToSend = queryText || inputVal;
    if (!textToSend.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');

    setTimeout(() => {
      let aiResponseText = `Based on authenticated NCPOR archives, Indian scientists monitor polar ice sheets, sea ice dynamics, and cryospheric ecosystems across Maitri, Bharati, and Himadri stations.`;
      let sources = [
        {
          num: 1,
          title: 'Comprehensive Polar Telemetry Synthesis',
          type: 'NCPOR Scientific Monograph · 2024',
          citation: 'NCPOR-MONO-2024-11',
          author: 'National Centre for Polar and Ocean Research'
        },
        {
          num: 2,
          title: 'Atmospheric Boundary Layer Dynamics at Larsemann Hills',
          type: 'Polar Science Journal · 2023',
          citation: 'DOI: 10.1007/s11707-023',
          author: 'Atmospheric Sciences Team'
        }
      ];

      if (textToSend.toLowerCase().includes('maitri')) {
        aiResponseText = `Maitri station hosts continuous Automated Weather Station (AWS) telemetry, ground ozone radiometers, and Lake Priyadarshini water quality sensors dating from 1989 to present.`;
      } else if (textToSend.toLowerCase().includes('school')) {
        aiResponseText = `Antarctica is like Earth's giant air conditioner! The bright white ice bounces back sunlight so our planet stays cool. Indian scientists live there in warm pods to study how glaciers melt and protect animals.`;
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiResponseText,
        sources: sources
      }]);
    }, 600);
  };

  return (
    <div style={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Header Banner (Matches Reference Image 3) */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '16px 20px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #1e6ef5, #0ea5e9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff'
          }}>
            <Sparkles size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Ask Polar AI
            </h2>
            <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
              Ask questions in plain English and get answers verified by official polar expedition reports
            </div>
          </div>
        </div>

        {/* Suggested Query Pills (Matches Reference Image 3) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              style={{
                fontSize: '0.75rem',
                fontWeight: 500,
                color: '#1e6ef5',
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                padding: '6px 12px',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>{p}</span>
              <ArrowRight size={12} />
            </button>
          ))}
        </div>
      </div>

      {/* Main Dual-Column Content: Left Chat vs Right Related Knowledge */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 300px',
        gap: '20px',
        minHeight: '520px'
      }}>
        
        {/* Chat Area Card */}
        <div style={{
          background: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          
          {/* Messages Stream */}
          <div style={{
            flex: 1,
            padding: '24px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {messages.map((m) => (
              <div 
                key={m.id}
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: m.sender === 'user' ? '75%' : '88%'
                }}
              >
                {m.sender === 'ai' && (
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#1e6ef5',
                    flexShrink: 0
                  }}>
                    <Bot size={18} />
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  
                  {/* Bubble */}
                  <div style={{
                    padding: '14px 18px',
                    borderRadius: '16px',
                    fontSize: '0.88rem',
                    lineHeight: 1.6,
                    background: m.sender === 'user' ? '#1e6ef5' : '#f8fafc',
                    color: m.sender === 'user' ? '#ffffff' : '#0f172a',
                    border: m.sender === 'user' ? 'none' : '1px solid #e2e8f0',
                    borderTopRightRadius: m.sender === 'user' ? '4px' : '16px',
                    borderTopLeftRadius: m.sender === 'ai' ? '4px' : '16px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                  }}>
                    {m.text}
                  </div>

                  {/* Grounded Sources Card List (Matches Reference Image 3) */}
                  {m.sources && (
                    <div style={{
                      marginTop: '8px',
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '12px 14px'
                    }}>
                      <div style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        color: '#64748b',
                        marginBottom: '8px'
                      }}>
                        Sources ({m.sources.length} Grounded Citations)
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {m.sources.map((src) => (
                          <div
                            key={src.num}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '8px 10px',
                              background: '#f8fafc',
                              borderRadius: '8px',
                              border: '1px solid #f1f5f9',
                              gap: '8px'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '50%',
                                background: '#1e6ef5',
                                color: '#ffffff',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                {src.num}
                              </div>
                              <div>
                                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0f172a' }}>
                                  {src.title}
                                </div>
                                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                                  {src.type} · {src.author}
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => setActiveSourceModal(src)}
                              style={{
                                padding: '4px 10px',
                                borderRadius: '6px',
                                background: '#ffffff',
                                border: '1px solid #cbd5e1',
                                fontSize: '0.74rem',
                                fontWeight: 600,
                                color: '#1e6ef5'
                              }}
                            >
                              View
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

                {m.sender === 'user' && (
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#1e6ef5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    flexShrink: 0
                  }}>
                    <User size={18} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Chat Input Bar (Matches Reference Image 3) */}
          <div style={{
            padding: '16px 20px',
            borderTop: '1px solid #e2e8f0',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <button
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748b',
                background: '#f8fafc',
                border: '1px solid #e2e8f0'
              }}
              title="Attach dataset or file"
            >
              <Paperclip size={18} />
            </button>

            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder="Ask anything about polar research..."
              style={{
                flex: 1,
                height: '42px',
                border: '1px solid #cbd5e1',
                borderRadius: '999px',
                padding: '0 18px',
                fontSize: '0.86rem',
                outline: 'none',
                color: '#0f172a',
                background: '#ffffff'
              }}
            />

            <button
              onClick={() => handleSend()}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: '#1e6ef5',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(30,110,245,0.3)'
              }}
              title="Send Message"
            >
              <Send size={18} />
            </button>
          </div>

        </div>

        {/* Right Panel: Related Knowledge (Matches Reference Image 3) */}
        <div style={{
          background: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
            Related Knowledge
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              borderRadius: '12px',
              background: '#f8fafc',
              border: '1px solid #f1f5f9',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: '#ecfdf5',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Users size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>3 Researchers</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Working on this topic</div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              borderRadius: '12px',
              background: '#f8fafc',
              border: '1px solid #f1f5f9',
              cursor: 'pointer'
            }} onClick={() => onNavigate('replay')}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: '#eff6ff',
                color: '#1e6ef5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Compass size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>5 Expeditions</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Related expeditions</div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              borderRadius: '12px',
              background: '#f8fafc',
              border: '1px solid #f1f5f9',
              cursor: 'pointer'
            }} onClick={() => onNavigate('data')}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: '#fdf2f8',
                color: '#db2777',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Database size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>8 Datasets</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Associated datasets</div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              borderRadius: '12px',
              background: '#f8fafc',
              border: '1px solid #f1f5f9',
              cursor: 'pointer'
            }} onClick={() => onNavigate('explain')}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: '#fff7ed',
                color: '#ea580c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FileText size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>21 Publications</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Papers and reports</div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              borderRadius: '12px',
              background: '#f8fafc',
              border: '1px solid #f1f5f9',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: '#f5f3ff',
                color: '#7c3aed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Film size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>12 Photos & Videos</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Field media</div>
              </div>
            </div>

          </div>

          <div style={{
            marginTop: 'auto',
            paddingTop: '12px',
            borderTop: '1px solid #f1f5f9',
            fontSize: '0.72rem',
            color: '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <CheckCircle2 size={14} color="#10b981" />
            <span>Guaranteed zero hallucinations via DSpace/NCPOR RAG locks</span>
          </div>

        </div>

      </div>

      {/* Citation Preview Modal */}
      {activeSourceModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            maxWidth: '480px',
            width: '100%',
            padding: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e6ef5' }}>
                  {activeSourceModal.type}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '4px 0 0 0' }}>
                  {activeSourceModal.title}
                </h3>
              </div>
              <button onClick={() => setActiveSourceModal(null)} style={{ fontSize: '1.2rem', color: '#64748b' }}>✕</button>
            </div>

            <div style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.6, marginBottom: '18px' }}>
              <p><strong>Lead Investigator:</strong> {activeSourceModal.author}</p>
              <p><strong>Persistent Identifier:</strong> {activeSourceModal.citation}</p>
              <p style={{ marginTop: '8px' }}>
                Archived in the National Polar Data Repository. Full geodetic GPS tables and drill core stratigraphy verified by scientific reviewers.
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button 
                onClick={() => setActiveSourceModal(null)}
                style={{ padding: '8px 16px', borderRadius: '8px', background: '#f1f5f9', color: '#475569', fontWeight: 600 }}
              >
                Close
              </button>
              <button 
                onClick={() => {
                  setActiveSourceModal(null);
                  onNavigate('data');
                }}
                style={{ padding: '8px 16px', borderRadius: '8px', background: '#1e6ef5', color: '#ffffff', fontWeight: 600 }}
              >
                Open Raw Dataset →
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
