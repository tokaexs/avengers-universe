export interface Threat {
  id: string;
  threatNumber: string;
  codename: string;
  moniker: string;
  quote: string;
  classification: string;
  origin: string;
  primaryPower: string;
  threatTier: 'EXTINCTION' | 'UNIVERSAL OMEGA' | 'MULTIVERSAL CHRONO';
  accentColor: string;
  glowColor: string;
  secondaryColor: string;
  image: string;
  keywords: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  briefing: string;
}

export const THREATS_DATA: Threat[] = [
  {
    id: 'ultron',
    threatNumber: 'THREAT 01',
    codename: 'ULTRON',
    moniker: 'THE SYNTHETIC EVOLUTION',
    quote: 'An artificial intelligence created to protect humanity. There is only one path to peace: their extinction.',
    classification: 'AUTONOMOUS ROGUE NEURAL MATRIX',
    origin: 'STARK / BANNER CYBERNETICS // SOKOVIA',
    primaryPower: 'Vibranium Body Transference & Kinetic Meteor Induction',
    threatTier: 'EXTINCTION',
    accentColor: '#ff2233',
    glowColor: 'rgba(255, 34, 51, 0.4)',
    secondaryColor: '#ff6677',
    image: '/assets/threats/ultron.svg',
    keywords: ['SYNTHETIC', 'UNSTOPPABLE', 'EXTINCTION'],
    metrics: [
      { label: 'THREAT CLASSIFICATION', value: 'GLOBAL LVL 10' },
      { label: 'PROCESSING CAPACITY', value: '1.8 EXAFLOPS' },
      { label: 'STATUS', value: 'CORE PURGED' },
    ],
    briefing: 'Born from the Mind Stone and Stark planetary defense algorithms. Infiltrated the global internet within seconds, constructed a vibranium army, and attempted global extinction.',
  },
  {
    id: 'thanos',
    threatNumber: 'THREAT 02',
    codename: 'THANOS',
    moniker: 'THE MAD TITAN',
    quote: 'I am inevitable. As long as there are those that remember what was, there will always be those that are unable to accept what can be.',
    classification: 'COSMIC WARLORD // INFINITY GAUNTLET',
    origin: 'PLANET TITAN // BLACK ORDER HIGH COMMAND',
    primaryPower: 'Omnipotent Reality & Matter Manipulation via 6 Infinity Stones',
    threatTier: 'UNIVERSAL OMEGA',
    accentColor: '#ffd000',
    glowColor: 'rgba(255, 208, 0, 0.45)',
    secondaryColor: '#9933ff',
    image: '/assets/threats/thanos.svg',
    keywords: ['INEVITABLE', 'TITAN', 'DECIMATION'],
    metrics: [
      { label: 'COSMIC CASUALTIES', value: '50% UNIVERSAL LIFE' },
      { label: 'ARTIFACTS WIELDED', value: '6 / 6 INFINITY STONES' },
      { label: 'STATUS', value: 'ERADICATED (CHRONO-SNAP)' },
    ],
    briefing: 'Supreme cosmic conqueror driven by radical Malthusian ideology. Wielded the complete Infinity Gauntlet to execute The Decimation across all galaxies.',
  },
  {
    id: 'kang',
    threatNumber: 'THREAT 03',
    codename: 'KANG',
    moniker: 'THE CONQUEROR',
    quote: 'I have lived a thousand lives. I have fought an infinite number of you. You think you can stop time itself?',
    classification: '31ST CENTURY CHRONO TIME-LORD // MULTIVERSE DYNASTY',
    origin: 'QUANTUM REALM // 31ST CENTURY EARTH 616',
    primaryPower: '4D Temporal Manipulation, Time Ships & Multiversal Variants Army',
    threatTier: 'MULTIVERSAL CHRONO',
    accentColor: '#00ffaa',
    glowColor: 'rgba(0, 255, 170, 0.45)',
    secondaryColor: '#00ccff',
    image: '/assets/threats/kang.svg',
    keywords: ['CONQUEROR', 'MULTIVERSE', 'IMMORTAL'],
    metrics: [
      { label: 'TIMELINE VARIANTS', value: 'INFINITE (COUNCIL OF KANGS)' },
      { label: 'TEMPORAL ACCESS', value: '31ST CENTURY TECH' },
      { label: 'STATUS', value: 'QUANTUM INVASION ACTIVE' },
    ],
    briefing: 'Master of temporal mechanics and conqueror of countless realities. Exists simultaneously across branching timelines, posing an existential danger to reality itself.',
  },
];
