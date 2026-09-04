import React, { useState } from 'react';
import { 
  Server, 
  Database, 
  ShieldCheck, 
  Cloud, 
  Code2, 
  Layout, 
  Cpu
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

const iconMap: Record<string, React.ReactNode> = {
  Server: <Server className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  Cloud: <Cloud className="w-5 h-5" />,
  Code2: <Code2 className="w-5 h-5" />,
  Layout: <Layout className="w-5 h-5" />,
};

export const SkillsRadar: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Systems, Security &amp; Engineering Stack
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Proficiencies across modern distributed backends, post-quantum crypto research, and cloud infrastructure.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-6 glass-card border transition-all duration-300 ${
                activeCategory === idx
                  ? 'border-emerald-500/60 shadow-xl shadow-emerald-500/10'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
              onMouseEnter={() => setActiveCategory(idx)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-slate-800/80 text-emerald-400 border border-slate-700/60">
                  {iconMap[cat.icon] || <Server className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {cat.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                {cat.description}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 border transition-all ${
                      skill.highlight
                        ? 'bg-slate-900 text-emerald-300 border-emerald-500/30 font-medium'
                        : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span>{skill.name}</span>
                    <span className="text-[10px] text-slate-500 font-sans">
                      • {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
