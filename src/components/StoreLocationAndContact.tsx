import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, Navigation, CheckCircle2, Shield, Calendar } from 'lucide-react';

interface StoreLocationAndContactProps {
  onOpenBooking: () => void;
}

export const StoreLocationAndContact: React.FC<StoreLocationAndContactProps> = ({ onOpenBooking }) => {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
            <span>Storefront & Service Center</span>
            <span aria-hidden="true">·</span>
            <span>Walk-ins Welcome in Katihar</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-2 [text-wrap:balance]">
            Visit Dilawar Mobile Fix Point in Person
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 mt-2 leading-relaxed">
            Conveniently located at Balu Tola Chowk, Babhni, Pranpur, Katihar (Bihar). Visit us directly for instant walk-in diagnosis, screen repair, and battery replacement.
          </p>
        </div>

        {/* 2-Column Store Info and Map Layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact details, hours, and channels (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Address Card */}
            <div className="p-6 bg-neutral-900/90 rounded-2xl border border-neutral-800 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Workshop Physical Address</h3>
                  <p className="text-sm text-neutral-200 font-medium mt-1 leading-relaxed">
                    Labha, Balu Tola Chowk, Babhni,<br />
                    Pranpur, Katihar, Bihar – 854116
                  </p>
                  <p className="text-xs text-neutral-400 mt-2">
                    Landmark: Balu Tola Chowk, Babhni Main Market · Accessible parking for bikes and cars.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex items-center gap-3">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Labha+Balu+Tola+Chowk+Babhni+Pranpur+Katihar+Bihar+854116"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5 text-amber-400" />
                  <span>Navigate on Google Maps</span>
                </a>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="p-6 bg-neutral-900/90 rounded-2xl border border-neutral-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Service Counter Operating Hours</h3>
                  <span className="text-xs text-emerald-400 font-medium">Open 7 Days a Week for Urgent Fixes</span>
                </div>
              </div>

              <div className="space-y-2 text-xs pt-2">
                <div className="flex items-center justify-between py-1 border-b border-neutral-800/80">
                  <span className="text-neutral-300">Monday – Saturday</span>
                  <span className="text-white font-mono font-semibold">9:00 AM – 9:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-neutral-800/80">
                  <span className="text-neutral-300">Sunday</span>
                  <span className="text-white font-mono font-semibold">11:00 AM – 6:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-1 text-neutral-400">
                  <span>Urgent Inquiries & WhatsApp</span>
                  <span className="font-mono text-amber-400">24/7 Available</span>
                </div>
              </div>
            </div>

            {/* Direct Lines */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="tel:+919835257170"
                className="p-4 bg-neutral-900 rounded-xl border border-neutral-800 hover:border-amber-500/60 transition-colors block group shadow-sm"
              >
                <div className="flex items-center gap-2.5 text-xs text-neutral-400 mb-1">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Master Technician</span>
                </div>
                <span className="text-base font-bold text-white group-hover:text-amber-400 transition-colors font-mono block">
                  +91 98352 57170
                </span>
                <span className="text-[11px] text-neutral-400 mt-0.5 block">9835257170 (Direct Helpline)</span>
              </a>

              <a
                href="https://wa.me/919835257170?text=Hello%20Dilawar%20Mobile%20Fix%20Point%2C%20I%20have%20a%20question%20about%20a%20phone%20repair"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-neutral-900 rounded-xl border border-neutral-800 hover:border-emerald-500/60 transition-colors block group shadow-sm"
              >
                <div className="flex items-center gap-2.5 text-xs text-neutral-400 mb-1">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Chat</span>
                </div>
                <span className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors font-mono block">
                  WhatsApp Support
                </span>
                <span className="text-[11px] text-neutral-400 mt-0.5 block">+91 98352 57170</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Map Graphic & Quick Appointment Box (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Visual Store Map Card */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Pranpur, Katihar Map Guide
                </span>
                <span className="text-[11px] font-mono text-neutral-400">
                  PIN: 854116 · Bihar
                </span>
              </div>

              {/* Stylized SVG Map Representation */}
              <div className="mt-4 relative bg-neutral-950 rounded-xl p-6 border border-neutral-800/80 overflow-hidden min-h-[220px] flex items-center justify-center">
                {/* Grid roads SVG */}
                <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="50" x2="100%" y2="50" stroke="#525252" strokeWidth="3" />
                  <line x1="0" y1="150" x2="100%" y2="150" stroke="#525252" strokeWidth="4" />
                  <line x1="80" y1="0" x2="80" y2="100%" stroke="#525252" strokeWidth="2" />
                  <line x1="220" y1="0" x2="220" y2="100%" stroke="#525252" strokeWidth="3" />
                  <line x1="380" y1="0" x2="380" y2="100%" stroke="#525252" strokeWidth="2" />
                </svg>

                {/* Pin marker for Dilawar Mobile Fix Point */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center shadow-lg border-2 border-white">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="mt-2 bg-neutral-900/95 border border-amber-500/50 px-3.5 py-1.5 rounded-lg text-center shadow-xl">
                    <span className="text-xs font-bold text-white block">
                      Dilawar Mobile Fix Point
                    </span>
                    <span className="text-[10px] text-amber-400 font-mono">
                      Balu Tola Chowk, Babhni, Pranpur
                    </span>
                  </div>
                </div>

                {/* Landmarks */}
                <div className="absolute top-4 left-4 text-[10px] bg-neutral-900/80 px-2 py-1 rounded border border-neutral-700 text-neutral-300">
                  Labha, Babhni
                </div>

                <div className="absolute bottom-4 right-4 text-[10px] bg-neutral-900/80 px-2 py-1 rounded border border-neutral-700 text-neutral-300">
                  Katihar, Bihar 854116
                </div>
              </div>

              {/* Quick perks checklist */}
              <div className="mt-4 pt-3 border-t border-neutral-800 grid grid-cols-2 gap-2 text-xs text-neutral-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>On-spot 30-min repair</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Free diagnostic check</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>UPI, Cash, Google Pay</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Genuine warranty parts</span>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-5">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve In-Store Service Slot</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
