export type StockSector =
  | 'AI & Machine Learning'
  | 'Semiconductors'
  | 'Cloud & Cybersecurity'
  | 'Energy & Nuclear'
  | 'Quantum Computing'
  | 'Aviation & Robotics'
  | 'Fintech & Finance'
  | 'Consumer & Retail'
  | 'Biotech & Health'
  | 'Infrastructure'
  | 'Crypto & Digital Assets'
  | 'ETFs'
  | 'Other';

export interface WatchlistStock {
  symbol: string;
  name: string;
  sector: StockSector;
  type: 'equity' | 'etf' | 'adr' | 'crypto-etf';
}

export interface StockQuote {
  symbol: string;
  name: string;
  price: number | null;
  change: number | null;
  changePercent: number | null;
  fiftyTwoWeekHigh: number | null;
  fiftyTwoWeekLow: number | null;
  marketCap: number | null;
  error?: string;
}

export interface FearGreedData {
  score: number;
  rating: string;
  previousClose: number;
  previousWeek: number;
  previousMonth: number;
  previousYear: number;
  timestamp: string;
}

export interface EarningsEvent {
  symbol: string;
  name: string;
  earningsDate: string;
  daysUntil: number;
}

export interface FomcDate {
  label: string;
  startDate: string;
  endDate: string;
  decisionDate: string;
  daysUntil: number;
}

export interface CongressTrade {
  politician: string;
  party: 'D' | 'R' | 'I';
  chamber: 'House' | 'Senate';
  ticker: string;
  company: string;
  transaction: string;
  amount: string;
  reportedDate: string;
  transactionDate: string;
  daysToReport: number;
  isWatchlist: boolean;
}

export interface DataSource {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  weight: 'high' | 'medium' | 'low';
  stubbed?: boolean;
}

export interface DashboardData {
  prices: StockQuote[];
  fearGreed: FearGreedData | null;
  earnings: EarningsEvent[];
  fomc: FomcDate[];
  congress: CongressTrade[];
  lastRefreshed: string | null;
}

export interface AnalysisRequest {
  fearGreed: FearGreedData | null;
  prices: StockQuote[];
  earnings: EarningsEvent[];
  fomc: FomcDate[];
  congress: CongressTrade[];
  sources: DataSource[];
}
