import React from 'react';

/**
 * Candy Crush Saga HUD
 * - Signature giant circular "MOVES" medallion with 3D numbers
 * - Ornate golden liquid score tube with 3 interactive golden stars
 * - Candy target pill banner (with vector icons, no emojis)
 * - Glowing Time Candy (Rewind) orb meter
 */
export function HUD({ level, state }) {
  const totalCrystals = state.collectibles.length;
  const collectedCount = state.collectibles.filter(c => c.collected).length;

  // Candy Crush Score calculation
  const baseCandyScore = collectedCount * 5000;
  const moveBonus = Math.max(0, (level.parMoves - state.moveCount) * 650);
  const rewindBonus = state.rewindBudget * 1200;
  const currentScore = baseCandyScore + moveBonus + rewindBonus;

  // Calculate star thresholds (3 stars)
  const isStar1 = collectedCount >= 1;
  const isStar2 = collectedCount >= totalCrystals;
  const isStar3 = state.portalOpen && state.moveCount <= level.parMoves;

  let progressPercent = 15;
  if (isStar3) progressPercent = 100;
  else if (isStar2) progressPercent = 75;
  else if (isStar1) progressPercent = 45;

  // Moves remaining in level
  const movesRemaining = Math.max(0, level.parMoves - state.moveCount);

  return (
    <div className="cc-hud-container" role="region" aria-label="Candy Crush Status">
      {/* 1. Iconic Giant Candy Crush MOVES Medallion */}
      <div className="cc-moves-medallion" title={`Target par: ${level.parMoves} moves`}>
        <div className="cc-moves-inner">
          <span className="cc-moves-title">MOVES</span>
          <span className="cc-moves-number" style={{ color: movesRemaining <= 3 ? '#FF1E56' : '#FFFFFF' }}>
            {movesRemaining}
          </span>
        </div>
      </div>

      {/* 2. Center: Candy Crush Golden Star Meter & Score */}
      <div className="cc-center-hud">
        {/* Score Pill */}
        <div className="cc-score-pill">
          <span className="cc-score-label">SCORE</span>
          <span className="cc-score-value">{currentScore.toLocaleString()}</span>
        </div>

        {/* Golden Liquid Progress Bar with 3 Stars */}
        <div className="cc-star-meter-wrap">
          <div className="cc-star-meter-track">
            <div
              className="cc-star-meter-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* 3 Golden Stars pinned across the bar */}
          <div className="cc-meter-stars">
            {/* Star 1 */}
            <div className={`cc-meter-star ${isStar1 ? 'star-lit' : 'star-dim'}`} style={{ left: '33%' }}>
              ★
            </div>
            {/* Star 2 */}
            <div className={`cc-meter-star ${isStar2 ? 'star-lit' : 'star-dim'}`} style={{ left: '66%' }}>
              ★
            </div>
            {/* Star 3 */}
            <div className={`cc-meter-star ${isStar3 ? 'star-lit' : 'star-dim'}`} style={{ left: '98%' }}>
              ★
            </div>
          </div>
        </div>

        {/* Target Objective Sub-Banner */}
        <div className="cc-target-banner">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginRight: '2px', flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" fill="#FF2F66" />
            <path d="M7 12a5 5 0 0 1 5-5" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="cc-target-text">
            {state.portalOpen ? 'Sugar Portal Ready!' : `Collect ${totalCrystals - collectedCount} Candies`}
          </span>
          <span className="cc-target-badge">
            {collectedCount}/{totalCrystals}
          </span>
        </div>
      </div>

      {/* 3. Magic Time Candy (Rewind) Booster Pill */}
      <div className="cc-rewind-medallion" title={`Time Candy: ${state.rewindBudget} rewinds left`}>
        <div className="cc-rewind-swirl-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <div className="cc-rewind-info">
          <span className="cc-rewind-label">TIME CANDY</span>
          <span className="cc-rewind-count">{state.rewindBudget}</span>
        </div>
      </div>
    </div>
  );
}
