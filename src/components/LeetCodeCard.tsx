import React from 'react';
import { Code, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const LeetCodeCard: React.FC = () => {
  const topics = [
    { name: 'Arrays & Hashing', count: '85+ Solved', status: 'Proficient' },
    { name: 'Trees & Graph BFS/DFS', count: '45+ Solved', status: 'Advanced' },
    { name: 'Dynamic Programming', count: '30+ Solved', status: 'Intermediate' },
    { name: 'Binary Search & Pointers', count: '40+ Solved', status: 'Proficient' },
    { name: 'Number Theory & Cryptographic Math', count: '35+ Solved', status: 'Advanced' },
  ];

  return (
    <div className="my-10 p-6 sm:p-8 rounded-2xl glass-card border border-slate-800 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Code className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Data Structures &amp; Algorithmic Problem Solving
              </h3>
              <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                @kshwebsites
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Continuous focus on algorithmic rigor, computational complexity analysis, and efficient memory utilization.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={PERSONAL_INFO.socialLinks.leetcode}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-semibold hover:bg-amber-500/30 flex items-center gap-1.5 transition-colors"
          >
            <span>LeetCode Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href={PERSONAL_INFO.socialLinks.hackerrank}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 text-xs font-mono font-semibold hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
          >
            <span>HackerRank</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Grid of Topics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {topics.map((t, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-bold text-white mb-1">{t.name}</div>
              <div className="text-xs font-mono text-amber-400">{t.count}</div>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-850 flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>RATING:</span>
              <span className="text-slate-300 font-medium">{t.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
