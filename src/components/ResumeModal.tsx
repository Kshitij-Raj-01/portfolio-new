import React, { useState, useEffect } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  ExternalLink, 
  FileText, 
  Sparkles
} from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, PROJECTS, RESEARCH_AND_HONORS, CERTIFICATIONS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [hasCustomResume, setHasCustomResume] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'custom' | 'auto'>('auto');

  // Probe whether a real resume.pdf exists in /public/resume.pdf
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;

    fetch('/resume.pdf', { method: 'HEAD' })
      .then((res) => {
        if (!isMounted) return;
        if (res.ok) {
          setHasCustomResume(true);
          setActiveTab('custom');
        } else {
          setHasCustomResume(false);
          setActiveTab('auto');
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setHasCustomResume(false);
        setActiveTab('auto');
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Isolated, clean print generation (Zero background leakage, no dark modal borders)
  const handlePrint = () => {
    const resumeElement = document.getElementById('printable-resume-sheet');
    if (!resumeElement) return;

    // Create or reuse hidden printing iframe
    let printFrame = document.getElementById('resume-isolated-frame') as HTMLIFrameElement | null;
    if (!printFrame) {
      printFrame = document.createElement('iframe');
      printFrame.id = 'resume-isolated-frame';
      printFrame.style.position = 'fixed';
      printFrame.style.right = '0';
      printFrame.style.bottom = '0';
      printFrame.style.width = '0';
      printFrame.style.height = '0';
      printFrame.style.border = '0';
      document.body.appendChild(printFrame);
    }

    const frameDoc = printFrame.contentDocument || printFrame.contentWindow?.document;
    if (!frameDoc) {
      window.print();
      return;
    }

    frameDoc.open();
    frameDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            @page {
              margin: 12mm 15mm;
              size: auto;
            }
            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
              color: #111827;
              background: #ffffff;
              font-size: 10pt;
              line-height: 1.45;
              padding: 5px;
            }
            h1 {
              font-size: 21pt;
              color: #000000;
              font-weight: 800;
              letter-spacing: -0.02em;
              margin-bottom: 2px;
            }
            .header-subtitle {
              font-size: 9.5pt;
              font-weight: 700;
              color: #374151;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-top: 2px;
            }
            .contact-row {
              font-size: 8.5pt;
              color: #4b5563;
              font-family: monospace;
              margin-top: 5px;
              padding-bottom: 8px;
              border-bottom: 1.5px solid #111827;
            }
            .contact-row a {
              color: #111827;
              text-decoration: none;
            }
            h2 {
              font-size: 10pt;
              font-weight: 700;
              color: #111827;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              border-bottom: 1px solid #6b7280;
              padding-bottom: 2px;
              margin-top: 10px;
              margin-bottom: 5px;
            }
            ul {
              padding-left: 15px;
              margin-top: 2px;
            }
            li {
              font-size: 8.8pt;
              color: #1f2937;
              margin-bottom: 2px;
              line-height: 1.35;
            }
            p, div, span {
              color: #1f2937;
            }
            .no-print {
              display: none !important;
            }
          </style>
        </head>
        <body>
          ${resumeElement.innerHTML}
        </body>
      </html>
    `);
    frameDoc.close();

    setTimeout(() => {
      printFrame?.contentWindow?.focus();
      printFrame?.contentWindow?.print();
    }, 250);
  };

  return (
    <div
      id="printable-resume-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
    >
      <div
        id="printable-resume-dialog"
        className="relative w-full max-w-5xl h-[92vh] rounded-2xl bg-[#0b101b] border border-slate-750 shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Top Control Bar */}
        <div className="no-print p-3 sm:p-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          {/* Left: View Tabs (If custom resume is present) or Badge */}
          <div className="flex items-center gap-2">
            {hasCustomResume ? (
              <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800">
                <button
                  onClick={() => setActiveTab('custom')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                    activeTab === 'custom'
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Resume PDF</span>
                </button>

                <button
                  onClick={() => setActiveTab('auto')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                    activeTab === 'auto'
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ATS Clean View</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/30">
                  ATS RESUME VIEW
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                  Kshitij_Raj_Resume
                </span>
              </div>
            )}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            {/* Custom PDF Controls */}
            {hasCustomResume && activeTab === 'custom' && (
              <>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors border border-slate-700"
                  title="Open resume in new browser tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Tab</span>
                </a>

                <a
                  href="/resume.pdf"
                  download="Kshitij_Raj_Resume.pdf"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono transition-colors shadow-sm"
                  title="Download custom PDF resume"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>
              </>
            )}

            {/* ATS Auto View Print Control */}
            {(!hasCustomResume || activeTab === 'auto') && (
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-colors shadow-sm"
                title="Print or Save as clean ATS PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save as PDF</span>
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 min-h-0 bg-slate-950 flex flex-col overflow-hidden relative">
          {hasCustomResume && activeTab === 'custom' ? (
            /* Embedded Native PDF Viewer */
            <div className="w-full h-full flex flex-col bg-slate-950">
              <iframe
                src="/resume.pdf#toolbar=1&navpanes=0"
                title="Kshitij Raj Resume PDF"
                className="w-full h-full flex-1 border-0 bg-slate-950"
              />
            </div>
          ) : (
            /* ATS-Compliant Clean Resume Sheet */
            <div className="flex-1 overflow-y-auto p-4 sm:p-10 bg-slate-950/70 scrollbar-thin">
              {/* Pure ATS Document Sheet */}
              <div
                id="printable-resume-sheet"
                className="max-w-3xl mx-auto rounded-2xl bg-white text-slate-900 p-8 sm:p-12 shadow-2xl space-y-5 text-xs sm:text-sm leading-relaxed"
              >
                {/* Header */}
                <div className="border-b-2 border-slate-900 pb-3 text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                    {PERSONAL_INFO.name}
                  </h1>
                  <p className="header-subtitle text-xs sm:text-sm font-bold text-slate-700 mt-0.5 uppercase tracking-wide">
                    {PERSONAL_INFO.title} &bull; Creator of Follope (FinTech SaaS)
                  </p>

                  <div className="contact-row mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 font-mono">
                    <span>{PERSONAL_INFO.phone}</span>
                    <span>&bull;</span>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-slate-900 font-medium">
                      {PERSONAL_INFO.email}
                    </a>
                    <span>&bull;</span>
                    <a href={PERSONAL_INFO.socialLinks.github} target="_blank" rel="noreferrer" className="text-slate-900 font-medium">
                      github.com/Kshitij-Raj-01
                    </a>
                    <span>&bull;</span>
                    <a href={PERSONAL_INFO.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-slate-900 font-medium">
                      linkedin.com/in/kshitij-raj
                    </a>
                    <span>&bull;</span>
                    <span>{PERSONAL_INFO.location}</span>
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h2 className="text-xs font-mono font-bold text-slate-950 uppercase tracking-wider mb-2 border-b border-slate-400 pb-1">
                    Education
                  </h2>
                  <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-baseline">
                    <div>
                      <strong className="text-slate-950 text-sm">
                        {PERSONAL_INFO.education.institution}
                      </strong>
                      <div className="text-xs text-slate-700 font-medium">{PERSONAL_INFO.education.degree}</div>
                    </div>
                    <div className="text-xs text-slate-600 font-mono mt-0.5 sm:mt-0">
                      {PERSONAL_INFO.education.period} | {PERSONAL_INFO.education.location}
                    </div>
                  </div>
                  <div className="text-xs text-slate-700 mt-1.5">
                    <strong className="text-slate-900">Relevant Coursework:</strong> {PERSONAL_INFO.education.coursework.join(', ')}
                  </div>
                </div>

                {/* Work Experience */}
                <div>
                  <h2 className="text-xs font-mono font-bold text-slate-950 uppercase tracking-wider mb-2 border-b border-slate-400 pb-1">
                    Experience
                  </h2>
                  <div className="space-y-3.5">
                    {EXPERIENCES.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-baseline mb-0.5">
                          <div>
                            <strong className="text-slate-950 text-xs sm:text-sm">{exp.role}</strong>
                            <span className="text-slate-700 font-semibold ml-1.5">| {exp.company}</span>
                          </div>
                          <span className="text-xs font-mono text-slate-600">
                            {exp.period} | {exp.location}
                          </span>
                        </div>
                        <ul className="list-disc list-inside space-y-0.5 text-slate-800 text-xs pl-1">
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
                  <h2 className="text-xs font-mono font-bold text-slate-950 uppercase tracking-wider mb-2 border-b border-slate-400 pb-1">
                    Selected Projects
                  </h2>
                  <div className="space-y-2.5">
                    {PROJECTS.slice(0, 4).map((proj) => (
                      <div key={proj.id}>
                        <div className="flex items-baseline justify-between mb-0.5">
                          <strong className="text-slate-950 text-xs sm:text-sm">
                            {proj.title} <span className="text-slate-600 font-normal">| {proj.subtitle}</span>
                          </strong>
                          <span className="text-[10px] font-mono text-slate-600 font-bold">{proj.tags.slice(0, 4).join(', ')}</span>
                        </div>
                        <p className="text-xs text-slate-700 pl-1 leading-relaxed">
                          &bull; {proj.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Research & Leadership */}
                <div>
                  <h2 className="text-xs font-mono font-bold text-slate-950 uppercase tracking-wider mb-2 border-b border-slate-400 pb-1">
                    Research &amp; Extracurricular Leadership
                  </h2>
                  <div className="space-y-1.5 text-xs text-slate-800">
                    {RESEARCH_AND_HONORS.map((r) => (
                      <div key={r.id}>
                        <strong className="text-slate-950">{r.title}</strong> &bull; <span className="text-slate-600">{r.institution} ({r.year})</span>
                        <div className="text-[11px] text-slate-700 pl-1 mt-0.5">&bull; {r.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h2 className="text-xs font-mono font-bold text-slate-950 uppercase tracking-wider mb-2 border-b border-slate-400 pb-1">
                    Verified Certifications &amp; Accreditations
                  </h2>
                  <div className="space-y-1 text-xs text-slate-800">
                    {CERTIFICATIONS.map((c) => (
                      <div key={c.id}>
                        <strong className="text-slate-950">{c.title}</strong> &bull; <span className="text-slate-600">{c.issuer}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Skills */}
                <div>
                  <h2 className="text-xs font-mono font-bold text-slate-950 uppercase tracking-wider mb-2 border-b border-slate-400 pb-1">
                    Technical Skills Summary
                  </h2>
                  <div className="space-y-1 text-xs text-slate-800">
                    <div><strong className="text-slate-950">Languages:</strong> Python, TypeScript, JavaScript (ES6+), C, C++, SQL, Bash</div>
                    <div><strong className="text-slate-950">Frameworks &amp; Backend:</strong> Django REST Framework, Node.js, Express.js, Celery, Redis, React.js</div>
                    <div><strong className="text-slate-950">Databases:</strong> PostgreSQL, MongoDB, MySQL, Redis Caching</div>
                    <div><strong className="text-slate-950">Security &amp; DevOps:</strong> Post-Quantum Lattice Cryptography, Linux VPS Hardening, Docker, HMAC Signatures, Webhooks, CI/CD, Nginx</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Status Bar */}
        <div className="no-print p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-2 truncate">
            {hasCustomResume ? (
              <span className="text-emerald-400">Custom PDF active: /resume.pdf</span>
            ) : (
              <span className="text-slate-500">
                Auto-generated ATS view &bull; Click "Print / Save as PDF" to export
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {hasCustomResume && (
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>Full Screen</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
