import React from 'react';
import { Microscope, ShieldCheck, Lock, Award, Gauge, RefreshCcw } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const standards = [
    {
      icon: <Microscope className="w-5 h-5 text-amber-400" />,
      title: 'Stereomicroscopic Precision',
      desc: 'Our lab is equipped with 45X optical stereo zoom microscopes and temperature-regulated JBC micro-soldering stations for 0.02mm motherboard jumper repairs.'
    },
    {
      icon: <Lock className="w-5 h-5 text-amber-400" />,
      title: '100% Personal Data Privacy',
      desc: 'No passwords required for basic repairs. Your photos, private WhatsApp messages, banking apps, and contacts remain strictly confidential and untouched.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
      title: '90-Day Hassle-Free Warranty',
      desc: 'Every replaced component is backed by our direct 90-day parts and labor guarantee. If the replaced component develops a touch or battery defect, we replace it instantly.'
    },
    {
      icon: <Award className="w-5 h-5 text-amber-400" />,
      title: 'True OEM Specification Parts',
      desc: 'We never compromise on cheap duplicate displays with washed-out colors or sluggish touch. We use Grade-A OEM specifications preserving 120Hz and TrueTone.'
    },
    {
      icon: <Gauge className="w-5 h-5 text-amber-400" />,
      title: 'No Fix, No Fee Guarantee',
      desc: 'If our master technician inspects your device and declares the logic board beyond economic repair, you pay zero diagnostic or labor fees.'
    },
    {
      icon: <RefreshCcw className="w-5 h-5 text-amber-400" />,
      title: 'Same-Day Express Bench',
      desc: 'Over 85% of display replacements, charging port repairs, and battery swaps are completed within 30 to 45 minutes right in front of your eyes.'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
            <span>The Dilawar Standard</span>
            <span aria-hidden="true">·</span>
            <span>Uncompromising Craftsmanship</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-2 [text-wrap:balance]">
            Why Smartphone Owners Trust Dilawar Mobile Fix Point
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 mt-2 leading-relaxed">
            We operate an open-bench repair philosophy: transparent diagnostics, fair pricing, and certified electronics technicians.
          </p>
        </div>

        {/* 6 Standards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {standards.map((item, idx) => (
            <div
              key={idx}
              className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Workshop environment showcase strip */}
        <div className="mt-12 p-6 sm:p-8 bg-neutral-900/90 rounded-2xl border border-neutral-800 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center lg:text-left">
            <h4 className="text-base sm:text-lg font-bold text-white">
              Open-View Diagnostic Bench
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
              Watch our master technician disassemble, clean, and install your components live through our transparent viewing window.
            </p>
          </div>
          <div className="flex items-center gap-6 text-xs font-mono text-amber-400 shrink-0">
            <div>
              <span className="text-white font-bold block text-sm">Anti-Static</span>
              <span>ESD Grounded</span>
            </div>
            <div className="h-8 w-px bg-neutral-800" />
            <div>
              <span className="text-white font-bold block text-sm">Laminar Air</span>
              <span>Dust-Free Assembly</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
