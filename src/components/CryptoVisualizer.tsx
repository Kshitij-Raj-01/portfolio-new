import React, { useState } from 'react';
import { 
  Cpu, 
  Play, 
  Lock,
  Unlock
} from 'lucide-react';

export const CryptoVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'vedic'>('comparison');

  // Vedic simulator states
  const [numA, setNumA] = useState<number>(43);
  const [numB, setNumB] = useState<number>(27);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [stepIndex, setStepIndex] = useState<number>(0);

  // Urdhva Tiryagbhyam steps for 2-digit numbers
  // numA = a1*10 + a0, numB = b1*10 + b0
  const a1 = Math.floor(numA / 10);
  const a0 = numA % 10;
  const b1 = Math.floor(numB / 10);
  const b0 = numB % 10;

  // Step 1: Right column vertical: a0 * b0
  const step1Prod = a0 * b0;
  const digit0 = step1Prod % 10;
  const carry1 = Math.floor(step1Prod / 10);

  // Step 2: Crosswise: (a1*b0 + a0*b1) + carry1
  const crossProd = (a1 * b0) + (a0 * b1) + carry1;
  const digit1 = crossProd % 10;
  const carry2 = Math.floor(crossProd / 10);

  // Step 3: Left column vertical: (a1*b1) + carry2
  const finalLeft = (a1 * b1) + carry2;
  const totalResult = (finalLeft * 100) + (digit1 * 10) + digit0;

  const runSimulation = () => {
    setIsSimulating(true);
    setStepIndex(1);
    setTimeout(() => setStepIndex(2), 700);
    setTimeout(() => {
      setStepIndex(3);
      setIsSimulating(false);
    }, 1400);
  };

  return (
    <section id="crypto-lab" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>DEFENCE RESEARCH &amp; CRYPTOGRAPHY LAB</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Post-Quantum Cryptography &amp; Vedic Arithmetic
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl">
              Visualizing why quantum computing breaks RSA/ECC, and how our research synthesizes lattice-based mathematics with Vedic arithmetic on microcontrollers with &lt;1MB SRAM (DRDO SAG).
            </p>
          </div>

          <div className="flex gap-2 mt-4 md:mt-0 font-mono text-xs">
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-3.5 py-2 rounded-lg transition-all ${
                activeTab === 'comparison'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              Quantum Threat vs Lattice
            </button>
            <button
              onClick={() => setActiveTab('vedic')}
              className={`px-3.5 py-2 rounded-lg transition-all ${
                activeTab === 'vedic'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              Vedic Math Speedup
            </button>
          </div>
        </div>

        {/* Tab 1: Quantum Threat vs Lattice Cryptography */}
        {activeTab === 'comparison' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Classical Cryptography Card */}
            <div className="rounded-2xl p-6 sm:p-8 bg-slate-900/90 border border-red-500/30 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold">
                  <Unlock className="w-4 h-4" />
                  <span>CLASSICAL SCHEMES (RSA-2048 / ECC)</span>
                </div>
                <span className="text-xs font-mono text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/30">
                  Vulnerable to Shor's Algo
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                Discrete Log &amp; Prime Factorization
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Current financial and web security relies on the hardness of factoring huge semi-primes (N = p × q). A sufficiently sized quantum computer running <strong>Shor’s Algorithm</strong> reduces polynomial complexity to O((log N)³), collapsing 2048-bit RSA in minutes.
              </p>

              {/* Threat Matrix */}
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">Underlying Math:</span>
                  <span className="text-white">Abelian Hidden Subgroup</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">Quantum Complexity:</span>
                  <span className="text-red-400 font-bold">Polynomial Time O(n³)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">Post-Quantum Status:</span>
                  <span className="text-red-400 font-bold">DEPRECATED BY NIST</span>
                </div>
              </div>
            </div>

            {/* Post-Quantum Lattice Card */}
            <div className="rounded-2xl p-6 sm:p-8 bg-slate-900/90 border border-emerald-500/40 relative overflow-hidden shadow-xl shadow-emerald-500/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                  <Lock className="w-4 h-4" />
                  <span>POST-QUANTUM (LATTICE / LWE / KYBER)</span>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  Quantum-Resistant
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                Shortest Vector Problem (SVP in Zⁿ)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Lattice cryptography encodes secrets in high-dimensional geometric grids (n ≥ 512 dimensions) with added Gaussian noise (Learning With Errors). There is <strong>no known quantum algorithm</strong> that can solve high-dimensional SVP in polynomial time.
              </p>

              {/* PQC Matrix */}
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">Underlying Math:</span>
                  <span className="text-white">Module-LWE &amp; Ring-LWE</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">Quantum Complexity:</span>
                  <span className="text-emerald-400 font-bold">Exponential O(2^Θ(n))</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">DRDO SAG Target:</span>
                  <span className="text-emerald-400 font-bold">Hardware &lt; 1MB SRAM</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Vedic Math Urdhva Tiryagbhyam Speedup */}
        {activeTab === 'vedic' && (
          <div className="rounded-2xl glass-card border border-slate-800 p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Context & Concept */}
              <div className="lg:col-span-6 space-y-4">
                <div className="text-xs font-mono text-cyan-400 font-bold">
                  IKVI 2025 RESEARCH PAPER DEMONSTRATOR
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Urdhva Tiryagbhyam (Vertically and Crosswise)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In resource-constrained microcontrollers (&lt;1MB SRAM), classical polynomial multiplication generates multiple intermediate partial products requiring frequent memory swaps. 
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Our algorithm processes partial products <strong>concurrently and accumulates them into registers on-the-fly</strong>. This reduces hardware clock cycles by up to <strong>~34%</strong> and eliminates volatile SRAM allocation spikes.
                </p>

                {/* Number Inputs for Interactive Test */}
                <div className="pt-2 flex items-center gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      INTEGER A (2-digit)
                    </label>
                    <input
                      type="number"
                      min="10"
                      max="99"
                      value={numA}
                      onChange={(e) => {
                        setNumA(Number(e.target.value));
                        setStepIndex(0);
                      }}
                      className="w-24 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <span className="text-slate-500 font-mono text-xl mt-4">×</span>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      INTEGER B (2-digit)
                    </label>
                    <input
                      type="number"
                      min="10"
                      max="99"
                      value={numB}
                      onChange={(e) => {
                        setNumB(Number(e.target.value));
                        setStepIndex(0);
                      }}
                      className="w-24 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <button
                    onClick={runSimulation}
                    disabled={isSimulating}
                    className="mt-4 px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold font-mono text-xs hover:bg-cyan-400 transition-all flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Run Vedic Pipeline</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Interactive Step Visualizer */}
              <div className="lg:col-span-6 bg-slate-950/80 p-5 rounded-xl border border-slate-800 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                  <span className="text-slate-400">EXECUTION STEP TRACE</span>
                  <span className="text-emerald-400 font-bold">
                    Target: {numA} × {numB} = {numA * numB}
                  </span>
                </div>

                {/* Step 1 */}
                <div
                  className={`p-3 rounded-lg border transition-all mb-2.5 ${
                    stepIndex >= 1
                      ? 'bg-slate-900 border-cyan-500/50 text-slate-200'
                      : 'bg-slate-900/40 border-slate-800/80 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-cyan-400">Step 1: Vertical (Right Column)</span>
                    <span>a0 × b0</span>
                  </div>
                  <div className="text-[11px]">
                    {a0} × {b0} = {step1Prod} &rarr; Digit: <strong className="text-emerald-400">{digit0}</strong> (Carry: {carry1})
                  </div>
                </div>

                {/* Step 2 */}
                <div
                  className={`p-3 rounded-lg border transition-all mb-2.5 ${
                    stepIndex >= 2
                      ? 'bg-slate-900 border-cyan-500/50 text-slate-200'
                      : 'bg-slate-900/40 border-slate-800/80 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-cyan-400">Step 2: Crosswise &amp; Sum</span>
                    <span>(a1 × b0) + (a0 × b1) + carry</span>
                  </div>
                  <div className="text-[11px]">
                    ({a1} × {b0}) + ({a0} × {b1}) + {carry1} = {crossProd} &rarr; Digit: <strong className="text-emerald-400">{digit1}</strong> (Carry: {carry2})
                  </div>
                </div>

                {/* Step 3 */}
                <div
                  className={`p-3 rounded-lg border transition-all ${
                    stepIndex >= 3
                      ? 'bg-slate-900 border-cyan-500/50 text-slate-200'
                      : 'bg-slate-900/40 border-slate-800/80 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-cyan-400">Step 3: Vertical (Left Column)</span>
                    <span>(a1 × b1) + carry</span>
                  </div>
                  <div className="text-[11px]">
                    ({a1} × {b1}) + {carry2} = {finalLeft} &rarr; Leading Digits: <strong className="text-emerald-400">{finalLeft}</strong>
                  </div>
                </div>

                {/* Final Assembled Result */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Assembled Result:</span>
                  <span className="text-base font-bold text-emerald-400">
                    {stepIndex === 3 ? totalResult : '---'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
