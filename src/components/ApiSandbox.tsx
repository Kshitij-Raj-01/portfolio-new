import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Clock, 
  Layers, 
  RotateCcw, 
  Code2 
} from 'lucide-react';

interface Endpoint {
  id: string;
  name: string;
  method: 'GET' | 'POST';
  path: string;
  description: string;
  defaultPayload?: string;
  response: {
    status: number;
    statusText: string;
    data: any;
    headers: Record<string, string>;
  };
  activeNodes: string[];
}

const ENDPOINTS: Endpoint[] = [
  {
    id: 'generate-invoice',
    name: 'Generate Smart Invoice',
    method: 'POST',
    path: '/api/v1/invoices/generate',
    description: 'Generates an itemized bill with tax calculation and dynamic UPI payment QR payload.',
    defaultPayload: JSON.stringify(
      {
        client_name: "Acme Studios Pvt Ltd",
        client_email: "billing@acmestudios.io",
        items: [
          { description: "Full-Stack Security Audit", hours: 24, rate_inr: 2500 },
          { description: "Django Celery Queue Optimization", hours: 16, rate_inr: 2800 }
        ],
        currency: "INR",
        tax_rate_percent: 18,
        due_days: 15
      },
      null,
      2
    ),
    response: {
      status: 201,
      statusText: "Created",
      headers: {
        "content-type": "application/json; charset=utf-8",
        "x-request-id": "req_flp_99a82b41",
        "x-follope-version": "v1.4-production",
        "cache-control": "no-store"
      },
      data: {
        invoice_id: "INV-2026-0842",
        status: "GENERATED",
        subtotal_inr: 104800,
        tax_inr: 18864,
        total_payable_inr: 123664,
        upi_string: "upi://pay?pa=kshitij.follope@icici&pn=Kshitij%20Raj&am=123664&tr=INV20260842&cu=INR",
        qr_code_url: "https://cdn.follope.app/qr/inv_2026_0842.svg",
        scheduled_reminders: [
          { day_offset: 7, channel: "EMAIL", status: "QUEUED_CELERY" },
          { day_offset: 14, channel: "SMS_WHATSAPP", status: "QUEUED_CELERY" }
        ],
        created_at: "2026-09-04T15:18:00Z"
      }
    },
    activeNodes: ['client', 'django', 'redis', 'postgres']
  },
  {
    id: 'verify-hmac',
    name: 'Webhook Signature Auth',
    method: 'POST',
    path: '/api/v1/webhooks/verify-hmac',
    description: 'Cryptographic validation of incoming payment gateway webhooks using SHA-256 HMAC.',
    defaultPayload: JSON.stringify(
      {
        event: "payment.captured",
        payload: {
          transaction_id: "txn_upi_773910284",
          invoice_id: "INV-2026-0842",
          amount: 123664,
          gateway: "UPI_SETTLEMENT_HUB"
        },
        signature: "hmac_sha256_d83e29f8c6b12a849fbc741829e127394bb9a02938472"
      },
      null,
      2
    ),
    response: {
      status: 200,
      statusText: "OK",
      headers: {
        "content-type": "application/json",
        "x-security-audit": "PASSED_HMAC_SHA256",
        "x-signature-verification-time-ms": "1.4"
      },
      data: {
        signature_valid: true,
        tampering_detected: false,
        verification_mode: "CONSTANT_TIME_COMPARE",
        event_dispatched: "follope.events.invoice.paid",
        audit_log_id: "sec_audit_884210",
        message: "Webhook authenticity verified. Invoice marked as SETTLED."
      }
    },
    activeNodes: ['django', 'security', 'redis', 'postgres']
  },
  {
    id: 'reconcile-upi',
    name: 'Reconcile UPI Settlement',
    method: 'GET',
    path: '/api/v1/payments/reconcile-upi?ref=INV-2026-0842',
    description: 'Queries UPI reconciliation ledger across multiple banking pipelines in real-time.',
    response: {
      status: 200,
      statusText: "OK",
      headers: {
        "content-type": "application/json",
        "x-cache-hit": "REDIS_L1",
        "x-response-time": "18ms"
      },
      data: {
        reference_id: "INV-2026-0842",
        reconciliation_status: "SETTLED_INSTANT",
        banking_utr: "524819003821",
        settled_amount: 123664,
        currency: "INR",
        cleared_via: "IMPS_UPI_INSTANT",
        client_receipt_dispatched: true,
        celery_reminders_cancelled: 2
      }
    },
    activeNodes: ['django', 'redis', 'postgres']
  },
  {
    id: 'system-health',
    name: 'Server & Systems Health',
    method: 'GET',
    path: '/api/v1/system/health',
    description: 'Telemetry monitoring server load, PostgreSQL connection pools, and Redis Celery queues.',
    response: {
      status: 200,
      statusText: "OK",
      headers: {
        "content-type": "application/json",
        "x-server-host": "vps-prod-node-01.follope.net"
      },
      data: {
        system_status: "NOMINAL",
        uptime_seconds: 4892400,
        availability: "99.98%",
        load_average: [0.18, 0.22, 0.15],
        memory: {
          allocated_mb: 1540,
          total_mb: 4096,
          utilization_percent: 37.6
        },
        database_pool: {
          active_connections: 12,
          idle_connections: 8,
          avg_query_time_ms: 2.3
        },
        celery_workers: {
          active_workers: 4,
          tasks_processed_last_hour: 1284,
          failed_tasks: 0
        },
        firewall_fail2ban: {
          active_jails: ["sshd", "nginx-req-limit"],
          banned_ips_today: 42
        }
      }
    },
    activeNodes: ['nginx', 'django', 'redis', 'postgres', 'security']
  }
];

