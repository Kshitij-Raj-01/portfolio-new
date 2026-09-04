import React, { useState } from 'react';
import { Award, CheckCircle2, ExternalLink, ShieldCheck, Eye, X, Download, FileText } from 'lucide-react';
import { CERTIFICATIONS, Certification } from '../data/portfolioData';

export const CertificationsSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [viewTab, setViewTab] = useState<'pdf' | 'details'>('pdf');

  const handleOpenCert = (cert: Certification) => {
    setSelectedCert(cert);
    setViewTab(cert.id === 'nptel-cs' ? 'details' : 'pdf');
  };

  return (
    <section id="certifications" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ACCREDITATIONS &bull; INDUSTRY &amp; ACADEMIC</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Verified Certifications &amp; Accreditations
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl">
              Professional credentials validating cybersecurity defense, full-stack MERN architecture, and premier IIT/NPTEL computer science foundations.
            </p>
          </div>

          <div className="mt-4 md:mt-0 font-mono text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>3 Verified Credentials</span>
            </span>
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert) => {
            const isCyber = cert.id === 'google-cybersecurity';
            const isMern = cert.id === 'pregrad-mern';
            const hasPdf = cert.id !== 'nptel-cs';

            return (
              <div
                key={cert.id}
                className={`rounded-2xl p-6 sm:p-7 glass-card border transition-all duration-300 flex flex-col justify-between group ${
                  isCyber
                    ? 'hover:border-cyan-500/50 bg-gradient-to-b from-slate-900 via-slate-900 to-cyan-950/20 shadow-lg shadow-cyan-950/10'
                    : isMern
                    ? 'hover:border-emerald-500/50 bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950/20 shadow-lg shadow-emerald-950/10'
                    : 'hover:border-violet-500/50 bg-gradient-to-b from-slate-900 via-slate-900 to-violet-950/20 shadow-lg shadow-violet-950/10'
                }`}
              >
                <div>
                  {/* Top Bar: Issuer Type & Verified Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-md border ${
                        isCyber
                          ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                          : isMern
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                          : 'bg-violet-500/10 text-violet-300 border-violet-500/30'
                      }`}
                    >
                      {cert.badge}
                    </span>

                    <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  </div>

                  {/* Title & Issuer */}
                  <h3 className="text-xl font-bold text-white mb-2 leading-snug group-hover:text-cyan-300 transition-colors">
                    {cert.title}
                  </h3>
                  <div className="text-xs font-semibold text-slate-300 mb-4 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{cert.issuer}</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                    {cert.description}
                  </p>
                </div>

                <div>
                  {/* Validated Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-5 pt-4 border-t border-slate-800/80">
                    {cert.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/80 text-slate-300 border border-slate-800"
                      >
                        #{s}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleOpenCert(cert)}
                      className="w-full py-2.5 px-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{hasPdf ? 'View PDF' : 'View Details'}</span>
                    </button>

                    {hasPdf && cert.certificateFile ? (
                      <a
                        href={cert.certificateFile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-mono flex items-center justify-center gap-1.5 transition-all"
                      >
                        <span>Open PDF</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : cert.verifyUrl ? (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-mono flex items-center justify-center gap-1.5 transition-all"
                      >
                        <span>Directory</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certificate Viewer Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl h-[90vh] rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Top Bar */}
            <div className="p-3 sm:p-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
              {/* Title & Badge */}
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-white font-bold truncate">{selectedCert.title}</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400">
                  {selectedCert.issuer}
                </span>
              </div>

              {/* Controls: Tab Switcher & Actions */}
              <div className="flex items-center gap-2">
                {/* View Tabs */}
                <div className="flex rounded-lg bg-slate-900 p-0.5 border border-slate-800">
                  <button
                    onClick={() => setViewTab('pdf')}
                    className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                      viewTab === 'pdf'
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    PDF Document
                  </button>
                  <button
                    onClick={() => setViewTab('details')}
                    className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                      viewTab === 'details'
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Credential Info
                  </button>
                </div>

                {/* Open in New Tab Button */}
                {selectedCert.certificateFile && selectedCert.id !== 'nptel-cs' && (
                  <a
                    href={selectedCert.certificateFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors border border-slate-700"
                    title="Open PDF in new browser tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Tab</span>
                  </a>
                )}

                {/* Download Button */}
                {selectedCert.certificateFile && selectedCert.id !== 'nptel-cs' && (
                  <a
                    href={selectedCert.certificateFile}
                    download
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono transition-colors"
                    title="Download certificate PDF file"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Download</span>
                  </a>
                )}

                {/* Close Button */}
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 min-h-0 bg-slate-950 relative overflow-hidden flex flex-col">
              {viewTab === 'pdf' ? (
                selectedCert.id === 'nptel-cs' ? (
                  /* Notice when NPTEL PDF is yet to be added */
                  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-4">
                      <FileText className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">NPTEL Certificate Document</h3>
                    <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
                      To display the real NPTEL certificate PDF here, place your file at{' '}
                      <code className="text-cyan-400 bg-slate-900 px-2 py-0.5 rounded text-xs">
                        public/certificates/nptel-cs.pdf
                      </code>
                      .
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <button
                        onClick={() => setViewTab('details')}
                        className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 font-mono text-xs font-semibold transition-all"
                      >
                        View Verified Credential Details &rarr;
                      </button>
                      {selectedCert.verifyUrl && (
                        <a
                          href={selectedCert.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-xs flex items-center gap-1.5 transition-all"
                        >
                          <span>Visit NPTEL Portal</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Native PDF Embed Viewport */
                  <div className="w-full h-full flex flex-col">
                    <iframe
                      src={`${selectedCert.certificateFile}#toolbar=1&navpanes=0`}
                      title={selectedCert.title}
                      className="w-full h-full flex-1 border-0 bg-slate-950"
                    />
                  </div>
                )
              ) : (
                /* Credential Info / Rigor View */
                <div className="flex-1 overflow-y-auto p-6 sm:p-10 flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-[#070c18] to-slate-950">
                  <div className="w-full max-w-2xl rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/30 p-6 sm:p-10 shadow-2xl relative text-center">
                    <div className="w-14 h-14 mx-auto rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5 shadow-lg shadow-cyan-500/10">
                      <Award className="w-7 h-7" />
                    </div>

                    <div className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest mb-1">
                      {selectedCert.badge}
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-1">
                      {selectedCert.title}
                    </h2>

                    <div className="text-xs text-slate-400 font-mono mb-6">
                      Issued by: <strong className="text-slate-200">{selectedCert.issuer}</strong>
                    </div>

                    <div className="my-5 py-4 border-y border-slate-800">
                      <div className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1">
                        RECIPIENT &amp; CANDIDATE
                      </div>
                      <div className="text-2xl font-black text-white font-display">
                        Kshitij Raj
                      </div>
                      <div className="text-xs text-cyan-400 font-mono mt-1">
                        Backend &bull; Systems &bull; Post-Quantum Cryptography &bull; Web Security
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto mb-6">
                      {selectedCert.description}
                    </p>

                    {/* Validated Skills */}
                    <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                      {selectedCert.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-md bg-slate-950 border border-cyan-500/20 text-[11px] font-mono text-cyan-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Credential ID & Authenticity */}
                    <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
                      <div className="text-left">
                        <span className="text-slate-500 block text-[10px]">CREDENTIAL ID:</span>
                        <span className="text-cyan-400 font-semibold">{selectedCert.credentialId}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/30">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="font-bold">VERIFIED AUTHENTIC</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Status Bar */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="truncate">
                File: <code className="text-cyan-400">{selectedCert.certificateFile}</code>
              </span>
              <div className="flex items-center gap-2 shrink-0">
                {selectedCert.certificateFile && selectedCert.id !== 'nptel-cs' && (
                  <a
                    href={selectedCert.certificateFile}
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
      )}
    </section>
  );
};
