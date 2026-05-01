import { NextResponse } from 'next/server';
import { FearGreedData } from '@/lib/types';

export async function GET() {
  try {
    const res = await fetch('https://production.dataviz.cnn.io/index/fearandgreed/graphdata', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        Referer: 'https://www.cnn.com/markets/fear-and-greed',
      },
      next: { revalidate: 0 },
    });

    if (!res.ok) throw new Error(`CNN returned ${res.status}`);

    const json = await res.json();
    const fg = json.fear_and_greed;

    if (!fg || typeof fg.score !== 'number') {
      throw new Error('Unexpected response shape');
    }

    const data: FearGreedData = {
      score: Math.round(fg.score),
      rating: fg.rating ?? ratingFromScore(fg.score),
      previousClose: Math.round(fg.previous_close ?? fg.score),
      previousWeek: Math.round(fg.previous_1_week ?? fg.score),
      previousMonth: Math.round(fg.previous_1_month ?? fg.score),
      previousYear: Math.round(fg.previous_1_year ?? fg.score),
      timestamp: fg.timestamp ?? new Date().toISOString(),
    };

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to fetch Fear & Greed' },
      { status: 502 }
    );
  }
}

function ratingFromScore(score: number): string {
  if (score <= 25) return 'Extreme Fear';
  if (score <= 45) return 'Fear';
  if (score <= 55) return 'Neutral';
  if (score <= 75) return 'Greed';
  return 'Extreme Greed';
}
