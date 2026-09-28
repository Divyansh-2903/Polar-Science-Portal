// Direct Benchmark & Gap Matrix comparing NCPOR / NPDC legacy system with Polaris Portal
export const gapMatrix = [
  {
    id: 'search',
    category: 'Dataset Search',
    ncporCurrent: 'Keyword search, location dropdown, and static filters across separate subdomains',
    polarisInnovation: 'Semantic AI & Multimodal Search (hybrid BM25 + dense vectors, CLIP for photos & drone video)',
    gapType: 'Discovery & Multimodal',
    impact: 'Enables discovery by meaning (e.g. "convoy crossing crevasse") rather than memorized scientific jargon.'
  },
  {
    id: 'location',
    category: 'Location & Geography',
    ncporCurrent: 'Static latitude/longitude text and non-interactive bounding boxes',
    polarisInnovation: 'Connected Knowledge Map with Dual-Polar Stereographic Projections (EPSG:3031 Antarctic / EPSG:3413 Arctic)',
    gapType: 'Connection & Spatial',
    impact: 'Connects station geography directly to expedition routes, research vessels, and historical telemetry.'
  },
  {
    id: 'charts',
    category: 'Online Charts & Data',
    ncporCurrent: 'Disconnected external links (data.ncpor.res.in) with static plots; raw CSV downloads required',
    polarisInnovation: '"Ask-the-Data" Natural Language Engine (Query ➔ dynamic interactive plots + stats + cited download)',
    gapType: 'Data Interaction',
    impact: 'Anyone can ask "Show temperature trend at Bharati" and see an instant interactive chart in seconds.'
  },
  {
    id: 'reports',
    category: 'Technical Reports & PDFs',
    ncporCurrent: 'Dense 50-100 page PDF reports stored in DSpace repository inaccessible to public',
    polarisInnovation: 'Evidence-Grounded AI with Source-Span Highlighting (cites exact report paragraph; zero hallucination)',
    gapType: 'Understanding',
    impact: 'Protects scientific integrity: students and journalists get verified facts with direct source highlight.'
  },
  {
    id: 'library',
    category: 'Library & Publications',
    ncporCurrent: 'Fragmented library lists, DSpace servers, and external Scopus links',
    polarisInnovation: 'Unified Knowledge Graph linking: Paper ➔ Scientist ➔ Expedition ➔ Station ➔ Dataset ➔ 4K Media',
    gapType: 'Connection',
    impact: 'One interconnected ecosystem where every polar asset connects to its field mission.'
  },
  {
    id: 'directory',
    category: 'Polar Directory',
    ncporCurrent: 'Unlinked static directory of scientist names without active engagement',
    polarisInnovation: 'Researcher Expertise Graph & "Ask a Scientist" Public Engagement Gateway',
    gapType: 'Human Expertise',
    impact: 'Revives NCPOR\'s historic outreach mandate by connecting citizen questions to active expedition PIs.'
  },
  {
    id: 'outreach',
    category: 'Outreach & Dissemination',
    ncporCurrent: 'Infrequent manual press bulletins; zero automated science communication pipelines',
    polarisInnovation: 'AI-Assisted Outreach Studio + Editorial Review Queue + Campaign Dissemination Calendar',
    gapType: 'Outreach Multiplier & Governance',
    impact: 'Converts 1 research report into School Explainer, PIB Press Release, and Social Threads with scientist approval.'
  }
];

export const theSixGaps = [
  {
    letter: 'A',
    title: 'Connection Gap',
    question: 'Are paper ➔ researcher ➔ expedition ➔ station ➔ dataset ➔ photo connected?',
    solution: 'Unified Entity Knowledge Graph linking every expedition asset across all Three Poles.'
  },
  {
    letter: 'B',
    title: 'Understanding Gap',
    question: 'Can a normal school student ask: "Explain this research paper to me"?',
    solution: 'Evidence-grounded Multi-tier Explainer (Middle School, Undergraduate, Press) locked to source text.'
  },
  {
    letter: 'C',
    title: 'Discovery Gap',
    question: 'Can someone search by meaning rather than exact keywords?',
    solution: 'Multimodal CLIP-based and semantic dense vector retrieval across text, photos, and video.'
  },
  {
    letter: 'D',
    title: 'Data Interaction Gap',
    question: 'Can someone ask: "Show temperature trend at Bharati" and get: dataset + chart + explanation + source?',
    solution: '"Ask-the-Data" instant in-browser charting engine with statistical summary and ISO 19115 provenance.'
  },
  {
    letter: 'E',
    title: 'Outreach Multiplier Gap',
    question: 'Can one scientific paper become student explanations, articles, infographics, and social threads?',
    solution: 'Outreach Studio generating 4 distinct formats from a single document with editorial review.'
  },
  {
    letter: 'F',
    title: 'Human Expertise Gap',
    question: 'Can a user discover: "Who are the researchers working on this topic?"',
    solution: 'Interactive Polar Directory with expertise clustering and integrated "Ask a Scientist" Q&A.'
  }
];
