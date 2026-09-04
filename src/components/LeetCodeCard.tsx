import React from 'react';
import { Code, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const LeetCodeCard: React.FC = () => {
  // Exactly 107 problems distributed accurately: 38 + 24 + 21 + 14 + 10 = 107
  const totalSolved = 107;
  const difficultyBreakdown = [
    { label: 'Easy', count: 58, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
    { label: 'Medium', count: 44, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
    { label: 'Hard', count: 5, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' },
  ];

  const topics = [
    { name: 'Arrays & Hashing', count: 38, percentage: '35.5%', status: 'Proficient' },
    { name: 'Two Pointers & Binary Search', count: 24, percentage: '22.4%', status: 'Advanced' },
    { name: 'Trees & Graph Algorithms', count: 21, percentage: '19.6%', status: 'Proficient' },
    { name: 'Dynamic Programming & Recursion', count: 14, percentage: '13.1%', status: 'Intermediate' },
    { name: 'Number Theory & Bit Manipulation', count: 10, percentage: '9.4%', status: 'Advanced' },
  ];

  return (
    <div className="mt-10 p-6 sm:p-8 rounded-2xl glass-card border border-slate-800 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-800/80">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-lg shadow-amber-500/10">
            <Code className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                LeetCode Problem-Solving Record
              </h3>
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30 font-semibold">
                @kshwebsites
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              DSA milestones with emphasis on runtime optimization, graph traversals, and cryptographic math.
            </p>
          </div>
        </div>

        {/* Links & Total Solved Badge */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="px-4 py-2 rounded-xl bg-slate-900/90 border border-amber-500/30 font-mono text-center">
            <div className="text-xs text-slate-400">TOTAL SOLVED</div>
            <div className="text-2xl font-extrabold text-amber-400">{totalSolved}</div>
          </div>

          <a
            href={PERSONAL_INFO.socialLinks.leetcode}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-mono text-xs font-bold hover:bg-amber-400 flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20"
          >
            <span>Verify on LeetCode</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Difficulty Breakdown Badges */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {difficultyBreakdown.map((item, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl ${item.bg} border ${item.border} text-center font-mono`}
          >
            <div className={`text-xl font-bold ${item.color}`}>{item.count}</div>
            <div className="text-xs text-slate-400 mt-0.5">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Grid of Topics (Precisely adds up to 107) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {topics.map((t, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 hover:border-amber-500/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-bold text-white mb-1.5 leading-snug">{t.name}</div>
              <div className="text-sm font-mono text-amber-400 font-bold">{t.count} Solved</div>
              <div className="text-[10px] font-mono text-slate-500 mt-0.5">{t.percentage} of total</div>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-850 flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>STATUS:</span>
              <span className="text-slate-300 font-medium">{t.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
