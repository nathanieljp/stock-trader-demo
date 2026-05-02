import { NextResponse } from 'next/server';
import { WATCHLIST } from '@/lib/watchlist';
import { StockQuote } from '@/lib/types';

const BASE = 'https://finnhub.io/api/v1';

export async function GET() {
  const key = process.env.FINNHUB_API_KEY;
  if (!key) {
    return NextResponse.json({ error: 'FINNHUB_API_KEY not set' }, { status: 500 });
  }

  const stocks = WATCHLIST;

  const results = await Promise.allSettled(
    stocks.map(async (stock) => {
      const [quoteRes, metricRes] = await Promise.all([
        fetch(`${BASE}/quote?symbol=${stock.symbol}&token=${key}`, {
          signal: AbortSignal.timeout(8000),
        }),
        fetch(`${BASE}/stock/metric?symbol=${stock.symbol}&metric=all&token=${key}`, {
          signal: AbortSignal.timeout(8000),
        }),
      ]);

      const quote = quoteRes.ok ? await quoteRes.json() : null;
      const metric = metricRes.ok ? await metricRes.json() : null;

      return { stock, quote, metric: metric?.metric ?? null };
    })
  );

  const quotes: StockQuote[] = results.map((result, i) => {
    const stock = stocks[i];

    if (result.status === 'rejected' || !result.value.quote?.c) {
      return {
        symbol: stock.symbol,
        name: stock.name,
        price: null,
        change: null,
        changePercent: null,
        fiftyTwoWeekHigh: null,
        fiftyTwoWeekLow: null,
        marketCap: null,
        error: result.status === 'rejected' ? result.reason?.message : 'No data',
      };
    }

    const { quote, metric } = result.value;
    return {
      symbol: stock.symbol,
      name: stock.name,
      price: quote.c,
      change: quote.d,
      changePercent: quote.dp,
      fiftyTwoWeekHigh: metric?.['52WeekHigh'] ?? null,
      fiftyTwoWeekLow: metric?.['52WeekLow'] ?? null,
      marketCap: metric?.marketCapitalization
        ? metric.marketCapitalization * 1_000_000
        : null,
    };
  });

  return NextResponse.json(quotes);
}
