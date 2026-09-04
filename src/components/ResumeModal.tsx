import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  ExternalLink, 
  Upload, 
  FileText, 
  CheckCircle2, 
  Sparkles,
  Info
} from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, PROJECTS, RESEARCH_AND_HONORS, CERTIFICATIONS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [hasCustomResume, setHasCustomResume] = useState<boolean>(false);
  const [customResumeUrl, setCustomResumeUrl] = useState<string>('/resume.pdf');
  const [customFileName, setCustomFileName] = useState<string>('Kshitij_Raj_Resume.pdf');
  const [activeTab, setActiveTab] = useState<'custom' | 'auto'>('auto');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Probe whether a real resume.pdf exists in /public/resume.pdf
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;

    fetch('/resume.pdf', { method: 'HEAD' })
      .then((res) => {
        if (!isMounted) return;
        if (res.ok) {
          setHasCustomResume(true);
          setCustomResumeUrl('/resume.pdf');
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

  // Handle local PDF upload from user device for immediate session preview & download
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const objectUrl = URL.createObjectURL(file);
      setCustomResumeUrl(objectUrl);
      setCustomFileName(file.name || 'Kshitij_Raj_Resume.pdf');
      setHasCustomResume(true);
      setActiveTab('custom');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="printable-resume-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
    >
      {/* Hidden file input to allow uploading custom resume directly */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="application/pdf"
        className="hidden"
      />

      <div
        id="printable-resume-dialog"
        className="relative w-full max-w-5xl h-[92vh] rounded-2xl bg-[#0b101b] border border-slate-750 shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Top Control Bar (Hidden when printing) */}
        <div className="no-print p-3 sm:p-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          {/* Left: View Tabs */}
          <div className="flex items-center gap-2">
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
                <span>Custom Resume PDF</span>
                {hasCustomResume && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                )}
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
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* When viewing custom PDF resume */}
            {activeTab === 'custom' && hasCustomResume && (
              <>
                <a
                  href={customResumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors border border-slate-700"
                  title="Open resume in new browser tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Tab</span>
                </a>

                <a
                  href={customResumeUrl}
                  download={customFileName}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono transition-colors shadow-sm"
                  title="Download custom PDF resume"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>
              </>
            )}

            {/* When viewing ATS auto-generated resume */}
            {activeTab === 'auto' && (
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-colors shadow-sm"
                title="Print or Save as clean ATS PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save as PDF</span>
              </button>
            )}

            {/* Upload/Replace Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-mono border border-slate-800 transition-colors"
              title="Upload your own custom resume PDF"
            >
              <Upload className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">
                {hasCustomResume ? 'Replace PDF' : 'Upload PDF'}
              </span>
            </button>

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
          {activeTab === 'custom' ? (
            hasCustomResume ? (
              /* Embedded Native PDF Viewer */
              <div className="w-full h-full flex flex-col bg-slate-950">
                <iframe
                  src={`${customResumeUrl}#toolbar=1&navpanes=0`}
                  title="Kshitij Raj Resume PDF"
                  className="w-full h-full flex-1 border-0 bg-slate-950"
                />
              </div>
            ) : (
              /* Guidance State when Custom PDF isn't added yet */
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-slate-950/60">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-lg shadow-emerald-500/10">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-display">
                  No Custom Resume PDF Detected Yet
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
                  To automatically display and download your custom designed PDF resume here:
                  <br />
                  Place your PDF file at{' '}
                  <code className="text-emerald-400 bg-slate-900 px-2 py-0.5 rounded font-mono text-xs">
                    public/resume.pdf
                  </code>{' '}
                  in your project folder.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs font-mono hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload PDF Now</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('auto')}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-cyan-300 font-semibold text-xs font-mono border border-slate-800 hover:bg-slate-850 transition-colors"
                  >
                    <span>View ATS Auto-Generated Resume &rarr;</span>
                  </button>
                </div>
              </div>
            )
          ) : (
            /* ATS-Compliant Auto-Generated Printable Resume Sheet */
            <div className="flex-1 overflow-y-auto p-4 sm:p-10 bg-slate-950/70 scrollbar-thin">
              {/* Notice Banner (hidden in print) */}
              <div className="no-print max-w-3xl mx-auto mb-6 p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-slate-300 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>
                    Auto-generated ATS layout. Click <strong>Print / Save as PDF</strong> to generate a clean, background-free black &amp; white document.
                  </span>
                </div>
                {hasCustomResume && (
                  <button
                    onClick={() => setActiveTab('custom')}
                    className="text-emerald-400 hover:underline font-mono text-[11px] shrink-0 font-semibold"
                  >
                    Switch to Custom PDF &rarr;
                  </button>
                )}
              </div>

              {/* Pure ATS Document Sheet */}
              <div
                id="printable-resume-sheet"
                className="max-w-3xl mx-auto rounded-2xl bg-white text-slate-900 p-8 sm:p-12 shadow-2xl space-y-6 text-xs sm:text-sm leading-relaxed"
              >
                {/* Header */}
                <div className="border-b-2 border-slate-900 pb-4 text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                    {PERSONAL_INFO.name}
                  </h1>
                  <p className="text-xs sm:text-sm font-bold text-slate-700 mt-1 uppercase tracking-wide">
                    {PERSONAL_INFO.title} &bull; Founder of Follope (FinTech SaaS)
                  </p>

                  <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 font-mono">
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
                  <h2 className="text-xs font-mono font-bold text-slate-950 uppercase tracking-wider mb-2.5 border-b border-slate-400 pb-1">
                    Experience
                  </h2>
                  <div className="space-y-4">
                    {EXPERIENCES.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-baseline mb-1">
                          <div>
                            <strong className="text-slate-950 text-xs sm:text-sm">{exp.role}</strong>
                            <span className="text-slate-700 font-semibold ml-1.5">| {exp.company}</span>
                          </div>
                          <span className="text-xs font-mono text-slate-600">
                            {exp.period} | {exp.location}
                          </span>
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-slate-800 text-xs pl-1">
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
                  <h2 className="text-xs font-mono font-bold text-slate-950 uppercase tracking-wider mb-2.5 border-b border-slate-400 pb-1">
                    Selected Projects
                  </h2>
                  <div className="space-y-3">
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
                  <div className="space-y-2 text-xs text-slate-800">
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
                  <div className="space-y-1.5 text-xs text-slate-800">
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

        {/* Modal Bottom Status Bar (Hidden in print) */}
        <div className="no-print p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-2 truncate">
            {hasCustomResume ? (
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Custom PDF Active: {customFileName}</span>
              </span>
            ) : (
              <span className="text-slate-500">
                Auto-generated ATS view &bull; To use custom PDF, add to <code className="text-cyan-400">public/resume.pdf</code>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {hasCustomResume && (
              <a
                href={customResumeUrl}
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
