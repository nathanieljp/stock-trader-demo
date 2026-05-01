'use client';

import { EarningsEvent, FomcDate } from '@/lib/types';

interface Props {
  earnings: EarningsEvent[];
  fomc: FomcDate[];
  loadingEarnings: boolean;
  loadingFomc: boolean;
}

function urgencyClass(daysUntil: number): string {
  if (daysUntil <= 3) return 'text-red-400';
  if (daysUntil <= 7) return 'text-orange-400';
  if (daysUntil <= 14) return 'text-yellow-400';
  return 'text-muted';
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

type Event =
  | { type: 'earnings'; data: EarningsEvent }
  | { type: 'fomc'; data: FomcDate };

export default function UpcomingEvents({ earnings, fomc, loadingEarnings, loadingFomc }: Props) {
  const events: Event[] = [
    ...earnings.map((e): Event => ({ type: 'earnings', data: e })),
    ...fomc.map((f): Event => ({ type: 'fomc', data: f })),
  ].sort((a, b) => {
    const dA = a.type === 'earnings' ? a.data.daysUntil : a.data.daysUntil;
    const dB = b.type === 'earnings' ? b.data.daysUntil : b.data.daysUntil;
    return dA - dB;
  });

  const isLoading = loadingEarnings || loadingFomc;

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">
        Upcoming Events
      </h2>

      {isLoading && events.length === 0 && (
        <div className="animate-pulse text-muted text-sm">Loading events...</div>
      )}

      {!isLoading && events.length === 0 && (
        <div className="text-muted text-sm">No events in the next 90 days</div>
      )}

      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {events.map((event, i) => {
          if (event.type === 'fomc') {
            const f = event.data;
            return (
              <div key={`fomc-${i}`} className="flex items-center gap-3 py-1.5 border-b border-border/50 last:border-0">
                <span className="text-base">🏛️</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-200">FOMC Rate Decision</div>
                  <div className="text-xs text-muted">{formatDate(f.decisionDate)}</div>
                </div>
                <div className={`text-xs font-semibold tabular-nums ${urgencyClass(f.daysUntil)}`}>
                  {f.daysUntil === 0 ? 'Today' : `${f.daysUntil}d`}
                </div>
              </div>
            );
          }

          const e = event.data;
          return (
            <div key={`earn-${e.symbol}`} className="flex items-center gap-3 py-1.5 border-b border-border/50 last:border-0">
              <span className="text-base">📊</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-slate-100">{e.symbol}</span>
                  <span className="text-xs text-muted truncate">{e.name}</span>
                </div>
                <div className="text-xs text-muted">Earnings · {formatDate(e.earningsDate)}</div>
              </div>
              <div className={`text-xs font-semibold tabular-nums ${urgencyClass(e.daysUntil)}`}>
                {e.daysUntil === 0 ? 'Today' : `${e.daysUntil}d`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
