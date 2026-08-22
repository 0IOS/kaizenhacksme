import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { playTactileClick, playSuccessChime } from '../utils/audio';

interface PartnerInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerInquiryModal: React.FC<PartnerInquiryModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    contactName: '',
    email: '',
    tier: 'PLATINUM (BOUNTY + MENTORSHIP)',
    offering: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company.trim() || !formData.email.trim()) return;

    playSuccessChime();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 dark:bg-[#050605]/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#0B0D0C] border border-slate-300 dark:border-[#1A1C1A] p-6 sm:p-8 shadow-2xl my-8 rounded-none">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#1A1C1A] pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-accent" />
            <span className="mono text-xs font-bold text-emerald-700 dark:text-accent uppercase tracking-wider">
              PARTNER ECOSYSTEM INTAKE
            </span>
          </div>

          <button
            onClick={() => {
              playTactileClick();
              onClose();
            }}
            className="p-1 text-slate-500 dark:text-[#A9ADA9] hover:text-emerald-700 dark:hover:text-accent transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="font-display text-2xl font-bold text-slate-950 dark:text-[#F5F5F0] uppercase tracking-tight">
                PARTNER WITH KAIZEN HACKS
              </div>
              <p className="text-xs mono text-slate-600 dark:text-[#A9ADA9] mt-1">
                Sponsor prize pools, supply developer credits, deploy GPU runtimes, or judge live stage demos.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-[11px] mono text-slate-700 dark:text-[#A9ADA9] font-bold uppercase mb-1">
                  COMPANY / PROTOCOL NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anthropic / Cloud Run"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] focus:border-emerald-600 dark:focus:border-accent px-3.5 py-2.5 text-xs mono text-slate-950 dark:text-[#F5F5F0] placeholder-slate-400 dark:placeholder-[#565C57] outline-none transition-colors rounded-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] mono text-slate-700 dark:text-[#A9ADA9] font-bold uppercase mb-1">
                    CONTACT PERSON
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] focus:border-emerald-600 dark:focus:border-accent px-3.5 py-2.5 text-xs mono text-slate-950 dark:text-[#F5F5F0] placeholder-slate-400 dark:placeholder-[#565C57] outline-none transition-colors rounded-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] mono text-slate-700 dark:text-[#A9ADA9] font-bold uppercase mb-1">
                    WORK EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.io"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] focus:border-emerald-600 dark:focus:border-accent px-3.5 py-2.5 text-xs mono text-slate-950 dark:text-[#F5F5F0] placeholder-slate-400 dark:placeholder-[#565C57] outline-none transition-colors rounded-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] mono text-slate-700 dark:text-[#A9ADA9] font-bold uppercase mb-1">
                  INTENDED TIER / FOCUS
                </label>
                <select
                  value={formData.tier}
                  onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] focus:border-emerald-600 dark:focus:border-accent px-3.5 py-2.5 text-xs mono text-slate-950 dark:text-[#F5F5F0] outline-none transition-colors cursor-pointer rounded-none"
                >
                  <option value="TITANIUM (NAMING + MAIN BOUNTY + STAGE)">TITANIUM // TITLE SPONSOR & MAIN BOUNTY</option>
                  <option value="PLATINUM (BOUNTY + MENTORSHIP)">PLATINUM // TRACK BOUNTY & MENTOR LAB</option>
                  <option value="GOLD (CREDITS + HIRING POOL)">GOLD // INFRA CREDITS & HIRING ACCESS</option>
                  <option value="ECOSYSTEM (COMMUNITY & GRANTS)">ECOSYSTEM // SPECIAL GRANT POOL</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] mono text-slate-700 dark:text-[#A9ADA9] font-bold uppercase mb-1">
                  OFFERINGS / API CREDITS (OPTIONAL)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. $10,000 GPU API credits, custom hardware kits, $5K track bounty"
                  value={formData.offering}
                  onChange={(e) => setFormData({ ...formData, offering: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] focus:border-emerald-600 dark:focus:border-accent px-3.5 py-2 text-xs mono text-slate-950 dark:text-[#F5F5F0] placeholder-slate-400 dark:placeholder-[#565C57] outline-none transition-colors resize-none rounded-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-[#1A1C1A] flex items-center justify-between">
              <div className="text-[10px] mono text-slate-500 dark:text-[#565C57] font-medium">
                DIRECT DECK & CALL WITHIN 12 HOURS
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-accent text-white dark:text-[#050605] mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer rounded-none shadow-sm"
              >
                <span>TRANSMIT BRIEF</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-12 h-12 bg-emerald-50 dark:bg-accent/10 border border-emerald-600 dark:border-accent rounded-full flex items-center justify-center mx-auto text-emerald-700 dark:text-accent">
              <CheckCircle2 size={28} />
            </div>

            <h3 className="font-display font-bold text-2xl text-slate-950 dark:text-[#F5F5F0] uppercase">
              TRANSMISSION RECEIVED
            </h3>

            <p className="text-xs mono text-slate-700 dark:text-[#A9ADA9] max-w-sm mx-auto leading-relaxed">
              Our core team will contact <span className="text-emerald-700 dark:text-accent font-bold">{formData.email}</span> with the complete Partner Deck and track customization kit.
            </p>

            <button
              onClick={() => {
                playTactileClick();
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-accent text-white dark:text-[#050605] mono font-bold text-xs uppercase tracking-wider cursor-pointer rounded-none shadow-sm"
            >
              CLOSE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

