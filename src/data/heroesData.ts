export interface Hero {
  id: string;
  codename: string;
  realName: string;
  role: string;
  clearanceLevel: number;
  status: 'ACTIVE' | 'DEPLOYED' | 'STANDBY' | 'UNKNOWN';
  threatClass: 'ALPHA' | 'OMEGA' | 'GLOBAL' | 'COSMIC';
  primaryTech: string;
  affiliation: string;
  accentColor: string;
  quote: string;
  biography: string;
  stats: {
    strength: number;
    intelligence: number;
    combat: number;
    speed: number;
    techLevel: number;
  };
  equipment: string[];
  recentOps: string[];
}

export const HEROES_DATA: Hero[] = [
  {
    id: 'iron-man',
    codename: 'IRON MAN',
    realName: 'Anthony Edward Stark',
    role: 'Tactical Engineer & Financial Benefactor',
    clearanceLevel: 10,
    status: 'ACTIVE',
    threatClass: 'OMEGA',
    primaryTech: 'Nanotech Mark LXXXV & RT-01 Arc Core',
    affiliation: 'Stark Industries // S.H.I.E.L.D.',
    accentColor: '#00e5ff',
    quote: "I am Iron Man. The suit and I are one.",
    biography: "Genius, billionaire, playboy, philanthropist. Pioneer of arc reactor miniaturization and planetary defense matrices.",
    stats: {
      strength: 85,
      intelligence: 100,
      combat: 88,
      speed: 92,
      techLevel: 100,
    },
    equipment: [
      'Mark LXXXV Bleeding Edge Nanotech Armor',
      'Miniaturized Palladium Arc Reactor Core',
      'F.R.I.D.A.Y. Autonomous Tactical AI',
      'Unibeam & Repulsor Cannon Matrix'
    ],
    recentOps: [
      'Operation Clean Sweep - New York Defense',
      'Orbital Defense Satellite Network Deployment',
      'Nanotech Energy Shield Diagnostics'
    ]
  },
  {
    id: 'captain-america',
    codename: 'CAPTAIN AMERICA',
    realName: 'Steven Grant Rogers',
    role: 'Field Commander & Strike Lead',
    clearanceLevel: 9,
    status: 'ACTIVE',
    threatClass: 'ALPHA',
    primaryTech: 'Super Soldier Serum // Vibranium Shield',
    affiliation: 'Howling Commandos // S.H.I.E.L.D. // Avengers',
    accentColor: '#4d88ff',
    quote: "I can do this all day. Whatever it takes.",
    biography: "Enhanced to the peak of human physical potential by Dr. Erskine's serum. Symbol of liberty and master combat tactician.",
    stats: {
      strength: 80,
      intelligence: 85,
      combat: 100,
      speed: 78,
      techLevel: 65,
    },
    equipment: [
      'Vibranium-Steel Alloy Kinetic Dispersal Shield',
      'Kevlar-Nomex Strike Uniform',
      'Electromagnetic Gauntlet Recall System'
    ],
    recentOps: [
      'Project Insight Infiltration & Neutralization',
      'S.T.R.I.K.E. Tactical Protocol Enforcement',
      'Avengers Global Training Matrix'
    ]
  },
  {
    id: 'thor',
    codename: 'THOR ODINSON',
    realName: 'Thor Odinson',
    role: 'Cosmic Liaison & God of Thunder',
    clearanceLevel: 8,
    status: 'DEPLOYED',
    threatClass: 'COSMIC',
    primaryTech: 'Mjölnir & Stormbreaker // Asgardian Channeling',
    affiliation: 'Asgardian Royal House // Avengers',
    accentColor: '#ffd000',
    quote: "Bring me Thanos! I choose to run toward my problems.",
    biography: "Crown Prince of Asgard, wielder of the storm, possessor of ancient cosmic power and immense divine strength.",
    stats: {
      strength: 100,
      intelligence: 75,
      combat: 95,
      speed: 90,
      techLevel: 70,
    },
    equipment: [
      'Stormbreaker (Uru Forged Battleaxe)',
      'Mjölnir Channeling Artifact',
      'Enchanted Asgardian Battle Plate'
    ],
    recentOps: [
      'Bifrost Anomaly Stabilization in Sector 9',
      'Nine Realms Treaty Enforcement',
      'Cosmic Energy Surge Interception'
    ]
  },
  {
    id: 'black-widow',
    codename: 'BLACK WIDOW',
    realName: 'Natalia Alianovna Romanova',
    role: 'Black Ops & Global Infiltration Director',
    clearanceLevel: 9,
    status: 'ACTIVE',
    threatClass: 'ALPHA',
    primaryTech: 'Widow’s Bite Electro-Shock // Stealth Web',
    affiliation: 'Red Room Graduate // S.H.I.E.L.D. Special Ops',
    accentColor: '#ff3344',
    quote: "I used to have nothing. And then I got this family.",
    biography: "World-class assassin turned premier S.H.I.E.L.D. operative. Master of espionage, psychological analysis, and close-quarters lethal combat.",
    stats: {
      strength: 65,
      intelligence: 95,
      combat: 98,
      speed: 82,
      techLevel: 80,
    },
    equipment: [
      'Widow’s Bite 300,000V Electro-Shock Gauntlets',
      'Dual Baton Kinetic Multi-Tools',
      'Holographic Disguise Matrix Photostatic Veil'
    ],
    recentOps: [
      'Budapest Protocol Recovery Phase IV',
      'Hydra Deep Sleep Cell Neutralization',
      'Global Intelligence Network Surveillance'
    ]
  },
  {
    id: 'hulk',
    codename: 'THE INCREDIBLE HULK',
    realName: 'Dr. Robert Bruce Banner',
    role: 'Biophysical Research & Heavy Siege Asset',
    clearanceLevel: 9,
    status: 'STANDBY',
    threatClass: 'OMEGA',
    primaryTech: 'Gamma Radiation Metamorphosis // Cellular Regeneration',
    affiliation: 'Culver University // S.H.I.E.L.D. // Avengers',
    accentColor: '#00ff66',
    quote: "That's my secret, Cap: I'm always angry.",
    biography: "Brilliant nuclear physicist and biochemist who transformed into an unstoppable titan of infinite rage and sheer kinetic power.",
    stats: {
      strength: 100,
      intelligence: 98,
      combat: 85,
      speed: 75,
      techLevel: 90,
    },
    equipment: [
      'Stark-Engineered Elastic Nanofiber Stretchy Wear',
      'Gamma Radiation Emission Suppressor Ring',
      'Biolab Quantum Cellular Analyzer'
    ],
    recentOps: [
      'Sokovia Perimeter Containment Protocol',
      'Quantum Tunneling Biological Safety Trials',
      'Sub-Atomic Particle Resonance Mapping'
    ]
  },
  {
    id: 'hawkeye',
    codename: 'HAWKEYE',
    realName: 'Clinton Francis Barton',
    role: 'Tactical Recon & Precision Marksman',
    clearanceLevel: 8,
    status: 'ACTIVE',
    threatClass: 'ALPHA',
    primaryTech: 'Recurve Bow Matrix // Trick Arrow Warheads',
    affiliation: 'Circus of Crime // S.H.I.E.L.D. Special Ops',
    accentColor: '#9966ff',
    quote: "You shoot and you miss, you die. I don't miss.",
    biography: "Master archer with superhuman spatial awareness and precision accuracy. Infiltration specialist and veteran field operative.",
    stats: {
      strength: 68,
      intelligence: 82,
      combat: 92,
      speed: 80,
      techLevel: 78,
    },
    equipment: [
      'Modular Carbon-Titanium Recurve Compound Bow',
      'Multi-payload Quiver (EMP, Sonic, Thermite, Pym)',
      'Thermal/Night-vision Retinal HUD Shades'
    ],
    recentOps: [
      'Rogue Cartel Armory Interception',
      'Perimeter Watch at Facility 17',
      'Precision Reconnaissance in Urban Grid'
    ]
  }
];
