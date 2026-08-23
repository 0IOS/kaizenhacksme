import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { Hero } from './components/Hero';
import { MarqueeTicker } from './components/MarqueeTicker';
import { FeaturedEvent } from './components/FeaturedEvent';
import { IdentityStatement } from './components/IdentityStatement';
import { EventArchive } from './components/EventArchive';
import { ThePeople } from './components/ThePeople';
import { Partners } from './components/Partners';
import { RegisterCTA } from './components/RegisterCTA';
import { Footer } from './components/Footer';
import { EventDetailModal } from './components/EventDetailModal';
import { PartnerInquiryModal } from './components/PartnerInquiryModal';
import { FEATURED_EVENT } from './data/mockData';
import { EventItem } from './types';
import { SectionDivider } from './lib/motion';

export default function App() {
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const handleScrollToNextEvent = () => {
    const el = document.getElementById('featured-event');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#F1F3F6] dark:bg-[#050605] text-slate-900 dark:text-[#F5F5F0] overflow-x-hidden selection:bg-accent selection:text-[#050605] transition-colors duration-300">
    {/* System Status HUD — always visible, topmost layer */}
    <div className="fixed top-2 left-1/2 -translate-x-1/2 z-60 pointer-events-none text-[9px] mono uppercase text-emerald-600 dark:text-accent transition-colors">
      SYS_OK // NODE_DELHI
    </div>

      {/* Interactive Background Atmosphere & Canvas */}
      <BackgroundCanvas />

      {/* Main Top Navigation */}
      <Navbar onOpenPartners={() => setPartnerModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 1. Hero Section */}
        <Hero onScrollToNextEvent={handleScrollToNextEvent} />

        {/* 2. Infinite Marquee Velocity Ticker */}
        <MarqueeTicker />

        {/* 3. Upcoming Event Centerpiece (GREENTECH) */}
        <FeaturedEvent onSelectEventDetail={() => setSelectedEvent(FEATURED_EVENT)} />

        <SectionDivider label="SYS.CONTINUITY // MANIFESTO_01" />

        {/* 4. Organization Identity & Visual Statement */}
        <IdentityStatement />

        <SectionDivider label="ARCHIVE.INDEX // AWAITING_VOL_01" />

        {/* 5. Event Archive (Past Events) */}
        <EventArchive onSelectEvent={(event) => setSelectedEvent(event)} />

        <SectionDivider label="OPERATORS.REGISTRY // CORE_5" />

        {/* 6. The People (Organizers) */}
        <ThePeople />

        <SectionDivider label="ECOSYSTEM.MESH // PARTNER_NET" />

        {/* 7. Partners (Supported By) */}
        <Partners
          onOpenPartnerInquiry={() => setPartnerModalOpen(true)}
        />

        <SectionDivider label="ENTRY.POINT // REG_OPEN" />

        {/* 8. Registration Full-Screen CTA */}
        <RegisterCTA />
      </main>

      {/* 9. Minimal Footer */}
      <Footer onOpenPartnerInquiry={() => setPartnerModalOpen(true)} />

      {/* Modals and Sheets */}
      <EventDetailModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      <PartnerInquiryModal
        isOpen={partnerModalOpen}
        onClose={() => setPartnerModalOpen(false)}
      />

    </div>
  );
}
