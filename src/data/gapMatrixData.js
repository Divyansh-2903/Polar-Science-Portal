// Direct Benchmark & Gap Matrix comparing NCPOR / NPDC legacy system with Polar Vidya
export const gapMatrix = [
  {
    id: 'search',
    category: 'Dataset Search',
    ncporCurrent: 'Keyword search, location dropdown, and static filters across separate subdomains',
    polarisInnovation: 'Natural English Search for documents, records, 4K photos, and drone videos',
    gapType: 'Discovery & Search',
    impact: 'Search in everyday language (e.g. "blizzard over Bharati station") instead of memorizing difficult codes.'
  },
  {
    id: 'location',
    category: 'Location & Geography',
    ncporCurrent: 'Static latitude/longitude numbers and flat unclickable boxes',
    polarisInnovation: 'Interactive 3D Polar Map with station views and real ship voyage routes',
    gapType: 'Interactive Maps',
    impact: 'Connects research stations directly to real ship routes, weather stations, and expedition history.'
  },
  {
    id: 'charts',
    category: 'Online Charts & Data',
    ncporCurrent: 'Disconnected external links (data.ncpor.res.in) with static pictures; raw spreadsheet downloads required',
    polarisInnovation: 'Instant Chart Maker: ask in plain English and see graphs right on screen',
    gapType: 'Instant Charts',
    impact: 'Anyone can type "Show Bharati temperature" and get an interactive chart in seconds without coding.'
  },
  {
    id: 'reports',
    category: 'Technical Reports & PDFs',
    ncporCurrent: 'Dense 50-100 page PDF reports stored in old archives inaccessible to students',
    polarisInnovation: 'Fact-Checked AI with exact page references from official expedition books',
    gapType: 'Easy Reading',
    impact: 'Guarantees 100% true facts: students and journalists see exact official report pages with zero AI guessing.'
  },
  {
    id: 'library',
    category: 'Library & Publications',
    ncporCurrent: 'Scattered library links, old database pages, and external journal paywalls',
    polarisInnovation: 'Everything Connected: research papers, scientists, voyage logs, and photos link together',
    gapType: 'Connected Hub',
    impact: 'One simple system where every discovery links directly to the station, voyage, and photos.'
  },
  {
    id: 'directory',
    category: 'Polar Directory',
    ncporCurrent: 'Unlinked list of scientist names with no way to contact them',
    polarisInnovation: 'Talk to Polar Scientists: ask questions directly to Indian expedition leaders',
    gapType: 'Direct Connection',
    impact: 'Brings scientists and students together: ask real researchers about polar wildlife and winter life.'
  },
  {
    id: 'outreach',
    category: 'Outreach & Dissemination',
    ncporCurrent: 'Rare press bulletins with no easy school lessons or social media updates',
    polarisInnovation: 'Content Studio with Scientist Review: creates easy school lessons and news updates',
    gapType: 'Public Stories',
    impact: 'Turns 1 heavy report into school lessons, news stories, and quizzes, approved by real scientists.'
  }
];

export const theSixGaps = [
  {
    letter: 'A',
    title: 'Connection Gap',
    question: 'Are research papers, scientists, voyages, bases, datasets, and photos connected in one place?',
    solution: 'One connected network linking papers, bases, datasets, and photos together.'
  },
  {
    letter: 'B',
    title: 'Understanding Gap',
    question: 'Can a school student ask: "Explain this research paper in simple words"?',
    solution: 'Plain English explainer rewritten for school students, college learners, and the public.'
  },
  {
    letter: 'C',
    title: 'Discovery Gap',
    question: 'Can someone search by meaning rather than having to type exact scientific terms?',
    solution: 'Smart search across documents, 4K photos, and drone videos in simple English.'
  },
  {
    letter: 'D',
    title: 'Data Interaction Gap',
    question: 'Can someone ask: "Show temperature trend at Bharati" and get an instant interactive chart?',
    solution: 'Instant in-browser chart generator that turns everyday questions into interactive graphs.'
  },
  {
    letter: 'E',
    title: 'Outreach Multiplier Gap',
    question: 'Can one scientific paper become student lessons, news articles, and social media updates?',
    solution: 'Content Studio turning complex research into news updates and school lessons with scientist sign-off.'
  },
  {
    letter: 'F',
    title: 'Human Expertise Gap',
    question: 'Can students and citizens ask: "Who is working on this, and what is life like on the ice?"',
    solution: 'Direct question gateway to ask real Indian expedition scientists about their research.'
  }
];
