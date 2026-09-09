import React, { useState } from 'react';
import { Calculator, ArrowRight, DollarSign, Clock, ShieldCheck } from 'lucide-react';

interface FollopeCalculatorProps {
  onOpenWaitlist: () => void;
}

export const FollopeCalculator: React.FC<FollopeCalculatorProps> = ({ onOpenWaitlist }) => {
  const [invoicesCount, setInvoicesCount] = useState<number>(8);
  const [avgInvoiceAmount, setAvgInvoiceAmount] = useState<number>(45000); // INR
  const [avgDelayDays, setAvgDelayDays] = useState<number>(18);

  // Calculations
  const hoursSpentChasingPerMonth = (invoicesCount * 1.5).toFixed(1);
  const delayedCashflowFloat = (invoicesCount * avgInvoiceAmount).toLocaleString('en-IN');
  const annualHoursWasted = Math.round(invoicesCount * 1.5 * 12);
  const estimatedRecoveredRateInr = Math.round((annualHoursWasted * 2000)).toLocaleString('en-IN');

  return (
    <div className="my-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-emerald-950/20 border border-slate-800 relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>INTERACTIVE FREELANCER ROI CALCULATOR</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            How Much Time &amp; Cashflow Are You Losing to Late Invoices?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Adjust the sliders below to see the impact of automated UPI invoicing and automated background reminder sweeps.
          </p>
        </div>

        <button
          onClick={onOpenWaitlist}
          className="shrink-0 px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
        >
          <span>Join Beta Waitlist</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders Area */}
        <div className="lg:col-span-6 space-y-6">
          {/* Slider 1: Invoices / Month */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-slate-300">Active Invoices / Month</span>
              <span className="text-emerald-400 font-bold">{invoicesCount} invoices</span>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              value={invoicesCount}
              onChange={(e) => setInvoicesCount(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>1</span>
              <span>20</span>
              <span>40</span>
            </div>
          </div>

          {/* Slider 2: Average Invoice Amount */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-slate-300">Average Invoice Amount (₹ INR)</span>
              <span className="text-cyan-400 font-bold">₹{avgInvoiceAmount.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="5000"
              max="250000"
              step="5000"
              value={avgInvoiceAmount}
              onChange={(e) => setAvgInvoiceAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>₹5k</span>
              <span>₹1.25L</span>
              <span>₹2.5L</span>
            </div>
          </div>

          {/* Slider 3: Payment Delay Days */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-slate-300">Average Client Delay</span>
              <span className="text-amber-400 font-bold">{avgDelayDays} days overdue</span>
            </div>
            <input
              type="range"
              min="3"
              max="60"
              value={avgDelayDays}
              onChange={(e) => setAvgDelayDays(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>3 days</span>
              <span>30 days</span>
              <span>60 days</span>
            </div>
          </div>
        </div>

        {/* Calculated Impact Metrics Cards */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Time Chasing Overdue</span>
            </div>
            <div className="text-2xl font-bold font-mono text-white mb-1">
              {hoursSpentChasingPerMonth} hrs<span className="text-xs text-slate-400 font-sans"> / mo</span>
            </div>
            <div className="text-[11px] text-slate-400">
              ~{annualHoursWasted} hours/year spent drafting manual emails and WhatsApp pings.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-1">
              <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
              <span>Stalled Cashflow Float</span>
            </div>
            <div className="text-2xl font-bold font-mono text-white mb-1">
              ₹{delayedCashflowFloat}
            </div>
            <div className="text-[11px] text-slate-400">
              Trapped across client accounts during the {avgDelayDays}-day payment lag.
            </div>
          </div>

          <div className="sm:col-span-2 p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs font-mono">
                <ShieldCheck className="w-4 h-4" />
                <span>FOLLOPE AUTOMATION RESULT</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Recovers ~<strong className="text-white">₹{estimatedRecoveredRateInr}</strong> in billable time annually with zero awkward manual reminder conversations.
              </p>
            </div>

            <button
              onClick={onOpenWaitlist}
              className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 text-xs font-bold font-mono hover:bg-emerald-400 shrink-0"
            >
              Get Beta Access
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
