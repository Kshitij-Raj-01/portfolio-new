import React from 'react';
import { Link } from 'react-router-dom';
import { FolderGit2, FileText, Mail, Terminal, Server, Lock, Cpu, Database } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal, onOpenResume }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[250px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/40 text-emerald-400 text-xs font-mono mb-8 shadow-inner shadow-emerald-500/10">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold uppercase tracking-wide">AVAILABLE FOR HIRE &bull; BACKEND &amp; WEB SECURITY</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.15] font-display">
            Backend Developer &amp;{' '}
            <span className="gradient-text-cyan">Web Security Engineer</span>.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Hi, I'm <strong className="text-white font-semibold">Kshitij Raj</strong>. Creator of <strong className="text-emerald-400 font-semibold">Follope</strong> (FinTech SaaS), backend &amp; server security engineer at <strong className="text-white font-semibold">Robotic Sir</strong>, and student intern implementing Post-Quantum Cryptography (Kyber on ESP32) at <strong className="text-white font-semibold">DRDO SAG</strong>.
          </p>

          {/* Recruiter-Friendly Primary CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-14">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5"
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Explore Projects &amp; Code</span>
            </Link>

            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 text-slate-100 border border-slate-700 font-semibold text-sm hover:bg-slate-750 hover:text-white transition-all hover:-translate-y-0.5 shadow-md"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>View Resume</span>
            </button>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-semibold hover:bg-cyan-500/20 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Get in Touch</span>
            </Link>

            <button
              onClick={onOpenTerminal}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/90 text-slate-400 border border-slate-800 font-mono text-xs hover:border-slate-700 hover:text-white transition-all"
              title="Launch interactive bash terminal"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>CLI Console</span>
            </button>
          </div>

          {/* Quick Metrics HUD */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
            {PERSONAL_INFO.stats.map((stat, i) => (
              <div
                key={i}
                className="glass-card p-4 rounded-xl text-center border border-slate-800/80 hover:border-slate-700 transition-colors"
              >
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Engineering Highlights Ribbon */}
        <div className="mt-16 pt-8 border-t border-slate-800/60 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-400" />
            <span>Node.js &bull; Express &bull; Django</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-cyan-400" />
            <span>Post-Quantum Kyber on ESP32 (DRDO SAG)</span>
          </div>
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-400" />
            <span>PostgreSQL &bull; Redis &bull; MongoDB</span>
          </div>
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-amber-400" />
            <span>Linux VPS &bull; Server Hardening &bull; Docker</span>
          </div>
        </div>
      </div>
    </section>
  );
};
