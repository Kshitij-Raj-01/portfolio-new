import React from 'react';
import { ContactSection } from '../components/ContactSection';
import { Mail, Clock, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactPage: React.FC = () => {
  return (
    <div className="pt-8 pb-20">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
          <Mail className="w-3.5 h-3.5" />
          <span>CONTACT</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
          Get in Touch
        </h1>
        <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          Open to backend engineering roles, server management projects, and technical discussions.
        </p>

        {/* Contact Status HUD */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Current Status</div>
              <div className="text-xs font-bold text-white font-mono">{PERSONAL_INFO.status}</div>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
            <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Response Latency</div>
              <div className="text-xs font-bold text-white font-mono">&lt; 12 Hours</div>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
            <MapPin className="w-4 h-4 text-violet-400 shrink-0" />
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Location</div>
              <div className="text-xs font-bold text-white font-mono">{PERSONAL_INFO.location}</div>
            </div>
          </div>
        </div>
      </div>

      <ContactSection />
    </div>
  );
};
