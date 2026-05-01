'use client';

import { CongressTrade } from '@/lib/types';

interface Props {
  trades: CongressTrade[];
  loading: boolean;
  stubbed: boolean;
}

function partyColor(party: string): string {
  if (party === 'D') return 'text-blue-400';
  if (party === 'R') return 'text-red-400';
  return 'text-muted';
}

function txColor(tx: string): string {
  if (tx.startsWith('Purchase')) return 'text-green-400';
  if (tx.startsWith('Sale')) return 'text-red-400';
  return 'text-muted';
}

export default function CongressTrades({ trades, loading, stubbed }: Props) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-muted uppercase tracking-wider">
          Congressional Trades
        </h2>
        {stubbed && (
          <span className="text-xs bg-yellow-900/40 text-yellow-400 border border-yellow-700/50 px-2 py-0.5 rounded-full">
            Stub data
          </span>
        )}
      </div>

      {loading && trades.length === 0 && (
        <div className="animate-pulse text-muted text-sm">Loading trades...</div>
      )}

      {!loading && trades.length === 0 && (
        <div className="text-muted text-sm">No trades available</div>
      )}

      <div className="space-y-2">
        {trades.map((trade, i) => (
          <div key={i} className="flex items-start gap-3 py-2 border-b border-border/50 last:border-0">
            <span className="text-base mt-0.5">🗳️</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-sm font-bold text-slate-100">{trade.ticker}</span>
                <span className={`text-xs font-semibold ${txColor(trade.transaction)}`}>
                  {trade.transaction}
                </span>
                <span className="text-xs text-muted">{trade.amount}</span>
              </div>
              <div className="text-xs text-muted mt-0.5">
                <span className={`font-medium ${partyColor(trade.party)}`}>
                  {trade.politician}
                </span>
                {' · '}
                {trade.chamber}
                {' · '}
                Reported {trade.reportedDate}
              </div>
            </div>
          </div>
        ))}
      </div>

      {stubbed && (
        <p className="text-xs text-muted mt-3 border-t border-border/50 pt-3">
          Connect QuiverQuant API to get real-time congressional trades within hours of disclosure.
        </p>
      )}
    </div>
  );
}
