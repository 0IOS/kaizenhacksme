import { EventItem, Organizer, Partner } from '../types';

export const FEATURED_EVENT: EventItem = {
  id: 'code-forge-2026',
  name: 'CODE//FORGE',
  code: 'CF_026',
  edition: 'VOL. 05',
  year: '2026',
  date: '24—26 OCT 2026',
  city: 'NEW DELHI',
  venue: 'INNOVATION COMPLEX, SECTOR 62, DELHI NCR',
  duration: '48 HOURS',
  builderCount: '500+ BUILDERS',
  teamsCount: '120 TEAMS',
  prizePool: '₹500,000+',
  status: 'REGISTRATION_OPEN',
  image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop',
  tags: ['SYSTEMS', 'AI AGENTS', 'HARDWARE', 'ZERO KNOWLEDGE'],
  tracks: [
    '01 // AUTONOMOUS AI & RUNTIMES',
    '02 // HIGH-PERFORMANCE COMPUTING & INFRA',
    '03 // EMBEDDED HARDWARE & PHYSICAL COMPUTING',
    '04 // DECENTRALIZED PROTOCOLS & CRYPTO',
    '05 // OPEN CREATIVE EXPERIMENTS'
  ],
  schedule: [
    { time: 'FRI 18:00', title: 'CHECK-IN & TEAM LOCK', desc: 'Hardware lab opens, track briefs released.' },
    { time: 'FRI 21:00', title: 'HACKING COMMENCES', desc: '48-hour continuous sprint begins.' },
    { time: 'SAT 14:00', title: 'MIDWAY ARCHITECTURE REVIEW', desc: '1-on-1 technical feedback with founders & mentors.' },
    { time: 'SAT 03:00', title: '3AM MIDNIGHT FUEL & PLAY', desc: 'Chai, music, and lightning speedruns.' },
    { time: 'SUN 15:00', title: 'SUBMISSIONS HARD DEADLINE', desc: 'GitHub repos locked, live deployments verified.' },
    { time: 'SUN 17:00', title: 'LIVE STAGE DEMOS', desc: 'Top 10 teams pitch to top tier VC partners & founders.' }
  ],
  description: 'A 48-hour sleepless marathon for the top 500 engineers, hackers, and researchers in India. Zero panels. Zero sponsor pitches. Pure shipping.'
};

export const PAST_EVENTS: EventItem[] = [
  {
    id: 'hack-delhi-2026',
    name: 'HACK//DELHI',
    code: 'HD_26',
    edition: 'VOL. 04',
    year: '2026',
    date: '14—16 MAR 2026',
    city: 'NEW DELHI',
    venue: 'EXPOCENTRE NOIDA',
    duration: '48 HOURS',
    builderCount: '1.2K BUILDERS',
    teamsCount: '240 TEAMS',
    prizePool: '₹350,000',
    status: 'COMPLETED',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop',
    tags: ['AI', 'INFRA', 'MOBILE'],
    tracks: ['LOCAL LLMs', 'EDGE COMPUTING', 'SYSTEMS'],
    winners: [
      { project: 'KestrelDB', track: 'Infra', team: 'Team Void', github: 'https://github.com' },
      { project: 'NeuroVoice', track: 'AI', team: '0xEcho', demo: 'https://demo.dev' },
      { project: 'SatMesh', track: 'Hardware', team: 'Payload Ops' }
    ],
    description: 'The largest gathering of systems and AI builders in North India. 240 projects shipped in 48 hours.'
  },
  {
    id: 'synapse-01',
    name: 'SYNAPSE//01',
    code: 'SYN_01',
    edition: 'VOL. 03',
    year: '2025',
    date: '08—10 NOV 2025',
    city: 'BANGALORE',
    venue: 'KORAMANGALA HUB',
    duration: '48 HOURS',
    builderCount: '850 BUILDERS',
    teamsCount: '170 TEAMS',
    prizePool: '₹400,000',
    status: 'COMPLETED',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
    tags: ['ROBOTICS', 'AI', 'EMBEDDED'],
    tracks: ['AUTONOMOUS ROBOTICS', 'VISION MODELS', 'EDGE AI'],
    winners: [
      { project: 'ChronoGlove', track: 'Robotics', team: 'CyberHex' },
      { project: 'PulseOS', track: 'Edge', team: 'KernelPanic' }
    ],
    description: 'Hardware lab hackathon featuring microcontrollers, cameras, robotic arms, and custom PCB fabrication.'
  },
  {
    id: '0x-forge',
    name: '0X//FORGE',
    code: '0XF_25',
    edition: 'VOL. 02',
    year: '2025',
    date: '18—20 JUL 2025',
    city: 'GLOBAL ONLINE',
    venue: 'VIRTUAL CLOUD DISCORD',
    duration: '48 HOURS',
    builderCount: '1.4K BUILDERS',
    teamsCount: '310 TEAMS',
    prizePool: '$45,000',
    status: 'COMPLETED',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
    tags: ['CRYPTO', 'ZK-SNARKS', 'DISTRIBUTED'],
    tracks: ['ZERO KNOWLEDGE', 'CONSENSUS', 'PRIVACY'],
    winners: [
      { project: 'ZK-Passport', track: 'ZK-SNARKs', team: 'Cipherpunk Delhi' },
      { project: 'HyperLoom', track: 'DeFi', team: 'VectorX' }
    ],
    description: '48-hour global sprint focused on zero-knowledge cryptography, peer-to-peer protocols, and scalable chains.'
  },
  {
    id: 'prototype-04',
    name: 'PROTOTYPE_04',
    code: 'PRT_04',
    edition: 'VOL. 01',
    year: '2024',
    date: '12—14 DEC 2024',
    city: 'HYDERABAD',
    venue: 'T-HUB AUDITORIUM',
    duration: '48 HOURS',
    builderCount: '900 BUILDERS',
    teamsCount: '180 TEAMS',
    prizePool: '₹300,000',
    status: 'COMPLETED',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop',
    tags: ['DEVTOOLS', 'WEB PLATFORM', 'COMPILERS'],
    tracks: ['DEVELOPER TOOLING', 'WASM RUNTIMES', 'GRAPHICS'],
    winners: [
      { project: 'RustV8 Engine', track: 'DevTools', team: 'WasmBois' },
      { project: 'ShaderStudio', track: 'Graphics', team: 'Raymarching Labs' }
    ],
    description: 'Deep dive into tooling, fast compilers, WebAssembly runtimes, and low-level browser graphics.'
  }
];

