import React, { useState } from 'react';
import { ShieldCheck, Cpu, Clock, CheckCircle2, ArrowRight, Zap, Smartphone, Sparkles, PenTool } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreEstimator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreEstimator }) => {
  const [activeComponent, setActiveComponent] = useState<'screen' | 'board' | 'battery' | 'camera'>('board');

  const componentDetails = {
    screen: {
      title: 'Original OLED & TrueTone Panel',
      spec: '120Hz ProMotion / Super AMOLED',
      turnaround: '25-35 Minutes',
      status: 'Cleanroom Optical Laminator Tested',
      description: 'Precision vacuum debonding preserves the factory display controller while swapping only the shattered sapphire glass layer.'
    },
    board: {
      title: 'Motherboard & Micro-Soldered ICs',
      spec: 'BGA Reballing & Trace Jumpering',
      turnaround: '2-4 Hours',
      status: 'Stereomicroscope Verified (0.02mm)',
      description: 'Component-level diagnosis isolating shorted PMICs, audio codecs, charging ICs, and baseband chips with zero data loss.'
    },
    battery: {
      title: 'Grade-A Certified Battery Cell',
      spec: '100% Health Cycle Calibration',
      turnaround: '20-30 Minutes',
      status: 'Zero Battery Warning Pop-up',
      description: 'High-density lithium polymer cells with pre-welded safety BMS boards and factory pull-tab thermal adhesives.'
    },
    camera: {
      title: 'Sapphire Lens & OIS Sensor Module',
      spec: '50MP / 4K60 Optical Stabilization',
      turnaround: '35-45 Minutes',
      status: 'Dust-Free Enclosure Calibrated',
      description: 'Resolves camera jitter, autofocus buzzing, cracked camera glass caps, and black viewfinders with genuine sensors.'
    }
  };

  return (
    <section className="relative overflow-hidden bg-neutral-950 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-neutral-900">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-amber-600/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-column balanced split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Clean unboxed editorial kicker (No pills!) */}
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
              <span>Master Smartphone Technicians</span>
              <span aria-hidden="true">·</span>
              <span>Same-Day Repairs</span>
              <span aria-hidden="true">·</span>
              <span>OEM Certified Parts</span>
            </div>

            {/* Display Headline with text-wrap balance and no orphans */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] [text-wrap:balance]">
              Fast, Certified Smartphone & Tablet Repair with a <span className="text-amber-400">90-Day Guarantee</span>.
            </h1>

            {/* Subtitle with measure discipline */}
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl">
              Dilawar Mobile Fix Point restores shattered displays, dead logic boards, degraded batteries, and water-damaged devices. Most screen and battery services completed in 30 minutes while you wait.
            </p>

            {/* Core trust tags - clean unboxed list */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs text-neutral-300 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>100% Data Privacy Safe</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>No Fix, No Fee Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Walk-ins Always Welcome</span>
              </div>
            </div>

            {/* CTA decision block */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 text-sm font-semibold text-neutral-950 bg-amber-500 rounded-lg hover:bg-amber-400 transition-colors shadow-sm flex items-center gap-2 whitespace-nowrap shrink-0 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <span>Book a Repair</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreEstimator}
                className="px-6 py-3.5 text-sm font-medium text-white bg-neutral-900 border border-neutral-700/80 rounded-lg hover:bg-neutral-800 transition-colors whitespace-nowrap shrink-0"
              >
                Instant Price Estimator
              </button>

              <a
                href="https://wa.me/919835257170?text=Hi%20Dilawar%20Mobile%20Fix%20Point%2C%20I%20have%20an%20urgent%20phone%20issue."
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-neutral-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 py-2 px-1 whitespace-nowrap"
              >
                <span>WhatsApp: 9835257170 →</span>
              </a>
            </div>

            {/* Proof marker adjacent to CTA */}
            <div className="pt-2 text-xs text-neutral-400 flex items-center gap-2">
              <span className="font-semibold text-neutral-200">Free 10-Minute Diagnostic</span>
              <span>·</span>
              <span>No obligation inspection before any repair begins</span>
            </div>
          </div>

          {/* Right Column: Interactive Technician Workbench & Device Disassembly Card */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 sm:p-6 shadow-2xl relative">
              
              {/* Card top banner with interactive selector */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">
                    Workbench Diagnostic Bay
                  </span>
                </div>
                <span className="text-xs font-mono text-neutral-400">
                  ISO-Class Cleanroom Mat
                </span>
              </div>

              {/* Interactive component switcher */}
              <div className="mt-4 grid grid-cols-4 gap-1 p-1 bg-neutral-950 rounded-lg text-xs font-medium">
                <button
                  onClick={() => setActiveComponent('screen')}
                  className={`py-2 px-1 text-center rounded transition-colors ${
                    activeComponent === 'screen'
                      ? 'bg-neutral-800 text-amber-400 shadow-sm font-semibold'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  Display
                </button>
                <button
                  onClick={() => setActiveComponent('board')}
                  className={`py-2 px-1 text-center rounded transition-colors ${
                    activeComponent === 'board'
                      ? 'bg-neutral-800 text-amber-400 shadow-sm font-semibold'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  Logic Board
                </button>
                <button
                  onClick={() => setActiveComponent('battery')}
                  className={`py-2 px-1 text-center rounded transition-colors ${
                    activeComponent === 'battery'
                      ? 'bg-neutral-800 text-amber-400 shadow-sm font-semibold'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  Battery
                </button>
                <button
                  onClick={() => setActiveComponent('camera')}
                  className={`py-2 px-1 text-center rounded transition-colors ${
                    activeComponent === 'camera'
                      ? 'bg-neutral-800 text-amber-400 shadow-sm font-semibold'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  Camera
                </button>
              </div>

              {/* Technical Schematic Graphic Area */}
              <div className="mt-5 p-4 bg-neutral-950/80 border border-neutral-800/80 rounded-xl relative overflow-hidden min-h-[190px] flex flex-col justify-between">
                
                {/* SVG Blueprint Wireframe */}
                <div className="absolute right-3 top-3 opacity-20 pointer-events-none">
                  <svg width="140" height="140" viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-amber-400">
                    <rect x="15" y="10" width="70" height="80" rx="8" strokeWidth="1.5" />
                    <circle cx="50" cy="18" r="3" strokeWidth="1" />
                    <rect x="25" y="28" width="50" height="48" strokeWidth="1" strokeDasharray="2 2" />
                    <line x1="25" y1="52" x2="75" y2="52" strokeWidth="1" />
                    <line x1="50" y1="28" x2="50" y2="76" strokeWidth="1" />
                  </svg>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-amber-400 uppercase tracking-wide">
                      Module Inspector
                    </span>
                    <span className="text-neutral-600">/</span>
                    <span className="text-xs text-neutral-400">
                      {componentDetails[activeComponent].status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mt-1">
                    {componentDetails[activeComponent].title}
                  </h3>

                  <p className="text-xs text-neutral-300 mt-2 leading-relaxed max-w-sm">
                    {componentDetails[activeComponent].description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-neutral-500 block">Specification</span>
                    <span className="font-semibold text-neutral-200 font-mono">
                      {componentDetails[activeComponent].spec}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-neutral-500 block">Typical Turnaround</span>
                    <span className="font-semibold text-amber-400 font-mono">
                      {componentDetails[activeComponent].turnaround}
                    </span>
                  </div>
                </div>
              </div>

              {/* Technician Verification Badge */}
              <div className="mt-4 p-3 bg-neutral-950/60 rounded-xl border border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-neutral-200 block">
                      Dilawar Micro-Soldering Station
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      0.02mm stereoscopic trace repair & reballing
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                  Ready
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* 4-column KPI / trust strip in full-width row below hero split */}
        <div className="mt-14 pt-8 border-t border-neutral-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
              14,200+
            </div>
            <div className="text-xs font-medium text-neutral-400 mt-1">
              Devices Repaired Since 2014
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tabular-nums">
              30 Mins
            </div>
            <div className="text-xs font-medium text-neutral-400 mt-1">
              Average Screen & Battery Time
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
              90 Days
            </div>
            <div className="text-xs font-medium text-neutral-400 mt-1">
              Comprehensive Parts Warranty
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tabular-nums">
              4.9 / 5.0
            </div>
            <div className="text-xs font-medium text-neutral-400 mt-1">
              Over 2,100+ Verified Reviews
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
