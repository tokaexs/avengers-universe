export interface TechItem {
  id: string;
  title: string;
  classification: string;
  developer: string;
  status: string;
  description: string;
  accentColor: string;
  telemetry: {
    label: string;
    value: string;
  }[];
  specifications: string[];
}

export const TECHNOLOGY_DATA: TechItem[] = [
  {
    id: 'arc-reactor',
    title: 'ARC REACTOR CORE MATRIX',
    classification: 'CLEAN FUSION ENERGY SOURCE',
    developer: 'STARK INDUSTRIES // HOWARD & TONY STARK',
    status: 'ACTIVE // GLOBAL REPLICATION RESTRICTED',
    description: 'Self-sustaining magnetic containment cold fusion generator capable of producing gigawatts of electrical discharge per second with zero radioactive waste.',
    accentColor: '#00e5ff',
    telemetry: [
      { label: 'OUTPUT', value: '18.4 GJ/s' },
      { label: 'EFFICIENCY', value: '99.98%' },
      { label: 'CONTAINMENT', value: 'TOROIDAL MAG-FIELD' },
    ],
    specifications: [
      'Synthesized non-toxic atomic isotope core',
      'Dual-bus electromagnetic energy routing',
      'Quantum zero-point thermal dissipation',
      'Miniaturized sub-kilogram form factor',
    ],
  },
  {
    id: 'nanotech-armor',
    title: 'BLEEDING EDGE NANOTECH',
    classification: 'RECONFIGURABLE MOLECULAR ARMOR',
    developer: 'STARK INDUSTRIES // T. STARK',
    status: 'ACTIVE // MARK L & MARK LXXXV',
    description: 'Billion-particle housing stored in a chest RT unit capable of near-instantaneous molecular reconfiguration into shields, repulsor cannons, energy blades, and thrusters.',
    accentColor: '#ffd700',
    telemetry: [
      { label: 'PARTICLE COUNT', value: '8.4 BILLION' },
      { label: 'RECONFIG TIME', value: '0.18 SECONDS' },
      { label: 'TENSILE STRENGTH', value: '45,000 MPa' },
    ],
    specifications: [
      'Self-healing molecular matrix structure',
      'Direct neural link bio-feedback command',
      'Multi-spectral environmental energy absorption',
      'Integrated nano-gauntlet containment channels',
    ],
  },
  {
    id: 'jarvis-friday',
    title: 'J.A.R.V.I.S. & F.R.I.D.A.Y. AI',
    classification: 'AUTONOMOUS STRATEGIC TACTICAL AI',
    developer: 'STARK CYBERNETICS',
    status: 'INTEGRATED // GLOBAL S.H.I.E.L.D. OVERWATCH',
    description: 'Quantum-level natural language neural networks providing real-time combat analytics, satellite ballistic tracking, cyber warfare defense, and avionics flight control.',
    accentColor: '#00e5ff',
    telemetry: [
      { label: 'CALC SPEED', value: '2.4 EXAFLOPS' },
      { label: 'RESPONSE LATENCY', value: '0.002 ms' },
      { label: 'NEURAL LAYERS', value: '1,024 QUANTUM' },
    ],
    specifications: [
      'Real-time threat predictive calculation',
      'Global satellite constellation direct access',
      'Independent sub-routine tactical autonomous piloting',
      'Cryptographic unbreakable quantum handshake',
    ],
  },
  {
    id: 'vibranium-shield',
    title: 'VIBRANIUM KINETIC SHIELD',
    classification: 'ABSORPTIVE DEFENSIVE ORDNANCE',
    developer: 'S.R.S. // HOWARD STARK (1942)',
    status: 'ACTIVE // CAPTAIN AMERICA ASSIGNED',
    description: 'Rare Wakandan vibranium alloy forged into an aerodynamic concave disc that completely absorbs kinetic energy and vibrations without transferring impact force.',
    accentColor: '#4d88ff',
    telemetry: [
      { label: 'KINETIC ABSORB', value: '100.0%' },
      { label: 'AERODYNAMICS', value: 'FLAWLESS DRAG 0.04' },
      { label: 'COMPOSITION', value: '100% VIBRANIUM ALLOY' },
    ],
    specifications: [
      'Zero kinetic recoil transmission to user',
      'Ricochet ballistic trajectory preservation',
      'Extreme thermal & concussive resistance',
      'Electromagnetic recall harness compatibility',
    ],
  },
  {
    id: 'quinjet-stealth',
    title: 'QUINJET TACTICAL STRIKE CRAFT',
    classification: 'VTOL STEALTH SUPERSONIC TRANSPORT',
    developer: 'S.H.I.E.L.D. AEROSPACE // STARK UPGRADE',
    status: 'DEPLOYED // WORLDWIDE BASES',
    description: 'Twin-engine variable vector vertical takeoff and landing aerospace craft equipped with optical camouflage, sub-orbital capabilities, and heavy tactical ordnance.',
    accentColor: '#00e5ff',
    telemetry: [
      { label: 'MAX VELOCITY', value: 'MACH 4.2' },
      { label: 'CEILING', value: '120,000 FT' },
      { label: 'STEALTH RATING', value: 'CLASS 10 RADAR ABSORB' },
    ],
    specifications: [
      'Rotary vector turbofan VTOL thrusters',
      'Photostatic active optical cloaking skin',
      'Auxiliary deep-space vacuum life support',
      'Dual 30mm rotary cannons & micro-torpedo bays',
    ],
  },
  {
    id: 'pym-particles',
    title: 'PYM PARTICLE QUANTUM MATRIX',
    classification: 'SUB-ATOMIC COMPRESSION SCIENCE',
    developer: 'PYM TECHNOLOGIES // DR. HANK PYM',
    status: 'CLASSIFIED // AVENGERS ENDGAME APPROVED',
    description: 'Sub-atomic particle field capable of altering the distance between atomic nuclei, allowing objects and organic matter to shrink to the Quantum Realm or grow to gigantic scale.',
    accentColor: '#ff2233',
    telemetry: [
      { label: 'MIN SCALE', value: '10^-35 METERS (PLANCK)' },
      { label: 'MAX SCALE', value: '65 FEET (GIANT-MAN)' },
      { label: 'STABILITY', value: 'ENCASED GAS REGULATOR' },
    ],
    specifications: [
      'Preservation of mass and density ratio',
      'Quantum Realm temporal vortex navigation',
      'Inter-dimensional mass transference buffer',
      'Time Heist GPS navigation matrix integration',
    ],
  },
];
