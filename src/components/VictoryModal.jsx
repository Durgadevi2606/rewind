import React from 'react';
import { calculateStars } from '../game/gameState.js';

/**
 * Authentic Candy Crush Saga Victory Modal
 * - Iconic curved red ribbon header: "SUGAR CRUSH!" / "LEVEL COMPLETED!"
 * - 3 Giant 3D Golden Stars with celebratory bounce animations
 * - Big candy score tally and "SWEET!" badge
 * - Bouncy glossy green "PLAY AGAIN" Candy Crush button
 */
export function VictoryModal({
  level,
  state,
  onReplay
}) {
  const stars = calculateStars(level, state.moveCount, state.rewindBudget);
  const baseCandyScore = state.collectibles.length * 5000;
  const moveBonus = Math.max(0, (level.parMoves - state.moveCount) * 650);
  const rewindBonus = state.rewindBudget * 1200;
  const finalScore = baseCandyScore + moveBonus + rewindBonus;

  return (
    <div className="cc-modal-overlay">
      {/* Background Rotating Sunburst Rays */}
      <div className="cc-sunburst-rays" aria-hidden="true" />

      {/* Main Candy Crush Victory Card */}
      <div className="cc-victory-card">
        {/* Top Curved Red Ribbon Banner */}
        <div className="cc-victory-ribbon">
          <div className="cc-ribbon-tail left" />
          <div className="cc-ribbon-content">
            <span className="cc-ribbon-text">SUGAR CRUSH!</span>
          </div>
          <div className="cc-ribbon-tail right" />
        </div>

        {/* Victory Subtitle */}
        <div className="cc-victory-subtitle">
          STAGE COMPLETED!
        </div>

        {/* 3 Huge Golden 3D Stars with Podiums */}
        <div className="cc-victory-stars-row">
          {[1, 2, 3].map((starIndex) => {
            const earned = starIndex <= stars;
            return (
              <div
                key={`star-${starIndex}`}
                className={`cc-big-star-wrap ${earned ? 'earned' : 'empty'} star-${starIndex}`}
              >
                <div className="cc-big-star-podium" />
                <div className="cc-big-star-glyph">
                  {earned ? '★' : '☆'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Big Score Box */}
        <div className="cc-victory-score-box">
          <span className="cc-score-box-label">FINAL SCORE</span>
          <span className="cc-score-box-number">{finalScore.toLocaleString()}</span>
          <div className="cc-sweet-badge">SWEET!</div>
        </div>

        {/* Stats Summary Card */}
        <div className="cc-victory-stats-grid">
          <div className="cc-stat-tile">
            <span className="stat-label">MOVES</span>
            <span className="stat-value">{state.moveCount}</span>
            <span className="stat-target">Target: {level.parMoves}</span>
          </div>
          <div className="cc-stat-tile">
            <span className="stat-label">TIME CANDIES</span>
            <span className="stat-value" style={{ color: '#FF9800' }}>{state.rewindBudget}</span>
            <span className="stat-target">Saved</span>
          </div>
          <div className="cc-stat-tile">
            <span className="stat-label">RATING</span>
            <span className="stat-value" style={{ color: '#FFD700' }}>{stars} / 3</span>
            <span className="stat-target">Stars</span>
          </div>
        </div>

        {/* Candy Crush Green Play Again Button */}
        <div className="cc-victory-actions">
          <button
            className="cc-candy-btn cc-btn-green pulse-btn"
            onClick={onReplay}
            autoFocus
          >
            <span>PLAY AGAIN</span>
          </button>
        </div>
      </div>
    </div>
  );
}
