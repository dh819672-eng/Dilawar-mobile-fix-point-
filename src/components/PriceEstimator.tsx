import React, { useState, useMemo } from 'react';
import { DEVICE_BRANDS, REPAIR_SERVICES } from '../data/repairData';
import { Calculator, Clock, ShieldCheck, Sparkles, Check, ArrowRight } from 'lucide-react';

interface PriceEstimatorProps {
  onBookRepair: (details: { brand: string; model: string; issue: string; price: number }) => void;
}

export const PriceEstimator: React.FC<PriceEstimatorProps> = ({ onBookRepair }) => {
  const [selectedBrandId, setSelectedBrandId] = useState<string>('apple');
  const [selectedModel, setSelectedModel] = useState<string>('iPhone 15 Pro');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('screen');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  // Exchange rate for INR (approx 85 INR / 1 USD)
  const exchangeRate = 85;

  // Selected brand object
  const currentBrand = useMemo(() => {
    return DEVICE_BRANDS.find(b => b.id === selectedBrandId) || DEVICE_BRANDS[0];
  }, [selectedBrandId]);

  // Handle brand switch: reset model to first in list
  const handleBrandChange = (brandId: string) => {
    setSelectedBrandId(brandId);
    const brand = DEVICE_BRANDS.find(b => b.id === brandId);
    if (brand && brand.models.length > 0) {
      setSelectedModel(brand.models[0]);
    }
  };

  // Selected service object
  const currentService = useMemo(() => {
    return REPAIR_SERVICES.find(s => s.id === selectedServiceId) || REPAIR_SERVICES[0];
  }, [selectedServiceId]);

  // Dynamic pricing calculation based on model vintage / tier
  const calculatedEstimate = useMemo(() => {
    let base = currentService.startingPrice;
    
    // Model tier adjustment
    const modelLower = selectedModel.toLowerCase();
    if (modelLower.includes('pro max') || modelLower.includes('ultra') || modelLower.includes('fold')) {
      base = Math.round(base * 1.55);
    } else if (modelLower.includes('pro') || modelLower.includes('plus') || modelLower.includes('+') || modelLower.includes('flip')) {
      base = Math.round(base * 1.3);
    } else if (modelLower.includes('note') || modelLower.includes('nord') || modelLower.includes('poco') || modelLower.includes('a55')) {
      base = Math.round(base * 0.85);
    }

    const priceUSD = base;
    const priceINR = Math.round(base * exchangeRate);

    return {
      priceUSD,
      priceINR,
      formatted: currency === 'INR' ? `₹${priceINR.toLocaleString('en-IN')}` : `$${priceUSD}`,
      turnaround: currentService.turnaroundTime,
      warranty: currentService.warranty
    };
  }, [currentService, selectedModel, currency]);

  return (
    <section id="estimator" className="py-16 sm:py-24 bg-neutral-900/60 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
            <span>Instant Cost Calculator</span>
            <span aria-hidden="true">·</span>
            <span>Transparent Pricing in INR (₹)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-2 [text-wrap:balance]">
            Calculate Your Repair Cost & Turnaround Time
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 mt-2 leading-relaxed">
            No surprise add-ons. Select your device and required service to view immediate labor and original-grade component estimates.
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="mt-8 flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-neutral-800">
          <span className="text-xs text-neutral-400 font-medium">Select Brand & Device Details:</span>
          <div className="flex items-center gap-1.5 p-1 bg-neutral-950 border border-neutral-800 rounded-lg">
            <span className="text-xs text-neutral-400 px-2">Currency:</span>
            <button
              onClick={() => setCurrency('INR')}
              className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                currency === 'INR'
                  ? 'bg-amber-500 text-neutral-950'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              INR (₹)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                currency === 'USD'
                  ? 'bg-amber-500 text-neutral-950'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Brand Selection */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2.5">
                1. Select Brand
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {DEVICE_BRANDS.map(brand => (
                  <button
                    key={brand.id}
                    onClick={() => handleBrandChange(brand.id)}
                    className={`py-3 px-4 text-xs font-semibold rounded-xl border text-left transition-all ${
                      selectedBrandId === brand.id
                        ? 'border-amber-500 bg-amber-500/10 text-amber-300 shadow-sm'
                        : 'border-neutral-800 bg-neutral-950 hover:bg-neutral-800/80 text-neutral-300 hover:text-white'
                    }`}
                  >
                    {brand.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Specific Model */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2.5">
                2. Select Specific Model ({currentBrand.name})
              </label>
              <div className="relative">
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 px-4 text-sm font-medium text-white focus:outline-none focus:border-amber-500 transition-colors cursor-pointer appearance-none"
                >
                  {currentBrand.models.map(model => (
                    <option key={model} value={model} className="bg-neutral-950 text-white py-1">
                      {model}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Step 3: Repair Service Category */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2.5">
                3. Select Repair Service Required
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {REPAIR_SERVICES.map(service => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedServiceId(service.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      selectedServiceId === service.id
                        ? 'border-amber-500 bg-amber-500/10 text-white shadow-sm'
                        : 'border-neutral-800 bg-neutral-950 hover:bg-neutral-800/80 text-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-bold text-white">{service.name}</span>
                      {selectedServiceId === service.id && (
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      )}
                    </div>
                    <span className="text-[11px] text-neutral-400 mt-1 line-clamp-1">
                      {service.shortDesc}
                    </span>
                    <div className="mt-2 text-[10px] text-amber-400/90 font-mono flex items-center justify-between">
                      <span>{service.turnaroundTime}</span>
                      <span>{service.warranty}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Result Card Column (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 shadow-xl sticky top-24 space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Estimated Repair Summary
                </span>
                <span className="text-[11px] font-mono text-neutral-400">
                  Ref: EST-{Math.floor(1000 + Math.random() * 9000)}
                </span>
              </div>

              <div>
                <span className="text-xs text-neutral-400 block">Device</span>
                <span className="text-base font-bold text-white block mt-0.5">
                  {currentBrand.name} · {selectedModel}
                </span>

                <span className="text-xs text-neutral-400 block mt-3">Selected Service</span>
                <span className="text-sm font-semibold text-amber-400 block mt-0.5">
                  {currentService.name}
                </span>
              </div>

              {/* Price display with tabular-nums */}
              <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-neutral-400">Estimated Total:</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                    {calculatedEstimate.formatted}
                  </span>
                </div>
                <div className="text-[11px] text-neutral-400 mt-1 flex items-center justify-between">
                  <span>Parts + Professional Bench Labor</span>
                  <span className="text-amber-400 font-medium">No Fix, No Fee</span>
                </div>
              </div>

              {/* Service details breakdown */}
              <div className="space-y-2.5 text-xs text-neutral-300">
                <div className="flex items-center justify-between py-1.5 border-b border-neutral-800/80">
                  <span className="flex items-center gap-2 text-neutral-400">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Estimated Turnaround:</span>
                  </span>
                  <span className="font-semibold text-white font-mono">
                    {calculatedEstimate.turnaround}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-neutral-800/80">
                  <span className="flex items-center gap-2 text-neutral-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Warranty Period:</span>
                  </span>
                  <span className="font-semibold text-white font-mono">
                    {calculatedEstimate.warranty}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <span className="text-neutral-400">Parts Grade:</span>
                  <span className="font-semibold text-neutral-200">
                    Original Specification (OEM Grade)
                  </span>
                </div>
              </div>

              {/* Service features included */}
              <div className="pt-2">
                <div className="text-xs font-semibold text-neutral-200 mb-2">
                  Included In Every Repair:
                </div>
                <ul className="text-xs text-neutral-400 space-y-1.5">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Free pre & post 20-point hardware diagnostic test</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Internal dust cleaning & factory water-resistant seal install</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Zero data touch policy: personal files are never accessed</span>
                  </li>
                </ul>
              </div>

              {/* Book repair action */}
              <div className="pt-3">
                <button
                  onClick={() => onBookRepair({
                    brand: currentBrand.name,
                    model: selectedModel,
                    issue: currentService.name,
                    price: currency === 'USD' ? calculatedEstimate.priceUSD : calculatedEstimate.priceINR
                  })}
                  className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <span>Book This Repair ({selectedModel})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-center mt-2 text-[11px] text-neutral-400">
                  Walk in today or reserve your bench slot online
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
