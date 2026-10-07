import { ThreatItem, CampaignCluster, GraphNode, GraphEdge, BenchmarkMetrics } from '../types/threat';

export const INITIAL_THREATS: ThreatItem[] = [
  {
    id: 'THR-8821',
    targetBrand: 'PhonePe',
    targetBrandKey: 'phonepe',
    sourceType: 'CT_LOG',
    domain: 'phonepe-cashback2026.top',
    url: 'https://phonepe-cashback2026.top/scratch-card',
    ip: '185.220.101.42',
    asn: 'AS49453 Global Transit Ltd',
    sslCertSerial: '04:FA:21:88:9C:3B:10',
    sslIssuer: "Let's Encrypt E5 (Automated Wildcard)",
    scammerVpa: 'cashback.desk99@okaxis',
    mulePhone: '+91 98321 44510',
    c2Telegram: '@jamtara_upi_drops_bot',
    campaignId: 'CAMP-001',
    campaignName: 'Operation ShadowUPI (Jamtara Nexus)',
    riskScore: 0.98,
    visualSimilarity: 0.94,
    ssimScore: 0.92,
    perceptualHashDistance: 4,
    entropy: 4.12,
    status: 'INVESTIGATING',
    severity: 'CRITICAL',
    category: 'PHISHING_PORTAL',
    detectedAt: '2026-10-07 06:14:22 UTC',
    firstSeen: '2026-10-06 22:40:10 UTC',
    signaturesDetected: [
      'Visual clone of PhonePe Scratch & Win Reward Card UI',
      'Unauthorized usage of NPCI & Unified Payments Interface branding',
      'Deceptive reverse collect intent disguised as "Receive ₹4,999 Cashback"',
      'Simulated 6-digit MPIN input field harvesting UPI payment codes',
      'High-entropy newly registered cheap TLD (.top) via automated registrar'
    ],
    evasionTechniques: [
      'User-Agent Cloaking: Returns HTTP 404 to non-mobile Android WebViews',
      'Geo-fencing: Script validates client timezone against Asia/Kolkata (India only)',
      'Anti-Debugging: Disables Right-Click, F12 DevTools inspection, and text selection',
      'Dean Edwards JavaScript Packing: Obfuscates dynamic reverse-collect link creation'
    ],
    rawUpiIntent: 'upi://pay?pa=cashback.desk99@okaxis&pn=PhonePeRewards&am=4999&cu=INR&tn=Cashback%20Approval%20Ref%20992',
    parsedIntent: {
      pa: 'cashback.desk99@okaxis',
      pn: 'PhonePeRewards',
      am: '4999',
      tn: 'Cashback Approval Ref 992',
      isReverseCollectTrap: true
    },
    cloneDomHighlights: {
      hasMpinInput: true,
      hasOtpInterceptor: true,
      hasFakeNpciBadge: true,
      hasDevToolsBlocker: true
    },
    genuinePreview: {
      title: 'Genuine PhonePe Official Reward Hub',
      brandColor: '#5f259f',
      sampleElements: [
        'Verified Green Lock & EV-grade domain: phonepe.com',
        'Direct in-app cryptographic intent invocation without web PIN prompts',
        'Official NPCI PSP handle routing via @ybl / @ibl / @axl',
        'End-to-End encrypted HSM PIN pad handled strictly inside UPI SDK'
      ]
    },
    clonePreview: {
      title: 'Rogue Phishing Clone (phonepe-cashback2026.top)',
      sampleElements: [
        'Disreputable top-level domain (.top) with high Shannon entropy',
        'Web-based fake 6-digit MPIN keypad overlay stealing client credentials',
        'Pre-populated debit intent: upi://pay?pa=cashback.desk99@okaxis&am=4999',
        'Stolen SVG vector icons of PhonePe and NPCI BHIM seal'
      ],
      deceptiveArtifacts: [
        'Fake urgency timer: "Claim within 04:59 before cashback expires"',
        'Bogus testimonial ticker: "Ramesh K. just received ₹3,500"',
        'Background WebSockets transmitting harvested PINs to Telegram Bot'
      ]
    }
  },
  {
    id: 'THR-8822',
    targetBrand: 'Paytm',
    targetBrandKey: 'paytm',
    sourceType: 'SMS_FEED',
    domain: 'paytm-kyc-update-portal.site',
    url: 'https://paytm-kyc-update-portal.site/verify-account',
    ip: '194.26.29.112',
    asn: 'AS57523 VDSina Hosting',
    sslCertSerial: '1A:45:90:3F:12:00:88',
    sslIssuer: "ZeroSSL Domain Validated",
    scammerVpa: 'paytm.helpdesk.nodal@okhdfcbank',
    mulePhone: '+91 70014 99231',
    c2Telegram: '@kyc_scam_relay_bot',
    campaignId: 'CAMP-002',
    campaignName: 'Operation PhishPay-V4 (KYC Smishing Syndicate)',
    riskScore: 0.96,
    visualSimilarity: 0.91,
    ssimScore: 0.89,
    perceptualHashDistance: 5,
    entropy: 3.98,
    status: 'TAKEDOWN_QUEUED',
    severity: 'CRITICAL',
    category: 'SMS_SMISHING',
    detectedAt: '2026-10-07 05:48:10 UTC',
    firstSeen: '2026-10-06 18:22:00 UTC',
    signaturesDetected: [
      'Inbound Smishing Vector: "Dear customer your PAYTM wallet blocked today, click here to complete KYC"',
      'Unauthorized replication of Paytm Payments Bank header and login styling',
      'Real-time OTP interceptor relay posting to external Telegram C2 channel',
      'Full PAN Card, Aadhaar number, and Debit Card CVV harvesting form',
      'Homoglyph spoofing: "paytm-kyc" in non-official domain registry'
    ],
    evasionTechniques: [
      'Fast-Flux DNS: Rotates host IP every 45 minutes between offshore bulletproof servers',
      'Dynamic Base64 Payload loading: Injects phishing inputs via remote evaluated script',
      'IP Reputation Checking: Rejects requests originating from Known VPN / Zscaler exit nodes'
    ],
    cloneDomHighlights: {
      hasMpinInput: true,
      hasOtpInterceptor: true,
      hasFakeNpciBadge: false,
      hasDevToolsBlocker: true
    },
    genuinePreview: {
      title: 'Genuine Paytm Payments Bank Official Security',
      brandColor: '#002e6e',
      sampleElements: [
        'Authoritative domain: paytmbank.com / paytm.com',
        'Official 2FA strictly authenticated via mobile SIM-binding',
        'Never requests debit card PIN or full card details for basic KYC update',
        'RBI-compliant Video KYC (V-KYC) within official Play Store verified app'
      ]
    },
    clonePreview: {
      title: 'Rogue Clone (paytm-kyc-update-portal.site)',
      sampleElements: [
        'Form asks for 16-digit debit card number, expiry, CVV, and ATM PIN',
        'Relay script listening on port 8443 forwarding live SMS OTP tokens',
        'CSS stylesheet directly scraped and hotlinked from paytm CDN assets'
      ],
      deceptiveArtifacts: [
        'Red alert banner: "WARNING: Unverified accounts will be deactivated in 24 hours"',
        'Counterfeit Reserve Bank of India (RBI) regulatory compliance badge'
      ]
    }
  },
  {
    id: 'THR-8823',
    targetBrand: 'SBI YONO',
    targetBrandKey: 'sbi_yono',
    sourceType: 'APK_MONITOR',
    domain: 'sbi-reward-points-apk.xyz',
    url: 'https://sbi-reward-points-apk.xyz/download/SBI_Yono_Rewards_v3.apk',
    ip: '185.220.101.42',
    asn: 'AS49453 Global Transit Ltd',
    sslCertSerial: '04:FA:21:88:9C:3B:10',
    sslIssuer: "Let's Encrypt E5 (Automated Wildcard)",
    scammerVpa: 'sbi.rewards.redemption@paytm',
    mulePhone: '+91 98321 44510',
    c2Telegram: '@jamtara_upi_drops_bot',
    campaignId: 'CAMP-001',
    campaignName: 'Operation ShadowUPI (Jamtara Nexus)',
    riskScore: 0.99,
    visualSimilarity: 0.96,
    ssimScore: 0.94,
    perceptualHashDistance: 3,
    entropy: 4.25,
    status: 'TAKEDOWN_SENT',
    severity: 'CRITICAL',
    category: 'ROGUE_APK',
    detectedAt: '2026-10-07 04:30:15 UTC',
    firstSeen: '2026-10-05 14:10:00 UTC',
    signaturesDetected: [
      'Malicious Android APK mimicking State Bank of India YONO application',
      'Abusive manifest permissions: READ_SMS, RECEIVE_SMS, QUERY_ALL_PACKAGES, ACCESSIBILITY_SERVICE',
      'Self-signed debug certificate hash differing from official SBI signing key',
      'C2 Command and Control traffic communicating with rogue server IP 185.220.101.42',
      'Hooks Android Accessibility Services to auto-approve UPI payment dialogs'
    ],
    evasionTechniques: [
      'Root Detection Bypass: Queries su binary locations and silently suppresses crash logs',
      'Delayed Execution Trigger: Waits 120 seconds after install before displaying phishing overlay',
      'String Encryption: Strings obfuscated via RC4 and custom XOR bitwise masks'
    ],
    apkDetails: {
      packageName: 'com.sbi.rewards.redeempoint.yono',
      version: '3.2.1-cracked',
      sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      permissions: ['android.permission.RECEIVE_SMS', 'android.permission.READ_SMS', 'android.permission.BIND_ACCESSIBILITY_SERVICE', 'android.permission.INTERNET'],
      isSpoofedCertificate: true
    },
    cloneDomHighlights: {
      hasMpinInput: true,
      hasOtpInterceptor: true,
      hasFakeNpciBadge: true,
      hasDevToolsBlocker: true
    },
    genuinePreview: {
      title: 'Genuine SBI YONO (State Bank of India)',
      brandColor: '#280071',
      sampleElements: [
        'Authoritative Package: com.sbi.lotusintouch on Google Play Store',
        'Official Google Play Protect certified SHA256 cryptographic signature',
        'SIM binding validation preventing unauthorized overlay hijacking'
      ]
    },
    clonePreview: {
      title: 'Malicious Trojan APK (SBI_Yono_Rewards_v3.apk)',
      sampleElements: [
        'Typosquatted package: com.sbi.rewards.redeempoint.yono',
        'Requests full SMS reading permission to siphon bank OTP codes',
        'Prompts for Internet Banking Username, Profile Password, and ATM PIN'
      ],
      deceptiveArtifacts: [
        'Fake SBI Reward Points banner showing "9,850 Points available (Value: ₹4,925)"',
        'Automated background SMS dispatch forwarding incoming messages to scammer phone'
      ]
    }
  },
  {
    id: 'THR-8824',
    targetBrand: 'Google Pay',
    targetBrandKey: 'gpay',
    sourceType: 'BANK_REPORT',
    domain: 'gpay-refund-nodal.live',
    url: 'https://gpay-refund-nodal.live/instant-settlement',
    ip: '104.21.65.190',
    asn: 'AS13335 Cloudflare Inc',
    sslCertSerial: '7C:99:22:A1:00:54:3B',
    sslIssuer: "Cloudflare Origin CA",
    scammerVpa: 'gpay.nodal.settle@okhdfcbank',
    mulePhone: '+91 91234 88712',
    c2Telegram: '@gpay_refund_harvest',
    campaignId: 'CAMP-003',
    campaignName: 'GPay Reverse-Collect Syndicate',
    riskScore: 0.93,
    visualSimilarity: 0.88,
    ssimScore: 0.86,
    perceptualHashDistance: 6,
    entropy: 3.84,
    status: 'INVESTIGATING',
    severity: 'HIGH',
    category: 'COLLECT_REQUEST_TRAP',
    detectedAt: '2026-10-07 03:19:40 UTC',
    firstSeen: '2026-10-07 01:05:00 UTC',
    signaturesDetected: [
      'Deceptive customer support portal impersonating Google Pay grievance desk',
      'Tricks victims into initiating a UPI collect payment under guise of receiving refund',
      'Extracted raw intent string with hardcoded payee amount ₹12,500',
      'Personal individual VPA masquerading as official Google India Digital Services entity'
    ],
    evasionTechniques: [
      'Cloudflare CDN reverse proxy masking real origin IP',
      'Referrer Header Validation: Only renders content if clicked from Telegram or WhatsApp link'
    ],
    rawUpiIntent: 'upi://pay?pa=gpay.nodal.settle@okhdfcbank&pn=GPaySettlementOfficer&am=12500&cu=INR&tn=Refund%20Order%20G99120',
    parsedIntent: {
      pa: 'gpay.nodal.settle@okhdfcbank',
      pn: 'GPaySettlementOfficer',
      am: '12500',
      tn: 'Refund Order G99120',
      isReverseCollectTrap: true
    },
    cloneDomHighlights: {
      hasMpinInput: false,
      hasOtpInterceptor: false,
      hasFakeNpciBadge: true,
      hasDevToolsBlocker: false
    },
    genuinePreview: {
      title: 'Genuine Google Pay Support Ecosystem',
      brandColor: '#4285f4',
      sampleElements: [
        'Official support handled exclusively in-app via help.google.com / pay.google.com',
        'Official Google Pay refunds are credited automatically without prompting a payment PIN',
        'Rule: Users NEVER need to enter UPI PIN to receive money'
      ]
    },
    clonePreview: {
      title: 'Fake Collect Portal (gpay-refund-nodal.live)',
      sampleElements: [
        'Button labeled: "Click here to receive your pending refund of ₹12,500"',
        'Launches Android UPI intent calling user to authorize a debit transaction',
        'Bogus customer executive avatar with fake Google ID badge'
      ],
      deceptiveArtifacts: [
        'Text: "Enter your PIN to verify receiving account - funds will be credited immediately"'
      ]
    }
  },
  {
    id: 'THR-8825',
    targetBrand: 'BHIM',
    targetBrandKey: 'bhim',
    sourceType: 'CT_LOG',
    domain: 'bhim-npci-subsidy-scheme.in.net',
    url: 'https://bhim-npci-subsidy-scheme.in.net/grant-login',
    ip: '194.26.29.112',
    asn: 'AS57523 VDSina Hosting',
    sslCertSerial: '1A:45:90:3F:12:00:88',
    sslIssuer: "ZeroSSL Domain Validated",
    scammerVpa: 'gov.subsidy.verify@ptaxis',
    mulePhone: '+91 70014 99231',
    c2Telegram: '@kyc_scam_relay_bot',
    campaignId: 'CAMP-002',
    campaignName: 'Operation PhishPay-V4 (KYC Smishing Syndicate)',
    riskScore: 0.95,
    visualSimilarity: 0.92,
    ssimScore: 0.91,
    perceptualHashDistance: 4,
    entropy: 4.10,
    status: 'TAKEDOWN_QUEUED',
    severity: 'HIGH',
    category: 'PHISHING_PORTAL',
    detectedAt: '2026-10-07 02:05:12 UTC',
    firstSeen: '2026-10-06 20:15:00 UTC',
    signaturesDetected: [
      'Counterfeit Government of India & NPCI BHIM subsidy enrollment portal',
      'Replication of official tricolor emblems and National Payments Corporation logos',
      'Fraudulent payment gateway asking for ₹25 registration charge via hijacked VPA',
      'Captures victim bank account number, IFSC code, and registered mobile number'
    ],
    evasionTechniques: [
      'Dynamic HTML injection to bypass heuristic web crawlers',
      'Geo-filtering restricting access outside tier-2 Indian mobile telecom IP pools'
    ],
    rawUpiIntent: 'upi://pay?pa=gov.subsidy.verify@ptaxis&pn=NPCISubsidyDesk&am=25&cu=INR&tn=Scheme%20Verification%20Fee',
    parsedIntent: {
      pa: 'gov.subsidy.verify@ptaxis',
      pn: 'NPCISubsidyDesk',
      am: '25',
      tn: 'Scheme Verification Fee',
      isReverseCollectTrap: true
    },
    cloneDomHighlights: {
      hasMpinInput: true,
      hasOtpInterceptor: true,
      hasFakeNpciBadge: true,
      hasDevToolsBlocker: true
    },
    genuinePreview: {
      title: 'Genuine BHIM UPI (NPCI)',
      brandColor: '#00833e',
      sampleElements: [
        'Authoritative official portals: bhimupi.org.in & npci.org.in',
        'Official government welfare subsidies are direct benefit transfers (DBT) with NO registration fee',
        'Zero external payment requests for central government schemes'
      ]
    },
    clonePreview: {
      title: 'Counterfeit Subsidy Clone (bhim-npci-subsidy-scheme.in.net)',
      sampleElements: [
        'Uses stolen emblem of National Payments Corporation of India',
        'Prompts for immediate payment to an unverified private VPA handle',
        'Includes fake testimonials claiming receipt of ₹10,000 welfare grant'
      ],
      deceptiveArtifacts: [
        'Urgency counter: "Only 142 subsidy grants remaining in your district today"'
      ]
    }
  },
  {
    id: 'THR-8826',
    targetBrand: 'Razorpay',
    targetBrandKey: 'razorpay',
    sourceType: 'MANUAL_SUBMISSION',
    domain: 'checkout-razorpay-secure.club',
    url: 'https://checkout-razorpay-secure.club/pay/inv_998124',
    ip: '45.145.66.81',
    asn: 'AS208605 HostRoyale Technologies',
    sslCertSerial: '99:01:DF:77:E5:22:1A',
    sslIssuer: "cPanel Inc Certification Authority",
    scammerVpa: 'fastpay.merchant.hub@razorpay',
    mulePhone: '+91 88910 22194',
    c2Telegram: '@razor_drops_c2',
    campaignId: 'CAMP-004',
    campaignName: 'Checkout Cloners Network',
    riskScore: 0.94,
    visualSimilarity: 0.93,
    ssimScore: 0.91,
    perceptualHashDistance: 4,
    entropy: 3.91,
    status: 'DISMANTLED',
    severity: 'HIGH',
    category: 'PHISHING_PORTAL',
    detectedAt: '2026-10-06 19:10:00 UTC',
    firstSeen: '2026-10-05 11:00:00 UTC',
    signaturesDetected: [
      'Pixel-perfect replica of Razorpay Standard Checkout modal dialog',
      'Keylogger captures Card Number, Expiry, CVV, and NetBanking customer ID in real-time',
      'Dynamic QR Code generator pointing to fraudster personal UPI VPA'
    ],
    evasionTechniques: [
      'Right-click and clipboard copy disabled',
      'Obfuscated payload using AES encryption decrypted in client memory'
    ],
    cloneDomHighlights: {
      hasMpinInput: true,
      hasOtpInterceptor: true,
      hasFakeNpciBadge: true,
      hasDevToolsBlocker: true
    },
    genuinePreview: {
      title: 'Genuine Razorpay Payment Gateway',
      brandColor: '#0c2340',
      sampleElements: [
        'Hosted securely on api.razorpay.com & checkout.razorpay.com',
        'PCI-DSS Level 1 compliant tokenization',
        'Official SSL certificate with high assurance validation'
      ]
    },
    clonePreview: {
      title: 'Spoofed Checkout Modal (checkout-razorpay-secure.club)',
      sampleElements: [
        'Impersonates standard Razorpay dark-blue theme and branded spinner',
        'Sends card details via unencrypted POST to drop server before triggering fake OTP modal'
      ],
      deceptiveArtifacts: [
        'Counterfeit "100% Safe 256-Bit SSL Encrypted by Razorpay" footer'
      ]
    }
  }
];

