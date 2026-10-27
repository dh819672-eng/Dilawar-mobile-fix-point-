import React, { useState } from 'react';
import { RepairTicket } from '../data/repairData';
import { 
  Lock, 
  Unlock, 
  X, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Wrench, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Save, 
  Trash2, 
  ExternalLink,
  Smartphone,
  Layers,
  ArrowRight,
  Sparkles,
  Info,
  Globe,
  Copy,
  Check
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  tickets: RepairTicket[];
  onUpdateTicket: (updated: RepairTicket) => void;
  onCreateTicket: (newTicket: RepairTicket) => void;
  onDeleteTicket: (ticketId: string) => void;
  shopPhone: string;
  onUpdateShopPhone: (newPhone: string) => void;
  shopAddress: string;
  onUpdateShopAddress: (newAddress: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  tickets,
  onUpdateTicket,
  onCreateTicket,
  onDeleteTicket,
  shopPhone,
  onUpdateShopPhone,
  shopAddress,
  onUpdateShopAddress
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'tickets' | 'new' | 'google' | 'settings' | 'guide'>('tickets');
  const [selectedTicketId, setSelectedTicketId] = useState<string>(tickets[0]?.ticketId || '');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // New ticket state for walk-in entry
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');
  const [newDeviceModel, setNewDeviceModel] = useState('');
  const [newIssue, setNewIssue] = useState('');
  const [newPrice, setNewPrice] = useState<number>(1200);

  // Editable settings
  const [editPhone, setEditPhone] = useState(shopPhone);
  const [editAddress, setEditAddress] = useState(shopAddress);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: 9835 (first 4 digits of 9835257170) or 1234
    if (pinInput === '9835' || pinInput === '1234') {
      setIsAuthenticated(true);
      setPinError(null);
    } else {
      setPinError('Galat PIN! Default PIN "9835" ya "1234" use karein.');
    }
  };

  const showToast = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const selectedTicket = tickets.find(t => t.ticketId === selectedTicketId) || tickets[0];

  const handleStatusChange = (status: RepairTicket['status']) => {
    if (!selectedTicket) return;
    let progress = selectedTicket.progressPercent;
    if (status === 'received') progress = 10;
    else if (status === 'diagnostic') progress = 25;
    else if (status === 'parts_ordered') progress = 45;
    else if (status === 'repairing') progress = 65;
    else if (status === 'testing') progress = 85;
    else if (status === 'ready') progress = 100;

    const updated: RepairTicket = {
      ...selectedTicket,
      status,
      progressPercent: progress
    };
    onUpdateTicket(updated);
    showToast(`Status updated to "${status.toUpperCase()}"!`);
  };

  const handleProgressChange = (newVal: number) => {
    if (!selectedTicket) return;
    onUpdateTicket({
      ...selectedTicket,
      progressPercent: newVal
    });
  };

  const handleNotesChange = (notes: string) => {
    if (!selectedTicket) return;
    onUpdateTicket({
      ...selectedTicket,
      technicianNotes: notes
    });
  };

  const handleQCToggle = (key: keyof RepairTicket['qualityChecklist']) => {
    if (!selectedTicket) return;
    onUpdateTicket({
      ...selectedTicket,
      qualityChecklist: {
        ...selectedTicket.qualityChecklist,
        [key]: !selectedTicket.qualityChecklist[key]
      }
    });
  };

  const handleCreateWalkIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomerName.trim() || !newDeviceModel.trim()) {
      showToast('Kripya Customer Name aur Mobile Model daalein.');
      return;
    }

    const ticketId = `DMF-${Math.floor(2000 + Math.random() * 7900)}`;
    const newT: RepairTicket = {
      ticketId,
      customerName: newCustomerName.trim(),
      deviceModel: newDeviceModel.trim(),
      issue: newIssue.trim() || 'General Hardware Service',
      status: 'received',
      checkInDate: 'Today, Just Now',
      estimatedCompletion: 'Today, 1-2 Hours',
      technician: 'Master Tech Dilawar',
      progressPercent: 15,
      qualityChecklist: {
        displayTouch: false,
        cameraSensors: false,
        chargingRate: false,
        biometrics: false,
        networkAndWifi: false
      },
      technicianNotes: `Intake logged at Balu Tola Chowk counter. Customer contact: ${newCustomerPhone}`,
      repairPrice: newPrice
    };

    onCreateTicket(newT);
    setSelectedTicketId(ticketId);
    setNewCustomerName('');
    setNewCustomerPhone('');
    setNewDeviceModel('');
    setNewIssue('');
    setActiveTab('tickets');
    showToast(`Naya Ticket ${ticketId} create ho gaya!`);
  };

  const sendWhatsAppUpdate = (ticket: RepairTicket) => {
    const text = encodeURIComponent(
      `Namaste ${ticket.customerName}! Dilawar Mobile Fix Point (Balu Tola Chowk, Katihar) se update:\n\n` +
      `📱 Device: ${ticket.deviceModel}\n` +
      `🏷️ Ticket ID: ${ticket.ticketId}\n` +
      `⚡ Status: ${ticket.status.toUpperCase()} (${ticket.progressPercent}% completed)\n` +
      `📝 Note: "${ticket.technicianNotes}"\n` +
      `💰 Est. Bill: ₹${ticket.repairPrice}\n\n` +
      `Aap live progress yahan track kar sakte hain: https://ais-pre-ygwv4wjhpyaegp7mpit6sw-939250164016.asia-southeast1.run.app\n` +
      `Helpline: 9835257170`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-neutral-900 border border-neutral-700 max-w-4xl w-full rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="bg-neutral-950 p-4 sm:px-6 flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-neutral-950">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Dukaan Owner Control Panel</span>
                <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded">
                  Admin Master
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                Dilawar Mobile Fix Point · Balu Tola Chowk, Katihar
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback toast */}
        {feedbackMsg && (
          <div className="bg-emerald-500 text-neutral-950 px-4 py-2 text-xs font-bold text-center">
            {feedbackMsg}
          </div>
        )}

        {/* PIN Authentication Gate */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto space-y-6">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
              <Lock className="w-7 h-7" />
            </div>

            <div>
              <h4 className="text-xl font-bold text-white">Owner Security Login</h4>
              <p className="text-xs text-neutral-400 mt-1">
                Apna 4-Digit Owner PIN daalein website ko control karne ke liye.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  maxLength={6}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter PIN (Default: 9835)"
                  className="w-full text-center tracking-[0.5em] text-2xl font-mono bg-neutral-950 border border-neutral-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500"
                />
                {pinError && (
                  <p className="text-xs text-rose-400 mt-1.5 font-medium">{pinError}</p>
                )}
              </div>

              <div className="space-y-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl transition-colors shadow-sm"
                >
                  Unlock Control Panel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPinInput('9835');
                    setIsAuthenticated(true);
                  }}
                  className="text-[11px] text-amber-400/90 hover:underline block mx-auto pt-1"
                >
                  Quick Unlock with Default PIN: 9835
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Logged In Admin Dashboard */
          <div className="flex-1 overflow-y-auto flex flex-col">
            
            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 p-2 bg-neutral-950 border-b border-neutral-800 overflow-x-auto text-xs font-semibold">
              <button
                onClick={() => setActiveTab('tickets')}
                className={`py-2 px-3.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'tickets'
                    ? 'bg-amber-500 text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Active Repairs ({tickets.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('new')}
                className={`py-2 px-3.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'new'
                    ? 'bg-amber-500 text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Naya Grahak Entry</span>
              </button>

              <button
                onClick={() => setActiveTab('google')}
                className={`py-2 px-3.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'google'
                    ? 'bg-amber-500 text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Google par Kaise Layein</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`py-2 px-3.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'settings'
                    ? 'bg-amber-500 text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Shop Phone & Address</span>
              </button>

              <button
                onClick={() => setActiveTab('guide')}
                className={`py-2 px-3.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'guide'
                    ? 'bg-amber-500 text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Info className="w-3.5 h-3.5" />
                <span>Kaise Use Karein (Help)</span>
              </button>
            </div>

            {/* TAB 1: TICKETS MANAGER */}
            {activeTab === 'tickets' && (
              <div className="p-4 sm:p-6 space-y-6">
                
                {/* Ticket Selector Bar */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                    Select Customer Job Sheet to Manage:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                    {tickets.map(t => (
                      <button
                        key={t.ticketId}
                        onClick={() => setSelectedTicketId(t.ticketId)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          selectedTicket?.ticketId === t.ticketId
                            ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <div className="font-mono text-xs font-bold">{t.ticketId}</div>
                        <div className="text-[11px] truncate text-neutral-200 mt-0.5">{t.customerName.split(' ')[0]}</div>
                        <div className="text-[10px] uppercase font-mono text-amber-400 mt-1 capitalize">{t.status}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ticket Action Deck */}
                {selectedTicket && (
                  <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 space-y-6">
                    
                    {/* Header info of ticket */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-800 gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold font-mono text-white">
                            {selectedTicket.ticketId}
                          </span>
                          <span className="text-xs text-neutral-400">·</span>
                          <span className="text-sm font-semibold text-amber-400">
                            {selectedTicket.deviceModel}
                          </span>
                        </div>
                        <div className="text-xs text-neutral-400 mt-1">
                          Customer: <strong className="text-neutral-200">{selectedTicket.customerName}</strong> · Issue: <span className="text-neutral-300">{selectedTicket.issue}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => sendWhatsAppUpdate(selectedTicket)}
                          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp Grahak ko Update Bhejein</span>
                        </button>
                      </div>
                    </div>

                    {/* Step 1: 1-Click Status Change */}
                    <div>
                      <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block mb-2.5">
                        1. Change Current Repair Stage (Direct 1-Click):
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                        {(['received', 'diagnostic', 'parts_ordered', 'repairing', 'testing', 'ready'] as RepairTicket['status'][]).map(st => {
                          const isCurrent = selectedTicket.status === st;
                          return (
                            <button
                              key={st}
                              onClick={() => handleStatusChange(st)}
                              className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all text-center uppercase font-mono ${
                                isCurrent
                                  ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-md scale-105'
                                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                              }`}
                            >
                              {st === 'diagnostic' ? 'In-Diagnostic' : st === 'parts_ordered' ? 'Parts Ordered' : st}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 2: Progress Slider */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5 text-xs">
                        <span className="font-semibold text-neutral-300 uppercase tracking-wider">
                          2. Fine-Tune Progress:
                        </span>
                        <span className="font-mono text-amber-400 font-bold">
                          {selectedTicket.progressPercent}% Complete
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={5}
                        value={selectedTicket.progressPercent}
                        onChange={(e) => handleProgressChange(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>

                    {/* Step 3: Quality Checklist Checks */}
                    <div>
                      <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block mb-2">
                        3. 20-Point QC Testing Checklist (Tick as completed):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {[
                          { key: 'displayTouch', label: 'Screen Display & Multi-Touch Response' },
                          { key: 'cameraSensors', label: 'Front / Back Camera & Flash' },
                          { key: 'chargingRate', label: 'Fast Charging & Battery Thermals' },
                          { key: 'biometrics', label: 'Fingerprint / Face ID Unlock' },
                          { key: 'networkAndWifi', label: 'Calling, 5G Network & Wi-Fi' },
                        ].map(item => {
                          const k = item.key as keyof RepairTicket['qualityChecklist'];
                          const isDone = selectedTicket.qualityChecklist[k];
                          return (
                            <button
                              key={item.key}
                              type="button"
                              onClick={() => handleQCToggle(k)}
                              className={`p-2.5 rounded-lg border flex items-center justify-between text-left transition-colors ${
                                isDone
                                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-medium'
                                  : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                              }`}
                            >
                              <span>{item.label}</span>
                              <span className="font-mono text-xs">
                                {isDone ? '✓ PASSED' : '○ Pending'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 4: Technician Note */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                        4. Technician Bench Note (Grahak ko dikhega live tracker par):
                      </label>
                      <textarea
                        rows={2}
                        value={selectedTicket.technicianNotes}
                        onChange={(e) => handleNotesChange(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    {/* Delete or Archive */}
                    <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                      <button
                        onClick={() => {
                          if (confirm(`Kya aap Ticket ${selectedTicket.ticketId} ko delete karna chahte hain?`)) {
                            onDeleteTicket(selectedTicket.ticketId);
                            showToast(`Ticket ${selectedTicket.ticketId} delete ho gaya.`);
                          }
                        }}
                        className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 py-1 px-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete / Close Ticket</span>
                      </button>

                      <div className="text-xs text-neutral-400">
                        Changes website par live reflect ho chuke hain!
                      </div>
                    </div>

                  </div>
                )}

              </div>
            )}

            {/* TAB 2: NAYA GRAHAK ENTRY */}
            {activeTab === 'new' && (
              <form onSubmit={handleCreateWalkIn} className="p-4 sm:p-6 space-y-4 max-w-2xl mx-auto">
                <div>
                  <h4 className="text-base font-bold text-white">
                    Counter Walk-In: Naya Repair Job Sheet Banayein
                  </h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Jab koi grahak dukaan par phone laaye, yahan entry karein. Ticket ID turant generate hoga.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      value={newCustomerName}
                      onChange={(e) => setNewCustomerName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2.5 px-3 text-xs text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Customer Mobile Number (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      value={newCustomerPhone}
                      onChange={(e) => setNewCustomerPhone(e.target.value)}
                      placeholder="e.g. 9835xxxxxx"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2.5 px-3 text-xs text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Phone Brand & Model *
                    </label>
                    <input
                      type="text"
                      value={newDeviceModel}
                      onChange={(e) => setNewDeviceModel(e.target.value)}
                      placeholder="e.g. Vivo V29 ya Redmi Note 12"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2.5 px-3 text-xs text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Estimated Bill (₹)
                    </label>
                    <input
                      type="number"
                      value={newPrice}
                      onChange={(e) => setNewPrice(Number(e.target.value))}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2.5 px-3 text-xs text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Problem / Repair Issue
                  </label>
                  <input
                    type="text"
                    value={newIssue}
                    onChange={(e) => setNewIssue(e.target.value)}
                    placeholder="e.g. Display Combo Change / Charging Port repair"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2.5 px-3 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl transition-colors shadow-sm"
                  >
                    Ticket Create Karein & Live Tracker Me Daalein
                  </button>
                </div>
              </form>
            )}

            {/* TAB 3: DUKAAN SETTINGS */}
            {activeTab === 'settings' && (
              <div className="p-4 sm:p-6 space-y-5 max-w-2xl mx-auto">
                <div>
                  <h4 className="text-base font-bold text-white">
                    Shop Contact & Address Settings
                  </h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Yahan se aap website par dikhne wala mobile number aur pata change kar sakte hain.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Main Phone / WhatsApp Number:
                    </label>
                    <input
                      type="text"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2.5 px-3 text-xs text-white focus:border-amber-500 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Shop Full Address:
                    </label>
                    <textarea
                      rows={3}
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onUpdateShopPhone(editPhone);
                      onUpdateShopAddress(editAddress);
                      showToast('Dukaan details update ho gayi!');
                    }}
                    className="py-2.5 px-5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl transition-colors flex items-center gap-2"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes Live</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB: GOOGLE PAR KAISE LAYEIN */}
            {activeTab === 'google' && (
              <div className="p-4 sm:p-6 space-y-5 max-w-2xl mx-auto text-xs text-neutral-300 leading-relaxed">
                
                {/* Notice Box */}
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <Globe className="w-4 h-4" />
                    <span>Website Google Search me turant kyun nahi aati?</span>
                  </div>
                  <p className="text-neutral-300 text-xs leading-relaxed">
                    Koi bhi nayi website bante hi Google par 5 minute me nahi aati. Google ka robot (Googlebot) pehle naye link ko crawl aur verify karta hai jisme <strong>24 se 48 ghante</strong> lagte hain. Lekin niche diye gaye 2 steps karke aap ise turant la sakte hain!
                  </p>
                </div>

                {/* Step 1: Direct Link */}
                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">1. Aapki Website ka Live Public Link</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Active Online</span>
                  </div>
                  <div className="p-2.5 bg-neutral-900 rounded-lg border border-neutral-800 font-mono text-[11px] text-amber-300 break-all flex items-center justify-between gap-2">
                    <span>https://ais-pre-ygwv4wjhpyaegp7mpit6sw-939250164016.asia-southeast1.run.app</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText("https://ais-pre-ygwv4wjhpyaegp7mpit6sw-939250164016.asia-southeast1.run.app");
                        setCopiedLink(true);
                        setTimeout(() => setCopiedLink(false), 2000);
                      }}
                      className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-white rounded text-[10px] font-sans flex items-center gap-1 shrink-0"
                    >
                      {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-neutral-400 text-[11px]">
                    Ise aap kisi ko bhi WhatsApp par bhejenge to website direct open ho jayegi.
                  </p>
                </div>

                {/* Step 2: Google Search Console */}
                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">2. Google Search Console me Indexing Request karein</span>
                    <span className="text-[10px] text-amber-400 font-mono">Google Search</span>
                  </div>
                  <p className="text-neutral-400 text-xs">
                    Google ke crawler ko turant bulane ke liye Google Search Console me apna link submit karein:
                  </p>
                  <ol className="list-decimal pl-4 space-y-1 text-neutral-400 text-xs">
                    <li>Niche diye button par click karke <strong>Google Search Console</strong> kholein.</li>
                    <li>Apna URL paste karein aur <strong>"Request Indexing"</strong> button dabayein.</li>
                    <li>Sitemaps option me jakar <code className="text-amber-300 bg-neutral-900 px-1 py-0.5 rounded">sitemap.xml</code> submit karein.</li>
                  </ol>
                  <a
                    href="https://search.google.com/search-console"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition-colors"
                  >
                    <span>Google Search Console Kholein</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Step 3: Google Maps Business Profile (Most important for Katihar & Pranpur customers) */}
                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">3. Google Maps / Business Profile (Sabse Zaroori)</span>
                    <span className="text-[10px] text-amber-400 font-mono">Google Maps</span>
                  </div>
                  <p className="text-neutral-400 text-xs">
                    Jab koi Pranpur ya Katihar me Google par <strong>"Dilawar Mobile Fix Point"</strong> ya <strong>"Mobile repair near me"</strong> search karega, to Google Maps par aapki dukaan photo aur call button ke saath aayegi.
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-neutral-400 text-xs">
                    <li>Dukaan ka naam: <strong>Dilawar Mobile Fix Point</strong></li>
                    <li>Address: <strong>Labha, Balu Tola Chowk, Babhni, Pranpur, Katihar, Bihar - 854116</strong></li>
                    <li>Phone: <strong>9835257170</strong></li>
                    <li>Website: <strong>https://ais-pre-ygwv4wjhpyaegp7mpit6sw-939250164016.asia-southeast1.run.app</strong></li>
                  </ul>
                  <a
                    href="https://www.google.com/business/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 py-2 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors"
                  >
                    <span>Google Business Profile Banayein (Free)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            )}

            {/* TAB 4: HOW IT WORKS GUIDE (HINDI + ENGLISH) */}
            {activeTab === 'guide' && (
              <div className="p-4 sm:p-6 space-y-4 max-w-2xl mx-auto text-xs text-neutral-300 leading-relaxed">
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                  <h4 className="font-bold text-sm text-amber-400 mb-1">
                    Website ko Control karne ke 2 Asaan Tarike:
                  </h4>
                  <p className="text-neutral-300">
                    Aap is website ko 100% apne phone ya computer se control kar sakte hain.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800">
                    <strong className="text-white block mb-1">
                      Tarika 1: Dukaan Owner Control Panel (Yahi Window)
                    </strong>
                    <ul className="list-disc pl-4 space-y-1 text-neutral-400">
                      <li>Kisi bhi phone ka stage 1 click me badle: <em>Received → In-Diagnostic → Parts Ordered → Repairing → Testing → Ready</em>.</li>
                      <li>Customer ka bill aur QC testing tick karein.</li>
                      <li><strong>WhatsApp Button</strong> dabayein grahak ko live receipt bhejne ke liye.</li>
                      <li>Naye grahak ki entry karein counter par.</li>
                    </ul>
                  </div>

                  <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800">
                    <strong className="text-white block mb-1">
                      Tarika 2: AI Studio Chat me bolkar
                    </strong>
                    <p className="text-neutral-400">
                      Jab bhi aapko design me naya feature chahiye, jaise:
                      <br />• <em>"Naya phone brand add kar do"</em>
                      <br />• <em>"Offers ya banner lagao"</em>
                      <br />• <em>"Pricing badal do"</em>
                      <br />Aap bas chat me likhein, hum turant code modify karke update kar denge!
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-center text-neutral-400">
                  Aapka Secret Owner PIN: <strong className="text-white font-mono">9835</strong>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
