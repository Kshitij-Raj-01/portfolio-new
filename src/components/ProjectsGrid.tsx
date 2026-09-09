import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';

export const ProjectsGrid: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'fintech', label: 'FinTech & SaaS' },
    { id: 'systems', label: 'Systems & Enterprise' },
    { id: 'community', label: 'EdTech & Community' },
    { id: 'fullstack', label: 'Full-Stack & Cloud' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>FEATURED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Selected Systems &amp; Engineering Projects
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeFilter === filter.id
                    ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`rounded-2xl flex flex-col justify-between p-6 transition-all duration-300 relative group ${
                project.isStartup
                  ? 'bg-gradient-to-b from-slate-900 via-slate-900/90 to-emerald-950/20 border-2 border-emerald-500/40 shadow-xl shadow-emerald-500/5'
                  : 'glass-card border border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Header with badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`text-[11px] font-mono px-2.5 py-1 rounded-md font-semibold ${
                      project.isStartup
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {project.badge || project.category}
                  </span>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-white transition-colors p-1"
                        title="View Source on GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-emerald-400 transition-colors p-1"
                        title={project.id === 'follope' ? 'Visit Landing Page (App in Testing)' : 'Live Preview'}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-1">
                  {project.title}
                </h3>
                <div className="text-xs font-mono text-cyan-400 mb-3">
                  {project.subtitle}
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Key Features preview */}
                <div className="space-y-1.5 mb-5">
                  {project.keyFeatures.slice(0, 2).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Metrics / Stats strip if available */}
                {project.stats && (
                  <div className="grid grid-cols-2 gap-2 py-3 px-3 mb-4 rounded-xl bg-slate-900/90 border border-slate-800/80 text-[11px] font-mono">
                    {project.stats.map((s, sIdx) => (
                      <div key={sIdx}>
                        <span className="text-slate-500 block">{s.label}:</span>
                        <span className="text-slate-200 font-semibold">{s.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/70">
                  {project.tags.slice(0, 4).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/60 text-slate-400 border border-slate-750"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="text-[11px] font-mono px-1.5 py-0.5 rounded text-slate-500">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
