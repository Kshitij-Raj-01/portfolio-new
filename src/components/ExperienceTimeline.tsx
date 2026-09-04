import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Shield } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Work Experience
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Roles spanning backend development and server management at Robotic Sir AI, Post-Quantum Cryptography research at DRDO SAG, and full-stack development.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="space-y-8 relative">
          {/* Vertical indicator line for larger screens */}
          <div className="hidden lg:block absolute left-8 top-6 bottom-6 w-0.5 bg-slate-800" />

          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="relative lg:pl-20 transition-all duration-300"
            >
              {/* Timeline marker icon */}
              <div className="hidden lg:flex absolute left-4 top-6 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border-2 border-emerald-500 items-center justify-center text-emerald-400 shadow-md shadow-emerald-500/20">
                {exp.type === 'Internship' ? (
                  <Shield className="w-4 h-4" />
                ) : (
                  <Briefcase className="w-4 h-4" />
                )}
              </div>

              {/* Experience Card */}
              <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 hover:border-slate-750 transition-all shadow-xl hover:shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-800/80">
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {exp.role}
                      </h3>
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-medium ${
                          exp.current
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-300 border border-slate-700'
                        }`}
                      >
                        {exp.current ? '● Current' : exp.type}
                      </span>
                    </div>

                    <div className="text-base font-semibold text-emerald-400 mt-1">
                      {exp.company}
                      {exp.companySubtitle && (
                        <span className="text-slate-400 font-normal text-sm ml-2">
                          • {exp.companySubtitle}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col items-start sm:items-end gap-2 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                {/* Key Bullet Points */}
                <ul className="space-y-2.5 my-5">
                  {exp.highlights.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-sm text-slate-300">
                      <span className="p-1 rounded bg-slate-800/80 text-emerald-400 mt-0.5 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies used */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono text-slate-500 mr-1">TECH:</span>
                  {exp.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded text-xs font-mono bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
