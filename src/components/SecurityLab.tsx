import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Play, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  Flame
} from 'lucide-react';

export const SecurityLab: React.FC = () => {
  const [activeLab, setActiveLab] = useState<'sqli' | 'hmac' | 'ratelimit' | 'fail2ban'>('sqli');

  // Lab 1: SQL Injection State
  const [sqlInput, setSqlInput] = useState<string>("' OR '1'='1' --");
  const [isParamQuery, setIsParamQuery] = useState<boolean>(false);

  // Lab 2: Webhook HMAC State
  const [tamperedAmount, setTamperedAmount] = useState<number>(1000);
  const [originalAmount] = useState<number>(1000);

  // Lab 3: Rate Limiting State
  const [requestCount, setRequestCount] = useState<number>(0);
  const [requestsRemaining, setRequestsRemaining] = useState<number>(5);
  const [isRateLimited, setIsRateLimited] = useState<boolean>(false);
  const [rateLimitLogs, setRateLimitLogs] = useState<{ id: number; status: number; text: string }[]>([]);

  // Lab 4: Fail2ban SSH Logs State
  const [bannedIps, setBannedIps] = useState<string[]>(['185.220.101.4']);
  const [sshLogs, setSshLogs] = useState<string[]>([
    "Sep 04 15:20:10 vps-prod sshd[14201]: Failed password for invalid user admin from 185.220.101.4 port 48210 ssh2",
    "Sep 04 15:20:11 vps-prod sshd[14203]: Failed password for invalid user admin from 185.220.101.4 port 48212 ssh2",
    "Sep 04 15:20:12 vps-prod sshd[14205]: Failed password for invalid user root from 185.220.101.4 port 48214 ssh2",
    "Sep 04 15:20:12 vps-prod fail2ban.actions[882]: NOTICE [sshd] Ban 185.220.101.4 -> iptables -I INPUT -s 185.220.101.4 -j DROP"
  ]);

  // Rate Limiting Handler
  const handleFireRateLimit = () => {
    const nextCount = requestCount + 1;
    setRequestCount(nextCount);

    if (requestsRemaining > 0) {
      setRequestsRemaining((prev) => prev - 1);
      setRateLimitLogs((prev) => [
        { id: Date.now(), status: 200, text: `GET /api/v1/user/invoices -> 200 OK (Bucket: ${requestsRemaining - 1}/5 tokens)` },
        ...prev.slice(0, 5)
      ]);
    } else {
      setIsRateLimited(true);
      setRateLimitLogs((prev) => [
        { id: Date.now(), status: 429, text: `GET /api/v1/user/invoices -> 429 TOO MANY REQUESTS (Retry-After: 15s)` },
        ...prev.slice(0, 5)
      ]);
    }
  };

  const handleResetRateLimit = () => {
    setRequestCount(0);
    setRequestsRemaining(5);
    setIsRateLimited(false);
    setRateLimitLogs([]);
  };

  // Fail2ban Simulate Attack
  const handleSimulateBruteForce = () => {
    const randomIp = `194.26.${Math.floor(Math.random() * 200) + 10}.${Math.floor(Math.random() * 250) + 1}`;
    const timestamp = new Date().toLocaleTimeString();

    setSshLogs((prev) => [
      `${timestamp} vps-prod sshd: Failed password for invalid user ubuntu from ${randomIp} port 51200`,
      `${timestamp} vps-prod sshd: Failed password for invalid user root from ${randomIp} port 51202`,
      `${timestamp} vps-prod sshd: Failed password for invalid user postgres from ${randomIp} port 51204`,
      `${timestamp} vps-prod fail2ban.actions: NOTICE [sshd] Ban ${randomIp} -> iptables -I INPUT -s ${randomIp} -j DROP`,
      ...prev.slice(0, 6)
    ]);

    setBannedIps((prev) => [randomIp, ...prev]);
  };

  return (
    <section id="security-lab" className="py-20 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-red-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono mb-3">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>DEFENSIVE SYSTEMS &amp; EXPLOIT ANALYSIS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Interactive Cybersecurity Practice Lab
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl">
              Hands-on defensive simulations demonstrating how unhardened architectures get compromised and how parameterized ASTs, HMAC signatures, Redis sliding windows, and Fail2ban eliminate vectors.
            </p>
          </div>

          {/* Navigation Pills */}
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0 font-mono text-xs">
            <button
              onClick={() => setActiveLab('sqli')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeLab === 'sqli'
                  ? 'bg-red-500 text-slate-950 font-bold shadow-md shadow-red-500/20'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              SQL Injection
            </button>
            <button
              onClick={() => setActiveLab('hmac')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeLab === 'hmac'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              Webhook HMAC
            </button>
            <button
              onClick={() => setActiveLab('ratelimit')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeLab === 'ratelimit'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              Rate Limiter (DoS)
            </button>
            <button
              onClick={() => setActiveLab('fail2ban')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeLab === 'fail2ban'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              Fail2ban &amp; VPS
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* LAB 1: SQL INJECTION & PARAMETERIZED ORM DEFENSE */}
        {/* ======================================================== */}
        {activeLab === 'sqli' && (
          <div className="rounded-2xl glass-card border border-slate-800 p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Attack Vector Playground */}
              <div className="lg:col-span-6 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-red-400">
                    LAB 01 • INJECTION MITIGATION
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">Mode:</span>
                    <button
                      onClick={() => setIsParamQuery(!isParamQuery)}
                      className={`px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all ${
                        isParamQuery
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-red-500/20 text-red-300 border border-red-500/40'
                      }`}
                    >
                      {isParamQuery ? '🛡️ Parameterized Query' : '⚠️ Raw String SQL'}
                    </button>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight">
                  SQL Injection vs. AST Parameterized Query
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  When backends concatenate raw user strings into SQL commands, attackers break the syntactic boundary and execute arbitrary database instructions.
                </p>

                {/* Input Payload */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    USER INPUT FIELD (Email Authentication)
                  </label>
                  <input
                    type="text"
                    value={sqlInput}
                    onChange={(e) => setSqlInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-amber-300 font-mono focus:outline-none focus:border-red-500"
                  />
                  {/* Preset Attack Buttons */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    <button
                      onClick={() => setSqlInput("' OR '1'='1' --")}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400 hover:text-white"
                    >
                      Tautology: ' OR '1'='1' --
                    </button>
                    <button
                      onClick={() => setSqlInput("admin' --")}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400 hover:text-white"
                    >
                      Auth Bypass: admin' --
                    </button>
                    <button
                      onClick={() => setSqlInput("kshitij@example.com")}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-400 hover:text-emerald-300"
                    >
                      Valid Email: kshitij@example.com
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Execution Output */}
              <div className="lg:col-span-6 bg-slate-950/90 p-5 rounded-xl border border-slate-800 font-mono text-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-slate-400">DATABASE QUERY ENGINE</span>
                  <span
                    className={`font-bold ${
                      isParamQuery
                        ? 'text-emerald-400'
                        : sqlInput.includes("'")
                        ? 'text-red-400'
                        : 'text-slate-400'
                    }`}
                  >
                    {isParamQuery
                      ? 'SECURE: PARAMETERIZED'
                      : sqlInput.includes("'")
                      ? 'CRITICAL: EXPLOITABLE'
                      : 'SAFE SYNTAX'}
                  </span>
                </div>

                {/* Generated Query Representation */}
                <div>
                  <div className="text-[11px] text-slate-500 mb-1">
                    {isParamQuery ? 'PREPARED SQL STATEMENT:' : 'INTERPOLATED RAW SQL:'}
                  </div>
                  <div className="p-3 rounded-lg bg-[#070b12] border border-slate-850 overflow-x-auto text-[11px] leading-relaxed">
                    {!isParamQuery ? (
                      <span className="text-slate-300">
                        SELECT * FROM users WHERE email = '
                        <span className="text-red-400 font-bold underline">{sqlInput}</span>
                        ' AND password_hash = '$2b$12...';
                      </span>
                    ) : (
                      <div>
                        <div className="text-emerald-300">
                          SELECT * FROM users WHERE email = $1 AND password_hash = $2;
                        </div>
                        <div className="text-slate-500 mt-1">
                          [Parameters] $1 = "{sqlInput}", $2 = "$2b$12..."
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Execution Result */}
                <div
                  className={`p-3 rounded-lg border flex items-start gap-2.5 ${
                    !isParamQuery && sqlInput.includes("'")
                      ? 'bg-red-950/40 border-red-500/50 text-red-300'
                      : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                  }`}
                >
                  {!isParamQuery && sqlInput.includes("'") ? (
                    <>
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-red-400">AUTHENTICATION BYPASS TRIGGERED</div>
                        <div className="text-[11px] text-slate-300 mt-0.5">
                          Tautology evaluates to TRUE. Query returns the first record (Administrator) without password verification.
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-emerald-400">SECURE BOUNDARY ENFORCED</div>
                        <div className="text-[11px] text-slate-300 mt-0.5">
                          Database treats payload strictly as a literal string literal. No syntax breakout possible.
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* LAB 2: WEBHOOK HMAC-SHA256 SIGNATURE DEFENSE */}
        {/* ======================================================== */}
        {activeLab === 'hmac' && (
          <div className="rounded-2xl glass-card border border-slate-800 p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 space-y-4">
                <div className="text-xs font-mono font-bold text-emerald-400">
                  LAB 02 • FINTECH EVENT INTEGRITY (FOLLOPE)
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  HMAC-SHA256 Webhook Tamper Detection
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In payment platforms like <strong className="text-emerald-400">Follope</strong>, an attacker attempting a Man-In-The-Middle attack might intercept a payment webhook and alter the captured amount from ₹1,000 to ₹100,000 to credit fictitious funds.
                </p>

                {/* Interactive Tamper Slider */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">Simulate Payload Tampering (Amount):</span>
                    <span className={`font-bold ${tamperedAmount !== originalAmount ? 'text-red-400' : 'text-emerald-400'}`}>
                      ₹{tamperedAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="5000"
                    value={tamperedAmount}
                    onChange={(e) => setTamperedAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-slate-500">
                    <span>Authentic: ₹1,000</span>
                    <span>Tampered: ₹1,00,000</span>
                  </div>
                </div>

                <button
                  onClick={() => setTamperedAmount(1000)}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono hover:text-white flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore Original Authentic Payload</span>
                </button>
              </div>

              {/* Right: Signature Verification Engine */}
              <div className="lg:col-span-6 bg-slate-950/90 p-5 rounded-xl border border-slate-800 font-mono text-xs space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-slate-400">SECURITY AUDIT ENGINE</span>
                  <span
                    className={`font-bold ${
                      tamperedAmount === originalAmount ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {tamperedAmount === originalAmount ? 'SIGNATURE VALID (200 OK)' : 'TAMPER DETECTED (403)'}
                  </span>
                </div>

                <div className="space-y-2 text-[11px]">
                  <div>
                    <span className="text-slate-500">Inbound Payload:</span>
                    <div className="p-2 rounded bg-slate-900 text-cyan-300 mt-1">
                      {`{"invoice_id": "INV-2026-0842", "amount": ${tamperedAmount}, "status": "PAID"}`}
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500">Gateway Provided Header (X-Follope-Signature):</span>
                    <div className="p-2 rounded bg-slate-900 text-slate-300 mt-1 break-all">
                      hmac_sha256_e82b79a1f2c004d9134b92c4a904121
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500">Follope Locally Computed HMAC Hash:</span>
                    <div
                      className={`p-2 rounded mt-1 break-all font-bold ${
                        tamperedAmount === originalAmount
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                          : 'bg-red-950/60 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {tamperedAmount === originalAmount
                        ? 'hmac_sha256_e82b79a1f2c004d9134b92c4a904121'
                        : `hmac_sha256_f842${tamperedAmount}d84812a0f8231940bc`}
                    </div>
                  </div>
                </div>

                <div
                  className={`p-3 rounded-lg border text-xs leading-relaxed ${
                    tamperedAmount === originalAmount
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                      : 'bg-red-950/40 border-red-500/40 text-red-300'
                  }`}
                >
                  {tamperedAmount === originalAmount ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Constant-time comparison passed. Payload verified authentic. Ledger credited.</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>Hashes do not match! Payload dropped immediately. IP flagged in security audit.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* LAB 3: REDIS SLIDING WINDOW RATE LIMITER */}
        {/* ======================================================== */}
        {activeLab === 'ratelimit' && (
          <div className="rounded-2xl glass-card border border-slate-800 p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 space-y-4">
                <div className="text-xs font-mono font-bold text-cyan-400">
                  LAB 03 • API ABUSE &amp; DoS MITIGATION
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Redis Sliding Window Rate Limiter
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Protecting backend endpoints from credential stuffing and DoS attacks. Our Redis rate limiter maintains a token bucket of <strong>5 requests per 10-second window</strong> per client IP.
                </p>

                {/* Action trigger */}
                <div className="flex gap-3">
                  <button
                    onClick={handleFireRateLimit}
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold font-mono text-xs hover:bg-cyan-400 transition-all flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Send API Request</span>
                  </button>

                  <button
                    onClick={handleResetRateLimit}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 font-mono text-xs hover:text-white border border-slate-800 flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Window</span>
                  </button>
                </div>

                {/* Token visualizer */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Available Token Bucket:</span>
                    <span className={`font-bold ${requestsRemaining === 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {requestsRemaining} / 5 Tokens Left
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`h-3 rounded transition-all ${
                          i <= requestsRemaining ? 'bg-emerald-400 shadow-sm shadow-emerald-500/50' : 'bg-slate-800'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {isRateLimited && (
                  <div className="p-2.5 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>RATE LIMIT EXCEEDED: Subsequent requests blocked with 429.</span>
                  </div>
                )}
              </div>

              {/* Right: Live Request Log */}
              <div className="lg:col-span-6 bg-slate-950/90 p-5 rounded-xl border border-slate-800 font-mono text-xs space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-slate-400">REDIS GATEWAY TELEMETRY</span>
                  <span className="text-xs text-slate-500">IP: 192.168.1.42</span>
                </div>

                {rateLimitLogs.length === 0 ? (
                  <div className="py-8 text-center text-slate-600 text-xs">
                    Click "Send API Request" to generate traffic and observe bucket drainage.
                  </div>
                ) : (
                  <div className="space-y-1.5 max-h-56 overflow-y-auto">
                    {rateLimitLogs.map((log) => (
                      <div
                        key={log.id}
                        className={`p-2 rounded text-[11px] flex items-center justify-between ${
                          log.status === 200
                            ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/20'
                            : 'bg-red-950/50 text-red-300 border border-red-500/30'
                        }`}
                      >
                        <span>{log.text}</span>
                        <span className="font-bold">{log.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* LAB 4: LINUX FAIL2BAN & VPS HARDENING */}
        {/* ======================================================== */}
        {activeLab === 'fail2ban' && (
          <div className="rounded-2xl glass-card border border-slate-800 p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 space-y-4">
                <div className="text-xs font-mono font-bold text-amber-400">
                  LAB 04 • SERVER MANAGEMENT &amp; VPS HARDENING
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Automated Fail2ban IPTables Jailing
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  As backend and server administrator at Robotic Sir AI, I configure production Linux VPS firewalls and Fail2ban filters. When bots attempt dictionary attacks on SSH (Port 22), Fail2ban automatically writes dynamic kernel iptables DROP rules.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={handleSimulateBruteForce}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold font-mono text-xs hover:bg-amber-400 transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/20"
                  >
                    <Flame className="w-3.5 h-3.5" />
                    <span>Simulate Bot Brute-Force Attack</span>
                  </button>

                  <button
                    onClick={() => setBannedIps([])}
                    className="px-3 py-2.5 rounded-xl bg-slate-900 text-slate-300 font-mono text-xs hover:text-white border border-slate-800"
                  >
                    Flush Jails
                  </button>
                </div>

                {/* Banned IPs list */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
                  <div className="text-slate-400 mb-2">ACTIVE KERNEL JAIL (BANNED IPS):</div>
                  <div className="flex flex-wrap gap-1.5">
                    {bannedIps.length === 0 ? (
                      <span className="text-slate-600">No active banned IPs.</span>
                    ) : (
                      bannedIps.map((ip, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-red-950/60 border border-red-500/40 text-red-300 text-[11px]"
                        >
                          DROP {ip}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Live Log Feed */}
              <div className="lg:col-span-6 bg-slate-950/90 p-5 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-slate-400">/var/log/auth.log [STREAM]</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>LIVE</span>
                  </span>
                </div>

                <div className="space-y-1 text-[11px] leading-relaxed text-slate-300 max-h-64 overflow-y-auto scrollbar-thin">
                  {sshLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className={`p-1 rounded ${
                        log.includes('Ban')
                          ? 'text-red-300 bg-red-950/30 border border-red-500/20 font-bold'
                          : 'text-slate-400'
                      }`}
                    >
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
