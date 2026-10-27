import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: 'Will my personal data, photos, and messages be erased or accessed?',
      answer: 'No. 99% of hardware repairs (screen replacement, battery swap, charging port, camera modules, and speaker repair) do not require wiping your storage. Furthermore, our strict technician privacy policy forbids technicians from browsing personal media or apps. We perform pre- and post-tests directly using standard hardware test dialers.'
    },
    {
      question: 'How long does a typical screen or battery replacement take?',
      answer: 'Most standard screen and battery replacements are completed within 25 to 45 minutes. You can relax in our comfortable air-conditioned customer lounge or observe the repair through our transparent bench window.'
    },
    {
      question: 'What is covered under the 90-Day Dilawar Warranty?',
      answer: 'Our 90-day warranty covers touch unresponsiveness, ghost touching, dead pixels (not caused by subsequent drops), battery cycle issues, and premature component failure. If the installed replacement part proves defective under normal usage, we replace it free of charge.'
    },
    {
      question: 'My phone was submerged in water and is dead. What should I do?',
      answer: 'Do NOT turn it on, do NOT plug it into a wall charger, and do NOT place it in dry rice (rice dust clogs ports and accelerates corrosion). Bring the device immediately to Dilawar Mobile Fix Point. We perform urgent ultrasonic solvent baths and dry the motherboard under controlled thermal conditions to halt oxidation.'
    },
    {
      question: 'What is your "No Fix, No Fee" policy?',
      answer: 'If our master technician conducts an exhaustive diagnostic on a severely damaged or burnt motherboard and concludes that it cannot be safely or reliably restored, you do not pay a single rupee or dollar. We only charge when your device is successfully brought back to life.'
    },
    {
      question: 'Do I need an appointment or can I just walk into the shop?',
      answer: 'Walk-ins are always welcomed during all operational hours (Mon-Sat 9AM-9PM, Sun 11AM-6PM). Booking online via our appointment scheduler ensures immediate bench reservation with priority technician assignment upon arrival.'
    }
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-24 bg-neutral-900/60 border-b border-neutral-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
            <span>Clear Answers</span>
            <span aria-hidden="true">·</span>
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-2 [text-wrap:balance]">
            Everything You Need to Know Before Visiting
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 mt-2 leading-relaxed">
            Transparent policies on repair turnaround times, warranties, data confidentiality, and parts quality.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-12 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-900">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
