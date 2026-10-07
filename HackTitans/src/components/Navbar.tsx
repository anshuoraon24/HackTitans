import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Network, 
  Search, 
  FileText, 
  Activity, 
  Radio, 
  BarChart3, 
  Sparkles, 
  Trophy, 
  Zap, 
  Globe, 
  Volume2, 
  VolumeX 
} from 'lucide-react';
import { motion } from 'motion/react';
import { toggleAudioMute, getIsMuted, playSound } from '../utils/audio.ts';

export type NavTab = 'quick' | 'quiz' | 'simulator' | 'map' | 'overview' | 'comparator' | 'graph' | 'crawler' | 'scanner' | 'benchmark';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenQuickScan: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenQuickScan }) => {
  const [muted, setMuted] = useState(getIsMuted());

  const handleToggleSound = () => {
    const next = toggleAudioMute();
    setMuted(next);
    if (!next) playSound('chime');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-indigo-500/20 bg-slate-950/90 backdrop-blur-md px-4 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Single text wordmark with animated security badge */}
        <div 
          onClick={() => {
            setActiveTab('quick');
            playSound('click');
          }}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-700 flex items-center justify-center text-white shadow-md shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white font-display group-hover:text-indigo-300 transition-colors">
              UPI Shield
            </span>
          </div>
          <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-semibold">
            LIVE PROTECT
          </span>
        </div>

        {/* Zone 2: Navigation Links with Animated Pill Indicator */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800/80">
          <button
            onClick={() => { setActiveTab('quick'); playSound('click'); }}
            className={`relative flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'quick' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {activeTab === 'quick' && (
              <motion.div
                layoutId="activeTabBadge"
                className="absolute inset-0 bg-indigo-600 rounded-lg shadow-sm shadow-indigo-500/40"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Quick Check
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('quiz'); playSound('click'); }}
            className={`relative flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'quiz' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {activeTab === 'quiz' && (
              <motion.div
                layoutId="activeTabBadge"
                className="absolute inset-0 bg-indigo-600 rounded-lg shadow-sm shadow-indigo-500/40"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              Spot The Fake Quiz
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('simulator'); playSound('click'); }}
            className={`relative flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'simulator' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {activeTab === 'simulator' && (
              <motion.div
                layoutId="activeTabBadge"
                className="absolute inset-0 bg-indigo-600 rounded-lg shadow-sm shadow-indigo-500/40"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              Attack Simulator
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('map'); playSound('click'); }}
            className={`relative flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'map' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {activeTab === 'map' && (
              <motion.div
                layoutId="activeTabBadge"
                className="absolute inset-0 bg-indigo-600 rounded-lg shadow-sm shadow-indigo-500/40"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              Syndicate Map
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('overview'); playSound('click'); }}
            className={`relative flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'overview' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {activeTab === 'overview' && (
              <motion.div
                layoutId="activeTabBadge"
                className="absolute inset-0 bg-indigo-600 rounded-lg shadow-sm shadow-indigo-500/40"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              Threats SOC
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('comparator'); playSound('click'); }}
            className={`relative flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'comparator' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {activeTab === 'comparator' && (
              <motion.div
                layoutId="activeTabBadge"
                className="absolute inset-0 bg-indigo-600 rounded-lg shadow-sm shadow-indigo-500/40"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              Visual Diff
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('graph'); playSound('click'); }}
            className={`relative flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'graph' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {activeTab === 'graph' && (
              <motion.div
                layoutId="activeTabBadge"
                className="absolute inset-0 bg-indigo-600 rounded-lg shadow-sm shadow-indigo-500/40"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5" />
              Campaign Graph
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('benchmark'); playSound('click'); }}
            className={`relative flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'benchmark' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {activeTab === 'benchmark' && (
              <motion.div
                layoutId="activeTabBadge"
                className="absolute inset-0 bg-indigo-600 rounded-lg shadow-sm shadow-indigo-500/40"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5" />
              Benchmark P/R
            </span>
          </button>
        </nav>

        {/* Zone 3: Sound toggle & Primary action button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleSound}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={muted ? 'Enable Cyber Audio FX' : 'Mute Audio FX'}
          >
            {muted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          <button
            onClick={() => {
              onOpenQuickScan();
              playSound('scan');
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-lg transition-all shadow-md shadow-indigo-600/30 whitespace-nowrap cursor-pointer active:scale-95"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Instant Scam Check</span>
          </button>
        </div>
      </div>
    </header>
  );
};

