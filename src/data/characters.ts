export interface Character {
  id: string;
  indexNumber: string;
  codename: string;
  name: string;
  keywords: string[];
  tagline: string;
  description: string;
  abilities: string[];
  affiliation: string;
  accentColor: string;
  glowColor: string;
  quote: string;
  powerClass: string;
  image: string;
}

export const CHARACTERS: Character[] = [
  {
    id: 'iron-man',
    indexNumber: '01',
    codename: 'IRON MAN',
    name: 'ANTHONY EDWARD STARK',
    keywords: ['GENIUS', 'BILLIONAIRE', 'AVENGER'],
    tagline: 'TACTICAL ARMOR MATRIX // FLIGHT & REPULSORS',
    description: 'Visionary engineer behind the Arc Reactor and nanotech bleeding-edge armor. Founder and technological cornerstone of the Avengers Initiative.',
    abilities: ['Supersonic Flight Matrix', 'Nanotech Bleeding Edge Armor', 'Chest Unibeam & Palm Repulsors', 'F.R.I.D.A.Y. Autonomous AI'],
    affiliation: 'STARK INDUSTRIES // S.H.I.E.L.D.',
    accentColor: '#00e5ff',
    glowColor: 'rgba(0, 229, 255, 0.35)',
    quote: 'I am Iron Man. The suit and I are one.',
    powerClass: 'OMEGA-TIER TECH',
    image: '/assets/characters/ironman.svg',
  },
  {
    id: 'captain-america',
    indexNumber: '02',
    codename: 'CAPTAIN AMERICA',
    name: 'STEVEN GRANT ROGERS',
    keywords: ['SOLDIER', 'LEADER', 'GUARDIAN'],
    tagline: 'SUPER SOLDIER SERUM // VIBRANIUM KINETIC SHIELD',
    description: 'Enhanced to peak human potential and master of battlefield tactics. The moral compass and field commander of Earth’s Mightiest Heroes.',
    abilities: ['Peak Physical & Mental Conditioning', 'Vibranium Kinetic Dispersal Shield', 'Master Tactician & Close Combat', 'Unbreakable Indomitable Will'],
    affiliation: 'HOWLING COMMANDOS // AVENGERS',
    accentColor: '#4d88ff',
    glowColor: 'rgba(77, 136, 255, 0.35)',
    quote: 'I can do this all day. Whatever it takes.',
    powerClass: 'ALPHA-TIER STRIKE',
    image: '/assets/characters/captainamerica.svg',
  },
  {
    id: 'thor',
    indexNumber: '03',
    codename: 'THOR ODINSON',
    name: 'THOR ODINSON OF ASGARD',
    keywords: ['GOD', 'THUNDER', 'IMMORTAL'],
    tagline: 'STORMBREAKER // ASGARDIAN LIGHTNING CHANNEL',
    description: 'Prince of Asgard and wielder of ancient cosmic fury. Channels cataclysmic lightning and weather manipulation across the Nine Realms.',
    abilities: ['Electrokinesis & Weather Command', 'Stormbreaker & Mjölnir Wielder', 'Godlike Strength & Invulnerability', 'Bifrost Interdimensional Travel'],
    affiliation: 'ASGARDIAN ROYAL HOUSE // AVENGERS',
    accentColor: '#ffd000',
    glowColor: 'rgba(255, 208, 0, 0.35)',
    quote: 'Bring me Thanos! I choose to run toward my problems.',
    powerClass: 'COSMIC-TIER DEITY',
    image: '/assets/characters/thor.svg',
  },
  {
    id: 'hulk',
    indexNumber: '04',
    codename: 'THE INCREDIBLE HULK',
    name: 'DR. ROBERT BRUCE BANNER',
    keywords: ['GAMMA', 'COLOSSUS', 'DESTRUCTOR'],
    tagline: 'GAMMA RESONANCE // UNLIMITED KINETIC FORCE',
    description: 'Nuclear physicist transformed into a titan of unstoppable kinetic fury. The ultimate heavy assault powerhouse in planetary defense.',
    abilities: ['Infinite Scaled Strength & Rage', 'Instant Cellular Regeneration', 'Thunderclap Shockwave Blast', 'Superhuman Leaping & Durability'],
    affiliation: 'CULVER BIO-LABS // AVENGERS',
    accentColor: '#00ff66',
    glowColor: 'rgba(0, 255, 102, 0.35)',
    quote: "That's my secret, Cap: I'm always angry.",
    powerClass: 'OMEGA-TIER SIEGE',
    image: '/assets/characters/hulk.svg',
  },
  {
    id: 'black-widow',
    indexNumber: '05',
    codename: 'BLACK WIDOW',
    name: 'NATALIA ALIANOVNA ROMANOVA',
    keywords: ['ASSASSIN', 'SHADOW', 'TACTICIAN'],
    tagline: 'WIDOW’S BITE 300KV // STEALTH INFILTRATION',
    description: 'Master of lethal espionage, interrogation, and psychological combat. S.H.I.E.L.D.’s most dangerous operative and black-ops director.',
    abilities: ['300,000V Electroshock Gauntlets', 'Acrobatic Close Quarters Lethal Combat', 'Photostatic Veil Holographic Disguise', 'Global Espionage & Infiltration'],
    affiliation: 'RED ROOM ALUMNI // S.H.I.E.L.D.',
    accentColor: '#ff3344',
    glowColor: 'rgba(255, 51, 68, 0.35)',
    quote: 'I used to have nothing. And then I got this family.',
    powerClass: 'ALPHA-TIER ESPIONAGE',
    image: '/assets/characters/blackwidow.svg',
  },
  {
    id: 'hawkeye',
    indexNumber: '06',
    codename: 'HAWKEYE',
    name: 'CLINTON FRANCIS BARTON',
    keywords: ['MARKSMAN', 'RECON', 'HUNTER'],
    tagline: 'PRECISION ARROW MATRIX // SPECIAL PAYLOADS',
    description: 'Flawless marksman with superhuman spatial calculation. Precision strike operative capable of hitting targets from miles away with specialized payloads.',
    abilities: ['100% Precision Ballistic Accuracy', 'Multi-Warhead Trick Arrow Quiver (EMP, Sonic)', 'Tactical Reconnaissance & Infiltration', 'Master Archer & Combat Specialist'],
    affiliation: 'S.H.I.E.L.D. SPECIAL STRIKE // AVENGERS',
    accentColor: '#b366ff',
    glowColor: 'rgba(179, 102, 255, 0.35)',
    quote: "You shoot and you miss, you die. I don't miss.",
    powerClass: 'ALPHA-TIER RECON',
    image: '/assets/characters/hawkeye.svg',
  },
];
