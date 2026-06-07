import React from 'react';
import { GraduationCap, Award, BookOpenCheck } from 'lucide-react';

export default function AboutView() {
  const pillars = [
    { icon: <GraduationCap size={22} />, title: 'Scholarly Translation', desc: 'Authenticated renderings reviewed by qualified Islamic scholars.' },
    { icon: <Award size={22} />, title: 'Academic Consensus', desc: "Rooted in the classical Ash'ari and Maturidi theological traditions." },
    { icon: <BookOpenCheck size={22} />, title: 'Verified Curriculum', desc: 'Used in academic institutions across Ethiopia and beyond.' },
  ];

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto space-y-8 animate-fade-in-up">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, var(--border-gold))' }} />
          <span style={{ color: 'var(--gold-muted)', fontSize: '18px' }}>✦</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, var(--border-gold), transparent)' }} />
        </div>
        <h3
          className="font-cinzel text-2xl font-bold text-center mb-1"
          style={{ color: 'var(--gold-bright)' }}
        >
          Nafais al-Muhadirat
        </h3>
        <p className="font-amiri text-center text-lg" style={{ color: 'var(--text-muted)', direction: 'rtl' }}>
          نفائس المحاضرات
        </p>
      </div>

      {/* Historical overview card */}
      <div
        className="rounded-2xl p-7 space-y-4 border-ornament-gold"
        style={{ background: 'rgba(22,16,9,0.75)' }}
      >
        <h4 className="font-cinzel text-sm tracking-wider" style={{ color: 'var(--gold-mid)' }}>
          Historical Overview
        </h4>
        <p className="font-cormorant text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Welcome to the digital study deck of "Nafais al-Muhadirat" (The Exquisite Lectures). This classical theological work is meticulously organised to present the foundational parameters of academic sincerity, intellectual elevation, and the orthodox monotheistic creed (Aqidah) of Sunni Muslims, supported by both textual and rational proofs.
        </p>
        <p className="font-cormorant text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Supervised and reviewed by Ethiopian Muslim scholars, teachers, and university professors, this text serves as a robust shield against extremist interpretations and literalist deviations. It champions moderate, mainstream scholarship rooted in the methodologies of the Ash'ari and Maturidi theological schools, alongside the four classical Sunni schools of law: Hanafi, Maliki, Shafi'i, and Hanbali.
        </p>
      </div>

      {/* Pillars grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pillars.map(({ icon, title, desc }) => (
          <div
            key={title}
            className="p-5 rounded-2xl text-center border-ornament group transition-all hover:border-[var(--border-gold)]"
            style={{ background: 'var(--bg-deep)' }}
          >
            <div
              className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
              style={{
                background: 'rgba(200,160,60,0.1)',
                border: '1px solid var(--border-gold)',
                color: 'var(--gold-mid)',
              }}
            >
              {icon}
            </div>
            <h5 className="font-cinzel text-[11px] mb-1.5" style={{ color: 'var(--text-primary)' }}>
              {title}
            </h5>
            <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {desc}
            </p>
          </div>
        ))}
      </div>

      {/* Ornamental closing */}
      <div className="flex items-center gap-3 py-4">
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--border-subtle))' }} />
        <span className="font-amiri text-xl" style={{ color: 'var(--gold-muted)' }}>بسم الله الرحمن الرحيم</span>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, var(--border-subtle), transparent)' }} />
      </div>

      {/* Bottom spacer for audio player */}
      <div className="h-20" />
    </div>
  );
}
