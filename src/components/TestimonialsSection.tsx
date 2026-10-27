import React from 'react';
import { TESTIMONIALS } from '../data/repairData';
import { Star, CheckCircle, ShieldCheck } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-neutral-900/60 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
            <span>Customer Feedback</span>
            <span aria-hidden="true">·</span>
            <span>Verified Device Outcomes</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-2 [text-wrap:balance]">
            Proven Results for Over 14,000 Saved Devices
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 mt-2 leading-relaxed">
            Read real stories from customers whose smartphones, tablets, and precious personal data were restored at our workshop.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors space-y-4"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review body */}
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                  "{review.review}"
                </p>
              </div>

              {/* Attributable author and device repaired details */}
              <div className="pt-4 border-t border-neutral-800">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-white block">
                      {review.name}
                    </span>
                    <span className="text-xs text-neutral-400 block">
                      {review.location}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-semibold text-amber-400 block">
                      {review.device}
                    </span>
                    <span className="text-[11px] text-neutral-500 font-mono block">
                      {review.turnaround}
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Verified Service Receipt ({review.repair})</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Google / Local Business Trust Marker */}
        <div className="mt-12 text-center text-xs text-neutral-400">
          <span>Rated <strong className="text-white font-mono">4.9 / 5.0</strong> based on 2,140+ real customer reviews on Google Maps & Local Business Directory</span>
        </div>

      </div>
    </section>
  );
};
