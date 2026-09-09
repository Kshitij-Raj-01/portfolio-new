import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, X } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  tags: string[];
  content: {
    intro: string;
    sections: { heading: string; body: string; codeSnippet?: string }[];
    conclusion: string;
  };
}

const ARTICLES: Article[] = [
  {
    id: 'drdo-crypto-porting',
    title: 'Porting Lattice Cryptography (Kyber) to ESP32 Microcontrollers',
    category: 'Security & Embedded',
    readTime: '6 min read',
    date: 'February 2026',
    summary: 'How we adapted and ported NIST CRYSTALS-Kyber post-quantum cryptography implementations for ESP32 microcontrollers with strict SRAM constraints at DRDO SAG, eliminating dynamic heap allocations.',
    tags: ['DRDO SAG', 'Kyber', 'ESP32', 'Post-Quantum', 'C/C++', 'SRAM Optimization'],
    content: {
      intro: 'When implementing post-quantum lattice-based encryption (CRYSTALS-Kyber / ML-KEM) on resource-constrained embedded hardware like ESP32 microcontrollers, standard reference implementations quickly encounter memory constraints. Here is how we adapted Kyber to run within ESP32 SRAM limitations.',
      sections: [
        {
          heading: '1. Eliminating Dynamic Heap Allocations',
          body: 'On resource-constrained microcontrollers, invoking malloc() and free() inside high-degree polynomial operations causes irrecoverable stack-heap collisions. We replaced all dynamic polynomial buffers with pre-allocated static ring buffers in scratchpad SRAM.',
          codeSnippet: `// Replacing dynamic allocation with fixed static ring buffers
#define POLY_DEGREE 256
#define MOD_Q 3329

// Pre-allocated in fast internal SRAM scratchpad
static int16_t poly_scratch_buffer[POLY_DEGREE] __attribute__((section(".sram")));

void poly_ntt_inplace(int16_t* p) {
    // In-place Number Theoretic Transform (NTT) eliminates redundant memory copies
    for (size_t len = 128; len >= 2; len >>= 1) {
        // Butterfly execution in registers
    }
}`
        },
        {
          heading: '2. Register Swapping & Low-Level Protocols',
          body: 'By maintaining intermediate coefficient vectors in hardware CPU registers rather than repeatedly paging them through memory busses, we achieved functional parity with NIST specifications while operating entirely within 512KB SRAM limits.'
        }
      ],
      conclusion: 'Post-quantum cryptographic algorithms are viable on low-cost, low-power edge microcontrollers when polynomial arithmetic is optimized for deterministic in-place execution.'
    }
  },
  {
    id: 'follope-idor-prisma-api',
    title: 'Designing an IDOR-Resistant Financial API with TypeScript & Prisma',
    category: 'Backend Security & Architecture',
    readTime: '6 min read',
    date: 'January 2026',
    summary: 'Architecting a secure financial backend in Follope using TypeScript, Express, and Prisma ORM: eliminating IDOR vulnerabilities via CUID tokens and enforcing integer-paise accounting.',
    tags: ['Follope', 'TypeScript', 'Prisma', 'PostgreSQL', 'Web Security', 'FinTech'],
    content: {
      intro: 'In financial billing applications like Follope, exposing sequential database auto-increment IDs in URLs invites Insecure Direct Object Reference (IDOR) attacks where malicious actors enumerate client invoices. Here is how we engineered collision-resistant CUID public tokens, deterministic integer-paise calculations, and atomic Prisma transactions.',
      sections: [
        {
          heading: '1. CUID Token Isolation & Anti-IDOR Layer',
          body: 'We decoupled public client-facing links from internal database relations. Internal entities use standard relational keys, but public invoice viewing endpoints accept exclusively collision-resistant CUID tokens with zero sequential leakage.',
          codeSnippet: `// Public read-only invoice resolution via CUID token
export async function getPublicInvoiceByToken(publicToken: string) {
  return await prisma.invoice.findUnique({
    where: { publicToken }, // collision-resistant CUID
    select: {
      publicToken: true,
      invoiceNumber: true,
      dueDate: true,
      status: true,
      totalAmountPaise: true, // integer-paise, zero floating-point drift
      upiPayload: true,
      lineItems: {
        select: { description: true, quantity: true, unitPricePaise: true }
      },
      // Sensitive user credentials, auth tokens & tenant IDs strictly omitted
    }
  });
}`
        },
        {
          heading: '2. Eliminating Floating-Point Drift: Integer-Paise Accounting',
          body: 'JavaScript IEEE-754 floats introduce rounding errors (e.g. 0.1 + 0.2 !== 0.3). In Follope, all monetary values across taxes, discounts, line items, and balances are calculated and stored strictly as whole integer paise (₹100.50 = 10050 paise), guaranteeing deterministic arithmetic across all ledger operations.'
        },
        {
          heading: '3. ACID Atomic State Transitions with Prisma',
          body: 'Payment receipts and invoice status transitions execute inside atomic Prisma multi-table transactions ($transaction), ensuring an invoice cannot be marked as settled without updating payment records and logging the immutable audit event.'
        }
      ],
      conclusion: 'Combining CUID access token isolation, deterministic integer-paise arithmetic, and Prisma atomic transactions creates a resilient, audit-grade FinTech backend that resists enumeration and financial inaccuracies.'
    }
  },
  {
    id: 'vedic-math-crypto',
    title: 'Integrating Vedic Mathematics in Post-Quantum Cryptography',
    category: 'Research & Algorithms',
    readTime: '7 min read',
    date: '2025',
    summary: 'A deep dive into our research paper exploring how Urdhva Tiryagbhyam and Nikhilam multiplication algorithms reduce arithmetic cycles in post-quantum lattice primitives.',
    tags: ['Research Paper', 'Vedic Math', 'Cryptography', 'National Conference'],
    content: {
      intro: 'Submitted at the National Conference on Contemporary Applications and Expanding Horizons of Indian Knowledge from Vedic Insights, this research paper investigates modular arithmetic optimizations by integrating classical Indian mathematical formulations into quantum-resilient lattice cryptography.',
      sections: [
        {
          heading: '1. The Arithmetic Bottleneck in Ring-LWE',
          body: 'Ring Learning With Errors (Ring-LWE) relies on high-degree polynomial multiplications in quotient rings $R_q = \\mathbb{Z}_q[x]/(x^n + 1)$. Traditional schoolbook polynomial multiplication requires $O(n^2)$ coefficient operations.',
          codeSnippet: `// Vedic Urdhva Tiryagbhyam 2x2 Step Form
// Direct concurrent accumulation without temporary variables:
// Sum = (a[1]*b[0] + a[0]*b[1]) + carry
uint32_t cross_prod = ((uint32_t)a1 * b0) + ((uint32_t)a0 * b1) + carry;`
        },
        {
          heading: '2. Clock Cycle Benchmarks',
          body: 'Benchmarking on microcontrollers showed a 34% cycle count reduction over standard schoolbook multiplication and reduced register spill count to zero during modular coefficient steps.'
        }
      ],
      conclusion: 'Synthesizing ancient computational algorithms with next-generation post-quantum primitives offers a compelling path forward for resource-constrained cryptographic hardware.'
    }
  }
];

