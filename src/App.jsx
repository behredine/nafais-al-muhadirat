import React, { useState, useMemo } from 'react';
import { Menu, MessageSquare } from 'lucide-react';

import { CHAPTERS_DATA } from './data/chapters';
import Sidebar from './components/Sidebar';
import ReaderView from './components/ReaderView';
import AboutView from './components/AboutView';
import ProgressView from './components/ProgressView';
import AudioPlayer from './components/AudioPlayer';
import TelegramModal from './components/TelegramModal';

export default function App() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [activeTab, setActiveTab]   = useState('reader');
  const [isSidebarOpen, setSidebar] = useState(true);
  const [isModalOpen, setModal]     = useState(false);

  const [userProgress, setUserProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('nafais_progress_v3');
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  const completionPct = useMemo(() => {
    const done = Object.values(userProgress).filter(Boolean).length;
    return Math.round((done / CHAPTERS_DATA.length) * 100);
  }, [userProgress]);

  const toggleProgress = (id) => {
    const next = { ...userProgress, [id]: !userProgress[id] };
    setUserProgress(next);
    try { localStorage.setItem('nafais_progress_v3', JSON.stringify(next)); } catch {}
  };

  const chapter = CHAPTERS_DATA[activeChapterIndex];

  const handleSelectChapter = (idx) => {
    setActiveChapterIndex(idx);
    setActiveTab('reader');
  };

  const tabs = [
    { key: 'reader',   label: 'Study Desk' },
    { key: 'about',    label: 'Introduction' },
    { key: 'progress', label: 'Milestones' },
  ];

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{ background: 'var(--bg-deep)', color: 'var(--text-primary)' }}
    >
      {/* ── Ambient background glows ─────────────────────────────────── */}
      <div
        className="pointer-events-none fixed top-0 left-1/4 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(180,130,40,0.05) 0%, transparent 65%)', filter: 'blur(40px)', zIndex: 0 }}
      />
      <div
        className="pointer-events-none fixed bottom-20 right-0 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(40,100,70,0.05) 0%, transparent 65%)', filter: 'blur(40px)', zIndex: 0 }}
      />

      {/* ── Header ───────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 px-4 md:px-6 py-3 flex items-center justify-between gap-3"
        style={{
          background: 'rgba(10,8,5,0.92)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        {/* Left: hamburger + title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebar(v => !v)}
            className="p-2 rounded-lg transition-colors"
            style={{ color: 'var(--gold-mid)' }}
            title="Toggle Chapter Navigation"
          >
            <Menu size={18} />
          </button>

          <div>
            <h1 className="flex items-center gap-2">
              <span
                className="font-amiri text-lg md:text-xl"
                style={{ color: 'var(--gold-bright)' }}
              >
                نفائس المحاضرات
              </span>
              <span
                className="hidden md:inline font-mono-jet text-[10px]"
                style={{ color: 'var(--text-muted)' }}
              >
                | Nafais al-Muhadirat
              </span>
            </h1>
          </div>
        </div>

        {/* Centre: tab nav (hidden on small) */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-xl"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}
        >
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-1.5 rounded-lg font-cinzel text-[11px] tracking-wide transition-all ${activeTab === key ? 'tab-active-bar' : ''}`}
              style={{
                background: activeTab === key ? 'rgba(200,160,60,0.12)' : 'transparent',
                color: activeTab === key ? 'var(--gold-bright)' : 'var(--text-muted)',
                border: activeTab === key ? '1px solid var(--border-gold)' : '1px solid transparent',
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Right: progress + support */}
        <div className="flex items-center gap-3">
          {/* Completion pill */}
          <div
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}
          >
            <div
              className="w-16 h-1.5 rounded-full overflow-hidden"
              style={{ background: 'var(--bg-overlay)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${completionPct}%`,
                  background: 'linear-gradient(90deg, var(--gold-muted), var(--gold-bright))',
                }}
              />
            </div>
            <span className="font-mono-jet text-[10px]" style={{ color: 'var(--gold-mid)' }}>
              {completionPct}%
            </span>
          </div>

          {/* Ask Al-Mujahid */}
          <button
            onClick={() => setModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-cinzel text-[10px] tracking-wide transition-all"
            style={{
              background: 'var(--bg-surface)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <MessageSquare size={12} style={{ color: 'var(--gold-mid)' }} />
            <span className="hidden md:inline">Ask Al-Mujahid</span>
          </button>
        </div>
      </header>

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden relative z-10">
        <Sidebar
          chapters={CHAPTERS_DATA}
          activeIndex={activeChapterIndex}
          userProgress={userProgress}
          onSelect={handleSelectChapter}
          isOpen={isSidebarOpen}
          onClose={() => setSidebar(false)}
        />

        <main className="flex-1 overflow-y-auto relative">
          {/* Mobile tab bar */}
          <div
            className="lg:hidden flex items-center gap-1 p-1 mx-4 my-3 rounded-xl"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}
          >
            {tabs.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className="flex-1 py-1.5 rounded-lg font-cinzel text-[10px] transition-all"
                style={{
                  background: activeTab === key ? 'rgba(200,160,60,0.12)' : 'transparent',
                  color: activeTab === key ? 'var(--gold-bright)' : 'var(--text-muted)',
                  border: activeTab === key ? '1px solid var(--border-gold)' : '1px solid transparent',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {activeTab === 'reader' && (
            <ReaderView
              chapter={chapter}
              chapterIndex={activeChapterIndex}
              totalChapters={CHAPTERS_DATA.length}
              onPrev={() => setActiveChapterIndex(i => Math.max(0, i - 1))}
              onNext={() => setActiveChapterIndex(i => Math.min(CHAPTERS_DATA.length - 1, i + 1))}
            />
          )}
          {activeTab === 'about'    && <AboutView />}
          {activeTab === 'progress' && (
            <ProgressView
              chapters={CHAPTERS_DATA}
              userProgress={userProgress}
              onToggle={toggleProgress}
            />
          )}
        </main>
      </div>

      {/* ── Audio Player ──────────────────────────────────────────────── */}
      <AudioPlayer chapter={chapter} />

      {/* ── Modal ────────────────────────────────────────────────────── */}
      {isModalOpen && <TelegramModal onClose={() => setModal(false)} />}
    </div>
  );
}
