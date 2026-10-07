import React, { useState, useEffect } from 'react';
import { ThreatItem, TakedownPackage } from '../types/threat';
import { 
  FileText, 
  Copy, 
  Check, 
  Download, 
  Send, 
  ShieldAlert, 
  Building, 
  Lock, 
  RefreshCw 
} from 'lucide-react';

interface TakedownGeneratorModalProps {
  threat: ThreatItem;
  isOpen: boolean;
  onClose: () => void;
  onMarkTakedownSent: (threatId: string) => void;
}

export const TakedownGeneratorModal: React.FC<TakedownGeneratorModalProps> = ({
  threat,
  isOpen,
  onClose,
  onMarkTakedownSent
}) => {
  const [authority, setAuthority] = useState<'CERT-In' | 'NPCI' | 'Registrar' | 'Google Play Protect'>('CERT-In');
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportPackage, setReportPackage] = useState<TakedownPackage | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && threat) {
      fetchTakedownReport(authority);
    }
  }, [isOpen, threat, authority]);

  const fetchTakedownReport = async (selectedAuthority: string) => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/takedown/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          threatId: threat.id,
          authority: selectedAuthority
        })
      });

      const data = await res.json();
      if (data.status === 'success') {
        setReportPackage(data.takedownPackage);
      }
    } catch (err) {
      console.error('Failed to generate takedown report:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (reportPackage) {
      navigator.clipboard.writeText(reportPackage.body);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (reportPackage) {
      const blob = new Blob([reportPackage.body], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `TAKEDOWN_NOTICE_${authority.replace(/\s+/g, '_')}_${threat.domain}.txt`;
      a.click();
    }
  };

  const handleDispatch = () => {
    onMarkTakedownSent(threat.id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-display">
                Automated Legal Takedown Report Generator
              </h3>
              <p className="text-xs text-slate-400">
                Target: {threat.domain} ({threat.targetBrand} Phishing Kit)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1"
          >
            ✕ Close
          </button>
        </div>

        {/* Authority Selection Bar */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Recipient Authority:</span>
            <div className="flex flex-wrap gap-1.5">
              {(['CERT-In', 'NPCI', 'Registrar', 'Google Play Protect'] as const).map((auth) => (
                <button
                  key={auth}
                  onClick={() => setAuthority(auth)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    authority === auth 
                      ? 'bg-indigo-600 text-white shadow-sm' 
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {auth}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs font-mono text-slate-400">
            Destination: <strong className="text-indigo-400">{reportPackage?.recipientEmail || 'Loading...'}</strong>
          </div>
        </div>

        {/* Content Preview */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3 font-mono text-xs">
          {isGenerating ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400 space-y-2 font-sans">
              <RefreshCw className="w-6 h-6 animate-spin text-indigo-500" />
              <span>Formatting statutory report via Python engine...</span>
            </div>
          ) : reportPackage ? (
            <div className="space-y-3">
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-slate-400">
                  <span className="text-slate-500">Subject: </span>
                  <span className="text-white font-semibold">{reportPackage.subject}</span>
                </div>
                <div className="text-slate-400">
                  <span className="text-slate-500">Evidence SHA256: </span>
                  <span className="text-emerald-400">{reportPackage.evidenceHash}</span>
                </div>
                <div className="text-slate-400">
                  <span className="text-slate-500">Statutory Authority: </span>
                  <span className="text-indigo-300">{reportPackage.statutoryReference}</span>
                </div>
              </div>

              <div className="p-4 rounded bg-slate-950 border border-slate-800 text-slate-300 whitespace-pre-wrap leading-relaxed">
                {reportPackage.body}
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors border border-slate-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .txt</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDispatch}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors shadow-sm shadow-emerald-600/30"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Mark Takedown Dispatched</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
