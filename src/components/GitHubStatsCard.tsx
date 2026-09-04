import React from 'react';
import { Github, ExternalLink, FolderGit2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const GitHubStatsCard: React.FC = () => {
  const languages = [
    { name: 'TypeScript', percentage: '41%', color: 'bg-blue-500' },
    { name: 'Python', percentage: '28%', color: 'bg-emerald-400' },
    { name: 'JavaScript', percentage: '18%', color: 'bg-amber-400' },
    { name: 'C / C++', percentage: '13%', color: 'bg-purple-500' },
  ];

  const highlightedRepos = [
    {
      name: 'School-Management-ERP',
      desc: 'Multi-role ERP system with Express.js, TypeScript, MySQL & Three.js.',
      lang: 'TypeScript',
      langColor: 'bg-blue-500'
    },
    {
      name: 'WasteEx-Marketplace',
      desc: 'B2B industrial circular marketplace with smart contract escrow & Socket.IO.',
      lang: 'TypeScript',
      langColor: 'bg-blue-500'
    },
    {
      name: 'Blog-Loom-CMS',
      desc: 'Full-stack CMS with MERN stack, AWS S3 image hosting & JWT authentication.',
      lang: 'JavaScript',
      langColor: 'bg-amber-400'
    },
    {
      name: 'PQC-Lattice-Embedded',
      desc: 'Lattice-based cryptographic primitives adapted for Arduino microcontrollers (<1MB SRAM).',
      lang: 'C++',
      langColor: 'bg-purple-500'
    },
  ];

  return (
    <div className="mt-6 mb-12 p-6 sm:p-8 rounded-2xl glass-card border border-slate-800 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-blue-500/5 blur-[120px] pointer-events-none" />

      {/* Top Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-800/80">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-white shrink-0 shadow-lg shadow-black/40">
            <Github className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                GitHub Open Source &amp; Code Activity
              </h3>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30 font-semibold">
                @Kshitij-Raj-01
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Production repositories, open source contributions, and cryptographic research libraries.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={PERSONAL_INFO.socialLinks.github}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/40 text-slate-200 hover:text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <span>View GitHub Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Language Stack Bar */}
      <div className="mb-8 p-4 rounded-xl bg-slate-950/70 border border-slate-850">
        <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-3">
          <span className="font-semibold text-slate-300">MOST USED LANGUAGES</span>
          <span className="text-cyan-400">Public Repositories</span>
        </div>

        {/* Progress Bar */}
        <div className="h-3 rounded-full bg-slate-900 flex overflow-hidden gap-0.5 mb-3">
          <div className="bg-blue-500 h-full" style={{ width: '41%' }} title="TypeScript 41%" />
          <div className="bg-emerald-400 h-full" style={{ width: '28%' }} title="Python 28%" />
          <div className="bg-amber-400 h-full" style={{ width: '18%' }} title="JavaScript 18%" />
          <div className="bg-purple-500 h-full" style={{ width: '13%' }} title="C/C++ 13%" />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-xs font-mono">
          {languages.map((lang, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${lang.color}`} />
              <span className="text-slate-300">{lang.name}</span>
              <span className="text-slate-500">{lang.percentage}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Highlighted Repositories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {highlightedRepos.map((repo, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-1.5 text-white font-mono text-xs font-bold mb-1.5">
                <FolderGit2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">{repo.name}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2 mb-3">
                {repo.desc}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-850 flex items-center justify-between text-[10px] font-mono">
              <div className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${repo.langColor}`} />
                <span className="text-slate-300">{repo.lang}</span>
              </div>
              <a
                href={`https://github.com/Kshitij-Raj-01/${repo.name}`}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-cyan-400 flex items-center gap-1"
              >
                <span>Code</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
