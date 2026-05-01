import { NextResponse } from 'next/server';
import { WATCHLIST } from '@/lib/watchlist';
import { EarningsEvent } from '@/lib/types';

const DAYS_AHEAD = 90;
const BASE = 'https://finnhub.io/api/v1';

function toYMD(date: Date): string {
  return date.toISOString().split('T')[0];
}

export async function GET() {
  const key = process.env.FINNHUB_API_KEY;
  if (!key) {
    return NextResponse.json({ error: 'FINNHUB_API_KEY not set' }, { status: 500 });
  }

  const watchlistSymbols = new Set(
    WATCHLIST.filter((s) => s.type === 'equity' || s.type === 'adr').map((s) => s.symbol)
  );
  const nameMap = Object.fromEntries(WATCHLIST.map((s) => [s.symbol, s.name]));

  const now = new Date();
  const from = toYMD(now);
  const to = toYMD(new Date(now.getTime() + DAYS_AHEAD * 24 * 60 * 60 * 1000));

  const res = await fetch(`${BASE}/calendar/earnings?from=${from}&to=${to}&token=${key}`, {
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) {
    return NextResponse.json({ error: `Finnhub returned ${res.status}` }, { status: 502 });
  }

  const data = await res.json();
  const calendar: { symbol: string; date: string }[] = data?.earningsCalendar ?? [];

  const events: EarningsEvent[] = calendar
    .filter((e) => watchlistSymbols.has(e.symbol))
    .map((e) => {
      const date = new Date(e.date);
      const daysUntil = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return {
        symbol: e.symbol,
        name: nameMap[e.symbol] ?? e.symbol,
        earningsDate: e.date,
        daysUntil,
      };
    })
    .filter((e) => e.daysUntil >= 0)
    .sort((a, b) => a.daysUntil - b.daysUntil);

  return NextResponse.json(events);
}
