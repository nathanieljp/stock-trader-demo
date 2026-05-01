'use client';

import { DataSource } from '@/lib/types';

interface Props {
  sources: DataSource[];
  onChange: (sources: DataSource[]) => void;
}

const WEIGHTS = ['high', 'medium', 'low'] as const;

export default function SourceConfig({ sources, onChange }: Props) {
  function toggle(id: string) {
    onChange(sources.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)));
  }

  function setWeight(id: string, weight: DataSource['weight']) {
    onChange(sources.map((s) => (s.id === id ? { ...s, weight } : s)));
  }

  const weightColor = (w: DataSource['weight'], active: boolean) => {
    if (!active) return 'text-muted';
    if (w === 'high') return 'text-green-400';
    if (w === 'medium') return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">
        Data Sources
      </h2>
      <div className="space-y-3">
        {sources.map((source) => (
          <div key={source.id} className="flex items-start gap-3">
            <button
              onClick={() => toggle(source.id)}
              className={`mt-0.5 w-9 h-5 rounded-full transition-colors flex-shrink-0 relative ${
                source.enabled ? 'bg-blue-600' : 'bg-border'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  source.enabled ? 'translate-x-4' : ''
                }`}
              />
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${source.enabled ? 'text-slate-200' : 'text-muted'}`}>
                  {source.label}
                </span>
                {source.stubbed && (
                  <span className="text-xs text-yellow-500 border border-yellow-700/50 px-1.5 py-0 rounded">
                    stub
                  </span>
                )}
              </div>
              <p className="text-xs text-muted mt-0.5">{source.description}</p>

              {source.enabled && (
                <div className="flex gap-1 mt-1.5">
                  {WEIGHTS.map((w) => (
                    <button
                      key={w}
                      onClick={() => setWeight(source.id, w)}
                      className={`text-xs px-2 py-0.5 rounded border transition-colors ${
                        source.weight === w
                          ? `border-current ${weightColor(w, true)} bg-current/10`
                          : 'border-border text-muted hover:text-slate-300'
                      } ${source.weight === w ? weightColor(w, true) : ''}`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
