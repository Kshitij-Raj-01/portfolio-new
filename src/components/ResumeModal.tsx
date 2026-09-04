import React from 'react';
import { X, Printer } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, PROJECTS, RESEARCH_AND_HONORS, CERTIFICATIONS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] rounded-2xl bg-[#0b101b] border border-slate-750 shadow-2xl flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="p-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/30">
              ATS-COMPLIANT RESUME VIEW
            </span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              Kshitij_Raj_Backend_Security_Resume.pdf
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-slate-200 text-xs sm:text-sm leading-relaxed scrollbar-thin bg-slate-950/40 print:p-0 print:bg-white print:text-black">
          {/* Header */}
          <div className="border-b border-slate-800 pb-6 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white print:text-black">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-sm font-semibold text-emerald-400 print:text-gray-800 mt-0.5">
              Backend Developer • Web Security Specialist • Founder @ Follope
            </p>

            <div className="mt-3 flex flex-wrap gap-y-1 gap-x-4 text-xs text-slate-400 font-mono print:text-gray-600">
              <span>{PERSONAL_INFO.phone}</span>
              <span>•</span>
              <span>{PERSONAL_INFO.email}</span>
              <span>•</span>
              <span>github.com/Kshitij-Raj-01</span>
              <span>•</span>
              <span>linkedin.com/in/kshitij-raj-287106292</span>
              <span>•</span>
              <span>Meerut, India</span>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2 border-b border-slate-800 pb-1 print:text-black">
              Education
            </h2>
            <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
              <div>
                <strong className="text-white text-sm print:text-black">
                  {PERSONAL_INFO.education.institution}
                </strong>
                <div className="text-xs text-slate-400">{PERSONAL_INFO.education.degree}</div>
              </div>
              <div className="text-xs text-slate-400 font-mono mt-1 sm:mt-0">
                {PERSONAL_INFO.education.period} | {PERSONAL_INFO.education.location}
              </div>
            </div>
            <div className="text-xs text-slate-400 mt-2">
              <strong className="text-slate-300">Relevant Coursework:</strong> {PERSONAL_INFO.education.coursework.join(', ')}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-3 border-b border-slate-800 pb-1 print:text-black">
              Experience
            </h2>
            <div className="space-y-4">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-1">
                    <div>
                      <strong className="text-white text-sm print:text-black">{exp.role}</strong>
                      <span className="text-emerald-400 font-medium ml-2">| {exp.company}</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      {exp.period} | {exp.location}
                    </span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 text-xs pl-2">
                    {exp.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="leading-relaxed">{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-3 border-b border-slate-800 pb-1 print:text-black">
              Featured Projects
            </h2>
            <div className="space-y-3">
              {PROJECTS.slice(0, 4).map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-center justify-between mb-0.5">
                    <strong className="text-white text-xs print:text-black">
                      {proj.title} <span className="text-slate-400 font-normal">| {proj.subtitle}</span>
                    </strong>
                    <span className="text-[10px] font-mono text-cyan-400">{proj.tags.slice(0, 3).join(', ')}</span>
                  </div>
                  <p className="text-xs text-slate-300 pl-2 leading-relaxed">
                    • {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Research & Hackathons */}
          <div>
            <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2 border-b border-slate-800 pb-1 print:text-black">
              Research &amp; Extracurricular Leadership
            </h2>
            <div className="space-y-2.5 text-xs text-slate-300">
              {RESEARCH_AND_HONORS.map((r) => (
                <div key={r.id}>
                  <strong className="text-white print:text-black">{r.title}</strong> — <span className="text-slate-400">{r.institution} ({r.year})</span>
                  <div className="text-[11px] text-slate-400 pl-2 mt-0.5">{r.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Accreditations */}
          <div>
            <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2 border-b border-slate-800 pb-1 print:text-black">
              Certifications &amp; Accreditations
            </h2>
            <div className="space-y-2 text-xs text-slate-300">
              {CERTIFICATIONS.map((c) => (
                <div key={c.id}>
                  <strong className="text-white print:text-black">{c.title}</strong> — <span className="text-slate-400">{c.issuer}</span>
                  <div className="text-[11px] text-slate-400 pl-2 mt-0.5">• {c.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2 border-b border-slate-800 pb-1 print:text-black">
              Technical Skills Summary
            </h2>
            <div className="space-y-1 text-xs text-slate-300">
              <div><strong className="text-white">Languages:</strong> Python, TypeScript, JavaScript (ES6+), C, C++, PHP, SQL</div>
              <div><strong className="text-white">Backend &amp; Databases:</strong> Django REST, Node.js, Express.js, PostgreSQL, Redis, MongoDB, MySQL, Celery</div>
              <div><strong className="text-white">Security &amp; DevOps:</strong> Post-Quantum Lattice Cryptography, Linux Server Hardening, Docker, CI/CD, AWS S3, Hostinger VPS</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
