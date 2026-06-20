import React from 'react';
import { X, CheckCircle, Compass } from 'lucide-react';

export default function Sidebar({ chapters, activeIndex, userProgress, onSelect, isOpen, onClose }) {
  return (
    <aside
      className={`
        flex flex-col
        bg-[var(--bg-surface)] border-r border-[var(--border-subtle)]
        transition-all duration-300 ease-in-out z-30
        ${isOpen ? 'w-80' : 'w-0 overflow-hidden'}
      `}
      style={{ flexShrink: 0 }}
    >
      {/* Sidebar Header */}
      <div className="px-5 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between bg-[var(--bg-deep)]">
        <div>
          <h3
            className="font-cinzel text-xs tracking-[0.2em] uppercase"
            style={{ color: 'var(--gold-mid)' }}
          >
            Kitab Directory
          </h3>
          <p className="text-[10px] mt-0.5 font-mono-jet" style={{ color: 'var(--text-muted)' }}>
            {chapters.length} Scholarly Chapters
          </p>
        </div>
        <button
          onClick={onClose}
          className="sm:hidden p-1.5 rounded-lg transition-colors hover:bg-[var(--bg-overlay)]"
          style={{ color: 'var(--text-muted)' }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Ornamental divider */}
      <div className="px-4 py-2">
        <div
          className="h-px w-full"
          style={{ background: 'linear-gradient(90deg, transparent, var(--border-gold), transparent)' }}
        />
      </div>

      {/* Chapter List */}
      <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-1.5">
        {chapters.map((ch, idx) => {
          const isActive = activeIndex === idx;
          const isDone = userProgress[ch.id];
          return (
            <button
              key={ch.id}
              onClick={() => onSelect(idx)}
              className={`
                chapter-card w-full text-left p-3.5 rounded-xl border
                ${isActive ? 'chapter-card-active' : 'border-[var(--border-subtle)]'}
              `}
            >
              <div className="flex items-start gap-3">
                {/* Number badge */}
                <span
                  className="font-mono-jet text-[10px] font-bold px-2 py-0.5 rounded shrink-0 mt-0.5"
                  style={{
                    background: isActive ? 'rgba(43,242,140,0.14)' : 'var(--bg-overlay)',
                    color: isActive ? 'var(--gold-bright)' : 'var(--text-muted)',
                    border: `1px solid ${isActive ? 'var(--border-gold)' : 'var(--border-subtle)'}`,
                  }}
                >
                  {String(ch.id).padStart(2, '0')}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <h4
                      className="text-[11px] font-semibold leading-tight truncate"
                      style={{ color: isActive ? 'var(--gold-bright)' : 'var(--text-primary)', fontFamily: "'Cinzel', serif" }}
                    >
                      {ch.title}
                    </h4>
                    {isDone && <CheckCircle size={10} style={{ color: 'var(--emerald-bright)', flexShrink: 0 }} />}
                  </div>
                  <p
                    className="text-[12px] font-amiri font-medium truncate"
                    style={{ color: 'var(--text-primary)', direction: 'rtl', lineHeight: '1.3' }}
                  >
                    {ch.arabicTitle}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer note */}
      <div
        className="m-3 p-3 rounded-xl border"
        style={{ background: 'var(--bg-deep)', borderColor: 'var(--border-subtle)' }}
      >
        <div className="flex items-center gap-1.5 mb-1.5">
          <Compass size={10} style={{ color: 'var(--gold-mid)' }} />
          <span
            className="font-cinzel text-[9px] tracking-widest uppercase"
            style={{ color: 'var(--gold-muted)' }}
          >
            Research Objective
          </span>
        </div>
        <p className="text-[10px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Deepen analytical interaction with textual Islamic assets through parallel structures and direct source translations.
        </p>
      </div>
    </aside>
  );
}
