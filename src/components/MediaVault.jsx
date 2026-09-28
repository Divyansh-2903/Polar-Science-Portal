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
          gap: '12px',
          background: 'rgba(5, 11, 20, 0.7)',
          padding: '8px 16px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)'
        }}>
          <Package size={20} color="var(--accent-orange)" aria-hidden="true" />
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Media Press Kit Cart</div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
              {pressKitCart.length} Assets Selected
            </div>
          </div>
          <button
            disabled={pressKitCart.length === 0}
            className="btn-accent-orange"
            style={{ padding: '6px 14px', fontSize: '0.8rem', opacity: pressKitCart.length === 0 ? 0.5 : 1 }}
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
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(249, 115, 22, 0.15)',
          border: '1px solid var(--border-orange)',
          color: '#fdba74',
          fontSize: '0.85rem',
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
        background: 'rgba(13, 26, 48, 0.65)',
        padding: '16px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)'
      }}>
        <div style={{ flex: 1, minWidth: '300px', position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={18} color="var(--text-dim)" style={{ position: 'absolute', left: '14px' }} aria-hidden="true" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by meaning: e.g. 'convoy traverse', 'piston coring on pack ice', 'penguin'…"
            style={{
              width: '100%',
              padding: '10px 14px 10px 42px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              color: '#ffffff',
              fontSize: '0.88rem'
            }}
          />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '7px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: 600,
                background: selectedCategory === cat ? 'rgba(249, 115, 22, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                color: selectedCategory === cat ? 'var(--accent-orange)' : 'var(--text-muted)',
                border: selectedCategory === cat ? '1px solid var(--border-orange)' : '1px solid transparent',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
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
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--accent-orange)', fontWeight: 700 }}>
                      {asset.category}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                      {asset.license.split(' ')[0]} {asset.license.split(' ')[1]}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.1rem', color: '#ffffff', lineHeight: 1.35, marginBottom: '8px' }}>
                    {asset.title}
                  </h3>

                  {/* Semantic Description Tag */}
                  <div style={{
                    fontSize: '0.76rem',
                    color: 'var(--text-muted)',
                    background: 'rgba(5, 11, 20, 0.5)',
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '10px'
                  }}>
                    <strong style={{ color: 'var(--accent-cyan)' }}>CLIP Semantic Index:</strong> "{asset.clipEmbeddingsDescription}"
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {asset.tags.map((tag, i) => (
                      <span key={i} style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '10px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
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
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      background: inCart ? 'rgba(16, 185, 129, 0.2)' : 'rgba(249, 115, 22, 0.15)',
                      color: inCart ? 'var(--accent-aurora)' : 'var(--accent-orange)',
                      border: inCart ? '1px solid var(--border-aurora)' : '1px solid var(--border-orange)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <Package size={14} aria-hidden="true" />
                    <span>{inCart ? 'In Press Kit' : '+ Add to Press Kit'}</span>
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
          backgroundColor: 'rgba(4, 8, 16, 0.85)',
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
                <h3 style={{ fontSize: '1.2rem', color: '#ffffff' }}>{activeMediaModal.title}</h3>
              </div>
              <button
                onClick={() => setActiveMediaModal(null)}
                style={{ color: 'var(--text-muted)', fontSize: '1.2rem', padding: '4px 8px' }}
                aria-label="Close EXIF modal"
              >
                ✕
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              background: 'rgba(5, 11, 20, 0.75)',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: '#e2e8f0',
              marginBottom: '16px',
              border: '1px solid rgba(56, 189, 248, 0.15)'
            }}>
              <div>
                <span style={{ color: 'var(--text-dim)' }}>Camera Body:</span>
                <div style={{ fontWeight: 600, color: 'var(--accent-cyan)' }}>{activeMediaModal.exif.camera}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)' }}>Lens Spec:</span>
                <div style={{ fontWeight: 600 }}>{activeMediaModal.exif.lens}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)' }}>Focal Length:</span>
                <div>{activeMediaModal.exif.focalLength}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)' }}>Shutter Speed:</span>
                <div>{activeMediaModal.exif.shutter}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)' }}>Aperture:</span>
                <div>{activeMediaModal.exif.aperture}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)' }}>ISO Sensitivity:</span>
                <div>{activeMediaModal.exif.iso}</div>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <span style={{ color: 'var(--text-dim)' }}>GPS Coordinates:</span>
                <div style={{ color: 'var(--accent-aurora)' }}>{activeMediaModal.exif.gps}</div>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <span style={{ color: 'var(--text-dim)' }}>UTC Timestamp:</span>
                <div>{activeMediaModal.exif.dateCaptured}</div>
              </div>
            </div>

            <div style={{
              padding: '12px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(249, 115, 22, 0.1)',
              border: '1px solid rgba(249, 115, 22, 0.3)',
              fontSize: '0.78rem',
              color: '#fdba74',
              marginBottom: '18px'
            }}>
              <strong>Permitted Usage:</strong> {activeMediaModal.license} — Full permission granted for broadcast journalism, educational publishing, and digital science outreach with attribution.
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
