import React, { useState } from 'react';
import { 
  Search, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  Terminal, 
  FileText, 
  Zap, 
  ShieldCheck, 
  Layers, 
  Copy, 
  Check, 
  RefreshCw 
} from 'lucide-react';

interface ScanWorkbenchProps {
  onTriggerTakedownFromScan: (scanData: any) => void;
}

export const ScanWorkbench: React.FC<ScanWorkbenchProps> = ({ onTriggerTakedownFromScan }) => {
  const [url, setUrl] = useState('https://phonepe-reward-scratch.top/claim-5000');
  const [htmlSnippet, setHtmlSnippet] = useState(
    '<div>Enter your 6-digit UPI PIN to claim ₹5,000 cash reward directly in bank</div>\n<a href="upi://pay?pa=cashback.rewards99@okaxis&pn=PhonePeCashback&am=5000&cu=INR">Claim Now</a>'
  );
  const [smsText, setSmsText] = useState('Dear customer, your PhonePe scratch reward worth ₹5000 is waiting. Click to deposit to account: https://phonepe-reward-scratch.top/claim-5000');
  const [packageName, setPackageName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  // Preset scenarios
  const applyPreset = (presetKey: string) => {
    if (presetKey === 'phonepe_phish') {
      setUrl('https://phonepe-reward-scratch.top/claim-5000');
      setHtmlSnippet('<div>Enter your 6-digit UPI PIN to claim ₹5,000 cash reward</div>\n<a href="upi://pay?pa=cashback.rewards99@okaxis&pn=PhonePeCashback&am=5000&cu=INR">Claim</a>');
      setSmsText('Dear user, you have won ₹5000 cashback on PhonePe. Click here: https://phonepe-reward-scratch.top/claim-5000');
      setPackageName('');
    } else if (presetKey === 'paytm_kyc') {
      setUrl('https://paytm-kyc-verify-portal.site/verify-account');
      setHtmlSnippet('<form action="/api/log_cvv"><input name="card_no" /><input name="cvv" placeholder="CVV" /><input name="otp" /></form>');
      setSmsText('VK-PAYTM: Your Paytm KYC is expiring today. Your wallet will be blocked. Click to update: https://paytm-kyc-verify-portal.site/verify-account');
      setPackageName('');
    } else if (presetKey === 'sbi_apk') {
      setUrl('https://sbi-reward-points-apk.xyz/SBI_Yono_Rewards_v3.apk');
      setHtmlSnippet('');
      setSmsText('SBI Alert: 9850 reward points expiring today. Download SBI Yono Rewards app to redeem for ₹4925 cash.');
      setPackageName('com.sbi.rewards.redeempoint.yono');
    } else if (presetKey === 'genuine_phonepe') {
      setUrl('https://phonepe.com/checkout/merchant_99182');
      setHtmlSnippet('<div>Official PhonePe Merchant Gateway. Authorize transaction inside official app.</div>');
      setSmsText('');
      setPackageName('com.phonepe.app');
    } else if (presetKey === 'genuine_hdfc') {
      setUrl('https://netbanking.hdfcbank.com/netbanking');
      setHtmlSnippet('<div>HDFC Bank NetBanking Security Portal. EV SSL Verified.</div>');
      setSmsText('');
      setPackageName('');
    } else if (presetKey === 'gpay_collect_trap') {
      setUrl('https://gpay-refund-nodal.live/instant-settlement');
      setHtmlSnippet('<a href="upi://pay?pa=gpay.settle.refund@okhdfcbank&pn=GPaySupportDesk&am=12500&cu=INR&tn=Refund%20Settlement">Accept Refund</a>');
      setSmsText('Google Pay Support: Your failed recharge refund of ₹12,500 is ready. Tap to receive.');
      setPackageName('');
    }
  };

  const handleRunScan = async () => {
    setIsLoading(true);
    setScanResult(null);

    try {
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          html: htmlSnippet,
          sms_text: smsText,
          package_name: packageName
        })
      });

      const data = await response.json();
      if (data.status === 'success') {
        setScanResult(data.result);
      }
    } catch (err) {
      console.error('Scan error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-indigo-400">
            REAL-TIME FORENSIC TESTING WORKBENCH
          </div>
          <h2 className="text-base font-bold text-white font-display">
            Suspect Link, APK Manifest & UPI Intent Analyzer
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Executes the full Python similarity engine, brand lexical matching, UPI intent dissection, and evasion heuristics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunScan}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm shadow-indigo-600/30 disabled:opacity-50 whitespace-nowrap"
          >
            {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            <span>{isLoading ? 'Executing Engine...' : 'Run Forensic Scan'}</span>
          </button>
        </div>
      </div>

      {/* Preset Scenario Quick Selectors */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-300">
          Load Real-World Ground Truth Presets:
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => applyPreset('phonepe_phish')}
            className="px-2.5 py-1 text-xs bg-slate-900 hover:bg-slate-800 text-rose-300 rounded border border-rose-900/60 font-mono transition-colors"
          >
            [Malicious] PhonePe ₹5,000 Scratch Link
          </button>
          <button
            onClick={() => applyPreset('paytm_kyc')}
            className="px-2.5 py-1 text-xs bg-slate-900 hover:bg-slate-800 text-rose-300 rounded border border-rose-900/60 font-mono transition-colors"
          >
            [Malicious] Paytm KYC Suspension Smishing
          </button>
          <button
            onClick={() => applyPreset('sbi_apk')}
            className="px-2.5 py-1 text-xs bg-slate-900 hover:bg-slate-800 text-rose-300 rounded border border-rose-900/60 font-mono transition-colors"
          >
            [Malicious] SBI YONO Rewards APK Trojan
          </button>
          <button
            onClick={() => applyPreset('gpay_collect_trap')}
            className="px-2.5 py-1 text-xs bg-slate-900 hover:bg-slate-800 text-rose-300 rounded border border-rose-900/60 font-mono transition-colors"
          >
            [Malicious] GPay ₹12,500 Collect Trap
          </button>
          <button
            onClick={() => applyPreset('genuine_phonepe')}
            className="px-2.5 py-1 text-xs bg-slate-900 hover:bg-slate-800 text-emerald-300 rounded border border-emerald-900/60 font-mono transition-colors"
          >
            [Benign] Genuine PhonePe Merchant URL
          </button>
          <button
            onClick={() => applyPreset('genuine_hdfc')}
            className="px-2.5 py-1 text-xs bg-slate-900 hover:bg-slate-800 text-emerald-300 rounded border border-emerald-900/60 font-mono transition-colors"
          >
            [Benign] Genuine HDFC NetBanking
          </button>
        </div>
      </div>

      {/* Input Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Target Suspect FQDN / Link:
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 text-xs font-mono bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Raw SMS / Smishing Body:
            </label>
            <textarea
              rows={2}
              value={smsText}
              onChange={(e) => setSmsText(e.target.value)}
              placeholder="Inbound message text with urgency claims..."
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Android APK Package Name (if mobile application):
            </label>
            <input
              type="text"
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              placeholder="com.bank.app..."
              className="w-full px-3 py-2 text-xs font-mono bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="space-y-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Scraped Phishing HTML / Intent Snippet:
            </label>
            <textarea
              rows={7}
              value={htmlSnippet}
              onChange={(e) => setHtmlSnippet(e.target.value)}
              placeholder="Paste suspect HTML form or upi:// intent link..."
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <div className="text-[11px] text-slate-400">
            Engine evaluates: Perceptual brand similarity, homoglyphs, MPIN input harvesting, reverse-collect intent tags, and evasion scripts.
          </div>
        </div>
      </div>

      {/* Analysis Result Display */}
      {scanResult && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${
                scanResult.classification === 'MALICIOUS_CLONE' ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'
              }`}></span>
              <div>
                <span className="text-xs font-mono text-slate-400">CLASSIFICATION OUTCOME</span>
                <h3 className={`text-lg font-bold font-display ${
                  scanResult.classification === 'MALICIOUS_CLONE' ? 'text-rose-400' : 'text-emerald-400'
                }`}>
                  {scanResult.classification === 'MALICIOUS_CLONE' ? 'MALICIOUS CLONE DETECTED' : 'BENIGN PAYMENT PORTAL'}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {scanResult.classification === 'MALICIOUS_CLONE' && (
                <button
                  onClick={() => onTriggerTakedownFromScan({
                    domain: scanResult.domain || url,
                    targetBrand: scanResult.target_brand,
                    ip: '185.220.101.42',
                    asn: 'AS49453 Global Transit Ltd',
                    scammerVpa: scanResult.upi_intent_analysis?.vpa || 'cashback.desk99@okaxis',
                    signatures_detected: scanResult.signatures_detected
                  })}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap"
                >
                  Generate Takedown Notice
                </button>
              )}
            </div>
          </div>

          {/* Metric Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-[11px] text-slate-400">Calculated Risk Index</span>
              <div className="text-lg font-bold font-mono text-rose-400 mt-0.5">
                {(scanResult.risk_score * 100).toFixed(0)}%
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-[11px] text-slate-400">Targeted Brand Match</span>
              <div className="text-lg font-bold font-mono text-white mt-0.5">
                {scanResult.target_brand}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-[11px] text-slate-400">Visual Similarity</span>
              <div className="text-lg font-bold font-mono text-indigo-400 mt-0.5">
                {(scanResult.visual_similarity * 100).toFixed(1)}%
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-[11px] text-slate-400">Shannon Entropy</span>
              <div className="text-lg font-bold font-mono text-slate-300 mt-0.5">
                {scanResult.entropy?.toFixed(2) || '0.00'}
              </div>
            </div>
          </div>

          {/* Signatures & Evasion Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-200">
                Technical Forensic Signatures ({scanResult.signatures_detected?.length || 0}):
              </div>
              <ul className="text-xs space-y-1.5 text-slate-300">
                {scanResult.signatures_detected?.map((sig: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-400 font-bold shrink-0 mt-0.5">!</span>
                    <span>{sig}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-200">
                Evasion & Anti-Analysis Heuristics ({scanResult.evasion_techniques?.length || 0}):
              </div>
              {scanResult.evasion_techniques?.length ? (
                <ul className="text-xs space-y-1.5 text-slate-300">
                  {scanResult.evasion_techniques.map((tech: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold shrink-0 mt-0.5">⚡</span>
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-xs text-slate-500">No active evasion wrappers detected.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
