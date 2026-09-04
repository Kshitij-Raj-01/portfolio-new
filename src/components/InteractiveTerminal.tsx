import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Sparkles } from 'lucide-react';
import { PERSONAL_INFO, STARTUP_FOLLOPE, EXPERIENCES, PROJECTS, CERTIFICATIONS } from '../data/portfolioData';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'init',
      output: (
        <div className="text-slate-300 space-y-1">
          <div className="text-emerald-400 font-bold">
            Kshitij Raj Security &amp; Systems Console [v2.4.0-release]
          </div>
          <div>Type <span className="text-cyan-400 font-semibold">'help'</span> to view available commands.</div>
        </div>
      ),
    },
  ]);
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let response: React.ReactNode = null;

    switch (trimmed) {
      case 'help':
        response = (
          <div className="space-y-1 text-slate-300">
            <div className="text-emerald-400 font-semibold mb-1">Available commands:</div>
            <div><span className="text-cyan-400 w-28 inline-block">whoami</span> - About Kshitij Raj</div>
            <div><span className="text-cyan-400 w-28 inline-block">follope</span> - Inspect startup &amp; architecture</div>
            <div><span className="text-cyan-400 w-28 inline-block">drdo</span> - Scientific Analysis Group research</div>
            <div><span className="text-cyan-400 w-28 inline-block">experience</span> - Full work and internship history</div>
            <div><span className="text-cyan-400 w-28 inline-block">projects</span> - View production software projects</div>
            <div><span className="text-cyan-400 w-28 inline-block">skills</span> - Full systems &amp; backend stack</div>
            <div><span className="text-cyan-400 w-28 inline-block">certs</span> - Verified credentials &amp; certifications</div>
            <div><span className="text-cyan-400 w-28 inline-block">contact</span> - Email, phone, and links</div>
            <div><span className="text-cyan-400 w-28 inline-block">sudo hire</span> - Direct recruiter fast-track</div>
            <div><span className="text-cyan-400 w-28 inline-block">clear</span> - Clear screen</div>
          </div>
        );
        break;

      case 'whoami':
        response = (
          <div className="text-slate-300 space-y-1">
            <p className="text-emerald-400 font-bold">{PERSONAL_INFO.name}</p>
            <p>{PERSONAL_INFO.title}</p>
            <p className="text-slate-400 text-xs">{PERSONAL_INFO.tagline}</p>
            <p className="text-cyan-400 text-xs mt-1">Status: {PERSONAL_INFO.status}</p>
          </div>
        );
        break;

      case 'follope':
        response = (
          <div className="text-slate-300 space-y-1.5">
            <div className="text-emerald-400 font-bold">{STARTUP_FOLLOPE.name} — {STARTUP_FOLLOPE.tagline}</div>
            <div className="text-xs text-slate-400">{STARTUP_FOLLOPE.description}</div>
            <div className="text-xs text-cyan-400 font-mono">
              Stack: {STARTUP_FOLLOPE.techStack.join(' • ')}
            </div>
            <div className="text-amber-400 text-xs font-semibold">Status: {STARTUP_FOLLOPE.status}</div>
          </div>
        );
        break;

      case 'drdo':
        response = (
          <div className="text-slate-300 space-y-1 text-xs">
            <div className="text-emerald-400 font-bold">Scientific Analysis Group (SAG), DRDO</div>
            <div>Role: Student Intern (Jan 2026 – Present)</div>
            <div>• Investigating lattice-based cryptographic algorithms on hardware with &lt;1MB SRAM.</div>
            <div>• Adapted 4+ C/C++ crypto libraries for Arduino-based microcontrollers.</div>
          </div>
        );
        break;

      case 'experience':
        response = (
          <div className="space-y-2 text-xs text-slate-300">
            {EXPERIENCES.map((e) => (
              <div key={e.id} className="border-l-2 border-emerald-500 pl-2">
                <div className="font-bold text-emerald-400">{e.role} @ {e.company}</div>
                <div className="text-slate-400">{e.period} | {e.location}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        response = (
          <div className="space-y-1.5 text-xs text-slate-300">
            {PROJECTS.map((p) => (
              <div key={p.id} className="flex items-center justify-between border-b border-slate-800 pb-1">
                <div>
                  <span className="text-emerald-400 font-semibold">{p.title}</span>
                  <span className="text-slate-400 ml-2">({p.subtitle})</span>
                </div>
                <span className="text-slate-500 font-mono text-[10px]">{p.category}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        response = (
          <div className="text-xs space-y-1 text-slate-300">
            <div><span className="text-cyan-400 font-bold">Backend:</span> Django, Node.js, Express.js, REST APIs, Celery, Redis</div>
            <div><span className="text-cyan-400 font-bold">Databases:</span> PostgreSQL, Redis, MongoDB, MySQL</div>
            <div><span className="text-cyan-400 font-bold">Security:</span> Post-Quantum Cryptography, Lattice algorithms, Linux hardening</div>
            <div><span className="text-cyan-400 font-bold">Languages:</span> Python, TypeScript, JavaScript, C, C++, PHP, SQL</div>
            <div><span className="text-cyan-400 font-bold">DevOps:</span> Docker, CI/CD, AWS S3, Hostinger VPS, Linux</div>
          </div>
        );
        break;

      case 'certs':
      case 'certifications':
        response = (
          <div className="space-y-2 text-xs text-slate-300">
            <div className="text-emerald-400 font-bold mb-1">Verified Certifications &amp; Accreditations:</div>
            {CERTIFICATIONS.map((c) => (
              <div key={c.id} className="border-l-2 border-cyan-500 pl-2">
                <div className="font-bold text-white">{c.title}</div>
                <div className="text-cyan-400 text-[11px]">{c.issuer} • {c.badge}</div>
                <div className="text-slate-400 text-[10px] mt-0.5">{c.skills.join(', ')}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        response = (
          <div className="text-xs space-y-1 text-slate-300">
            <div>Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-emerald-400 underline">{PERSONAL_INFO.email}</a></div>
            <div>Phone: <span className="text-slate-200">{PERSONAL_INFO.phone}</span></div>
            <div>GitHub: <a href={PERSONAL_INFO.socialLinks.github} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{PERSONAL_INFO.socialLinks.github}</a></div>
            <div>LinkedIn: <a href={PERSONAL_INFO.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{PERSONAL_INFO.socialLinks.linkedin}</a></div>
            <div>LeetCode: <a href={PERSONAL_INFO.socialLinks.leetcode} target="_blank" rel="noreferrer" className="text-amber-400 underline">{PERSONAL_INFO.socialLinks.leetcode}</a></div>
          </div>
        );
        break;

      case 'sudo hire':
      case 'hire':
        response = (
          <div className="text-xs text-emerald-300 bg-emerald-950/60 p-3 rounded border border-emerald-500/50 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-sm">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>ACCESS GRANTED: Priority Candidate Connection!</span>
            </div>
            <p>Direct line to Kshitij Raj dispatched. Ready to build high-impact backend &amp; security infrastructure.</p>
            <div className="pt-2">
              <a
                href={`mailto:${PERSONAL_INFO.email}?subject=Opportunity%20Discussion%20with%20Kshitij`}
                className="inline-block px-3 py-1 bg-emerald-500 text-slate-950 rounded font-semibold text-xs"
              >
                Send Direct Email Now →
              </a>
            </div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        return;

      default:
        response = (
          <div className="text-red-400 text-xs">
            Command not recognized: <span className="font-bold">{cmd}</span>. Type <span className="text-cyan-400 font-semibold">'help'</span> for a list of valid commands.
          </div>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output: response }]);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    handleCommand(inputVal);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div
        className={`w-full ${
          isExpanded ? 'h-[90vh] max-w-6xl' : 'max-w-2xl h-[520px]'
        } flex flex-col rounded-xl bg-[#090d16] border border-slate-700 shadow-2xl overflow-hidden transition-all duration-300 font-mono`}
      >
        {/* Terminal Titlebar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={onClose} />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs text-slate-400 ml-2 font-medium flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>guest@kshitij-vps:~ (bash)</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:text-white rounded hover:bg-slate-800"
              title={isExpanded ? 'Restore' : 'Maximize'}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:text-white rounded hover:bg-slate-800"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs leading-relaxed">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-emerald-400 font-bold">➜</span>
                <span className="text-cyan-400">~</span>
                <span className="text-white">{item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Line */}
        <form
          onSubmit={onSubmit}
          className="flex items-center gap-2 px-4 py-3 bg-slate-900/90 border-t border-slate-800"
        >
          <span className="text-emerald-400 font-bold">➜</span>
          <span className="text-cyan-400 text-xs">~</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type command ('help', 'follope', 'whoami', 'skills')..."
            className="flex-1 bg-transparent border-none outline-none text-xs text-slate-100 font-mono placeholder:text-slate-600"
            autoFocus
          />
          <button
            type="submit"
            className="text-slate-400 hover:text-emerald-400 p-1"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
