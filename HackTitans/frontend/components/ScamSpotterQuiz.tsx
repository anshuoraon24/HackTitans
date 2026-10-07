import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle,
  Lightbulb,
  ExternalLink
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface QuizQuestion {
  id: number;
  scenario: string;
  brand: string;
  optionA: {
    title: string;
    url: string;
    isFake: boolean;
    preview: {
      headline: string;
      bodyText: string;
      ctaText: string;
      telltale: string;
      brandColor: string;
    };
  };
  optionB: {
    title: string;
    url: string;
    isFake: boolean;
    preview: {
      headline: string;
      bodyText: string;
      ctaText: string;
      telltale: string;
      brandColor: string;
    };
  };
  explanation: string;
  goldenRule: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    scenario: 'You receive a WhatsApp message claiming you won a ₹4,999 festive cashback. Which page is a dangerous phishing clone?',
    brand: 'PhonePe',
    optionA: {
      title: 'Option A: "Festive Scratch Hub"',
      url: 'https://phonepe-reward-scratch2026.top/claim',
      isFake: true,
      preview: {
        headline: 'Congratulations! You Won ₹4,999',
        bodyText: 'Enter your 6-digit UPI PIN below to deposit reward directly to your bank account:',
        ctaText: 'CLAIM ₹4,999 NOW',
        telltale: 'Asks for 6-digit UPI PIN on a web page with cheap .top domain',
        brandColor: '#5f259f'
      }
    },
    optionB: {
      title: 'Option B: "PhonePe Official Rewards"',
      url: 'https://phonepe.com/rewards',
      isFake: false,
      preview: {
        headline: 'PhonePe In-App Cashbacks',
        bodyText: 'Rewards are automatically credited directly to your linked bank account. No PIN needed.',
        ctaText: 'View in Official App',
        telltale: 'Authoritative phonepe.com domain with zero PIN entry prompts',
        brandColor: '#5f259f'
      }
    },
    explanation: 'Option A is a malicious clone! It uses an unauthorized domain (.top) and asks for your UPI PIN. Entering your PIN transfers money OUT of your bank account.',
    goldenRule: 'Rule: You NEVER need to enter a UPI PIN to receive money or cashback!'
  },
  {
    id: 2,
    scenario: 'You get an urgent SMS: "Your Paytm wallet is suspended today. Complete KYC within 24 hours". Which interface is the scam?',
    brand: 'Paytm',
    optionA: {
      title: 'Option A: "Paytm Security Center"',
      url: 'https://paytm.com/care/kyc',
      isFake: false,
      preview: {
        headline: 'Official KYC Guidelines',
        bodyText: 'Complete Video-KYC safely inside the verified Paytm app with your PAN card.',
        ctaText: 'Open Verified App',
        telltale: 'Verified domain with secure authentication instructions',
        brandColor: '#002e6e'
      }
    },
    optionB: {
      title: 'Option B: "Urgent KYC Verification Portal"',
      url: 'https://paytm-kyc-verify-portal.site/login',
      isFake: true,
      preview: {
        headline: 'URGENT: Wallet Suspended in 24 Hrs',
        bodyText: 'Enter your 16-digit Debit Card number, Expiry, 3-digit CVV, and ATM PIN to reactivate:',
        ctaText: 'SUBMIT CARD & UNBLOCK',
        telltale: 'Requests sensitive Debit Card CVV and ATM PIN on non-paytm domain',
        brandColor: '#002e6e'
      }
    },
    explanation: 'Option B is a dangerous phishing harvester! Paytm will never ask for your debit card CVV or ATM PIN to update wallet KYC.',
    goldenRule: 'Rule: Genuine banks never threaten immediate 24-hour account cancellation via SMS short links.'
  },
  {
    id: 3,
    scenario: 'A caller claiming to be Google Pay support offers an instant refund of ₹12,500 for a failed recharge. Which link is a reverse-collect trap?',
    brand: 'Google Pay',
    optionA: {
      title: 'Option A: "Instant Grievance Refund Desk"',
      url: 'https://gpay-refund-nodal.live/settlement',
      isFake: true,
      preview: {
        headline: 'Instant Refund Approval: ₹12,500',
        bodyText: 'Tap the button below to approve incoming transfer. It will launch your UPI app with pre-filled authorization.',
        ctaText: 'ACCEPT ₹12,500 REFUND',
        telltale: 'Launches upi://pay intent with DEBIT parameter rather than credit',
        brandColor: '#4285f4'
      }
    },
    optionB: {
      title: 'Option B: "Google Pay Help Center"',
      url: 'https://support.google.com/pay-india',
      isFake: false,
      preview: {
        headline: 'Transaction Dispute Resolution',
        bodyText: 'Failed transactions are auto-refunded to your source bank within 3 business days by NPCI.',
        ctaText: 'Check Transaction Status',
        telltale: 'Official support.google.com domain explaining automated refunds',
        brandColor: '#4285f4'
      }
    },
    explanation: 'Option A is a Reverse-Collect Scam! Tapping "Accept Refund" actually triggers a request to debit ₹12,500 from your bank account to the scammer’s VPA.',
    goldenRule: 'Rule: Genuine refunds happen automatically without you approving or signing any UPI request.'
  }
];