export const INITIAL_CAMPAIGNS: CampaignCluster[] = [
  {
    campaignId: 'CAMP-001',
    name: 'Operation ShadowUPI (Jamtara Nexus)',
    alias: 'Threat Cluster IN-FIN-2026-01',
    threatActorGroup: 'Jamtara Financial Syndicate #4',
    riskLevel: 'CRITICAL',
    status: 'ACTIVE',
    nodeCount: 14,
    domainsCount: 7,
    vpasCount: 3,
    hostsCount: 2,
    firstSeen: '2026-09-15',
    lastActive: '10 minutes ago',
    targetedBrands: ['PhonePe', 'SBI YONO'],
    sharedInfrastructure: {
      hostingProvider: 'Global Transit Ltd (Bulletproof Host)',
      commonAsn: 'AS49453',
      certIssuer: "Let's Encrypt E5 Wildcard",
      mulePhoneNumbers: ['+91 98321 44510', '+91 98321 44511'],
      scammerVpas: ['cashback.desk99@okaxis', 'sbi.rewards.redemption@paytm'],
      c2Handles: ['@jamtara_upi_drops_bot', 't.me/jamtara_logs_bot']
    },
    tactics: [
      'Social engineering scratch-card links circulated on WhatsApp & Telegram',
      'Deceptive UPI reverse-collect payloads disguised as instant refunds',
      'Trojanized SBI YONO reward point APKs capturing OTPs via SMS accessibility hooks'
    ],
    itemIds: ['THR-8821', 'THR-8823']
  },
  {
    campaignId: 'CAMP-002',
    name: 'Operation PhishPay-V4 (KYC Smishing Syndicate)',
    alias: 'Threat Cluster IN-FIN-2026-02',
    threatActorGroup: 'Mewat Cybercrime Ring',
    riskLevel: 'CRITICAL',
    status: 'ACTIVE',
    nodeCount: 12,
    domainsCount: 6,
    vpasCount: 2,
    hostsCount: 2,
    firstSeen: '2026-09-28',
    lastActive: '32 minutes ago',
    targetedBrands: ['Paytm', 'BHIM'],
    sharedInfrastructure: {
      hostingProvider: 'VDSina Hosting Offshore',
      commonAsn: 'AS57523',
      certIssuer: 'ZeroSSL Domain Validated',
      mulePhoneNumbers: ['+91 70014 99231'],
      scammerVpas: ['paytm.helpdesk.nodal@okhdfcbank', 'gov.subsidy.verify@ptaxis'],
      c2Handles: ['@kyc_scam_relay_bot']
    },
    tactics: [
      'Bulk SMS spoofing bank sender headers (e.g. VK-PAYTM, AD-BHIM)',
      'Fake KYC deactivation warnings triggering credential harvesting portals',
      'Fast-flux DNS rotation every 45 minutes to evade basic blocklists'
    ],
    itemIds: ['THR-8822', 'THR-8825']
  },
  {
    campaignId: 'CAMP-003',
    name: 'GPay Reverse-Collect Syndicate',
    alias: 'Threat Cluster IN-FIN-2026-03',
    threatActorGroup: 'BharatPay Fraud Collective',
    riskLevel: 'HIGH',
    status: 'ACTIVE',
    nodeCount: 8,
    domainsCount: 4,
    vpasCount: 2,
    hostsCount: 1,
    firstSeen: '2026-10-01',
    lastActive: '2 hours ago',
    targetedBrands: ['Google Pay'],
    sharedInfrastructure: {
      hostingProvider: 'Cloudflare Proxied Origin',
      commonAsn: 'AS13335',
      certIssuer: 'Cloudflare Origin CA',
      mulePhoneNumbers: ['+91 91234 88712'],
      scammerVpas: ['gpay.nodal.settle@okhdfcbank'],
      c2Handles: ['@gpay_refund_harvest']
    },
    tactics: [
      'Fake search-engine sponsored ads for "Google Pay customer support"',
      'Tricking caller into tapping UPI intent link with hidden debit payload'
    ],
    itemIds: ['THR-8824']
  },
  {
    campaignId: 'CAMP-004',
    name: 'Checkout Cloners Network',
    alias: 'Threat Cluster IN-FIN-2026-04',
    threatActorGroup: 'DarkWeb RZP Kit Operators',
    riskLevel: 'HIGH',
    status: 'DISMANTLED',
    nodeCount: 6,
    domainsCount: 3,
    vpasCount: 1,
    hostsCount: 1,
    firstSeen: '2026-09-10',
    lastActive: 'Yesterday',
    targetedBrands: ['Razorpay'],
    sharedInfrastructure: {
      hostingProvider: 'HostRoyale Technologies',
      commonAsn: 'AS208605',
      certIssuer: 'cPanel Inc Certification Authority',
      mulePhoneNumbers: ['+91 88910 22194'],
      scammerVpas: ['fastpay.merchant.hub@razorpay'],
      c2Handles: ['@razor_drops_c2']
    },
    tactics: [
      'Phishing payment modal embedded on counterfeit discounted luxury goods stores',
      'Real-time card skimming with instant UPI diversion'
    ],
    itemIds: ['THR-8826']
  }
];

