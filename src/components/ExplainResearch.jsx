import React, { useState } from 'react';
import { 
  GraduationCap, 
  School, 
  Users, 
  Microscope, 
  BookOpen, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowRight, 
  ExternalLink,
  HelpCircle,
  Bookmark,
  Share2
} from 'lucide-react';

export function ExplainResearch({ onNavigate, preselectedReportId }) {
  const [selectedAudience, setSelectedAudience] = useState('college'); // 'researcher' | 'college' | 'school' | 'public'
  const [activeModal, setActiveModal] = useState(null); // 'takeaways' | 'terms' | 'cite' | null
  const [copiedCite, setCopiedCite] = useState(false);
  const [currentPaperIndex, setCurrentPaperIndex] = useState(0);

  const researchPapers = [
    {
      title: "Changes in Antarctic Sea Ice and its Impact on Global Climate",
      citation: "Journal of Climate Research · 2024 · A. Sharma et al., NCPOR (DOI: 10.1016/j.jclim.2024.02)",
      audiences: {
        researcher: {
          tag: "Expert Technical Depth",
          title: "Glacioclimatological Feedback Mechanics & Cryospheric Mass Balance",
          body: "Multi-satellite altimetry and MODIS albedo records indicate negative mass balance across peripheral ice shelves in Dronning Maud Land. Basal melting triggered by Circumpolar Deep Water (CDW) intrusion correlates with a 14% shift in local katabatic wind shear over the observation window. Altimetry variance shows -3.8 cm/yr over coastal fringe shelves with katabatic boundary layer perturbation at 925 hPa geopotential.",
          img: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80",
          takeaways: [
            "MODIS albedo records verify -3.8 cm/year mass loss across peripheral ice shelves.",
            "CDW (Circumpolar Deep Water) intrusion is the primary thermal driver of grounding-line retreat.",
            "Katabatic wind shear shift of 14% alters coastal lead formation and polynya extent."
          ],
          terms: [
            { term: "Katabatic Winds", def: "High-density gravity-driven cold winds flowing down continental ice sheet slopes." },
            { term: "CDW Intrusion", def: "Warm, saline Circumpolar Deep Water upwelling onto the continental shelf." },
            { term: "Mass Balance", def: "Net difference between ice accumulation (snowfall) and ablation (calving, melting)." }
          ]
        },
        college: {
          tag: "Undergraduate Cryosphere Science",
          title: "Simplified Explanation (College Student Level)",
          body: "This research studies how Antarctic sea ice has changed over recent decades using satellite data and field observations. The results show a decreasing trend in some regions, which can affect global climate patterns, ocean circulation, and weather systems. Understanding these changes is important for predicting future climate impacts, as sea ice acts like a massive reflector bouncing solar heat back into space.",
          img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
          takeaways: [
            "Sea ice acts as Earth's natural radiator shield (Albedo effect).",
            "Warmer sea surface temperatures delay winter ice freeze-up, disrupting polar ecosystems.",
            "Antarctic melting patterns correlate directly with shifts in the Indian summer monsoon."
          ],
          terms: [
            { term: "Albedo Effect", def: "The proportion of incident light or radiation reflected by a surface, highest in fresh snow (up to 90%)." },
            { term: "Thermohaline Circulation", def: "Global ocean conveyor belt driven by temperature and salinity gradients." },
            { term: "Polynya", def: "An area of open water surrounded by sea ice, critical for marine mammals and bird life." }
          ]
        },
        school: {
          tag: "Engaging & Accessible (Grade 6–10)",
          title: "How Antarctica's Giant Ice Blanket Protects Earth",
          body: "Think of Antarctica as Earth's giant refrigerator! The white ice works like a huge mirror reflecting hot sunlight away from our planet. Scientists from India travel all the way to Antarctica on icebreaker ships to measure the ice thickness and help protect animals like penguins and polar seals. If the ice gets thinner, the planet gets warmer!",
          img: "https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&w=800&q=80",
          takeaways: [
            "Antarctica holds almost 90% of the world's ice and 70% of Earth's fresh water!",
            "Indian researchers live in special cozy polar bases called Maitri and Bharati.",
            "Looking after polar ice helps keep our cities safe from rising sea waters."
          ],
          terms: [
            { term: "Ice Shelf", def: "A thick floating platform of ice that forms where a glacier or ice sheet flows down to a coastline." },
            { term: "Icebreaker", def: "A special ship with a reinforced hull designed to crush through thick frozen sea ice." },
            { term: "Polar Winter", def: "Months when the sun never rises above the horizon in polar regions." }
          ]
        },
        public: {
          tag: "General Public & Policy Makers",
          title: "Why Polar Ice Matters to India (General Public)",
          body: "What happens at the South Pole does not stay at the South Pole. India's polar expeditions conducted by the National Centre for Polar and Ocean Research (NCPOR) monitor how changes in polar ice directly drive the intensity of the Indian Monsoon and global sea level stability. By understanding these distant ice sheets, Indian scientists can better forecast monsoon rain patterns that feed hundreds of millions of farmers.",
          img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
          takeaways: [
            "Changes in Antarctic ocean waters directly influence rainfall and monsoon seasons across India.",
            "MoES and NCPOR keep around-the-clock research active across Antarctica, the Arctic, and the Himalayas.",
            "Open research files help cities and farms plan ahead for changing weather patterns."
          ],
          terms: [
            { term: "Climate Connection", def: "A natural weather chain reaction connecting distant parts of the planet — like how melting polar ice affects India's rainfall." },
            { term: "NCPOR", def: "National Centre for Polar and Ocean Research, Goa — India's premier polar research institute under MoES." },
            { term: "The Three Poles", def: "The Earth's three major ice reservoirs: South Pole (Antarctica), North Pole (Arctic), and Third Pole (Himalayas)." }
          ]
        }
      }
    },
    {
      title: "Himalayan Cryospheric Recession in the Chandra-Bhaga Basin (Himansh Base)",
      citation: "Geophysical Research Letters · 2024 · B. K. Patel et al., MoES (DOI: 10.1029/2024GL099182)",
      audiences: {
        researcher: {
          tag: "Expert Technical Depth",
          title: "Cryospheric Geomorphology & Equilibrium-Line Altitude Shifts in Western Himalayas",
          body: "Himansh station at 4,080m elevation deployed ground-penetrating radar (GPR) across the Sutri Dhaka and Samudra Tapu glaciers. Debris-covered ice tongues show a 0.68m w.e./year negative mass balance, with equilibrium-line altitudes (ELA) migrating 42 meters up-valley over the past decade.",
          img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
          takeaways: [
            "GPR sounding indicates ice thickness ranges between 120m and 190m in main valley tongues.",
            "Debris mantle greater than 5cm provides localized insulating effect against direct solar insolation.",
            "Glacial lake outburst flood (GLOF) susceptibility increased by 18% in lower snout moraines."
          ],
          terms: [
            { term: "Equilibrium-Line Altitude (ELA)", def: "The elevation on a glacier where annual accumulation equals ablation." },
            { term: "Water Equivalent (w.e.)", def: "The depth of water that would result from melting a given volume of snow or ice." }
          ]
        },
        college: {
          tag: "Undergraduate Cryosphere Science",
          title: "Himalayan 'Third Pole' Glaciers: Water Security for 1.4 Billion People",
          body: "The Himalayan glaciers form the 'Third Pole' and feed major rivers including the Indus and Ganges. Research from Himansh station shows how seasonal snowmelt timing is shifting earlier in the spring, which impacts hydroelectric dams, agriculture, and summer river discharge throughout northern India.",
          img: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80",
          takeaways: [
            "Himansh Station is India's highest high-altitude research lab at 4,080m in Himachal Pradesh.",
            "Glacier runoff supports agricultural irrigation for over 1.4 billion people downstream in Asia.",
            "Automated weather stations monitor snow depth, solar radiation, and black carbon deposition."
          ],
          terms: [
            { term: "Third Pole", def: "The Tibetan Plateau and Himalayan mountain range, containing the largest reserve of snow and ice outside the polar regions." },
            { term: "Black Carbon", def: "Soot particles from burning that settle on snow, darkening the surface and accelerating melting." }
          ]
        },
        school: {
          tag: "Engaging & Accessible (Grade 6–10)",
          title: "India's Mountain Base: Himansh in the Clouds",
          body: "Did you know India has a polar research station high up in the snowy Himalayan mountains called Himansh? Scientists live at over 4,000 meters above sea level where the air is thin and cold, measuring how much snow falls each winter so that towns downstream know how much drinking water they will have!",
          img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
          takeaways: [
            "Himansh means 'a piece of ice' in Hindi.",
            "Scientists hike across glaciers with radar tools that can see deep inside the ice.",
            "Rivers like the Ganga and Yamuna get their pure water from these melting mountain glaciers."
          ],
          terms: [
            { term: "Glacier", def: "A huge, slow-moving river of ice formed by snow packed together over thousands of years." },
            { term: "Altitude", def: "The height of an object or point in relation to sea level." }
          ]
        },
        public: {
          tag: "General Public & Policy Makers",
          title: "Preserving the Himalayan Water Towers of India",
          body: "NCPOR's Himansh station represents India's dedication to monitoring our sacred mountain glaciers. Accurate measurement of glacier volume and water release ensures food security, flood early-warning systems, and dependable hydropower planning for future generations.",
          img: "https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&w=800&q=80",
          takeaways: [
            "National security and water stability depend on continuous glaciological monitoring.",
            "MoES links Himalayan research with Antarctic observations for a unified global cryosphere model.",
            "Early warning systems developed by NCPOR protect mountain villages from glacial lake floods."
          ],
          terms: [
            { term: "Water Tower", def: "A natural mountainous region that captures and stores water in glaciers, releasing it gradually downstream." }
          ]
        }
      }
    }
  ];

  const currentPaper = researchPapers[currentPaperIndex];
  const activeContent = currentPaper.audiences[selectedAudience];

  const audienceButtons = [
    { id: 'researcher', label: 'Researcher', icon: Microscope },
    { id: 'college', label: 'College Student', icon: GraduationCap },
    { id: 'school', label: 'School Student', icon: School },
    { id: 'public', label: 'General Public', icon: Users }
  ];

  const handleCopyCitation = () => {
    navigator.clipboard?.writeText(currentPaper.citation);
    setCopiedCite(true);
    setTimeout(() => setCopiedCite(false), 2000);
  };

  const handleGenerateAnother = () => {
    setCurrentPaperIndex((prev) => (prev + 1) % researchPapers.length);
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Paper Container Card (Matches Reference Screen 6) */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '20px',
        padding: '28px 32px',
        boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)'
      }}>
        
        {/* Research Paper Header */}
        <div style={{ marginBottom: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{
              background: '#eff6ff',
              color: '#1e6ef5',
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '4px',
              border: '1px solid #bfdbfe'
            }}>
              PEER-REVIEWED PUBLICATION
            </span>
            <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
              Paper {currentPaperIndex + 1} of {researchPapers.length}
            </span>
          </div>

          <h3 style={{
            fontSize: '1.35rem',
            fontWeight: 800,
            color: '#0f172a',
            lineHeight: 1.3,
            marginBottom: '6px',
            letterSpacing: '-0.015em'
          }}>
            {currentPaper.title}
          </h3>

          <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
            {currentPaper.citation}
          </div>
        </div>

        {/* Audience Selector Button Pills (Matches Reference Screen 6) */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {audienceButtons.map((btn) => {
            const Icon = btn.icon;
            const isSelected = selectedAudience === btn.id;
            return (
              <button
                key={btn.id}
                onClick={() => setSelectedAudience(btn.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 18px',
                  borderRadius: '10px',
                  fontSize: '0.84rem',
                  fontWeight: isSelected ? 700 : 600,
                  cursor: 'pointer',
                  transition: 'all 0.16s ease',
                  background: isSelected ? '#1e6ef5' : '#ffffff',
                  color: isSelected ? '#ffffff' : '#475569',
                  border: `1px solid ${isSelected ? '#1e6ef5' : '#cbd5e1'}`,
                  boxShadow: isSelected ? '0 2px 8px rgba(30, 110, 245, 0.3)' : 'none'
                }}
              >
                <Icon size={16} />
                <span>{btn.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Card (Matches Reference Screen 6 layout: text on left, image on right) */}
        <div className="explain-card-grid">
          <div>
            <div style={{
              display: 'inline-block',
              fontSize: '0.72rem',
              fontWeight: 700,
              color: '#1e6ef5',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '6px'
            }}>
              {activeContent.tag}
            </div>

            <h4 style={{
              fontSize: '1.15rem',
              fontWeight: 800,
              color: '#0f172a',
              marginBottom: '12px',
              lineHeight: 1.35
            }}>
              {activeContent.title}
            </h4>

            <p style={{
              fontSize: '0.9rem',
              color: '#334155',
              lineHeight: 1.68,
              margin: 0
            }}>
              {activeContent.body}
            </p>
          </div>

          <div style={{
            height: '160px',
            borderRadius: '12px',
            overflow: 'hidden',
            background: '#e2e8f0',
            boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)'
          }}>
            <img 
              src={activeContent.img} 
              alt={activeContent.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Quick Action Tags (Matches Reference Screen 6) */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={() => setActiveModal(activeModal === 'takeaways' ? null : 'takeaways')}
            style={{
              background: activeModal === 'takeaways' ? '#1e6ef5' : '#ffffff',
              color: activeModal === 'takeaways' ? '#ffffff' : '#0f172a',
              border: `1px solid ${activeModal === 'takeaways' ? '#1e6ef5' : '#cbd5e1'}`,
              padding: '7px 16px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Bookmark size={14} />
            <span>Key Takeaways</span>
          </button>

          <button
            onClick={() => setActiveModal(activeModal === 'terms' ? null : 'terms')}
            style={{
              background: activeModal === 'terms' ? '#1e6ef5' : '#ffffff',
              color: activeModal === 'terms' ? '#ffffff' : '#0f172a',
              border: `1px solid ${activeModal === 'terms' ? '#1e6ef5' : '#cbd5e1'}`,
              padding: '7px 16px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <BookOpen size={14} />
            <span>Important Terms</span>
          </button>

          <button
            onClick={handleCopyCitation}
            style={{
              background: '#ffffff',
              color: '#0f172a',
              border: '1px solid #cbd5e1',
              padding: '7px 16px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {copiedCite ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
            <span>{copiedCite ? 'Citation Copied!' : 'Cite This'}</span>
          </button>

          <button
            onClick={handleGenerateAnother}
            style={{
              background: '#ffffff',
              color: '#1e6ef5',
              border: '1px solid #bfdbfe',
              padding: '7px 16px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sparkles size={14} />
            <span>Switch Research Paper</span>
          </button>
        </div>

        {/* Expandable Key Takeaways Drawer */}
        {activeModal === 'takeaways' && (
          <div style={{
            marginTop: '16px',
            background: '#ffffff',
            border: '1px solid #bfdbfe',
            borderRadius: '12px',
            padding: '18px 22px',
            boxShadow: '0 4px 12px rgba(30, 110, 245, 0.08)'
          }}>
            <h5 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1e6ef5', marginBottom: '10px' }}>
              Key Takeaways ({selectedAudience.toUpperCase()} LEVEL)
            </h5>
            <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.86rem', color: '#334155' }}>
              {activeContent.takeaways.map((item, idx) => (
                <li key={idx}><strong>Point {idx + 1}:</strong> {item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Expandable Important Terms Drawer */}
        {activeModal === 'terms' && (
          <div style={{
            marginTop: '16px',
            background: '#ffffff',
            border: '1px solid #bfdbfe',
            borderRadius: '12px',
            padding: '18px 22px',
            boxShadow: '0 4px 12px rgba(30, 110, 245, 0.08)'
          }}>
            <h5 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1e6ef5', marginBottom: '10px' }}>
              Scientific Vocabulary & Definitions
            </h5>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
              {activeContent.terms.map((t, idx) => (
                <div key={idx} style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <strong style={{ color: '#0f172a', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>{t.term}</strong>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b', lineHeight: 1.45 }}>{t.def}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
