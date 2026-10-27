import React, { useState, useEffect } from 'react';
import { DEVICE_BRANDS, REPAIR_SERVICES, RepairTicket } from '../data/repairData';
import { X, CheckCircle2, Calendar, Clock, MapPin, Truck, Copy, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefill?: {
    brand?: string;
    model?: string;
    issue?: string;
  };
  onTicketCreated: (newTicket: RepairTicket) => void;
  onTrackTicket: (ticketId: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  prefill,
  onTicketCreated,
  onTrackTicket
}) => {
  const [bookingType, setBookingType] = useState<'walkin' | 'courier'>('walkin');
  const [brandName, setBrandName] = useState<string>(prefill?.brand || 'Apple iPhone');
  const [modelName, setModelName] = useState<string>(prefill?.model || 'iPhone 15 Pro');
  const [issueName, setIssueName] = useState<string>(prefill?.issue || 'OLED & Glass Screen Replacement');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('Morning (10:00 AM - 1:00 PM)');
  const [notes, setNotes] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [createdTicket, setCreatedTicket] = useState<RepairTicket | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Sync prefill when modal opens
  useEffect(() => {
    if (prefill) {
      if (prefill.brand) setBrandName(prefill.brand);
      if (prefill.model) setModelName(prefill.model);
      if (prefill.issue) setIssueName(prefill.issue);
    }
  }, [prefill]);

  // Set default tomorrow date
  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    setDate(today.toISOString().split('T')[0]);
  }, []);

  if (!isOpen) return null;

  const validate = () => {
    const err: { [key: string]: string } = {};
    if (!fullName.trim()) err.fullName = 'Please enter your full name.';
    if (!phone.trim() || phone.trim().length < 8) {
      err.phone = 'Please provide a valid contact or WhatsApp number.';
    }
    if (!date) err.date = 'Please pick a preferred date.';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newTicketId = `DMF-${Math.floor(2000 + Math.random() * 7900)}`;

    const newTicket: RepairTicket = {
      ticketId: newTicketId,
      customerName: fullName.trim(),
      deviceModel: `${brandName} ${modelName}`,
      issue: issueName,
      status: 'received',
      checkInDate: 'Booked online · Today',
      estimatedCompletion: `${date} · ${timeSlot.split(' ')[0]}`,
      technician: 'Lead Specialist Dilawar',
      progressPercent: 20,
      qualityChecklist: {
        displayTouch: false,
        cameraSensors: false,
        chargingRate: false,
        biometrics: false,
        networkAndWifi: false
      },
      technicianNotes: notes.trim()
        ? `Customer note: "${notes.trim()}". Standard intake diagnostics scheduled.`
        : 'Device intake confirmed. Pre-diagnostic inspection queued upon arrival.',
      repairPrice: 65
    };

    onTicketCreated(newTicket);
    setCreatedTicket(newTicket);
  };

  const handleCopyTicket = () => {
    if (createdTicket) {
      navigator.clipboard.writeText(createdTicket.ticketId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleResetAndClose = () => {
    setCreatedTicket(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-neutral-900 border border-neutral-700 max-w-xl w-full rounded-2xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-lg focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Successful Booking Screen */}
        {createdTicket ? (
          <div className="text-center py-4 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block">
                Repair Appointment Confirmed
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-1">
                Your Job Sheet is Ready
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-md mx-auto">
                Thank you, <strong className="text-white">{createdTicket.customerName}</strong>. Your bench reservation has been allocated at Dilawar Mobile Fix Point.
              </p>
            </div>

            {/* Ticket Card Box */}
            <div className="p-5 bg-neutral-950 rounded-2xl border border-neutral-800 text-left space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">
                    Your Tracking Ticket ID:
                  </span>
                  <span className="text-xl font-bold font-mono text-amber-400">
                    {createdTicket.ticketId}
                  </span>
                </div>
                <button
                  onClick={handleCopyTicket}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy ID'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-neutral-500 block">Device</span>
                  <span className="text-neutral-200 font-semibold">{createdTicket.deviceModel}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Service</span>
                  <span className="text-neutral-200 font-semibold">{createdTicket.issue}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Scheduled Time</span>
                  <span className="text-neutral-200 font-semibold">{date} ({timeSlot.split(' ')[0]})</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Intake Type</span>
                  <span className="text-neutral-200 font-semibold capitalize">{bookingType} Intake</span>
                </div>
              </div>
            </div>

            {/* Direct Tracker Action */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  onTrackTicket(createdTicket.ticketId);
                  handleResetAndClose();
                }}
                className="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <span>Track This Ticket in Live Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetAndClose}
                className="py-3 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-xl transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Main Booking Form */
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <span>Direct Appointment</span>
                <span aria-hidden="true">·</span>
                <span>Express Bench Reservation</span>
              </div>
              <h3 className="text-xl font-extrabold text-white mt-1">
                Book Your Smartphone Repair
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Walk in directly or request express courier pickup. No upfront payment required.
              </p>
            </div>

            {/* Intake Type Selector */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-950 rounded-xl border border-neutral-800">
              <button
                type="button"
                onClick={() => setBookingType('walkin')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  bookingType === 'walkin'
                    ? 'bg-neutral-800 text-amber-400 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Store Walk-In (30 Mins)</span>
              </button>

              <button
                type="button"
                onClick={() => setBookingType('courier')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  bookingType === 'courier'
                    ? 'bg-neutral-800 text-amber-400 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Courier Pickup & Return</span>
              </button>
            </div>

            {/* Device Info (Brand + Model) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Brand
                </label>
                <select
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {DEVICE_BRANDS.map(b => (
                    <option key={b.id} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Model
                </label>
                <input
                  type="text"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  placeholder="e.g. iPhone 15 Pro or S23"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2.5 px-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Service Category */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                Repair Service Needed
              </label>
              <select
                value={issueName}
                onChange={(e) => setIssueName(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                {REPAIR_SERVICES.map(s => (
                  <option key={s.id} value={s.name}>{s.name} ({s.turnaroundTime})</option>
                ))}
                <option value="General Diagnostics & Inspection">General Diagnostics & Inspection (Free)</option>
              </select>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
                  }}
                  placeholder="Your Name"
                  className={`w-full bg-neutral-950 border rounded-xl py-2.5 px-3 text-xs text-white placeholder-neutral-500 focus:outline-none ${
                    errors.fullName ? 'border-rose-500' : 'border-neutral-800 focus:border-amber-500'
                  }`}
                />
                {errors.fullName && <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                  }}
                  placeholder="+91 98352 57170"
                  className={`w-full bg-neutral-950 border rounded-xl py-2.5 px-3 text-xs text-white placeholder-neutral-500 focus:outline-none ${
                    errors.phone ? 'border-rose-500' : 'border-neutral-800 focus:border-amber-500'
                  }`}
                />
                {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Preferred Time
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                  <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
                  <option value="Evening (5:00 PM - 8:30 PM)">Evening (5:00 PM - 8:30 PM)</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                Additional Notes / Fault Description
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="e.g. Phone fell on concrete, display is black but alarm rings..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2 px-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Privacy pledge */}
            <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center gap-2.5 text-xs text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>We never format your storage or view personal photos/messages without explicit consent.</span>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl transition-colors shadow-sm"
              >
                Confirm Appointment & Generate Ticket
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
