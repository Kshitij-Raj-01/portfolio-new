import React from 'react';
import { Award } from 'lucide-react';
import { RESEARCH_AND_HONORS } from '../data/portfolioData';

export const ResearchSection: React.FC = () => {
  return (
    <section id="research" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>RESEARCH &amp; HONORS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Academic Research &amp; Hackathon Awards
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Exploring algorithmic breakthroughs at the intersection of classical mathematical formulations and quantum-resilient security.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RESEARCH_AND_HONORS.map((item) => {
            const isPaper = item.type === 'Research Paper';
            const isHackathon = item.type === 'Hackathon Award';

            return (
              <div
                key={item.id}
                className={`rounded-2xl p-6 glass-card flex flex-col justify-between border transition-all duration-300 ${
                  isPaper
                    ? 'border-cyan-500/30 hover:border-cyan-500/60 bg-gradient-to-b from-slate-900 via-slate-900 to-cyan-950/20'
                    : isHackathon
                    ? 'border-amber-500/30 hover:border-amber-500/60 bg-gradient-to-b from-slate-900 via-slate-900 to-amber-950/20'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[11px] font-mono px-2.5 py-1 rounded-md font-semibold ${
                        isPaper
                          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                          : isHackathon
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {item.type}
                    </span>

                    <span className="text-xs font-mono text-slate-400">{item.year}</span>
                  </div>

                  {/* Title & Organization */}
                  <h3 className="text-lg font-bold text-white mb-1.5 leading-snug">
                    {item.title}
                  </h3>
                  <div className="text-xs font-medium text-slate-300 mb-2">
                    {item.institution}
                  </div>

                  <div className="inline-block text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 mb-4">
                    {item.status}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/80">
                  {item.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