export const INITIAL_GRAPH_NODES: GraphNode[] = [
  // Targeted Brands
  { id: 'b_phonepe', label: 'PhonePe (Target Brand)', type: 'BRAND', brand: 'PhonePe' },
  { id: 'b_paytm', label: 'Paytm (Target Brand)', type: 'BRAND', brand: 'Paytm' },
  { id: 'b_sbi', label: 'SBI YONO (Target Brand)', type: 'BRAND', brand: 'SBI YONO' },
  { id: 'b_gpay', label: 'Google Pay (Target Brand)', type: 'BRAND', brand: 'Google Pay' },
  { id: 'b_bhim', label: 'BHIM NPCI (Target Brand)', type: 'BRAND', brand: 'BHIM' },

  // Campaign 1 - Jamtara ShadowUPI
  { id: 'dom_phonepe_top', label: 'phonepe-cashback2026.top', type: 'DOMAIN', campaignId: 'CAMP-001', severity: 'CRITICAL' },
  { id: 'dom_sbi_xyz', label: 'sbi-reward-points-apk.xyz', type: 'DOMAIN', campaignId: 'CAMP-001', severity: 'CRITICAL' },
  { id: 'dom_scratch_in', label: 'phonepe-scratch5000.in', type: 'DOMAIN', campaignId: 'CAMP-001', severity: 'HIGH' },
  { id: 'ip_185_220', label: '185.220.101.42 (AS49453)', type: 'IP', campaignId: 'CAMP-001', severity: 'CRITICAL' },
  { id: 'cert_lets_c1', label: 'Cert: 04:FA:21:88 (Wildcard)', type: 'CERT', campaignId: 'CAMP-001' },
  { id: 'vpa_cashback_99', label: 'cashback.desk99@okaxis', type: 'VPA', campaignId: 'CAMP-001', severity: 'CRITICAL' },
  { id: 'vpa_sbi_redeem', label: 'sbi.rewards.redemption@paytm', type: 'VPA', campaignId: 'CAMP-001', severity: 'CRITICAL' },
  { id: 'phone_98321', label: '+91 98321 44510 (Mule)', type: 'PHONE', campaignId: 'CAMP-001' },
  { id: 'tg_jamtara', label: '@jamtara_upi_drops_bot (C2)', type: 'TELEGRAM', campaignId: 'CAMP-001' },

  // Campaign 2 - KYC Smishing Syndicate
  { id: 'dom_paytm_site', label: 'paytm-kyc-update-portal.site', type: 'DOMAIN', campaignId: 'CAMP-002', severity: 'CRITICAL' },
  { id: 'dom_bhim_net', label: 'bhim-npci-subsidy-scheme.in.net', type: 'DOMAIN', campaignId: 'CAMP-002', severity: 'HIGH' },
  { id: 'dom_paytm_online', label: 'kyc-wallet-paytmbank.online', type: 'DOMAIN', campaignId: 'CAMP-002', severity: 'HIGH' },
  { id: 'ip_194_26', label: '194.26.29.112 (AS57523)', type: 'IP', campaignId: 'CAMP-002', severity: 'CRITICAL' },
  { id: 'cert_zero_c2', label: 'Cert: 1A:45:90:3F (ZeroSSL)', type: 'CERT', campaignId: 'CAMP-002' },
  { id: 'vpa_nodal_hdfc', label: 'paytm.helpdesk.nodal@okhdfcbank', type: 'VPA', campaignId: 'CAMP-002', severity: 'CRITICAL' },
  { id: 'vpa_gov_subsidy', label: 'gov.subsidy.verify@ptaxis', type: 'VPA', campaignId: 'CAMP-002', severity: 'HIGH' },
  { id: 'phone_70014', label: '+91 70014 99231 (Mule)', type: 'PHONE', campaignId: 'CAMP-002' },
  { id: 'tg_kyc_relay', label: '@kyc_scam_relay_bot (C2)', type: 'TELEGRAM', campaignId: 'CAMP-002' },

  // Campaign 3 - GPay Reverse Collect
  { id: 'dom_gpay_live', label: 'gpay-refund-nodal.live', type: 'DOMAIN', campaignId: 'CAMP-003', severity: 'HIGH' },
  { id: 'ip_104_21', label: '104.21.65.190 (AS13335)', type: 'IP', campaignId: 'CAMP-003' },
  { id: 'vpa_gpay_nodal', label: 'gpay.nodal.settle@okhdfcbank', type: 'VPA', campaignId: 'CAMP-003', severity: 'HIGH' },
  { id: 'phone_91234', label: '+91 91234 88712 (Mule)', type: 'PHONE', campaignId: 'CAMP-003' },
  { id: 'tg_gpay_c2', label: '@gpay_refund_harvest (C2)', type: 'TELEGRAM', campaignId: 'CAMP-003' }
];

