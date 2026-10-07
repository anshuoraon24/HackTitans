import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, ShieldAlert, Zap, Globe, AlertTriangle, ArrowRight } from 'lucide-react';
import { playSound } from '../utils/audio';

interface Hotspot {
  id: string;
  name: string;
  region: string;
  coordinates: { x: number; y: number }; // percentage on map
  riskLevel: 'CRITICAL' | 'HIGH';
  activeDomainsCount: number;
  primaryVector: string;
  targetedBrands: string[];
  muleSimPrefixes: string[];
  campaignId: string;
  description: string;
}

const THREAT_HOTSPOTS: Hotspot[] = [
  {
    id: 'jamtara',
    name: 'Jamtara Syndicate Cluster',
    region: 'Jharkhand',
    coordinates: { x: 68, y: 46 },
    riskLevel: 'CRITICAL',
    activeDomainsCount: 14,
    primaryVector: 'Festive Scratch Card & Reverse-Collect UPI Intent Traps',
    targetedBrands: ['PhonePe', 'SBI YONO', 'Google Pay'],
    muleSimPrefixes: ['+91 98321', '+91 70014'],
    campaignId: 'CAMP-001',
    description: 'Specializes in bulk WhatsApp reward links, scratch-and-win graphics, and reverse-collect debit intents targeting festive shoppers.'
  },
  {
    id: 'mewat',
    name: 'Mewat / Alwar Syndicate',
    region: 'Haryana / Rajasthan Border',
    coordinates: { x: 42, y: 36 },
    riskLevel: 'CRITICAL',
    activeDomainsCount: 18,
    primaryVector: 'Paytm KYC Wallet Suspension & Card CVV Harvesters',
    targetedBrands: ['Paytm', 'BHIM', 'Razorpay'],
    muleSimPrefixes: ['+91 91234', '+91 88910'],
    campaignId: 'CAMP-002',
    description: 'Sends mass SMS with urgent KYC deactivation threats. Runs fast-flux DNS on offshore hosting servers with real-time OTP intercept relays.'
  },
  {
    id: 'deoghar',
    name: 'Deoghar Cyber Cell Cluster',
    region: 'Jharkhand',
    coordinates: { x: 72, y: 44 },
    riskLevel: 'HIGH',
    activeDomainsCount: 9,
    primaryVector: 'Electricity Bill & Utility Disconnection Phishing',
    targetedBrands: ['BHIM', 'PhonePe'],
    muleSimPrefixes: ['+91 94311'],
    campaignId: 'CAMP-001',
    description: 'Sends bogus night-time electricity disconnection warnings prompting immediate ₹10 bill verification payments through hijacked VPAs.'
  },
  {
    id: 'noida_apk',
    name: 'NCR Rogue App Distribution Hub',
    region: 'Delhi-NCR',
    coordinates: { x: 44, y: 33 },
    riskLevel: 'HIGH',
    activeDomainsCount: 7,
    primaryVector: 'Trojanized Banking APKs (SBI YONO Rewards, GPay Mods)',
    targetedBrands: ['SBI YONO', 'Google Pay'],
    muleSimPrefixes: ['+91 99100'],
    campaignId: 'CAMP-003',
    description: 'Distributes malicious Android packages claiming to offer bonus rewards. Hooks Accessibility Services to intercept incoming banking OTPs.'
  }
];

interface IndiaThreatMapProps {
  onSelectCampaign: (campaignId: string) => void;
}

