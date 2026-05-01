import { DataSource } from './types';

export const DEFAULT_SOURCES: DataSource[] = [
  {
    id: 'prices',
    label: 'Stock Prices',
    description: 'Live prices via Yahoo Finance',
    enabled: true,
    weight: 'high',
  },
  {
    id: 'fear_greed',
    label: 'Fear & Greed Index',
    description: 'CNN sentiment indicator. Buy at extreme fear, sell at extreme greed.',
    enabled: true,
    weight: 'high',
  },
  {
    id: 'earnings',
    label: 'Earnings Calendar',
    description: 'Upcoming earnings reports for watchlist companies',
    enabled: true,
    weight: 'medium',
  },
  {
    id: 'fomc',
    label: 'Fed Rate Calendar',
    description: 'FOMC meeting dates — rate changes move the whole market',
    enabled: true,
    weight: 'high',
  },
  {
    id: 'congress',
    label: 'Congressional Trades',
    description: 'Politician stock trades (STUBBED — QuiverQuant integration coming)',
    enabled: true,
    weight: 'medium',
    stubbed: true,
  },
];