export const ApiSandbox: React.FC = () => {
  const [selectedEndpointId, setSelectedEndpointId] = useState<string>(ENDPOINTS[0].id);
  const [activeTab, setActiveTab] = useState<'response' | 'headers' | 'architecture'>('response');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [latencyMs, setLatencyMs] = useState<number>(24);
  const [lastExecuted, setLastExecuted] = useState<string | null>('Ready to execute');

  const endpoint = ENDPOINTS.find((e) => e.id === selectedEndpointId) || ENDPOINTS[0];

  const handleSendRequest = () => {
    setIsLoading(true);
    const mockLatency = Math.floor(Math.random() * 20) + 16;
    setTimeout(() => {
      setLatencyMs(mockLatency);
      setIsLoading(false);
      setLastExecuted(new Date().toLocaleTimeString());
    }, 350);
  };

  return (
    <section id="api-sandbox" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
              <Code2 className="w-3.5 h-3.5" />
              <span>LIVE SYSTEMS PLAYGROUND</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Backend API Sandbox &amp; Systems Topology
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl">
              Execute live simulated requests against Follope's backend microservices and inspect HTTP response headers, Celery task dispatches, and cryptographic HMAC verifications.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>API Gateway: v1.4-active</span>
            </span>
          </div>
        </div>

        {/* Sandbox Container */}
        <div className="rounded-2xl glass-card border border-slate-800 shadow-2xl overflow-hidden">
          {/* Top Bar: Endpoints Selector */}
          <div className="p-3 sm:p-4 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-500 mr-2 hidden sm:inline">ENDPOINTS:</span>
            {ENDPOINTS.map((ep) => (
              <button
                key={ep.id}
                onClick={() => {
                  setSelectedEndpointId(ep.id);
                  setLastExecuted(null);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  selectedEndpointId === ep.id
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    ep.method === 'POST'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-emerald-500/20 text-emerald-400'
                  }`}
                >
                  {ep.method}
                </span>
                <span>{ep.name}</span>
              </button>
            ))}
          </div>

          {/* Request Bar */}
          <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto flex-1 font-mono text-xs">
              <span
                className={`px-2.5 py-1 rounded font-bold ${
                  endpoint.method === 'POST'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                }`}
              >
                {endpoint.method}
              </span>
              <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300 flex-1 overflow-x-auto whitespace-nowrap">
                https://api.follope.app{endpoint.path}
              </div>
            </div>

            <button
              onClick={handleSendRequest}
              disabled={isLoading}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-emerald-500 text-slate-950 font-semibold text-xs hover:bg-emerald-400 disabled:opacity-50 transition-all shadow-md shadow-emerald-500/20 font-mono"
            >
              {isLoading ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Execute Request</span>
                </>
              )}
            </button>
          </div>

          {/* Main Grid: Payload & Response */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            {/* Left: Request Details & Payload */}
            <div className="lg:col-span-5 p-4 sm:p-6 bg-slate-950/40 space-y-4 font-mono text-xs">
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Description
                </div>
                <p className="text-slate-300 font-sans leading-relaxed text-xs">
                  {endpoint.description}
                </p>
              </div>

              {endpoint.defaultPayload && (
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    <span>JSON Request Body</span>
                    <span className="text-slate-500 text-[10px]">application/json</span>
                  </div>
                  <div className="rounded-xl bg-slate-950 p-3 border border-slate-800 text-slate-300 overflow-x-auto max-h-64 scrollbar-thin">
                    <pre className="text-[11px] leading-relaxed text-emerald-300/90">
                      {endpoint.defaultPayload}
                    </pre>
                  </div>
                </div>
              )}

              {/* Active Pipeline Nodes for this request */}
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Participating Services in Workflow</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {endpoint.activeNodes.map((node) => (
                    <span
                      key={node}
                      className="px-2.5 py-1 rounded bg-slate-900 border border-cyan-500/30 text-cyan-300 text-[11px]"
                    >
                      • {node.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Response Inspector */}
            <div className="lg:col-span-7 p-4 sm:p-6 bg-slate-950/70 flex flex-col justify-between font-mono text-xs">
              <div>
                {/* Response Tabs & Meta */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setActiveTab('response')}
                      className={`pb-1 transition-colors ${
                        activeTab === 'response'
                          ? 'text-emerald-400 border-b border-emerald-400 font-bold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Response Body
                    </button>
                    <button
                      onClick={() => setActiveTab('headers')}
                      className={`pb-1 transition-colors ${
                        activeTab === 'headers'
                          ? 'text-emerald-400 border-b border-emerald-400 font-bold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      HTTP Headers
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 text-[11px]">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{endpoint.response.status} {endpoint.response.statusText}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-[11px]">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      <span>{latencyMs}ms</span>
                    </span>
                  </div>
                </div>

                {/* Content Viewer */}
                {activeTab === 'response' ? (
                  <div className="rounded-xl bg-[#070b12] p-4 border border-slate-850 text-slate-300 overflow-x-auto max-h-80 scrollbar-thin">
                    <pre className="text-[11px] leading-relaxed text-cyan-200 font-mono">
                      {JSON.stringify(endpoint.response.data, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <div className="rounded-xl bg-[#070b12] p-4 border border-slate-850 space-y-2 overflow-x-auto max-h-80">
                    {Object.entries(endpoint.response.headers).map(([k, v]) => (
                      <div key={k} className="flex items-start gap-2 text-[11px]">
                        <span className="text-slate-400 w-44 shrink-0">{k}:</span>
                        <span className="text-emerald-300 break-all">{v}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Status Footer */}
              <div className="mt-4 pt-3 border-t border-slate-850 flex items-center justify-between text-[11px] text-slate-500">
                <span>Response Size: ~1.2 KB</span>
                <span>Last execution: {lastExecuted || 'Never'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
