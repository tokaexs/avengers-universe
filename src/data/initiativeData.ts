export interface InitiativeProtocol {
  id: string;
  code: string;
  title: string;
  classification: string;
  summary: string;
  status: 'ONLINE' | 'ACTIVE' | 'ENFORCED' | 'STANDBY';
  telemetryMetric: string;
  icon: string;
}

export const INITIATIVE_PROTOCOLS: InitiativeProtocol[] = [
  {
    id: 'global-defense',
    code: 'PROT-01 // AEGIS',
    title: 'Planetary Defense Matrix',
    classification: 'TOP SECRET // LEVEL 10',
    summary: 'Constellation of Stark orbital defense satellites providing early-warning detection for extraterrestrial incursions and hypersonic threats.',
    status: 'ONLINE',
    telemetryMetric: '99.98% COVERAGE',
    icon: 'orbital'
  },
  {
    id: 'rapid-response',
    code: 'PROT-02 // QUINJET',
    title: 'Supersonic Incursion Strike',
    classification: 'RESTRICTED // LEVEL 8',
    summary: 'Sub-orbital stealth Quinjets capable of mach 4.2 deployment anywhere on earth within 45 minutes of threat confirmation.',
    status: 'ACTIVE',
    telemetryMetric: '< 45 MIN ETA',
    icon: 'strike'
  },
  {
    id: 'tesseract-containment',
    code: 'PROT-03 // QUANTUM',
    title: 'Cosmic Artifact Containment',
    classification: 'EYES ONLY // LEVEL 10',
    summary: 'Electromagnetic & quantum phase dampening fields to neutralize gamma, tesseract, and infinity-tier energy signatures.',
    status: 'ENFORCED',
    telemetryMetric: '0.00 μSv LEAKAGE',
    icon: 'shield'
  },
  {
    id: 'stark-mesh',
    code: 'PROT-04 // FRIDAY',
    title: 'Neural Comms & Tactical Mesh',
    classification: 'CONFIDENTIAL // LEVEL 7',
    summary: 'Encrypted low-latency tactical battlefield HUD link with real-time biometric tracking and ballistic trajectory computation.',
    status: 'ONLINE',
    telemetryMetric: '0.4ms LATENCY',
    icon: 'radar'
  }
];

export const TIMELINE_LOGS = [
  {
    year: '2008',
    event: 'INITIATIVE CONCEPT',
    description: 'Director Nicholas J. Fury officially files Directive 7-A following the Mark I armor verification in Malibu.'
  },
  {
    year: '2012',
    event: 'BATTLE OF NEW YORK',
    description: 'First official deployment of the Avengers. Wormhole threat neutralized over Manhattan.'
  },
  {
    year: '2015',
    event: 'SOKOVIA ACCORDS DRAFT',
    description: 'Establishment of new tactical parameters and orbital oversight framework.'
  },
  {
    year: '2019',
    event: 'QUANTUM CHRONO HEIST',
    description: 'Coordinated temporal retrieval mission across the quantum realm.'
  },
  {
    year: 'PRESENT',
    event: 'GLOBAL OVERSIGHT 2.0',
    description: 'Next-generation nanotech and decentralized planetary defense readiness.'
  }
];
