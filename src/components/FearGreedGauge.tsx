'use client';

import { FearGreedData } from '@/lib/types';

interface Props {
  data: FearGreedData | null;
  loading: boolean;
  error?: string;
}

function scoreToColor(score: number): string {
  if (score <= 25) return '#ef4444'; // red - extreme fear
  if (score <= 45) return '#f97316'; // orange - fear
  if (score <= 55) return '#eab308'; // yellow - neutral
  if (score <= 75) return '#84cc16'; // lime - greed
  return '#22c55e'; // green - extreme greed
}

function scoreToBgClass(score: number): string {
  if (score <= 25) return 'bg-red-900/30 border-red-700';
  if (score <= 45) return 'bg-orange-900/30 border-orange-700';
  if (score <= 55) return 'bg-yellow-900/30 border-yellow-700';
  if (score <= 75) return 'bg-lime-900/30 border-lime-700';
  return 'bg-green-900/30 border-green-700';
}

function buySignal(score: number): string {
  if (score <= 25) return 'Strong buy signal';
  if (score <= 45) return 'Moderate buy signal';
  if (score <= 55) return 'Neutral — wait';
  if (score <= 75) return 'Consider taking profits';
  return 'Strong sell signal';
}

function Gauge({ score }: { score: number }) {
  const pct = Math.min(100, Math.max(0, score));
  const angle = -90 + (pct / 100) * 180;
  const r = 70;
  const cx = 90;
  const cy = 90;

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  function arc(startDeg: number, endDeg: number, color: string) {
    const start = {
      x: cx + r * Math.cos(toRad(startDeg)),
      y: cy + r * Math.sin(toRad(startDeg)),
    };
    const end = {
      x: cx + r * Math.cos(toRad(endDeg)),
      y: cy + r * Math.sin(toRad(endDeg)),
    };
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return (
      <path
        key={color}
        d={`M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y}`}
        stroke={color}
        strokeWidth="12"
        fill="none"
        strokeLinecap="round"
      />
    );
  }

  const needleX = cx + (r - 8) * Math.cos(toRad(-90 + angle + 90));
  const needleY = cy + (r - 8) * Math.sin(toRad(-90 + angle + 90));

  return (
    <svg viewBox="0 0 180 100" className="w-full max-w-[220px]">
      {arc(-180, -144, '#ef4444')}
      {arc(-144, -108, '#f97316')}
      {arc(-108, -72, '#eab308')}
      {arc(-72, -36, '#84cc16')}
      {arc(-36, 0, '#22c55e')}
      <line
        x1={cx}
        y1={cy}
        x2={needleX}
        y2={needleY}
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r="4" fill="white" />
    </svg>
  );
}

export default function FearGreedGauge({ data, loading, error }: Props) {
  if (loading) {
    return (
      <div className="bg-card border border-border rounded-xl p-5 flex items-center justify-center h-48">
        <div className="animate-pulse text-muted text-sm">Loading Fear & Greed...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-card border border-border rounded-xl p-5 flex items-center justify-center h-48">
        <div className="text-red-400 text-sm text-center">
          {error ?? 'Fear & Greed unavailable'}
        </div>
      </div>
    );
  }

  const color = scoreToColor(data.score);
  const bgClass = scoreToBgClass(data.score);

  return (
    <div className={`border rounded-xl p-5 ${bgClass}`}>
      <div className="flex items-start justify-between mb-1">
        <h2 className="text-sm font-semibold text-muted uppercase tracking-wider">Fear & Greed</h2>
        <span className="text-xs text-muted">{buySignal(data.score)}</span>
      </div>

      <div className="flex flex-col items-center">
        <Gauge score={data.score} />
        <div className="text-4xl font-bold mt-1" style={{ color }}>
          {data.score}
        </div>
        <div className="text-base font-semibold mt-0.5" style={{ color }}>
          {data.rating}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-muted">
        <div>
          <div className="text-slate-300 font-medium">{data.previousClose}</div>
          <div>Yesterday</div>
        </div>
        <div>
          <div className="text-slate-300 font-medium">{data.previousWeek}</div>
          <div>1 Week</div>
        </div>
        <div>
          <div className="text-slate-300 font-medium">{data.previousMonth}</div>
          <div>1 Month</div>
        </div>
      </div>
    </div>
  );
}
