import { EventItem, Organizer, Partner } from '../types';

export const REGISTRATION_URL = 'https://www.tinyurl.com/greentechideathon';
export const VENUE_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=DBRA+SOSE+Kalkaji+New+Delhi';

export const FEATURED_EVENT: EventItem = {
  id: 'greentech-ideathon-2026',
  name: 'GREENTECH',
  code: 'GT_001',
  edition: 'VOL. 01',
  year: '2026',
  date: 'COMING SOON',
  city: 'NEW DELHI',
  venue: 'CM SHRI / DBRA SOSE KALKAJI',
  duration: 'ONE DAY',
  builderCount: '50 SEATS',
  teamsCount: 'TEAMS OF 2–4',
  prizePool: 'TO BE REVEALED',
  status: 'REGISTRATION_OPEN',
  mapsUrl: VENUE_MAPS_URL,
  image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop',
  tags: ['IDEATHON', 'SDG', 'APPS', 'WEBSITES', 'GAMES'],
  tracks: [
    'SDG 03 // GOOD HEALTH & WELL-BEING',
    'SDG 04 // QUALITY EDUCATION',
    'SDG 07 // AFFORDABLE & CLEAN ENERGY',
    'SDG 09 // INDUSTRY, INNOVATION & INFRASTRUCTURE',
    'SDG 11 // SUSTAINABLE CITIES & COMMUNITIES',
    'SDG 13 // CLIMATE ACTION'
  ],
  schedule: [
    { time: 'TBA', title: 'TIMELINE COMING SOON', desc: 'The full run-of-show will be announced shortly.' }
  ],
  description: 'An ideathon where builders think of ideas that advance the UN Sustainable Development Goals — then bring them to life as an app, website, or game that tackles real-life problems.'
};

export const PAST_EVENTS: EventItem[] = [];

export const ORGANIZERS: Organizer[] = [
  {
    id: 'hamza',
    name: 'HAMZA KHAN',
    role: 'Founder & CEO',
    division: 'MAIN LEAD',
    tagline: 'Distributed systems engineer. Built deployment pipelines scaling to millions of hits.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    github: 'https://github.com/hamzakh9n',
    // twitter: 'https://x.com',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'vaun',
    name: 'VAUN RAIKWAR',
    role: 'Founder & Developer',
    division: 'TECH LEAD',
    tagline: 'Obsessed with high-signal digital craft, extreme latency reduction & compiler design.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    github: 'https://github.com/v4run-codez',
    // twitter: 'https://x.com',
    linkedin: 'https://linkedin.com'
  },

  {
    id: 'saurabh',
    name: 'SAURABH GUPTA',
    role: 'Founder & Developer',
    division: 'TECH LEAD',
    tagline: 'Connecting high-output hacker communities with global VC funds & deeptech studios.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
    github: 'https://github.com/0ios',
    // twitter: 'https://x.com',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'anshikah',
    name: 'AANSHIKA',
    role: 'GRAPHIC DESIGNER',
    division: 'DESIGN LEAD',
    tagline: 'Creating the visual identity of Kaizenhacksme',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
    github: 'https://github.com/0ios',
    // twitter: 'https://x.com',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'yash',
    name: 'YASH PRATAP SINGH',
    role: 'Founder & Social Media Manager',
    division: 'MARKETING LEAD',
    tagline: 'Runs the floor on event day — registrations, venues, and everything in between.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    github: 'https://github.com',
    // twitter: 'https://x.com',
    linkedin: 'https://linkedin.com'
  },

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
  { value: '50', label: 'BUILDER SEATS', sub: 'Founding cohort — Vol. 01' },
  { value: String(PARTNERS.length).padStart(2, '0'), label: 'ECOSYSTEM PARTNERS', sub: 'Compute, AI & venture network' },
  { value: '01', label: 'DAY SPRINT', sub: 'One-day ideathon format' },
  { value: '∞', label: 'IDEAS', sub: 'A place for them to happen' }
];
