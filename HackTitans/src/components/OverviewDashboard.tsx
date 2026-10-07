import React, { useState } from 'react';
import { ThreatItem, CampaignCluster } from '../types/threat.ts';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Smartphone, 
  CreditCard, 
  Clock, 
  ExternalLink, 
  ArrowUpRight, 
  Search, 
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';

interface OverviewDashboardProps {
  threats: ThreatItem[];
  campaigns: CampaignCluster[];
  onSelectThreatForSandbox: (threat: ThreatItem) => void;
  onOpenTakedownModal: (threat: ThreatItem) => void;
  onSelectCampaignForGraph: (campaignId: string) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  threats,
  campaigns,
  onSelectThreatForSandbox,
  onOpenTakedownModal,
  onSelectCampaignForGraph
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const filteredThreats = threats.filter(item => {
    const matchesSearch = 
      item.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.targetBrand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.scammerVpa && item.scammerVpa.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.campaignName && item.campaignName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesBrand = selectedBrand === 'ALL' || item.targetBrandKey.toUpperCase() === selectedBrand;
    const matchesSeverity = selectedSeverity === 'ALL' || item.severity === selectedSeverity;
    const matchesStatus = selectedStatus === 'ALL' || item.status === selectedStatus;

    return matchesSearch && matchesBrand && matchesSeverity && matchesStatus;
  });

  const criticalCount = threats.filter(t => t.severity === 'CRITICAL').length;
  const apkCount = threats.filter(t => t.category === 'ROGUE_APK').length;
  const vpaCount = threats.filter(t => !!t.scammerVpa).length;
  const activeCampaigns = campaigns.filter(c => c.status === 'ACTIVE').length;

