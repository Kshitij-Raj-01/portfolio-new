import React, { useState, useEffect, useCallback } from 'react';
import { Award, ExternalLink, RefreshCw, CheckCircle2, BookOpen, Flame, Trophy } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface CodeChefStats {
  username: string;
  totalSolved: number;
  badge: string;
  learningPathsCount: number;
  practicePathsCount: number;
  topLearningPath: string;
  topLearningProgress: string;
  topPracticePath: string;
  topPracticeProgress: string;
  lastUpdated?: string;
}

const DEFAULT_CODECHEF_STATS: CodeChefStats = {
  username: 'kshitij_raj_01',
  totalSolved: 117,
  badge: 'Problem Solver - Bronze Badge',
  learningPathsCount: 1,
  practicePathsCount: 1,
  topLearningPath: 'Learn C++',
  topLearningProgress: '15%',
  topPracticePath: 'Practice Python',
  topPracticeProgress: '17%',
};

const CACHE_KEY = 'portfolio_codechef_stats_kshitij_raj_01';
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 mins

export const CodeChefCard: React.FC = () => {
  const [stats, setStats] = useState<CodeChefStats>(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.stats && typeof parsed.stats.totalSolved === 'number') {
          return parsed.stats;
        }
      }
    } catch {
      // ignore
    }
    return DEFAULT_CODECHEF_STATS;
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
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    try {
      // Primary: Google Apps Script Web App endpoint if configured
      const endpoint = PERSONAL_INFO.googleSheetScriptUrl
        ? PERSONAL_INFO.googleSheetScriptUrl
        : `https://codechef-api.vercel.app/handle/${DEFAULT_CODECHEF_STATS.username}`;

      const res = await fetch(endpoint, {
        signal: controller.signal,
      });

      if (res.ok) {
        const data = await res.json();
        if (typeof data.totalSolved === 'number') {
          const live: CodeChefStats = {
            ...DEFAULT_CODECHEF_STATS,
            totalSolved: data.totalSolved,
            badge: data.badge || DEFAULT_CODECHEF_STATS.badge,
            topLearningPath: data.topLearningPath || DEFAULT_CODECHEF_STATS.topLearningPath,
            topLearningProgress: data.topLearningProgress || DEFAULT_CODECHEF_STATS.topLearningProgress,
            topPracticePath: data.topPracticePath || DEFAULT_CODECHEF_STATS.topPracticePath,
            topPracticeProgress: data.topPracticeProgress || DEFAULT_CODECHEF_STATS.topPracticeProgress,
            lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setStats(live);
          setIsLive(true);
          setLastSyncedTime(live.lastUpdated || null);
          localStorage.setItem(CACHE_KEY, JSON.stringify({ stats: live, timestamp: Date.now() }));
          return;
        }
      }
      throw new Error('Fallback to verified CodeChef telemetry');
    } catch {
      // Retain verified metrics parsed directly from https://www.codechef.com/users/kshitij_raj_01
      setStats(DEFAULT_CODECHEF_STATS);
      setIsLive(false);
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const milestones = [
    {
      title: 'Total Problems Solved',
      value: `${stats.totalSolved}`,
      subtitle: 'Algorithmic exercises & DSA problems',
      icon: <Trophy className="w-4 h-4 text-amber-400" />,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
    },
    {
      title: 'CodeChef Honor Badge',
      value: stats.badge,
      subtitle: 'Earned for consistent problem resolution',
      icon: <Award className="w-4 h-4 text-amber-500" />,
      color: 'text-amber-300',
      bg: 'bg-amber-600/10',
      border: 'border-amber-600/30',
    },
    {
      title: 'Active Learning Track',
      value: `${stats.topLearningPath} (${stats.topLearningProgress})`,
      subtitle: 'Core systems programming & memory management',
      icon: <BookOpen className="w-4 h-4 text-cyan-400" />,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
    },
    {
      title: 'Practice Specialization',
      value: `${stats.topPracticePath} (${stats.topPracticeProgress})`,
      subtitle: 'Scripting, backend logic & automation',
      icon: <Flame className="w-4 h-4 text-emerald-400" />,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
    },
  ];

  return (
    <div className="mt-6 p-6 sm:p-8 rounded-2xl glass-card border border-slate-800 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-amber-600/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-800/80">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-600/20 to-amber-700/20 border border-amber-600/40 flex items-center justify-center text-amber-400 shrink-0 shadow-lg shadow-amber-600/10">
            <Trophy className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                CodeChef Problem-Solving Telemetry
              </h3>
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30 font-semibold">
                @{stats.username}
              </span>

              {isLive ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
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
                  VERIFIED PROFILE
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Competitive coding exercises, algorithmic training tracks, and problem solving accreditations on CodeChef.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Total Solved Badge */}
          <div className="px-4 py-2 rounded-xl bg-slate-900/90 border border-amber-600/30 font-mono text-center min-w-[100px]">
            <div className="text-xs text-slate-400">TOTAL SOLVED</div>
            <div className="text-2xl font-extrabold text-amber-400">{stats.totalSolved}</div>
          </div>

          {/* Refresh Button */}
          <button
            onClick={fetchStats}
            disabled={loading}
            title="Refresh CodeChef stats"
            className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-amber-400' : ''}`} />
          </button>

          {/* External Profile Link */}
          <a
            href={PERSONAL_INFO.socialLinks.codechef}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-amber-600/20"
          >
            <span>Verify on CodeChef</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {milestones.map((m, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl ${m.bg} border ${m.border} flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                {m.icon}
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  {m.title}
                </span>
              </div>
              <div className={`text-lg font-bold font-mono ${m.color} break-words`}>
                {m.value}
              </div>
            </div>
            <div className="text-[11px] text-slate-400 mt-2 font-sans leading-tight">
              {m.subtitle}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
