import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Terminal, Shield, Menu, X, Github, Linkedin, Code, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal, onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', path: '/' },
    { name: 'Experience', path: '/experience' },
    { name: 'Projects', path: '/projects' },
    { name: 'Certs 📜', path: '/certifications' },
    { name: 'Labs & Game 🛡️', path: '/labs' },
    { name: 'Notes ✍️', path: '/notes' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-navbar ${
        isScrolled
          ? 'bg-[#060913]/90 backdrop-blur-xl border-b border-cyan-500/15 shadow-xl shadow-black/40 py-2.5'
          : 'bg-[#060913]/50 backdrop-blur-md py-4 border-b border-slate-800/40'
      }`}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-all shadow-sm shadow-cyan-500/20">
            <Shield className="w-5 h-5 transition-transform group-hover:scale-110" />
          </div>
          <div className="flex flex-col">
            <span className="font-navbar font-bold text-sm sm:text-base tracking-tight text-white flex items-center gap-1.5">
              <span>Kshitij Raj</span>
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            </span>
            <span className="text-[10px] text-cyan-400/80 font-mono tracking-wider">
              BACKEND &bull; SECURITY &bull; SYSTEMS
            </span>
          </div>
        </Link>

        {/* Desktop Multi-Page Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1 rounded-full border border-slate-800 shadow-inner">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `px-3.5 py-1.5 text-xs font-semibold tracking-wide rounded-full transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-navbar font-semibold bg-slate-900/90 text-violet-300 border border-slate-700/80 hover:border-violet-500/60 hover:bg-slate-850 transition-all shadow-sm"
            title="View ATS Resume"
          >
            <FileText className="w-3.5 h-3.5 text-violet-400" />
            <span>Resume</span>
          </button>

          <a
            href={PERSONAL_INFO.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-850 border border-transparent hover:border-slate-800 transition-colors"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={PERSONAL_INFO.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-slate-400 hover:text-blue-400 hover:bg-slate-850 border border-transparent hover:border-slate-800 transition-colors"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href={PERSONAL_INFO.socialLinks.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-slate-850 border border-transparent hover:border-slate-800 transition-colors"
            title="LeetCode Profile"
          >
            <Code className="w-4 h-4" />
          </a>

          <Link
            to="/contact"
            className="ml-1 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors shadow-sm shadow-cyan-500/20"
          >
            Let's Talk
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenTerminal}
            className="p-2 rounded-xl bg-slate-850 text-cyan-400 border border-slate-750 text-xs"
            title="Terminal"
          >
            <Terminal className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900 border border-slate-800"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0f1d] border-b border-slate-800 px-4 py-4 space-y-1.5 shadow-2xl animate-fadeIn">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3.5 py-2 text-sm font-medium rounded-xl transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-850'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <div className="pt-3 mt-2 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-violet-300 text-xs font-mono flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </button>
              <a
                href={PERSONAL_INFO.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-850 text-slate-400 hover:text-white"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-850 text-slate-400 hover:text-blue-400"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-1.5 text-xs font-bold bg-cyan-500 text-slate-950 rounded-xl"
            >
              Let's Talk
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
