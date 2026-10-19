import React from 'react';
import { RedJellyBean, YellowLemonDrop } from './GameTile.jsx';

/**
 * Candy Crush Saga Title Screen
 * - Giant 3D Candy Crush logo with shiny glint
 * - Cute mascot illustration
 * - Giant bouncy glossy green "PLAY" button
 */
export function TitleScreen({
  onPlay,
  onHowToPlay,
  onSettings
}) {
  return (
    <div className="cc-title-screen">
      {/* Background Floating Candies */}
      <div className="cc-floating-candies" aria-hidden="true">
        <div className="floating-candy c1"><RedJellyBean /></div>
        <div className="floating-candy c2"><YellowLemonDrop /></div>
        <div className="floating-candy c3"><RedJellyBean /></div>
      </div>

      <div className="cc-title-card">
        {/* Giant 3D Logo */}
        <div className="cc-main-logo">
          <div className="cc-logo-bottom" style={{ fontSize: 'clamp(2.8rem, 9vw, 4.4rem)', letterSpacing: '0.04em' }}>
            REWIND
          </div>
        </div>

        {/* Mascot / Sweets Illustration */}
        <div className="cc-title-sweets-showcase">
          <div className="cc-sweet-item"><RedJellyBean /></div>
          <div className="cc-title-mascot-preview">
            <svg viewBox="0 0 64 64" width="80" height="80">
              <circle cx="32" cy="36" r="22" fill="#FFCBB2" stroke="#B36545" strokeWidth="1.5" />
              <circle cx="20" cy="42" r="5" fill="#FF477E" opacity="0.6" />
              <circle cx="44" cy="42" r="5" fill="#FF477E" opacity="0.6" />
              <ellipse cx="25" cy="34" rx="4.5" ry="5.5" fill="#2E1505" />
              <circle cx="27" cy="32" r="2" fill="#FFFFFF" />
              <ellipse cx="39" cy="34" rx="4.5" ry="5.5" fill="#2E1505" />
              <circle cx="41" cy="32" r="2" fill="#FFFFFF" />
              <path d="M28 44 Q32 48 36 44" stroke="#661D00" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              {/* Candy Hat */}
              <path d="M18 22 C18 12 24 8 32 8 C40 8 46 12 46 22 Z" fill="#D9043C" stroke="#690018" strokeWidth="1.5" />
              <ellipse cx="32" cy="22" rx="15" ry="3.5" fill="#FF7B99" />
              <circle cx="32" cy="7" r="4" fill="#FFFFFF" />
            </svg>
          </div>
          <div className="cc-sweet-item"><YellowLemonDrop /></div>
        </div>

        {/* Objective Preview */}
        <div className="cc-title-goal-tag">
          Target: Collect all Candies & Reach the Rainbow Lollipop Portal!
        </div>

        {/* Giant Green Candy Crush PLAY Button */}
        <div className="cc-title-actions">
          <button
            className="cc-candy-btn cc-btn-green cc-btn-large pulse-btn"
            onClick={onPlay}
            autoFocus
          >
            <span>PLAY</span>
          </button>
        </div>

        {/* Secondary Navigation */}
        <div className="cc-title-sub-links">
          <button className="cc-link-pill" onClick={onHowToPlay}>
            Rules & DSA Stack
          </button>
          <button className="cc-link-pill" onClick={onSettings}>
            Settings
          </button>
        </div>
      </div>
    </div>
  );
}
