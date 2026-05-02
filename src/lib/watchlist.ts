import { WatchlistStock } from './types';

export const WATCHLIST: WatchlistStock[] = [
  // AI & Machine Learning
  { symbol: 'PLTR', name: 'Palantir Technologies', sector: 'AI & Machine Learning', type: 'equity' },
  { symbol: 'CRWV', name: 'CoreWeave', sector: 'AI & Machine Learning', type: 'equity' },
  { symbol: 'NBIS', name: 'Nebius Group', sector: 'AI & Machine Learning', type: 'equity' },

  // Semiconductors
  { symbol: 'MRVL', name: 'Marvell Technology', sector: 'Semiconductors', type: 'equity' },
  { symbol: 'CRDO', name: 'Credo Technology', sector: 'Semiconductors', type: 'equity' },
  { symbol: 'ARM', name: 'Arm Holdings', sector: 'Semiconductors', type: 'equity' },
  { symbol: 'INTC', name: 'Intel', sector: 'Semiconductors', type: 'equity' },

  // Energy & Nuclear
  { symbol: 'OKLO', name: 'Oklo', sector: 'Energy & Nuclear', type: 'equity' },
  { symbol: 'GEV', name: 'GE Vernova', sector: 'Energy & Nuclear', type: 'equity' },
  { symbol: 'SMR', name: 'NuScale Power', sector: 'Energy & Nuclear', type: 'equity' },

  // Cloud & Infrastructure
  { symbol: 'ORCL', name: 'Oracle', sector: 'Cloud & Infrastructure', type: 'equity' },

  // Quantum Computing
  { symbol: 'IONQ', name: 'IonQ', sector: 'Quantum Computing', type: 'equity' },
  { symbol: 'XNDU', name: 'Xanadu Quantum Technologies', sector: 'Quantum Computing', type: 'equity' },
  { symbol: 'QBTS', name: 'D-Wave Quantum', sector: 'Quantum Computing', type: 'equity' },
  { symbol: 'RGTI', name: 'Rigetti Computing', sector: 'Quantum Computing', type: 'equity' },
];

export const SECTORS = [...new Set(WATCHLIST.map((s) => s.sector))];

export const EQUITY_TICKERS = WATCHLIST
  .filter((s) => s.type === 'equity' || s.type === 'adr')
  .map((s) => s.symbol);