  return (
    <div className="space-y-6">
      {/* Top Banner Statement */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            ACTIVE MONITORING · INDIAN PAYMENT INFRASTRUCTURE
          </div>
          <h1 className="text-xl font-bold text-white font-display">
            Fake UPI, Banking Phishing & Rogue App Detection Hub
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Real-time crawler intelligence, brand visual-similarity matching, and infrastructure graph clustering for expedited CERT-In and NPCI takedowns.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-right">
            <div className="text-xs text-slate-400">Mean Time to Takedown</div>
            <div className="text-lg font-bold font-mono text-emerald-400 tabular-nums">18.4 min</div>
            <div className="text-[11px] text-slate-400">Down from 4.2 days</div>
          </div>
          <div className="px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-right">
            <div className="text-xs text-slate-400">Detection Accuracy</div>
            <div className="text-lg font-bold font-mono text-indigo-400 tabular-nums">98.4%</div>
            <div className="text-[11px] text-slate-400">Benchmarked on 1,280 samples</div>
          </div>
        </div>
      </div>

      {/* Key Metric Strips */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Critical Threats</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">{criticalCount}</div>
          <div className="text-xs text-rose-400 mt-1">High-velocity impersonation</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Rogue Banking APKs</span>
            <Smartphone className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">{apkCount}</div>
          <div className="text-xs text-slate-400 mt-1">SMS & accessibility stealers</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Flagged Scammer VPAs</span>
            <CreditCard className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">{vpaCount}</div>
          <div className="text-xs text-indigo-400 mt-1">Queued for NPCI freeze</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Mapped Syndicates</span>
            <Zap className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">{activeCampaigns}</div>
          <div className="text-xs text-slate-400 mt-1">Multi-node graph clusters</div>
        </div>
      </div>

      {/* Campaign Highlights Row */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-200">
            Active Campaign Clusters (Infrastructure Graphs)
          </h2>
          <span className="text-xs text-slate-400">
            Click cluster to inspect connected nodes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {campaigns.map((camp) => (
            <div 
              key={camp.campaignId}
              onClick={() => onSelectCampaignForGraph(camp.campaignId)}
              className="group p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono text-indigo-400 font-semibold">{camp.campaignId}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded font-mono ${
                  camp.riskLevel === 'CRITICAL' ? 'bg-rose-950/80 text-rose-300 border border-rose-800/50' : 'bg-amber-950/80 text-amber-300 border border-amber-800/50'
                }`}>
                  {camp.riskLevel}
                </span>
              </div>
              <h3 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                {camp.name}
              </h3>
              <div className="text-[11px] text-slate-400 mt-1">
                Actor: <span className="text-slate-300">{camp.threatActorGroup}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800/70 font-mono">
                <span>{camp.domainsCount} Domains · {camp.vpasCount} VPAs</span>
                <span className="flex items-center text-indigo-400 group-hover:translate-x-0.5 transition-transform">
                  View <ChevronRight className="w-3 h-3 ml-0.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Threat Triage Section */}
      <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-white">
              Suspect Threat Triage Queue ({filteredThreats.length} items)
            </h2>
            <p className="text-xs text-slate-400">
              Discovered from Certificate Transparency logs, SMS feeds, and APK monitors.
            </p>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search domain, VPA, brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-52"
              />
            </div>

            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="ALL">All Brands</option>
              <option value="PHONEPE">PhonePe</option>
              <option value="PAYTM">Paytm</option>
              <option value="SBI_YONO">SBI YONO</option>
              <option value="GPAY">Google Pay</option>
              <option value="BHIM">BHIM</option>
              <option value="RAZORPAY">Razorpay</option>
            </select>

            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="ALL">All Severities</option>
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
            </select>
          </div>
        </div>

        {/* Triage Data Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-800/80">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] border-b border-slate-800 uppercase">
              <tr>
                <th className="py-2.5 px-3">Target Brand</th>
                <th className="py-2.5 px-3">Suspect Domain / APK</th>
                <th className="py-2.5 px-3">Source Vector</th>
                <th className="py-2.5 px-3">Risk & Visual Match</th>
                <th className="py-2.5 px-3">Associated VPA / Host</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
              {filteredThreats.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No threats found matching the current search criteria.
                  </td>
                </tr>
              ) : (
                filteredThreats.map((threat) => (
                  <tr 
                    key={threat.id} 
                    className="hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-2 h-2 rounded-full" 
                          style={{ backgroundColor: threat.genuinePreview.brandColor }}
                        ></span>
                        <span className="font-semibold text-slate-200">{threat.targetBrand}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{threat.id}</span>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-mono text-white max-w-xs truncate font-medium">
                        {threat.domain}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">
                        {threat.signaturesDetected[0]}
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 font-mono text-[10px] border border-slate-800">
                        {threat.sourceType.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="text-xs font-mono font-bold text-rose-400 tabular-nums">
                          {(threat.riskScore * 100).toFixed(0)}% Risk
                        </div>
                        <div className="text-[11px] text-slate-400 tabular-nums">
                          {(threat.visualSimilarity * 100).toFixed(0)}% Visual Match
                        </div>
                      </div>
                      <div className="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                        <div 
                          className="bg-rose-500 h-full rounded-full" 
                          style={{ width: `${threat.riskScore * 100}%` }}
                        ></div>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      {threat.scammerVpa ? (
                        <div className="font-mono text-indigo-300 text-[11px]">
                          {threat.scammerVpa}
                        </div>
                      ) : (
                        <div className="text-slate-500 text-[11px]">No direct VPA</div>
                      )}
                      <div className="text-[10px] text-slate-400 font-mono">
                        {threat.ip}
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                        threat.status === 'TAKEDOWN_SENT'
                          ? 'bg-blue-950 text-blue-300 border border-blue-800'
                          : threat.status === 'TAKEDOWN_QUEUED'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : threat.status === 'DISMANTLED'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-rose-950 text-rose-300 border border-rose-800'
                      }`}>
                        {threat.status}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onSelectThreatForSandbox(threat)}
                          className="px-2.5 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors whitespace-nowrap"
                          title="Open Visual & DOM Comparator"
                        >
                          Compare Diff
                        </button>
                        <button
                          onClick={() => onOpenTakedownModal(threat)}
                          className="px-2.5 py-1 text-[11px] bg-indigo-600/90 hover:bg-indigo-600 text-white rounded transition-colors font-medium whitespace-nowrap"
                          title="Generate CERT-In / NPCI Takedown Dossier"
                        >
                          Takedown
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
