import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ShieldAlert, 
  ShieldCheck, 
  Smartphone, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  Send,
  Lock,
  Layers
} from 'lucide-react';
import { playSound } from '../utils/audio.ts';

const ATTACK_STEPS = [
  {
    step: 1,
    title: '1. Spoofed SMS / WhatsApp Lure',
    subtitle: 'Mule phone network dispatches urgent reward lure',
    visualType: 'SMS',
    details: 'The victim receives an urgent SMS with spoofed sender header "VK-PHONEPE": "Congratulations! You have won ₹4,999 Diwali Cashback. Click to deposit to bank: https://phonepe-reward-scratch.top/claim"',
    actor: 'Mewat / Jamtara SMS Gateway',
    stateBadge: 'LURE INBOUND'
  },
  {
    step: 2,
    title: '2. Cloned Phishing Kit Loads',
    subtitle: 'Disposable domain replicates PhonePe brand assets',
    visualType: 'PAGE',
    details: 'Victim taps link. The browser loads phonepe-reward-scratch.top hosted on offshore bulletproof server (185.220.101.42). CSS and logos stolen from official repository.',
    actor: 'Bulletproof Host (AS49453)',
    stateBadge: 'PAGE SERVED'
  },
  {
    step: 3,
    title: '3. Web MPIN Keypad Harvest Prompt',
    subtitle: 'Victim asked for 6-digit secret UPI PIN',
    visualType: 'KEYPAD',
    details: 'The clone displays an animated scratch card revealing "₹4,999 Won!". A fake input dialog appears: "Enter your 6-digit UPI PIN to verify receiving account".',
    actor: 'Credential Harvester Hook',
    stateBadge: 'HARVEST ACTIVE'
  },
  {
    step: 4,
    title: '4. Deceptive Reverse-Collect Intent',
    subtitle: 'Intent payload switches from Credit to Debit',
    visualType: 'INTENT',
    details: 'Instead of crediting ₹4,999, the button executes upi://pay?pa=cashback.rewards99@okaxis&am=4999. In UPI protocol, this triggers an unauthorized DEBIT request against victim balance.',
    actor: 'Scammer VPA: cashback.rewards99@okaxis',
    stateBadge: 'DEBIT TRAP INJECTED'
  },
  {
    step: 5,
    title: '5. UPI Shield Real-Time Interception!',
    subtitle: 'Zero-day shield detects clone and halts transaction',
    visualType: 'BLOCKED',
    details: 'UPI Shield neural similarity engine detects 94% visual match on rogue FQDN, flags reverse-collect intent, blocks packet forwarding, and queues an instant freeze request to NPCI.',
    actor: 'UPI Shield Automated SOC',
    stateBadge: 'ATTACK NEUTRALIZED'
  }
];

