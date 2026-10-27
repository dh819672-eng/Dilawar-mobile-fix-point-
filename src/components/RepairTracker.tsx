import React, { useState } from 'react';
import { RepairTicket } from '../data/repairData';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  AlertCircle, 
  Wrench, 
  ShieldCheck, 
  PhoneCall, 
  PackageCheck, 
  Package, 
  Truck, 
  Sparkles,
  Check,
  ChevronRight,
  CircleDot
} from 'lucide-react';

interface RepairTrackerProps {
  tickets: RepairTicket[];
  activeTicketId?: string;
}

interface RepairStage {
  key: RepairTicket['status'];
  label: string;
  shortDesc: string;
  detail: string;
  icon: React.ReactNode;
}

export const RepairTracker: React.FC<RepairTrackerProps> = ({ tickets, activeTicketId }) => {
  const [searchInput, setSearchInput] = useState<string>(activeTicketId || 'DMF-8492');
  const [selectedTicketId, setSelectedTicketId] = useState<string>(activeTicketId || 'DMF-8492');
  const [searchError, setSearchError] = useState<string | null>(null);

  // Find ticket or fallback to first
  const currentTicket = tickets.find(
    t => t.ticketId.toLowerCase() === selectedTicketId.toLowerCase()
  ) || tickets[0];

  // Specific 6 stages requested: Received, In-Diagnostic, Parts Ordered, Repairing, Testing, Ready
  const stages: RepairStage[] = [
    {
      key: 'received',
      label: 'Received',
      shortDesc: 'Intake & Inspection',
      detail: 'Device checked in, physical inspection logged, and bench queue allocated.',
      icon: <PackageCheck className="w-4 h-4" />
    },
    {
      key: 'diagnostic',
      label: 'In-Diagnostic',
      shortDesc: 'Circuit Analysis',
      detail: 'Microscope & multimeter analysis isolating short circuits and component faults.',
      icon: <Search className="w-4 h-4" />
    },
    {
      key: 'parts_ordered',
      label: 'Parts Ordered',
      shortDesc: 'OEM Supply Allocated',
      detail: 'Genuine OEM-grade components verified and reserved from authorized parts stock.',
      icon: <Truck className="w-4 h-4" />
    },
    {
      key: 'repairing',
      label: 'Repairing',
      shortDesc: 'Bench Restoration',
      detail: 'Active micro-soldering, precision screen lamination, or battery installation underway.',
      icon: <Wrench className="w-4 h-4" />
    },
    {
      key: 'testing',
      label: 'Testing',
      shortDesc: '20-Point QC Check',
      detail: 'Multi-touch response, camera stability, fast charging, thermal & biometric verification.',
      icon: <ShieldCheck className="w-4 h-4" />
    },
    {
      key: 'ready',
      label: 'Ready',
      shortDesc: 'Ready for Pickup',
      detail: 'Quality seal attached, 90-day warranty registered, awaiting customer collection.',
      icon: <CheckCircle2 className="w-4 h-4" />
    }
  ];

  const getStageIndex = (status: RepairTicket['status']) => {
    const idx = stages.findIndex(s => s.key === status);
    return idx !== -1 ? idx : 0;
  };

  const currentStageIndex = getStageIndex(currentTicket.status);
  const activeStage = stages[currentStageIndex];

  // Calculate percentage along the progress track
  const progressTrackPercent = (currentStageIndex / (stages.length - 1)) * 100;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = searchInput.trim().toUpperCase();
    const found = tickets.find(t => t.ticketId.toUpperCase() === cleanId);
    if (found) {
      setSelectedTicketId(found.ticketId);
      setSearchError(null);
    } else {
      setSearchError(`No active repair ticket found with ID "${cleanId}". Try sample tickets below.`);
    }
  };

  const handleSampleClick = (ticketId: string) => {
    setSearchInput(ticketId);
    setSelectedTicketId(ticketId);
    setSearchError(null);
  };

  return (
    <section id="track" className="py-16 sm:py-24 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
            <span>Live Repair Portal</span>
            <span aria-hidden="true">·</span>
            <span>Real-Time Job Sheet Tracking</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-2 [text-wrap:balance]">
            Track Your Device Repair Progress Live
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 mt-2 leading-relaxed">
            Follow every stage of your repair from intake to final quality check. Enter your Job Sheet ID or select a sample ticket to see live bench statuses.
          </p>
        </div>

        {/* Search & Sample Bar */}
        <div className="mt-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-2xl">
            <div className="relative flex-grow">
              <Search className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Ticket ID (e.g. DMF-8492)"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3.5 pl-11 pr-4 text-sm font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors uppercase"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm rounded-xl transition-colors whitespace-nowrap shrink-0 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              Lookup Ticket
            </button>
          </form>

          {/* Error notice if not found */}
          {searchError && (
            <div className="mt-2.5 text-xs text-rose-400 flex items-center gap-1.5 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{searchError}</span>
            </div>
          )}

          {/* Quick sample chips for instant testing of all stages */}
          <div className="mt-4 flex items-center gap-2 flex-wrap text-xs text-neutral-400">
            <span className="font-medium text-neutral-400">Test live repair stages:</span>
            {tickets.map(ticket => {
              const stageName = stages.find(s => s.key === ticket.status)?.label || ticket.status;
              const isSelected = selectedTicketId === ticket.ticketId;
              return (
                <button
                  key={ticket.ticketId}
                  onClick={() => handleSampleClick(ticket.ticketId)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-colors flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold shadow-sm'
                      : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
                  }`}
                >
                  <span className="font-bold">{ticket.ticketId}</span>
                  <span className="text-neutral-500">·</span>
                  <span className="text-[11px] text-amber-400/90">{stageName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Ticket Card */}
        <div className="mt-10 bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          
          {/* Top Bar of the Ticket */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-neutral-800 gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight">
                  Job Sheet #{currentTicket.ticketId}
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-md font-semibold tracking-wider uppercase font-mono ${
                  currentTicket.status === 'ready'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : currentTicket.status === 'testing'
                    ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                    : currentTicket.status === 'parts_ordered'
                    ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                }`}>
                  Stage: {activeStage.label}
                </span>
              </div>
              
              <div className="text-xs text-neutral-400 mt-2 flex items-center gap-3 flex-wrap">
                <span>Customer: <strong className="text-neutral-200">{currentTicket.customerName}</strong></span>
                <span>·</span>
                <span>Device: <strong className="text-neutral-200">{currentTicket.deviceModel}</strong></span>
                <span>·</span>
                <span>Logged: <strong className="text-neutral-200">{currentTicket.checkInDate}</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/919835257170?text=Hello%2C%20inquiry%20regarding%20repair%20ticket%20${currentTicket.ticketId}%20(${currentTicket.deviceModel})`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                <span>WhatsApp Helpline: 9835257170</span>
              </a>
            </div>
          </div>

          {/* VISUAL PROGRESS BAR SECTION */}
          <div className="mt-8 pt-2">
            
            {/* Header Strip above Progress Bar */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
                  Live Stage Progress
                </span>
                <span className="text-xs text-neutral-500">·</span>
                <span className="text-xs font-mono text-amber-400 font-semibold">
                  Stage {currentStageIndex + 1} of {stages.length}: {activeStage.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400">Total Completion:</span>
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                  {Math.round(progressTrackPercent)}%
                </span>
              </div>
            </div>

            {/* Desktop & Tablet Connected Stepper Progress Bar */}
            <div className="hidden md:block py-6 px-4 bg-neutral-950/80 rounded-2xl border border-neutral-800/80">
              
              {/* Stepper Track Container */}
              <div className="relative">
                
                {/* Background Track Rail */}
                <div className="absolute top-5 left-6 right-6 h-1.5 bg-neutral-800 rounded-full -translate-y-1/2 z-0" />

                {/* Animated Filled Progress Track */}
                <div 
                  className="absolute top-5 left-6 h-1.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 rounded-full -translate-y-1/2 z-0 transition-all duration-700 shadow-[0_0_12px_rgba(245,158,11,0.4)]"
                  style={{ width: `calc(${progressTrackPercent}% * ((100% - 48px) / 100))` }}
                />

                {/* The 6 Milestone Nodes */}
                <div className="relative z-10 flex items-start justify-between">
                  {stages.map((stage, idx) => {
                    const isCompleted = idx < currentStageIndex;
                    const isCurrent = idx === currentStageIndex;
                    const isPending = idx > currentStageIndex;

                    return (
                      <div 
                        key={stage.key}
                        className="flex flex-col items-center text-center w-28 group"
                      >
                        {/* Node Bubble */}
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isCompleted
                              ? 'bg-amber-500 text-neutral-950 ring-4 ring-amber-500/20 shadow-md font-bold'
                              : isCurrent
                              ? 'bg-amber-400 text-neutral-950 ring-4 ring-amber-400/40 shadow-[0_0_16px_rgba(251,191,36,0.6)] font-bold scale-110'
                              : 'bg-neutral-900 border-2 border-neutral-700 text-neutral-500'
                          }`}
                        >
                          {isCompleted ? (
                            <Check className="w-5 h-5 stroke-[2.5]" />
                          ) : (
                            <span className="text-xs font-mono font-bold">
                              {stage.icon}
                            </span>
                          )}
                        </div>

                        {/* Node Label */}
                        <div className="mt-3 space-y-0.5">
                          <span
                            className={`text-xs block font-bold transition-colors ${
                              isCurrent
                                ? 'text-amber-400 font-extrabold'
                                : isCompleted
                                ? 'text-white'
                                : 'text-neutral-500'
                            }`}
                          >
                            {stage.label}
                          </span>
                          <span className="text-[10px] text-neutral-400 block font-medium line-clamp-1">
                            {stage.shortDesc}
                          </span>
                        </div>

                        {/* Current Status Pill indicator */}
                        {isCurrent && (
                          <span className="mt-1.5 text-[9px] uppercase font-mono tracking-wider px-1.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded font-semibold animate-pulse">
                            Active
                          </span>
                        )}
                        {isCompleted && (
                          <span className="mt-1.5 text-[9px] font-mono text-neutral-400">
                            Done
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>

            </div>

            {/* Mobile-Friendly Stepper View */}
            <div className="md:hidden space-y-2 bg-neutral-950/80 p-4 rounded-xl border border-neutral-800">
              
              {/* Progress bar line for mobile */}
              <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden mb-4">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-500"
                  style={{ width: `${progressTrackPercent}%` }}
                />
              </div>

              {/* Connected list for mobile */}
              <div className="space-y-2">
                {stages.map((stage, idx) => {
                  const isCompleted = idx < currentStageIndex;
                  const isCurrent = idx === currentStageIndex;

                  return (
                    <div
                      key={stage.key}
                      className={`p-2.5 rounded-lg border flex items-center justify-between text-xs transition-colors ${
                        isCurrent
                          ? 'bg-amber-500/10 border-amber-500/50 text-white font-semibold'
                          : isCompleted
                          ? 'bg-neutral-900/60 border-neutral-800/80 text-neutral-300'
                          : 'bg-neutral-950 border-neutral-900 text-neutral-600'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                          isCompleted
                            ? 'bg-amber-500 text-neutral-950 font-bold'
                            : isCurrent
                            ? 'bg-amber-400 text-neutral-950 font-bold'
                            : 'border border-neutral-700 text-neutral-500'
                        }`}>
                          {isCompleted ? <Check className="w-3 h-3" /> : idx + 1}
                        </div>
                        <div>
                          <span className={isCurrent ? 'text-amber-300 font-bold' : isCompleted ? 'text-white' : 'text-neutral-500'}>
                            {stage.label}
                          </span>
                          <span className="text-[10px] text-neutral-400 block">
                            {stage.shortDesc}
                          </span>
                        </div>
                      </div>

                      {isCurrent ? (
                        <span className="text-[10px] font-mono text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                          Current Stage
                        </span>
                      ) : isCompleted ? (
                        <span className="text-[10px] font-mono text-neutral-400">
                          Completed
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-neutral-600">
                          Pending
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Current Stage Highlight Callout Banner */}
            <div className="mt-5 p-4 sm:p-5 bg-neutral-950 rounded-xl border border-neutral-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  {activeStage.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase text-amber-400 tracking-wider font-semibold">
                      Current Workshop Phase
                    </span>
                    <span className="text-neutral-600">/</span>
                    <span className="text-xs font-bold text-white">
                      {activeStage.label}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 mt-1 leading-relaxed">
                    {activeStage.detail}
                  </p>
                </div>
              </div>

              <div className="sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-neutral-800">
                <span className="text-[11px] text-neutral-500 block">Target Handover</span>
                <span className="text-xs sm:text-sm font-mono font-bold text-amber-400 block mt-0.5">
                  {currentTicket.estimatedCompletion}
                </span>
              </div>
            </div>

          </div>

          {/* Details 2-Column Split: Technician Notes & Quality Checklist */}
          <div className="mt-8 pt-8 border-t border-neutral-800 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Repair Scope & Notes */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <span className="text-xs text-neutral-400 uppercase tracking-wider block">
                  Reported Issue & Scope
                </span>
                <span className="text-base font-bold text-white mt-1 block">
                  {currentTicket.issue}
                </span>
              </div>

              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-amber-400">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Technician Bench Note ({currentTicket.technician})</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-mono">
                  "{currentTicket.technicianNotes}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800">
                  <span className="text-neutral-500 block">Lead Specialist</span>
                  <span className="text-neutral-200 font-semibold mt-0.5 block">{currentTicket.technician}</span>
                </div>
                <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800">
                  <span className="text-neutral-500 block">Est. Completion</span>
                  <span className="text-amber-400 font-semibold font-mono mt-0.5 block">{currentTicket.estimatedCompletion}</span>
                </div>
              </div>
            </div>

            {/* Right: 20-Point Quality Checklist */}
            <div className="lg:col-span-5 bg-neutral-950 p-5 rounded-xl border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-200">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Quality Assurance Checklist</span>
                </div>
                <span className="text-[11px] font-mono text-neutral-400">Post-Repair QC</span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-300">Digitizer & Multi-Touch Response</span>
                  {currentTicket.qualityChecklist.displayTouch ? (
                    <span className="text-emerald-400 font-medium flex items-center gap-1 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Passed
                    </span>
                  ) : (
                    <span className="text-neutral-500 font-mono">Pending Test</span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-300">Front & Rear Cameras / OIS</span>
                  {currentTicket.qualityChecklist.cameraSensors ? (
                    <span className="text-emerald-400 font-medium flex items-center gap-1 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Passed
                    </span>
                  ) : (
                    <span className="text-neutral-500 font-mono">Pending Test</span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-300">Fast Charging & Thermal Dissipation</span>
                  {currentTicket.qualityChecklist.chargingRate ? (
                    <span className="text-emerald-400 font-medium flex items-center gap-1 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Passed
                    </span>
                  ) : (
                    <span className="text-neutral-500 font-mono">Pending Test</span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-300">Biometrics (Face ID / Fingerprint)</span>
                  {currentTicket.qualityChecklist.biometrics ? (
                    <span className="text-emerald-400 font-medium flex items-center gap-1 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Passed
                    </span>
                  ) : (
                    <span className="text-neutral-500 font-mono">Pending Test</span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-300">Cellular, Wi-Fi 6 & Bluetooth Signals</span>
                  {currentTicket.qualityChecklist.networkAndWifi ? (
                    <span className="text-emerald-400 font-medium flex items-center gap-1 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Passed
                    </span>
                  ) : (
                    <span className="text-neutral-500 font-mono">Pending Test</span>
                  )}
                </div>
              </div>

              {currentTicket.status === 'ready' ? (
                <div className="mt-3 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-xs text-emerald-300 font-medium">
                  Your device has passed all tests and is ready at the service counter with 90-day warranty card.
                </div>
              ) : (
                <div className="mt-3 p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-neutral-400">
                  Tests will execute automatically as soon as assembly reaches the Quality Testing stage.
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
