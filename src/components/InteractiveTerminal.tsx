import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Terminal as TerminalIcon,
  X,
  Maximize2,
  Minimize2,
  CornerDownLeft,
  Sparkles,
  ShieldCheck,
  Cpu,
  Lock,
  Palette,
  Binary,
  CheckCircle2,
  AlertTriangle,
  Coffee,
  Wifi,
  Quote,
} from 'lucide-react';
import {
  PERSONAL_INFO,
  STARTUP_FOLLOPE,
  EXPERIENCES,
  PROJECTS,
  CERTIFICATIONS,
} from '../data/portfolioData';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

type TerminalTheme = 'default' | 'matrix' | 'amber' | 'cyberpunk' | 'dracula';

interface ThemeConfig {
  bg: string;
  border: string;
  titleBg: string;
  promptArrow: string;
  promptTilde: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  highlight: string;
}

const THEMES: Record<TerminalTheme, ThemeConfig> = {
  default: {
    bg: 'bg-[#090d16]',
    border: 'border-slate-700',
    titleBg: 'bg-slate-900',
    promptArrow: 'text-emerald-400',
    promptTilde: 'text-cyan-400',
    textPrimary: 'text-slate-100',
    textSecondary: 'text-slate-400',
    accent: 'text-cyan-400',
    highlight: 'text-emerald-400',
  },
  matrix: {
    bg: 'bg-[#030d05]',
    border: 'border-emerald-700/80',
    titleBg: 'bg-[#06150a]',
    promptArrow: 'text-emerald-300',
    promptTilde: 'text-emerald-400',
    textPrimary: 'text-emerald-100',
    textSecondary: 'text-emerald-600',
    accent: 'text-emerald-300',
    highlight: 'text-emerald-400',
  },
  amber: {
    bg: 'bg-[#120800]',
    border: 'border-amber-700/80',
    titleBg: 'bg-[#1a0c00]',
    promptArrow: 'text-amber-400',
    promptTilde: 'text-amber-300',
    textPrimary: 'text-amber-100',
    textSecondary: 'text-amber-600',
    accent: 'text-amber-300',
    highlight: 'text-amber-400',
  },
  cyberpunk: {
    bg: 'bg-[#0c0418]',
    border: 'border-fuchsia-700/80',
    titleBg: 'bg-[#15072b]',
    promptArrow: 'text-fuchsia-400',
    promptTilde: 'text-cyan-400',
    textPrimary: 'text-pink-100',
    textSecondary: 'text-fuchsia-400/60',
    accent: 'text-cyan-300',
    highlight: 'text-fuchsia-400',
  },
  dracula: {
    bg: 'bg-[#181a26]',
    border: 'border-purple-700/80',
    titleBg: 'bg-[#212234]',
    promptArrow: 'text-purple-400',
    promptTilde: 'text-pink-400',
    textPrimary: 'text-purple-100',
    textSecondary: 'text-purple-400/60',
    accent: 'text-pink-400',
    highlight: 'text-purple-300',
  },
};