export const ScamSpotterQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelect = (option: 'A' | 'B') => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = (option === 'A' && currentQ.optionA.isFake) || (option === 'B' && currentQ.optionB.isFake);
    if (isCorrect) {
      setScore(prev => prev + 1);
      playSound('success');
    } else {
      playSound('alert');
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      playSound('click');
    } else {
      setQuizCompleted(true);
      playSound('chime');
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
    playSound('click');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>INTERACTIVE FRAUD SPOTTER CHALLENGE</span>
          </div>
          <h2 className="text-xl font-bold text-white font-display">
            Can You Spot the Fake UPI Clone?
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Test your cyber-awareness against real-world cloned banking pages used by Jamtara and Mewat scammers. Pick which page is the fake scam clone!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono">
            <div className="text-[11px] text-slate-400">Your Score</div>
            <div className="text-xl font-black text-amber-400 tabular-nums">
              {score} / {QUIZ_QUESTIONS.length}
            </div>
          </div>
        </div>
      </div>

      {!quizCompleted ? (
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-2xl">
          {/* Progress Bar & Question Counter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>ROUND {currentIdx + 1} OF {QUIZ_QUESTIONS.length}</span>
              <span>TARGET BRAND: <strong className="text-white">{currentQ.brand}</strong></span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Scenario Text */}
          <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-sm text-indigo-100 font-medium">
            🎯 <strong>Scenario:</strong> {currentQ.scenario}
          </div>

          {/* Side-by-Side Options to Choose */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Option A */}
            <div
              onClick={() => handleSelect('A')}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[320px] ${
                !isAnswered
                  ? 'bg-slate-950/80 border-slate-800 hover:border-indigo-500/70 hover:scale-[1.01]'
                  : selectedOption === 'A'
                  ? currentQ.optionA.isFake
                    ? 'bg-emerald-950/30 border-emerald-500 shadow-lg shadow-emerald-500/20'
                    : 'bg-rose-950/30 border-rose-500 shadow-lg shadow-rose-500/20'
                  : currentQ.optionA.isFake
                  ? 'border-emerald-500/60 opacity-80'
                  : 'border-slate-800 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-bold font-mono text-slate-300">{currentQ.optionA.title}</span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 truncate max-w-[180px]">
                    {currentQ.optionA.url}
                  </span>
                </div>

                {/* Simulated UI Mockup */}
                <div 
                  className="rounded-xl p-4 text-white space-y-3 mt-4"
                  style={{ backgroundColor: currentQ.optionA.preview.brandColor }}
                >
                  <h4 className="font-bold text-sm">{currentQ.optionA.preview.headline}</h4>
                  <p className="text-xs text-white/90 leading-relaxed">{currentQ.optionA.preview.bodyText}</p>
                  <button className="w-full py-2 bg-white/20 backdrop-blur-sm rounded-lg text-xs font-bold text-white shadow">
                    {currentQ.optionA.preview.ctaText}
                  </button>
                </div>
              </div>

              {/* Reveal Badge if answered */}
              {isAnswered && (
                <div className={`mt-4 p-2.5 rounded-lg text-xs font-bold flex items-center gap-2 ${
                  currentQ.optionA.isFake ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                }`}>
                  {currentQ.optionA.isFake ? <AlertTriangle className="w-4 h-4 shrink-0" /> : <ShieldCheck className="w-4 h-4 shrink-0" />}
                  <span>{currentQ.optionA.isFake ? 'THIS IS THE FAKE CLONE!' : 'GENUINE OFFICIAL PAGE'}</span>
                </div>
              )}
            </div>

            {/* Option B */}
            <div
              onClick={() => handleSelect('B')}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[320px] ${
                !isAnswered
                  ? 'bg-slate-950/80 border-slate-800 hover:border-indigo-500/70 hover:scale-[1.01]'
                  : selectedOption === 'B'
                  ? currentQ.optionB.isFake
                    ? 'bg-emerald-950/30 border-emerald-500 shadow-lg shadow-emerald-500/20'
                    : 'bg-rose-950/30 border-rose-500 shadow-lg shadow-rose-500/20'
                  : currentQ.optionB.isFake
                  ? 'border-emerald-500/60 opacity-80'
                  : 'border-slate-800 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-bold font-mono text-slate-300">{currentQ.optionB.title}</span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 truncate max-w-[180px]">
                    {currentQ.optionB.url}
                  </span>
                </div>

                {/* Simulated UI Mockup */}
                <div 
                  className="rounded-xl p-4 text-white space-y-3 mt-4"
                  style={{ backgroundColor: currentQ.optionB.preview.brandColor }}
                >
                  <h4 className="font-bold text-sm">{currentQ.optionB.preview.headline}</h4>
                  <p className="text-xs text-white/90 leading-relaxed">{currentQ.optionB.preview.bodyText}</p>
                  <button className="w-full py-2 bg-white/20 backdrop-blur-sm rounded-lg text-xs font-bold text-white shadow">
                    {currentQ.optionB.preview.ctaText}
                  </button>
                </div>
              </div>

              {/* Reveal Badge if answered */}
              {isAnswered && (
                <div className={`mt-4 p-2.5 rounded-lg text-xs font-bold flex items-center gap-2 ${
                  currentQ.optionB.isFake ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                }`}>
                  {currentQ.optionB.isFake ? <AlertTriangle className="w-4 h-4 shrink-0" /> : <ShieldCheck className="w-4 h-4 shrink-0" />}
                  <span>{currentQ.optionB.isFake ? 'THIS IS THE FAKE CLONE!' : 'GENUINE OFFICIAL PAGE'}</span>
                </div>
              )}
            </div>
          </div>

          {/* Post-Choice Explanation & Next Button */}
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-3"
            >
              <div className="flex items-start gap-2 text-xs text-slate-200">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Why:</strong> {currentQ.explanation}
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-900/50 text-xs font-semibold text-amber-300">
                {currentQ.goldenRule}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-indigo-600/30 flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>{currentIdx + 1 < QUIZ_QUESTIONS.length ? 'Next Challenge' : 'See Your Final Score'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        /* Quiz Completion Card */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 rounded-2xl bg-slate-900 border border-indigo-500/40 text-center space-y-5 shadow-2xl max-w-xl mx-auto"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-indigo-500 flex items-center justify-center text-white mx-auto shadow-lg shadow-indigo-500/30">
            <Trophy className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-black text-white font-display">
              Challenge Complete!
            </h3>
            <p className="text-xs text-slate-300">
              You scored <span className="font-bold text-amber-400 font-mono text-sm">{score} out of {QUIZ_QUESTIONS.length}</span>!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
            {score === 3 ? (
              <span className="text-emerald-400 font-bold">
                🥇 Certified Cyber-Smart Citizen! You know exactly how scammers try to steal UPI PINs.
              </span>
            ) : score >= 2 ? (
              <span className="text-indigo-400 font-bold">
                🥈 Sharp Scam Hunter! Good eye for spotting cheap fake domains and reverse-collect traps.
              </span>
            ) : (
              <span className="text-amber-400 font-bold">
                🥉 Watch Out! Scammers use very convincing clones. Remember: Never enter your PIN to receive money!
              </span>
            )}
          </div>

          <button
            onClick={handleRestart}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-2 mx-auto shadow-lg shadow-indigo-600/30 cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Play Again</span>
          </button>
        </motion.div>
      )}
    </div>
  );
};
