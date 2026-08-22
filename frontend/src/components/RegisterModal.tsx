import React, { useState } from 'react';
import { X, Check, ArrowRight, QrCode, Copy, CheckCheck } from 'lucide-react';
import { BuilderPass } from '../types';
import { playTactileClick, playSuccessChime } from '../utils/audio';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName?: string;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  eventName = 'CODE//FORGE 2026',
}) => {
  const [step, setStep] = useState<'FORM' | 'PASS'>('FORM');
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    github: '',
    role: 'SYSTEMS / BACKEND',
    track: '01 // AUTONOMOUS AI & RUNTIMES',
    teamStatus: 'SOLO (AUTO-MATCH)',
  });

  const [generatedPass, setGeneratedPass] = useState<BuilderPass | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.github.trim()) return;

    playSuccessChime();

    const randomSerial = Math.floor(1000 + Math.random() * 9000);
    const seatLetter = ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)];
    const seatNum = Math.floor(10 + Math.random() * 89);

    const pass: BuilderPass = {
      passId: `KH-26-CF-${randomSerial}`,
      name: formData.name.toUpperCase(),
      github: formData.github.replace('@', ''),
      role: formData.role,
      track: formData.track,
      teamStatus: formData.teamStatus,
      issueDate: 'OCT 2026',
      seatId: `SECTOR-${seatLetter}${seatNum}`,
      qrSeed: `KH_AUTH_${randomSerial}_VERIFIED`,
    };

    setGeneratedPass(pass);
    setStep('PASS');
  };

  const handleCopyPassId = () => {
    if (!generatedPass) return;
    navigator.clipboard.writeText(
      `KAIZEN HACKS // HACKER PASS: ${generatedPass.passId} | Builder: ${generatedPass.name} (@${generatedPass.github}) | Event: CODE//FORGE 2026`
    );
    setCopied(true);
    playTactileClick();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 dark:bg-[#050605]/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      {/* Container Card */}
      <div className="relative w-full max-w-xl bg-white dark:bg-[#0B0D0C] border border-slate-300 dark:border-[#1A1C1A] p-6 sm:p-8 shadow-2xl my-8 rounded-none">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#1A1C1A] pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-accent" />
            <span className="mono text-xs font-bold text-emerald-700 dark:text-accent uppercase tracking-wider">
              {step === 'FORM' ? 'BUILDER INTAKE // CODE//FORGE' : 'PASS GENERATED // ADMITTED'}
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

        {/* STEP 1: FORM */}
        {step === 'FORM' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="font-display text-2xl font-bold text-slate-950 dark:text-[#F5F5F0] uppercase tracking-tight">
                REGISTER FOR {eventName}
              </div>
              <p className="text-xs mono text-slate-600 dark:text-[#A9ADA9] mt-1">
                48-hour sprint in New Delhi. Instant digital hacker pass issued upon completion.
              </p>
            </div>

            {/* Inputs */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-[11px] mono text-slate-700 dark:text-[#A9ADA9] font-bold uppercase mb-1">
                  FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Satoshi Nakamoto"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] focus:border-emerald-600 dark:focus:border-accent px-3.5 py-2.5 text-xs mono text-slate-950 dark:text-[#F5F5F0] placeholder-slate-400 dark:placeholder-[#565C57] outline-none transition-colors rounded-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] mono text-slate-700 dark:text-[#A9ADA9] font-bold uppercase mb-1">
                    GITHUB USERNAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. torvalds"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] focus:border-emerald-600 dark:focus:border-accent px-3.5 py-2.5 text-xs mono text-slate-950 dark:text-[#F5F5F0] placeholder-slate-400 dark:placeholder-[#565C57] outline-none transition-colors rounded-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] mono text-slate-700 dark:text-[#A9ADA9] font-bold uppercase mb-1">
                    PRIMARY ROLE
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] focus:border-emerald-600 dark:focus:border-accent px-3.5 py-2.5 text-xs mono text-slate-950 dark:text-[#F5F5F0] outline-none transition-colors cursor-pointer rounded-none"
                  >
                    <option value="SYSTEMS / BACKEND">SYSTEMS / BACKEND</option>
                    <option value="AI / ML RESEARCH">AI / ML RESEARCH</option>
                    <option value="FRONTEND & CRAFT">FRONTEND & CRAFT</option>
                    <option value="HARDWARE & ROBOTICS">HARDWARE & ROBOTICS</option>
                    <option value="CRYPTO & ZK">CRYPTO & ZK</option>
                    <option value="PRODUCT DESIGN">PRODUCT DESIGN</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] mono text-slate-700 dark:text-[#A9ADA9] font-bold uppercase mb-1">
                  INTEREST TRACK
                </label>
                <select
                  value={formData.track}
                  onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] focus:border-emerald-600 dark:focus:border-accent px-3.5 py-2.5 text-xs mono text-slate-950 dark:text-[#F5F5F0] outline-none transition-colors cursor-pointer rounded-none"
                >
                  <option value="01 // AUTONOMOUS AI & RUNTIMES">01 // AUTONOMOUS AI & RUNTIMES</option>
                  <option value="02 // HIGH-PERFORMANCE COMPUTING & INFRA">02 // HIGH-PERFORMANCE COMPUTING & INFRA</option>
                  <option value="03 // EMBEDDED HARDWARE & PHYSICAL COMPUTING">03 // EMBEDDED HARDWARE & PHYSICAL COMPUTING</option>
                  <option value="04 // DECENTRALIZED PROTOCOLS & CRYPTO">04 // DECENTRALIZED PROTOCOLS & CRYPTO</option>
                  <option value="05 // OPEN CREATIVE EXPERIMENTS">05 // OPEN CREATIVE EXPERIMENTS</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] mono text-slate-700 dark:text-[#A9ADA9] font-bold uppercase mb-1">
                  TEAM PREFERENCE
                </label>
                <div className="grid grid-cols-3 gap-2 text-[10px] mono">
                  {['SOLO (AUTO-MATCH)', 'TEAM READY (2-4)', 'LOOKING FOR COFOUNDER'].map((mode) => (
                    <button
                      type="button"
                      key={mode}
                      onClick={() => {
                        playTactileClick();
                        setFormData({ ...formData, teamStatus: mode });
                      }}
                      className={`p-2 border text-center transition-all cursor-pointer rounded-none font-medium ${
                        formData.teamStatus === mode
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-700 dark:border-accent dark:bg-accent/10 dark:text-accent font-bold'
                          : 'border-slate-300 dark:border-[#1A1C1A] bg-slate-50 dark:bg-[#050605] text-slate-700 dark:text-[#A9ADA9]'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-slate-200 dark:border-[#1A1C1A] flex items-center justify-between gap-3">
              <div className="text-[10px] mono text-slate-500 dark:text-[#565C57] font-medium">
                ZERO FEE · FREE MEALS & HARDWARE LAB
              </div>

              <button
                type="submit"
                className="group px-6 py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-accent dark:hover:opacity-90 text-white dark:text-[#050605] mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer rounded-none shadow-sm"
              >
                <span>GENERATE PASS</span>
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: GENERATED DIGITAL HACKER PASS */}
        {step === 'PASS' && generatedPass && (
          <div className="space-y-6 animate-in zoom-in-95 duration-300">
            {/* Pass Card Container */}
            <div className="relative bg-slate-50 dark:bg-[#050605] border-2 border-emerald-600 dark:border-accent p-6 text-slate-950 dark:text-[#F5F5F0] overflow-hidden rounded-none shadow-md">
              {/* Scanlines and background texture */}
              <div className="absolute inset-0 tech-grid-fine opacity-20 dark:opacity-30 pointer-events-none" />

              {/* Top Bar */}
              <div className="relative z-10 flex items-start justify-between border-b border-slate-200 dark:border-[#1A1C1A] pb-4">
                <div>
                  <div className="text-[10px] mono text-emerald-700 dark:text-accent tracking-widest uppercase font-bold">
                    KAIZEN HACKS // OFFICIAL ENTRY BADGE
                  </div>
                  <div className="font-display font-bold text-2xl text-slate-950 dark:text-[#F5F5F0] uppercase tracking-tight mt-0.5">
                    CODE//FORGE 2026
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] mono text-slate-500 dark:text-[#565C57]">SERIAL ID</div>
                  <div className="mono text-xs font-bold text-emerald-700 dark:text-accent">{generatedPass.passId}</div>
                </div>
              </div>

              {/* Pass Main Body */}
              <div className="relative z-10 my-5 grid grid-cols-3 gap-4 items-center">
                <div className="col-span-2 space-y-3">
                  <div>
                    <div className="text-[9px] mono text-slate-500 dark:text-[#565C57] uppercase font-semibold">BUILDER IDENTITY</div>
                    <div className="font-display font-bold text-xl text-slate-950 dark:text-[#F5F5F0] uppercase">{generatedPass.name}</div>
                    <div className="mono text-xs text-emerald-700 dark:text-accent font-semibold">github.com/{generatedPass.github}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs mono">
                    <div>
                      <div className="text-[9px] text-slate-500 dark:text-[#565C57] uppercase font-semibold">ROLE</div>
                      <div className="text-slate-700 dark:text-[#A9ADA9] text-[11px] font-medium">{generatedPass.role}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-500 dark:text-[#565C57] uppercase font-semibold">SEAT NUMBER</div>
                      <div className="text-emerald-700 dark:text-accent font-bold text-[11px]">{generatedPass.seatId}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-[9px] mono text-slate-500 dark:text-[#565C57] uppercase font-semibold">SELECTED TRACK</div>
                    <div className="text-slate-700 dark:text-[#A9ADA9] text-[11px] mono font-medium">{generatedPass.track}</div>
                  </div>
                </div>

                {/* Micro Barcode & QR Code simulation */}
                <div className="col-span-1 flex flex-col items-center justify-center p-3 bg-white dark:bg-white/5 border border-slate-300 dark:border-[#1A1C1A] text-center shadow-sm">
                  <QrCode size={64} className="text-emerald-700 dark:text-accent" />
                  <div className="mt-2 text-[8px] mono text-slate-500 dark:text-[#565C57] tracking-tighter">
                    {generatedPass.qrSeed}
                  </div>
                </div>
              </div>

              {/* Simulated Barcode at bottom */}
              <div className="relative z-10 pt-3 border-t border-slate-200 dark:border-[#1A1C1A] flex items-center justify-between text-[10px] mono text-slate-500 dark:text-[#565C57]">
                <div className="flex items-center gap-1 mono text-emerald-700 dark:text-accent font-semibold">
                  <span>● ADMIT ONE BUILDER</span>
                  <span>·</span>
                  <span>NEW DELHI</span>
                </div>
                <div className="font-medium">OCT 24—26, 2026</div>
              </div>
            </div>

            {/* Pass Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                onClick={handleCopyPassId}
                className="w-full sm:w-auto px-4 py-2.5 bg-white dark:bg-[#050605] hover:bg-slate-100 dark:hover:bg-[#1A1C1A] border border-slate-300 dark:border-[#1A1C1A] text-xs mono text-slate-900 dark:text-[#F5F5F0] flex items-center justify-center gap-2 cursor-pointer transition-colors rounded-none font-medium shadow-sm"
              >
                {copied ? <CheckCheck size={14} className="text-emerald-600 dark:text-accent" /> : <Copy size={14} />}
                <span>{copied ? 'PASS COPIED!' : 'COPY PASS DETAILS'}</span>
              </button>

              <button
                onClick={() => {
                  playTactileClick();
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-accent text-white dark:text-[#050605] mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-opacity rounded-none shadow-sm"
              >
                <span>DONE / CLOSE</span>
                <Check size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

