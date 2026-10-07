export type ThreatSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type ThreatStatus = 'NEW' | 'INVESTIGATING' | 'TAKEDOWN_QUEUED' | 'TAKEDOWN_SENT' | 'DISMANTLED';
export type ThreatCategory = 'PHISHING_PORTAL' | 'ROGUE_APK' | 'SMS_SMISHING' | 'COLLECT_REQUEST_TRAP' | 'QR_HIJACK';

export interface ThreatItem {
  id: string;
  targetBrand: 'PhonePe' | 'Paytm' | 'Google Pay' | 'BHIM' | 'SBI YONO' | 'Razorpay' | 'HDFC PayZapp';
  targetBrandKey: string;
  sourceType: 'CT_LOG' | 'SMS_FEED' | 'APK_MONITOR' | 'BANK_REPORT' | 'MANUAL_SUBMISSION';
  domain: string;
  url: string;
  ip: string;
  asn: string;
  sslCertSerial?: string;
  sslIssuer?: string;
  scammerVpa?: string;
  mulePhone?: string;
  c2Telegram?: string;
  campaignId?: string;
  campaignName?: string;
  riskScore: number; // 0.00 - 1.00
  visualSimilarity: number; // 0.00 - 1.00
  ssimScore: number;
  perceptualHashDistance: number;
  entropy: number;
  status: ThreatStatus;
  severity: ThreatSeverity;
  category: ThreatCategory;
  detectedAt: string;
  firstSeen: string;
  signaturesDetected: string[];
  evasionTechniques: string[];
  rawUpiIntent?: string;
  parsedIntent?: {
    pa: string;
    pn: string;
    am?: string;
    tn?: string;
    isReverseCollectTrap: boolean;
  };
  apkDetails?: {
    packageName: string;
    version: string;
    sha256: string;
    permissions: string[];
    isSpoofedCertificate: boolean;
  };
  cloneDomHighlights?: {
    hasMpinInput: boolean;
    hasOtpInterceptor: boolean;
    hasFakeNpciBadge: boolean;
    hasDevToolsBlocker: boolean;
  };
  genuinePreview: {
    title: string;
    brandColor: string;
    logoUrl?: string;
    sampleElements: string[];
  };
  clonePreview: {
    title: string;
    sampleElements: string[];
    deceptiveArtifacts: string[];
  };
}

export interface CampaignCluster {
  campaignId: string;
  name: string;
  alias: string;
  threatActorGroup: string;
  riskLevel: ThreatSeverity;
  status: 'ACTIVE' | 'CONTAINED' | 'DISMANTLED';
  nodeCount: number;
  domainsCount: number;
  vpasCount: number;
  hostsCount: number;
  firstSeen: string;
  lastActive: string;
  targetedBrands: string[];
  sharedInfrastructure: {
    hostingProvider: string;
    commonAsn: string;
    certIssuer: string;
    mulePhoneNumbers: string[];
    scammerVpas: string[];
    c2Handles: string[];
  };
  tactics: string[];
  itemIds: string[];
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'DOMAIN' | 'IP' | 'VPA' | 'PHONE' | 'CERT' | 'TELEGRAM' | 'BRAND';
  campaignId?: string;
  severity?: ThreatSeverity;
  brand?: string;
  metadata?: Record<string, any>;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  relationship: 'HOSTED_ON' | 'USES_CERT' | 'COLLECTS_TO' | 'SMS_DISPATCHED_BY' | 'C2_CHANNEL' | 'IMPERSONATES';
  campaignId?: string;
}

export interface BenchmarkMetrics {
  totalEvaluated: number;
  datasetBreakdown: {
    phishingPortals: number;
    rogueApks: number;
    smsSmishingFeeds: number;
    legitimateGateways: number;
  };
  currentThreshold: number;
  precision: number;
  recall: number;
  f1Score: number;
  specificity: number;
  rocAuc: number;
  confusionMatrix: {
    truePositives: number;
    falsePositives: number;
    trueNegatives: number;
    falseNegatives: number;
  };
  precisionRecallCurve: Array<{ threshold: number; precision: number; recall: number; f1: number }>;
  vectorPerformance: Array<{ vector: string; accuracy: number; samples: number; avgLatencyMs: number }>;
}

export interface TakedownRequest {
  threatId: string;
  authority: 'CERT-In' | 'NPCI' | 'Registrar' | 'Google Play Protect';
  notes?: string;
}

export interface TakedownPackage {
  authority: string;
  subject: string;
  evidenceHash: string;
  generatedAt: string;
  body: string;
  recipientEmail: string;
  priority: string;
  artifactsIncluded: string[];
  statutoryReference: string;
}
