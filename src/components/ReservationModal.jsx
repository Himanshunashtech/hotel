import React, { useState } from 'react';
import { X, Calendar, Users, Sparkles, CheckCircle2, Shield, Phone, Mail, Award } from 'lucide-react';

export default function ReservationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    suite: 'The Kohinoor Grand Lakefront Suite',
    checkIn: '2026-12-15',
    checkOut: '2026-12-19',
    guests: '2 Guests',
    name: '',
    email: '',
    phone: '',
    shikaraTransfer: true,
    privateChef: true,
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const refCode = `AM-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;
    setBookingRef(refCode);
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#090D16] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-10 shadow-[0_0_60px_rgba(212,175,55,0.2)] my-8">
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-6 right-6 p-2 rounded-full glass-panel text-white/60 hover:text-white hover:border-[#D4AF37] transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-full border border-[#D4AF37]/50 flex items-center justify-center mx-auto mb-3 bg-[#05070B]">
                <span className="font-cinzel text-xs font-bold text-[#D4AF37]">AM</span>
              </div>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#FBF9F5] tracking-wide mb-1">
                Imperial Sanctuary Reservation
              </h3>
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
                Lake Pichola • Udaipur
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
              {/* Suite Selection */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                  Select Royal Residence
                </label>
                <select
                  value={formData.suite}
                  onChange={(e) => setFormData({ ...formData, suite: e.target.value })}
                  className="w-full bg-[#0E1524] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                >
                  <option value="The Kohinoor Grand Lakefront Suite">The Kohinoor Grand Lakefront Suite ($2,850/night)</option>
                  <option value="The Mewar Courtyard Residence">The Mewar Courtyard Residence ($2,100/night)</option>
                  <option value="The Crystal Heritage Residence">The Crystal Heritage Residence ($2,450/night)</option>
                  <option value="The Jal Mahal Floating Pavilion">The Jal Mahal Floating Pavilion ($3,600/night)</option>
                </select>
              </div>

              {/* Dates & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                    Check-In
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.checkIn}
                    onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                    className="w-full bg-[#0E1524] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                    Check-Out
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.checkOut}
                    onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                    className="w-full bg-[#0E1524] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                    Guests
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full bg-[#0E1524] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  >
                    <option value="1 Guest">1 Guest</option>
                    <option value="2 Guests">2 Guests (Couple / Royal)</option>
                    <option value="3 Guests">3 Guests</option>
                    <option value="4 Guests">4 Guests (Family Sanctuary)</option>
                  </select>
                </div>
              </div>

              {/* Guest Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Lord / Lady / Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0E1524] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37] placeholder:text-white/30"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                    Private Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="concierge@luxury.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#0E1524] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37] placeholder:text-white/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                  Direct Telephone / WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000 / +91 ..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#0E1524] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37] placeholder:text-white/30"
                />
              </div>

              {/* Bespoke Extras Checkboxes */}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.shikaraTransfer}
                    onChange={(e) => setFormData({ ...formData, shikaraTransfer: e.target.checked })}
                    className="accent-[#D4AF37] w-4 h-4 rounded"
                  />
                  <span className="text-white/80">
                    Include Private Royal Shikara Boat Welcome at Lake Pier
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.privateChef}
                    onChange={(e) => setFormData({ ...formData, privateChef: e.target.checked })}
                    className="accent-[#D4AF37] w-4 h-4 rounded"
                  />
                  <span className="text-white/80">
                    Arrange Imperial 5-Course Mewari Banquet on Arrival Evening
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] text-[#070B12] font-cinzel text-xs font-bold tracking-[0.25em] uppercase hover:scale-[1.01] transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)] cursor-pointer"
                >
                  Confirm Royal Booking Request
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[10px] text-white/50 pt-2">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-[#D4AF37]" /> Complete Privacy Guaranteed
                </span>
                <span>•</span>
                <span>24/7 Butler Service</span>
                <span>•</span>
                <span>Zero Cancellation Fee up to 14 Days</span>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Success Screen */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-[#D4AF37]" />
            </div>

            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-2 font-sans">
              RESERVATION REQUEST HONORED
            </span>
            <h3 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#FBF9F5] mb-4">
              Welcome to the Royal Sanctuary
            </h3>

            <p className="font-sans text-xs sm:text-sm text-white/80 max-w-md mx-auto leading-relaxed mb-6 font-light">
              Your royal suite inquiry has been prioritized by the Grand Butler Concierge of Amrit Mahal. A dedicated palace envoy will contact you within two hours.
            </p>

            <div className="glass-panel-gold rounded-2xl p-6 max-w-md mx-auto text-left mb-8 border border-[#D4AF37]/40 space-y-2 text-xs">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Booking Reference:</span>
                <span className="font-mono font-bold text-[#D4AF37]">{bookingRef}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Suite:</span>
                <span className="font-semibold text-white truncate max-w-[200px]">{formData.suite}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Itinerary:</span>
                <span className="text-white">{formData.checkIn} — {formData.checkOut}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Guest:</span>
                <span className="text-white">{formData.name || 'Honored Guest'} ({formData.guests})</span>
              </div>
            </div>

            <button
              onClick={resetAndClose}
              className="px-8 py-3 rounded-full bg-[#D4AF37] hover:bg-[#E5C358] text-[#070B12] font-cinzel text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)] cursor-pointer"
            >
              Return to Palace Experience
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
