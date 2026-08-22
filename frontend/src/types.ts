export interface EventScheduleItem {
  time: string;
  title: string;
  desc: string;
}

export interface PastWinner {
  project: string;
  track: string;
  team: string;
  github?: string;
  demo?: string;
}

export interface EventItem {
  id: string;
  name: string;
  code: string;
  edition: string;
  year: string;
  date: string;
  city: string;
  venue: string;
  duration: string;
  builderCount: string;
  teamsCount: string;
  prizePool: string;
  status: 'UPCOMING' | 'REGISTRATION_OPEN' | 'COMPLETED' | 'ARCHIVED';
  image: string;
  mapsUrl?: string;
  tags: string[];
  tracks: string[];
  schedule?: EventScheduleItem[];
  winners?: PastWinner[];
  gallery?: string[];
  description: string;
}

export interface Organizer {
  id: string;
  name: string;
  role: string;
  division: string;
  tagline: string;
  image: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
}

export interface Partner {
  id: string;
  name: string;
  category: string;
  tier: 'TITANIUM' | 'PLATINUM' | 'GOLD' | 'ECOSYSTEM';
  logoText: string;
  website: string;
  description: string;
}
