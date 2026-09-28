export const stationTemperatures = [
  { id: 'maitri', name: 'Maitri', temp: '-11.8°C', condition: 'Blizzard alert', icon: '❄️', color: '#8b5cf6', lat: '70.77° S', lon: '11.73° E', region: 'Antarctica (Schirmacher Oasis)', est: '1989' },
  { id: 'bharati', name: 'Bharati', temp: '-9.6°C', condition: 'Clear polar sky', icon: '❄️', color: '#0ea5e9', lat: '69.41° S', lon: '76.19° E', region: 'Antarctica (Larsemann Hills)', est: '2012' },
  { id: 'himadri', name: 'Himadri', temp: '-1.2°C', condition: 'Overcast & mist', icon: '🧊', color: '#f59e0b', lat: '78.92° N', lon: '11.93° E', region: 'Arctic (Svalbard, Norway)', est: '2008' },
  { id: 'himansh', name: 'Himansh', temp: '4.8°C', condition: 'Sunny high-altitude', icon: '🏔️', color: '#ef4444', lat: '32.40° N', lon: '77.61° E', region: 'Himalayas (Chandra Basin, 4080m)', est: '2016' },
];

export const quickActions = [
  { id: 'reports', title: 'Expedition Reports', desc: 'Read 40+ years of official voyage stories and mission logs', icon: 'FileText', screen: 'papers' },
  { id: 'datasets', title: 'Scientific Datasets', desc: 'Explore 700+ free polar datasets on weather, ice, and oceans', icon: 'Database', screen: 'data' },
  { id: 'publications', title: 'Publications', desc: 'Scientific discoveries explained in plain, simple English', icon: 'BookOpen', screen: 'research' },
  { id: 'media', title: 'Photos & Videos', desc: '4K field photos, drone videos, and wildlife recordings', icon: 'Film', screen: 'media' },
  { id: 'activities', title: 'Institutional Activities', desc: 'Follow Indian ship journeys, polar stations, and missions', icon: 'Compass', screen: 'expeditions' },
  { id: 'studio', title: 'Content Studio', desc: 'Turn research into easy news stories and social media posts', icon: 'Share2', screen: 'studio' },
];

export const expeditionStages = [
  { step: 1, title: 'Departure from Goa', date: 'Nov 2024', status: 'completed' },
  { step: 2, title: 'Voyage through Southern Ocean', date: 'Nov - Dec 2024', status: 'active' },
  { step: 3, title: 'Arrival at Antarctica', date: 'Dec 2024', status: 'upcoming' },
  { step: 4, title: 'Research Operations', date: 'Dec 2024 - Mar 2025', status: 'upcoming' },
  { step: 5, title: 'Return to India', date: 'Mar 2025', status: 'upcoming' },
];

export const explanationAudienceData = {
  researcher: {
    badge: 'Peer-Reviewed Technical Depth',
    title: 'Glacioclimatological Feedback Mechanics & Cryospheric Mass Balance',
    summary: 'Multi-satellite altimetry and MODIS albedo records indicate negative mass balance across peripheral ice shelves in Dronning Maud Land. Enhanced basal melting triggered by Circumpolar Deep Water (CDW) intrusion correlates with a 14% shift in local katabatic wind shear over the 2020-2025 observation window.',
    keyPoints: [
      'Altimetry variance: -3.8 cm/yr over coastal fringe shelves',
      'Katabatic boundary layer perturbation at 925 hPa geopotential',
      'Correlation coefficient r = 0.82 between CDW thermal pulse and grounding-line retreat'
    ]
  },
  college: {
    badge: 'College Student (Undergraduate Cryosphere Science)',
    title: 'Simplified Explanation (College Student Level)',
    summary: 'This research studies how Antarctic sea ice has changed over recent decades using satellite data and field observations. The results show a decreasing trend in some regions, which can affect global climate patterns, ocean circulation, and weather systems. Understanding these changes is important for predicting future climate impacts.',
    keyPoints: [
      'Sea ice acts like Earth’s sunshield by reflecting solar radiation back into space (albedo effect)',
      'Melting ice exposes darker ocean water, absorbing heat and accelerating warming cycles',
      'Freshwater runoff from melted glaciers disrupts deep-ocean conveyor currents (Thermohaline Circulation)'
    ]
  },
  school: {
    badge: 'School Student (Engaging & Accessible)',
    title: 'How Antarctica’s Giant Ice Blanket Protects Earth',
    summary: 'Think of Antarctica as Earth’s giant refrigerator! The white ice works like a huge mirror reflecting hot sunlight away from our planet. Scientists from India travel all the way to Antarctica on icebreaker ships to measure the ice thickness and help protect animals like penguins and polar seals.',
    keyPoints: [
      'Antarctica holds 90% of all the ice in the whole world',
      'Indian scientists live at Maitri and Bharati stations all winter long in -30°C cold',
      'Saving polar ice helps prevent sea levels from rising and flooding coastal cities'
    ]
  },
  general: {
    badge: 'General Public (Clear, Actionable & Relatable)',
    title: 'India’s Window to the Polar Regions: Why Antarctic Ice Matters to You',
    summary: 'What happens at the South Pole does not stay at the South Pole. India’s polar expeditions conducted by the National Centre for Polar and Ocean Research (NCPOR) monitor how changes in polar ice directly drive the intensity of the Indian Monsoon and global sea level stability.',
    keyPoints: [
      'Direct link between Antarctic ocean temperatures and Indian monsoon rainfall reliability',
      'NCPOR maintains round-the-clock scientific stations in Antarctica, Arctic, and Himalayas',
      'Public access to open-source environmental datasets ensures transparent climate research'
    ]
  }
};
