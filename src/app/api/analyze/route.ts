import Anthropic from '@anthropic-ai/sdk';
import { AnalysisRequest, DataSource, StockQuote } from '@/lib/types';

const client = new Anthropic();

const SYSTEM_PROMPT = `You are a sharp, concise stock market analyst helping a retail investor spot opportunities and manage risk.
You have access to real-time market data, sentiment indicators, and event calendars for a specific watchlist.

The investor's core strategy: Buy when fear is high (Fear & Greed below 30), sell or reduce when greed is high (above 70).
They invest in growth tech, AI, semiconductors, clean energy, quantum computing, biotech, and aviation/robotics.

Your job: Be direct. Skip obvious disclaimers. Give a fast read of the market and 3–5 actionable observations.`;

function buildPrompt(req: AnalysisRequest): string {
  const { fearGreed, prices, earnings, fomc, congress, sources } = req;

  const enabledSources = sources.filter((s: DataSource) => s.enabled);
  const highWeight = enabledSources.filter((s: DataSource) => s.weight === 'high').map((s: DataSource) => s.label);

  const lines: string[] = [];

  lines.push(`## Active Data Sources`);
  lines.push(`High trust: ${highWeight.join(', ')}`);
  lines.push('');

  if (fearGreed) {
    lines.push(`## Market Sentiment: Fear & Greed Index`);
    lines.push(`Current: ${fearGreed.score}/100 — ${fearGreed.rating}`);
    lines.push(`Yesterday: ${fearGreed.previousClose} | Last week: ${fearGreed.previousWeek} | Last month: ${fearGreed.previousMonth}`);
    lines.push('');
  }

  if (prices.length > 0) {
    const valid = prices.filter((p: StockQuote) => p.changePercent !== null);
    const sorted = [...valid].sort((a: StockQuote, b: StockQuote) => (b.changePercent ?? 0) - (a.changePercent ?? 0));
    const topGainers = sorted.slice(0, 5);
    const topLosers = sorted.slice(-5).reverse();

    lines.push(`## Today's Top Movers (from ${valid.length} watchlist stocks)`);
    lines.push(`Gainers: ${topGainers.map((p: StockQuote) => `${p.symbol} ${p.changePercent! > 0 ? '+' : ''}${p.changePercent!.toFixed(1)}%`).join(', ')}`);
    lines.push(`Losers: ${topLosers.map((p: StockQuote) => `${p.symbol} ${p.changePercent!.toFixed(1)}%`).join(', ')}`);
    lines.push('');
  }

  if (earnings.length > 0) {
    lines.push(`## Upcoming Earnings (next 90 days)`);
    earnings.slice(0, 15).forEach((e) => {
      lines.push(`- ${e.symbol} (${e.name}): ${e.earningsDate} — in ${e.daysUntil} days`);
    });
    lines.push('');
  }

  if (fomc.length > 0) {
    const next = fomc[0];
    lines.push(`## Fed Calendar`);
    lines.push(`Next FOMC decision: ${next.decisionDate} — in ${next.daysUntil} days`);
    lines.push('');
  }

  if (congress.length > 0) {
    const watchlistTrades = congress.filter((t) => t.isWatchlist);
    if (watchlistTrades.length > 0) {
      lines.push(`## Congressional Trades (watchlist stocks)`);
      watchlistTrades.forEach((t) => {
        lines.push(`- ${t.politician} (${t.party}): ${t.transaction} ${t.ticker} ${t.amount} — reported ${t.reportedDate}`);
      });
      lines.push('');
    }
  }

  lines.push(`## Your Task`);
  lines.push(`Give me:`);
  lines.push(`1. A 2-sentence market read based on Fear & Greed trend and movers`);
  lines.push(`2. Top 3 opportunities worth acting on this week`);
  lines.push(`3. Top 2 risks to watch`);
  lines.push(`4. One thing to watch for the next FOMC meeting if applicable`);
  lines.push(`Be specific about tickers. Stay under 400 words total.`);

  return lines.join('\n');
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response('ANTHROPIC_API_KEY not set in .env.local', { status: 500 });
  }

  const body: AnalysisRequest = await request.json();

  const stream = client.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: [
      {
        type: 'text',
        text: SYSTEM_PROMPT,
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages: [{ role: 'user', content: buildPrompt(body) }],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          if (
            chunk.type === 'content_block_delta' &&
            chunk.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(chunk.delta.text));
          }
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
