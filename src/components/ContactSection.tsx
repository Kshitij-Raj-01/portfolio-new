import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Code, 
  Copy, 
  Check, 
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionFeedback, setSubmissionFeedback] = useState<{
    type: 'success' | 'error' | 'drafted';
    message: string;
  } | null>(null);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Check if Google Sheet endpoint is provided
    if (PERSONAL_INFO.googleSheetScriptUrl && PERSONAL_INFO.googleSheetScriptUrl.trim().length > 0) {
      setIsSubmitting(true);
      setSubmissionFeedback(null);
      try {
        await fetch(PERSONAL_INFO.googleSheetScriptUrl, {
          method: 'POST',
          mode: 'no-cors', // standard for Google Apps Script Web App endpoints
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            timestamp: new Date().toISOString(),
          }),
        });

        setSubmissionFeedback({
          type: 'success',
          message: 'Message delivered directly! It has been logged and sent to Kshitij Raj.',
        });
        setFormData({ name: '', email: '', message: '' });
      } catch {
        // In case of network error, fallback to mailto draft
        const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
        const body = encodeURIComponent(
          `Hi Kshitij,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
        );
        window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
        setSubmissionFeedback({
          type: 'drafted',
          message: 'Direct dispatch timed out. An email draft has been prepared in your client!',
        });
      } finally {
        setIsSubmitting(false);
        setTimeout(() => setSubmissionFeedback(null), 6000);
      }
    } else {
      // Default standard mailto handler
      const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
      const body = encodeURIComponent(
        `Hi Kshitij,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
      );
      window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
      setSubmissionFeedback({
        type: 'drafted',
        message: 'Email drafted in your mail client. Ready to dispatch!',
      });
      setTimeout(() => setSubmissionFeedback(null), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-emerald-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct info & links */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
                <Mail className="w-3.5 h-3.5" />
                <span>INITIATE CONTACT</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Let's Build Something Exceptional Together.
              </h2>
              <p className="mt-4 text-slate-300 text-sm leading-relaxed">
                Whether you want to discuss backend engineering opportunities, server security audits, explore my startup <strong className="text-emerald-400">Follope</strong>, or collaborate on Post-Quantum Cryptography research, my inbox is open.
              </p>
            </div>

            {/* Email quick action card */}
            <div className="p-4 rounded-xl glass-card border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-mono">DIRECT EMAIL</div>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-sm font-semibold text-white hover:text-emerald-400 transition-colors"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <button
                onClick={copyEmail}
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-750 transition-colors"
                title="Copy Email Address"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl glass-card border border-slate-800 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-mono">PHONE</div>
                  <div className="text-xs font-semibold text-white">{PERSONAL_INFO.phone}</div>
                </div>
              </div>

              <div className="p-4 rounded-xl glass-card border border-slate-800 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-mono">LOCATION</div>
                  <div className="text-xs font-semibold text-white">{PERSONAL_INFO.location}</div>
                </div>
              </div>
            </div>

            {/* Social profiles row */}
            <div className="pt-2">
              <div className="text-xs font-mono text-slate-400 mb-3">PROFILES &amp; REPOSITORIES:</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <a
                  href={PERSONAL_INFO.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PERSONAL_INFO.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-blue-500/40 text-slate-300 hover:text-blue-400 text-xs font-mono transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={PERSONAL_INFO.socialLinks.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-300 hover:text-amber-400 text-xs font-mono transition-colors"
                >
                  <Code className="w-4 h-4" />
                  <span>LeetCode</span>
                </a>
                <a
                  href={PERSONAL_INFO.socialLinks.hackerrank}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-400 text-xs font-mono transition-colors"
                >
                  <Code className="w-4 h-4" />
                  <span>HackerRank</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Contact Form */}
          <div className="lg:col-span-7 bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-2">Send a Direct Message</h3>
            <p className="text-xs text-slate-400 mb-6 font-mono">
              Fires straight to my primary inbox with instant notification.
            </p>

            <form onSubmit={handleSendMessage} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    YOUR EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  MESSAGE
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell me about your project, team requirements, or collaboration idea..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-emerald-500 text-slate-950 font-semibold text-sm hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting to Server...</span>
                  </>
                ) : (
                  <>
                    <span>Dispatch Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              {submissionFeedback && (
                <div
                  className={`p-3 rounded-lg text-xs font-mono flex items-center gap-2.5 transition-all ${
                    submissionFeedback.type === 'success'
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                      : submissionFeedback.type === 'error'
                      ? 'bg-red-500/10 border border-red-500/30 text-red-400'
                      : 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-300'
                  }`}
                >
                  {submissionFeedback.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  ) : submissionFeedback.type === 'error' ? (
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  ) : (
                    <Check className="w-4 h-4 shrink-0 text-cyan-400" />
                  )}
                  <span>{submissionFeedback.message}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
