import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FollopeSpotlight } from './components/FollopeSpotlight';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ProjectsGrid } from './components/ProjectsGrid';
import { SkillsRadar } from './components/SkillsRadar';
import { LeetCodeCard } from './components/LeetCodeCard';
import { CryptoVisualizer } from './components/CryptoVisualizer';
import { SecurityLab } from './components/SecurityLab';
import { ResearchSection } from './components/ResearchSection';
import { EngineeringLog } from './components/EngineeringLog';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { WaitlistModal } from './components/WaitlistModal';
import { ResumeModal } from './components/ResumeModal';
import { Terminal } from 'lucide-react';

export const App: React.FC = () => {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 relative selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Subtle global grid lines */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none z-0" />

      {/* Main Layout */}
      <div className="relative z-10">
        <Navbar
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenResume={() => setResumeOpen(true)}
        />
        
        <main>
          <Hero
            onOpenTerminal={() => setTerminalOpen(true)}
            onOpenResume={() => setResumeOpen(true)}
          />
          <FollopeSpotlight onOpenWaitlist={() => setWaitlistOpen(true)} />
          <ExperienceTimeline />
          <ProjectsGrid />
          <SkillsRadar />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LeetCodeCard />
          </div>
          <CryptoVisualizer />
          <SecurityLab />
          <ResearchSection />
          <EngineeringLog />
          <ContactSection />
        </main>

        <Footer />
      </div>

      {/* Floating Terminal Quick Launcher */}
      <button
        onClick={() => setTerminalOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-slate-900/90 text-emerald-400 border border-emerald-500/40 shadow-xl shadow-black/40 hover:bg-slate-850 hover:border-emerald-400 transition-all text-xs font-mono group"
        title="Open Terminal (~)"
      >
        <Terminal className="w-4 h-4 transition-transform group-hover:rotate-6" />
        <span className="hidden sm:inline">CLI Console</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      </button>

      {/* Modals */}
      <InteractiveTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      <WaitlistModal
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
      />

      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
};

export default App;
