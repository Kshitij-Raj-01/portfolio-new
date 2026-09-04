import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { FollopeSpotlight } from '../components/FollopeSpotlight';
import { SkillsRadar } from '../components/SkillsRadar';
import { PROJECTS, CERTIFICATIONS } from '../data/portfolioData';
import { ArrowRight, Sparkles, FolderGit2, ShieldCheck, Terminal, Award, Cpu, BookOpen } from 'lucide-react';

interface HomePageProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
  onOpenWaitlist: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenTerminal,
  onOpenResume,
  onOpenWaitlist,
}) => {
  const featuredProjects = PROJECTS.filter((p) => p.featured).slice(0, 3);
  const featuredCerts = CERTIFICATIONS.slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Hero HUD */}
      <Hero onOpenTerminal={onOpenTerminal} onOpenResume={onOpenResume} />

      {/* 2. Startup Spotlight: Follope */}
      <FollopeSpotlight onOpenWaitlist={onOpenWaitlist} />

      {/* 3. Featured Projects Showcase Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>FEATURED WORK</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              Selected Projects &amp; Applications
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-xl">
              Production backends, SaaS tools, and web applications I've engineered and deployed.
            </p>
          </div>

          <Link
            to="/projects"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 hover:text-white font-mono text-xs font-semibold transition-all group"
          >
            <span>View All Projects ({PROJECTS.length})</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl p-6 glass-card border border-slate-800 hover:border-cyan-500/40 bg-slate-900/60 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    {project.badge}
                  </span>
                  {project.category && (
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      {project.category}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1 mb-4 pt-3 border-t border-slate-800/80">
                  {project.tags.slice(0, 4).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-500">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>

                <Link
                  to="/projects"
                  className="w-full py-2 rounded-xl bg-slate-950 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 text-xs font-mono flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>View Details &amp; Stack</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Core Skills Radar */}
      <SkillsRadar />

      {/* 5. Verified Certifications Highlight Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/30 border border-cyan-500/20 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>VERIFIED CERTIFICATIONS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display mb-2">
                Certifications &amp; Accreditations
              </h2>
              <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
                Verified certifications in Google Cybersecurity, Pregrad MERN Stack, and NPTEL IIT Computer Science with interactive PDF document previews.
              </p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {featuredCerts.map((c) => (
                  <span
                    key={c.id}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-300"
                  >
                    <Award className="w-3 h-3 text-cyan-400" />
                    <span>{c.title}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                to="/certifications"
                className="px-5 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold font-mono text-xs hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <span>Browse All Certificates &amp; PDFs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Quick Multi-Page Navigation Hub */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-mono mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PORTFOLIO SECTIONS</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-display">
            Explore Dedicated Sections
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Navigate through targeted hubs for research, interactive security simulations, and engineering write-ups.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/experience"
            className="p-5 rounded-2xl glass-card border border-slate-800 hover:border-violet-500/40 bg-slate-900/60 hover:bg-slate-900 transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-3 group-hover:scale-105 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1 group-hover:text-violet-300">
              Experience &amp; Research
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              DRDO SAG Post-Quantum internship, Robotic Sir AI, SIH 2025 hackathon win, and LeetCode stats.
            </p>
            <span className="text-[11px] font-mono text-violet-400 flex items-center gap-1">
              <span>View Timeline</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          <Link
            to="/labs"
            className="p-5 rounded-2xl glass-card border border-slate-800 hover:border-cyan-500/40 bg-slate-900/60 hover:bg-slate-900 transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1 group-hover:text-cyan-300">
              Security Labs &amp; Game
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Interactive Post-Quantum simulator, 4 defensive security sandboxes, and arcade mini-game.
            </p>
            <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1">
              <span>Launch Sandbox</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          <Link
            to="/notes"
            className="p-5 rounded-2xl glass-card border border-slate-800 hover:border-emerald-500/40 bg-slate-900/60 hover:bg-slate-900 transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1 group-hover:text-emerald-300">
              Engineering Notes
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Technical write-ups on SRAM lattice crypto, zero-drop Celery queues, and Vedic multiplication.
            </p>
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <span>Read Notes</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          <div
            onClick={onOpenTerminal}
            className="p-5 rounded-2xl glass-card border border-slate-800 hover:border-cyan-500/40 bg-slate-900/60 hover:bg-slate-900 transition-all group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-105 transition-transform">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1 group-hover:text-cyan-300 flex items-center justify-between">
              <span>Interactive CLI</span>
              <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded">~</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Explore the whole portfolio through simulated bash terminal commands. Type <code className="text-cyan-400">help</code> to start.
            </p>
            <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1">
              <span>Launch Console</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
