import React, { useState } from 'react';
import { ThreatItem } from '../types/threat';
import { 
  ShieldCheck, 
  AlertOctagon, 
  Sliders, 
  Layers, 
  Code, 
  Lock, 
  Smartphone, 
  Eye, 
  FileText, 
  ArrowRight,
  Fingerprint,
  Zap,
  CheckCircle2,
  XCircle,
  HelpCircle
} from 'lucide-react';

interface VisualDiffComparatorProps {
  threats: ThreatItem[];
  selectedThreat: ThreatItem;
  onSelectThreat: (threat: ThreatItem) => void;
  onOpenTakedownModal: (threat: ThreatItem) => void;
}

export const VisualDiffComparator: React.FC<VisualDiffComparatorProps> = ({
  threats,
  selectedThreat,
  onSelectThreat,
  onOpenTakedownModal
}) => {
  const [viewMode, setViewMode] = useState<'SIDE_BY_SIDE' | 'SLIDER' | 'HEATMAP'>('SIDE_BY_SIDE');
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [activeTab, setActiveTab] = useState<'VISUAL' | 'BEHAVIOUR' | 'DOM_INSPECT'>('VISUAL');

  return (
    <div className="space-y-6">
      {/* Top Selector & Summary Bar */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-rose-950 border border-rose-800/80 flex items-center justify-center text-rose-400">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
              <span>SUSPECT CLONE INSPECTOR</span>
              <span>·</span>
              <span className="text-rose-400 font-bold">{selectedThreat.id}</span>
            </div>
            <h2 className="text-base font-bold text-white font-display">
              {selectedThreat.targetBrand} Visual & Behavioural Similarity Sandbox
            </h2>
          </div>
        </div>

        {/* Threat Switcher & Takedown CTA */}
        <div className="flex items-center gap-2.5">
          <select
            value={selectedThreat.id}
            onChange={(e) => {
              const found = threats.find(t => t.id === e.target.value);
              if (found) onSelectThreat(found);
            }}
            className="px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
          >
            {threats.map(t => (
              <option key={t.id} value={t.id}>
                {t.id} · {t.targetBrand} ({t.domain})
              </option>
            ))}
          </select>

          <button
            onClick={() => onOpenTakedownModal(selectedThreat)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm shadow-indigo-600/30 whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Generate Takedown Notice</span>
          </button>
        </div>
      </div>

      {/* Similarity & Forensic Scores Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] text-slate-400 font-medium">Perceptual Similarity (SSIM)</div>
          <div className="text-xl font-bold font-mono text-rose-400 mt-1 tabular-nums">
            {(selectedThreat.ssimScore * 100).toFixed(1)}%
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">High pixel alignment</div>
        </div>

        <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] text-slate-400 font-medium">Perceptual Hash Distance</div>
          <div className="text-xl font-bold font-mono text-amber-400 mt-1 tabular-nums">
            {selectedThreat.perceptualHashDistance} Hamming bits
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Thresh &lt; 10 = Verified Impersonation</div>
        </div>

        <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] text-slate-400 font-medium">Domain Shannon Entropy</div>
          <div className="text-xl font-bold font-mono text-indigo-400 mt-1 tabular-nums">
            {selectedThreat.entropy.toFixed(2)}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Automated DGA naming profile</div>
        </div>

        <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] text-slate-400 font-medium">Aggregated Risk Index</div>
          <div className="text-xl font-bold font-mono text-rose-400 mt-1 tabular-nums">
            {(selectedThreat.riskScore * 100).toFixed(0)} / 100
          </div>
          <div className="text-[11px] text-rose-400 mt-0.5">Active Fraud Vector</div>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab('VISUAL')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'VISUAL' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Visual Interface Comparison
          </button>
          <button
            onClick={() => setActiveTab('BEHAVIOUR')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'BEHAVIOUR' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            UPI Intent & Evasion Analysis
          </button>
          <button
            onClick={() => setActiveTab('DOM_INSPECT')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'DOM_INSPECT' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            DOM Harvester Keypad Inspection
          </button>
        </div>

        {activeTab === 'VISUAL' && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>Diff View:</span>
            <button
              onClick={() => setViewMode('SIDE_BY_SIDE')}
              className={`px-2 py-1 rounded text-xs font-medium ${viewMode === 'SIDE_BY_SIDE' ? 'bg-indigo-950 text-indigo-300 border border-indigo-800' : 'hover:bg-slate-800'}`}
            >
              Side-by-Side
            </button>
            <button
              onClick={() => setViewMode('SLIDER')}
              className={`px-2 py-1 rounded text-xs font-medium ${viewMode === 'SLIDER' ? 'bg-indigo-950 text-indigo-300 border border-indigo-800' : 'hover:bg-slate-800'}`}
            >
              Curtain Split
            </button>
            <button
              onClick={() => setViewMode('HEATMAP')}
              className={`px-2 py-1 rounded text-xs font-medium ${viewMode === 'HEATMAP' ? 'bg-indigo-950 text-indigo-300 border border-indigo-800' : 'hover:bg-slate-800'}`}
            >
              Heatmap Diff
            </button>
          </div>
        )}
      </div>

      {/* Tab 1: Visual Interface Comparator */}
      {activeTab === 'VISUAL' && (
        <div className="space-y-4">
          {viewMode === 'SIDE_BY_SIDE' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Genuine Brand Card */}
              <div className="rounded-xl border border-emerald-800/60 bg-slate-900/80 p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-400 font-mono uppercase">
                      Genuine Brand Baseline: {selectedThreat.targetBrand}
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono border border-emerald-800">
                    VERIFIED EV CERT
                  </span>
                </div>

                {/* Simulated Genuine UI Mockup */}
                <div 
                  className="rounded-lg p-5 text-white space-y-4 min-h-[340px] flex flex-col justify-between shadow-inner"
                  style={{ backgroundColor: selectedThreat.genuinePreview.brandColor }}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold tracking-tight">
                      {selectedThreat.targetBrand}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full font-mono">
                      <Lock className="w-3 h-3" />
                      <span>256-Bit HSM Encrypted</span>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 space-y-3">
                    <div className="text-xs font-medium text-white/80">Authoritative Payment Guarantee</div>
                    <div className="text-sm font-semibold">
                      Payment transactions authorized strictly inside the official client sandbox.
                    </div>
                    <ul className="text-xs space-y-1.5 text-white/90">
                      {selectedThreat.genuinePreview.sampleElements.map((el, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0 mt-0.5" />
                          <span>{el}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[11px] text-white/70">
                    <span>NPCI Approved Gateway</span>
                    <span>No Web PIN Prompts</span>
                  </div>
                </div>

                <div className="text-xs text-slate-400 space-y-1">
                  <div className="font-semibold text-slate-300">Brand Trust Characteristics:</div>
                  <p>Legitimate UPI transactions NEVER ask for PIN to receive cashback or refunds.</p>
                </div>
              </div>

              {/* Suspect Clone Card */}
              <div className="rounded-xl border border-rose-800/80 bg-slate-900/80 p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <AlertOctagon className="w-4 h-4 text-rose-400" />
                    <span className="text-xs font-bold text-rose-400 font-mono uppercase">
                      Suspect Phishing Clone: {selectedThreat.domain}
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950 text-rose-300 font-mono border border-rose-800">
                    ROGUE REPLICA
                  </span>
                </div>

                {/* Simulated Phishing UI Mockup */}
                <div 
                  className="rounded-lg p-5 text-white space-y-4 min-h-[340px] flex flex-col justify-between shadow-inner relative overflow-hidden"
                  style={{ backgroundColor: selectedThreat.genuinePreview.brandColor }}
                >
                  {/* Subtle deceptive watermark */}
                  <div className="absolute top-2 right-2 bg-rose-600 text-white text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider animate-pulse">
                    Fake Scammer Overlay
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold tracking-tight">
                      {selectedThreat.targetBrand} Rewards™
                    </div>
                    <div className="text-[11px] bg-amber-400/30 text-amber-200 px-2.5 py-1 rounded-full font-bold">
                      Pending ₹4,999 Claim
                    </div>
                  </div>

                  <div className="bg-black/40 backdrop-blur-md rounded-lg p-4 space-y-3 border border-amber-500/40">
                    <div className="text-xs font-bold text-amber-300">
                      ⚡ Congratulations! Scratch Card Won: ₹4,999
                    </div>
                    <div className="text-xs text-white/90">
                      Enter your 6-digit UPI PIN to immediately claim and deposit money to your bank account:
                    </div>

                    {/* Fake MPIN input dots */}
                    <div className="flex items-center justify-center gap-2 py-2">
                      {[1, 2, 3, 4, 5, 6].map((dot) => (
                        <div key={dot} className="w-3.5 h-3.5 rounded-full bg-white/30 border border-white/60"></div>
                      ))}
                    </div>

                    <button className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded shadow-lg">
                      CLAIM CASHBACK NOW (UPI INTENT)
                    </button>
                  </div>

                  <div className="text-[11px] text-amber-200/80 bg-black/30 p-2 rounded border border-amber-500/20">
                    <span className="font-semibold text-rose-300">[Deceptive Vector]: </span>
                    Tricks victim into thinking they are receiving money, while triggering an unauthorized payment collect request.
                  </div>
                </div>

                <div className="text-xs text-slate-400 space-y-1">
                  <div className="font-semibold text-rose-300">Extracted Deceptive Artifacts:</div>
                  <ul className="space-y-1">
                    {selectedThreat.clonePreview.deceptiveArtifacts.map((art, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 text-slate-300">
                        <span className="text-rose-400">×</span>
                        <span>{art}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {viewMode === 'SLIDER' && (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="text-emerald-400 font-semibold">◀ 100% Genuine Baseline</span>
                <span className="font-mono tabular-nums">{sliderPosition}% Split</span>
                <span className="text-rose-400 font-semibold">100% Phishing Clone ▶</span>
              </div>

              <div className="relative h-80 rounded-xl overflow-hidden border border-slate-700 select-none">
                {/* Clone Background (Right) */}
                <div 
                  className="absolute inset-0 p-6 flex flex-col justify-between text-white"
                  style={{ backgroundColor: selectedThreat.genuinePreview.brandColor }}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">{selectedThreat.targetBrand} (Rogue Clone)</h3>
                    <span className="px-2 py-1 bg-rose-600 rounded text-xs font-bold">MPIN HARVESTER</span>
                  </div>
                  <div className="bg-black/50 p-4 rounded-lg text-center space-y-2 border border-rose-500/50">
                    <div className="text-sm font-bold text-amber-300">ENTER 6-DIGIT UPI PIN TO RECEIVE CASHBACK</div>
                    <div className="flex justify-center gap-3 py-2">
                      {[1,2,3,4,5,6].map(i => <div key={i} className="w-4 h-4 rounded-full bg-white/40 border border-white"></div>)}
                    </div>
                  </div>
                  <div className="text-xs text-white/70">Unregistered Top Level Domain: {selectedThreat.domain}</div>
                </div>

                {/* Genuine Foreground (Left, Clipped) */}
                <div 
                  className="absolute inset-0 p-6 flex flex-col justify-between text-white border-r-2 border-white shadow-2xl"
                  style={{ 
                    backgroundColor: selectedThreat.genuinePreview.brandColor,
                    clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
                  }}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">{selectedThreat.targetBrand} (Official App)</h3>
                    <span className="px-2 py-1 bg-emerald-600 rounded text-xs font-bold">AUTHENTIC NPCI</span>
                  </div>
                  <div className="bg-white/20 p-4 rounded-lg text-center space-y-2">
                    <div className="text-sm font-bold">DIRECT IN-APP SECURE TRANSACTION</div>
                    <div className="text-xs text-white/90">Official cryptographic tokenization. No web-based PIN input.</div>
                  </div>
                  <div className="text-xs text-white/70">Authoritative Domain: phonepe.com / paytm.com</div>
                </div>

                {/* Draggable Divider Handle */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="w-6 h-6 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg text-[10px] font-bold">
                    ⇄
                  </div>
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          )}

          {viewMode === 'HEATMAP' && (
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Perceptual & Structural Anomaly Heatmap (SSIM Error Delta)
                  </h3>
                  <p className="text-xs text-slate-400">
                    High intensity areas (Crimson/Yellow) mark fraudulent credential harvesters and unauthorized NPCI logo usage.
                  </p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-rose-950 text-rose-300 border border-rose-800">
                  94.2% Spatial Correlation
                </span>
              </div>

              {/* Heatmap Visualization Canvas Representation */}
              <div className="p-6 rounded-lg bg-slate-950 border border-slate-800 space-y-4 relative overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 rounded border border-rose-500/80 bg-rose-950/40 space-y-1">
                    <div className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                      Zone A: Fake MPIN Keypad Input
                    </div>
                    <div className="text-[11px] text-slate-300">
                      Delta: 0.89 discrepancy. Phishing kit renders 6 circular dots capturing banking credentials in plaintext.
                    </div>
                  </div>

                  <div className="p-3 rounded border border-amber-500/80 bg-amber-950/40 space-y-1">
                    <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      Zone B: Stolen NPCI & BHIM Seals
                    </div>
                    <div className="text-[11px] text-slate-300">
                      Delta: 0.98 asset identity. Counterfeit regulatory compliance emblems copied from genuine vector repository.
                    </div>
                  </div>

                  <div className="p-3 rounded border border-rose-500/80 bg-rose-950/40 space-y-1">
                    <div className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                      Zone C: Urgency Deception Ticker
                    </div>
                    <div className="text-[11px] text-slate-300">
                      Delta: 0.92 layout injection. Artificial countdown timer prompting hurried victim response.
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
                  <div>[Forensic Signature]: PERCEPTUAL_HASH_MATCH = 0xFA39182901992 (Target Brand: {selectedThreat.targetBrand})</div>
                  <div>[Hamming Distance]: 4 bits (Confirmed Brand Trademark Infringement)</div>
                  <div>[DOM Similarity]: 0.912 Structural Tree Alignment with Official Portal CSS</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Behavioural & UPI Intent Analysis */}
      {activeTab === 'BEHAVIOUR' && (
        <div className="space-y-4">
          {/* Extracted UPI Intent Box */}
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Decoded UPI Intent & Collect Request Analysis
              </h3>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                REVERSE-COLLECT FRAUD SCHEME
              </span>
            </div>

            {selectedThreat.rawUpiIntent ? (
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 break-all">
                  {selectedThreat.rawUpiIntent}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-500">Payee VPA (`pa`):</span>
                    <div className="font-mono text-indigo-300 font-semibold mt-0.5">
                      {selectedThreat.parsedIntent?.pa || selectedThreat.scammerVpa}
                    </div>
                  </div>

                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-500">Payee Display Name (`pn`):</span>
                    <div className="font-mono text-slate-200 font-semibold mt-0.5">
                      {selectedThreat.parsedIntent?.pn || 'Official Refund Desk'}
                    </div>
                  </div>

                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-500">Forced Debit Amount (`am`):</span>
                    <div className="font-mono text-rose-400 font-bold mt-0.5">
                      ₹{selectedThreat.parsedIntent?.am || '4,999'}
                    </div>
                  </div>

                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-500">Transaction Note (`tn`):</span>
                    <div className="font-mono text-slate-300 mt-0.5">
                      {selectedThreat.parsedIntent?.tn || 'Refund Voucher'}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded bg-amber-950/40 border border-amber-800/80 text-xs text-amber-200">
                  <strong>Attack Mechanism:</strong> The page leads the victim to believe clicking &quot;Claim Reward&quot; will transfer ₹4,999 to their bank account. In reality, it triggers an Android `Intent.ACTION_VIEW` targeting installed UPI apps with a DEBIT collect request for ₹4,999 payable to the fraudster VPA ({selectedThreat.scammerVpa}).
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-400 py-4">
                No direct inline `upi://` schema found. The suspect kit relies on external SMS OTP relay and Card CVV harvesting.
              </div>
            )}
          </div>

          {/* Evasion Tactics Detected */}
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              Active Evasion & Anti-Analysis Tactics Detected
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedThreat.evasionTechniques.map((tech, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded bg-rose-950 border border-rose-800 text-rose-300 flex items-center justify-center text-xs font-mono shrink-0">
                    !
                  </span>
                  <div>
                    <div className="text-xs font-semibold text-slate-200">{tech.split(':')[0]}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{tech.split(':')[1] || tech}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: DOM Harvester Keypad Inspection */}
      {activeTab === 'DOM_INSPECT' && (
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Code className="w-4 h-4 text-indigo-400" />
              Phishing DOM Harvest Signatures
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Crawled from {selectedThreat.url}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="text-slate-400 font-bold border-b border-slate-800 pb-1.5">
                // Credential Harvester DOM Nodes
              </div>
              <div className="text-slate-300 space-y-1">
                <div>&lt;form id=&quot;mpinForm&quot; action=&quot;/api/v1/log_pin&quot; method=&quot;POST&quot;&gt;</div>
                <div className="pl-4 text-rose-400">&lt;input type=&quot;password&quot; name=&quot;upi_mpin&quot; maxlength=&quot;6&quot; /&gt;</div>
                <div className="pl-4 text-amber-300">&lt;input type=&quot;text&quot; name=&quot;bank_account&quot; placeholder=&quot;Account No&quot; /&gt;</div>
                <div className="pl-4 text-cyan-300">&lt;input type=&quot;hidden&quot; name=&quot;victim_ip&quot; value=&quot;client_ip&quot; /&gt;</div>
                <div>&lt;/form&gt;</div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                [Exfiltration Channel]: Harvester submits plaintext PIN directly to Telegram webhook channel: {selectedThreat.c2Telegram}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-slate-200 border-b border-slate-800 pb-1.5">
                Security Violation Analysis
              </div>

              <ul className="text-xs space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Direct MPIN Eavesdropping:</strong> Web pages are strictly prohibited from rendering UPI PIN input dialogues under NPCI procedural guidelines.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>SMS OTP Interception Hook:</strong> If rogue APK is installed, Accessibility Services grant background read permission on incoming SMS messages from bank sender codes.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Host Infrastructure Isolation:</strong> Server hosted at {selectedThreat.ip} lacks EV SSL and is flagged for bulletproof hosting.
                  </span>
                </li>
              </ul>

              <button
                onClick={() => onOpenTakedownModal(selectedThreat)}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold transition-colors mt-2"
              >
                Assemble Evidence Dossier for CERT-In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