export const ORGANIZERS: Organizer[] = [
  {
    id: 'varun',
    name: 'VARUN',
    role: 'FRONTEND & ARCHITECTURE',
    division: 'CORE FOUNDER',
    tagline: 'Obsessed with high-signal digital craft, extreme latency reduction & compiler design.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    github: 'https://github.com',
    twitter: 'https://x.com',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'aarav',
    name: 'AARAV',
    role: 'SYSTEMS & INFRASTRUCTURE',
    division: 'ENGINEERING LEAD',
    tagline: 'Distributed systems engineer. Built deployment pipelines scaling to millions of hits.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    github: 'https://github.com',
    twitter: 'https://x.com',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'riya',
    name: 'RIYA',
    role: 'COMMUNITY & PARTNERSHIPS',
    division: 'ECOSYSTEM LEAD',
    tagline: 'Connecting high-output hacker communities with global VC funds & deeptech studios.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
    github: 'https://github.com',
    twitter: 'https://x.com',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'kabir',
    name: 'KABIR',
    role: 'HARDWARE & LABS',
    division: 'PHYSICAL COMPUTE',
    tagline: 'Embedded engineer & PCB designer. Supplies custom FPGA rigs & oscilloscopes to builders.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    github: 'https://github.com',
    twitter: 'https://x.com',
    linkedin: 'https://linkedin.com'
  }
];

export const PARTNERS: Partner[] = [
  {
    id: 'google-cloud',
    name: 'GOOGLE CLOUD',
    category: 'INFRASTRUCTURE',
    tier: 'TITANIUM',
    logoText: 'Google Cloud',
    website: 'https://cloud.google.com',
    description: 'Providing scalable GPU clusters & Vertex AI credits to all accepted teams.'
  },
  {
    id: 'anthropic',
    name: 'ANTHROPIC',
    category: 'AI RESEARCH',
    tier: 'TITANIUM',
    logoText: 'Anthropic',
    website: 'https://anthropic.com',
    description: 'Frontier AI models and API tier access for autonomous agent builders.'
  },
  {
    id: 'supabase',
    name: 'SUPABASE',
    category: 'DATABASE & AUTH',
    tier: 'PLATINUM',
    logoText: 'Supabase',
    website: 'https://supabase.com',
    description: 'Instant Postgres, Auth, and Vector databases for rapid production builds.'
  },
  {
    id: 'github',
    name: 'GITHUB',
    category: 'DEVELOPER PLATFORM',
    tier: 'PLATINUM',
    logoText: 'GitHub',
    website: 'https://github.com',
    description: 'Official code platform, Actions compute, and Copilot licenses.'
  },
  {
    id: 'solana',
    name: 'SOLANA',
    category: 'DECENTRALIZED',
    tier: 'GOLD',
    logoText: 'Solana',
    website: 'https://solana.com',
    description: 'High throughput Layer 1 infrastructure and $15,000 track grants.'
  },
  {
    id: 'vercel',
    name: 'VERCEL',
    category: 'DEPLOYMENT',
    tier: 'GOLD',
    logoText: 'Vercel',
    website: 'https://vercel.com',
    description: 'Edge runtime deployment networks and zero-configuration hosting.'
  },
  {
    id: 'modal',
    name: 'MODAL',
    category: 'SERVERLESS AI',
    tier: 'ECOSYSTEM',
    logoText: 'Modal Labs',
    website: 'https://modal.com',
    description: 'Serverless cloud compute for Python, AI pipelines, and custom containers.'
  },
  {
    id: 'resend',
    name: 'RESEND',
    category: 'COMMUNICATION',
    tier: 'ECOSYSTEM',
    logoText: 'Resend',
    website: 'https://resend.com',
    description: 'Modern developer-first transactional messaging APIs.'
  }
];

export const KEY_STATS = [
  { value: '48H', label: 'SPRINT DURATION', sub: 'Non-stop hacking' },
  { value: '3,400+', label: 'BUILDERS GATHERED', sub: 'Across 5 cities' },
  { value: '18+', label: 'HACKATHONS HOSTED', sub: '100% Ship rate' },
  { value: '₹1.8CR+', label: 'GRANTS & SEED POOL', sub: 'Awarded directly' }
];
