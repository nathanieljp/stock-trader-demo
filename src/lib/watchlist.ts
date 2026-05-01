import { WatchlistStock } from './types';

export const WATCHLIST: WatchlistStock[] = [
  // AI & Machine Learning
  { symbol: 'NVDA', name: 'NVIDIA', sector: 'AI & Machine Learning', type: 'equity' },
  { symbol: 'AMD', name: 'Advanced Micro Devices', sector: 'AI & Machine Learning', type: 'equity' },
  { symbol: 'PLTR', name: 'Palantir Technologies', sector: 'AI & Machine Learning', type: 'equity' },
  { symbol: 'DDOG', name: 'Datadog', sector: 'AI & Machine Learning', type: 'equity' },
  { symbol: 'SOUN', name: 'SoundHound AI', sector: 'AI & Machine Learning', type: 'equity' },
  { symbol: 'TEM', name: 'Tempus AI', sector: 'AI & Machine Learning', type: 'equity' },
  { symbol: 'APP', name: 'AppLovin', sector: 'AI & Machine Learning', type: 'equity' },
  { symbol: 'NBIS', name: 'Nebius Group', sector: 'AI & Machine Learning', type: 'equity' },
  { symbol: 'META', name: 'Meta Platforms', sector: 'AI & Machine Learning', type: 'equity' },
  { symbol: 'MSFT', name: 'Microsoft', sector: 'AI & Machine Learning', type: 'equity' },
  { symbol: 'PATH', name: 'UiPath', sector: 'AI & Machine Learning', type: 'equity' },
  { symbol: 'GOOG', name: 'Alphabet', sector: 'AI & Machine Learning', type: 'equity' },
  { symbol: 'CRWV', name: 'CoreWeave', sector: 'AI & Machine Learning', type: 'equity' },

  // Semiconductors
  { symbol: 'AVGO', name: 'Broadcom', sector: 'Semiconductors', type: 'equity' },
  { symbol: 'ARM', name: 'Arm Holdings', sector: 'Semiconductors', type: 'equity' },
  { symbol: 'CRDO', name: 'Credo Technology', sector: 'Semiconductors', type: 'equity' },
  { symbol: 'MU', name: 'Micron Technology', sector: 'Semiconductors', type: 'equity' },
  { symbol: 'MRVL', name: 'Marvell Technology', sector: 'Semiconductors', type: 'equity' },
  { symbol: 'TSM', name: 'Taiwan Semiconductor', sector: 'Semiconductors', type: 'adr' },
  { symbol: 'ASML', name: 'ASML Holding', sector: 'Semiconductors', type: 'adr' },
  { symbol: 'LRCX', name: 'Lam Research', sector: 'Semiconductors', type: 'equity' },
  { symbol: 'SITM', name: 'SiTime Corporation', sector: 'Semiconductors', type: 'equity' },

  // Cloud & Cybersecurity
  { symbol: 'ANET', name: 'Arista Networks', sector: 'Cloud & Cybersecurity', type: 'equity' },
  { symbol: 'ORCL', name: 'Oracle', sector: 'Cloud & Cybersecurity', type: 'equity' },
  { symbol: 'CRM', name: 'Salesforce', sector: 'Cloud & Cybersecurity', type: 'equity' },
  { symbol: 'NET', name: 'Cloudflare', sector: 'Cloud & Cybersecurity', type: 'equity' },
  { symbol: 'ZS', name: 'Zscaler', sector: 'Cloud & Cybersecurity', type: 'equity' },
  { symbol: 'PANW', name: 'Palo Alto Networks', sector: 'Cloud & Cybersecurity', type: 'equity' },
  { symbol: 'CRWD', name: 'CrowdStrike', sector: 'Cloud & Cybersecurity', type: 'equity' },
  { symbol: 'AMZN', name: 'Amazon', sector: 'Cloud & Cybersecurity', type: 'equity' },

  // Energy & Nuclear
  { symbol: 'BE', name: 'Bloom Energy', sector: 'Energy & Nuclear', type: 'equity' },
  { symbol: 'CEG', name: 'Constellation Energy', sector: 'Energy & Nuclear', type: 'equity' },
  { symbol: 'GEV', name: 'GE Vernova', sector: 'Energy & Nuclear', type: 'equity' },
  { symbol: 'OKLO', name: 'Oklo', sector: 'Energy & Nuclear', type: 'equity' },
  { symbol: 'SMR', name: 'NuScale Power', sector: 'Energy & Nuclear', type: 'equity' },
  { symbol: 'NUE', name: 'Nucor', sector: 'Energy & Nuclear', type: 'equity' },
  { symbol: 'RYCEY', name: 'Rolls-Royce Holdings', sector: 'Energy & Nuclear', type: 'adr' },

  // Quantum Computing
  { symbol: 'XNDU', name: 'Xanadu Quantum Technologies', sector: 'Quantum Computing', type: 'equity' },
  { symbol: 'IONQ', name: 'IonQ', sector: 'Quantum Computing', type: 'equity' },
  { symbol: 'QBTS', name: 'D-Wave Quantum', sector: 'Quantum Computing', type: 'equity' },
  { symbol: 'RGTI', name: 'Rigetti Computing', sector: 'Quantum Computing', type: 'equity' },
  { symbol: 'QUBT', name: 'Quantum Computing Inc.', sector: 'Quantum Computing', type: 'equity' },

  // Aviation & Robotics
  { symbol: 'JOBY', name: 'Joby Aviation', sector: 'Aviation & Robotics', type: 'equity' },
  { symbol: 'ACHR', name: 'Archer Aviation', sector: 'Aviation & Robotics', type: 'equity' },
  { symbol: 'SERV', name: 'Serve Robotics', sector: 'Aviation & Robotics', type: 'equity' },
  { symbol: 'AVAV', name: 'AeroVironment', sector: 'Aviation & Robotics', type: 'equity' },
  { symbol: 'AXON', name: 'Axon Enterprise', sector: 'Aviation & Robotics', type: 'equity' },
  { symbol: 'VOYG', name: 'Voyager Technologies', sector: 'Aviation & Robotics', type: 'equity' },

  // Infrastructure
  { symbol: 'VRT', name: 'Vertiv Holdings', sector: 'Infrastructure', type: 'equity' },
  { symbol: 'CLS', name: 'Celestica', sector: 'Infrastructure', type: 'equity' },
  { symbol: 'FN', name: 'Fabrinet', sector: 'Infrastructure', type: 'equity' },
  { symbol: 'MTZ', name: 'MasTec', sector: 'Infrastructure', type: 'equity' },
  { symbol: 'PRIM', name: 'Primoris Services', sector: 'Infrastructure', type: 'equity' },

  // Fintech & Finance
  { symbol: 'SOFI', name: 'SoFi Technologies', sector: 'Fintech & Finance', type: 'equity' },
  { symbol: 'HOOD', name: 'Robinhood Markets', sector: 'Fintech & Finance', type: 'equity' },
  { symbol: 'UPST', name: 'Upstart Holdings', sector: 'Fintech & Finance', type: 'equity' },
  { symbol: 'COIN', name: 'Coinbase', sector: 'Fintech & Finance', type: 'equity' },
  { symbol: 'EXFY', name: 'Expensify', sector: 'Fintech & Finance', type: 'equity' },
  { symbol: 'RELY', name: 'Remitly Global', sector: 'Fintech & Finance', type: 'equity' },
  { symbol: 'BRK-B', name: 'Berkshire Hathaway', sector: 'Fintech & Finance', type: 'equity' },

  // Consumer & Retail
  { symbol: 'AAPL', name: 'Apple', sector: 'Consumer & Retail', type: 'equity' },
  { symbol: 'NFLX', name: 'Netflix', sector: 'Consumer & Retail', type: 'equity' },
  { symbol: 'UBER', name: 'Uber Technologies', sector: 'Consumer & Retail', type: 'equity' },
  { symbol: 'SHOP', name: 'Shopify', sector: 'Consumer & Retail', type: 'equity' },
  { symbol: 'ABNB', name: 'Airbnb', sector: 'Consumer & Retail', type: 'equity' },
  { symbol: 'NKE', name: 'Nike', sector: 'Consumer & Retail', type: 'equity' },
  { symbol: 'CI', name: 'Cigna Group', sector: 'Consumer & Retail', type: 'equity' },
  { symbol: 'CVS', name: 'CVS Health', sector: 'Consumer & Retail', type: 'equity' },
  { symbol: 'HIMS', name: 'Hims & Hers Health', sector: 'Consumer & Retail', type: 'equity' },
  { symbol: 'CHGG', name: 'Chegg', sector: 'Consumer & Retail', type: 'equity' },
  { symbol: 'SFTBY', name: 'SoftBank Group', sector: 'Consumer & Retail', type: 'adr' },
  { symbol: 'ARCH', name: 'Arch Resources', sector: 'Consumer & Retail', type: 'equity' },

  // Biotech & Health
  { symbol: 'CRSP', name: 'CRISPR Therapeutics', sector: 'Biotech & Health', type: 'equity' },
  { symbol: 'VRTX', name: 'Vertex Pharmaceuticals', sector: 'Biotech & Health', type: 'equity' },
  { symbol: 'RXRX', name: 'Recursion Pharmaceuticals', sector: 'Biotech & Health', type: 'equity' },
  { symbol: 'BIOA', name: 'BioAge Labs', sector: 'Biotech & Health', type: 'equity' },
  { symbol: 'OSCR', name: 'Oscar Health', sector: 'Biotech & Health', type: 'equity' },
  { symbol: 'EXAS', name: 'Exact Sciences', sector: 'Biotech & Health', type: 'equity' },
  { symbol: 'ME', name: '23andMe', sector: 'Biotech & Health', type: 'equity' },
  { symbol: 'DNA', name: 'Ginkgo Bioworks', sector: 'Biotech & Health', type: 'equity' },

  // Crypto & Digital Assets
  { symbol: 'ETH', name: 'Grayscale Ethereum Mini Trust', sector: 'Crypto & Digital Assets', type: 'crypto-etf' },
  { symbol: 'ETHZ', name: 'Forum Markets Ethereum ETF', sector: 'Crypto & Digital Assets', type: 'crypto-etf' },
  { symbol: 'IREN', name: 'IREN Ltd.', sector: 'Crypto & Digital Assets', type: 'equity' },

  // ETFs
  { symbol: 'ARKK', name: 'ARK Innovation ETF', sector: 'ETFs', type: 'etf' },
  { symbol: 'SPMO', name: 'Invesco S&P 500 Momentum ETF', sector: 'ETFs', type: 'etf' },
  { symbol: 'QQQ', name: 'Invesco QQQ Trust', sector: 'ETFs', type: 'etf' },
  { symbol: 'VTI', name: 'Vanguard Total Stock Market ETF', sector: 'ETFs', type: 'etf' },
  { symbol: 'VOO', name: 'Vanguard S&P 500 ETF', sector: 'ETFs', type: 'etf' },
  { symbol: 'VGT', name: 'Vanguard Info Technology ETF', sector: 'ETFs', type: 'etf' },
  { symbol: 'SMH', name: 'VanEck Semiconductor ETF', sector: 'ETFs', type: 'etf' },
  { symbol: 'CIBR', name: 'First Trust NASDAQ Cybersecurity ETF', sector: 'ETFs', type: 'etf' },
  { symbol: 'IETC', name: 'iShares U.S. Tech Independence ETF', sector: 'ETFs', type: 'etf' },
];

export const SECTORS = [...new Set(WATCHLIST.map((s) => s.sector))];

export const EQUITY_TICKERS = WATCHLIST
  .filter((s) => s.type === 'equity' || s.type === 'adr')
  .map((s) => s.symbol);
