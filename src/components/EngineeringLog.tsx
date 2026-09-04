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
    title: 'Porting Lattice Cryptography to Arduino Microcontrollers with <1MB SRAM',
    category: 'Security & Embedded',
    readTime: '6 min read',
    date: 'February 2026',
    summary: 'How we adapted NIST Post-Quantum Cryptography implementations for microcontrollers with strict SRAM constraints at DRDO SAG, eliminating dynamic heap allocations.',
    tags: ['DRDO SAG', 'Post-Quantum', 'C/C++', 'Arduino', 'SRAM Optimization'],
    content: {
      intro: 'When implementing post-quantum lattice-based encryption (such as Module-LWE schemes) on small embedded hardware like Arduino and Cortex-M devices, standard reference implementations quickly crash due to dynamic memory fragmentation on targets having less than 1MB of SRAM.',
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
    id: 'follope-celery-queues',
    title: 'Designing Zero-Drop Celery Task Queues for FinTech Webhooks in Follope',
    category: 'Backend Architecture',
    readTime: '5 min read',
    date: 'January 2026',
    summary: 'Architecting resilient background worker queues with Django, Redis, and Celery to handle real-time UPI payment webhooks and automated client escalation schedules without dropped tasks.',
    tags: ['Follope', 'Django', 'Celery', 'Redis', 'FinTech'],
    content: {
      intro: 'In an invoice tracking platform like Follope, dropping a payment confirmation webhook or sending duplicate overdue reminders destroys client trust. Here is how we structured asynchronous task orchestration with idempotency and dead-letter queues.',
      sections: [
        {
          heading: '1. Database Idempotency Locks',
          body: 'Incoming payment webhooks can fire duplicate events if banking gateways retry. Every webhook payload is hashed into an idempotency key and stored in Redis with an atomic SETNX check before dispatching Celery tasks.',
          codeSnippet: `@shared_task(bind=True, max_retries=3, default_retry_delay=60)
def process_upi_payment_event(self, transaction_ref, invoice_id, amount):
    # 1. Acquire atomic distributed lock in Redis
    lock_key = f"lock:payment:{transaction_ref}"
    with redis_client.lock(lock_key, timeout=10):
        # 2. Verify invoice status in PostgreSQL within transaction
        with transaction.atomic():
            invoice = Invoice.objects.select_for_update().get(id=invoice_id)
            if invoice.status == InvoiceStatus.PAID:
                return "Already processed"
            invoice.mark_settled(amount)
            # 3. Disarm future Celery reminder queues
            revoke_scheduled_reminders(invoice_id)`
        },
        {
          heading: '2. Celery Worker Pool Tuning',
          body: 'We split tasks into two distinct priority queues: `payments.high` (concurrency 8, low latency) and `reminders.scheduled` (concurrency 2, batch rate-limited) to ensure scheduled email alerts never block live payment reconciliations.'
        }
      ],
      conclusion: 'Separating high-priority transactional state changes from scheduled background notifications guarantees sub-50ms webhook acknowledgment while maintaining 100% processing integrity.'
    }
  },
  {
    id: 'vedic-math-crypto',
    title: 'Integrating Vedic Mathematics in Post-Quantum Cryptography (IKVI 2025)',
    category: 'Research & Algorithms',
    readTime: '7 min read',
    date: '2025',
    summary: 'A deep dive into our published research exploring how Urdhva Tiryagbhyam and Nikhilam multiplication algorithms reduce arithmetic cycles in post-quantum lattice primitives.',
    tags: ['Research Paper', 'Vedic Math', 'Cryptography', 'IKVI 2025'],
    content: {
      intro: 'Presented at the International Conference on Indian Knowledge from Vedic Insights (IKVI 2025), this research paper investigates modular arithmetic optimizations by integrating classical Indian mathematical formulations into quantum-resilient lattice cryptography.',
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
