import React from 'react';
import { CryptoVisualizer } from '../components/CryptoVisualizer';
import { SecurityLab } from '../components/SecurityLab';
import { CyberMiniGame } from '../components/CyberMiniGame';
import { Cpu } from 'lucide-react';

export const LabsPage: React.FC = () => {
  return (
    <div className="pt-8 pb-20 space-y-16">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>INTERACTIVE DEFENSE &bull; CRYPTOGRAPHIC SIMULATIONS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
          Security Sandbox &amp; Crypto Labs
        </h1>
        <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          Interactive simulation environments demonstrating post-quantum mathematical resistance, ancient Vedic multiplication cycle reduction, defensive application security sandboxes, and an arcade firewall defender game.
        </p>
      </div>

      {/* 1. Post-Quantum Cryptography & Vedic Math Simulator */}
      <div className="mt-0">
        <CryptoVisualizer />
      </div>

      {/* 2. Defensive Security Sandboxes */}
      <div className="mt-0">
        <SecurityLab />
      </div>

      {/* 3. Playable Cyber Defense Mini-Game */}
      <div className="mt-0">
        <CyberMiniGame />
      </div>
    </div>
  );
};
