import React, { useState } from 'react';
import { REPAIR_SERVICES, RepairServiceItem } from '../data/repairData';
import { Smartphone, BatteryCharging, Cpu, Droplets, Camera, Zap, Check, ArrowRight, X, Clock, ShieldCheck } from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForBooking }) => {
  const [activeModalService, setActiveModalService] = useState<RepairServiceItem | null>(null);

  const getServiceIcon = (category: RepairServiceItem['category']) => {
    switch (category) {
      case 'screen': return <Smartphone className="w-5 h-5 text-amber-400" />;
      case 'battery': return <BatteryCharging className="w-5 h-5 text-amber-400" />;
      case 'board': return <Cpu className="w-5 h-5 text-amber-400" />;
      case 'water': return <Droplets className="w-5 h-5 text-amber-400" />;
      case 'charging': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'camera': return <Camera className="w-5 h-5 text-amber-400" />;
      default: return <Smartphone className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="services" className="py-16 sm:py-24 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
            <span>Specialized Capabilities</span>
            <span aria-hidden="true">·</span>
            <span>Master Level Workshop</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-2 [text-wrap:balance]">
            Precision Engineering for Every Mobile Hardware Failure
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 mt-2 leading-relaxed">
            From routine 30-minute display and battery replacements to delicate stereoscopic micro-soldering on damaged logic boards.
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REPAIR_SERVICES.map((service, index) => {
            const indexString = `0${index + 1}.`;

            return (
              <div
                key={service.id}
                className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-all group"
              >
                <div>
                  {/* Top Bar with Editorial Index & Category Icon */}
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-800/80">
                    <span className="text-xs font-mono font-bold text-neutral-400 group-hover:text-amber-400 transition-colors">
                      {indexString} {service.category.toUpperCase()}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center">
                      {getServiceIcon(service.category)}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-white mt-4 group-hover:text-amber-300 transition-colors">
                    {service.name}
                  </h3>

                  <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Common symptoms list */}
                  <div className="mt-4 pt-3 border-t border-neutral-800/60">
                    <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wide block mb-2">
                      Common Symptoms Treated:
                    </span>
                    <ul className="space-y-1.5 text-xs text-neutral-400">
                      {service.symptoms.slice(0, 3).map((sym, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-400 font-bold">·</span>
                          <span className="line-clamp-1">{sym}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Stats & Action */}
                <div className="mt-6 pt-4 border-t border-neutral-800">
                  <div className="flex items-center justify-between text-xs mb-3 font-mono text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{service.turnaroundTime}</span>
                    </span>
                    <span className="text-amber-400 font-semibold">
                      From ${service.startingPrice}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setActiveModalService(service)}
                      className="py-2 px-3 text-xs font-medium text-neutral-300 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors text-center"
                    >
                      View Process
                    </button>
                    <button
                      onClick={() => onSelectServiceForBooking(service.name)}
                      className="py-2 px-3 text-xs font-bold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors text-center flex items-center justify-center gap-1"
                    >
                      <span>Book Slot</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Modal for In-Depth Service Details */}
        {activeModalService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-neutral-900 border border-neutral-700 max-w-xl w-full rounded-2xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              
              <button
                onClick={() => setActiveModalService(null)}
                className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-lg focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                  {getServiceIcon(activeModalService.category)}
                </div>
                <div>
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block">
                    Technical Overview
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    {activeModalService.name}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-neutral-300 mt-4 leading-relaxed">
                {activeModalService.longDesc}
              </p>

              {/* Key Specs */}
              <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                  <span className="text-neutral-400 block">Turnaround Time</span>
                  <span className="text-base font-bold text-amber-400 font-mono mt-0.5 block">
                    {activeModalService.turnaroundTime}
                  </span>
                </div>
                <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                  <span className="text-neutral-400 block">Warranty Period</span>
                  <span className="text-base font-bold text-white font-mono mt-0.5 block">
                    {activeModalService.warranty}
                  </span>
                </div>
              </div>

              {/* Symptoms Treated */}
              <div className="mt-6">
                <span className="text-xs font-semibold text-neutral-200 uppercase tracking-wider block mb-2.5">
                  Verified Fault Resolution:
                </span>
                <div className="space-y-2">
                  {activeModalService.symptoms.map((symptom, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300 p-2 bg-neutral-950/60 rounded-lg border border-neutral-800">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-end gap-3">
                <button
                  onClick={() => setActiveModalService(null)}
                  className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const name = activeModalService.name;
                    setActiveModalService(null);
                    onSelectServiceForBooking(name);
                  }}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl transition-colors"
                >
                  Book Service Now
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
