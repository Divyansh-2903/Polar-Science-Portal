// Authentic Indian Polar Science Knowledge Corpus & Entity Graph
// Covering Antarctica, Arctic, and Himalayas (The Three Poles)

export const polarStations = [
  {
    id: 'bharati',
    name: 'Bharati Station',
    pole: 'Antarctica',
    region: 'Larsemann Hills, East Antarctica',
    coordinates: { lat: -69.407, lng: 76.194 },
    altitude: '35 m ASL',
    commissioned: 2012,
    status: 'Active (Year-Round)',
    type: 'Permanent Scientific Research Base',
    currentWeather: {
      temperature: -24.8,
      windSpeed: 42.5,
      windDirection: 'ESE',
      pressure: 984.2,
      solarRadiation: 120.4,
      seasonState: 'Approaching Austral Spring / Polar Daylight: 14h 22m',
      condition: 'Clear Sky with Drifting Snow'
    },
    description: 'India\'s state-of-the-art third Antarctic base, constructed from 134 prefabricated ISO shipping containers. Features an aerodynamic envelope designed to withstand hurricane-force katabatic winds without snow buildup.',
    disciplines: ['Atmospheric Physics', 'Upper Atmosphere Meteorology', 'Oceanography', 'Glaciology', 'Earth Geodesy'],
    image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
    schematic: 'Modular Container Grid (ISO 668), Aerodynamic Stilt Elevation, Waste-Heat Recirculation'
  },
  {
    id: 'maitri',
    name: 'Maitri Station',
    pole: 'Antarctica',
    region: 'Schirmacher Oasis, Queen Maud Land',
    coordinates: { lat: -70.766, lng: 11.733 },
    altitude: '117 m ASL',
    commissioned: 1989,
    status: 'Active (Year-Round)',
    type: 'Permanent Scientific Research Base',
    currentWeather: {
      temperature: -29.2,
      windSpeed: 58.1,
      windDirection: 'SE',
      pressure: 978.6,
      solarRadiation: 94.0,
      seasonState: 'Austral Spring Transition / Daylight: 13h 48m',
      condition: 'Katabatic Wind Gusts'
    },
    description: 'India\'s historic second permanent station located in the ice-free rocky Schirmacher Oasis beside Lake Priyadarshini. A hub for solid-earth geomagnetism, seismology, and paleoclimate sediment coring.',
    disciplines: ['Geomagnetism', 'Seismology', 'Paleoclimatology', 'Environmental Chemistry', 'Lake Biology'],
    image: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=1200&q=80',
    schematic: 'Rock Foundation Oasis Station with Priyadarshini Water Extraction Loop'
  },
  {
    id: 'himadri',
    name: 'Himadri Research Station',
    pole: 'Arctic',
    region: 'Ny-Ålesund, Spitsbergen, Svalbard, Norway',
    coordinates: { lat: 78.924, lng: 11.928 },
    altitude: '15 m ASL',
    commissioned: 2008,
    status: 'Active (Summer & Seasonal Winter)',
    type: 'High-Latitude International Arctic Laboratory',
    currentWeather: {
      temperature: -4.6,
      windSpeed: 18.2,
      windDirection: 'NNW',
      pressure: 1012.8,
      solarRadiation: 48.0,
      seasonState: 'Boreal Autumn / Daylight Diminishing: 9h 10m',
      condition: 'Overcast Fjord Sea Fog'
    },
    description: 'India\'s permanent scientific presence in the high Arctic at 79°N. Focuses on aerosol chemistry, black carbon deposition, microbial diversity in cryosoils, and fjord environmental dynamics.',
    disciplines: ['Aerosol Chemistry', 'Cryosphere Dynamics', 'Arctic Microbiology', 'Fjord Biogeochemistry'],
    image: 'https://images.unsplash.com/photo-1548263594-a71ea65a8598?auto=format&fit=crop&w=1200&q=80',
    schematic: 'Kings Bay Heritage Wooden Facility, Air Sampling Tower, Micro-Aethalometer Lab'
  },
  {
    id: 'indarc',
    name: 'IndARC Moored Observatory',
    pole: 'Arctic',
    region: 'Kongsfjorden Fjord, Svalbard',
    coordinates: { lat: 78.983, lng: 12.016 },
    altitude: '-192 m (Sub-surface Mooring)',
    commissioned: 2014,
    status: 'Active (Autonomous Underwater)',
    type: 'Multi-Sensor Underwater Moored Ocean Observatory',
    currentWeather: {
      temperature: 1.8, // Water temp at 45m
      windSpeed: 0,
      windDirection: 'Current: 0.24 m/s NW',
      pressure: 1015.0,
      solarRadiation: 0,
      seasonState: 'Atlantic Water Inflow Phase',
      condition: 'Deep Fjord Pelagic Current'
    },
    description: 'India\'s first underwater moored observatory deployed in the Arctic. Anchored at 192 meters depth, it collects continuous hydrographic data (CTD, current profiles, nutrients) across seasonal ice cycles without being destroyed by surface pack ice.',
    disciplines: ['Fjord Hydrography', 'Atlantic Water Mass Tracking', 'Marine Acoustics', 'Deep CTD Profiling'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    schematic: 'Sub-surface Buoyancy Float Array, Acoustic Doppler Current Profiler, SBE CTD Chain'
  },
  {
    id: 'himansh',
    name: 'Himansh Cryosphere Station',
    pole: 'Himalayas',
    region: 'Chandra Basin, Lahaul-Spiti, Himachal Pradesh',
    coordinates: { lat: 32.408, lng: 77.625 },
    altitude: '4,080 m ASL',
    commissioned: 2016,
    status: 'Active (High Altitude Cryosphere Station)',
    type: 'Third Pole Glacier Monitoring Base',
    currentWeather: {
      temperature: -2.1,
      windSpeed: 24.0,
      windDirection: 'W',
      pressure: 618.5,
      solarRadiation: 780.0,
      seasonState: 'Post-Monsoon Ablation Period / High UV Flux',
      condition: 'Crisp Glacial Radiation'
    },
    description: 'High-altitude research station located in the Western Himalayas above 4,000 meters. Dedicated to monitoring glacier melt, mass balance equilibrium lines, and meltwater discharge across Siachen, Chhota Shigri, and Samudra Tapu glaciers.',
    disciplines: ['Glacier Mass Balance', 'Discharge Hydrology', 'High Altitude Meteorology', 'Snow Albedo Studies'],
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    schematic: 'Insulated High-Altitude Bivouac, Automated Weather Mast, Sonic Snow Depth Gauges'
  }
];

export const expeditionReports = [
  {
    id: 'rep-41-iae',
    title: '41st Indian Antarctic Expedition Technical Report: Extreme Meteorological Events and Glaciological Mass Balance at Bharati & Maitri Stations',
    shortTitle: '41st IAE Technical Report',
    expedition: '41st Indian Scientific Expedition to Antarctica (2021-2022)',
    station: 'bharati',
    leadAuthor: 'Dr. Rahul Sharma (Scientist-F, NCPOR Cryosphere Division)',
    coAuthors: ['Dr. P. V. Nair', 'Er. Sandeep Chauhan', 'Dr. Miriam Verghese'],
    publicationDate: '2022-11-15',
    doi: '10.5281/zenodo.ncpor.41iae.2022.01',
    dublinCore: {
      title: 'Meteorological & Glaciological Dynamics of Larsemann Hills',
      creator: 'National Centre for Polar and Ocean Research (NCPOR)',
      subject: 'Antarctica; Meteorology; Blizzards; Glaciology; Automatic Weather Stations',
      coverageSpatial: 'Larsemann Hills (69°24\'S, 76°11\'E) and Schirmacher Oasis (70°45\'S, 11°43\'E)',
      coverageTemporal: '2021-12-01 to 2022-03-31',
      format: 'Technical Report / NetCDF Attached',
      identifier: 'NCPOR-TR-41-IAE-MET-01'
    },
    abstract: 'Comprehensive observations from the 41st IAE field season document unprecedented synoptic blizzard events across eastern Antarctica. Continuous AWS telemetry recorded sustained wind velocities exceeding 100 km/h with localized gusts reaching 134 km/h during the August polar storm, accompanied by a sharp drop in surface pressure to 962 hPa. Surface snow accumulation stakes showed net negative ablation on blue-ice moraines offset by severe drifting deposition along the northern leeward container facade of Bharati Station.',
    sourceParagraphs: [
      {
        id: 'p1',
        section: '1. Field Expedition Deployment & Spatial Envelope',
        text: 'The 41st Indian Scientific Expedition to Antarctica was deployed aboard the chartered ice-class vessel MV Vasiliy Golovnin, reaching the Larsemann Hills ice-edge margin on 24 December 2021. Primary scientific teams operated between Bharati Station (69°24\'S, 76°11\'E) and the inland traverse route connecting toward the Amery Ice Shelf junction.'
      },
      {
        id: 'p2',
        section: '3. Synoptic Blizzard Extremes & Telemetry Validation',
        text: 'During the winter blizzard sequence of 14-17 August 2022 at Bharati Station, automated sonic anemometers measured sustained winds of 102 km/h, with peak instantaneous gusts hitting 134 km/h. Concurrently, ambient ambient air temperatures plummeted to -38.4°C, resulting in a calculated wind chill equivalent of -61.2°C. Barometric pressure plunged by 28 hPa over 18 hours to a seasonal minimum of 962.4 hPa.'
      },
      {
        id: 'p3',
        section: '4. Cryospheric Mass Balance & Sastrugi Formation',
        text: 'Ablation stake networks established across the Dronning Maud Land transect registered an average net annual accumulation of 21.4 g/cm² water equivalent. Longitudinal sastrugi ridges with mean wave heights of 0.85 meters formed predominantly along an azimuth of 135 degrees, driven by relentless southeasterly katabatic drainage from the polar plateau.'
      },
      {
        id: 'p4',
        section: '6. Station Engineering & Thermal Efficiency',
        text: 'Bharati Station\'s double-insulated containerized envelope sustained an indoor operational comfort baseline of +21°C throughout the storm cycle, utilizing 42% thermal cogeneration recovered from the combined heat and power (CHP) diesel generation plant, preventing freeze-up in the central graywater treatment circuit.'
      }
    ],
    sampleGroundedPosts: {
      school: {
        headline: 'How Indian Scientists Survive 134 km/h Blizzards in Antarctica! ❄️',
        readingLevel: 'Middle School (Grade 6–8)',
        claims: [
          {
            text: 'Indian researchers at Bharati Station faced freezing polar blizzards where winds blew at a staggering 134 km/h!',
            sourceId: 'p2',
            citation: 'Section 3, Paragraph 2: Peak instantaneous gusts hitting 134 km/h.'
          },
          {
            text: 'The temperature dropped all the way down to -38.4°C, making the wind feel as bitter cold as -61.2°C.',
            sourceId: 'p2',
            citation: 'Section 3, Paragraph 2: Ambient air temperatures plummeted to -38.4°C, wind chill -61.2°C.'
          },
          {
            text: 'Scientists sailed thousands of miles on the icebreaker ship MV Vasiliy Golovnin to reach the station.',
            sourceId: 'p1',
            citation: 'Section 1, Paragraph 1: Chartered ice-class vessel MV Vasiliy Golovnin.'
          },
          {
            text: 'Inside Bharati base, warm air was kept cozy at +21°C by cleverly recycling waste heat from the generators.',
            sourceId: 'p4',
            citation: 'Section 6, Paragraph 4: Indoor operational baseline of +21°C utilizing 42% thermal cogeneration.'
          }
        ]
      },
      press: {
        headline: 'MoES-NCPOR Releases 41st Indian Antarctic Expedition Report: Records Severe Blizzard Dynamics & Cryosphere Resilience',
        readingLevel: 'Science Journalist / PIB Release',
        claims: [
          {
            text: 'Official technical findings from the 41st Indian Antarctic Expedition confirm Bharati Station sustained peak wind gusts of 134 km/h and an ambient minimum of -38.4°C during winter storm events.',
            sourceId: 'p2',
            citation: 'Section 3, Paragraph 2: Recorded 134 km/h gusts and -38.4°C temperature.'
          },
          {
            text: 'Cryospheric ablation stake networks measured a net water equivalent accumulation of 21.4 g/cm² across the Dronning Maud Land transect.',
            sourceId: 'p3',
            citation: 'Section 4, Paragraph 3: Net annual accumulation of 21.4 g/cm² water equivalent.'
          },
          {
            text: 'Thermal cogeneration systems engineered into the Bharati facility recovered 42% of generator waste heat, maintaining structural stability throughout sub-zero pressures down to 962.4 hPa.',
            sourceId: 'p4',
            citation: 'Section 6, Paragraph 4: 42% thermal cogeneration recovered from CHP plant.'
          }
        ]
      },
      social: {
        headline: 'X / LinkedIn Thread: Surviving the Antarctic Polar Winter with India\'s 41st Expedition Team',
        readingLevel: 'Public Science Enthusiast',
        claims: [
          {
            text: 'What does an Antarctic blizzard feel like? During the 41st IAE at Bharati Station, wind gusts hit 134 km/h (-61°C windchill) as pressure plummeted to 962 hPa.',
            sourceId: 'p2',
            citation: 'Section 3, Paragraph 2.'
          },
          {
            text: 'Relentless katabatic winds flowing off the polar plateau carved 0.85m sastrugi ice ridges aligned precisely along a 135° azimuth.',
            sourceId: 'p3',
            citation: 'Section 4, Paragraph 3.'
          },
          {
            text: 'India\'s Bharati station recycled 42% of its engine exhaust heat to keep researchers safe at +21°C inside.',
            sourceId: 'p4',
            citation: 'Section 6, Paragraph 4.'
          }
        ]
      }
    }
  },
  {
    id: 'rep-indarc-arctic',
    title: 'IndARC Fjord Hydrography Report: Warm Atlantic Water Incursions into Kongsfjorden during Polar Winter',
    shortTitle: 'IndARC Arctic Mooring Findings',
    expedition: 'Indian Arctic Scientific Campaign (2022-2023)',
    station: 'indarc',
    leadAuthor: 'Dr. K. P. Krishnan (Scientist-E, NCPOR Polar Oceanography)',
    coAuthors: ['Dr. Divya David', 'Dr. N. Anilkumar'],
    publicationDate: '2023-08-20',
    doi: '10.5281/zenodo.ncpor.indarc.2023.04',
    dublinCore: {
      title: 'Atlantic Water Intrusion in Svalbard Fjord Systems',
      creator: 'National Centre for Polar and Ocean Research',
      subject: 'Arctic Ocean; IndARC; Fjord Hydrography; CTD Profiler; West Spitsbergen Current',
      coverageSpatial: 'Kongsfjorden Fjord, Svalbard (78°59\'N, 12°00\'E)',
      coverageTemporal: '2022-09-01 to 2023-07-31',
      format: 'Technical Report / Oceanographic NetCDF',
      identifier: 'NCPOR-ARCTIC-INDARC-2023'
    },
    abstract: 'Autonomous subsurface observations from India\'s IndARC moored observatory at 192 m water depth in Kongsfjorden reveal distinct pulses of transformed Atlantic Water (TAW) penetrating the inner fjord during mid-winter. Salinity sensors logged values exceeding 34.92 PSU paired with anomalous water temperatures up to +3.8°C at 45 m depth, retarding seasonal sea-ice formation.',
    sourceParagraphs: [
      {
        id: 'p1',
        section: '1. Subsurface Mooring Architecture & Sensor Array',
        text: 'The IndARC moored observatory, anchored in Kongsfjorden at a bottom depth of 192 meters, maintained continuous 15-minute sampling through Seabird SBE-37 CTDs and an upward-looking 300 kHz RDI Acoustic Doppler Current Profiler (ADCP). Subsurface flotation positioned the top sensor at 32 meters below sea level to avoid collisions with drifting iceberg keels.'
      },
      {
        id: 'p2',
        section: '3. Mid-Winter Atlantic Water Pulse Detection',
        text: 'Between January 18 and February 04, 2023, the 45-meter depth sensor recorded an abrupt temperature jump from -0.8°C to +3.8°C within 72 hours. Salinity simultaneously increased from 34.25 PSU to 34.94 PSU, signaling intense advection of warm, saline transformed Atlantic Water (TAW) driven by sustained southwesterly wind forcing across the Spitsbergen shelf.'
      },
      {
        id: 'p3',
        section: '5. Ecological Implications for Marine Pelagic Ecosystems',
        text: 'The absence of winter fast-ice formation in inner Kongsfjorden directly correlates with these recurring Atlantic pulses. Phytoplankton fluorometer logs indicate an early onset of spring diatom blooms 18 days ahead of historical 2014-2018 baselines, altering the forage balance for Arctic polar cod (Boreogadus saida).'
      }
    ],
    sampleGroundedPosts: {
      school: {
        headline: 'India\'s Underwater Robot Listening to the Deep Arctic Ocean! 🌊',
        readingLevel: 'Middle School (Grade 6–8)',
        claims: [
          {
            text: 'India anchored an underwater observatory named IndARC 192 meters beneath the icy Arctic ocean in Svalbard.',
            sourceId: 'p1',
            citation: 'Section 1, Paragraph 1: Anchored in Kongsfjorden at a bottom depth of 192 meters.'
          },
          {
            text: 'Sensors discovered warm Atlantic ocean currents rushing into the fjord in the middle of winter, spiking temperatures up to +3.8°C.',
            sourceId: 'p2',
            citation: 'Section 3, Paragraph 2: Temperature jump to +3.8°C within 72 hours.'
          },
          {
            text: 'This warm water prevents sea ice from forming and causes spring algae blooms to wake up 18 days earlier than normal.',
            sourceId: 'p3',
            citation: 'Section 5, Paragraph 3: Absence of winter fast-ice; spring blooms 18 days ahead of baselines.'
          }
        ]
      },
      press: {
        headline: 'NCPOR IndARC Mooring Detects Significant Mid-Winter Warm Inflows in High-Latitude Arctic Fjord',
        readingLevel: 'Science Journalist / PIB Release',
        claims: [
          {
            text: 'Subsurface telemetry from the Indian IndARC observatory at 192m depth detected intense Atlantic Water incursions in Kongsfjorden, with temperatures reaching +3.8°C and salinity climbing to 34.94 PSU.',
            sourceId: 'p2',
            citation: 'Section 3, Paragraph 2: TAW advection with +3.8°C and 34.94 PSU.'
          },
          {
            text: 'Mooring design positioned the sensor payload 32 meters below sea level, safely mitigating iceberg keel collision while acquiring continuous 15-minute CTD records.',
            sourceId: 'p1',
            citation: 'Section 1, Paragraph 1: 32 meters below sea level to avoid iceberg keels.'
          },
          {
            text: 'Fluorometer sensor telemetry confirmed a subsequent 18-day advancement in vernal primary production blooms, reshaping Arctic polar cod habitats.',
            sourceId: 'p3',
            citation: 'Section 5, Paragraph 3: Primary production blooms 18 days ahead of historical baselines.'
          }
        ]
      },
      social: {
        headline: 'X / LinkedIn Thread: How India\'s Sub-Surface IndARC Mooring is Unlocking Arctic Climate Secrets',
        readingLevel: 'Public Science Enthusiast',
        claims: [
          {
            text: '192 meters under the Arctic ocean, India\'s IndARC observatory recorded a winter temperature spike to +3.8°C inside Kongsfjorden.',
            sourceId: 'p2',
            citation: 'Section 3, Paragraph 2.'
          },
          {
            text: 'Why does this matter? Warm Atlantic Water is invading Arctic fjords, preventing ice formation and advancing marine blooms by 18 days.',
            sourceId: 'p3',
            citation: 'Section 5, Paragraph 3.'
          }
        ]
      }
    }
  },
  {
    id: 'rep-himansh-himalayas',
    title: 'Himalayan Cryosphere Dynamics: Ten Years of Benchmark Mass Balance & Meltwater Hydrology at Himansh Station',
    shortTitle: 'Himansh Glacier Mass Balance Study',
    expedition: 'Himalayan Cryosphere Observational Network (2023)',
    station: 'himansh',
    leadAuthor: 'Dr. Thamban Meloth (Director & Lead Glaciologist, NCPOR)',
    coAuthors: ['Dr. Parmanand Sharma', 'Dr. Lavkush Patel'],
    publicationDate: '2023-12-05',
    doi: '10.5281/zenodo.ncpor.himansh.2023.09',
    dublinCore: {
      title: 'Decadal Mass Balance of Western Himalayan Glaciers',
      creator: 'NCPOR Ministry of Earth Sciences',
      subject: 'Third Pole; Himalaya; Himansh; Chhota Shigri Glacier; Mass Balance; Meltwater',
      coverageSpatial: 'Chandra Basin, Lahaul-Spiti, Himachal Pradesh (32°24\'N, 77°37\'E)',
      coverageTemporal: '2013-05-01 to 2023-10-31',
      format: 'Technical Paper / Hydrological CSV',
      identifier: 'NCPOR-HIMALAYA-HIMANSH-10YR'
    },
    abstract: 'A decadal assessment from Himansh Station (4,080 m ASL) synthesizes in-situ glaciological ablation stake measurements, sonic snow depth sounders, and automated discharge flumes across Chhota Shigri Glacier. Results indicate an accelerating cumulative specific mass loss of -0.58 m w.e. per year, with the Equilibrium Line Altitude (ELA) shifting upward by 115 meters over the ten-year monitoring cycle.',
    sourceParagraphs: [
      {
        id: 'p1',
        section: '1. Station Setting & Glacier Observation Network',
        text: 'Himansh Station, established in 2016 at an altitude of 4,080 meters in the Chandra Basin (Lahaul-Spiti Valley, Himachal Pradesh), serves as the central high-altitude logistical and research station for glaciological monitoring of Western Himalayan benchmark glaciers, including Chhota Shigri and Samudra Tapu.'
      },
      {
        id: 'p2',
        section: '3. Decadal Mass Balance & Equilibrium Line Upward Migration',
        text: 'Annual mass balance measurements spanning 2013-2023 revealed a negative mean cumulative specific balance of -0.58 meters water equivalent per annum (m w.e. a⁻¹). The glacier Equilibrium Line Altitude (ELA) rose from 4,950 m ASL in 2013 to 5,065 m ASL in 2023, representing a net upward migration of 115 vertical meters.'
      },
      {
        id: 'p3',
        section: '4. Summer Runoff Discharge & Moraine Dammed Lake Risk',
        text: 'Automated pressure transducers installed at the proglacial stream outlet recorded a 23% surge in peak July-August discharge volume between 2018 and 2023. Drone-based photogrammetry identified three expanding supraglacial melt ponds with combined volume exceeding 48,000 m³, requiring regular satellite InSAR surveillance for Glacial Lake Outburst Flood (GLOF) mitigation.'
      }
    ],
    sampleGroundedPosts: {
      school: {
        headline: 'Watching Himalayan Glaciers Melt from 4,080 Meters Above Sea Level! 🏔️',
        readingLevel: 'Middle School (Grade 6–8)',
        claims: [
          {
            text: 'Indian scientists live and work at Himansh Station, perched high in the Himalayas at 4,080 meters altitude in Himachal Pradesh.',
            sourceId: 'p1',
            citation: 'Section 1, Paragraph 1: Altitude of 4,080 meters in the Chandra Basin.'
          },
          {
            text: 'Over 10 years of study, the glacier snow boundary climbed 115 meters higher up the mountains as ice melted.',
            sourceId: 'p2',
            citation: 'Section 3, Paragraph 2: ELA rose from 4,950m to 5,065m (net upward migration of 115 vertical meters).'
          },
          {
            text: 'Glacier meltwater flowing out during peak summer jumped by 23%, creating large glacial lakes that scientists monitor with drones.',
            sourceId: 'p3',
            citation: 'Section 4, Paragraph 3: 23% surge in peak discharge; drone photogrammetry tracking melt ponds.'
          }
        ]
      },
      press: {
        headline: 'NCPOR 10-Year Study from Himansh Base Warns of Accelerated Himalayan Glacier Loss and 115m ELA Ascent',
        readingLevel: 'Science Journalist / PIB Release',
        claims: [
          {
            text: 'Decadal observations from NCPOR\'s Himansh Station confirm an average annual glacier mass deficit of -0.58 meters water equivalent across benchmark Western Himalayan glaciers.',
            sourceId: 'p2',
            citation: 'Section 3, Paragraph 2: Negative mean cumulative specific balance of -0.58 m w.e. a⁻¹.'
          },
          {
            text: 'The Equilibrium Line Altitude (ELA) of Chhota Shigri Glacier shifted upward by 115 meters to 5,065 meters ASL over the 2013-2023 monitoring span.',
            sourceId: 'p2',
            citation: 'Section 3, Paragraph 2: ELA rose from 4,950 m to 5,065 m ASL.'
          },
          {
            text: 'Proglacial discharge telemetry documented a 23% rise in peak ablation volume, prompting drone surveillance of emerging 48,000 m³ supraglacial water bodies.',
            sourceId: 'p3',
            citation: 'Section 4, Paragraph 3: 23% discharge volume surge and 48,000 m³ melt pond volume.'
          }
        ]
      },
      social: {
        headline: 'X / LinkedIn Thread: 10 Years at Himansh — What the Third Pole is Telling Us About Climate Change',
        readingLevel: 'Public Science Enthusiast',
        claims: [
          {
            text: 'At 4,080m in Himachal Pradesh, India\'s Himansh Station has tracked 10 years of glacier retreat.',
            sourceId: 'p1',
            citation: 'Section 1, Paragraph 1.'
          },
          {
            text: 'The glacier snowline shifted 115 meters upward, while summer meltwater runoff surged by 23%.',
            sourceId: 'p2',
            citation: 'Section 3, Paragraph 2 and Section 4, Paragraph 3.'
          }
        ]
      }
    }
  }
];

export const scientificDatasets = [
  {
    id: 'ds-01-bharati-aws',
    title: 'Bharati Station Hourly Automated Weather Station (AWS) Meteorological Telemetry',
    pole: 'Antarctica',
    station: 'bharati',
    discipline: 'Atmospheric Physics',
    format: 'NetCDF / CSV',
    fileSize: '48.2 MB',
    recordsCount: '8,760 hourly readings',
    temporalRange: '2023-01-01 to 2023-12-31',
    doi: '10.5281/zenodo.ncpor.aws.bharati.2023',
    iso19115Compliant: true,
    dataQualityGrade: 'QA/QC Level 2 Verified',
    variables: ['Air_Temperature_2m', 'Wind_Speed_10m', 'Wind_Direction', 'Atmospheric_Pressure', 'Shortwave_Incoming_Radiation', 'Relative_Humidity'],
    sampleData: [
      { time: '00:00', temp: -25.2, wind: 38.4, pressure: 982.1, solar: 0 },
      { time: '04:00', temp: -26.1, wind: 41.2, pressure: 981.4, solar: 12 },
      { time: '08:00', temp: -24.8, wind: 45.0, pressure: 980.2, solar: 95 },
      { time: '12:00', temp: -22.4, wind: 42.1, pressure: 979.8, solar: 210 },
      { time: '16:00', temp: -23.9, wind: 48.6, pressure: 981.0, solar: 88 },
      { time: '20:00', temp: -25.7, wind: 44.2, pressure: 982.5, solar: 5 }
    ]
  },
  {
    id: 'ds-02-maitri-radiation',
    title: 'Maitri Station Surface Radiation Budget & Total Column Ozone Spectrometry',
    pole: 'Antarctica',
    station: 'maitri',
    discipline: 'Climate Indicators',
    format: 'NetCDF / CSV',
    fileSize: '32.6 MB',
    recordsCount: '4,380 bi-hourly readings',
    temporalRange: '2022-01-01 to 2022-12-31',
    doi: '10.5281/zenodo.ncpor.ozone.maitri.2022',
    iso19115Compliant: true,
    dataQualityGrade: 'QA/QC Level 2 Verified',
    variables: ['Total_Column_Ozone_Dobson', 'Direct_Solar_Flux', 'Diffuse_Radiation', 'Surface_Albedo', 'UVB_Irradiance'],
    sampleData: [
      { time: 'Jan', ozoneDobson: 295, albedo: 0.78, uvb: 1.8 },
      { time: 'Apr', ozoneDobson: 280, albedo: 0.84, uvb: 0.2 },
      { time: 'Jul', ozoneDobson: 230, albedo: 0.89, uvb: 0.0 },
      { time: 'Oct', ozoneDobson: 165, albedo: 0.86, uvb: 1.4 }, // Ozone hole minimum
      { time: 'Dec', ozoneDobson: 288, albedo: 0.79, uvb: 2.1 }
    ]
  },
  {
    id: 'ds-03-indarc-ctd',
    title: 'IndARC Subsurface Hydrographic Mooring: Kongsfjorden CTD Water Column Profiles',
    pole: 'Arctic',
    station: 'indarc',
    discipline: 'Oceans & Hydrography',
    format: 'NetCDF / CSV',
    fileSize: '84.0 MB',
    recordsCount: '35,040 15-min profiles',
    temporalRange: '2022-09-01 to 2023-08-31',
    doi: '10.5281/zenodo.ncpor.indarc.ctd.2023',
    iso19115Compliant: true,
    dataQualityGrade: 'QA/QC Level 3 Calibrated',
    variables: ['Depth_m', 'Potential_Temperature_C', 'Practical_Salinity_PSU', 'Current_Velocity_ms', 'Turbidity_NTU'],
    sampleData: [
      { depth: 35, temp: 2.1, salinity: 34.40, current: 0.18 },
      { depth: 55, temp: 3.4, salinity: 34.82, current: 0.24 }, // Atlantic layer
      { depth: 85, temp: 2.9, salinity: 34.91, current: 0.19 },
      { depth: 120, temp: 1.6, salinity: 34.95, current: 0.12 },
      { depth: 180, temp: 0.8, salinity: 34.98, current: 0.08 }
    ]
  },
  {
    id: 'ds-04-himansh-discharge',
    title: 'Chhota Shigri Proglacial Meltwater Discharge & Ablation Stake Mass Balance',
    pole: 'Himalayas',
    station: 'himansh',
    discipline: 'Cryosphere & Glaciology',
    format: 'CSV / GeoJSON',
    fileSize: '19.4 MB',
    recordsCount: '1,825 daily records',
    temporalRange: '2019-05-01 to 2023-10-31',
    doi: '10.5281/zenodo.ncpor.himansh.massbalance.2023',
    iso19115Compliant: true,
    dataQualityGrade: 'QA/QC Level 2 Verified',
    variables: ['Daily_Discharge_m3s', 'Air_Temp_Mean_C', 'Snow_Precip_mm', 'Specific_Ablation_cm', 'Supraglacial_Runoff'],
    sampleData: [
      { month: 'May', discharge: 3.2, temp: -1.4, ablationCm: 12 },
      { month: 'Jun', discharge: 8.6, temp: 4.8, ablationCm: 38 },
      { month: 'Jul', discharge: 16.4, temp: 8.2, ablationCm: 74 },
      { month: 'Aug', discharge: 14.1, temp: 7.6, ablationCm: 62 },
      { month: 'Sep', discharge: 5.8, temp: 2.1, ablationCm: 22 },
      { month: 'Oct', discharge: 1.9, temp: -3.5, ablationCm: 4 }
    ]
  },
  {
    id: 'ds-05-himadri-blackcarbon',
    title: 'Himadri Station Continuous Multi-Wavelength Black Carbon Aerosol Mass Concentrations',
    pole: 'Arctic',
    station: 'himadri',
    discipline: 'Atmosphere & Aerosols',
    format: 'CSV / NetCDF',
    fileSize: '14.2 MB',
    recordsCount: '525,600 1-minute measurements',
    temporalRange: '2023-01-01 to 2023-12-31',
    doi: '10.5281/zenodo.ncpor.himadri.bc.2023',
    iso19115Compliant: true,
    dataQualityGrade: 'QA/QC Level 2 Verified',
    variables: ['Equivalent_Black_Carbon_ng_m3', 'Absorption_Coefficient_Mm', 'Wavelength_880nm', 'Air_Flow_LPM'],
    sampleData: [
      { month: 'Jan', bcNgM3: 42.1 },
      { month: 'Mar (Arctic Haze)', bcNgM3: 78.4 },
      { month: 'Jun', bcNgM3: 18.2 },
      { month: 'Sep', bcNgM3: 14.8 },
      { month: 'Dec', bcNgM3: 39.5 }
    ]
  }
];

export const mediaAssets = [
  {
    id: 'media-01',
    title: 'Bharati Station Aerodynamic Shell in Midnight Sun',
    type: 'Photograph (High-Res RAW/JPEG)',
    pole: 'Antarctica',
    station: 'bharati',
    category: 'Station Architecture',
    resolution: '6000 x 4000 (24 MP)',
    url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
    exif: {
      camera: 'Nikon Z9',
      lens: 'NIKKOR Z 24-70mm f/2.8 S',
      focalLength: '35mm',
      shutter: '1/1250s',
      aperture: 'f/5.6',
      iso: '100',
      gps: '69°24\'25" S, 76°11\'41" E',
      dateCaptured: '2022-01-14 02:18 UTC'
    },
    license: 'Creative Commons CC-BY 4.0 (NCPOR / MoES)',
    tags: ['#Antarctica', '#BharatiStation', '#LarsemannHills', '#MidnightSun', '#Architecture', '#MoES'],
    clipEmbeddingsDescription: 'Futuristic blue scientific station on stilts amidst rocky coastal Antarctic tundra under golden midnight sunlight'
  },
  {
    id: 'media-02',
    title: 'Piston Coring Operations on Kongsfjorden Fast-Ice',
    type: 'Video B-Roll (4K 60fps ProRes)',
    pole: 'Arctic',
    station: 'himadri',
    category: 'Scientific Fieldwork',
    resolution: '3840 x 2160 (4K UHD)',
    url: 'https://images.unsplash.com/photo-1548263594-a71ea65a8598?auto=format&fit=crop&w=1200&q=80',
    exif: {
      camera: 'Sony FX6 Cinema Line',
      lens: 'FE 16-35mm f/2.8 GM',
      focalLength: '24mm',
      shutter: '1/120s',
      aperture: 'f/4.0',
      iso: '320',
      gps: '78°55\'12" N, 11°56\'22" E',
      dateCaptured: '2023-04-22 11:45 UTC'
    },
    license: 'Creative Commons CC-BY 4.0 (NCPOR / MoES)',
    tags: ['#Arctic', '#Himadri', '#Kongsfjorden', '#Svalbard', '#IceCoring', '#Fieldwork'],
    clipEmbeddingsDescription: 'Scientists in orange thermal polar suits drilling deep sediment cores through Arctic sea ice near snowy fjord mountains'
  },
  {
    id: 'media-03',
    title: 'Adélie Penguin Colony on Prydz Bay Rocky Promontory',
    type: 'Photograph (Wildlife Series)',
    pole: 'Antarctica',
    station: 'bharati',
    category: 'Polar Biodiversity',
    resolution: '8256 x 5504 (45 MP)',
    url: 'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?auto=format&fit=crop&w=1200&q=80',
    exif: {
      camera: 'Canon EOS R5',
      lens: 'RF 100-500mm f/4.5-7.1L IS USM',
      focalLength: '400mm',
      shutter: '1/2000s',
      aperture: 'f/5.6',
      iso: '200',
      gps: '69°23\'48" S, 76°13\'10" E',
      dateCaptured: '2022-02-08 14:10 UTC'
    },
    license: 'Creative Commons CC-BY 4.0 (NCPOR / MoES)',
    tags: ['#Wildlife', '#AdeliePenguin', '#PrydzBay', '#Antarctica', '#Ecology'],
    clipEmbeddingsDescription: 'Adélie penguins standing on dark Antarctic rocks overlooking drifting sea ice and blue coastal ocean'
  },
  {
    id: 'media-04',
    title: 'UAV Drone Survey over Chhota Shigri Glacier Crevasse Field',
    type: 'Aerial Footage (4K Drone Pass)',
    pole: 'Himalayas',
    station: 'himansh',
    category: 'Aerial Photogrammetry',
    resolution: '3840 x 2160 (4K UHD)',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    exif: {
      camera: 'DJI Matrice 300 RTK (Zenmuse P1)',
      lens: '35mm DL Mount',
      focalLength: '35mm',
      shutter: '1/1600s',
      aperture: 'f/4.5',
      iso: '100',
      gps: '32°24\'10" N, 77°37\'44" E',
      dateCaptured: '2023-09-12 09:30 UTC'
    },
    license: 'Creative Commons CC-BY 4.0 (NCPOR / MoES)',
    tags: ['#Himalayas', '#Himansh', '#ChhotaShigri', '#Glacier', '#DroneSurvey', '#ThirdPole'],
    clipEmbeddingsDescription: 'Aerial drone top-down view of rugged Himalayan glacier showing deep ice crevasses, moraine debris, and turquoise meltwater channels'
  },
  {
    id: 'media-05',
    title: 'PistenBully Snow Groomer Convoy Traversing Polar Ice Shelf',
    type: 'Photograph (Logistics Operations)',
    pole: 'Antarctica',
    station: 'maitri',
    category: 'Expedition Operations',
    resolution: '5472 x 3648 (20 MP)',
    url: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=1200&q=80',
    exif: {
      camera: 'Sony A7R IV',
      lens: 'FE 24-105mm f/4 G OSS',
      focalLength: '52mm',
      shutter: '1/800s',
      aperture: 'f/8.0',
      iso: '160',
      gps: '70°45\'55" S, 11°44\'12" E',
      dateCaptured: '2022-01-28 16:40 UTC'
    },
    license: 'Creative Commons CC-BY 4.0 (NCPOR / MoES)',
    tags: ['#Antarctica', '#MaitriStation', '#Convoy', '#PistenBully', '#IceTraverse', '#Logistics'],
    clipEmbeddingsDescription: 'Heavy red tracked PistenBully vehicle pulling fuel sledges across blue ice and wind-sculpted snow sastrugi'
  }
];

export const researchersDirectory = [
  {
    id: 'dr-thamban-meloth',
    name: 'Dr. Thamban Meloth',
    designation: 'Director & Scientist-G',
    division: 'Cryosphere and Polar Geochemistry',
    institution: 'NCPOR, Goa',
    expertise: ['Ice Core Paleoclimatology', 'Glacier Mass Balance', 'Polar Geochemistry'],
    expeditionsCount: 8,
    polesResearched: ['Antarctica', 'Arctic', 'Himalayas'],
    activeProjects: 'Deep Ice-core Drilling at Dronning Maud Land & Himalayan Glaciology at Himansh',
    askScientistAcceptedQuestions: [
      'What do ice cores tell us about past atmospheric greenhouse gases?',
      'Why are Himalayan glaciers retreating at different rates than Arctic ice?'
    ],
    email: 'tmeloth@ncpor.res.in'
  },
  {
    id: 'dr-rahul-sharma',
    name: 'Dr. Rahul Sharma',
    designation: 'Scientist-F',
    division: 'Polar Meteorology & Atmospheric Telemetry',
    institution: 'NCPOR, Goa',
    expertise: ['Antarctic Boundary Layer Meteorology', 'Automatic Weather Stations', 'Blizzard Synoptics'],
    expeditionsCount: 6,
    polesResearched: ['Antarctica'],
    activeProjects: 'Katabatic wind modeling and winter telemetry networks at Bharati and Maitri',
    askScientistAcceptedQuestions: [
      'How does Bharati station survive 130+ km/h winds without blowing away?',
      'What causes the extreme katabatic winds rolling down from the Antarctic plateau?'
    ],
    email: 'rahul.met@ncpor.res.in'
  },
  {
    id: 'dr-kp-krishnan',
    name: 'Dr. K. P. Krishnan',
    designation: 'Scientist-E',
    division: 'Arctic Oceanography & Biogeochemistry',
    institution: 'NCPOR, Goa',
    expertise: ['Marine Microbial Ecology', 'Fjord Biogeochemistry', 'IndARC Mooring Operations'],
    expeditionsCount: 7,
    polesResearched: ['Arctic', 'Southern Ocean'],
    activeProjects: 'Long-term hydrographic mooring operations in Kongsfjorden, Svalbard',
    askScientistAcceptedQuestions: [
      'How does the IndARC underwater mooring stay intact under frozen fjords?',
      'How is Atlantic water warming altering Arctic marine life?'
    ],
    email: 'kpkrishnan@ncpor.res.in'
  },
  {
    id: 'dr-parmanand-sharma',
    name: 'Dr. Parmanand Sharma',
    designation: 'Scientist-E',
    division: 'Himalayan Cryosphere Observational Division',
    institution: 'NCPOR, Goa',
    expertise: ['Benchmark Glacier Monitoring', 'Drone Photogrammetry', 'Meltwater Hydrology'],
    expeditionsCount: 5,
    polesResearched: ['Himalayas'],
    activeProjects: 'Continuous mass balance network at Himansh Station, Chandra Basin',
    askScientistAcceptedQuestions: [
      'How are drones used to calculate glacier volume loss in the Himalayas?',
      'What are Glacial Lake Outburst Floods (GLOFs) and how do we detect them?'
    ],
    email: 'pnsharma@ncpor.res.in'
  }
];

export const initialEditorialQueue = [
  {
    id: 'post-ed-01',
    reportId: 'rep-41-iae',
    reportTitle: '41st IAE: Extreme Meteorological Events at Bharati & Maitri',
    targetAudience: 'Science Journalist / PIB Release',
    status: 'in_review', // draft | in_review | approved | scheduled
    assignedReviewer: 'Dr. Rahul Sharma (Scientist-F)',
    content: 'Official technical findings from the 41st Indian Antarctic Expedition confirm Bharati Station sustained peak wind gusts of 134 km/h and an ambient minimum of -38.4°C during winter storm events. Thermal cogeneration systems engineered into the facility successfully captured 42% waste heat to maintain indoor livability at +21°C.',
    sourceCitationsCount: 3,
    reviewerNotes: 'Verified against Table 3.2 sonic anemometer calibration logs. Wording matches ISO 19115 metadata submission.',
    targetPublishDate: '2026-12-01 (Antarctica Day)',
    channels: ['PIB Science Wire', 'MoES Web Portal', 'Science Reporter Magazine']
  },
  {
    id: 'post-ed-02',
    reportId: 'rep-indarc-arctic',
    reportTitle: 'IndARC Fjord Hydrography Report: Atlantic Water Inflows',
    targetAudience: 'Middle School (Grade 6–8)',
    status: 'approved',
    assignedReviewer: 'Dr. K. P. Krishnan (Scientist-E)',
    content: 'India anchored an underwater observatory named IndARC 192 meters beneath the icy Arctic ocean in Svalbard. Its underwater sensors discovered warm Atlantic ocean currents rushing into the fjord in the middle of winter, spiking temperatures up to +3.8°C and waking up spring algae 18 days early!',
    sourceCitationsCount: 3,
    reviewerNotes: 'Scientifically accurate simplified wording. Perfect for Smart Education curriculum integration.',
    targetPublishDate: '2026-10-15 (National Student Innovation Week)',
    channels: ['Schools Outreach Portal', 'NCERT Polar Science Supplementary', 'NCPOR Kids Corner']
  },
  {
    id: 'post-ed-03',
    reportId: 'rep-himansh-himalayas',
    reportTitle: 'Himansh 10-Year Decadal Mass Balance Study',
    targetAudience: 'Public Science Enthusiast',
    status: 'scheduled',
    assignedReviewer: 'Dr. Thamban Meloth (Director)',
    content: 'Perched at 4,080 meters altitude in Himachal Pradesh, India\'s Himansh Station has tracked 10 years of glacier retreat. The snowline shifted 115 meters upward, while summer meltwater runoff surged by 23%. Stay tuned for the upcoming documentary reel on Third Pole resilience.',
    sourceCitationsCount: 2,
    reviewerNotes: 'Approved for social dissemination across X and LinkedIn with accompanying 4K drone footage.',
    targetPublishDate: '2026-10-24 (International Day of Climate Action)',
    channels: ['X / Twitter', 'LinkedIn', 'YouTube Shorts']
  }
];
