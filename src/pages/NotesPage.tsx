import React from 'react';
import { EngineeringLog } from '../components/EngineeringLog';
import { BookOpen } from 'lucide-react';

export const NotesPage: React.FC = () => {
  return (
    <div className="pt-8 pb-20">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>TECHNICAL WRITE-UPS &bull; ARCHITECTURAL LOGS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
          Engineering Notes &amp; Systems Logs
        </h1>
        <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          Deep-dive technical notes, code snippets, post-mortems, and algorithmic analyses from building production backends, adapting cryptographic algorithms to resource-constrained hardware, and distributed queue engineering.
        </p>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Focus Areas</div>
            <div className="text-base font-bold text-emerald-400 font-display mt-0.5">Post-Quantum &bull; Systems &bull; Queues</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Audience</div>
            <div className="text-base font-bold text-cyan-400 font-display mt-0.5">Engineers &bull; Researchers &bull; Founders</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Format</div>
            <div className="text-base font-bold text-violet-400 font-display mt-0.5">Code Snippets &bull; Modular Deep Dives</div>
          </div>
        </div>
      </div>

      {/* Engineering Log Component */}
      <EngineeringLog />
    </div>
  );
};
