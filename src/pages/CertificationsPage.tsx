import React from 'react';
import { CertificationsSection } from '../components/CertificationsSection';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData';

export const CertificationsPage: React.FC = () => {
  return (
    <div className="pt-8 pb-20">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>VERIFIED ACCREDITATIONS &bull; PDF CERTIFICATES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
          Verified Credentials &amp; Certifications
        </h1>
        <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          Industry accreditations and academic certifications validating hands-on cybersecurity defense, Linux VPS administration, full-stack MERN production systems, and IIT computer science foundations.
        </p>

        {/* Verification Metadata Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Total Credentials</div>
            <div className="text-xl sm:text-2xl font-black text-cyan-400 font-display mt-0.5">{CERTIFICATIONS.length} Certificates</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Verification Status</div>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 font-display mt-0.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>100% Verified</span>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Document Engine</div>
            <div className="text-xl sm:text-2xl font-black text-violet-400 font-display mt-0.5">Embedded PDF</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Issuing Bodies</div>
            <div className="text-xl sm:text-2xl font-black text-amber-400 font-display mt-0.5">Google &bull; Pregrad &bull; NPTEL</div>
          </div>
        </div>
      </div>

      {/* Main Certifications Section with embedded PDF Viewer */}
      <CertificationsSection />
    </div>
  );
};
