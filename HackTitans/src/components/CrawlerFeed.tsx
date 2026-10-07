import React, { useState, useEffect } from 'react';
import { ThreatItem } from '../types/threat';
import { 
  Radio, 
  Play, 
  Pause, 
  RefreshCw, 
  ShieldAlert, 
  Filter, 
  ExternalLink, 
  FileCode, 
  Smartphone, 
  MessageSquare, 
  ArrowUpRight,
  Clock,
  Sparkles
} from 'lucide-react';

interface CrawlerFeedProps {
  onSelectThreatForSandbox: (threat: ThreatItem) => void;
  onOpenTakedownModal: (threat: ThreatItem) => void;
  threats: ThreatItem[];
}

interface FeedItem {
  id: string;
  source: 'CT_LOG' | 'SMS_FEED' | 'APK_MONITOR' | 'BANK_REPORT';
  sourceLabel: string;
  entity: string;
  brand: string;
  ip: string;
  firstSeen: string;
  status: 'ANALYZING' | 'FLAGGED_CLONE' | 'INSPECTED' | 'TAKEDOWN_QUEUED';
  signatures: string[];
}

export const CrawlerFeed: React.FC<CrawlerFeedProps> = ({
  onSelectThreatForSandbox,
  onOpenTakedownModal,
  threats
}) => {
  const [isLive, setIsLive] = useState(true);
  const [sourceFilter, setSourceFilter] = useState('ALL');
  const [feedItems, setFeedItems] = useState<FeedItem[]>([
    {
      id: 'CRW-901',
      source: 'CT_LOG',
      sourceLabel: 'Certificate Transparency (crt.sh)',
      entity: 'phonepe-cashback2026.top',
      brand: 'PhonePe',
      ip: '185.220.101.42',
      firstSeen: 'Just now',
      status: 'FLAGGED_CLONE',
      signatures: ['Wildcard Let\'s Encrypt E5', 'Typosquatted: phonepe-cashback', 'Reverse Collect Intent']
    },
    {
      id: 'CRW-902',
      source: 'SMS_FEED',
      sourceLabel: 'Smishing Gateway / Citizen Reports',
      entity: 'VK-PAYTM: "Your KYC wallet suspended today. Update at paytm-kyc-update-portal.site"',
      brand: 'Paytm',
      ip: '194.26.29.112',
      firstSeen: '1m ago',
      status: 'FLAGGED_CLONE',
      signatures: ['Counterfeit Sender Header', 'Debit Card CVV Harvester']
    },
    {
      id: 'CRW-903',
      source: 'APK_MONITOR',
      sourceLabel: 'Third-party Android Market Crawl',
      entity: 'SBI_Yono_Rewards_v3.apk (SHA: 9f86d08188...)',
      brand: 'SBI YONO',
      ip: '185.220.101.42',
      firstSeen: '3m ago',
      status: 'FLAGGED_CLONE',
      signatures: ['Accessibility Service Hook', 'READ_SMS Permission Abuse']
    },
    {
      id: 'CRW-904',
      source: 'CT_LOG',
      sourceLabel: 'Certificate Transparency (Google Argon)',
      entity: 'gpay-refund-nodal.live',
      brand: 'Google Pay',
      ip: '104.21.65.190',
      firstSeen: '6m ago',
      status: 'INSPECTED',
      signatures: ['Reverse Collect Intent: am=12500', 'Fake Nodal Executive Avatar']
    },
    {
      id: 'CRW-905',
      source: 'BANK_REPORT',
      sourceLabel: 'NPCI Central Fraud Repository Feed',
      entity: 'bhim-npci-subsidy-scheme.in.net',
      brand: 'BHIM',
      ip: '194.26.29.112',
      firstSeen: '11m ago',
      status: 'TAKEDOWN_QUEUED',
      signatures: ['Counterfeit Tri-Color Emblem', 'Stolen NPCI Seals', 'Rogue VPA: gov.subsidy.verify@ptaxis']
    }
  ]);

  // Simulate incoming live telemetry stream
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const candidates: FeedItem[] = [
        {
          id: `CRW-${Math.floor(Math.random() * 900) + 100}`,
          source: 'CT_LOG',
          sourceLabel: 'Certificate Transparency (Cloudflare Log)',
          entity: `paytm-recharge-bonus-${Math.floor(Math.random() * 99)}.site`,
          brand: 'Paytm',
          ip: '185.220.101.42',
          firstSeen: 'Just now',
          status: 'ANALYZING',
          signatures: ['Suspicious Keyword: paytm-recharge', 'Cheap Disposable Registrar']
        },
        {
          id: `CRW-${Math.floor(Math.random() * 900) + 100}`,
          source: 'SMS_FEED',
          sourceLabel: 'Telecom Aggregator SMS Log',
          entity: 'AD-PHONEPE: "Electricity bill overdue. Pay via phonepe-bill-clear.xyz"',
          brand: 'PhonePe',
          ip: '194.26.29.112',
          firstSeen: 'Just now',
          status: 'FLAGGED_CLONE',
          signatures: ['Reverse Collect Scheme', 'Urgent Disconnection Threat']
        }
      ];

      const newItem = candidates[Math.floor(Math.random() * candidates.length)];
      setFeedItems(prev => [newItem, ...prev.slice(0, 19)]);
    }, 12000);

    return () => clearInterval(interval);
  }, [isLive]);

  const filteredFeed = feedItems.filter(item => {
    if (sourceFilter === 'ALL') return true;
    return item.source === sourceFilter;
  });

  return (
    <div className="space-y-6">
      {/* Top Controller Bar */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
            <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            LIVE TELEMETRY STREAM · INGEST PIPELINE
          </div>
          <h2 className="text-base font-bold text-white font-display">
            Suspicious Certificate Logs & Smishing Harvesters
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Continuous reconnaissance scraping CT logs (crt.sh, Argon, Mammoth), telecom smishing aggregates, and rogue APK repositories.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
          >
            <option value="ALL">All Ingest Streams</option>
            <option value="CT_LOG">Certificate Logs (crt.sh)</option>
            <option value="SMS_FEED">SMS Smishing Feeds</option>
            <option value="APK_MONITOR">APK Android Repos</option>
            <option value="BANK_REPORT">Bank Incident Feeds</option>
          </select>

          <button
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              isLive 
                ? 'bg-rose-950/80 text-rose-300 border-rose-800 hover:bg-rose-900' 
                : 'bg-emerald-950/80 text-emerald-300 border-emerald-800 hover:bg-emerald-900'
            }`}
          >
            {isLive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isLive ? 'Pause Feed' : 'Resume Live'}</span>
          </button>
        </div>
      </div>

      {/* Real-time Ingestion Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] text-slate-400">Stream Processing Velocity</div>
          <div className="text-xl font-bold font-mono text-white mt-1 tabular-nums">
            142 logs / min
          </div>
          <div className="text-[11px] text-emerald-400 mt-0.5">Zero backpressure</div>
        </div>

        <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] text-slate-400">False Positive Filter Rate</div>
          <div className="text-xl font-bold font-mono text-indigo-400 mt-1 tabular-nums">
            99.1% Noise Suppressed
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Automated benign brand whitelist</div>
        </div>

        <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] text-slate-400">Mean Triage Latency</div>
          <div className="text-xl font-bold font-mono text-emerald-400 mt-1 tabular-nums">
            180 ms
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Real-time Python heuristic pipeline</div>
        </div>
      </div>

      {/* Feed List Items */}
      <div className="space-y-2.5">
        {filteredFeed.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-indigo-400">{item.id}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 font-mono border border-slate-800">
                  {item.sourceLabel}
                </span>
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.firstSeen}
                </span>
              </div>

              <div className="font-mono text-sm text-white font-semibold break-all">
                {item.entity}
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-slate-400">
                  Targeted Brand: <strong className="text-slate-200">{item.brand}</strong>
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs font-mono text-slate-400">
                  Host: {item.ip}
                </span>
                <span className="text-slate-600">·</span>
                <div className="flex flex-wrap gap-1">
                  {item.signatures.map((sig, sidx) => (
                    <span 
                      key={sidx}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-900/60 font-mono"
                    >
                      {sig}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-center shrink-0">
              <button
                onClick={() => {
                  const match = threats.find(t => t.targetBrand.toLowerCase() === item.brand.toLowerCase()) || threats[0];
                  onSelectThreatForSandbox(match);
                }}
                className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors font-medium whitespace-nowrap"
              >
                Inspect Sandbox
              </button>
              <button
                onClick={() => {
                  const match = threats.find(t => t.targetBrand.toLowerCase() === item.brand.toLowerCase()) || threats[0];
                  onOpenTakedownModal(match);
                }}
                className="px-3 py-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-semibold whitespace-nowrap"
              >
                Takedown
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
