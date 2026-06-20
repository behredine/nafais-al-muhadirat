import React from 'react';
import { Bookmark, BookmarkCheck, Sparkles } from 'lucide-react';

export default function ProgressView({ chapters, userProgress, onToggle }) {
  const completed = Object.values(userProgress).filter(Boolean).length;
  const pct = Math.round((completed / chapters.length) * 100);

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto space-y-6 animate-fade-in-up">
      {/* Header */}
      <div
        className="rounded-2xl p-6 border-ornament-gold"
        style={{ background: 'var(--bg-surface)' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} style={{ color: 'var(--gold-mid)' }} />
          <h3 className="font-cinzel text-lg font-bold" style={{ color: 'var(--gold-bright)' }}>
            Scholarly Milestones
          </h3>
        </div>
        <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>
          Review completion checklists across the entire digital curriculum of "Nafais al-Muhadirat."
        </p>

        {/* Progress bar */}
        <div className="flex items-center gap-4">
          <div
            className="flex-1 h-2 rounded-full overflow-hidden"
            style={{ background: 'var(--bg-overlay)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${pct}%`,
                background: 'linear-gradient(90deg, var(--gold-muted), var(--gold-bright))',
                boxShadow: '0 0 12px rgba(43,242,140,0.26)',
              }}
            />
          </div>
          <span className="font-mono-jet text-sm font-bold" style={{ color: 'var(--gold-mid)' }}>
            {pct}%
          </span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {completed} / {chapters.length}
          </span>
        </div>
      </div>

      {/* Chapter checklist */}
      <div className="space-y-2">
        {chapters.map((ch) => {
          const isDone = userProgress[ch.id];
          return (
            <div
              key={ch.id}
              className="flex items-center justify-between p-4 rounded-xl border-ornament transition-all hover:border-[var(--border-gold)]"
              style={{ background: 'var(--bg-deep)' }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="font-mono-jet text-[10px] shrink-0"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {String(ch.id).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h4
                    className="font-cinzel text-[11px] truncate"
                    style={{ color: isDone ? 'var(--gold-bright)' : 'var(--text-primary)' }}
                  >
                    {ch.title}
                  </h4>
                  <p
                    className="font-amiri text-[10px] truncate"
                    style={{ color: 'var(--text-muted)', direction: 'rtl' }}
                  >
                    {ch.arabicTitle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onToggle(ch.id)}
                className="p-2 rounded-lg transition-all ml-3 shrink-0"
                style={{
                  background: isDone ? 'rgba(43,242,140,0.12)' : 'var(--bg-overlay)',
                  color: isDone ? 'var(--gold-bright)' : 'var(--text-faint)',
                  border: `1px solid ${isDone ? 'var(--border-gold)' : 'var(--border-subtle)'}`,
                }}
              >
                {isDone ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom spacer */}
      <div className="h-20" />
    </div>
  );
}
