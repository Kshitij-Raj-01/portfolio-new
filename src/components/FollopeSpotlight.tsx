import React, { useState } from 'react';
import { 
  Rocket, 
  CheckCircle2, 
  CreditCard, 
  BellRing, 
  ShieldCheck, 
  Cpu, 
  FileText,
  Server,
  Database,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { STARTUP_FOLLOPE } from '../data/portfolioData';
import { FollopeCalculator } from './FollopeCalculator';

interface FollopeSpotlightProps {
  onOpenWaitlist: () => void;
}

export const FollopeSpotlight: React.FC<FollopeSpotlightProps> = ({ onOpenWaitlist }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'features'>('overview');

  return (
    <section id="follope" className="py-20 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-600/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
              <Rocket className="w-3.5 h-3.5" />
              <span>STARTUP SPOTLIGHT • FINTECH / SAAS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Follope <span className="text-emerald-400">—</span> Freelancer Invoicing &amp; Payment Tracking
            </h2>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <a
              href="https://follope.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-mono text-xs font-bold hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
            >
              <span>follope.com</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{STARTUP_FOLLOPE.status}</span>
            </span>
          </div>
        </div>

        {/* Featured Showcase Card */}
        <div className="rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 shadow-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
          {/* Subtle grid accent */}
          <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Context & Overview */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  {STARTUP_FOLLOPE.role}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                  Built to eliminate unpaid invoices and payment chase anxiety.
                </h3>
                <p className="mt-4 text-slate-300 leading-relaxed text-sm sm:text-base">
                  {STARTUP_FOLLOPE.description}
                </p>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-slate-800 gap-6 text-sm font-medium">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-2 transition-colors relative ${
                    activeTab === 'overview'
                      ? 'text-emerald-400 border-b-2 border-emerald-400'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Core Capabilities
                </button>
                <button
                  onClick={() => setActiveTab('architecture')}
                  className={`pb-2 transition-colors relative ${
                    activeTab === 'architecture'
                      ? 'text-emerald-400 border-b-2 border-emerald-400'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Systems Architecture
                </button>
                <button
                  onClick={() => setActiveTab('features')}
                  className={`pb-2 transition-colors relative ${
                    activeTab === 'features'
                      ? 'text-emerald-400 border-b-2 border-emerald-400'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  FinTech Workflows
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="space-y-3">
                  {STARTUP_FOLLOPE.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="p-1 rounded bg-emerald-500/10 text-emerald-400 mt-0.5 shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-sm text-slate-300 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'architecture' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {STARTUP_FOLLOPE.architectureHighlights.map((arch, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between"
                    >
                      <div className="text-xs font-mono font-bold text-cyan-400 mb-1">
                        {arch.title}
                      </div>
                      <div className="text-xs text-slate-400 leading-relaxed">{arch.desc}</div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'features' && (
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Smart Invoicing</span>
                    </div>
                    <p className="text-slate-400">PDF compilation, tax/GST calculations & multi-currency.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="flex items-center gap-1.5 text-cyan-400 font-semibold mb-1">
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Instant UPI Sync</span>
                    </div>
                    <p className="text-slate-400">Dynamic QR codes and webhook-triggered settlement status.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-1">
                      <BellRing className="w-3.5 h-3.5" />
                      <span>Auto Reminders</span>
                    </div>
                    <p className="text-slate-400">Celery-scheduled polite email and SMS escalation triggers.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="flex items-center gap-1.5 text-purple-400 font-semibold mb-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Secret Vault</span>
                    </div>
                    <p className="text-slate-400">Environment secret management, API tokens & HMAC verification.</p>
                  </div>
                </div>
              )}

              {/* Tech Stack Pills */}
              <div className="pt-2">
                <div className="text-xs font-mono text-slate-400 mb-2">ENGINEERING STACK:</div>
                <div className="flex flex-wrap gap-2">
                  {STARTUP_FOLLOPE.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Architecture Visualizer */}
            <div className="lg:col-span-5 bg-slate-950/80 p-5 rounded-xl border border-slate-800/90 flex flex-col justify-between font-mono text-xs">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2 text-slate-300">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold">SYSTEM WORKFLOW TOPOLOGY</span>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  LIVE PIPELINE
                </span>
              </div>

              {/* Topology Steps */}
              <div className="space-y-3 my-2">
                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                      1
                    </div>
                    <div>
                      <div className="text-white font-semibold">Freelancer Action</div>
                      <div className="text-[11px] text-slate-400 font-sans">Generates billable invoice &amp; UPI QR</div>
                    </div>
                  </div>
                  <FileText className="w-4 h-4 text-emerald-400" />
                </div>

                <div className="flex justify-center -my-1 text-slate-600">
                  <span>↓</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
                      2
                    </div>
                    <div>
                      <div className="text-white font-semibold">Django Backend Core</div>
                      <div className="text-[11px] text-slate-400 font-sans">Dispatches async workers &amp; audits secrets</div>
                    </div>
                  </div>
                  <Server className="w-4 h-4 text-cyan-400" />
                </div>

                <div className="flex justify-center -my-1 text-slate-600">
                  <span>↓</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                      3
                    </div>
                    <div>
                      <div className="text-white font-semibold">Redis + Celery Workers</div>
                      <div className="text-[11px] text-slate-400 font-sans">Payment reminders &amp; overdue queues</div>
                    </div>
                  </div>
                  <RefreshCw className="w-4 h-4 text-amber-400" />
                </div>

                <div className="flex justify-center -my-1 text-slate-600">
                  <span>↓</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                      4
                    </div>
                    <div>
                      <div className="text-white font-semibold">PostgreSQL &amp; Webhooks</div>
                      <div className="text-[11px] text-slate-400 font-sans">Instant settlement &amp; client notification</div>
                    </div>
                  </div>
                  <Database className="w-4 h-4 text-purple-400" />
                </div>
              </div>

              {/* Security & Reliability Callout */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>HMAC Webhook Guard</span>
                </span>
                <span className="text-emerald-400 font-medium">99.9% Pipeline Integrity</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Freelancer ROI & Late Payment Loss Calculator */}
        <FollopeCalculator onOpenWaitlist={onOpenWaitlist} />
      </div>
    </section>
  );
};
