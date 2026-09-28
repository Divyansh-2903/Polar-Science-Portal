import React, { useState } from 'react';
import { AskTheDataView } from './AskTheDataView';
import { AskTheData } from './AskTheData';
import { KnowledgeRepository } from './KnowledgeRepository';
import { 
  BarChart3, 
  Database, 
  Sparkles, 
  Layers, 
  Search, 
  FileSpreadsheet, 
  CheckCircle2, 
  Info,
  Sliders
} from 'lucide-react';

export function DatasetsHub({ preselectedDatasetId }) {
  const [activeSubTab, setActiveSubTab] = useState('visualizer'); // 'visualizer' | 'query' | 'repository'

  return (
    <div style={{ width: '100%', maxWidth: 1600, margin: '0 auto', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Header Banner */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '20px',
        padding: '24px 28px',
        boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px'
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#eff6ff',
            color: '#1e6ef5',
            padding: '3px 10px',
            borderRadius: '99px',
            fontSize: '0.74rem',
            fontWeight: 700,
            marginBottom: '8px'
          }}>
            <Database size={13} />
            <span>Indian Polar Data Center · 700+ Verified Datasets</span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
            Data & Interactive Charts
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0, maxWidth: 840, lineHeight: 1.55 }}>
            Explore real weather records, glacier measurements, and ocean surveys across Antarctica, the Arctic, and the Himalayas. Create interactive charts online or download raw data files for free.
          </p>
        </div>

        {/* Sub-Navigation Switcher Tabs */}
        <div style={{
          display: 'flex',
          background: '#f1f5f9',
          padding: '4px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          gap: '4px'
        }}>
          <button
            onClick={() => setActiveSubTab('visualizer')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: activeSubTab === 'visualizer' ? 700 : 600,
              color: activeSubTab === 'visualizer' ? '#1e6ef5' : '#64748b',
              background: activeSubTab === 'visualizer' ? '#ffffff' : 'transparent',
              boxShadow: activeSubTab === 'visualizer' ? '0 1px 3px rgba(15, 23, 42, 0.08)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.16s ease'
            }}
          >
            <BarChart3 size={15} />
            <span>Interactive Charts</span>
          </button>

          <button
            onClick={() => setActiveSubTab('query')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: activeSubTab === 'query' ? 700 : 600,
              color: activeSubTab === 'query' ? '#1e6ef5' : '#64748b',
              background: activeSubTab === 'query' ? '#ffffff' : 'transparent',
              boxShadow: activeSubTab === 'query' ? '0 1px 3px rgba(15, 23, 42, 0.08)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.16s ease'
            }}
          >
            <Sparkles size={15} />
            <span>Natural Language Plotter</span>
          </button>

          <button
            onClick={() => setActiveSubTab('repository')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: activeSubTab === 'repository' ? 700 : 600,
              color: activeSubTab === 'repository' ? '#1e6ef5' : '#64748b',
              background: activeSubTab === 'repository' ? '#ffffff' : 'transparent',
              boxShadow: activeSubTab === 'repository' ? '0 1px 3px rgba(15, 23, 42, 0.08)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.16s ease'
            }}
          >
            <Database size={15} />
            <span>Dataset Catalog (700+)</span>
          </button>
        </div>
      </div>

      {/* Main SubTab Content View */}
      <div>
        {activeSubTab === 'visualizer' && (
          <div style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '24px 28px', boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)' }}>
            <AskTheDataView />
          </div>
        )}

        {activeSubTab === 'query' && (
          <div style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)' }}>
            <AskTheData preselectedDatasetId={preselectedDatasetId} />
          </div>
        )}

        {activeSubTab === 'repository' && (
          <div style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)' }}>
            <KnowledgeRepository onExploreDataset={() => setActiveSubTab('visualizer')} />
          </div>
        )}
      </div>

    </div>
  );
}