export const INITIAL_GRAPH_EDGES: GraphEdge[] = [
  // Campaign 1 Links
  { id: 'e1', source: 'dom_phonepe_top', target: 'b_phonepe', relationship: 'IMPERSONATES', campaignId: 'CAMP-001' },
  { id: 'e2', source: 'dom_phonepe_top', target: 'ip_185_220', relationship: 'HOSTED_ON', campaignId: 'CAMP-001' },
  { id: 'e3', source: 'dom_phonepe_top', target: 'cert_lets_c1', relationship: 'USES_CERT', campaignId: 'CAMP-001' },
  { id: 'e4', source: 'dom_phonepe_top', target: 'vpa_cashback_99', relationship: 'COLLECTS_TO', campaignId: 'CAMP-001' },
  { id: 'e5', source: 'dom_phonepe_top', target: 'tg_jamtara', relationship: 'C2_CHANNEL', campaignId: 'CAMP-001' },

  { id: 'e6', source: 'dom_sbi_xyz', target: 'b_sbi', relationship: 'IMPERSONATES', campaignId: 'CAMP-001' },
  { id: 'e7', source: 'dom_sbi_xyz', target: 'ip_185_220', relationship: 'HOSTED_ON', campaignId: 'CAMP-001' },
  { id: 'e8', source: 'dom_sbi_xyz', target: 'cert_lets_c1', relationship: 'USES_CERT', campaignId: 'CAMP-001' },
  { id: 'e9', source: 'dom_sbi_xyz', target: 'vpa_sbi_redeem', relationship: 'COLLECTS_TO', campaignId: 'CAMP-001' },
  { id: 'e10', source: 'dom_sbi_xyz', target: 'phone_98321', relationship: 'SMS_DISPATCHED_BY', campaignId: 'CAMP-001' },
  { id: 'e11', source: 'dom_sbi_xyz', target: 'tg_jamtara', relationship: 'C2_CHANNEL', campaignId: 'CAMP-001' },

  { id: 'e12', source: 'dom_scratch_in', target: 'ip_185_220', relationship: 'HOSTED_ON', campaignId: 'CAMP-001' },
  { id: 'e13', source: 'dom_scratch_in', target: 'b_phonepe', relationship: 'IMPERSONATES', campaignId: 'CAMP-001' },
  { id: 'e14', source: 'dom_scratch_in', target: 'vpa_cashback_99', relationship: 'COLLECTS_TO', campaignId: 'CAMP-001' },

  // Campaign 2 Links
  { id: 'e15', source: 'dom_paytm_site', target: 'b_paytm', relationship: 'IMPERSONATES', campaignId: 'CAMP-002' },
  { id: 'e16', source: 'dom_paytm_site', target: 'ip_194_26', relationship: 'HOSTED_ON', campaignId: 'CAMP-002' },
  { id: 'e17', source: 'dom_paytm_site', target: 'cert_zero_c2', relationship: 'USES_CERT', campaignId: 'CAMP-002' },
  { id: 'e18', source: 'dom_paytm_site', target: 'vpa_nodal_hdfc', relationship: 'COLLECTS_TO', campaignId: 'CAMP-002' },
  { id: 'e19', source: 'dom_paytm_site', target: 'phone_70014', relationship: 'SMS_DISPATCHED_BY', campaignId: 'CAMP-002' },
  { id: 'e20', source: 'dom_paytm_site', target: 'tg_kyc_relay', relationship: 'C2_CHANNEL', campaignId: 'CAMP-002' },

  { id: 'e21', source: 'dom_bhim_net', target: 'b_bhim', relationship: 'IMPERSONATES', campaignId: 'CAMP-002' },
  { id: 'e22', source: 'dom_bhim_net', target: 'ip_194_26', relationship: 'HOSTED_ON', campaignId: 'CAMP-002' },
  { id: 'e23', source: 'dom_bhim_net', target: 'cert_zero_c2', relationship: 'USES_CERT', campaignId: 'CAMP-002' },
  { id: 'e24', source: 'dom_bhim_net', target: 'vpa_gov_subsidy', relationship: 'COLLECTS_TO', campaignId: 'CAMP-002' },

  { id: 'e25', source: 'dom_paytm_online', target: 'ip_194_26', relationship: 'HOSTED_ON', campaignId: 'CAMP-002' },
  { id: 'e26', source: 'dom_paytm_online', target: 'b_paytm', relationship: 'IMPERSONATES', campaignId: 'CAMP-002' },
  { id: 'e27', source: 'dom_paytm_online', target: 'vpa_nodal_hdfc', relationship: 'COLLECTS_TO', campaignId: 'CAMP-002' },

  // Campaign 3 Links
  { id: 'e28', source: 'dom_gpay_live', target: 'b_gpay', relationship: 'IMPERSONATES', campaignId: 'CAMP-003' },
  { id: 'e29', source: 'dom_gpay_live', target: 'ip_104_21', relationship: 'HOSTED_ON', campaignId: 'CAMP-003' },
  { id: 'e30', source: 'dom_gpay_live', target: 'vpa_gpay_nodal', relationship: 'COLLECTS_TO', campaignId: 'CAMP-003' },
  { id: 'e31', source: 'dom_gpay_live', target: 'phone_91234', relationship: 'SMS_DISPATCHED_BY', campaignId: 'CAMP-003' },
  { id: 'e32', source: 'dom_gpay_live', target: 'tg_gpay_c2', relationship: 'C2_CHANNEL', campaignId: 'CAMP-003' }
];

