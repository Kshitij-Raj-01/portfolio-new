import React from 'react';
import { Award, CheckCircle2, ExternalLink, ShieldCheck } from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData';

export const CertificationsSection: React.FC = () => {
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
              Professional credentials validating rigorous cybersecurity defense, full-stack MERN architecture, and premier IIT/NPTEL computer science foundations.
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

                  {/* Link / Button */}
                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs font-mono flex items-center justify-center gap-1.5 transition-all"
                    >
                      <span>Issuer Directory</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
