import React, { useState } from 'react';
import { DIAGNOSTIC_SYMPTOMS } from '../data/repairData';
import { HelpCircle, AlertTriangle, Clock, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';

interface DiagnosticWizardProps {
  onBookDiagnosis: (serviceCategory: string, symptomDesc: string) => void;
}

export const DiagnosticWizard: React.FC<DiagnosticWizardProps> = ({ onBookDiagnosis }) => {
  const [selectedSymptomId, setSelectedSymptomId] = useState<string>(DIAGNOSTIC_SYMPTOMS[0].id);

  const currentSymptom = DIAGNOSTIC_SYMPTOMS.find(s => s.id === selectedSymptomId) || DIAGNOSTIC_SYMPTOMS[0];

  const getUrgencyColor = (urgency: string) => {
    if (urgency.toLowerCase().includes('critical')) {
      return 'text-rose-400 border-rose-500/40 bg-rose-500/10';
    }
    if (urgency.toLowerCase().includes('high')) {
      return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
    }
    return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
  };

  return (
    <section id="diagnostics" className="py-16 sm:py-24 bg-neutral-900/60 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
            <span>Symptom Troubleshooter</span>
            <span aria-hidden="true">·</span>
            <span>Instant Pre-Diagnostic</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-2 [text-wrap:balance]">
            Not Sure What's Wrong With Your Device?
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 mt-2 leading-relaxed">
            Select the symptom your phone is currently exhibiting to receive an instant diagnostic hypothesis and immediate first-aid instructions.
          </p>
        </div>

        {/* Diagnostic interactive layout */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Symptoms selection list (6 cols) */}
          <div className="lg:col-span-6 space-y-2.5">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
              Select Your Observed Symptom:
            </span>
            {DIAGNOSTIC_SYMPTOMS.map((item) => {
              const isSelected = selectedSymptomId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedSymptomId(item.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-neutral-950 border-amber-500 shadow-md text-white'
                      : 'bg-neutral-950/60 border-neutral-800/80 hover:bg-neutral-950 text-neutral-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-amber-400' : 'border-neutral-700'
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-amber-400" />}
                    </div>
                    <span className="text-xs sm:text-sm font-medium leading-snug">
                      {item.symptom}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-mono font-semibold text-amber-400 uppercase tracking-wider shrink-0 mt-0.5">
                      Selected
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Diagnosis & Recommendations Card (6 cols) */}
          <div className="lg:col-span-6">
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xl sticky top-24 space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-200">
                    Master Technician Assessment
                  </span>
                </div>
                <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded border font-semibold ${getUrgencyColor(currentSymptom.urgency)}`}>
                  {currentSymptom.urgency} Urgency
                </span>
              </div>

              {/* Likely Root Cause */}
              <div>
                <span className="text-xs text-neutral-400 uppercase tracking-wider block">
                  Most Probable Fault:
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                  {currentSymptom.likelyIssue}
                </h3>
              </div>

              {/* Technician Recommendation */}
              <div className="p-4 bg-neutral-900/90 rounded-xl border border-neutral-800">
                <span className="text-xs font-semibold text-amber-400 block mb-1">
                  Bench Recommendation:
                </span>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {currentSymptom.recommendation}
                </p>
              </div>

              {/* Turnaround & Data Safety Guarantee */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800">
                  <span className="text-neutral-500 block">Est. Repair Time</span>
                  <span className="text-amber-400 font-mono font-bold mt-0.5 block">
                    {currentSymptom.estTime}
                  </span>
                </div>
                <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800">
                  <span className="text-neutral-500 block">Diagnostic Fee</span>
                  <span className="text-emerald-400 font-mono font-bold mt-0.5 block">
                    Free ($0 / Rs. 0)
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => onBookDiagnosis(currentSymptom.serviceCategory, currentSymptom.symptom)}
                  className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Book Free Inspection for This Issue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center text-[11px] text-neutral-400 mt-2">
                  No payment required until repair is completed and tested.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
