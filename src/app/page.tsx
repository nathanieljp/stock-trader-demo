'use client';

import { useState, useCallback } from 'react';
import {
  StockQuote,
  FearGreedData,
  EarningsEvent,
  FomcDate,
  CongressTrade,
  DataSource,
} from '@/lib/types';
import { DEFAULT_SOURCES } from '@/lib/sources';
import FearGreedGauge from '@/components/FearGreedGauge';
import UpcomingEvents from '@/components/UpcomingEvents';
import WatchlistTable from '@/components/WatchlistTable';
import CongressTrades from '@/components/CongressTrades';
import AIAnalysis from '@/components/AIAnalysis';
import SourceConfig from '@/components/SourceConfig';

interface LoadingState {
  prices: boolean;
  fearGreed: boolean;
  earnings: boolean;
  fomc: boolean;
  congress: boolean;
}

interface ErrorState {
  fearGreed?: string;
  analyze?: string;
}

export default function Dashboard() {
  const [prices, setPrices] = useState<StockQuote[]>([]);
  const [fearGreed, setFearGreed] = useState<FearGreedData | null>(null);
  const [earnings, setEarnings] = useState<EarningsEvent[]>([]);
  const [fomc, setFomc] = useState<FomcDate[]>([]);
  const [congress, setCongress] = useState<CongressTrade[]>([]);
  const [congressStubbed, setCongressStubbed] = useState(false);
  const [analysis, setAnalysis] = useState('');
  const [sources, setSources] = useState<DataSource[]>(DEFAULT_SOURCES);
  const [loading, setLoading] = useState<LoadingState>({
    prices: false,
    fearGreed: false,
    earnings: false,
    fomc: false,
    congress: false,
  });
  const [analyzingLoading, setAnalyzingLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorState>({});
  const [lastRefreshed, setLastRefreshed] = useState<string | null>(null);
  const [showSources, setShowSources] = useState(false);

  const isEnabled = useCallback((id: string) => sources.find((s) => s.id === id)?.enabled, [sources]);

  const refreshAll = useCallback(async () => {
    const fetches: Promise<void>[] = [];

    if (isEnabled('prices')) {
      setLoading((l) => ({ ...l, prices: true }));
      fetches.push(
        fetch('/api/prices')
          .then(async (r) => {
            const data = await r.json();
            if (r.ok) setPrices(data as StockQuote[]);
          })
          .catch(() => {})
          .finally(() => setLoading((l) => ({ ...l, prices: false })))
      );
    }

    if (isEnabled('fear_greed')) {
      setLoading((l) => ({ ...l, fearGreed: true }));
      setErrors((e) => ({ ...e, fearGreed: undefined }));
      fetches.push(
        fetch('/api/fear-greed')
          .then(async (r) => {
            const data = await r.json();
            if (!r.ok) setErrors((e) => ({ ...e, fearGreed: data.error }));
            else setFearGreed(data as FearGreedData);
          })
          .catch(() => setErrors((e) => ({ ...e, fearGreed: 'Network error' })))
          .finally(() => setLoading((l) => ({ ...l, fearGreed: false })))
      );
    }

    if (isEnabled('earnings')) {
      setLoading((l) => ({ ...l, earnings: true }));
      fetches.push(
        fetch('/api/earnings')
          .then(async (r) => {
            const data = await r.json();
            if (r.ok) setEarnings(data as EarningsEvent[]);
          })
          .catch(() => {})
          .finally(() => setLoading((l) => ({ ...l, earnings: false })))
      );
    }

    if (isEnabled('fomc')) {
      setLoading((l) => ({ ...l, fomc: true }));
      fetches.push(
        fetch('/api/fomc')
          .then(async (r) => {
            const data = await r.json();
            if (r.ok) setFomc(data as FomcDate[]);
          })
          .catch(() => {})
          .finally(() => setLoading((l) => ({ ...l, fomc: false })))
      );
    }

    if (isEnabled('congress')) {
      setLoading((l) => ({ ...l, congress: true }));
      fetches.push(
        fetch('/api/congress')
          .then(async (r) => {
            const data = await r.json();
            if (r.ok) {
              setCongress((data as { trades: CongressTrade[]; stubbed: boolean }).trades);
              setCongressStubbed((data as { trades: CongressTrade[]; stubbed: boolean }).stubbed);
            }
          })
          .catch(() => {})
          .finally(() => setLoading((l) => ({ ...l, congress: false })))
      );
    }

    await Promise.allSettled(fetches);
    setLastRefreshed(new Date().toLocaleTimeString());
  }, [isEnabled]);

  const analyze = useCallback(async () => {
    setAnalyzingLoading(true);
    setAnalysis('');
    setErrors((e) => ({ ...e, analyze: undefined }));

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fearGreed, prices, earnings, fomc, congress, sources }),
      });

      if (!res.ok) {
        const text = await res.text();
        setErrors((e) => ({ ...e, analyze: text }));
        return;
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let text = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setAnalysis(text);
      }
    } catch {
      setErrors((e) => ({ ...e, analyze: 'Failed to reach the analyze endpoint' }));
    } finally {
      setAnalyzingLoading(false);
    }
  }, [fearGreed, prices, earnings, fomc, congress, sources]);

  const anyLoading = Object.values(loading).some(Boolean);
  const hasData = prices.length > 0 || fearGreed !== null || earnings.length > 0;

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Stock Tracker</h1>
          {lastRefreshed && (
            <p className="text-xs text-muted mt-0.5">Last refreshed: {lastRefreshed}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSources((v) => !v)}
            className="px-3 py-2 rounded-lg text-sm border border-border text-muted hover:text-slate-300 hover:border-slate-500 transition-colors"
          >
            {showSources ? 'Hide' : 'Sources'}
          </button>

          <button
            onClick={refreshAll}
            disabled={anyLoading}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
              anyLoading
                ? 'bg-slate-700 text-muted cursor-wait'
                : 'bg-green-600 hover:bg-green-500 text-white'
            }`}
          >
            {anyLoading ? 'Refreshing...' : 'Refresh All'}
          </button>
        </div>
      </div>

      {/* Source Config (collapsible) */}
      {showSources && (
        <SourceConfig sources={sources} onChange={setSources} />
      )}

      {/* Top Row: Fear & Greed + Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FearGreedGauge
          data={fearGreed}
          loading={loading.fearGreed}
          error={errors.fearGreed}
        />
        <UpcomingEvents
          earnings={earnings}
          fomc={fomc}
          loadingEarnings={loading.earnings}
          loadingFomc={loading.fomc}
        />
      </div>

      {/* Watchlist Table */}
      <WatchlistTable quotes={prices} loading={loading.prices} />

      {/* Bottom Row: Congressional Trades + AI Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <CongressTrades
          trades={congress}
          loading={loading.congress}
          stubbed={congressStubbed}
        />
        <AIAnalysis
          analysis={analysis}
          loading={analyzingLoading}
          onAnalyze={analyze}
          hasData={hasData}
          error={errors.analyze}
        />
      </div>
    </main>
  );
}
