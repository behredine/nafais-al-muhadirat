import React from 'react';
import { MessageSquare, X, ExternalLink } from 'lucide-react';

export default function TelegramModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
      style={{ background: 'rgba(0,0,0,0.8)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl overflow-hidden border-ornament-gold"
        style={{ background: 'var(--bg-surface)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal header */}
        <div
          className="px-5 py-4 flex items-center justify-between"
          style={{ background: 'var(--bg-deep)', borderBottom: '1px solid var(--border-subtle)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(200,160,60,0.1)', border: '1px solid var(--border-gold)', color: 'var(--gold-mid)' }}
            >
              <MessageSquare size={16} />
            </div>
            <div>
              <h4 className="font-cinzel text-sm" style={{ color: 'var(--text-primary)' }}>
                Al-Mujahid Bot Support
              </h4>
              <p className="text-[10px] font-mono-jet" style={{ color: 'var(--text-muted)' }}>
                Digital Library Gateway
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal body */}
        <div className="p-5 space-y-4">
          <div
            className="p-4 rounded-xl text-sm leading-relaxed relative"
            style={{ background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}
          >
            <div
              className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full"
              style={{ background: 'var(--emerald-bright)', boxShadow: '0 0 6px var(--emerald-bright)' }}
            />
            <p className="font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
              As-salamu alaykum,
            </p>
            <p>
              Our Telegram Support integration connects you with auxiliary reference documents, scholarly analytical PDFs, and direct support lines for translation verification of{' '}
              <strong style={{ color: 'var(--gold-bright)' }}>Nafais al-Muhadirat</strong>.
            </p>
          </div>

          <div className="space-y-2">
            <a
              href="https://t.me/TheMujahidSupportBot"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-cinzel text-xs transition-all active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, var(--gold-muted), var(--gold-mid))',
                color: 'var(--bg-deep)',
                boxShadow: '0 4px 20px rgba(200,160,60,0.2)',
              }}
            >
              <span>Connect with Bot Portal</span>
              <ExternalLink size={12} />
            </a>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl font-cinzel text-xs transition-all"
              style={{
                background: 'var(--bg-deep)',
                color: 'var(--text-muted)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              Return to Study Desk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
