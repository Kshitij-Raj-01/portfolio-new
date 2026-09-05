import React from 'react';
import { ExperienceTimeline } from '../components/ExperienceTimeline';
import { ResearchSection } from '../components/ResearchSection';
import { LeetCodeCard } from '../components/LeetCodeCard';
import { GitHubStatsCard } from '../components/GitHubStatsCard';
import { Briefcase, Code2 } from 'lucide-react';

export const ExperiencePage: React.FC = () => {
  return (
    <div className="pt-8 pb-20 space-y-16">
      {/* Page Heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-mono mb-3">
          <Briefcase className="w-3.5 h-3.5" />
          <span>CAREER TIMELINE &bull; RESEARCH &bull; HONORS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
          Work Experience &amp; Research Track
        </h1>
        <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          From implementing reference post-quantum cryptography (Kyber) on ESP32 microcontrollers at DRDO SAG to architecting high-throughput production backends at Robotic Sir AI India.
        </p>
      </div>

      {/* 1. Professional Experience Timeline */}
      <div className="mt-0">
        <ExperienceTimeline />
      </div>

      {/* 2. Research Papers & Hackathon Honors */}
      <div className="mt-0">
        <ResearchSection />
      </div>

      {/* 3. Problem Solving & Code Contributions: LeetCode & GitHub */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-2">
            <Code2 className="w-3.5 h-3.5" />
            <span>ALGORITHMIC RIGOR &bull; OPEN-SOURCE ACTIVITY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            Problem Solving &amp; Development Footprint
          </h2>
          <p className="mt-1 text-slate-400 text-sm">
            Verified algorithmic proficiency across data structures and continuous Git contribution telemetry.
          </p>
        </div>

        <LeetCodeCard />
        <GitHubStatsCard />
      </div>
    </div>
  );
};
