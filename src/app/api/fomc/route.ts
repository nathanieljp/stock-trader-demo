import { NextResponse } from 'next/server';
import { FomcDate } from '@/lib/types';

// FOMC meeting dates through 2026 — update annually
const ALL_FOMC_DATES = [
  { label: 'FOMC Meeting', startDate: '2026-06-09', endDate: '2026-06-10', decisionDate: '2026-06-10' },
  { label: 'FOMC Meeting', startDate: '2026-07-28', endDate: '2026-07-29', decisionDate: '2026-07-29' },
  { label: 'FOMC Meeting', startDate: '2026-09-15', endDate: '2026-09-16', decisionDate: '2026-09-16' },
  { label: 'FOMC Meeting', startDate: '2026-10-27', endDate: '2026-10-28', decisionDate: '2026-10-28' },
  { label: 'FOMC Meeting', startDate: '2026-12-08', endDate: '2026-12-09', decisionDate: '2026-12-09' },
];

export async function GET() {
  const now = new Date();

  const upcoming: FomcDate[] = ALL_FOMC_DATES
    .map((m) => {
      const decision = new Date(m.decisionDate);
      const daysUntil = Math.ceil((decision.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return { ...m, daysUntil };
    })
    .filter((m) => m.daysUntil >= 0)
    .slice(0, 5);

  return NextResponse.json(upcoming);
}
