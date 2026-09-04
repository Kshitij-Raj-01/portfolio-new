import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { WaitlistModal } from './components/WaitlistModal';
import { ResumeModal } from './components/ResumeModal';
import { Terminal } from 'lucide-react';

// Multi-Page Views
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { CertificationsPage } from './pages/CertificationsPage';
import { LabsPage } from './pages/LabsPage';
import { NotesPage } from './pages/NotesPage';
import { ContactPage } from './pages/ContactPage';

export const App: React.FC = () => {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[#060913] text-slate-100 relative selection:bg-cyan-500/30 selection:text-cyan-300 flex flex-col justify-between">
        {/* Interactive Background Particle Constellation */}
        <BackgroundCanvas />

        {/* Subtle global grid lines */}
        <div className="fixed inset-0 bg-grid-pattern opacity-25 pointer-events-none z-0" />

        {/* Main Application Shell */}
        <div className="relative z-10 flex-1 flex flex-col">
          {/* Header Navigation */}
          <Navbar
            onOpenTerminal={() => setTerminalOpen(true)}
            onOpenResume={() => setResumeOpen(true)}
          />

          {/* Dynamic Page Router Viewport */}
          <main className="flex-1 pt-20">
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    onOpenTerminal={() => setTerminalOpen(true)}
                    onOpenResume={() => setResumeOpen(true)}
                    onOpenWaitlist={() => setWaitlistOpen(true)}
                  />
                }
              />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/certifications" element={<CertificationsPage />} />
              <Route path="/labs" element={<LabsPage />} />
              <Route path="/notes" element={<NotesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>

        {/* Floating Terminal Quick Launcher */}
        <button
          onClick={() => setTerminalOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-slate-900/90 text-cyan-400 border border-cyan-500/40 shadow-xl shadow-black/50 hover:bg-slate-850 hover:border-cyan-400 transition-all text-xs font-mono group"
          title="Open Terminal (~)"
        >
          <Terminal className="w-4 h-4 transition-transform group-hover:rotate-6 text-cyan-400" />
          <span className="hidden sm:inline font-navbar">CLI Console</span>
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        </button>

        {/* Global Modals Accessible From Any Page */}
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
    </HashRouter>
  );
};

export default App;