export const AttackFlowSimulator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= 5) {
            setIsPlaying(false);
            return 5;
          }
          const next = prev + 1;
          if (next === 5) playSound('success');
          else if (next === 4) playSound('alert');
          else playSound('click');
          return next;
        });
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const stepData = ATTACK_STEPS[currentStep - 1];

  const handleNext = () => {
    if (currentStep < 5) {
      const next = currentStep + 1;
      setCurrentStep(next);
      if (next === 5) playSound('success');
      else if (next === 4) playSound('alert');
      else playSound('click');
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      playSound('click');
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setIsPlaying(false);
    playSound('click');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>INTERACTIVE ATTACK SIMULATOR</span>
          </div>
          <h2 className="text-xl font-bold text-white font-display">
            How Attackers Trap Victims & How UPI Shield Blocks Them
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Walk step-by-step through a real reverse-collect cashback attack. Watch how fraudsters disguise debits as credits and how our automated engine stops them cold.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-md cursor-pointer ${
              isPlaying 
                ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause Auto' : 'Auto Play Demo'}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors border border-slate-700 cursor-pointer"
            title="Reset Simulation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Step Indicator Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {ATTACK_STEPS.map((s) => (
          <button
            key={s.step}
            onClick={() => {
              setCurrentStep(s.step);
              setIsPlaying(false);
              playSound('click');
            }}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              currentStep === s.step
                ? s.step === 5
                  ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                  : 'bg-indigo-950/60 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                : currentStep > s.step
                ? 'bg-slate-900/80 border-slate-700 text-slate-300'
                : 'bg-slate-950/50 border-slate-800 text-slate-500'
            }`}
          >
            <div className="text-[10px] font-mono font-bold flex items-center justify-between">
              <span>STEP {s.step}</span>
              {currentStep > s.step && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
            </div>
            <div className="text-xs font-semibold mt-1 truncate">{s.title.split('. ')[1]}</div>
          </button>
        ))}
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Smartphone Display Mockup */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-[320px] rounded-[36px] bg-slate-950 border-4 border-slate-800 p-3 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[480px]">
            {/* Top Phone Notch */}
            <div className="w-28 h-4 bg-slate-800 rounded-full mx-auto mb-2"></div>

            {/* Inner Phone Screen Content */}
            <div className="flex-1 rounded-2xl bg-slate-900 p-4 flex flex-col justify-between overflow-hidden relative border border-slate-800">
              <AnimatePresence mode="wait">
                {stepData.visualType === 'SMS' && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 pt-4"
                  >
                    <div className="text-center font-mono text-[10px] text-slate-500">Today, 2:42 PM · SMS</div>
                    <div className="p-3 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-1.5 shadow-lg">
                      <div className="text-xs font-bold text-amber-400">VK-PHONEPE</div>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        Dear customer, your festive scratch card of ₹4,999 has been approved. Claim directly to bank account: 
                        <span className="text-indigo-400 underline block mt-1">phonepe-reward-scratch.top</span>
                      </p>
                    </div>
                  </motion.div>
                )}

                {stepData.visualType === 'PAGE' && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3 rounded-xl p-4 text-white shadow-inner"
                    style={{ backgroundColor: '#5f259f' }}
                  >
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span>PhonePe Rewards</span>
                      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded">FESTIVE OFFER</span>
                    </div>
                    <div className="p-3 bg-white/10 rounded-lg text-center space-y-1">
                      <div className="text-xs text-amber-300 font-bold">SCRATCH & WIN</div>
                      <div className="text-2xl font-black text-white">₹4,999</div>
                      <div className="text-[10px] text-white/80">Pending claim to bank</div>
                    </div>
                    <div className="text-[10px] text-white/70 text-center">Unverified URL: phonepe-reward-scratch.top</div>
                  </motion.div>
                )}

                {stepData.visualType === 'KEYPAD' && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 rounded-xl p-4 text-white"
                    style={{ backgroundColor: '#5f259f' }}
                  >
                    <div className="text-xs font-bold text-center">ENTER 6-DIGIT UPI PIN</div>
                    <p className="text-[11px] text-white/80 text-center leading-relaxed">
                      Enter UPI PIN to verify and receive ₹4,999 cashback in account
                    </p>
                    <div className="flex justify-center gap-2 py-2">
                      {[1,2,3,4,5,6].map(i => (
                        <div key={i} className="w-3.5 h-3.5 rounded-full bg-white/30 border border-white animate-pulse"></div>
                      ))}
                    </div>
                    <div className="text-[10px] bg-rose-600/80 p-2 rounded text-center font-bold">
                      ⚠️ SCAM TRAP: Credential Harvester Active
                    </div>
                  </motion.div>
                )}

                {stepData.visualType === 'INTENT' && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3 p-4 rounded-xl bg-slate-950 border border-rose-500/80"
                  >
                    <div className="text-xs font-bold text-rose-400">HIDDEN DEBIT PAYLOAD</div>
                    <div className="font-mono text-[10px] text-slate-300 break-all bg-slate-900 p-2 rounded">
                      upi://pay?pa=cashback.rewards99@okaxis&am=4999&pn=PhonePe&cu=INR
                    </div>
                    <div className="text-[11px] text-rose-300 leading-relaxed">
                      Victim is tricked into sending ₹4,999 to scammer VPA instead of receiving cashback.
                    </div>
                  </motion.div>
                )}

                {stepData.visualType === 'BLOCKED' && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500 text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
                      <ShieldCheck className="w-6 h-6 animate-pulse" />
                    </div>
                    <div className="text-xs font-bold text-emerald-400">TRANSACTION BLOCKED</div>
                    <p className="text-[11px] text-slate-200 leading-relaxed">
                      UPI Shield intercepted the reverse-collect trap. Scammer VPA queued for NPCI freeze. Your ₹4,999 is SAFE!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Phone Bar */}
            <div className="w-20 h-1 bg-slate-800 rounded-full mx-auto mt-2"></div>
          </div>
        </div>

        {/* Right: Forensic Narrative & Explanations */}
        <div className="lg:col-span-7 flex flex-col justify-between p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono font-bold text-indigo-400">
                PHASE {stepData.step} FORENSIC BREAKDOWN
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                currentStep === 5 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'
              }`}>
                {stepData.stateBadge}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white font-display">
                {stepData.title}
              </h3>
              <p className="text-xs text-indigo-300 font-medium">
                {stepData.subtitle}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              {stepData.details}
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="text-slate-500">Attributed Actor / Infrastructure:</span>
              <strong className="text-slate-200">{stepData.actor}</strong>
            </div>
          </div>

          {/* Stepper Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold disabled:opacity-30 cursor-pointer"
            >
              Previous Step
            </button>

            <span className="text-xs font-mono text-slate-400">
              {currentStep} / {ATTACK_STEPS.length}
            </span>

            <button
              onClick={handleNext}
              disabled={currentStep === 5}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold disabled:opacity-30 flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/30"
            >
              <span>{currentStep === 4 ? 'Trigger Shield Block' : 'Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
