import React, { useState } from 'react';
import { Wrench, Phone, Menu, X, Clock, MapPin } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: (prefill?: { brand?: string; model?: string; issue?: string }) => void;
  onOpenTracker?: () => void;
  onOpenAdmin?: () => void;
  shopPhone?: string;
  shopAddress?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenBooking, 
  onOpenAdmin,
  shopPhone = '+91 98352 57170',
  shopAddress = 'Labha, Balu Tola Chowk, Babhni, Pranpur, Katihar, Bihar - 854116'
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80">
      {/* Optional top utility line for opening hours and quick location */}
      <div className="hidden lg:block bg-neutral-900/60 border-b border-neutral-800/40 text-xs text-neutral-400 py-1.5 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>Mon - Sat: 9:00 AM - 9:00 PM · Sun: 11:00 AM - 6:00 PM</span>
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>{shopAddress}</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href={`tel:${shopPhone.replace(/[^0-9+]/g, '')}`} 
              className="text-neutral-300 hover:text-amber-400 transition-colors flex items-center gap-1.5 font-medium"
            >
              <Phone className="w-3 h-3 text-amber-500" />
              <span>Helpline: {shopPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar strictly obeying Top Bar Contract: 3 zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <a href="#" className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 group">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-neutral-950 shadow-sm group-hover:bg-amber-400 transition-colors">
              <Wrench className="w-4 h-4" />
            </div>
            <span>Dilawar Mobile Fix Point</span>
          </a>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
            <a href="#services" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">Services</a>
            <a href="#estimator" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">Price Estimator</a>
            <a href="#track" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">Track Repair</a>
            <a href="#diagnostics" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">Diagnostic Guide</a>
            <a href="#contact" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">Store & Hours</a>
          </nav>

          {/* Zone 3: 1 primary action + Admin portal */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => onOpenAdmin && onOpenAdmin()}
              title="Dukaan Owner / Admin Control Panel"
              className="px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Owner Panel</span>
            </button>

            <button
              onClick={() => onOpenBooking()}
              className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-500 rounded-lg hover:bg-amber-400 transition-colors whitespace-nowrap shrink-0 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
              Book a Repair
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-400 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-900 border-b border-neutral-800 px-4 pt-3 pb-5 space-y-3">
          <nav className="flex flex-col space-y-2.5 text-sm font-medium text-neutral-200">
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 hover:bg-neutral-800 rounded transition-colors"
            >
              Services Catalog
            </a>
            <a 
              href="#estimator" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 hover:bg-neutral-800 rounded transition-colors"
            >
              Price & Turnaround Estimator
            </a>
            <a 
              href="#track" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 hover:bg-neutral-800 rounded transition-colors"
            >
              Track Repair Status
            </a>
            <a 
              href="#diagnostics" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 hover:bg-neutral-800 rounded transition-colors"
            >
              Diagnostic Troubleshooter
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 hover:bg-neutral-800 rounded transition-colors"
            >
              Store Location & Contact
            </a>
          </nav>

          <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 px-4 text-center text-sm font-semibold text-neutral-950 bg-amber-500 rounded-lg hover:bg-amber-400 transition-colors"
            >
              Book a Repair Now
            </button>
            <a
              href="https://wa.me/919835257170?text=Hello%20Dilawar%20Mobile%20Fix%20Point%2C%20I%20need%20a%20repair%20quote"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-4 text-center text-xs font-medium text-neutral-300 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors"
            >
              WhatsApp Support (+91 98352 57170)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
