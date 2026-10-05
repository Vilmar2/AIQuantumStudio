export type NavigationTab = 
  | 'home' 
  | 'mini-apps' 
  | 'dashboards' 
  | 'soluciones' 
  | 'academy' 
  | 'nosotros' 
  | 'contacto';

export interface MiniAppItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  timeToImplement: string;
  impactMetric: string;
  features: string[];
  interactiveType?: 'tip-calculator' | 'queue-turn' | 'b2b-margin' | 'kitchen-flow' | 'iframe-embed';
  embedUrl?: string;
  demoEnabled?: boolean;
  fullAccessProtected?: boolean;
  protectedFeatures?: string[];
}

export interface DashboardItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  highlightKpi: string;
  kpiLabel: string;
  kpiDelta: string;
  chartType: 'area' | 'bar' | 'donut';
  demoType: 'live-kpi' | 'embed' | 'video-mock' | 'interactive';
  embedUrl?: string;
  demoEnabled?: boolean;
  fullAccessProtected?: boolean;
  protectedFeatures?: string[];
  metrics: { label: string; value: string; trend: string }[];
}

export interface AcademyModule {
  id: string;
  number: string;
  title: string;
  duration: string;
  focus: string;
  deliverable: string;
}

export interface ShowcaseProject {
  id: string;
  title: string;
  clientType: string;
  category: 'Mini App' | 'Dashboard' | 'Solución Digital' | 'Experiencia';
  result: string;
  description: string;
  accentColor: string;
}

// User & Entitlements Architecture
export type UserStatus = 'guest' | 'registered' | 'authorized';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface ProductAccessResponse {
  productId: string;
  productName: string;
  userStatus: UserStatus;
  demoEnabled: boolean;
  hasFullAccess: boolean;
  message: string;
}
