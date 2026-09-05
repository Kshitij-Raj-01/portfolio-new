import React, { useState, useEffect, useCallback } from 'react';
import { Github, ExternalLink, FolderGit2, RefreshCw, Star, GitFork, Users, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HighlightedRepo {
  name: string;
  repoSlug: string;
  desc: string;
  lang: string;
  langColor: string;
  stars: number;
  forks: number;
}

interface LanguageStat {
  name: string;
  percentage: string;
  color: string;
  count: number;
}

interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  languages: LanguageStat[];
  highlightedRepos: HighlightedRepo[];
  lastUpdated?: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: 'bg-amber-400',
  TypeScript: 'bg-blue-500',
  Python: 'bg-emerald-400',
  PHP: 'bg-indigo-400',
  'C / C++': 'bg-purple-500',
  'C++': 'bg-purple-500',
  'Jupyter Notebook': 'bg-orange-400',
};

const DEFAULT_STATS: GitHubStats = {
  publicRepos: 17,
  followers: 8,
  following: 4,
  totalStars: 8,
  languages: [
    { name: 'JavaScript', percentage: '62.5%', color: 'bg-amber-400', count: 10 },
    { name: 'TypeScript', percentage: '18.8%', color: 'bg-blue-500', count: 3 },
    { name: 'Python', percentage: '6.3%', color: 'bg-emerald-400', count: 1 },
    { name: 'PHP', percentage: '6.3%', color: 'bg-indigo-400', count: 1 },
    { name: 'Jupyter', percentage: '6.3%', color: 'bg-orange-400', count: 1 },
  ],
  highlightedRepos: [
    {
      name: 'School Management ERP',
      repoSlug: 'School-Management-System',
      desc: 'Multi-role ERP system with Express.js, TypeScript, MySQL & Three.js.',
      lang: 'TypeScript',
      langColor: 'bg-blue-500',
      stars: 1,
      forks: 0,
    },
    {
      name: 'WasteEx Marketplace',
      repoSlug: 'WasteEx',
      desc: 'B2B industrial circular marketplace with smart contract escrow & Socket.IO.',
      lang: 'TypeScript',
      langColor: 'bg-blue-500',
      stars: 1,
      forks: 0,
    },
    {
      name: 'Secure API Gateway',
      repoSlug: 'Secure-Api-Gateway',
      desc: 'High-performance API gateway with JWT auth, rate limiting & reverse proxy.',
      lang: 'JavaScript',
      langColor: 'bg-amber-400',
      stars: 1,
      forks: 0,
    },
    {
      name: 'Online Banking System',
      repoSlug: 'Online-Banking-System',
      desc: 'Full-featured secure online banking system with transaction logs and ACL.',
      lang: 'Python',
      langColor: 'bg-emerald-400',
      stars: 2,
      forks: 0,
    },
  ],
};

const CACHE_KEY = 'portfolio_github_stats_Kshitij_Raj_01';
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutes cache

