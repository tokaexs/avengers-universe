export interface Mission {
  id: string;
  missionCode: string;
  codename: string;
  year: string;
  location: string;
  threat: string;
  avengersInvolved: string[];
  status: 'SUCCESS' | 'CRITICAL' | 'CATASTROPHIC' | 'RESOLVED';
  outcome: string;
  briefing: string;
  accentColor: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

export const MISSIONS_DATA: Mission[] = [
  {
    id: 'mission-01',
    missionCode: 'OP-NY-2012',
    codename: 'THE BATTLE OF NEW YORK',
    year: '2012',
    location: 'MANHATTAN // STARK TOWER AIRSPACE',
    threat: 'LOKI OF ASGARD & CHITAURI ARMADA',
    avengersInvolved: ['Iron Man', 'Captain America', 'Thor', 'Hulk', 'Black Widow', 'Hawkeye'],
    status: 'SUCCESS',
    outcome: 'MOTHERSHIP DESTROYED // LOKI IN CUSTODY // TESSERACT SECURED',
    briefing: 'Loki opened an extraterrestrial wormhole above Stark Tower using the Tesseract. The Avengers assembled for the first time, establishing ground perimeter and diverting a nuclear warhead into the portal.',
    accentColor: '#00e5ff',
    metrics: [
      { label: 'THREAT CLASS', value: 'OMEGA LEVEL 9' },
      { label: 'CIVILIAN CASUALTIES', value: 'MINIMIZED' },
      { label: 'CLEARANCE', value: 'WORLD SECURITY COUNCIL' },
    ],
  },
  {
    id: 'mission-02',
    missionCode: 'OP-SOK-2015',
    codename: 'OPERATION SOKOVIA EXTINCTION',
    year: '2015',
    location: 'NOVI GRAD, SOKOVIA',
    threat: 'ULTRON NEURAL MATRIX & DRONE SWARM',
    avengersInvolved: ['Iron Man', 'Captain America', 'Thor', 'Hulk', 'Black Widow', 'Hawkeye', 'Vision', 'Wanda Maximoff'],
    status: 'RESOLVED',
    outcome: 'METEOR CORE VAPORIZED // ULTRON PURGED // CITIZENS EVACUATED VIA HELICARRIER',
    briefing: 'Ultron retrofitted a vibranium spire underneath Novi Grad to propel the city into the stratosphere as an extinction-level meteor. The Avengers held the core until full civilian evacuation and shattered the landmass.',
    accentColor: '#ff2233',
    metrics: [
      { label: 'THREAT CLASS', value: 'PLANETARY EXTINCTION' },
      { label: 'EVACUATION METRIC', value: '100% S.H.I.E.L.D. HELICARRIER' },
      { label: 'AFTERMATH', value: 'SOKOVIA ACCORDS DRAFTED' },
    ],
  },
  {
    id: 'mission-03',
    missionCode: 'OP-WAK-2018',
    codename: 'THE BATTLE OF WAKANDA',
    year: '2018',
    location: 'WAKANDA GOLDEN CITY CORRIDOR',
    threat: 'THANOS & THE BLACK ORDER (OUTRIDER ARMY)',
    avengersInvolved: ['Captain America', 'Thor', 'Black Widow', 'Hulk/Banner', 'Black Panther', 'Scarlet Witch'],
    status: 'CATASTROPHIC',
    outcome: 'INFINITY GAUNTLET COMPLETED // THE DECIMATION OCCURRED',
    briefing: 'Planetary defense of the Mind Stone against the Black Order. Despite Thor delivering Stormbreaker to Thanos’s chest, the Mad Titan completed the snap, wiping out 50% of all universal life.',
    accentColor: '#ffd700',
    metrics: [
      { label: 'THREAT CLASS', value: 'UNIVERSAL DECIMATION' },
      { label: 'STONES CONVERGED', value: '6 / 6' },
      { label: 'STATUS', value: 'UNIVERSE DECIMATED' },
    ],
  },
  {
    id: 'mission-04',
    missionCode: 'OP-TITAN-2018',
    codename: 'THE AMBUSH ON TITAN',
    year: '2018',
    location: 'PLANET TITAN // RUINS OF THE TITAN CAPITAL',
    threat: 'THANOS (4 INFINITY STONES WIELDED)',
    avengersInvolved: ['Iron Man', 'Doctor Strange', 'Spider-Man', 'Guardians of the Galaxy'],
    status: 'CRITICAL',
    outcome: 'TIME STONE SURRENDERED // ONLY 1 WINNING TIMELINE OUT OF 14,000,605',
    briefing: 'Coordinated ambush to remove the Infinity Gauntlet on Titan. Doctor Strange viewed 14,000,605 alternate futures and surrendered the Time Stone to preserve Tony Stark’s life for the endgame.',
    accentColor: '#9933ff',
    metrics: [
      { label: 'TIMELINES CALCULATED', value: '14,000,605' },
      { label: 'WINNING OUTCOMES', value: '1 EXACT TIMELINE' },
      { label: 'OUTCOME', value: 'CHRONO SACRIFICE' },
    ],
  },
  {
    id: 'mission-05',
    missionCode: 'OP-TIME-2019',
    codename: 'THE QUANTUM TIME HEIST',
    year: '2019',
    location: 'QUANTUM REALM // 2012 NY, 2013 ASGARD, 2014 MORAG',
    threat: 'TEMPORAL COLLAPSE // 2014 THANOS INVASION',
    avengersInvolved: ['Iron Man', 'Captain America', 'Thor', 'Hulk', 'Black Widow', 'Hawkeye', 'Nebula', 'Ant-Man', 'Rocket'],
    status: 'SUCCESS',
    outcome: 'DECIMATED RETURNED // 2014 THANOS ERADICATED // STARK HEROIC SACRIFICE',
    briefing: 'Using quantum GPS tunnels, teams retrieved past Infinity Stones, engineered the Nano Gauntlet, and reversed the snap. Stark gave his life executing the final eradication snap.',
    accentColor: '#00e5ff',
    metrics: [
      { label: 'TEMPORAL RUNS', value: '100% RETRIEVAL' },
      { label: 'RESTORED LIVES', value: '3.5 BILLION EARTH / TRILLIONS COSMOS' },
      { label: 'FINAL SNAP', value: 'TONY STARK // ARCHIVED' },
    ],
  },
];
