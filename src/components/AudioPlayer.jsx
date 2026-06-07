import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, BookOpen } from 'lucide-react';

export default function AudioPlayer({ chapter }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      setIsPlaying(false);
      setProgress(0);
      setDuration(0);
    }
  }, [chapter]);

  const fmt = (s) => {
    if (isNaN(s)) return '00:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  };

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (e) => {
    if (audioRef.current && duration > 0) {
      const pct = parseFloat(e.target.value);
      audioRef.current.currentTime = (pct / 100) * duration;
      setProgress(pct);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={chapter.audioUrl}
        onTimeUpdate={() => {
          if (audioRef.current) {
            const cur = audioRef.current.currentTime;
            const dur = audioRef.current.duration || 0;
            setProgress((cur / dur) * 100 || 0);
          }
        }}
        onLoadedMetadata={() => audioRef.current && setDuration(audioRef.current.duration || 0)}
        onEnded={() => setIsPlaying(false)}
      />

      <div
        className="fixed bottom-0 left-0 right-0 z-40"
        style={{
          background: 'rgba(14,11,7,0.95)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--border-subtle)',
        }}
      >
        {/* Progress rail */}
        <div
          className="h-0.5 w-full"
          style={{ background: 'var(--bg-overlay)' }}
        >
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, var(--gold-muted), var(--gold-bright))',
            }}
          />
        </div>

        <div className="px-4 md:px-8 py-3 flex flex-col md:flex-row items-center gap-3 md:gap-6">
          {/* Track info */}
          <div className="flex items-center gap-3 w-full md:w-1/3 min-w-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: 'linear-gradient(135deg, var(--gold-muted), var(--gold-mid))',
              }}
            >
              <BookOpen size={16} style={{ color: 'var(--bg-deep)' }} />
            </div>
            <div className="min-w-0">
              <p
                className="text-[11px] font-cinzel truncate"
                style={{ color: 'var(--gold-bright)' }}
              >
                {chapter.title}
              </p>
              <p
                className="text-[10px] font-amiri truncate mt-0.5"
                style={{ color: 'var(--text-muted)', direction: 'rtl' }}
              >
                {chapter.arabicTitle}
              </p>
            </div>
          </div>

          {/* Scrubber */}
          <div className="flex items-center gap-3 w-full md:w-1/3">
            <span className="font-mono-jet text-[10px] shrink-0" style={{ color: 'var(--text-muted)' }}>
              {fmt(audioRef.current ? audioRef.current.currentTime : 0)}
            </span>
            <input
              type="range"
              min="0" max="100"
              value={progress}
              onChange={handleSeek}
              className="flex-grow"
              style={{ accentColor: 'var(--gold-mid)' }}
            />
            <span className="font-mono-jet text-[10px] shrink-0" style={{ color: 'var(--text-muted)' }}>
              {fmt(duration)}
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-end gap-4 w-full md:w-1/3">
            <button onClick={toggleMute} style={{ color: isMuted ? 'var(--text-faint)' : 'var(--text-muted)' }}
              className="transition-colors hover:text-[var(--gold-mid)]">
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            <button
              onClick={toggle}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95"
              style={{
                background: 'linear-gradient(135deg, var(--gold-muted), var(--gold-mid))',
                boxShadow: '0 0 20px rgba(200,160,60,0.25)',
              }}
            >
              {isPlaying
                ? <Pause size={14} fill="currentColor" style={{ color: 'var(--bg-deep)' }} />
                : <Play size={14} fill="currentColor" className="ml-0.5" style={{ color: 'var(--bg-deep)' }} />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
