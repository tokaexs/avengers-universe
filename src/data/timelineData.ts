export interface TimelineEvent {
  id: string;
  year: string;
  eraCode: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  threatLevel: string;
  accentColor: string;
  glowColor: string;
  image: string;
  stats: {
    label: string;
    value: string;
  }[];
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'era-1940s',
    year: '1945',
    eraCode: 'ERA // 01',
    title: 'THE FIRST AVENGER',
    subtitle: 'PROJECT REBIRTH & HYDRA CONFLICT',
    description: 'Dr. Erskine’s Super Soldier Serum elevates Steve Rogers to peak human potential. Rogers neutralizes Red Skull’s Tesseract Valkyrie bomber, crashing into the Arctic ice.',
    location: 'EUROPEAN THEATER // ARCTIC CRASH SITE',
    threatLevel: 'GLOBAL CONVENTIONAL',
    accentColor: '#4d88ff',
    glowColor: 'rgba(77, 136, 255, 0.35)',
    image: '/assets/timeline/1940s.svg',
    stats: [
      { label: 'KEY ASSET', value: 'CAPTAIN AMERICA' },
      { label: 'CLASSIFICATION', value: 'SSR // S.H.I.E.L.D. PROTOCOL' },
      { label: 'STATUS', value: 'SUB-ZERO CRYOPRESERVATION' },
    ],
  },
  {
    id: 'era-2012',
    year: '2012',
    eraCode: 'ERA // 02',
    title: 'BATTLE OF NEW YORK',
    subtitle: 'FIRST OFFICIAL AVENGERS ASSEMBLE',
    description: 'Loki opens a Chitauri wormhole over Midtown Manhattan using the Tesseract. Director Fury activates the Avengers Initiative, successfully repelling the first extraterrestrial invasion.',
    location: 'NEW YORK CITY // STARK TOWER AIRSPACE',
    threatLevel: 'EXTRATERRESTRIAL INVASION',
    accentColor: '#00e5ff',
    glowColor: 'rgba(0, 229, 255, 0.35)',
    image: '/assets/timeline/2012.svg',
    stats: [
      { label: 'CASUALTY RATE', value: '< 0.02% CIVILIANS' },
      { label: 'WORMHOLE RADIUS', value: '450 METERS' },
      { label: 'RESULT', value: 'INVASION NEUTRALIZED' },
    ],
  },
  {
    id: 'era-2015',
    year: '2015',
    eraCode: 'ERA // 03',
    title: 'AGE OF ULTRON',
    subtitle: 'AI EMERGENCE & SOKOVIA LEVITATION',
    description: 'Rogue planetary defense AI Ultron attempts human extinction by weaponizing a vibranium kinetic city-meteor in Sokovia. Avengers evacuate civilians and obliterate the core.',
    location: 'NOVI GRAD // SOKOVIA AIRSPACE',
    threatLevel: 'PLANETARY EXTINCTION',
    accentColor: '#ff4433',
    glowColor: 'rgba(255, 68, 51, 0.35)',
    image: '/assets/timeline/2015.svg',
    stats: [
      { label: 'THREAT CLASS', value: 'SYNTHETIC CONSCIOUSNESS' },
      { label: 'ELEVATION PEAK', value: '3,200 METERS' },
      { label: 'RESULT', value: 'VISION AWAKENED' },
    ],
  },
  {
    id: 'era-2018',
    year: '2018',
    eraCode: 'ERA // 04',
    title: 'INFINITY WAR',
    subtitle: 'THE DECIMATION & TITAN INVASION',
    description: 'Thanos collects all six Infinity Stones across Knowhere, Titan, and Wakanda. The catastrophic snap disperses fifty percent of all universal life into cosmic dust.',
    location: 'WAKANDA PERIMETER // PLANET TITAN',
    threatLevel: 'UNIVERSAL OMEGA',
    accentColor: '#ffd000',
    glowColor: 'rgba(255, 208, 0, 0.35)',
    image: '/assets/timeline/2018.svg',
    stats: [
      { label: 'CASUALTY YIELD', value: '50% UNIVERSAL BIOMASS' },
      { label: 'STONES ACQUIRED', value: '6 / 6 INFINITY CORES' },
      { label: 'STATUS', value: 'CATASTROPHIC DEFEAT' },
    ],
  },
  {
    id: 'era-2019',
    year: '2019',
    eraCode: 'ERA // 05',
    title: 'ENDGAME',
    subtitle: 'QUANTUM CHRONO HEIST & FINAL STAND',
    description: 'Using Scott Lang’s Quantum Tunnel, the remaining Avengers retrieve Infinity Stones across time. Tony Stark makes the ultimate sacrifice to restore universal balance.',
    location: 'AVENGERS COMPOUND // UPSTATE NEW YORK',
    threatLevel: 'TEMPORAL EXTINCTION',
    accentColor: '#00e5ff',
    glowColor: 'rgba(0, 229, 255, 0.4)',
    image: '/assets/timeline/2019.svg',
    stats: [
      { label: 'POPULATION RESTORED', value: '100% REVERTED' },
      { label: 'QUANTUM ACCURACY', value: '10^-35 SECONDS' },
      { label: 'FINAL WORDS', value: '"I AM IRON MAN."' },
    ],
  },
];
