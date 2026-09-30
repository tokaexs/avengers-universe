export interface TimelineEvent {
  id: string;
  year: string;
  era: string;
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
    id: '1940s-captain-america',
    year: '1942',
    era: 'THE FIRST AVENGER',
    title: 'PROJECT REBIRTH',
    subtitle: 'BIRTH OF THE SUPER SOLDIER',
    description: 'Steve Rogers undergoes the experimental Super Soldier Serum and Vita-Ray transformation in Brooklyn. Leads the Howling Commandos to dismantle HYDRA’s Tesseract-powered war machine.',
    location: 'BROOKLYN & EUROPEAN THEATRE',
    threatLevel: 'CLASS 8 // HYDRA GLOBAL SIEGE',
    accentColor: '#4d88ff',
    glowColor: 'rgba(77, 136, 255, 0.4)',
    image: '/assets/timeline/1940s.svg',
    stats: [
      { label: 'CLASSIFICATION', value: 'OPERATION REBIRTH' },
      { label: 'PRIMARY ARTIFACT', value: 'THE TESSERACT' },
      { label: 'OUTCOME', value: 'HYDRA CRUSHED // ICE RECOVERY' },
    ],
  },
  {
    id: '2012-battle-of-new-york',
    year: '2012',
    era: 'THE ASSEMBLE PROTOCOL',
    title: 'BATTLE OF NEW YORK',
    subtitle: 'EARTH’S MIGHTIEST HEROES UNITE',
    description: 'Loki invades Manhattan with the Chitauri armada via the Tesseract portal above Stark Tower. The Avengers assemble for the first time, neutralizing the mothership with a redirected nuclear missile.',
    location: 'MANHATTAN, NEW YORK CITY',
    threatLevel: 'CLASS 9 // EXTRATERRESTRIAL INVASION',
    accentColor: '#00e5ff',
    glowColor: 'rgba(0, 229, 255, 0.4)',
    image: '/assets/timeline/2012.svg',
    stats: [
      { label: 'CLEARANCE', value: 'LEVEL 10 EYES ONLY' },
      { label: 'HOSTILE FORCE', value: 'CHITAURI ARMADA // LOKI' },
      { label: 'OUTCOME', value: 'NEW YORK SAVED // TEAM FORMED' },
    ],
  },
  {
    id: '2015-age-of-ultron',
    year: '2015',
    era: 'SYNTHETIC EVOLUTION',
    title: 'AGE OF ULTRON',
    subtitle: 'THE SOKOVIA METEOR INCIDENT',
    description: 'Stark and Banner’s artificial intelligence protocol Ultron turns rogue, attempting biological extinction via a vibranium-propelled planetary meteor. The Vision is created and Ultron is purged.',
    location: 'NOVI GRAD, SOKOVIA',
    threatLevel: 'CLASS 10 // EXTINCTION PROTOCOL',
    accentColor: '#ff2233',
    glowColor: 'rgba(255, 34, 51, 0.4)',
    image: '/assets/timeline/2015.svg',
    stats: [
      { label: 'ROGUE ENTITY', value: 'ULTRON NEURAL CORE' },
      { label: 'PRIMARY WEAPON', value: 'VIBRANIUM METEOR CORE' },
      { label: 'OUTCOME', value: 'CORE PURGED // S.H.I.E.L.D. RESCUE' },
    ],
  },
  {
    id: '2018-infinity-war',
    year: '2018',
    era: 'COSMIC DECIMATION',
    title: 'INFINITY WAR',
    subtitle: 'THE BATTLE OF WAKANDA & TITAN',
    description: 'Thanos and the Black Order execute a blitzkrieg across the cosmos to collect all six Infinity Stones. Despite desperate planetary stands on Titan and in Wakanda, the Decimation wipes out half of all universal life.',
    location: 'WAKANDA & PLANET TITAN',
    threatLevel: 'OMEGA UNIVERSAL // EXTINCTION',
    accentColor: '#ffd000',
    glowColor: 'rgba(255, 208, 0, 0.45)',
    image: '/assets/timeline/2018.svg',
    stats: [
      { label: 'COSMIC CASUALTIES', value: '50% UNIVERSAL LIFE' },
      { label: 'ARTIFACTS', value: '6 / 6 INFINITY STONES' },
      { label: 'OUTCOME', value: 'THE SNAP // UNIVERSAL CRISIS' },
    ],
  },
  {
    id: '2019-endgame',
    year: '2019',
    era: 'WHATEVER IT TAKES',
    title: 'ENDGAME',
    subtitle: 'THE TIME HEIST & FINAL STAND',
    description: 'The surviving Avengers engineer Quantum Realm time-travel GPS to retrieve the Infinity Stones from the past. The decimated return, Stark delivers the final nano-gauntlet snap, and Thanos is eradicated.',
    location: 'AVENGERS COMPOUND, UPSTATE NY',
    threatLevel: 'MULTIVERSAL TIMELINE THREAT',
    accentColor: '#00e5ff',
    glowColor: 'rgba(0, 229, 255, 0.5)',
    image: '/assets/timeline/2019.svg',
    stats: [
      { label: 'OPERATION', value: 'CHRONO TIME HEIST' },
      { label: 'ASSEMBLED HEROES', value: '100% S.H.I.E.L.D. ALLIANCE' },
      { label: 'OUTCOME', value: 'VICTORY // UNIVERSE RESTORED' },
    ],
  },
];