export const EngineeringLog: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section id="engineering-log" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>ENGINEERING LOG &amp; WRITING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical Architecture &amp; Research Notes
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            In-depth engineering logs detailing real-world solutions built across Follope, DRDO SAG cryptographic research, and distributed systems.
          </p>
        </div>

        {/* Articles Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES.map((article) => (
            <div
              key={article.id}
              className="rounded-2xl p-6 glass-card border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-400 mb-3">
                  <span className="text-purple-400 font-semibold">{article.category}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors mb-2 leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {article.summary}
                </p>
              </div>

              <div>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 mb-4 border-t border-slate-800/80">
                  {article.tags.slice(0, 3).map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedArticle(article)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-purple-500/20 text-slate-300 hover:text-purple-300 border border-slate-800 hover:border-purple-500/40 text-xs font-mono flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Read Full Note</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl max-h-[90vh] rounded-2xl bg-slate-900 border border-slate-750 shadow-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
                  <span>{selectedArticle.category}</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                  <span>•</span>
                  <span className="text-slate-500">{selectedArticle.date}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  {selectedArticle.title}
                </h2>
              </div>

              <button
                onClick={() => setSelectedArticle(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-4"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-300 text-sm leading-relaxed scrollbar-thin">
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-200 text-xs sm:text-sm font-medium">
                {selectedArticle.content.intro}
              </div>

              {selectedArticle.content.sections.map((sec, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-base font-bold text-white border-b border-slate-800 pb-1.5">
                    {sec.heading}
                  </h3>
                  <p className="text-slate-300">{sec.body}</p>

                  {sec.codeSnippet && (
                    <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
                      <pre>{sec.codeSnippet}</pre>
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-4 border-t border-slate-800">
                <div className="text-xs font-mono text-slate-400 font-bold mb-1">KEY TAKEAWAY:</div>
                <p className="text-slate-300 text-xs italic">{selectedArticle.content.conclusion}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Author: Kshitij Raj</span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
