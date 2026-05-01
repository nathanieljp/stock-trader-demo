'use client';

import { useState, useMemo } from 'react';
import { StockQuote, StockSector } from '@/lib/types';
import { WATCHLIST, SECTORS } from '@/lib/watchlist';

interface Props {
  quotes: StockQuote[];
  loading: boolean;
}

function pctClass(pct: number | null): string {
  if (pct === null) return 'text-muted';
  if (pct > 0) return 'text-green-400';
  if (pct < 0) return 'text-red-400';
  return 'text-slate-400';
}

function fmt(n: number | null, decimals = 2, prefix = ''): string {
  if (n === null) return '—';
  return `${prefix}${n.toFixed(decimals)}`;
}

function fmtMarketCap(n: number | null): string {
  if (n === null) return '—';
  if (n >= 1e12) return `$${(n / 1e12).toFixed(1)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(0)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(0)}M`;
  return `$${n.toFixed(0)}`;
}

function RangeBar({ price, low, high }: { price: number | null; low: number | null; high: number | null }) {
  if (!price || !low || !high || high === low) return <div className="w-16 h-1 bg-border rounded" />;
  const pct = Math.min(100, Math.max(0, ((price - low) / (high - low)) * 100));
  return (
    <div className="w-16 h-1.5 bg-border rounded relative">
      <div
        className="absolute top-0 bottom-0 left-0 bg-slate-400 rounded"
        style={{ width: `${pct}%` }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full border border-slate-600"
        style={{ left: `calc(${pct}% - 3px)` }}
      />
    </div>
  );
}

type SortKey = 'symbol' | 'price' | 'changePercent';
type SortDir = 'asc' | 'desc';

export default function WatchlistTable({ quotes, loading }: Props) {
  const [sector, setSector] = useState<StockSector | 'All'>('All');
  const [sortKey, setSortKey] = useState<SortKey>('changePercent');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const quoteMap = useMemo(() => {
    const m = new Map<string, StockQuote>();
    quotes.forEach((q) => m.set(q.symbol, q));
    return m;
  }, [quotes]);

  const filtered = useMemo(() => {
    const stocks = sector === 'All'
      ? WATCHLIST
      : WATCHLIST.filter((s) => s.sector === sector);

    return stocks
      .map((s) => ({ stock: s, quote: quoteMap.get(s.symbol) }))
      .sort((a, b) => {
        let va: number, vb: number;
        if (sortKey === 'symbol') {
          return sortDir === 'asc'
            ? a.stock.symbol.localeCompare(b.stock.symbol)
            : b.stock.symbol.localeCompare(a.stock.symbol);
        }
        if (sortKey === 'price') {
          va = a.quote?.price ?? -Infinity;
          vb = b.quote?.price ?? -Infinity;
        } else {
          va = a.quote?.changePercent ?? -Infinity;
          vb = b.quote?.changePercent ?? -Infinity;
        }
        return sortDir === 'desc' ? vb - va : va - vb;
      });
  }, [sector, sortKey, sortDir, quoteMap]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  }

  function SortIcon({ k }: { k: SortKey }) {
    if (sortKey !== k) return <span className="text-border ml-0.5">↕</span>;
    return <span className="text-blue-400 ml-0.5">{sortDir === 'desc' ? '↓' : '↑'}</span>;
  }

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h2 className="text-sm font-semibold text-muted uppercase tracking-wider">
          Watchlist
          <span className="ml-2 text-slate-400 normal-case font-normal">
            ({filtered.length} stocks)
          </span>
        </h2>

        <div className="flex flex-wrap gap-1">
          {(['All', ...SECTORS] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSector(s as StockSector | 'All')}
              className={`px-2 py-0.5 rounded text-xs font-medium transition-colors ${
                sector === s
                  ? 'bg-blue-600 text-white'
                  : 'bg-surface text-muted hover:text-slate-300'
              }`}
            >
              {s === 'All' ? 'All' : s.replace(' & ', ' ')}
            </button>
          ))}
        </div>
      </div>

      {loading && quotes.length === 0 ? (
        <div className="animate-pulse text-muted text-sm py-8 text-center">
          Fetching {WATCHLIST.length} quotes...
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                <th
                  className="text-left pb-2 pr-4 cursor-pointer hover:text-slate-300 select-none"
                  onClick={() => toggleSort('symbol')}
                >
                  Ticker <SortIcon k="symbol" />
                </th>
                <th className="text-left pb-2 pr-4 hidden md:table-cell">Name</th>
                <th
                  className="text-right pb-2 pr-4 cursor-pointer hover:text-slate-300 select-none"
                  onClick={() => toggleSort('price')}
                >
                  Price <SortIcon k="price" />
                </th>
                <th
                  className="text-right pb-2 pr-4 cursor-pointer hover:text-slate-300 select-none"
                  onClick={() => toggleSort('changePercent')}
                >
                  Change <SortIcon k="changePercent" />
                </th>
                <th className="text-center pb-2 pr-4 hidden lg:table-cell">52W Range</th>
                <th className="text-right pb-2 hidden xl:table-cell">Mkt Cap</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(({ stock, quote }) => (
                <tr
                  key={stock.symbol}
                  className="border-b border-border/40 hover:bg-surface/60 transition-colors"
                >
                  <td className="py-2 pr-4 font-bold text-slate-100">{stock.symbol}</td>
                  <td className="py-2 pr-4 text-muted text-xs hidden md:table-cell truncate max-w-[160px]">
                    {stock.name}
                  </td>
                  <td className="py-2 pr-4 text-right tabular-nums text-slate-200">
                    {quote?.price !== null && quote?.price !== undefined
                      ? `$${quote.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      : '—'}
                  </td>
                  <td className={`py-2 pr-4 text-right tabular-nums font-medium ${pctClass(quote?.changePercent ?? null)}`}>
                    {quote?.changePercent !== null && quote?.changePercent !== undefined
                      ? `${quote.changePercent >= 0 ? '+' : ''}${quote.changePercent.toFixed(2)}%`
                      : quote?.error
                      ? <span className="text-xs text-border">N/A</span>
                      : '—'}
                  </td>
                  <td className="py-2 pr-4 hidden lg:table-cell">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-xs text-muted tabular-nums">{fmt(quote?.fiftyTwoWeekLow ?? null, 0, '$')}</span>
                      <RangeBar price={quote?.price ?? null} low={quote?.fiftyTwoWeekLow ?? null} high={quote?.fiftyTwoWeekHigh ?? null} />
                      <span className="text-xs text-muted tabular-nums">{fmt(quote?.fiftyTwoWeekHigh ?? null, 0, '$')}</span>
                    </div>
                  </td>
                  <td className="py-2 text-right text-xs text-muted hidden xl:table-cell">
                    {fmtMarketCap(quote?.marketCap ?? null)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