export const IndiaThreatMap: React.FC<IndiaThreatMapProps> = ({ onSelectCampaign }) => {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot>(THREAT_HOTSPOTS[0]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
            <Globe className="w-4 h-4 text-indigo-400" />
            <span>GEOGRAPHIC THREAT RECONNAISSANCE</span>
          </div>
          <h2 className="text-xl font-bold text-white font-display">
            India Cyber Syndicate Hotspot Map
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Live infrastructure correlation mapping mule SIM registries, reverse-collect VPAs, and disposable phishing hosting back to active regional cybercrime syndicates.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
          <span>4 Active Regional Syndicates Mapped</span>
        </div>
      </div>

      {/* Main Grid: Interactive Map Visual + Hotspot Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Map Representation Canvas */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-950 border border-slate-800 relative overflow-hidden min-h-[440px] flex flex-col justify-between shadow-2xl">
          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none"></div>

          <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>GRID: 20.5937° N, 78.9629° E (INDIA SUBCONTINENT)</span>
            <span className="text-rose-400 font-bold">CLICK NODE TO INSPECT</span>
          </div>

          {/* Interactive Stylized Map Node Layout */}
          <div className="relative w-full h-80 my-4">
            {/* Outline Silhouette Marker */}
            <div className="absolute inset-x-8 inset-y-4 rounded-3xl border border-indigo-500/20 bg-indigo-950/10 backdrop-blur-sm pointer-events-none flex items-center justify-center">
              <span className="text-slate-700 font-display text-4xl font-black tracking-widest uppercase select-none opacity-20">
                INDIA THREAT ZONE
              </span>
            </div>

            {/* Hotspots plotted */}
            {THREAT_HOTSPOTS.map((spot) => {
              const isSelected = selectedHotspot.id === spot.id;
              return (
                <div
                  key={spot.id}
                  onClick={() => {
                    setSelectedHotspot(spot);
                    playSound('click');
                  }}
                  className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${spot.coordinates.x}%`, top: `${spot.coordinates.y}%` }}
                >
                  {/* Pulsing rings */}
                  <div className="relative flex items-center justify-center">
                    <span className={`absolute w-8 h-8 rounded-full animate-ping opacity-40 ${
                      spot.riskLevel === 'CRITICAL' ? 'bg-rose-500' : 'bg-amber-500'
                    }`}></span>

                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white font-bold shadow-lg transition-transform group-hover:scale-125 ${
                      isSelected 
                        ? 'bg-white text-slate-900 ring-4 ring-indigo-500' 
                        : spot.riskLevel === 'CRITICAL' ? 'bg-rose-600' : 'bg-amber-600'
                    }`}>
                      !
                    </span>

                    {/* Hover label */}
                    <span className={`absolute top-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap shadow-md pointer-events-none transition-all ${
                      isSelected 
                        ? 'bg-white text-slate-900 font-bold opacity-100' 
                        : 'bg-slate-900 text-slate-300 opacity-80 group-hover:opacity-100'
                    }`}>
                      {spot.name.split(' ')[0]} ({spot.region})
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Automated reconnaissance cross-referenced with Indian Cybercrime Coordination Centre (I4C) feeds</span>
          </div>
        </div>

        {/* Right: Selected Hotspot Details Card */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-mono font-bold text-white uppercase">
                  {selectedHotspot.region}
                </span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                selectedHotspot.riskLevel === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
              }`}>
                {selectedHotspot.riskLevel} SYNDICATE
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white font-display">
                {selectedHotspot.name}
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {selectedHotspot.description}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="text-slate-400 font-semibold">Primary Attack Vector:</div>
              <div className="text-amber-300 font-medium">{selectedHotspot.primaryVector}</div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-500">Active Domains:</span>
                <div className="text-rose-400 font-bold">{selectedHotspot.activeDomainsCount} Clones</div>
              </div>
              <div>
                <span className="text-slate-500">Mule SIMs:</span>
                <div className="text-cyan-300">{selectedHotspot.muleSimPrefixes[0]}</div>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-slate-400">Targeted Brands:</span>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {selectedHotspot.targetedBrands.map((b, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 text-[10px] font-mono">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectCampaign(selectedHotspot.campaignId)}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-600/30"
          >
            <span>Inspect Connected Graph Cluster ({selectedHotspot.campaignId})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
