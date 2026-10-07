import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar, NavTab } from './components/Navbar.tsx';
import { QuickScamChecker } from './components/QuickScamChecker.tsx';
import { ScamSpotterQuiz } from './components/ScamSpotterQuiz.tsx';
import { AttackFlowSimulator } from './components/AttackFlowSimulator.tsx';
import { IndiaThreatMap } from './components/IndiaThreatMap.tsx';
import { OverviewDashboard } from './components/OverviewDashboard.tsx';
import { VisualDiffComparator } from './components/VisualDiffComparator.tsx';
import { InfrastructureGraph } from './components/InfrastructureGraph.tsx';
import { CrawlerFeed } from './components/CrawlerFeed.tsx';
import { ScanWorkbench } from './components/ScanWorkbench.tsx';
import { PrecisionRecallBenchmark } from './components/PrecisionRecallBenchmark.tsx';
import { TakedownGeneratorModal } from './components/TakedownGeneratorModal.tsx';
import { ThreatItem, CampaignCluster } from './types/threat.ts';
import { 
  INITIAL_THREATS, 
  INITIAL_CAMPAIGNS, 
  INITIAL_GRAPH_NODES, 
  INITIAL_GRAPH_EDGES, 
  BENCHMARK_METRICS_DATA 
} from './data/mockThreats.ts';
import { ShieldCheck, Sparkles, Terminal, Trophy, Zap, Globe } from 'lucide-react';
import { playSound } from './utils/audio.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('quick');
  const [threats, setThreats] = useState<ThreatItem[]>(INITIAL_THREATS);
  const [campaigns, setCampaigns] = useState<CampaignCluster[]>(INITIAL_CAMPAIGNS);
  const [selectedThreat, setSelectedThreat] = useState<ThreatItem>(INITIAL_THREATS[0]);
  const [selectedCampaignForGraph, setSelectedCampaignForGraph] = useState<string>('ALL');
  
  // Takedown Modal State
  const [isTakedownModalOpen, setIsTakedownModalOpen] = useState(false);
  const [threatForTakedown, setThreatForTakedown] = useState<ThreatItem>(INITIAL_THREATS[0]);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    window.setTimeout(() => setNotification(null), 4000);
  };

  const handleSelectThreatForSandbox = (threat?: ThreatItem) => {
    if (!threat) return;
    setSelectedThreat(threat);
    setActiveTab('comparator');
  };

  const handleOpenTakedownModal = (threat?: Partial<ThreatItem> & { domain?: string; targetBrand?: string; scammerVpa?: string }) => {
    const candidate = threat ?? {};
    const fullThreat = threats.find(t => t.domain === candidate.domain) || {
      ...INITIAL_THREATS[0],
      domain: candidate.domain || 'phonepe-reward-scratch.top',
      targetBrand: candidate.targetBrand || 'PhonePe',
      scammerVpa: candidate.scammerVpa || 'cashback.rewards99@okaxis'
    };
    setThreatForTakedown(fullThreat);
    setIsTakedownModalOpen(true);
  };

  const handleSelectCampaignForGraph = (campaignId: string) => {
    setSelectedCampaignForGraph(campaignId);
    setActiveTab('graph');
  };

  const handleMarkTakedownSent = (threatId: string) => {
    setThreats(prev => prev.map(t => {
      if (t.id === threatId) {
        return { ...t, status: 'TAKEDOWN_SENT' };
      }
      return t;
    }));
    playSound('chime');
    showNotification(`Formal takedown notice successfully dispatched for ${threatForTakedown.domain}`);
  };

  const handleTriggerTakedownFromScan = (scanData: any) => {
    const tempThreat: ThreatItem = {
      id: `THR-SCAN-${Date.now().toString().slice(-4)}`,
      targetBrand: scanData.targetBrand || 'PhonePe',
      targetBrandKey: 'phonepe',
      sourceType: 'MANUAL_SUBMISSION',
      domain: scanData.domain,
      url: `https://${scanData.domain}`,
      ip: scanData.ip || '185.220.101.42',
      asn: scanData.asn || 'AS49453 Global Transit Ltd',
      scammerVpa: scanData.scammerVpa,
      riskScore: 0.96,
      visualSimilarity: 0.94,
      ssimScore: 0.92,
      perceptualHashDistance: 4,
      entropy: 4.10,
      status: 'INVESTIGATING',
      severity: 'CRITICAL',
      category: 'PHISHING_PORTAL',
      detectedAt: new Date().toISOString(),
      firstSeen: new Date().toISOString(),
      signaturesDetected: scanData.signatures_detected || ['Deceptive brand replica'],
      evasionTechniques: ['Mobile user-agent cloaking'],
      genuinePreview: {
        title: `Genuine ${scanData.targetBrand} Portal`,
        brandColor: '#5f259f',
        sampleElements: ['Official authorizer', 'No plaintext web PIN entry']
      },
      clonePreview: {
        title: `Rogue Replica (${scanData.domain})`,
        sampleElements: ['Harvesting credentials', 'Counterfeit vector logos'],
        deceptiveArtifacts: ['Fake claim countdown']
      }
    };

    setThreatForTakedown(tempThreat);
    setIsTakedownModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Primary Top Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQuickScan={() => {
          setActiveTab('quick');
          playSound('scan');
        }}
      />

      {/* Mode Switcher Banner (Friendly for beginners vs Expert SOC) */}
      <div className="bg-slate-900/60 border-b border-indigo-500/10 px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">View Mode:</span>
            <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800">
              <button
                onClick={() => {
                  setActiveTab('quick');
                  playSound('click');
                }}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'quick' || activeTab === 'quiz' || activeTab === 'simulator' || activeTab === 'map'
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  Simple Mode (For Everyone)
                </span>
              </button>
              <button
                onClick={() => {
                  setActiveTab(activeTab === 'quick' || activeTab === 'quiz' || activeTab === 'simulator' || activeTab === 'map' ? 'overview' : activeTab);
                  playSound('click');
                }}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  activeTab !== 'quick' && activeTab !== 'quiz' && activeTab !== 'simulator' && activeTab !== 'map'
                    ? 'bg-slate-800 text-indigo-300 shadow-sm border border-indigo-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3 h-3" />
                  Expert SOC Mode (Analysts)
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Python 3.10 Engine Connected
            </span>
            <span className="hidden sm:inline">·</span>
            <span>NPCI / CERT-In Framework</span>
          </div>
        </div>
      </div>

      {/* Ephemeral Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-slate-900 border border-emerald-500/60 text-white shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-medium">{notification}</span>
        </div>
      )}

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            {activeTab === 'quick' && (
              <QuickScamChecker
                onOpenTakedownModal={handleOpenTakedownModal}
                onExploreInDeepSandbox={(threat) => {
                  const match = threats.find(t => t.domain === threat.domain) || threats[0];
                  setSelectedThreat(match);
                  setActiveTab('comparator');
                }}
              />
            )}

            {activeTab === 'quiz' && (
              <ScamSpotterQuiz />
            )}

            {activeTab === 'simulator' && (
              <AttackFlowSimulator />
            )}

            {activeTab === 'map' && (
              <IndiaThreatMap
                onSelectCampaign={handleSelectCampaignForGraph}
              />
            )}

            {activeTab === 'overview' && (
              <OverviewDashboard
                threats={threats}
                campaigns={campaigns}
                onSelectThreatForSandbox={handleSelectThreatForSandbox}
                onOpenTakedownModal={handleOpenTakedownModal}
                onSelectCampaignForGraph={handleSelectCampaignForGraph}
              />
            )}

            {activeTab === 'crawler' && (
              <CrawlerFeed
                threats={threats}
                onSelectThreatForSandbox={handleSelectThreatForSandbox}
                onOpenTakedownModal={handleOpenTakedownModal}
              />
            )}

            {activeTab === 'comparator' && (
              <VisualDiffComparator
                threats={threats}
                selectedThreat={selectedThreat}
                onSelectThreat={setSelectedThreat}
                onOpenTakedownModal={handleOpenTakedownModal}
              />
            )}

            {activeTab === 'graph' && (
              <InfrastructureGraph
                initialNodes={INITIAL_GRAPH_NODES}
                initialEdges={INITIAL_GRAPH_EDGES}
                campaigns={campaigns}
                selectedCampaignId={selectedCampaignForGraph}
                onSelectCampaign={setSelectedCampaignForGraph}
              />
            )}

            {activeTab === 'scanner' && (
              <ScanWorkbench
                onTriggerTakedownFromScan={handleTriggerTakedownFromScan}
              />
            )}

            {activeTab === 'benchmark' && (
              <PrecisionRecallBenchmark
                metrics={BENCHMARK_METRICS_DATA}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 px-6 py-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>UPI Shield · Fake Payment Page & Rogue App Detection Platform</span>
          </div>
          <div>
            <span>Backend: Python 3.10 Detection Engine · React 19 Frontend</span>
          </div>
        </div>
      </footer>

      {/* Automated Takedown Report Generator Modal */}
      <TakedownGeneratorModal
        threat={threatForTakedown}
        isOpen={isTakedownModalOpen}
        onClose={() => setIsTakedownModalOpen(false)}
        onMarkTakedownSent={handleMarkTakedownSent}
      />
    </div>
  );
}

