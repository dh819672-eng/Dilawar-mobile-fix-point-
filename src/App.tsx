/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PriceEstimator } from './components/PriceEstimator';
import { RepairTracker } from './components/RepairTracker';
import { ServicesSection } from './components/ServicesSection';
import { DiagnosticWizard } from './components/DiagnosticWizard';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TestimonialsSection } from './components/TestimonialsSection';
import { StoreLocationAndContact } from './components/StoreLocationAndContact';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { AdminDashboard } from './components/AdminDashboard';
import { INITIAL_TICKETS, RepairTicket } from './data/repairData';

export default function App() {
  const [tickets, setTickets] = useState<RepairTicket[]>(() => {
    try {
      const saved = localStorage.getItem('dmf_repair_tickets');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_TICKETS;
  });

  const [activeTrackTicketId, setActiveTrackTicketId] = useState<string>('DMF-8492');
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [bookingPrefill, setBookingPrefill] = useState<{
    brand?: string;
    model?: string;
    issue?: string;
  } | undefined>(undefined);

  // Editable shop contact details
  const [shopPhone, setShopPhone] = useState<string>(() => {
    return localStorage.getItem('dmf_shop_phone') || '+91 98352 57170';
  });

  const [shopAddress, setShopAddress] = useState<string>(() => {
    return localStorage.getItem('dmf_shop_address') || 'Labha, Balu Tola Chowk, Babhni, Pranpur, Katihar, Bihar - 854116';
  });

  // Sync tickets with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dmf_repair_tickets', JSON.stringify(tickets));
    } catch {
      // ignore
    }
  }, [tickets]);

  const handleOpenBooking = (prefill?: { brand?: string; model?: string; issue?: string }) => {
    setBookingPrefill(prefill);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setBookingPrefill(undefined);
  };

  const handleTicketCreated = (newTicket: RepairTicket) => {
    setTickets(prev => [newTicket, ...prev]);
    setActiveTrackTicketId(newTicket.ticketId);
  };

  const handleUpdateTicket = (updated: RepairTicket) => {
    setTickets(prev => prev.map(t => t.ticketId === updated.ticketId ? updated : t));
  };

  const handleDeleteTicket = (ticketId: string) => {
    setTickets(prev => prev.filter(t => t.ticketId !== ticketId));
  };

  const handleUpdateShopPhone = (newPhone: string) => {
    setShopPhone(newPhone);
    localStorage.setItem('dmf_shop_phone', newPhone);
  };

  const handleUpdateShopAddress = (newAddress: string) => {
    setShopAddress(newAddress);
    localStorage.setItem('dmf_shop_address', newAddress);
  };

  const handleTrackTicket = (ticketId: string) => {
    setActiveTrackTicketId(ticketId);
    const element = document.getElementById('track');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookFromEstimator = (details: { brand: string; model: string; issue: string; price: number }) => {
    handleOpenBooking({
      brand: details.brand,
      model: details.model,
      issue: details.issue
    });
  };

  const handleBookFromDiagnostics = (category: string, symptomDesc: string) => {
    handleOpenBooking({
      issue: `Diagnostics: ${symptomDesc.slice(0, 40)}...`
    });
  };

  const handleSelectServiceForBooking = (serviceName: string) => {
    handleOpenBooking({
      issue: serviceName
    });
  };

  const handleExploreEstimator = () => {
    const elem = document.getElementById('estimator');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-300">
      {/* Top Bar Navigation */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        onOpenTracker={() => handleTrackTicket('DMF-8492')}
        onOpenAdmin={() => setIsAdminOpen(true)}
        shopPhone={shopPhone}
        shopAddress={shopAddress}
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExploreEstimator={handleExploreEstimator}
        />

        {/* Instant Price & Turnaround Estimator */}
        <PriceEstimator
          onBookRepair={handleBookFromEstimator}
        />

        {/* Live Repair Status Tracker */}
        <RepairTracker
          tickets={tickets}
          activeTicketId={activeTrackTicketId}
        />

        {/* Specialized Services Catalog */}
        <ServicesSection
          onSelectServiceForBooking={handleSelectServiceForBooking}
        />

        {/* Diagnostic Symptom Wizard */}
        <DiagnosticWizard
          onBookDiagnosis={handleBookFromDiagnostics}
        />

        {/* Workshop Standards & Guarantee */}
        <WhyChooseUs />

        {/* Customer Testimonials & Verified Repairs */}
        <TestimonialsSection />

        {/* Storefront Location, Hours & Direct Contact */}
        <StoreLocationAndContact
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        shopPhone={shopPhone}
        shopAddress={shopAddress}
      />

      {/* Booking / Appointment Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        prefill={bookingPrefill}
        onTicketCreated={handleTicketCreated}
        onTrackTicket={handleTrackTicket}
      />

      {/* Dukaan Owner Admin Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        tickets={tickets}
        onUpdateTicket={handleUpdateTicket}
        onCreateTicket={handleTicketCreated}
        onDeleteTicket={handleDeleteTicket}
        shopPhone={shopPhone}
        onUpdateShopPhone={handleUpdateShopPhone}
        shopAddress={shopAddress}
        onUpdateShopAddress={handleUpdateShopAddress}
      />
    </div>
  );
}
