import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Featured event data (GreenTech Ideathon)
const featuredEvent = {
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
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=DBRA+SOSE+Kalkaji+New+Delhi',
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

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve featured event data
app.get('/api/events/featured', (req, res) => {
  res.json(featuredEvent);
});

// Store partner inquiries
let inquiries = [];

app.post('/api/inquiries', (req, res) => {
  const { company, contactName, email, tier, offering } = req.body;
  if (!company || !email) {
    return res.status(400).json({ error: 'Company and email are required' });
  }
  const inquiry = { id: Date.now(), company, contactName, email, tier, offering, createdAt: new Date().toISOString() };
  inquiries.push(inquiry);
  res.json({ success: true, inquiry });
});

// Store contact messages
let contacts = [];

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  const contact = { id: Date.now(), name, email, message, createdAt: new Date().toISOString() };
  contacts.push(contact);
  res.json({ success: true, contact });
});

// Start server
app.listen(PORT, () => {
  console.log(`Kaizen Hacks Backend running on port ${PORT}`);
});

