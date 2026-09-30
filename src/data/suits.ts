export interface IronManSuit {
  id: string;
  model: string;
  name: string;
  era: string;
  designation: string;
  power: string;
  propulsion: string;
  weaponSystems: string[];
  status: string;
  description: string;
  primaryColor: string;
  accentColor: string;
  stats: {
    armor: number;
    power: number;
    mobility: number;
    weapons: number;
  };
  hotspots: {
    name: string;
    description: string;
    telemetry: string;
  }[];
}

export const IRON_MAN_SUITS: IronManSuit[] = [
  {
    id: 'mark-1',
    model: 'MARK I',
    name: 'THE CAVE PROTOTYPE',
    era: '2008 // AFGHANISTAN PROVINCE',
    designation: 'CRUDE CAST-IRON HEAVY EXOSKELETON',
    power: 'MINIATURIZED ARC REACTOR MARK I',
    propulsion: 'SOLID-FUEL SHORT-BURST ROCKETS',
    weaponSystems: ['DUAL DENSE-FLAME THROWERS', 'MANUALLY ARMED MICRO-MISSILE', 'CRUDE PNEUMATIC STRIKE'],
    status: 'DECOMMISSIONED // RESTORED IN HALL OF ARMORS',
    description: 'Constructed under extreme duress in a cave using scavenged Stark missile components. The foundation of powered armor technology.',
    primaryColor: '#7a8288',
    accentColor: '#00e5ff',
    stats: {
      armor: 72,
      power: 60,
      mobility: 35,
      weapons: 65,
    },
    hotspots: [
      { name: 'ARC REACTOR', description: '0.5 GJ/s Palladium fusion generator keeping shrapnel from heart.', telemetry: 'FREQ: 2.4 THz' },
      { name: 'CHEST PLATING', description: 'Scavenged 0.5-inch cast iron and crude titanium alloy plates.', telemetry: 'DENSITY: 7.8 g/cm³' },
      { name: 'GAUNTLETS', description: 'Dual high-pressure napalm/fuel spray nozzles with spark ignition.', telemetry: 'TEMP: 1,400°C' },
      { name: 'BOOT ROCKETS', description: 'Solid propellant boosters providing single-hop ballistic lift.', telemetry: 'THRUST: 12.4 kN' },
    ],
  },
  {
    id: 'mark-2',
    model: 'MARK II',
    name: 'THE FLIGHT PROTOTYPE',
    era: '2008 // MALIBU RESEARCH LAB',
    designation: 'POLISHED CHROME AERODYNAMIC PROTOTYPE',
    power: 'PALLADIUM CORE ARC REACTOR MARK II',
    propulsion: 'REFINED VECTOR-THRUST VARIABLE BOOTS',
    weaponSystems: ['HIGH-DENSITY PALM REPULSORS', 'AILERON FLIGHT BRAKES', 'TACTICAL HUD RADAR'],
    status: 'TRANSFERRED // WAR MACHINE UPGRADE',
    description: 'First true high-speed streamlined flight chassis. Overcame initial icing limits at high altitudes with advanced metallurgy.',
    primaryColor: '#e0e8f0',
    accentColor: '#00e5ff',
    stats: {
      armor: 68,
      power: 80,
      mobility: 92,
      weapons: 60,
    },
    hotspots: [
      { name: 'HELMET HUD', description: 'J.A.R.V.I.S. neural link with real-time vector trajectory telemetry.', telemetry: 'RES: 8K RETINA' },
      { name: 'PALM REPULSORS', description: 'High-density muon-plasma flight stabilizers and concussive cannons.', telemetry: 'OUTPUT: 1.2 GW' },
      { name: 'AILERONS', description: 'Rear titanium control flaps for Mach 2+ aerodynamic stabilization.', telemetry: 'MAX SPEED: MACH 2.8' },
      { name: 'CHROME HULL', description: 'Specular polished unpainted chrome alloy with anti-drag coating.', telemetry: 'DRAG COEFF: 0.14' },
    ],
  },
  {
    id: 'mark-3',
    model: 'MARK III',
    name: 'THE ICONIC COMBAT ARMOR',
    era: '2008 // GULMIRA & STARK TOWER',
    designation: 'GOLD-TITANIUM ALLOY BATTLE DRESS',
    power: 'ARC REACTOR RT-01 (DUAL BUS)',
    propulsion: 'SUPERSONIC AFTERBURNER FLIGHT SUITE',
    weaponSystems: ['PALM REPULSOR BLASTERS', 'CHEST UNIBEAM', 'SHOULDER MULTI-MISSILE PODS', 'ARM-MOUNTED ANTI-TANK MISSILE', 'HIP DECOY FLARES'],
    status: 'ARCHIVED // BATTLE-TESTED',
    description: 'The definitive combat armor featuring gold-titanium alloy to eliminate icing issues, paired with iconic hot-rod red livery.',
    primaryColor: '#c8102e',
    accentColor: '#ffd700',
    stats: {
      armor: 88,
      power: 90,
      mobility: 86,
      weapons: 92,
    },
    hotspots: [
      { name: 'GOLD-TITANIUM ALLOY', description: 'Cryogenic-resistant structural shell retaining high strength-to-weight ratio.', telemetry: 'TENSILE: 1,450 MPa' },
      { name: 'CHEST UNIBEAM', description: 'Direct energy discharge from Arc Reactor core delivering cataclysmic focused plasma.', telemetry: 'BURST: 3.8 GW/s' },
      { name: 'SHOULDER PODS', description: 'Miniaturized micro-explosive smart munitions targeting multiple hostiles.', telemetry: 'CAPACITY: 12 WARHEADS' },
      { name: 'BOOT THRUSTERS', description: 'Supersonic twin propulsion units capable of Mach 3 sustained cruising.', telemetry: 'CRUISE: MACH 3.2' },
    ],
  },
  {
    id: 'mark-4',
    model: 'MARK IV',
    name: 'THE CELEBRATION SUIT',
    era: '2010 // STARK EXPO OPENING',
    designation: 'OPTIMIZED LUXURY & MODULAR SERVICING',
    power: 'PALLADIUM ARC REACTOR (IMPROVED EFFICIENCY)',
    propulsion: 'QUIET-CRUISE VECTOR PROPULSION',
    weaponSystems: ['CALIBRATED PALM REPULSORS', 'EXPANDED SHOULDER PODS', 'ENHANCED CHEST UNIBEAM'],
    status: 'ARCHIVED // STARK LABS',
    description: 'Engineered for seamless pilot entry and exit with streamlined chassis lines and upgraded computational avionics.',
    primaryColor: '#b80c25',
    accentColor: '#ffc700',
    stats: {
      armor: 85,
      power: 88,
      mobility: 90,
      weapons: 86,
    },
    hotspots: [
      { name: 'ENTRY GANTRY LINK', description: 'Automated rapid gantry assembly and disassembly latching points.', telemetry: 'GANTRY SPEED: 8.2s' },
      { name: 'AVIONICS CORE', description: 'Upgraded J.A.R.V.I.S. predictive tactical combat calculation processor.', telemetry: 'OPS: 450 TFLOPS' },
      { name: 'REPULSOR FOCUS', description: 'Variable aperture electromagnetic lenses for wide beam or pinpoint burn.', telemetry: 'FOCUS: 0.1mm - 2m' },
    ],
  },
  {
    id: 'mark-5',
    model: 'MARK V',
    name: 'THE BRIEFCASE SUIT',
    era: '2010 // MONACO GRAND PRIX',
    designation: 'RAPID-DEPLOY EMERGENCY BRIEFCASE ARMOR',
    power: 'COMPACT LITHIUM-PALLADIUM CELL',
    propulsion: 'LOW-ALTITUDE REACTION CONTROL ONLY',
    weaponSystems: ['RAPID CONCUSSIVE REPULSORS', 'HIGH-FREQUENCY ENERGY DEFLECTORS'],
    status: 'DAMAGED // MONACO RACE TRACK RESTORATION',
    description: 'Collapsible titanium-interlock emergency armor stored inside an executive briefcase for instantaneous deploy anywhere.',
    primaryColor: '#c02030',
    accentColor: '#e0e8f0',
    stats: {
      armor: 62,
      power: 74,
      mobility: 80,
      weapons: 70,
    },
    hotspots: [
      { name: 'BRIEFCASE MATRIX', description: 'Interlocking lightweight scales that expand across the pilot in seconds.', telemetry: 'DEPLOY: 14.8s' },
      { name: 'INTERLOCK PLATES', description: 'Multi-layer articulated scales providing rapid flexible protection.', telemetry: 'LAYERS: 180 SCALES' },
      { name: 'COMPACT CORE', description: 'Ultra-thin chest emitter designed for suitcase containment.', telemetry: 'THICKNESS: 18mm' },
    ],
  },
  {
    id: 'mark-6',
    model: 'MARK VI',
    name: 'THE NEW ELEMENT ARMOR',
    era: '2010 - 2012 // STARK EXPO & NEW YORK',
    designation: 'TRIANGULAR BADASSIUM CORE WAR CHASSIS',
    power: 'SYNTHESIZED VIBRANIUM/BADASSIUM CORE',
    propulsion: 'HIGH-OUTPUT DEEP-SPACE / UNDERWATER ENGINE',
    weaponSystems: ['200-PETAWATT SINGLE-USE LASERS', 'TRIANGULAR UNIBEAM OVERLOAD', 'MICRO-MISSILE ARM PODS'],
    status: 'BATTLE HONORS // BATTLE OF NEW YORK',
    description: 'First suit powered by the synthesized non-toxic new element. Triangular unibeam core delivered unprecedented sustained energy output.',
    primaryColor: '#b80c25',
    accentColor: '#00e5ff',
    stats: {
      armor: 94,
      power: 98,
      mobility: 92,
      weapons: 96,
    },
    hotspots: [
      { name: 'TRIANGULAR CORE', description: 'Synthesized atomic element generating zero toxicity and limitless energy.', telemetry: 'POWER: 18 GJ/s' },
      { name: 'WRIST LASERS', description: 'Single-use 200-petawatt high-energy infrared cutter cartridges.', telemetry: 'ENERGY: 200 PW' },
      { name: 'DEEP DIVE SEALS', description: 'Hermetically sealed for deep ocean underwater repairs and sub-orbital flight.', telemetry: 'DEPTH: 5,000m' },
    ],
  },
  {
    id: 'mark-7',
    model: 'MARK VII',
    name: 'THE AVENGERS RAPID DEPLOY',
    era: '2012 // BATTLE OF NEW YORK',
    designation: 'LASER-GUIDED HOMING POD DEPLOYMENT ARMOR',
    power: 'HIGH-OUTPUT SYNTHESIZED ISOTOPE CORE',
    propulsion: 'SUPERCHARGED BACK-PACK THRUSTER PACK',
    weaponSystems: ['RAPID-FIRE GAUNTLET MISSILE PODS', 'RECHARGEABLE MULTI-BEAM LASERS', 'ARMOR-PIERCING UNIBEAM', 'QUAD THIGH FLARE PODS'],
    status: 'HEROIC SERVICE // DIRECTED MISSILE INTO PORTAL',
    description: 'Laser-guided homing pod deployed mid-fall in New York. Heavy weapons loadout designed specifically for prolonged alien warfare.',
    primaryColor: '#b80c25',
    accentColor: '#ffd700',
    stats: {
      armor: 96,
      power: 98,
      mobility: 95,
      weapons: 99,
    },
    hotspots: [
      { name: 'HOMING BEACON POD', description: 'Laser-targeted pod that locks onto Stark wristbands and latches mid-air.', telemetry: 'TARGET LOCK: 0.2s' },
      { name: 'BACKPACK THRUSTERS', description: 'Heavy auxiliary boosters providing escape velocity acceleration.', telemetry: 'THRUST: 48.6 kN' },
      { name: 'RECHARGEABLE LASERS', description: 'Integrated battery-fed laser emitters capable of sustained slicing.', telemetry: 'CYCLES: 8 BURSTS' },
      { name: 'THIGH PODS', description: 'Multi-directional decoy flares and concussion munitions.', telemetry: 'PAYLOAD: 32 UNITS' },
    ],
  },
];
