import React from 'react';
import { Shield, ArrowUp, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-850 bg-slate-950/80 py-12 relative z-10 text-xs font-mono text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="text-white font-bold text-sm block">Kshitij Raj</span>
              <span className="text-[11px] text-slate-500">Backend, Security &amp; Systems Engineer</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400">Systems Operational • Ready for Opportunities</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Kshitij Raj. All rights reserved.
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href={PERSONAL_INFO.socialLinks.oldPortfolio}
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300 transition-colors flex items-center gap-1"
            >
              <span>Archived Portfolio</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <a
              href={PERSONAL_INFO.socialLinks.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              GitHub
            </a>
            <span>•</span>
            <a
              href={PERSONAL_INFO.socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
