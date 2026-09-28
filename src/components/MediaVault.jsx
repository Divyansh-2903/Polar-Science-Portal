import React, { useState } from 'react';
import { 
  mediaAssets 
} from '../data/polarCorpus';
import { 
  Film, 
  Search, 
  Download, 
  Camera, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Tag, 
  Eye, 
  Sparkles,
  CheckCircle2,
  Share2,
  Package
} from 'lucide-react';

export function MediaVault() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeMediaModal, setActiveMediaModal] = useState(null);
  const [pressKitCart, setPressKitCart] = useState([]);
  const [cartFeedback, setCartFeedback] = useState(false);

  const categories = ['All', 'Station Architecture', 'Scientific Fieldwork', 'Polar Biodiversity', 'Aerial Photogrammetry', 'Expedition Operations'];

  const filteredAssets = mediaAssets.filter(asset => {
    const matchesSearch = asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          asset.clipEmbeddingsDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          asset.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || asset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleCart = (assetId) => {
    if (pressKitCart.includes(assetId)) {
      setPressKitCart(pressKitCart.filter(id => id !== assetId));
    } else {
      setPressKitCart([...pressKitCart, assetId]);
      setCartFeedback(true);
      setTimeout(() => setCartFeedback(false), 2500);
    }
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
            <Sparkles size={14} color="var(--accent-orange)" aria-hidden="true" />
            <span>CLIP-Indexed Multimodal Media Asset Management (MAM)</span>
          </div>
          <h1>Polar Media Vault & Press Dissemination Hub</h1>
          <p style={{ maxWidth: 880, marginTop: '8px', fontSize: '1.02rem' }}>
            High-resolution 4K video b-roll, aerial drone passes, and verified expedition photography indexed with automated EXIF metadata, GPS geotags, and open Creative Commons licensing for science journalists and educators.
          </p>
        </div>

        {/* Press Kit Download Cart */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          background: '#ffffff',
          padding: '10px 18px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.05)'
        }}>
          <Package size={22} color="var(--accent-orange)" aria-hidden="true" />
          <div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>Media Press Kit Cart</div>
            <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
              {pressKitCart.length} Assets Selected
            </div>
          </div>
          <button
            disabled={pressKitCart.length === 0}
            className="btn-accent-orange"
            style={{ padding: '7px 16px', fontSize: '0.8rem' }}
          >
            <Download size={14} aria-hidden="true" />
            <span>Download ZIP</span>
          </button>
        </div>
      </div>

      {/* Cart Feedback Notification */}
      {cartFeedback && (
        <div style={{
          padding: '10px 16px',
          borderRadius: '8px',
          background: '#fff7ed',
          border: '1px solid #fed7aa',
          color: '#c2410c',
          fontSize: '0.85rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle2 size={16} aria-hidden="true" />
          <span>Asset added to Press Kit Cart with high-res 4K master files and caption metadata sheet.</span>
        </div>
      )}

      {/* Search & Categories */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '14px',
        alignItems: 'center',
        background: '#ffffff',
        padding: '16px 20px',
        borderRadius: '14px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)'
      }}>
        <div style={{ flex: 1, minWidth: '300px', position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={18} color="#64748b" style={{ position: 'absolute', left: '14px' }} aria-hidden="true" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by meaning: e.g. 'convoy traverse', 'piston coring on pack ice', 'penguin'…"
            style={{
              width: '100%',
              padding: '10px 14px 10px 42px',
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              color: '#0f172a',
              fontSize: '0.88rem',
              outline: 'none',
              fontFamily: 'var(--font-body)'
            }}
          />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {categories.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: isSelected ? 700 : 600,
                  background: isSelected ? '#ea580c' : '#f1f5f9',
                  color: isSelected ? '#ffffff' : '#475569',
                  border: isSelected ? '1px solid #ea580c' : '1px solid #e2e8f0',
                  cursor: 'pointer',
                  transition: 'all 0.16s ease',
                  boxShadow: isSelected ? '0 2px 6px rgba(234, 88, 12, 0.25)' : 'none'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Media Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '24px'
      }}>
        {filteredAssets.map((asset) => {
          const inCart = pressKitCart.includes(asset.id);
          return (
            <div
              key={asset.id}
              className="glass-panel"
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
              {/* Media Thumbnail */}
              <div style={{
                position: 'relative',
                height: '220px',
                overflow: 'hidden'
              }}>
                <img
                  src={asset.url}
                  alt={asset.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(13, 26, 48, 0.85) 0%, transparent 50%)'
                }} />

                {/* Resolution Badge */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'rgba(5, 11, 20, 0.85)',
                  backdropFilter: 'blur(8px)',
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-cyan)',
                  border: '1px solid rgba(56, 189, 248, 0.2)'
                }}>
                  {asset.resolution}
                </div>

                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '14px',
                  right: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.74rem',
                  color: '#e2e8f0',
                  fontFamily: 'var(--font-mono)'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={12} color="var(--accent-orange)" aria-hidden="true" />
                    {asset.exif.gps}
                  </span>
                  <span>{asset.exif.dateCaptured.split(' ')[0]}</span>
                </div>
              </div>

              {/* Media Info */}
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#ea580c', fontWeight: 800 }}>
                      {asset.category}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 500 }}>
                      {asset.license.split(' ')[0]} {asset.license.split(' ')[1]}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.08rem', color: '#0f172a', fontWeight: 700, lineHeight: 1.35, marginBottom: '8px' }}>
                    {asset.title}
                  </h3>

                  {/* Semantic Description Tag */}
                  <div style={{
                    fontSize: '0.76rem',
                    color: '#334155',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    marginBottom: '10px'
                  }}>
                    <strong style={{ color: '#0284c7' }}>CLIP Semantic Index:</strong> "{asset.clipEmbeddingsDescription}"
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {asset.tags.map((tag, i) => (
                      <span key={i} style={{ 
                        fontSize: '0.72rem', 
                        color: '#475569',
                        background: '#f1f5f9',
                        border: '1px solid #e2e8f0',
                        padding: '2px 8px',
                        borderRadius: '4px'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '10px', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                  <button
                    onClick={() => setActiveMediaModal(asset)}
                    className="btn-secondary"
                    style={{ flex: 1, padding: '7px 10px', fontSize: '0.78rem', justifyContent: 'center' }}
                  >
                    <Camera size={14} aria-hidden="true" />
                    <span>View EXIF</span>
                  </button>

                  <button
                    onClick={() => toggleCart(asset.id)}
                    style={{
                      flex: 1,
                      padding: '7px 10px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      background: inCart ? '#ecfdf5' : '#fff7ed',
                      color: inCart ? '#059669' : '#ea580c',
                      border: inCart ? '1px solid #a7f3d0' : '1px solid #fed7aa',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.16s ease'
                    }}
                  >
                    <Package size={14} aria-hidden="true" />
                    <span>{inCart ? 'In Press Kit' : '+ Add to Kit'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* EXIF Metadata Modal */}
      {activeMediaModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px'
        }}>
          <div className="glass-panel" style={{
            maxWidth: '620px',
            width: '100%',
            padding: '28px',
            maxHeight: '85vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span className="badge-status badge-scheduled" style={{ marginBottom: '6px' }}>
                  RAW EXIF CAMERA & GEOTAG TELEMETRY
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>{activeMediaModal.title}</h3>
              </div>
              <button
                onClick={() => setActiveMediaModal(null)}
                style={{ color: '#64748b', fontSize: '1.2rem', padding: '4px 8px', cursor: 'pointer' }}
                aria-label="Close EXIF modal"
              >
                ✕
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              background: '#f8fafc',
              padding: '16px',
              borderRadius: '12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: '#0f172a',
              marginBottom: '16px',
              border: '1px solid #e2e8f0'
            }}>
              <div>
                <span style={{ color: '#64748b' }}>Camera Body:</span>
                <div style={{ fontWeight: 700, color: '#0284c7' }}>{activeMediaModal.exif.camera}</div>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Lens Spec:</span>
                <div style={{ fontWeight: 700 }}>{activeMediaModal.exif.lens}</div>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Focal Length:</span>
                <div>{activeMediaModal.exif.focalLength}</div>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Shutter Speed:</span>
                <div>{activeMediaModal.exif.shutter}</div>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Aperture:</span>
                <div>{activeMediaModal.exif.aperture}</div>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>ISO Sensitivity:</span>
                <div>{activeMediaModal.exif.iso}</div>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <span style={{ color: '#64748b' }}>GPS Coordinates:</span>
                <div style={{ color: '#059669', fontWeight: 700 }}>{activeMediaModal.exif.gps}</div>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <span style={{ color: '#64748b' }}>UTC Timestamp:</span>
                <div>{activeMediaModal.exif.dateCaptured}</div>
              </div>
            </div>

            <div style={{
              padding: '12px 14px',
              borderRadius: '8px',
              background: '#fff7ed',
              border: '1px solid #fed7aa',
              fontSize: '0.8rem',
              color: '#9a3412',
              lineHeight: 1.5,
              marginBottom: '18px'
            }}>
              <strong style={{ color: '#c2410c' }}>Permitted Usage:</strong> {activeMediaModal.license} — Full permission granted for broadcast journalism, educational publishing, and digital science outreach with attribution.
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setActiveMediaModal(null)}
                className="btn-secondary"
              >
                Close
              </button>
              <button
                onClick={() => {
                  toggleCart(activeMediaModal.id);
                  setActiveMediaModal(null);
                }}
                className="btn-accent-orange"
              >
                Add to Media Press Kit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