const AVAILABLE_COMMANDS = [
  'help',
  'whoami',
  'follope',
  'drdo',
  'paper',
  'experience',
  'projects',
  'skills',
  'certs',
  'contact',
  'hire',
  'neofetch',
  'pqc',
  'scan',
  'matrix',
  'ctf',
  'theme',
  'sudo',
  'coffee',
  'ping',
  'quote',
  'clear',
  'exit',
  'quit',
];

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState('');
  const [theme, setTheme] = useState<TerminalTheme>('default');
  const [matrixActive, setMatrixActive] = useState(false);
  const [cmdList, setCmdList] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'init',
      output: (
        <div className="space-y-1">
          <div className="text-emerald-400 font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Kshitij Raj Security &amp; Systems Console [v3.1.0-PROD]</span>
          </div>
          <div className="text-slate-400 text-xs">
            Specialization: <span className="text-cyan-400">Post-Quantum Cryptography &bull; Backend &bull; Web Security</span>
          </div>
          <div className="text-slate-300 text-xs mt-1">
            Type <span className="text-cyan-400 font-semibold">'help'</span> to view commands,{' '}
            <span className="text-emerald-400 font-semibold font-mono">'drdo'</span> for ESP32 Kyber work,{' '}
            <span className="text-emerald-400 font-semibold font-mono">'paper'</span> for the Vedic PQC conference research, or{' '}
            <span className="text-slate-400 font-mono">'exit'</span> to close.
          </div>
        </div>
      ),
    },
  ]);

  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Global Escape key listener to close terminal
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleGlobalKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Matrix digital rain animation
  useEffect(() => {
    if (!matrixActive || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 600;
      canvas.height = canvas.parentElement?.clientHeight || 400;
    };
    resize();

    const chars = '01アイウエオカキケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンPQC256KYBERESP32';
    const fontSize = 13;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 12, 8, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#10b981';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, [matrixActive]);

  const themeConfig = THEMES[theme];

  // Helper for simulated PQC encryption
  const runPqcSimulation = (msg: string) => {
    const textToEncrypt = msg || 'CONFIDENTIAL_PAYLOAD_v1';
    const hexRep = Array.from(textToEncrypt)
      .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('');
    const simulatedLatticeKey = Array.from({ length: 8 }, () =>
      Math.floor(Math.random() * 0xffff)
        .toString(16)
        .padStart(4, '0')
    ).join(':');

    return (
      <div className="space-y-2 text-xs font-mono p-3 rounded-xl bg-black/40 border border-emerald-500/30">
        <div className="flex items-center gap-2 text-emerald-400 font-bold">
          <Lock className="w-4 h-4" />
          <span>CRYSTALS-Kyber (ML-KEM) Post-Quantum Simulator</span>
        </div>
        <div className="text-slate-400 text-[11px]">
          Simulating NIST Kyber lattice-based Key Encapsulation (reference scheme implemented on ESP32 at DRDO SAG).
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
          <div className="p-2 rounded bg-slate-900/90 border border-slate-800">
            <span className="text-slate-500 block">POLYNOMIAL RING:</span>
            <span className="text-cyan-400 font-bold">R_q = Z_q[X]/(X^256 + 1)</span>
          </div>
          <div className="p-2 rounded bg-slate-900/90 border border-slate-800">
            <span className="text-slate-500 block">TARGET MODULUS (q):</span>
            <span className="text-cyan-400 font-bold">3329 (Kyber Standard)</span>
          </div>
        </div>
        <div className="text-[11px] text-slate-300 space-y-1">
          <div>[1] Sampled uniform random matrix A ∈ R_q^(k×k)</div>
          <div>[2] Injected centered binomial distribution noise e ← B_η</div>
          <div>[3] Computed public key t = A·s + e (mod q)</div>
          <div>[4] Payload Hex: <span className="text-amber-400">{hexRep}</span></div>
        </div>
        <div className="pt-2 border-t border-slate-800/80">
          <span className="text-slate-500 text-[10px] block">QUANTUM-RESILIENT CIPHERTEXT VECTOR (c1, c2):</span>
          <div className="text-emerald-400 font-mono text-[11px] break-all bg-emerald-950/40 p-2 rounded border border-emerald-500/20">
            PQC_KYBER_{simulatedLatticeKey}:{hexRep.slice(0, 8)}_SHOR_RESISTANT
          </div>
        </div>
        <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Lattice problem status: Shortest Vector Problem (SVP) unbroken by quantum computing.</span>
        </div>
      </div>
    );
  };

  // Helper for Security Scanner
  const runSecurityAudit = () => {
    return (
      <div className="space-y-2 text-xs font-mono p-3.5 rounded-xl bg-black/40 border border-cyan-500/30">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2 text-cyan-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>SERVER SECURITY &amp; ARCHITECTURE AUDIT</span>
          </div>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
            SCORE: 100/100 (A+)
          </span>
        </div>

        <div className="space-y-1.5 pt-1 text-[11px]">
          <div className="flex items-center justify-between text-slate-300">
            <span>[+] OWASP Top-10 Injection (SQLi / NoSQL / Command)</span>
            <span className="text-emerald-400 font-bold">PASS (Parameterized)</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span>[+] IDOR Mitigation (CUID Tokens &amp; User Scoping)</span>
            <span className="text-emerald-400 font-bold">ENFORCED</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span>[+] Financial Engine Precision (Zero Floating-Point)</span>
            <span className="text-emerald-400 font-bold">INTEGER PAISE</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span>[+] Rate Limiting &amp; Reverse Proxy Hardening</span>
            <span className="text-emerald-400 font-bold">ACTIVE (Express + Nginx)</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span>[+] Auth Security (Argon2 / SHA-256 Token Rotation)</span>
            <span className="text-emerald-400 font-bold">HARDENED</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span>[+] Post-Quantum Cryptographic Readiness (LWE)</span>
            <span className="text-emerald-400 font-bold">RESEARCHED (DRDO)</span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
          ✓ All defensive perimeters evaluated. Production infrastructure certified resilient.
        </div>
      </div>
    );
  };

  // Helper for Neofetch output
  const runNeofetch = () => {
    return (
      <div className="flex flex-col sm:flex-row gap-4 p-3 rounded-xl bg-black/40 border border-slate-800 font-mono text-xs">
        <div className="text-cyan-400 font-bold leading-tight select-none shrink-0 hidden sm:block">
          <pre>{`
       /\\
      /  \\
     / /\\ \\
    / /  \\ \\
   / / /\\ \\ \\
  / / /  \\ \\ \\
 /_/ /    \\ \\_\\
 \\_\\/      \\/_/
          `}</pre>
        </div>
        <div className="space-y-1 flex-1">
          <div className="text-emerald-400 font-bold text-sm">
            kshitij@raj-systems-vps
          </div>
          <div className="text-slate-500 text-[10px] border-b border-slate-800 pb-1">
            -------------------------------
          </div>
          <div><span className="text-cyan-400 font-bold w-24 inline-block">OS:</span> KshitijOS (Debian GNU/Linux Hardened)</div>
          <div><span className="text-cyan-400 font-bold w-24 inline-block">Kernel:</span> 6.8.0-pqc-lattice-x86_64</div>
          <div><span className="text-cyan-400 font-bold w-24 inline-block">Uptime:</span> 3+ Years in Production Code</div>
          <div><span className="text-cyan-400 font-bold w-24 inline-block">Shell:</span> bash 5.2.21 (Interactive Portfolio CLI)</div>
          <div><span className="text-cyan-400 font-bold w-24 inline-block">Flagship:</span> Follope FinTech SaaS (Express + Prisma + UPI)</div>
          <div><span className="text-cyan-400 font-bold w-24 inline-block">DRDO SAG:</span> Implemented Reference Kyber on ESP32 Microcontrollers</div>
          <div><span className="text-cyan-400 font-bold w-24 inline-block">Paper:</span> Vedic PQC Optimizations (National Conference)</div>
          <div><span className="text-cyan-400 font-bold w-24 inline-block">Algorithms:</span> 107 Solved LeetCode Milestone</div>
          <div><span className="text-cyan-400 font-bold w-24 inline-block">Public Repos:</span> 17 GitHub Repositories (TypeScript, JS, Python)</div>
          <div className="pt-2 flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-slate-900 border border-slate-700 inline-block" />
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-purple-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-cyan-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-white inline-block" />
          </div>
        </div>
      </div>
    );
  };

  const handleCommand = useCallback((cmd: string) => {
    const rawTrimmed = cmd.trim();
    const parts = rawTrimmed.split(' ');
    const mainCmd = parts[0]?.toLowerCase() || '';
    const arg = parts.slice(1).join(' ').trim();

    let response: React.ReactNode = null;

    switch (mainCmd) {
      case 'help':
        response = (
          <div className="space-y-3 text-slate-300">
            <div>
              <div className="text-emerald-400 font-bold mb-1">Standard Directory Commands:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs">
                <div><span className="text-cyan-400 w-24 inline-block font-mono">whoami</span> About Kshitij Raj</div>
                <div><span className="text-cyan-400 w-24 inline-block font-mono">follope</span> Inspect FinTech architecture</div>
                <div><span className="text-cyan-400 w-24 inline-block font-mono">drdo</span> Implemented Kyber on ESP32</div>
                <div><span className="text-cyan-400 w-24 inline-block font-mono">paper</span> Vedic PQC National Conference Paper</div>
                <div><span className="text-cyan-400 w-24 inline-block font-mono">experience</span> Career &amp; internship track</div>
                <div><span className="text-cyan-400 w-24 inline-block font-mono">projects</span> Production software portfolio</div>
                <div><span className="text-cyan-400 w-24 inline-block font-mono">skills</span> Systems &amp; backend stack</div>
                <div><span className="text-cyan-400 w-24 inline-block font-mono">certs</span> Verified accreditations</div>
                <div><span className="text-cyan-400 w-24 inline-block font-mono">contact</span> Direct email &amp; social profiles</div>
                <div><span className="text-cyan-400 w-24 inline-block font-mono">hire</span> Fast-track recruiter line</div>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-2">
              <div className="text-cyan-300 font-bold mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Creative Labs &amp; Tools:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs">
                <div><span className="text-emerald-400 w-24 inline-block font-mono">neofetch</span> ASCII system telemetry</div>
                <div><span className="text-emerald-400 w-24 inline-block font-mono">pqc [text]</span> Post-quantum Kyber simulator</div>
                <div><span className="text-emerald-400 w-24 inline-block font-mono">scan</span> Run defensive server audit</div>
                <div><span className="text-emerald-400 w-24 inline-block font-mono">matrix</span> Toggle digital rain mode</div>
                <div><span className="text-emerald-400 w-24 inline-block font-mono">ctf</span> Cybersecurity flag challenge</div>
                <div><span className="text-emerald-400 w-24 inline-block font-mono">theme</span> Switch theme (matrix/amber/etc)</div>
                <div><span className="text-emerald-400 w-24 inline-block font-mono">sudo [cmd]</span> Escalate to root privileges</div>
                <div><span className="text-emerald-400 w-24 inline-block font-mono">coffee</span> Brew engineer fuel</div>
                <div><span className="text-emerald-400 w-24 inline-block font-mono">ping [host]</span> ICMP latency probe</div>
                <div><span className="text-emerald-400 w-24 inline-block font-mono">quote</span> Systems &amp; crypto philosophy</div>
                <div><span className="text-emerald-400 w-24 inline-block font-mono">clear</span> Reset console screen</div>
                <div><span className="text-emerald-400 w-24 inline-block font-mono">exit</span> Close terminal window</div>
              </div>
            </div>
          </div>
        );
        break;

      case 'neofetch':
        response = runNeofetch();
        break;

      case 'pqc':
      case 'crypto':
        response = runPqcSimulation(arg);
        break;

      case 'scan':
      case 'audit':
        response = runSecurityAudit();
        break;

      case 'matrix':
        setMatrixActive((prev) => !prev);
        response = (
          <div className="text-emerald-400 font-mono text-xs flex items-center gap-2">
            <Binary className="w-4 h-4 animate-spin" />
            <span>
              Matrix digital rain {matrixActive ? 'DEACTIVATED' : 'ACTIVATED'}. Type{' '}
              <span className="text-white font-bold">'matrix'</span> again to toggle.
            </span>
          </div>
        );
        break;

      case 'theme': {
        const targetTheme = arg.toLowerCase() as TerminalTheme;
        if (['default', 'matrix', 'amber', 'cyberpunk', 'dracula'].includes(targetTheme)) {
          setTheme(targetTheme);
          response = (
            <div className="text-xs font-mono text-cyan-400 flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <span>Theme updated to <strong className="text-white uppercase">{targetTheme}</strong>.</span>
            </div>
          );
        } else {
          response = (
            <div className="text-xs font-mono text-slate-300 space-y-1">
              <div>Available themes:</div>
              <div className="flex gap-2 font-bold">
                <span className="text-emerald-400">matrix</span> |{' '}
                <span className="text-amber-400">amber</span> |{' '}
                <span className="text-fuchsia-400">cyberpunk</span> |{' '}
                <span className="text-purple-400">dracula</span> |{' '}
                <span className="text-cyan-400">default</span>
              </div>
              <div className="text-slate-500 text-[11px]">Usage: theme &lt;name&gt; (e.g. `theme amber`)</div>
            </div>
          );
        }
        break;
      }

      case 'ctf':
      case 'challenge':
        response = (
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-purple-500/40 font-mono text-xs space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-bold">
              <Cpu className="w-4 h-4" />
              <span>SECURITY RECRUITER CTF: Challenge #1</span>
            </div>
            <p className="text-slate-300">
              An intercepted Base64 authorization token was discovered on the perimeter server:
            </p>
            <div className="p-2 rounded bg-purple-950/40 border border-purple-500/30 text-emerald-400 select-all break-all">
              RkxBR3tLU0hJVElKX1NZU1RFTVNfQkFDS0VORF9BQ0V9
            </div>
            <p className="text-slate-400 text-[11px]">
              Decode this base64 token using <code className="text-cyan-300">decode &lt;base64&gt;</code> or type{' '}
              <code className="text-cyan-300">solve &lt;flag&gt;</code> to claim victory!
            </p>
          </div>
        );
        break;

      case 'decode': {
        if (!arg) {
          response = <div className="text-amber-400 text-xs">Usage: decode &lt;base64_string&gt;</div>;
        } else {
          try {
            const decoded = atob(arg.trim());
            response = (
              <div className="text-xs font-mono p-2 rounded bg-emerald-950/40 border border-emerald-500/40 text-emerald-300">
                <span>Decoded Output: </span>
                <strong className="text-white">{decoded}</strong>
              </div>
            );
          } catch {
            response = <div className="text-red-400 text-xs">Error: Invalid base64 sequence.</div>;
          }
        }
        break;
      }

      case 'solve': {
        const cleaned = arg.toUpperCase().trim();
        if (cleaned.includes('KSHITIJ') && cleaned.includes('FLAG')) {
          response = (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 font-mono text-xs space-y-1">
              <div className="font-bold text-sm text-emerald-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>FLAG ACCEPTED! YOU SOLVED THE CTF!</span>
              </div>
              <p>Congratulations! You just cracked the challenge. Kshitij Raj is ready to engineer resilient systems for your team.</p>
              <div className="pt-2">
                <a
                  href={`mailto:${PERSONAL_INFO.email}?subject=CTF%20Solved!%20Interview%20Invitation`}
                  className="px-3 py-1 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded inline-block"
                >
                  Claim Recruiter Priority Line →
                </a>
              </div>
            </div>
          );
        } else {
          response = (
            <div className="text-red-400 text-xs font-mono flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <span>Incorrect flag submission. Hint: Check `ctf` token and decode it!</span>
            </div>
          );
        }
        break;
      }

      case 'whoami':
        response = (
          <div className="space-y-1 text-xs">
            <p className="text-emerald-400 font-bold text-sm">{PERSONAL_INFO.name}</p>
            <p className="text-white">{PERSONAL_INFO.title}</p>
            <p className="text-slate-400">{PERSONAL_INFO.tagline}</p>
            <p className="text-cyan-400 text-[11px] mt-1">Status: {PERSONAL_INFO.status}</p>
          </div>
        );
        break;

      case 'follope':
        response = (
          <div className="space-y-1.5 text-xs">
            <div className="text-emerald-400 font-bold text-sm">
              {STARTUP_FOLLOPE.name} — {STARTUP_FOLLOPE.tagline}
            </div>
            <div className="text-slate-300">{STARTUP_FOLLOPE.description}</div>
            <div className="text-cyan-400 font-mono text-[11px]">
              Stack: {STARTUP_FOLLOPE.techStack.join(' • ')}
            </div>
            <div className="text-amber-400 font-semibold text-[11px]">Status: {STARTUP_FOLLOPE.status}</div>
          </div>
        );
        break;

      case 'drdo':
        response = (
          <div className="space-y-1.5 text-xs">
            <div className="text-emerald-400 font-bold text-sm">
              Scientific Analysis Group (SAG), DRDO — Student Intern
            </div>
            <div className="text-cyan-400 font-semibold text-[11px]">
              Implementation: Porting CRYSTALS-Kyber (ML-KEM) to ESP32 Microcontrollers
            </div>
            <div className="text-slate-300 text-[11px] space-y-1 mt-1">
              <div>• Implemented and adapted reference C/C++ CRYSTALS-Kyber post-quantum cryptographic primitives on ESP32 hardware with strict SRAM constraints (&lt;520KB).</div>
              <div>• Optimized static memory layout, avoided dynamic memory fragmentation, and verified functional equivalence against NIST test vectors.</div>
              <div>• Interfaced serial communication and benchmarked key generation, encapsulation, and decapsulation cycle counts on ESP32 development boards.</div>
            </div>
            <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800">
              Note: This DRDO work was an embedded implementation of existing Kyber on hardware. For the theoretical Vedic PQC optimization paper, type <span className="text-cyan-400 font-bold">'paper'</span>.
            </div>
          </div>
        );
        break;

      case 'paper':
      case 'research':
      case 'conference':
      case 'vedic':
        response = (
          <div className="space-y-1.5 text-xs">
            <div className="text-emerald-400 font-bold text-sm">
              Research Paper: Integrating Vedic Mathematics in Post-Quantum Cryptography
            </div>
            <div className="text-cyan-400 font-semibold text-[11px]">
              Submitted at: National Conference on Contemporary Applications and Expanding Horizons of Indian Knowledge from Vedic Insights
            </div>
            <div className="text-slate-300 text-[11px] space-y-1 mt-1">
              <div>• Research paper submitted in college investigating mathematical and algorithmic optimizations for quantum-resilient lattice cryptography.</div>
              <div>• Explored classical Vedic mathematical formulas (Urdhva Tiryagbhyam vertically-and-crosswise multiplication &amp; Nikhilam method) to accelerate polynomial Ring-LWE modular arithmetic.</div>
              <div>• Demonstrated clock cycle reductions in modular polynomial multiplication steps.</div>
            </div>
            <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800">
              Status: Abstract Published / Full Paper Under Review. (Distinct from the DRDO SAG embedded Kyber porting project).
            </div>
          </div>
        );
        break;

      case 'experience':
        response = (
          <div className="space-y-2 text-xs">
            {EXPERIENCES.map((e) => (
              <div key={e.id} className="border-l-2 border-emerald-500 pl-2">
                <div className="font-bold text-emerald-400">{e.role} @ {e.company}</div>
                <div className="text-slate-400 text-[11px]">{e.period} | {e.location}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        response = (
          <div className="space-y-1.5 text-xs">
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
          <div className="text-xs space-y-1">
            <div><span className="text-cyan-400 font-bold">Backend:</span> Node.js, Express.js, TypeScript, Django, REST APIs, Celery, Redis</div>
            <div><span className="text-cyan-400 font-bold">Databases:</span> PostgreSQL, Prisma ORM, MongoDB, Redis, MySQL</div>
            <div><span className="text-cyan-400 font-bold">Security:</span> Post-Quantum Cryptography (Lattice / LWE), Linux Hardening, OWASP</div>
            <div><span className="text-cyan-400 font-bold">Languages:</span> TypeScript, JavaScript, Python, C, C++, PHP, SQL</div>
            <div><span className="text-cyan-400 font-bold">DevOps &amp; Cloud:</span> Docker, Linux VPS, Nginx, AWS S3, CI/CD</div>
          </div>
        );
        break;

      case 'certs':
      case 'certifications':
        response = (
          <div className="space-y-2 text-xs">
            <div className="text-emerald-400 font-bold mb-1">Verified Credentials:</div>
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
          <div className="text-xs space-y-1">
            <div>Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-emerald-400 underline">{PERSONAL_INFO.email}</a></div>
            <div>Phone: <span className="text-slate-200">{PERSONAL_INFO.phone}</span></div>
            <div>GitHub: <a href={PERSONAL_INFO.socialLinks.github} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{PERSONAL_INFO.socialLinks.github}</a></div>
            <div>LinkedIn: <a href={PERSONAL_INFO.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{PERSONAL_INFO.socialLinks.linkedin}</a></div>
            <div>LeetCode: <a href={PERSONAL_INFO.socialLinks.leetcode} target="_blank" rel="noreferrer" className="text-amber-400 underline">{PERSONAL_INFO.socialLinks.leetcode}</a></div>
          </div>
        );
        break;

      case 'hire':
        response = (
          <div className="text-xs text-emerald-300 bg-emerald-950/60 p-3 rounded-xl border border-emerald-500/50 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-sm">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>ACCESS GRANTED: Priority Candidate Connection!</span>
            </div>
            <p>Direct line to Kshitij Raj dispatched. Ready to build high-impact backend &amp; security infrastructure.</p>
            <div className="pt-2">
              <a
                href={`mailto:${PERSONAL_INFO.email}?subject=Opportunity%20Discussion%20with%20Kshitij`}
                className="inline-block px-3 py-1 bg-emerald-500 text-slate-950 rounded font-semibold text-xs hover:bg-emerald-400 transition-colors"
              >
                Send Direct Email Now →
              </a>
            </div>
          </div>
        );
        break;

      case 'sudo':
        response = (
          <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 font-mono text-xs space-y-1.5 text-red-200">
            <div className="flex items-center gap-2 font-bold text-red-400">
              <ShieldCheck className="w-4 h-4 text-red-400" />
              <span>[SECURITY ALERT] Root escalation intercepted!</span>
            </div>
            <p className="text-slate-300">
              User <code className="text-white font-bold">guest@portfolio</code> is not in the sudoers file.
            </p>
            <div className="p-2 rounded bg-black/60 border border-red-500/30 text-amber-300 text-[11px]">
              Post-Quantum Zero-Trust policy enforced by Kshitij Raj. Incident logged to DRDO SOC audit trail.
            </div>
          </div>
        );
        break;

      case 'coffee':
      case 'brew':
        response = (
          <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 font-mono text-xs space-y-2 text-amber-200">
            <div className="flex items-center gap-2 font-bold text-amber-400">
              <Coffee className="w-4 h-4 text-amber-300" />
              <span>Brewing Fresh Developer Espresso (100% Arabica)...</span>
            </div>
            <pre className="text-[10px] text-amber-300 font-mono leading-tight select-none">
{`   ( (
    ) )
  ........
  |      |]
  \\      /   [200 OK] 64oz Backend Fuel Dispatched
   \`----'    Ready to squash bugs and optimize database indices.`}
            </pre>
            <div className="text-[11px] text-slate-400">
              Fueled and ready for late-night FinTech &amp; cryptography development sprints.
            </div>
          </div>
        );
        break;

      case 'ping': {
        const target = arg ? arg.trim() : 'rajkshitij.dev';
        const ms1 = Math.floor(Math.random() * 8) + 12;
        const ms2 = Math.floor(Math.random() * 6) + 10;
        const ms3 = Math.floor(Math.random() * 7) + 11;
        const avg = ((ms1 + ms2 + ms3) / 3).toFixed(1);
        response = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
              <Wifi className="w-3.5 h-3.5" />
              <span>PING {target} (127.0.0.1): 56 data bytes</span>
            </div>
            <div className="text-slate-400 text-[11px] space-y-0.5">
              <div>64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time={ms1}.2 ms</div>
              <div>64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time={ms2}.8 ms</div>
              <div>64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time={ms3}.1 ms</div>
            </div>
            <div className="text-emerald-400 pt-1 text-[11px] border-t border-slate-800">
              --- {target} ping statistics --- 3 packets transmitted, 3 received, 0% packet loss, avg = {avg}ms
            </div>
          </div>
        );
        break;
      }

      case 'quote':
      case 'fortune': {
        const quotes = [
          { quote: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
          { quote: "There are two kinds of cryptography: that which will stop a child, and that which will stop major governments.", author: "Bruce Schneier" },
          { quote: "Simplicity is prerequisite for reliability.", author: "Edsger W. Dijkstra" },
          { quote: "Information is the resolution of uncertainty.", author: "Claude Shannon" },
          { quote: "Any system is only as secure as its weakest cryptographic primitive.", author: "Systems Engineering Axiom" },
        ];
        const selected = quotes[Math.floor(Math.random() * quotes.length)];
        response = (
          <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs font-mono space-y-1.5">
            <div className="flex items-center gap-2 text-purple-400 font-bold">
              <Quote className="w-3.5 h-3.5 text-purple-300" />
              <span>Dev &amp; Cryptography Wisdom:</span>
            </div>
            <blockquote className="text-slate-200 italic pl-2 border-l-2 border-purple-400">
              "{selected.quote}"
            </blockquote>
            <div className="text-right text-purple-300 text-[11px] font-semibold">
              — {selected.author}
            </div>
          </div>
        );
        break;
      }

      case 'exit':
      case 'quit':
      case ':q':
      case 'close':
        onClose();
        return;

      case 'clear':
        setHistory([]);
        return;

      default:
        response = (
          <div className="text-red-400 text-xs">
            Command not recognized: <span className="font-bold">{cmd}</span>. Type{' '}
            <span className="text-cyan-400 font-semibold">'help'</span> for a list of valid commands or{' '}
            <span className="text-white font-semibold">'exit'</span> to close.
          </div>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output: response }]);
    setCmdList((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
  }, [matrixActive, onClose]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    handleCommand(inputVal);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Arrow Up: Previous command
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdList.length === 0) return;
      const nextIndex = historyIndex === -1 ? cmdList.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(cmdList[nextIndex]);
    }
    // Arrow Down: Next command
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= cmdList.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(cmdList[nextIndex]);
      }
    }
    // Tab: Auto-complete
    else if (e.key === 'Tab') {
      e.preventDefault();
      const current = inputVal.trim().toLowerCase();
      if (!current) return;
      const match = AVAILABLE_COMMANDS.find((c) => c.startsWith(current));
      if (match) {
        setInputVal(match);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn cursor-pointer"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full ${
          isExpanded ? 'h-[92vh] max-w-6xl' : 'max-w-3xl h-[560px]'
        } flex flex-col rounded-2xl ${themeConfig.bg} border ${
          themeConfig.border
        } shadow-2xl overflow-hidden transition-all duration-300 font-mono relative cursor-default`}
      >
        {/* Matrix Canvas Layer */}
        {matrixActive && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none opacity-25 z-0"
          />
        )}

        {/* Terminal Titlebar */}
        <div
          className={`flex items-center justify-between px-4 py-3 ${themeConfig.titleBg} border-b border-slate-800/80 select-none relative z-10`}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer transition-colors shadow-sm"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              title="Close terminal (Esc or 'exit')"
            />
            <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/80" />
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/80" />
            <span className="text-xs text-slate-400 ml-2 font-medium flex items-center gap-1.5">
              <TerminalIcon className={`w-3.5 h-3.5 ${themeConfig.promptArrow}`} />
              <span>guest@kshitij-vps:~ (bash)</span>
              {matrixActive && (
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/30 animate-pulse">
                  [MATRIX]
                </span>
              )}
            </span>
          </div>

          {/* Quick theme selector and controls */}
          <div className="flex items-center gap-2 text-slate-400">
            <button
              type="button"
              onClick={() => {
                const themes: TerminalTheme[] = ['default', 'matrix', 'amber', 'cyberpunk', 'dracula'];
                const next = themes[(themes.indexOf(theme) + 1) % themes.length];
                setTheme(next);
              }}
              className="px-2 py-0.5 rounded text-[10px] bg-slate-800 hover:text-white border border-slate-700/60 hidden sm:flex items-center gap-1"
              title="Cycle terminal theme"
            >
              <Palette className="w-2.5 h-2.5" />
              <span>{theme}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:text-white rounded hover:bg-slate-800 transition-colors"
              title={isExpanded ? 'Restore' : 'Maximize'}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-1 hover:text-white rounded hover:bg-slate-800 transition-colors text-slate-400"
              title="Close terminal (Esc or 'exit')"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3.5 text-xs leading-relaxed relative z-10">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center gap-2 text-slate-400">
                <span className={`${themeConfig.promptArrow} font-bold`}>➜</span>
                <span className={themeConfig.promptTilde}>~</span>
                <span className={themeConfig.textPrimary}>{item.command}</span>
              </div>
              <div className={`pl-4 ${themeConfig.textPrimary}`}>{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Line */}
        <form
          onSubmit={onSubmit}
          className={`flex items-center gap-2 px-4 py-3 ${themeConfig.titleBg} border-t border-slate-800/80 relative z-10`}
        >
          <span className={`${themeConfig.promptArrow} font-bold`}>➜</span>
          <span className={`${themeConfig.promptTilde} text-xs`}>~</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'neofetch', 'pqc', 'scan', 'matrix', 'ctf'..."
            className={`flex-1 bg-transparent border-none outline-none text-xs ${themeConfig.textPrimary} font-mono placeholder:text-slate-600`}
            autoFocus
          />
          <button
            type="submit"
            className="text-slate-400 hover:text-emerald-400 p-1 transition-colors"
            title="Execute command"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};

