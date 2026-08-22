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
import { RegisterModal } from './components/RegisterModal';
import { EventDetailModal } from './components/EventDetailModal';
import { PartnerInquiryModal } from './components/PartnerInquiryModal';
import { FEATURED_EVENT } from './data/mockData';
import { EventItem } from './types';
import { playTactileClick } from './utils/audio';
import { SectionDivider } from './lib/motion';

export default function App() {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [targetEventName, setTargetEventName] = useState('CODE//FORGE 2026');

  const handleOpenRegister = (eventName: string = 'CODE//FORGE 2026') => {
    setTargetEventName(eventName);
    setRegisterModalOpen(true);
  };

  const handleScrollToNextEvent = () => {
    const el = document.getElementById('featured-event');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#F1F3F6] dark:bg-[#050605] text-slate-900 dark:text-[#F5F5F0] overflow-x-hidden selection:bg-accent selection:text-[#050605] transition-colors duration-300">
      
      {/* Interactive Background Atmosphere & Canvas */}
      <BackgroundCanvas />

      {/* Main Top Navigation */}
      <Navbar
        onOpenRegister={() => handleOpenRegister('CODE//FORGE 2026')}
        onOpenPartners={() => setPartnerModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 1. Hero Section */}
        <Hero
          onOpenRegister={() => handleOpenRegister('CODE//FORGE 2026')}
          onScrollToNextEvent={handleScrollToNextEvent}
        />

        {/* 2. Infinite Marquee Velocity Ticker */}
        <MarqueeTicker />

        {/* 3. Upcoming Event Centerpiece (CODE//FORGE) */}
        <FeaturedEvent
          onOpenRegister={() => handleOpenRegister('CODE//FORGE 2026')}
          onSelectEventDetail={() => setSelectedEvent(FEATURED_EVENT)}
        />

        <SectionDivider label="SYS.CONTINUITY // MANIFESTO_01" />

        {/* 4. Organization Identity & Visual Statement */}
        <IdentityStatement />

        <SectionDivider label="ARCHIVE.INDEX // VOL_01—04" />

        {/* 5. Event Archive (Past Events) */}
        <EventArchive
          onSelectEvent={(event) => setSelectedEvent(event)}
        />

        <SectionDivider label="OPERATORS.REGISTRY // CORE_4" />

        {/* 6. The People (Organizers) */}
        <ThePeople />

        <SectionDivider label="ECOSYSTEM.MESH // PARTNER_NET" />

        {/* 7. Partners (Supported By) */}
        <Partners
          onOpenPartnerInquiry={() => setPartnerModalOpen(true)}
        />

        <SectionDivider label="ENTRY.POINT // REG_OPEN" />

        {/* 8. Registration Full-Screen CTA */}
        <RegisterCTA
          onOpenRegister={() => handleOpenRegister('CODE//FORGE 2026')}
        />
      </main>

      {/* 9. Minimal Footer */}
      <Footer
        onOpenRegister={() => handleOpenRegister('CODE//FORGE 2026')}
        onOpenPartnerInquiry={() => setPartnerModalOpen(true)}
      />

      {/* Modals and Sheets */}
      <RegisterModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        eventName={targetEventName}
      />

      <EventDetailModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onRegister={() => {
          if (selectedEvent) {
            handleOpenRegister(selectedEvent.name);
          }
        }}
      />

      <PartnerInquiryModal
        isOpen={partnerModalOpen}
        onClose={() => setPartnerModalOpen(false)}
      />

    </div>
  );
}
