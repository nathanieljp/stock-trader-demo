import { NextResponse } from 'next/server';
import { CongressTrade } from '@/lib/types';

// STUBBED — replace with QuiverQuant API (https://api.quiverquant.com/beta/live/congresstrading)
// when you have an API key. They report disclosures within hours of filing.
const STUB_TRADES: CongressTrade[] = [
  {
    politician: 'Nancy Pelosi',
    party: 'D',
    chamber: 'House',
    ticker: 'NVDA',
    company: 'NVIDIA Corporation',
    transaction: 'Purchase',
    amount: '$1M – $5M',
    reportedDate: '2026-04-20',
    transactionDate: '2026-04-08',
    daysToReport: 12,
    isWatchlist: true,
  },
  {
    politician: 'Dan Crenshaw',
    party: 'R',
    chamber: 'House',
    ticker: 'AAPL',
    company: 'Apple Inc.',
    transaction: 'Sale (Full)',
    amount: '$100K – $250K',
    reportedDate: '2026-04-18',
    transactionDate: '2026-04-05',
    daysToReport: 13,
    isWatchlist: true,
  },
  {
    politician: 'Tommy Tuberville',
    party: 'R',
    chamber: 'Senate',
    ticker: 'AMZN',
    company: 'Amazon.com Inc.',
    transaction: 'Purchase',
    amount: '$50K – $100K',
    reportedDate: '2026-04-15',
    transactionDate: '2026-04-02',
    daysToReport: 13,
    isWatchlist: true,
  },
  {
    politician: 'Josh Gottheimer',
    party: 'D',
    chamber: 'House',
    ticker: 'TSM',
    company: 'Taiwan Semiconductor',
    transaction: 'Purchase',
    amount: '$250K – $500K',
    reportedDate: '2026-04-12',
    transactionDate: '2026-03-28',
    daysToReport: 15,
    isWatchlist: true,
  },
  {
    politician: 'Marjorie Taylor Greene',
    party: 'R',
    chamber: 'House',
    ticker: 'PLTR',
    company: 'Palantir Technologies',
    transaction: 'Purchase',
    amount: '$15K – $50K',
    reportedDate: '2026-04-10',
    transactionDate: '2026-03-25',
    daysToReport: 16,
    isWatchlist: true,
  },
];

export async function GET() {
  return NextResponse.json({ trades: STUB_TRADES, stubbed: true });
}
