'use client';

interface Props {
  analysis: string;
  loading: boolean;
  onAnalyze: () => void;
  hasData: boolean;
  error?: string;
}

export default function AIAnalysis({ analysis, loading, onAnalyze, hasData, error }: Props) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-muted uppercase tracking-wider">AI Analysis</h2>
          <p className="text-xs text-muted mt-0.5">Powered by Claude — uses all active data sources</p>
        </div>
        <button
          onClick={onAnalyze}
          disabled={loading || !hasData}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            loading
              ? 'bg-blue-800 text-blue-300 cursor-wait'
              : !hasData
              ? 'bg-surface text-muted cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-500 text-white'
          }`}
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>

      {error && (
        <div className="text-red-400 text-sm bg-red-900/20 border border-red-700/50 rounded-lg p-3 mb-3">
          {error}
        </div>
      )}

      {!analysis && !loading && !error && (
        <div className="text-muted text-sm py-8 text-center border border-dashed border-border rounded-lg">
          {hasData
            ? 'Click Analyze to get AI insights on your watchlist data'
            : 'Refresh data first, then run analysis'}
        </div>
      )}

      {(analysis || loading) && (
        <div className="prose prose-invert prose-sm max-w-none">
          <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-mono">
            {analysis}
            {loading && (
              <span className="inline-block w-2 h-4 bg-blue-400 ml-0.5 animate-pulse align-text-bottom" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