export const BENCHMARK_METRICS_DATA: BenchmarkMetrics = {
  totalEvaluated: 1280,
  datasetBreakdown: {
    phishingPortals: 410,
    rogueApks: 230,
    smsSmishingFeeds: 240,
    legitimateGateways: 400
  },
  currentThreshold: 0.70,
  precision: 0.984,
  recall: 0.973,
  f1Score: 0.978,
  specificity: 0.988,
  rocAuc: 0.993,
  confusionMatrix: {
    truePositives: 856,
    falsePositives: 14,
    trueNegatives: 395,
    falseNegatives: 15
  },
  precisionRecallCurve: [
    { threshold: 0.20, precision: 0.882, recall: 0.998, f1: 0.936 },
    { threshold: 0.35, precision: 0.925, recall: 0.992, f1: 0.957 },
    { threshold: 0.50, precision: 0.958, recall: 0.985, f1: 0.971 },
    { threshold: 0.65, precision: 0.979, recall: 0.978, f1: 0.978 },
    { threshold: 0.70, precision: 0.984, recall: 0.973, f1: 0.978 },
    { threshold: 0.80, precision: 0.992, recall: 0.941, f1: 0.966 },
    { threshold: 0.90, precision: 0.998, recall: 0.872, f1: 0.931 }
  ],
  vectorPerformance: [
    { vector: 'Phishing Portals (Web)', accuracy: 0.988, samples: 410, avgLatencyMs: 142 },
    { vector: 'Malicious Android APKs', accuracy: 0.978, samples: 230, avgLatencyMs: 310 },
    { vector: 'SMS Smishing & Collect Traps', accuracy: 0.983, samples: 240, avgLatencyMs: 95 },
    { vector: 'Legitimate Payment Gateways', accuracy: 0.988, samples: 400, avgLatencyMs: 82 }
  ]
};
