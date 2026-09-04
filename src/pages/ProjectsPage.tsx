import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Search, 
  Layers, 
  Code2 
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filters = [
    { id: 'all', label: 'All Architectures' },
    { id: 'fintech', label: 'FinTech & SaaS' },
    { id: 'systems', label: 'Systems & Enterprise' },
    { id: 'community', label: 'EdTech & Community' },
    { id: 'fullstack', label: 'Full-Stack & Cloud' },
  ];

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesFilter = activeFilter === 'all' || project.category === activeFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pt-8 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>PORTFOLIO &bull; ENGINEERING DIRECTORY</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
          Systems &amp; Software Projects
        </h1>
        <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          Production backends, FinTech platforms, enterprise ERPs, and distributed cloud applications built with Django, Node.js, PostgreSQL, Redis, and Celery.
        </p>

        {/* High-level directory statistics HUD */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Total Systems</div>
            <div className="text-xl sm:text-2xl font-black text-cyan-400 font-display mt-0.5">{PROJECTS.length} Projects</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Primary Core</div>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 font-display mt-0.5">Django &bull; Node.js</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Data Stores</div>
            <div className="text-xl sm:text-2xl font-black text-violet-400 font-display mt-0.5">Postgres &bull; Redis</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Production Reliability</div>
            <div className="text-xl sm:text-2xl font-black text-amber-400 font-display mt-0.5">100% Launch</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                activeFilter === filter.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800/80'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search stack, title, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 font-mono"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
          <Layers className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No matching projects found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
            Try adjusting your search keyword or clearing the active category filter.
          </p>
          <button
            onClick={() => {
              setActiveFilter('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 font-mono text-xs border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`rounded-2xl flex flex-col justify-between p-6 transition-all duration-300 relative group ${
                project.isStartup
                  ? 'bg-gradient-to-b from-slate-900 via-slate-900/90 to-cyan-950/30 border-2 border-cyan-500/40 shadow-xl shadow-cyan-950/20'
                  : 'glass-card border border-slate-800 hover:border-slate-700 bg-slate-900/60'
              }`}
            >
              <div>
                {/* Header with badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`text-[11px] font-mono px-2.5 py-1 rounded-md font-semibold ${
                      project.isStartup
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
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
                        className="text-slate-400 hover:text-cyan-400 transition-colors p-1"
                        title="Live Preview"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors font-display">
                  {project.title}
                </h3>

                {/* Subtitle */}
                {project.subtitle && (
                  <p className="text-xs text-cyan-400/80 font-mono mb-3">
                    {project.subtitle}
                  </p>
                )}

                {/* Description */}
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Key Architectural Highlights */}
                {project.keyFeatures && (
                  <div className="mb-6 space-y-1.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                      <Code2 className="w-3 h-3 text-cyan-400" />
                      <span>Key Architectural Highlights:</span>
                    </div>
                    {project.keyFeatures.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="text-cyan-400 mt-0.5">&bull;</span>
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                {/* Metrics Pill Grid */}
                {project.stats && (
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {project.stats.map((stat, idx) => (
                      <div key={idx} className="bg-slate-950/80 px-2.5 py-1.5 rounded-lg border border-slate-800">
                        <div className="text-[10px] text-slate-400 uppercase font-mono">{stat.label}</div>
                        <div className="text-xs font-bold text-slate-200 font-mono">{stat.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/80">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Direct Action Links */}
                {(project.liveUrl || project.githubUrl) && (
                  <div className="mt-4 pt-3 flex gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold flex items-center justify-center gap-1.5 border border-cyan-500/30 transition-all"
                      >
                        <span>Launch App</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-mono flex items-center justify-center gap-1.5 border border-slate-800 transition-all"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Repository</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
