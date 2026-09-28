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
  Package,
  Layers,
  ArrowRight
} from 'lucide-react';

export function MediaVault({ onNavigate }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPole, setSelectedPole] = useState('All');
  const [activeMediaModal, setActiveMediaModal] = useState(null);
  const [pressKitCart, setPressKitCart] = useState([]);
  const [cartFeedback, setCartFeedback] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState(null);

  const categories = ['All', 'Station Architecture', 'Scientific Fieldwork', 'Polar Biodiversity', 'Aerial Photogrammetry', 'Expedition Operations'];

  const filteredAssets = mediaAssets.filter(asset => {
    const matchesSearch = 
      asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.clipEmbeddingsDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || asset.category === selectedCategory;
    const matchesPole = selectedPole === 'All' || asset.pole.toLowerCase() === selectedPole.toLowerCase();

    return matchesSearch && matchesCategory && matchesPole;
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

  // Direct download for single high-res asset
  const handleDownloadSingle = (asset) => {
    const link = document.createElement('a');
    link.href = asset.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.download = `ncpor_${asset.id}_${asset.station}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadNotice(`✓ Download started for "${asset.title}"`);
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  // Download entire selected batch as manifest
  const handleDownloadBatch = () => {
    const selectedItems = mediaAssets.filter(a => pressKitCart.includes(a.id));
    const manifest = {
      package: 'NCPOR / MoES Official Media Press Kit',
      exportedAt: new Date().toISOString(),
      license: 'Creative Commons CC-BY 4.0 Open Access',
      attribution: 'National Centre for Polar and Ocean Research, Ministry of Earth Sciences, India',
      itemsCount: selectedItems.length,
      files: selectedItems.map(item => ({
        id: item.id,
        title: item.title,
        station: item.station,
        pole: item.pole,
        url: item.url,
        resolution: item.resolution,
        exif: item.exif,
        tags: item.tags,
        semanticDescription: item.clipEmbeddingsDescription
      }))
    };

    const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ncpor_press_kit_manifest_${selectedItems.length}_files.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadNotice(`✓ Exported Press Kit package with ${selectedItems.length} assets`);
    setTimeout(() => setDownloadNotice(null), 3500);
  };

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', padding: '10px 0 40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px',
        padding: '24px',
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)'
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#fff7ed',
            color: '#ea580c',
            padding: '3px 10px',
            borderRadius: '99px',
            fontSize: '0.74rem',
            fontWeight: 700,
            marginBottom: '8px'
          }}>
            <Sparkles size={13} />
            <span>High-Resolution Photo & Video Vault · 4K Field Media</span>
          </div>
          <h1 style={{ fontSize: '1.55rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
            Photo & Video Vault
          </h1>
          <p style={{ maxWidth: 840, margin: 0, fontSize: '0.86rem', color: '#64748b', lineHeight: 1.55 }}>
            Explore high-resolution photographs, drone photogrammetry, and expedition recordings captured by Indian polar scientists across Antarctica, the Arctic, and the Himalayas. Free for school, news, and research use under CC-BY 4.0.
          </p>
        </div>

        {/* Press Kit Download Cart */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          background: '#f8fafc',
          padding: '12px 18px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0'
        }}>
          <Package size={22} color="#ea580c" />
          <div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>Selected Downloads</div>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>
              {pressKitCart.length} Files Selected
            </div>
          </div>
          <button
            disabled={pressKitCart.length === 0}
            onClick={handleDownloadBatch}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 700,
              background: pressKitCart.length > 0 ? '#ea580c' : '#cbd5e1',
              color: '#ffffff',
              border: 'none',
              cursor: pressKitCart.length > 0 ? 'pointer' : 'not-allowed',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: pressKitCart.length > 0 ? '0 2px 6px rgba(234, 88, 12, 0.3)' : 'none'
            }}
          >
            <Download size={14} />
            <span>Download ZIP</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {cartFeedback && (
        <div style={{
          padding: '10px 16px',
          borderRadius: '8px',
          background: '#ecfdf5',
          border: '1px solid #a7f3d0',
          color: '#059669',
          fontSize: '0.82rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle2 size={16} />
          <span>Added to your download list with full high-resolution files.</span>
        </div>
      )}

      {downloadNotice && (
        <div style={{
          padding: '10px 16px',
          borderRadius: '8px',
          background: '#eff6ff',
          border: '1px solid #bfdbfe',
          color: '#1e6ef5',
          fontSize: '0.82rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle2 size={16} />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* Search & Categories Toolbar */}
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
        {/* Search Input */}
        <div style={{ flex: 1, minWidth: '260px', position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={16} color="#64748b" style={{ position: 'absolute', left: '14px' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search photos & videos: e.g. 'penguins', 'station', 'glacier', 'aurora'…"
            style={{
              width: '100%',
              padding: '9px 14px 9px 40px',
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              color: '#0f172a',
              fontSize: '0.85rem',
              outline: 'none',
              fontFamily: 'var(--font-body)'
            }}
          />
        </div>

        {/* Region Filter */}
        <div style={{ display: 'flex', gap: '4px' }}>
          {['All', 'Antarctica', 'Arctic', 'Himalayas'].map(pole => (
            <button
              key={pole}
              onClick={() => setSelectedPole(pole)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 600,
                background: selectedPole === pole ? '#1e6ef5' : '#f1f5f9',
                color: selectedPole === pole ? '#ffffff' : '#64748b',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.14s ease'
              }}
            >
              {pole}
            </button>
          ))}
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {categories.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '999px',
                  fontSize: '0.76rem',
                  fontWeight: isSelected ? 700 : 500,
                  background: isSelected ? '#ea580c' : '#f1f5f9',
                  color: isSelected ? '#ffffff' : '#475569',
                  border: isSelected ? '1px solid #ea580c' : '1px solid #e2e8f0',
                  cursor: 'pointer',
                  transition: 'all 0.14s ease'
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
        gap: '20px'
      }}>
        {filteredAssets.map((asset) => {
          const inCart = pressKitCart.includes(asset.id);
          return (
            <div
              key={asset.id}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.16s ease, box-shadow 0.16s ease'
              }}
            >
              {/* Media Thumbnail */}
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden', background: '#0f172a' }}>
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
                  background: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(8px)',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  fontFamily: 'monospace',
                  color: '#38bdf8',
                  border: '1px solid rgba(56, 189, 248, 0.25)'
                }}>
                  {asset.resolution}
                </div>

                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '14px',
                  right: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.74rem',
                  color: '#f8fafc',
                  fontFamily: 'monospace'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={12} color="#fb923c" />
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
                      {asset.category} · {asset.pole}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>
                      CC-BY 4.0
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.08rem', color: '#0f172a', fontWeight: 700, lineHeight: 1.35, margin: '0 0 8px 0' }}>
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
                    marginBottom: '10px',
                    lineHeight: 1.45
                  }}>
                    <strong style={{ color: '#0284c7' }}>Caption:</strong> "{asset.clipEmbeddingsDescription}"
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {asset.tags.map((tag, i) => (
                      <span key={i} style={{ 
                        fontSize: '0.7rem', 
                        color: '#475569',
                        background: '#f1f5f9',
                        padding: '2px 7px',
                        borderRadius: '4px'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions Row */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setActiveMediaModal(asset)}
                      style={{
                        flex: 1,
                        padding: '8px 10px',
                        borderRadius: '8px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        background: '#f1f5f9',
                        border: '1px solid #e2e8f0',
                        color: '#475569',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <Camera size={14} />
                      <span>View EXIF</span>
                    </button>

                    <button
                      onClick={() => toggleCart(asset.id)}
                      style={{
                        flex: 1,
                        padding: '8px 10px',
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
                        cursor: 'pointer'
                      }}
                    >
                      <Package size={14} />
                      <span>{inCart ? '✓ In Press Kit' : '+ Add to Kit'}</span>
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleDownloadSingle(asset)}
                      style={{
                        flex: 1,
                        padding: '7px 10px',
                        borderRadius: '8px',
                        fontSize: '0.76rem',
                        fontWeight: 600,
                        background: '#ffffff',
                        border: '1px solid #cbd5e1',
                        color: '#0f172a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      <Download size={13} />
                      <span>Download Image</span>
                    </button>

                    {onNavigate && (
                      <button
                        onClick={() => onNavigate('outreach')}
                        style={{
                          flex: 1,
                          padding: '7px 10px',
                          borderRadius: '8px',
                          fontSize: '0.76rem',
                          fontWeight: 700,
                          background: '#eff6ff',
                          border: '1px solid #bfdbfe',
                          color: '#1e6ef5',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        <Share2 size={13} />
                        <span>Send to Studio</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* EXIF Metadata Modal */}
      {activeMediaModal && (
        <div 
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3000,
            padding: '20px'
          }}
          onClick={() => setActiveMediaModal(null)}
        >
          <div 
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              maxWidth: '620px',
              width: '100%',
              padding: '28px',
              maxHeight: '85vh',
              overflowY: 'auto',
              border: '1px solid #e2e8f0',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#ea580c', textTransform: 'uppercase' }}>
                  Camera & GPS Metadata
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '4px 0 0 0' }}>
                  {activeMediaModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveMediaModal(null)}
                style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '1.2rem', cursor: 'pointer' }}
                aria-label="Close EXIF modal"
              >
                ✕
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '12px',
              background: '#f8fafc',
              padding: '16px',
              borderRadius: '12px',
              fontFamily: 'monospace',
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
              <strong style={{ color: '#c2410c' }}>Permitted Usage:</strong> {activeMediaModal.license} — Free for schools, news broadcasting, and public education with credit.
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setActiveMediaModal(null)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  background: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  color: '#475569',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
              <button
                onClick={() => handleDownloadSingle(activeMediaModal)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  background: '#ea580c',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Download File
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