export const GitHubStatsCard: React.FC = () => {
  const [stats, setStats] = useState<GitHubStats>(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.stats && typeof parsed.stats.publicRepos === 'number') {
          return parsed.stats;
        }
      }
    } catch {
      // ignore storage errors
    }
    return DEFAULT_STATS;
  });

  const [loading, setLoading] = useState(false);
  const [isLive, setIsLive] = useState(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        return parsed.timestamp && Date.now() - parsed.timestamp < CACHE_TTL_MS;
      }
    } catch {
      // ignore
    }
    return false;
  });
  const [lastSyncedTime, setLastSyncedTime] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      // Fetch user profile and repos in parallel from GitHub REST API
      const [userRes, reposRes] = await Promise.all([
        fetch('https://api.github.com/users/Kshitij-Raj-01', { signal: controller.signal }),
        fetch('https://api.github.com/users/Kshitij-Raj-01/repos?per_page=100&sort=updated', { signal: controller.signal }),
      ]);

      if (!userRes.ok || !reposRes.ok) {
        throw new Error(`GitHub API error: user ${userRes.status}, repos ${reposRes.status}`);
      }

      const userData = await userRes.json();
      const reposData = await reposRes.json();

      if (typeof userData.public_repos === 'number' && Array.isArray(reposData)) {
        // Calculate total stars
        const totalStars = reposData.reduce(
          (sum: number, r: { stargazers_count?: number }) => sum + (r.stargazers_count || 0),
          0
        );

        // Calculate language counts
        const langCounts: Record<string, number> = {};
        let totalLangsCount = 0;
        reposData.forEach((r: { language?: string | null }) => {
          if (r.language) {
            langCounts[r.language] = (langCounts[r.language] || 0) + 1;
            totalLangsCount++;
          }
        });

        const languages: LanguageStat[] = Object.entries(langCounts)
          .sort((a, b) => b[1] - a[1])
          .map(([lang, count]) => {
            const percentage = totalLangsCount > 0 ? `${((count / totalLangsCount) * 100).toFixed(1)}%` : '0%';
            const color = LANGUAGE_COLORS[lang] || 'bg-slate-400';
            return { name: lang === 'Jupyter Notebook' ? 'Jupyter' : lang, percentage, color, count };
          });

        // Update highlighted repos with live stars and forks
        const updatedHighlightedRepos = DEFAULT_STATS.highlightedRepos.map((repo) => {
          const liveRepo = reposData.find(
            (r: { name?: string }) => r.name?.toLowerCase() === repo.repoSlug.toLowerCase()
          );
          if (liveRepo) {
            return {
              ...repo,
              stars: liveRepo.stargazers_count ?? repo.stars,
              forks: liveRepo.forks_count ?? repo.forks,
            };
          }
          return repo;
        });

        const liveStats: GitHubStats = {
          publicRepos: userData.public_repos,
          followers: userData.followers ?? DEFAULT_STATS.followers,
          following: userData.following ?? DEFAULT_STATS.following,
          totalStars,
          languages: languages.length > 0 ? languages : DEFAULT_STATS.languages,
          highlightedRepos: updatedHighlightedRepos,
          lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setStats(liveStats);
        setIsLive(true);
        setLastSyncedTime(liveStats.lastUpdated || 'Just now');

        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ stats: liveStats, timestamp: Date.now() })
          );
        } catch {
          // ignore cache write errors
        }
      }
    } catch {
      // Keep verified fallback defaults on rate-limit or network disconnect
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div className="mt-6 mb-12 p-6 sm:p-8 rounded-2xl glass-card border border-slate-800 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-blue-500/5 blur-[120px] pointer-events-none" />

      {/* Top Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-800/80">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-white shrink-0 shadow-lg shadow-black/40">
            <Github className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                GitHub Open Source &amp; Code Activity
              </h3>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30 font-semibold">
                @Kshitij-Raj-01
              </span>

              {/* Dynamic Live Status Indicator */}
              {isLive ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  LIVE SYNC {lastSyncedTime && `(${lastSyncedTime})`}
                </span>
              ) : loading ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-800/60 px-2.5 py-0.5 rounded-full border border-slate-700/60 font-semibold">
                  <RefreshCw className="w-3 h-3 animate-spin text-slate-400" />
                  SYNCING...
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30 font-semibold">
                  <CheckCircle2 className="w-3 h-3 text-amber-400" />
                  VERIFIED STATS
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Production repositories, open source contributions, and cryptographic research libraries.
            </p>
          </div>
        </div>

        {/* Live Counters, Refresh, and Link */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-center min-w-[72px]">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Repos</div>
            <div className="text-base font-bold text-white">{stats.publicRepos}</div>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-center min-w-[72px]">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider flex items-center justify-center gap-1">
              <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" /> Stars
            </div>
            <div className="text-base font-bold text-amber-400">{stats.totalStars}</div>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-center min-w-[72px]">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider flex items-center justify-center gap-1">
              <Users className="w-2.5 h-2.5 text-cyan-400" /> Followers
            </div>
            <div className="text-base font-bold text-cyan-400">{stats.followers}</div>
          </div>

          <button
            onClick={fetchStats}
            disabled={loading}
            title="Refresh GitHub stats"
            className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
          </button>

          <a
            href={PERSONAL_INFO.socialLinks.github}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/40 text-slate-200 hover:text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <span>View GitHub Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Language Stack Bar */}
      <div className="mb-8 p-4 rounded-xl bg-slate-950/70 border border-slate-850">
        <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-3">
          <span className="font-semibold text-slate-300">MOST USED LANGUAGES</span>
          <span className="text-cyan-400">Live Repo Distribution</span>
        </div>

        {/* Progress Bar */}
        <div className="h-3 rounded-full bg-slate-900 flex overflow-hidden gap-0.5 mb-3">
          {stats.languages.map((lang, idx) => (
            <div
              key={idx}
              className={`${lang.color} h-full transition-all duration-500`}
              style={{ width: lang.percentage }}
              title={`${lang.name}: ${lang.percentage} (${lang.count} repos)`}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-xs font-mono">
          {stats.languages.map((lang, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${lang.color}`} />
              <span className="text-slate-300">{lang.name}</span>
              <span className="text-slate-500">{lang.percentage}</span>
              <span className="text-[10px] text-slate-600">({lang.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Highlighted Repositories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.highlightedRepos.map((repo, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-1.5 mb-1.5">
                <div className="flex items-center gap-1.5 text-white font-mono text-xs font-bold truncate">
                  <FolderGit2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{repo.name}</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2 mb-3">
                {repo.desc}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-850 flex items-center justify-between text-[10px] font-mono">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${repo.langColor}`} />
                  <span className="text-slate-300">{repo.lang}</span>
                </div>
                {repo.stars > 0 && (
                  <span className="flex items-center gap-0.5 text-amber-400 font-semibold">
                    <Star className="w-2.5 h-2.5 fill-amber-400" />
                    {repo.stars}
                  </span>
                )}
                {repo.forks > 0 && (
                  <span className="flex items-center gap-0.5 text-slate-400">
                    <GitFork className="w-2.5 h-2.5" />
                    {repo.forks}
                  </span>
                )}
              </div>

              <a
                href={`https://github.com/Kshitij-Raj-01/${repo.repoSlug}`}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
              >
                <span>Code</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

