import React, { useState } from 'react';
import {
  Layout, FileText, Type, Bookmark, Share2, Video,
  ChevronLeft, ChevronRight, BookOpen
} from 'lucide-react';

export default function ReaderView({ chapter, chapterIndex, totalChapters, onPrev, onNext }) {
  const [layout, setLayout] = useState('split');
  const [fontSize, setFontSize] = useState(17);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="flex flex-col h-full">
      {/* Sub-header */}
      <div
        className="px-6 py-4 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0"
        style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface)' }}
      >
        <div>
          <span
            className="text-base font-amiri block mb-1 tracking-wide"
            style={{ color: 'var(--gold-mid)', direction: 'rtl', lineHeight: '1.25' }}
          >
            {chapter.arabicTitle}
          </span>
          <h2
            className="font-cinzel text-lg font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            {chapter.title}
          </h2>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            {chapter.description}
          </p>
        </div>

        {/* Controls row */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => document.getElementById('chapter-video')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-semibold transition-all hover:scale-105"
            style={{
              background: 'rgba(239,68,68,0.12)',
              color: '#ffffff',
              border: '1px solid rgba(239,68,68,0.25)',
              boxShadow: '0 0 12px rgba(239,68,68,0.08)',
            }}
          >
            <div className="flex items-center justify-center w-3 h-3 rounded-full" style={{ background: '#ef4444' }}>
              <div style={{ width: '0px', height: '0px', borderLeft: '2.5px solid transparent', borderRight: '0px solid transparent', borderTop: '1.5px solid white', marginLeft: '0.5px' }} />
            </div>
            Watch video
          </button>

          {/* Layout toggle */}
          <div
            className="flex p-1 rounded-lg gap-1"
            style={{ background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)' }}
          >
            {[
              { key: 'split', icon: <Layout size={11} />, label: 'Parallel' },
              { key: 'arabic', icon: <span className="font-amiri text-[10px]">عربى</span>, label: 'Arabic' },
              { key: 'english', icon: <FileText size={11} />, label: 'English' },
            ].map(({ key, icon, label }) => (
              <button
                key={key}
                onClick={() => setLayout(key)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded text-[10px] font-semibold transition-all"
                style={{
                  background: layout === key ? 'rgba(43,242,140,0.14)' : 'transparent',
                  color: layout === key ? 'var(--gold-bright)' : 'var(--text-muted)',
                  border: layout === key ? '1px solid var(--border-gold)' : '1px solid transparent',
                }}
              >
                {icon}
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>

          {/* Font size */}
          <div
            className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg"
            style={{ background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)' }}
          >
            <Type size={10} style={{ color: 'var(--text-muted)' }} />
            <button
              onClick={() => setFontSize(f => Math.max(13, f - 1))}
              className="w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center transition-colors"
              style={{ background: 'var(--bg-overlay)', color: 'var(--text-secondary)' }}
            >A-</button>
            <span className="font-mono-jet text-[10px] w-5 text-center" style={{ color: 'var(--text-muted)' }}>{fontSize}</span>
            <button
              onClick={() => setFontSize(f => Math.min(26, f + 1))}
              className="w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center transition-colors"
              style={{ background: 'var(--bg-overlay)', color: 'var(--text-secondary)' }}
            >A+</button>
          </div>
        </div>
      </div>

      {/* Main reading area */}
      <div className="flex-grow overflow-y-auto p-4 md:p-6">
        <div className={`flex gap-5 ${layout === 'split' ? 'flex-col lg:flex-row' : 'flex-col'}`}>

          {/* Arabic panel */}
          {(layout === 'split' || layout === 'arabic') && (
            <div
              className="rounded-2xl p-6 md:p-8 flex flex-col border-ornament-gold animate-fade-in-up lg:flex-1"
              style={{ background: 'var(--bg-raised)', position: 'relative' }}
            >
              <div
                className="absolute top-3 right-3 px-2.5 py-1 rounded-full font-mono-jet text-[9px] tracking-widest uppercase"
                style={{ background: 'var(--bg-deep)', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)' }}
              >
                Matn · النص الأصلي
              </div>

              {/* Ornamental top border */}
              <div className="flex items-center gap-2 mb-6 mt-4">
                <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--border-gold))' }} />
                <span style={{ color: 'var(--gold-muted)', fontSize: '16px' }}>✦</span>
                <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, var(--border-gold), transparent)' }} />
              </div>

              <p
                className="arabic-text leading-[2.5]"
                style={{ fontSize: `${fontSize + 5}px`, color: 'var(--text-primary)' }}
              >
                {chapter.arabicText}
              </p>

              <div
                className="flex justify-end gap-3 pt-4 mt-4"
                style={{ borderTop: '1px solid var(--border-subtle)' }}
              >
                <button
                  onClick={() => setBookmarked(b => !b)}
                  style={{ color: bookmarked ? 'var(--gold-bright)' : 'var(--text-faint)' }}
                  className="transition-colors hover:text-[var(--gold-mid)]"
                  data-tooltip="Bookmark"
                >
                  <Bookmark size={14} fill={bookmarked ? 'currentColor' : 'none'} />
                </button>
                <button style={{ color: 'var(--text-faint)' }} className="transition-colors hover:text-[var(--gold-mid)]" data-tooltip="Share">
                  <Share2 size={14} />
                </button>
              </div>
            </div>
          )}

          {/* English panel */}
          {(layout === 'split' || layout === 'english') && (
            <div
              className="rounded-2xl p-6 md:p-8 flex flex-col border-ornament animate-fade-in-up lg:flex-1"
              style={{ background: 'var(--bg-raised)', animationDelay: '0.1s' }}
            >
              <div
                className="absolute top-3 left-3 px-2.5 py-1 rounded-full font-mono-jet text-[9px] tracking-widest uppercase"
                style={{ background: 'var(--bg-deep)', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)', position: 'absolute' }}
              >
                Sharh & Translation
              </div>

              <div className="mt-8 space-y-5">
                {/* Literal translation */}
                <div
                  className="p-4 rounded-xl"
                  style={{ borderLeft: '2px solid var(--gold-mid)', paddingLeft: '16px', background: 'rgba(43,242,140,0.04)' }}
                >
                  <h5
                    className="font-cinzel text-[9px] uppercase tracking-[0.2em] mb-2"
                    style={{ color: 'var(--gold-mid)' }}
                  >
                    Literal English Translation
                  </h5>
                  <p
                    className="font-cormorant leading-relaxed"
                    style={{ fontSize: `${fontSize}px`, color: 'var(--text-secondary)' }}
                  >
                    {chapter.englishText}
                  </p>
                </div>

                {/* Commentary */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen size={11} style={{ color: 'var(--emerald-mid)' }} />
                    <h5
                      className="font-cinzel text-[9px] uppercase tracking-[0.2em]"
                      style={{ color: 'var(--emerald-mid)' }}
                    >
                      Scholarly Commentary
                    </h5>
                  </div>
                  <p
                    className="font-cormorant leading-[1.9]"
                    style={{ fontSize: `${fontSize - 1}px`, color: 'var(--text-muted)' }}
                  >
                    {chapter.commentary}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Video Section */}
        <div
          id="chapter-video"
          className="mt-6 rounded-2xl overflow-hidden border-ornament"
          style={{ background: 'var(--bg-surface)' }}
        >
          <div
            className="px-5 py-4 flex items-center gap-3 border-b"
            style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-deep)' }}
          >
            <div
              className="p-2 rounded-lg"
              style={{ background: 'rgba(43,242,140,0.10)', border: '1px solid var(--border-gold)' }}
            >
              <Video size={14} style={{ color: 'var(--gold-mid)' }} />
            </div>
            <div>
              <h4 className="font-cinzel text-xs" style={{ color: 'var(--text-primary)' }}>
                Visual Expository Companion
              </h4>
              <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                Chapter deep-dive & video lecture series
              </p>
            </div>
          </div>
          <div className="p-4">
            <div className="video-frame rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-subtle)' }}>
              <iframe
                src={`https://www.youtube.com/embed/${chapter.youtubeId}?modestbranding=1&rel=0`}
                title="Academic Video Exposition"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* Bottom padding for audio player */}
        <div className="h-24" />
      </div>

      {/* Chapter pagination pill */}
      <div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 rounded-full z-10"
        style={{
          background: 'rgba(0,0,0,0.9)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--border-gold)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        }}
      >
        <button
          onClick={onPrev}
          disabled={chapterIndex === 0}
          className="p-1.5 transition-colors disabled:opacity-25"
          style={{ color: 'var(--text-muted)' }}
        >
          <ChevronLeft size={15} />
        </button>
        <span className="font-mono-jet text-[10px]" style={{ color: 'var(--gold-muted)' }}>
          {String(chapterIndex + 1).padStart(2, '0')} / {String(totalChapters).padStart(2, '0')}
        </span>
        <button
          onClick={onNext}
          disabled={chapterIndex === totalChapters - 1}
          className="p-1.5 transition-colors disabled:opacity-25"
          style={{ color: 'var(--text-muted)' }}
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
