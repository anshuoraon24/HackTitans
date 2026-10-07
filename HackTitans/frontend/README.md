# UPI Shield - Frontend Architecture (React 19 + Tailwind CSS + Motion)

This folder contains the complete, modular frontend codebase for the **Fake UPI and Payment Page and App Detection Platform**.

---

## 📁 Directory Structure

```
/frontend
├── README.md                      # Complete documentation & component roadmap
├── components/                    # Modular React UI components
│   ├── QuickScamChecker.tsx       # Simple Mode 1-click scam scanner for everyday users
│   ├── ScamSpotterQuiz.tsx        # Interactive "Can You Spot The Fake UPI Page?" gamified challenge
│   ├── AttackFlowSimulator.tsx    # Step-by-step interactive attack lifecycle & block simulator
│   ├── IndiaThreatMap.tsx         # Interactive geographic reconnaissance map of cyber syndicates
│   ├── VisualDiffComparator.tsx   # Perceptual hash, SSIM, and DOM heatmap diff sandbox
│   ├── InfrastructureGraph.tsx    # Multi-tier campaign clustering force-directed graph
│   ├── OverviewDashboard.tsx      # SOC Threat Overview, triage table & metrics
│   ├── CrawlerFeed.tsx            # Live streaming CT log, SMS smishing, and APK crawl monitor
│   ├── ScanWorkbench.tsx          # Deep testing workbench executing the Python detection engine
│   ├── PrecisionRecallBenchmark.tsx# Labelled benchmark metrics (1,280 samples) with threshold tuner
│   ├── TakedownGeneratorModal.tsx # Automated 1-click CERT-In, NPCI, & Registrar legal notices
│   └── Navbar.tsx                 # Top navigation bar with animated tab indicator & audio toggle
├── utils/
│   └── audio.ts                   # Native Web Audio API sound generator (clicks, radar, alerts, chimes)
├── types/
│   └── threat.ts                  # Full TypeScript definitions for threats, campaigns, graphs, metrics
├── data/
│   └── mockThreats.ts             # Human-verified Indian banking threat dataset & ground truth
├── App.tsx                        # Master React application with view mode switcher
├── main.tsx                       # React 19 root bootstrap
└── index.css                      # Tailwind CSS v4 styling & radar sweep keyframes
```

---

## 🌟 Key Interactive Features Built

1. **Simple Mode (Quick Scam Checker)**:
   - Designed for anyone to check suspect links, WhatsApp forwards, SMS messages, or UPI handles.
   - Plain-English verdict cards (*"DANGEROUS SCAM DETECTED"*) with clear explanations and safety tips.

2. **Scam Spotter Quiz (`ScamSpotterQuiz.tsx`)**:
   - 4-round gamified challenge where users identify fake clones vs genuine banking pages.
   - Real-time score, audio feedback, and golden safety rules.

3. **Live Attack Simulator (`AttackFlowSimulator.tsx`)**:
   - Step-by-step interactive demonstration of how reverse-collect UPI attacks work.
   - Demonstrates real-time threat interception by UPI Shield's automated engine.

4. **Syndicate Hotspot Map (`IndiaThreatMap.tsx`)**:
   - Geographic reconnaissance mapping regional criminal syndicates (Jamtara, Mewat, Deoghar, NCR).
   - Links regional phone registries and mule accounts to active campaign clusters.

5. **Deep SOC Tools**:
   - Visual Diff Sandbox with Perceptual Hash distance and SSIM Heatmap.
   - Campaign Infrastructure Graph with CSV IoC export.
   - Automated Takedown Dossier Generator (CERT-In / NPCI / Domain Registrar).
