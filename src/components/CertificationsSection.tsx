import React, { useState } from 'react';
import { Award, CheckCircle2, ExternalLink, ShieldCheck, Eye, X, Download, FileText } from 'lucide-react';
import { CERTIFICATIONS, Certification } from '../data/portfolioData';

export const CertificationsSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

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

                  {/* Action Buttons: View Preview Modal + Issuer Link */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="w-full py-2 px-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview Doc</span>
                    </button>

                    {cert.verifyUrl && (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 px-3 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-mono flex items-center justify-center gap-1.5 transition-all"
                      >
                        <span>Directory</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certificate Viewer / Document Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl max-h-[92vh] rounded-2xl bg-slate-900 border border-slate-750 shadow-2xl flex flex-col overflow-hidden">
            {/* Top Bar */}
            <div className="p-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span className="text-white font-bold">{selectedCert.title}</span>
              </div>

              <div className="flex items-center gap-2">
                {selectedCert.certificateFile && (
                  <a
                    href={selectedCert.certificateFile}
                    target="_blank"
                    rel="noreferrer"
                    download
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download File</span>
                  </a>
                )}

                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Certificate Parchment Document Preview */}
            <div className="p-6 sm:p-10 overflow-y-auto flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-[#070c18] to-slate-950">
              <div className="w-full max-w-2xl rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-amber-500/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center">
                {/* Subtle Guilloche Corner Accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-amber-500/50 m-3 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-amber-500/50 m-3 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-amber-500/50 m-3 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-amber-500/50 m-3 rounded-br-lg" />

                {/* Badge Icon */}
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-2 border-amber-500/50 flex items-center justify-center text-amber-400 mb-6 shadow-lg shadow-amber-500/10">
                  <Award className="w-8 h-8" />
                </div>

                {/* Header */}
                <div className="font-mono text-xs text-amber-400 font-bold uppercase tracking-widest mb-2">
                  OFFICIAL CERTIFICATE OF COMPLETION &amp; RIGOR
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-1">
                  {selectedCert.title}
                </h2>

                <div className="text-xs text-slate-400 font-mono mb-8">
                  Issued by: <strong className="text-slate-200">{selectedCert.issuer}</strong>
                </div>

                {/* Recipient */}
                <div className="my-6 py-4 border-y border-slate-800">
                  <div className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1">
                    PROUDLY PRESENTED TO
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 font-display">
                    Kshitij Raj
                  </div>
                  <div className="text-xs text-cyan-400 font-mono mt-1">
                    For successfully demonstrating mastery and verified competency
                  </div>
                </div>

                {/* Details */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto mb-6">
                  {selectedCert.description}
                </p>

                {/* Skills tags on certificate */}
                <div className="flex flex-wrap justify-center gap-1.5 mb-8">
                  {selectedCert.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-md bg-slate-900 border border-amber-500/20 text-[11px] font-mono text-amber-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Footer Stamp & ID */}
                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
                  <div className="text-left">
                    <span className="text-slate-500 block text-[10px]">CREDENTIAL ID:</span>
                    <span className="text-cyan-400 font-semibold">{selectedCert.credentialId}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/30">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="font-bold">AUTHENTICATED &bull; VERIFIED</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Bottom Note */}
            <div className="p-4 bg-slate-950/90 border-t border-slate-800 text-center text-xs font-mono text-slate-500">
              <span>File location: </span>
              <code className="text-cyan-400">{selectedCert.certificateFile}</code>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
