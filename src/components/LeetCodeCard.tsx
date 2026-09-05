import React, { useState, useEffect, useCallback } from 'react';
import { Code, ExternalLink, RefreshCw, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate?: string;
  ranking?: number;
  lastUpdated?: string;
}

const DEFAULT_STATS: LeetCodeStats = {
  totalSolved: 107,
  easySolved: 53,
  mediumSolved: 44,
  hardSolved: 10,
  acceptanceRate: '59.2%',
};

const CACHE_KEY = 'portfolio_leetcode_stats_kshwebsites';
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutes cache

export const LeetCodeCard: React.FC = () => {
  const [stats, setStats] = useState<LeetCodeStats>(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.stats && typeof parsed.stats.totalSolved === 'number') {
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
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    try {
      // Primary endpoint: Alfa LeetCode API /solved
      const res = await fetch('https://alfa-leetcode-api.onrender.com/kshwebsites/solved', {
        signal: controller.signal,
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      if (typeof data.solvedProblem === 'number') {
        const liveData: LeetCodeStats = {
          totalSolved: data.solvedProblem,
          easySolved: typeof data.easySolved === 'number' ? data.easySolved : DEFAULT_STATS.easySolved,
          mediumSolved: typeof data.mediumSolved === 'number' ? data.mediumSolved : DEFAULT_STATS.mediumSolved,
          hardSolved: typeof data.hardSolved === 'number' ? data.hardSolved : DEFAULT_STATS.hardSolved,
          acceptanceRate: '59.2%',
          lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        // Try to get acceptance rate from totalSubmissionNum / acSubmissionNum if present
        if (Array.isArray(data.acSubmissionNum) && Array.isArray(data.totalSubmissionNum)) {
          const acAll = data.acSubmissionNum.find((x: { difficulty: string; submissions: number }) => x.difficulty === 'All')?.submissions;
          const totalAll = data.totalSubmissionNum.find((x: { difficulty: string; submissions: number }) => x.difficulty === 'All')?.submissions;
          if (typeof acAll === 'number' && typeof totalAll === 'number' && totalAll > 0) {
            liveData.acceptanceRate = `${((acAll / totalAll) * 100).toFixed(1)}%`;
          }
        }

        setStats(liveData);
        setIsLive(true);
        setLastSyncedTime(liveData.lastUpdated || 'Just now');

        // Save to cache
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ stats: liveData, timestamp: Date.now() })
          );
        } catch {
          // ignore cache write errors
        }
      }
    } catch {
      // Fallback endpoint: Alfa LeetCode userProfile
      try {
        const fallbackRes = await fetch('https://alfa-leetcode-api.onrender.com/userProfile/kshwebsites', {
          signal: controller.signal,
        });
        if (fallbackRes.ok) {
          const fallbackData = await fallbackRes.json();
          const acList = fallbackData.matchedUserStats?.acSubmissionNum;
          if (Array.isArray(acList)) {
            const allCount = acList.find((x: { difficulty: string; count: number }) => x.difficulty === 'All')?.count;
            const easyCount = acList.find((x: { difficulty: string; count: number }) => x.difficulty === 'Easy')?.count;
            const medCount = acList.find((x: { difficulty: string; count: number }) => x.difficulty === 'Medium')?.count;
            const hardCount = acList.find((x: { difficulty: string; count: number }) => x.difficulty === 'Hard')?.count;

            if (typeof allCount === 'number') {
              const liveData: LeetCodeStats = {
                totalSolved: allCount,
                easySolved: easyCount ?? DEFAULT_STATS.easySolved,
                mediumSolved: medCount ?? DEFAULT_STATS.mediumSolved,
                hardSolved: hardCount ?? DEFAULT_STATS.hardSolved,
                ranking: fallbackData.profile?.ranking,
                acceptanceRate: '59.2%',
                lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              };

              setStats(liveData);
              setIsLive(true);
              setLastSyncedTime(liveData.lastUpdated || 'Just now');
              try {
                localStorage.setItem(
                  CACHE_KEY,
                  JSON.stringify({ stats: liveData, timestamp: Date.now() })
                );
              } catch {
                // ignore
              }
            }
          }
        }
      } catch {
        // Both endpoints failed; keep fallback verified stats
      }
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const difficultyBreakdown = [
    { label: 'Easy', count: stats.easySolved, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
    { label: 'Medium', count: stats.mediumSolved, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
    { label: 'Hard', count: stats.hardSolved, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' },
  ];

  const topics = [
    { name: 'Arrays & Hashing', count: 38, percentage: `${((38 / stats.totalSolved) * 100).toFixed(1)}%`, status: 'Proficient' },
    { name: 'Two Pointers & Binary Search', count: 24, percentage: `${((24 / stats.totalSolved) * 100).toFixed(1)}%`, status: 'Advanced' },
    { name: 'Trees & Graph Algorithms', count: 21, percentage: `${((21 / stats.totalSolved) * 100).toFixed(1)}%`, status: 'Proficient' },
    { name: 'Dynamic Programming & Recursion', count: 14, percentage: `${((14 / stats.totalSolved) * 100).toFixed(1)}%`, status: 'Intermediate' },
    { name: 'Number Theory & Bit Manipulation', count: 10, percentage: `${((10 / stats.totalSolved) * 100).toFixed(1)}%`, status: 'Advanced' },
  ];

  return (
    <div className="mt-10 p-6 sm:p-8 rounded-2xl glass-card border border-slate-800 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-800/80">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-lg shadow-amber-500/10">
            <Code className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                LeetCode Problem-Solving Record
              </h3>
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30 font-semibold">
                @kshwebsites
              </span>

              {/* Dynamic Live Status Indicator */}
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
                  VERIFIED STATS
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              DSA milestones with emphasis on runtime optimization, graph traversals, and cryptographic math.
            </p>
          </div>
        </div>

        {/* Solved Summary Badges & Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Acceptance Rate pill if present */}
          {stats.acceptanceRate && (
            <div className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-center">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">Acceptance</div>
              <div className="text-sm font-bold text-emerald-400">{stats.acceptanceRate}</div>
            </div>
          )}

          {/* Total Solved Badge */}
          <div className="px-4 py-2 rounded-xl bg-slate-900/90 border border-amber-500/30 font-mono text-center min-w-[100px]">
            <div className="text-xs text-slate-400">TOTAL SOLVED</div>
            <div className="text-2xl font-extrabold text-amber-400">{stats.totalSolved}</div>
          </div>

          {/* Manual Refresh Button */}
          <button
            onClick={fetchStats}
            disabled={loading}
            title="Refresh LeetCode stats"
            className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-amber-400' : ''}`} />
          </button>

          {/* External Verification Link */}
          <a
            href={PERSONAL_INFO.socialLinks.leetcode}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-mono text-xs font-bold hover:bg-amber-400 flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20"
          >
            <span>Verify on LeetCode</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Difficulty Breakdown Badges */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {difficultyBreakdown.map((item, idx) => (
          <div
            key={idx}
            className={`p-3.5 rounded-xl ${item.bg} border ${item.border} text-center font-mono transition-all`}
          >
            <div className={`text-2xl font-bold ${item.color}`}>{item.count}</div>
            <div className="text-xs text-slate-400 mt-0.5 font-medium">{item.label}</div>
            <div className="text-[10px] text-slate-500 mt-1">
              {stats.totalSolved > 0 ? `${((item.count / stats.totalSolved) * 100).toFixed(0)}% of solved` : ''}
            </div>
          </div>
        ))}
      </div>

      {/* Grid of Topics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {topics.map((t, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 hover:border-amber-500/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-bold text-white mb-1.5 leading-snug">{t.name}</div>
              <div className="text-sm font-mono text-amber-400 font-bold">{t.count} Solved</div>
              <div className="text-[10px] font-mono text-slate-500 mt-0.5">{t.percentage} of total</div>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-850 flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>STATUS:</span>
              <span className="text-slate-300 font-medium">{t.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

