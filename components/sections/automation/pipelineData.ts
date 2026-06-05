export type NodeStatus = "pending" | "active" | "done";

export type PipelineToolKey = "jobphoning" | "n8n" | "axonaut" | "notify";

export interface PipelineNode {
  id: string;
  tool: PipelineToolKey;
  label: string;
  sublabel: string;
  activeStatus?: string | string[];
}

export type EdgeKind = "main" | "callback" | "notification";

export interface PipelineEdge {
  from: string;
  to: string;
  kind: EdgeKind;
  label?: string;
}

export const DEFAULT_NODES: PipelineNode[] = [
  { id: "jobphoning",   tool: "jobphoning", label: "JobPhoning",    sublabel: "appel qualifié" },
  { id: "n8n-clean",    tool: "n8n",        label: "n8n",           sublabel: "Nettoyage / dédup" },
  { id: "n8n-siren",    tool: "n8n",        label: "n8n",           sublabel: "Enrichissement SIREN" },
  { id: "n8n-decision", tool: "n8n",        label: "n8n",           sublabel: "Décision" },
  { id: "axonaut",      tool: "axonaut",    label: "Axonaut",       sublabel: "CRM · contact + opportunité" },
  { id: "notify",       tool: "notify",     label: "Notification",  sublabel: "commercial" },
];

export const DEFAULT_EDGES: PipelineEdge[] = [
  { from: "jobphoning",   to: "n8n-clean",    kind: "main" },
  { from: "n8n-clean",    to: "n8n-siren",    kind: "main" },
  { from: "n8n-siren",    to: "n8n-decision", kind: "main" },
  { from: "n8n-decision", to: "axonaut",      kind: "main" },
  { from: "axonaut",      to: "notify",       kind: "notification" },
  { from: "n8n-decision", to: "jobphoning",   kind: "callback" },
];
