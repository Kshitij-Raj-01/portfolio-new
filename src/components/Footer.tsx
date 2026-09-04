import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowUp, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sitemapLinks = [
    { name: 'Overview', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'Security Labs', path: '/labs' },
    { name: 'Engineering Notes', path: '/notes' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="border-t border-slate-850 bg-slate-950/90 py-12 relative z-10 text-xs font-mono text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="text-white font-bold text-sm block">Kshitij Raj</span>
              <span className="text-[11px] text-slate-500">Backend, Security &amp; Systems Engineer</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400">Systems Operational &bull; Ready for Opportunities</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Multi-Page Sitemap Navigation */}
        <div className="py-6 border-b border-slate-900 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs">
          {sitemapLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-slate-400 hover:text-cyan-300 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Kshitij Raj. Engineered with React, TypeScript &amp; Tailwind.
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
            <span>&bull;</span>
            <a
              href={PERSONAL_INFO.socialLinks.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              GitHub
            </a>
            <span>&bull;</span>
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
