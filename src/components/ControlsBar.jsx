import React from 'react';

/**
 * Candy Crush Saga Bottom Booster Rack & Controls
 * - Polished wooden booster shelf with golden studs
 * - Iconic round 3D candy booster buttons with count badges and clean vector SVGs (no emojis)
 * - Magic Time Candy (Rewind) primary booster
 * - Candy Recipe Book (Stack DSA Inspector)
 * - Restart circular orange candy button
 */
export function ControlsBar({
  state,
  onRewind,
  onRestart,
  onOpenArchive,
  onOpenInspector,
  disabled = false
}) {
  const canRewind = state.rewindBudget > 0 && !state.stack.isEmpty() && !disabled;
  const stackSize = state.stack.size();

  return (
    <div className="cc-booster-rack-container" role="region" aria-label="Candy Boosters">
      {/* Wooden Shelf Texture & Frame */}
      <div className="cc-booster-shelf">
        {/* 1. Stack Timeline Archive */}
        <button
          className="cc-booster-btn btn-archive"
          onClick={onOpenArchive}
          title="Past Moves Archive"
          aria-label="Open Candy Timeline"
        >
          <div className="cc-booster-icon-wrap bg-blue">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span className="cc-booster-badge">{stackSize}</span>
          </div>
          <span className="cc-booster-name">ARCHIVE</span>
        </button>

        {/* 2. PRIMARY: Magic Time Candy (Rewind Booster) */}
        <button
          className={`cc-booster-btn btn-time-rewind ${!canRewind ? 'is-disabled' : ''}`}
          onClick={onRewind}
          disabled={!canRewind}
          title="Magic Time Candy (Rewind 1 Move) - Press Z or Backspace"
          aria-label={`Rewind Move (${state.rewindBudget} Time Candies left)`}
        >
          <div className="cc-booster-icon-wrap bg-gold-purple pulse-on-ready">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 8 14" />
            </svg>
            <span className="cc-booster-badge badge-red">{state.rewindBudget}</span>
          </div>
          <span className="cc-booster-name highlight-gold">REWIND</span>
        </button>

        {/* 3. Stack DSA / Candy Recipe Inspector */}
        <button
          className="cc-booster-btn btn-inspector"
          onClick={onOpenInspector}
          title="Inspect LIFO Stack Data Structure"
          aria-label="Inspect Stack DSA"
        >
          <div className="cc-booster-icon-wrap bg-purple">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <span className="cc-booster-name">STACK DSA</span>
        </button>

        {/* 4. Restart Level Round Orange Candy Button */}
        <button
          className="cc-booster-btn btn-restart"
          onClick={onRestart}
          title="Restart Level (R)"
          aria-label="Restart Level"
        >
          <div className="cc-booster-icon-wrap bg-orange">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round">
              <path d="M1 4v6h6" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
          </div>
          <span className="cc-booster-name">RETRY</span>
        </button>
      </div>
    </div>
  );
}
