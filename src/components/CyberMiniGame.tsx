import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, Play, RotateCcw, Shield, Flame } from 'lucide-react';

interface Threat {
  id: number;
  x: number;
  y: number;
  speed: number;
  type: 'ddos' | 'sqli' | 'bot' | 'quantum';
  label: string;
  color: string;
  radius: number;
}

interface Bullet {
  id: number;
  x: number;
  y: number;
  speed: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
}

export const CyberMiniGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      return Number(localStorage.getItem('cyber_defense_highscore') || 0);
    } catch {
      return 0;
    }
  });
  const [serverHealth, setServerHealth] = useState<number>(100);
  const [wave, setWave] = useState<number>(1);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameStateRef = useRef({
    playerX: 200,
    isFiring: false,
    threats: [] as Threat[],
    bullets: [] as Bullet[],
    particles: [] as Particle[],
    lastSpawn: 0,
    lastShot: 0,
  });

  const startGame = () => {
    setScore(0);
    setServerHealth(100);
    setWave(1);
    setIsGameOver(false);
    setIsPlaying(true);

    gameStateRef.current = {
      playerX: 200,
      isFiring: false,
      threats: [],
      bullets: [],
      particles: [],
      lastSpawn: Date.now(),
      lastShot: 0,
    };
  };

  useEffect(() => {
    if (!isPlaying) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = 600);
    const height = (canvas.height = 360);

    gameStateRef.current.playerX = width / 2;

    const threatTypes: Array<{ type: Threat['type']; label: string; color: string; speed: number }> = [
      { type: 'ddos', label: 'SYN_FLOOD', color: '#f43f5e', speed: 1.2 },
      { type: 'sqli', label: 'SQLi_RAW', color: '#f59e0b', speed: 1.5 },
      { type: 'bot', label: 'BOT_PROBE', color: '#06b6d4', speed: 1.8 },
      { type: 'quantum', label: 'SHOR_ATTACK', color: '#a855f7', speed: 2.1 },
    ];

    // Mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      gameStateRef.current.playerX = Math.max(30, Math.min(width - 30, (e.clientX - rect.left) * scaleX));
    };

    const handleMouseDown = () => {
      const now = Date.now();
      if (now - gameStateRef.current.lastShot > 180) {
        gameStateRef.current.bullets.push({
          id: now,
          x: gameStateRef.current.playerX,
          y: height - 40,
          speed: 7,
        });
        gameStateRef.current.lastShot = now;
      }
    };

    // Keyboard support
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        gameStateRef.current.playerX = Math.max(30, gameStateRef.current.playerX - 25);
      } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        gameStateRef.current.playerX = Math.min(width - 30, gameStateRef.current.playerX + 25);
      } else if (e.code === 'Space') {
        e.preventDefault();
        handleMouseDown();
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('keydown', handleKeyDown);

    // Main Game Loop
    const loop = () => {
      ctx.fillStyle = '#070b14';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle cyber grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const now = Date.now();
      const state = gameStateRef.current;

      // Spawn threats
      const spawnInterval = Math.max(700, 1600 - wave * 180);
      if (now - state.lastSpawn > spawnInterval) {
        const threatMeta = threatTypes[Math.floor(Math.random() * threatTypes.length)];
        state.threats.push({
          id: now,
          x: Math.random() * (width - 60) + 30,
          y: 10,
          speed: threatMeta.speed + wave * 0.2,
          type: threatMeta.type,
          label: threatMeta.label,
          color: threatMeta.color,
          radius: 12,
        });
        state.lastSpawn = now;
      }

      // Update & Draw Bullets (Cryptographic Patches)
      for (let i = state.bullets.length - 1; i >= 0; i--) {
        const b = state.bullets[i];
        b.y -= b.speed;

        ctx.fillStyle = '#00f2fe';
        ctx.shadowColor = '#00f2fe';
        ctx.shadowBlur = 8;
        ctx.fillRect(b.x - 2, b.y, 4, 12);
        ctx.shadowBlur = 0;

        if (b.y < 0) {
          state.bullets.splice(i, 1);
        }
      }

      // Update & Draw Threats
      for (let i = state.threats.length - 1; i >= 0; i--) {
        const t = state.threats[i];
        t.y += t.speed;

        // Draw threat node
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
        ctx.fillStyle = t.color;
        ctx.shadowColor = t.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Threat Label
        ctx.font = '8px monospace';
        ctx.fillStyle = '#cbd5e1';
        ctx.textAlign = 'center';
        ctx.fillText(t.label, t.x, t.y - 15);

        // Check collision with bullets
        for (let j = state.bullets.length - 1; j >= 0; j--) {
          const b = state.bullets[j];
          const dist = Math.hypot(t.x - b.x, t.y - b.y);

          if (dist < t.radius + 6) {
            // Hit!
            // Spawn explosion particles
            for (let p = 0; p < 8; p++) {
              state.particles.push({
                x: t.x,
                y: t.y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                alpha: 1,
                color: t.color,
              });
            }

            state.threats.splice(i, 1);
            state.bullets.splice(j, 1);

            setScore((prev) => {
              const newScore = prev + 10;
              if (newScore > highScore) {
                setHighScore(newScore);
                try {
                  localStorage.setItem('cyber_defense_highscore', String(newScore));
                } catch {
                  // Ignore
                }
              }
              if (newScore % 60 === 0) {
                setWave((w) => w + 1);
              }
              return newScore;
            });
            break;
          }
        }

        // Threat reached server node
        if (t.y >= height - 40) {
          state.threats.splice(i, 1);
          setServerHealth((prev) => {
            const next = prev - 15;
            if (next <= 0) {
              setIsGameOver(true);
              setIsPlaying(false);
              return 0;
            }
            return next;
          });
        }
      }

      // Update & Draw Particles
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const p = state.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.04;

        if (p.alpha <= 0) {
          state.particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fillRect(p.x, p.y, 2.5, 2.5);
        ctx.globalAlpha = 1;
      }

      // Draw Player Server Firewall Node
      const px = state.playerX;
      const py = height - 25;

      // Base server shield
      ctx.fillStyle = '#10b981';
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(px, py - 14);
      ctx.lineTo(px + 22, py + 10);
      ctx.lineTo(px - 22, py + 10);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;

      // Canon tip
      ctx.fillStyle = '#00f2fe';
      ctx.fillRect(px - 3, py - 20, 6, 8);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPlaying, wave, highScore]);

  return (
    <section id="cyber-game" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>INTERACTIVE BACKEND &bull; EASTER EGG</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Cyber Packet Defender Mini-Game
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl">
              Defend your server firewall from descending malicious packets (SYN Floods, SQL Injections, and Botnet Probes). Aim with cursor, fire cryptographic patches with Click or Spacebar!
            </p>
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0 font-mono text-xs">
            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
              <div className="text-slate-500 text-[10px]">ALL-TIME RECORD</div>
              <div className="text-base font-bold text-amber-400">{highScore} PTS</div>
            </div>
          </div>
        </div>

        {/* Game Container */}
        <div className="max-w-3xl mx-auto rounded-2xl glass-card border border-slate-800 shadow-2xl p-4 sm:p-6 overflow-hidden">
          {/* Game HUD Bar */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 font-mono text-xs">
            <div className="flex items-center gap-4">
              <span className="text-slate-300">
                SCORE: <strong className="text-cyan-400 text-sm">{score}</strong>
              </span>
              <span className="text-slate-400">
                WAVE: <strong className="text-violet-400">{wave}</strong>
              </span>
            </div>

            {/* Health bar */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[11px]">SERVER INTEGRITY:</span>
              <div className="w-28 h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                <div
                  className={`h-full transition-all duration-300 ${
                    serverHealth > 50
                      ? 'bg-emerald-400'
                      : serverHealth > 25
                      ? 'bg-amber-400'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${serverHealth}%` }}
                />
              </div>
              <span
                className={`font-bold text-[11px] ${
                  serverHealth > 50 ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {serverHealth}%
              </span>
            </div>
          </div>

          {/* Canvas Viewport */}
          <div className="relative rounded-xl overflow-hidden bg-[#070b14] border border-slate-850 flex items-center justify-center">
            <canvas
              ref={canvasRef}
              className="w-full max-w-[600px] h-[360px] cursor-crosshair block mx-auto"
            />

            {/* Start Screen Overlay */}
            {!isPlaying && !isGameOver && (
              <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <Shield className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-display">
                    Ready to Defend the VPS?
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm mt-1">
                    Move your firewall shield with cursor. Tap or press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 font-mono">SPACE</kbd> to launch cryptographic packet mitigation.
                  </p>
                </div>
                <button
                  onClick={startGame}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold font-mono text-xs hover:bg-cyan-400 transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/30 hover:scale-105"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Start Defense Wave 1</span>
                </button>
              </div>
            )}

            {/* Game Over Screen */}
            {isGameOver && (
              <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-red-500/20 text-red-400 border border-red-500/40 flex items-center justify-center">
                  <Flame className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white font-display">
                    Server Overwhelmed!
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    Final Score: <strong className="text-cyan-400 text-sm">{score} PTS</strong> &bull; Wave: {wave}
                  </p>
                </div>
                <button
                  onClick={startGame}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold font-mono text-xs hover:bg-emerald-400 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/30"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reboot Server &amp; Retry</span>
                </button>
              </div>
            )}
          </div>

          {/* Bottom Game Controls Guide */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-500">
            <div>Controls: Mouse Move / A-D to aim &bull; Click / Space to fire</div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500" /> SYN Flood
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> SQL Injection
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400" /> Bot Probe
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-purple-500" /> Quantum Threat
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
