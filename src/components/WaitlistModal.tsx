import React, { useState } from 'react';
import { X, Rocket, CheckCircle2, Send } from 'lucide-react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Freelance Software Engineer');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [waitlistNumber, setWaitlistNumber] = useState(84);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    
    // Save to local storage for persistence
    try {
      const waitlist = JSON.parse(localStorage.getItem('follope_waitlist') || '[]');
      waitlist.push({ name, email, role, date: new Date().toISOString() });
      localStorage.setItem('follope_waitlist', JSON.stringify(waitlist));
    } catch {
      // Ignore
    }

    setWaitlistNumber(Math.floor(Math.random() * 20) + 75);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[90px] pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
              <Rocket className="w-3.5 h-3.5" />
              <span>FOLLOPE EARLY ACCESS</span>
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight">
              Get Early Beta Access to Follope
            </h3>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Never chase an overdue client invoice again. Join 100+ freelancers and boutique agencies for priority onboarding.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">YOUR NAME</label>
                <input
                  type="text"
                  required
                  placeholder="Kshitij Raj"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  placeholder="kshitij@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">YOUR PRIMARY ROLE</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option>Freelance Software Engineer</option>
                  <option>Boutique Agency / Studio Founder</option>
                  <option>UI/UX &amp; Product Designer</option>
                  <option>Tech Consultant / Contractor</option>
                  <option>Other Independent Builder</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-xl bg-emerald-500 text-slate-950 font-semibold text-sm hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <span>Claim Early Access Spot</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-white">You're on the list, {name}!</h3>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300">
              <div className="text-slate-400 mb-1">YOUR WAITLIST PRIORITY:</div>
              <div className="text-2xl font-bold text-emerald-400">#{waitlistNumber}</div>
              <div className="text-[11px] text-slate-500 mt-2">
                We will email {email} as soon as your batch is invited.
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-slate-800 text-slate-200 text-xs hover:bg-slate-750 font-medium"
            >
              Back to Portfolio
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
