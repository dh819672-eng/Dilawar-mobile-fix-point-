import React from 'react';
import { Wrench, MapPin, Phone, MessageSquare, Lock } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
  shopPhone?: string;
  shopAddress?: string;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdmin,
  shopPhone = '+91 98352 57170',
  shopAddress = 'Labha, Balu Tola Chowk, Babhni, Pranpur, Katihar, Bihar - 854116'
}) => {
  return (
    <footer className="bg-neutral-950 text-neutral-400 py-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-neutral-800/80">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-base font-bold text-white">
              <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center text-neutral-950">
                <Wrench className="w-3.5 h-3.5" />
              </div>
              <span>Dilawar Mobile Fix Point</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Certified master smartphone repair center in Pranpur, Katihar. Specialized in stereoscopic micro-soldering, OEM OLED replacement, battery renewal, and data recovery.
            </p>
            <div className="text-xs text-neutral-400">
              <span className="text-amber-400 font-semibold">90-Day Parts Warranty</span> on all qualified installations.
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">Specialized Services</a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-amber-400 transition-colors">Instant Price Estimator</a>
              </li>
              <li>
                <a href="#track" className="hover:text-amber-400 transition-colors">Track Repair Status</a>
              </li>
              <li>
                <a href="#diagnostics" className="hover:text-amber-400 transition-colors">Symptom Troubleshooter</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition-colors">Store Location & Directions</a>
              </li>
            </ul>
          </div>

          {/* Supported Devices */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">
              Supported Brands
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-400">
              <li>Apple iPhone & iPad Series</li>
              <li>Samsung Galaxy S, Z, M & A Series</li>
              <li>Xiaomi, Redmi & Poco Phones</li>
              <li>Realme & Narzo Series</li>
              <li>Vivo & Oppo Smartphone Lines</li>
              <li>OnePlus & Motorola Phones</li>
            </ul>
          </div>

          {/* Direct Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">
              Contact Workshop
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`tel:${shopPhone.replace(/[^0-9+]/g, '')}`} className="hover:text-white font-mono font-medium text-white">
                  {shopPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a 
                  href="https://wa.me/919835257170?text=Hello%20Dilawar%20Mobile%20Fix%20Point%2C%20I%20need%20a%20repair%20quote" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-emerald-400 text-neutral-300"
                >
                  WhatsApp: 9835257170
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1 text-neutral-400">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {shopAddress}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Line + Admin Control Link */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <div>
            © {new Date().getFullYear()} Dilawar Mobile Fix Point (Katihar, Bihar). All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>No Fix, No Fee Guarantee</span>
            <span>·</span>
            <span>100% Data Confidentiality</span>
            <span>·</span>
            <button
              onClick={() => onOpenAdmin && onOpenAdmin()}
              className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 font-medium"
            >
              <Lock className="w-3 h-3" />
              <span>Owner Dashboard</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
