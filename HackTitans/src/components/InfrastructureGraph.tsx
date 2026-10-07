import React, { useState, useEffect, useRef } from 'react';
import { GraphNode, GraphEdge, CampaignCluster, ThreatSeverity } from '../types/threat.ts';
import { 
  Network, 
  Globe, 
  Server, 
  CreditCard, 
  Phone, 
  Shield, 
  Send, 
  Building2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Download, 
  SlidersHorizontal,
  AlertTriangle,
  Info
} from 'lucide-react';

interface InfrastructureGraphProps {
  initialNodes: GraphNode[];
  initialEdges: GraphEdge[];
  campaigns: CampaignCluster[];
  selectedCampaignId?: string;
  onSelectCampaign: (campaignId: string) => void;
}

export const InfrastructureGraph: React.FC<InfrastructureGraphProps> = ({
  initialNodes,
  initialEdges,
  campaigns,
  selectedCampaignId,
  onSelectCampaign
}) => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [activeCampaignFilter, setActiveCampaignFilter] = useState<string>(selectedCampaignId || 'ALL');
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDraggingCanvas, setIsDraggingCanvas] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const svgRef = useRef<SVGSVGElement | null>(null);

  // Position nodes with clean radial layout or campaign clustering coordinates
  const positionedNodes = React.useMemo(() => {
    let nodesToRender = [...initialNodes];

    if (activeCampaignFilter !== 'ALL') {
      nodesToRender = nodesToRender.filter(n => 
        n.campaignId === activeCampaignFilter || n.type === 'BRAND'
      );
    }

    if (filterType !== 'ALL') {
      nodesToRender = nodesToRender.filter(n => n.type === filterType || n.type === 'BRAND');
    }

    const width = 860;
    const height = 520;
    const centerX = width / 2;
    const centerY = height / 2;

    return nodesToRender.map((node, index) => {
      // Group by campaign or radial position
      let x = centerX;
      let y = centerY;

      if (node.type === 'BRAND') {
        const brandAngle = (index / 5) * 2 * Math.PI;
        x = centerX + Math.cos(brandAngle) * 90;
        y = centerY + Math.sin(brandAngle) * 90;
      } else if (node.campaignId === 'CAMP-001') {
        const angle = (index * 0.7) + 0.3;
        x = centerX - 240 + Math.cos(angle) * 110;
        y = centerY - 100 + Math.sin(angle) * 110;
      } else if (node.campaignId === 'CAMP-002') {
        const angle = (index * 0.7) + 0.8;
        x = centerX + 240 + Math.cos(angle) * 110;
        y = centerY - 100 + Math.sin(angle) * 110;
      } else {
        const angle = (index * 0.8) + 1.2;
        x = centerX + Math.cos(angle) * 170;
        y = centerY + 140 + Math.sin(angle) * 80;
      }

      return {
        ...node,
        x,
        y
      };
    });
  }, [initialNodes, activeCampaignFilter, filterType]);

  const activeNodeIds = new Set(positionedNodes.map(n => n.id));

  const filteredEdges = initialEdges.filter(edge => 
    activeNodeIds.has(edge.source) && activeNodeIds.has(edge.target)
  );

  const getNodeColor = (type: GraphNode['type']) => {
    switch (type) {
      case 'BRAND': return '#3b82f6';
      case 'DOMAIN': return '#f43f5e';
      case 'IP': return '#8b5cf6';
      case 'VPA': return '#ef4444';
      case 'PHONE': return '#06b6d4';
      case 'CERT': return '#10b981';
      case 'TELEGRAM': return '#ec4899';
      default: return '#94a3b8';
    }
  };

  const getNodeIcon = (type: GraphNode['type']) => {
    switch (type) {
      case 'BRAND': return <Building2 className="w-3.5 h-3.5 text-white" />;
      case 'DOMAIN': return <Globe className="w-3.5 h-3.5 text-white" />;
      case 'IP': return <Server className="w-3.5 h-3.5 text-white" />;
      case 'VPA': return <CreditCard className="w-3.5 h-3.5 text-white" />;
      case 'PHONE': return <Phone className="w-3.5 h-3.5 text-white" />;
      case 'CERT': return <Shield className="w-3.5 h-3.5 text-white" />;
      case 'TELEGRAM': return <Send className="w-3.5 h-3.5 text-white" />;
      default: return <Info className="w-3.5 h-3.5 text-white" />;
    }
  };

  const handleExportIoCs = () => {
    const csvRows = ['Type,Identifier,Campaign,Severity'];
    positionedNodes.forEach(n => {
      csvRows.push(`${n.type},"${n.label}",${n.campaignId || 'COMMON'},${n.severity || 'INFO'}`);
    });
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `UPI_Shield_IoC_Export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header with Campaign Filter & Actions */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-indigo-400">
            MULTI-TIER INFRASTRUCTURE GRAPH MAPPING
          </div>
          <h2 className="text-base font-bold text-white font-display">
            Campaign Clustering Engine
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Connecting disposable domains, offshore IP hosts, SSL serials, scammer VPAs, and mule SIM cards into criminal syndicates.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={activeCampaignFilter}
            onChange={(e) => {
              setActiveCampaignFilter(e.target.value);
              onSelectCampaign(e.target.value);
            }}
            className="px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
          >
            <option value="ALL">All Campaigns & Syndicates</option>
            {campaigns.map(c => (
              <option key={c.campaignId} value={c.campaignId}>
                {c.campaignId} · {c.name}
              </option>
            ))}
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
          >
            <option value="ALL">All Entity Types</option>
            <option value="DOMAIN">Domains Only</option>
            <option value="IP">IP Hosts</option>
            <option value="VPA">Scammer VPAs</option>
            <option value="PHONE">Mule Phone SIMs</option>
            <option value="CERT">SSL Certificates</option>
            <option value="TELEGRAM">Telegram C2 Bots</option>
          </select>

          <button
            onClick={handleExportIoCs}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export IoCs (CSV)</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas Area */}
      <div className="relative rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl min-h-[520px]">
        {/* Floating Viewport Controls */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 p-1 bg-slate-900/90 backdrop-blur-md rounded-lg border border-slate-800 shadow-lg">
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 2.0))}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.6))}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => { setZoomLevel(1); setPanOffset({ x: 0, y: 0 }); }}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <span className="text-[11px] font-mono text-slate-400 px-2 tabular-nums">
            {(zoomLevel * 100).toFixed(0)}%
          </span>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 z-10 p-2.5 bg-slate-900/90 backdrop-blur-md rounded-lg border border-slate-800 text-[11px] flex flex-wrap gap-3 font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <span className="text-slate-300">Target Brand</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span className="text-slate-300">Phishing Domain</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
            <span className="text-slate-300">Offshore IP Host</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
            <span className="text-slate-300">Scammer VPA</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
            <span className="text-slate-300">Mule Phone</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500"></span>
            <span className="text-slate-300">Telegram C2</span>
          </div>
        </div>

        {/* Interactive SVG Renderer */}
        <svg
          ref={svgRef}
          className="w-full h-[520px] cursor-grab active:cursor-grabbing"
          onMouseDown={(e) => {
            if (e.target === svgRef.current) {
              setIsDraggingCanvas(true);
              setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
            }
          }}
          onMouseMove={(e) => {
            if (isDraggingCanvas) {
              setPanOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
            }
          }}
          onMouseUp={() => setIsDraggingCanvas(false)}
          onMouseLeave={() => setIsDraggingCanvas(false)}
        >
          <g transform={`translate(${panOffset.x}, ${panOffset.y}) scale(${zoomLevel})`}>
            {/* Edges / Connections */}
            {filteredEdges.map((edge) => {
              const sourceNode = positionedNodes.find(n => n.id === edge.source);
              const targetNode = positionedNodes.find(n => n.id === edge.target);
              if (!sourceNode || !targetNode) return null;

              return (
                <g key={edge.id}>
                  <line
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke="#334155"
                    strokeWidth="1.5"
                    strokeDasharray={edge.relationship === 'IMPERSONATES' ? '4 2' : 'none'}
                  />
                  {/* Subtle edge label */}
                  <text
                    x={((sourceNode.x || 0) + (targetNode.x || 0)) / 2}
                    y={((sourceNode.y || 0) + (targetNode.y || 0)) / 2 - 4}
                    fill="#64748b"
                    fontSize="8"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {edge.relationship.toLowerCase()}
                  </text>
                </g>
              );
            })}

            {/* Nodes */}
            {positionedNodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              const color = getNodeColor(node.type);

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onClick={() => setSelectedNode(node)}
                  className="cursor-pointer group"
                >
                  {/* Outer Pulsing Halo if selected or critical */}
                  {(isSelected || node.severity === 'CRITICAL') && (
                    <circle
                      r="22"
                      fill={color}
                      opacity="0.15"
                      className="animate-pulse"
                    />
                  )}

                  {/* Node Circle */}
                  <circle
                    r={node.type === 'BRAND' ? '18' : '15'}
                    fill={color}
                    stroke={isSelected ? '#ffffff' : '#0f172a'}
                    strokeWidth={isSelected ? '2.5' : '1.5'}
                    className="transition-transform group-hover:scale-110"
                  />

                  {/* Icon representation in center */}
                  <g transform="translate(-7, -7)">
                    {getNodeIcon(node.type)}
                  </g>

                  {/* Node Label Below */}
                  <text
                    y="24"
                    fill={isSelected ? '#ffffff' : '#cbd5e1'}
                    fontSize="9.5"
                    fontFamily="monospace"
                    fontWeight={isSelected ? 'bold' : 'normal'}
                    textAnchor="middle"
                    className="pointer-events-none select-none"
                  >
                    {node.label.length > 20 ? node.label.slice(0, 18) + '...' : node.label}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Selected Node Details Drawer */}
        {selectedNode && (
          <div className="absolute top-4 right-4 z-20 w-80 p-4 rounded-xl bg-slate-900/95 backdrop-blur-md border border-slate-700 shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span 
                  className="w-2.5 h-2.5 rounded-full" 
                  style={{ backgroundColor: getNodeColor(selectedNode.type) }}
                ></span>
                <span className="text-xs font-mono font-bold text-white uppercase">
                  {selectedNode.type} Node Info
                </span>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="text-slate-400">Node Identifier:</div>
              <div className="font-mono text-white text-xs bg-slate-950 p-2 rounded border border-slate-800 break-all">
                {selectedNode.label}
              </div>
            </div>

            {selectedNode.campaignId && (
              <div className="text-xs space-y-1">
                <span className="text-slate-400">Attributed Campaign:</span>
                <div className="font-mono text-indigo-400 font-semibold">
                  {selectedNode.campaignId}
                </div>
              </div>
            )}

            {selectedNode.severity && (
              <div className="text-xs space-y-1">
                <span className="text-slate-400">Threat Severity:</span>
                <div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                    selectedNode.severity === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}>
                    {selectedNode.severity}
                  </span>
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
              Associated links in cluster: {
                filteredEdges.filter(e => e.source === selectedNode.id || e.target === selectedNode.id).length
              } connected infrastructure entities.
            </div>
          </div>
        )}
      </div>

      {/* Campaign Syndicate Footprint Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {campaigns.map((camp) => (
          <div 
            key={camp.campaignId}
            className={`p-4 rounded-xl border bg-slate-900/60 ${
              activeCampaignFilter === camp.campaignId ? 'border-indigo-500 bg-slate-900/90' : 'border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-indigo-400">{camp.campaignId}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                camp.riskLevel === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
              }`}>
                {camp.status} · {camp.riskLevel}
              </span>
            </div>

            <h3 className="text-sm font-bold text-white font-display">{camp.name}</h3>
            <p className="text-xs text-slate-400 mt-0.5">Threat Actor: {camp.threatActorGroup}</p>

            <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <div>
                <span className="text-slate-500">Host ASN:</span>
                <div className="text-slate-300">{camp.sharedInfrastructure.commonAsn}</div>
              </div>
              <div>
                <span className="text-slate-500">Cert Issuer:</span>
                <div className="text-slate-300 truncate">{camp.sharedInfrastructure.certIssuer}</div>
              </div>
              <div>
                <span className="text-slate-500">Rogue VPAs:</span>
                <div className="text-rose-400 truncate">{camp.sharedInfrastructure.scammerVpas[0]}</div>
              </div>
              <div>
                <span className="text-slate-500">Mule SIM:</span>
                <div className="text-cyan-400 truncate">{camp.sharedInfrastructure.mulePhoneNumbers[0] || 'N/A'}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
