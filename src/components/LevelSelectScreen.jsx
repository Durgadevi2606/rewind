import React, { useState } from 'react';
import { LEVELS } from '../game/levels.js';

export function LevelSelectScreen({
  unlockedLevels,
  levelScores,
  onSelectLevel,
  onBack
}) {
  // Waypoint spatial coordinates on the 900x480 candy map
  const waypoints = [
    { id: 1, x: 120, y: 380, labelY: 430, color: '#FF6B9D', emoji: '' },
    { id: 2, x: 280, y: 260, labelY: 210, color: '#B8A9E8', emoji: '' },
    { id: 3, x: 460, y: 340, labelY: 395, color: '#5CD9D4', emoji: '' },
    { id: 4, x: 640, y: 230, labelY: 180, color: '#FFB088', emoji: '' },
    { id: 5, x: 800, y: 120, labelY: 70, color: '#FFE066', emoji: '' }
  ];

  const maxUnlocked = Math.max(...unlockedLevels, 1);
  const [selectedLevelId, setSelectedLevelId] = useState(maxUnlocked);

  const selectedLevel = LEVELS.find(l => l.id === selectedLevelId) || LEVELS[0];
  const isSelectedUnlocked = unlockedLevels.includes(selectedLevelId);
  const selectedScore = levelScores[selectedLevelId];

  const totalStarsEarned = Object.values(levelScores).reduce((acc, s) => acc + (s.stars || 0), 0);
  const maxPossibleStars = LEVELS.length * 3;

  return (
    <div className="screen-container" style={{ padding: '16px 20px', maxWidth: '1080px' }}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <span className="title-subtitle">WORLD OVERVIEW</span>
            <h2 className="heading-lg" style={{ marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
              Crystal Kingdom Map
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Star Counter */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.7)',
              border: '2px solid rgba(255, 215, 0, 0.3)',
              borderRadius: 'var(--radius-pill)',
              padding: '6px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#F0B840',
              backdropFilter: 'blur(8px)',
              boxShadow: 'var(--shadow-subtle)'
            }}>
              <span>⭐</span>
              <span style={{ color: 'var(--text-primary)' }}>{totalStarsEarned} / {maxPossibleStars}</span>
            </div>

            <button className="btn btn-secondary" onClick={onBack} style={{ fontSize: '0.85rem', padding: '8px 16px', borderRadius: 'var(--radius-pill)' }}>
              ← Title Screen
            </button>
          </div>
        </div>

        {/* Candy World Map */}
        <div className="candy-map-canvas-container">
          <svg
            viewBox="0 0 900 480"
            width="100%"
            height="100%"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="candy-map-svg"
          >
            <defs>
              <linearGradient id="mapBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF0F5" />
                <stop offset="40%" stopColor="#F5E6FF" />
                <stop offset="70%" stopColor="#E8F4FD" />
                <stop offset="100%" stopColor="#FFF8F0" />
              </linearGradient>
              <linearGradient id="pathActive" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF6B9D" />
                <stop offset="50%" stopColor="#B8A9E8" />
                <stop offset="100%" stopColor="#5CD9D4" />
              </linearGradient>
            </defs>

            {/* Background */}
            <rect width="900" height="480" rx="20" fill="url(#mapBg)" />

            {/* Decorative landscape elements */}
            {/* Floating clouds */}
            <ellipse cx="150" cy="80" rx="50" ry="18" fill="white" opacity="0.5" />
            <ellipse cx="170" cy="72" rx="35" ry="14" fill="white" opacity="0.4" />
            <ellipse cx="600" cy="60" rx="60" ry="20" fill="white" opacity="0.4" />
            <ellipse cx="620" cy="52" rx="40" ry="15" fill="white" opacity="0.35" />
            <ellipse cx="400" cy="440" rx="45" ry="16" fill="white" opacity="0.3" />

            {/* Hills & landscape shapes */}
            <ellipse cx="80" cy="430" rx="100" ry="50" fill="#FFD6E8" opacity="0.3" />
            <ellipse cx="500" cy="450" rx="120" ry="40" fill="#D4CCF0" opacity="0.25" />
            <ellipse cx="850" cy="400" rx="80" ry="35" fill="#9FF0EC" opacity="0.2" />

            {/* Small decorative trees/crystals */}
            <polygon points="60,350 70,310 80,350" fill="#FFB3D1" opacity="0.4" />
            <polygon points="380,400 390,360 400,400" fill="#D4CCF0" opacity="0.3" />
            <polygon points="720,300 730,260 740,300" fill="#9FF0EC" opacity="0.35" />
            <polygon points="850,200 858,170 866,200" fill="#FFE066" opacity="0.3" />

            {/* Sparkle decorations */}
            <circle cx="200" cy="150" r="2" fill="#FF6B9D" opacity="0.4" />
            <circle cx="350" cy="100" r="1.5" fill="#B8A9E8" opacity="0.5" />
            <circle cx="550" cy="380" r="2" fill="#5CD9D4" opacity="0.4" />
            <circle cx="700" cy="150" r="1.8" fill="#FFE066" opacity="0.5" />
            <circle cx="250" cy="350" r="1.5" fill="#FFB088" opacity="0.4" />

            {/* Trail Segments */}
            <path
              d="M 120 380 C 170 380 220 290 280 260"
              stroke={unlockedLevels.includes(2) ? "url(#pathActive)" : "rgba(180, 160, 200, 0.25)"}
              strokeWidth="4"
              strokeDasharray={unlockedLevels.includes(2) ? "none" : "8 6"}
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 280 260 C 340 230 400 340 460 340"
              stroke={unlockedLevels.includes(3) ? "url(#pathActive)" : "rgba(180, 160, 200, 0.25)"}
              strokeWidth="4"
              strokeDasharray={unlockedLevels.includes(3) ? "none" : "8 6"}
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 460 340 C 520 330 580 240 640 230"
              stroke={unlockedLevels.includes(4) ? "url(#pathActive)" : "rgba(180, 160, 200, 0.25)"}
              strokeWidth="4"
              strokeDasharray={unlockedLevels.includes(4) ? "none" : "8 6"}
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 640 230 C 700 220 740 140 800 120"
              stroke={unlockedLevels.includes(5) ? "url(#pathActive)" : "rgba(180, 160, 200, 0.25)"}
              strokeWidth="4"
              strokeDasharray={unlockedLevels.includes(5) ? "none" : "8 6"}
              fill="none"
              strokeLinecap="round"
            />

            {/* Waypoint Nodes */}
            {waypoints.map(wp => {
              const isUnlocked = unlockedLevels.includes(wp.id);
              const score = levelScores[wp.id];
              const isCompleted = score && score.completed;
              const stars = score ? score.stars : 0;
              const isSelected = selectedLevelId === wp.id;

              return (
                <g
                  key={`map-wp-${wp.id}`}
                  className="map-node-group"
                  onClick={() => setSelectedLevelId(wp.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Selection glow */}
                  {isSelected && (
                    <circle
                      cx={wp.x}
                      cy={wp.y}
                      r="36"
                      stroke={wp.color}
                      strokeWidth="2.5"
                      strokeDasharray="5 3"
                      fill={`${wp.color}15`}
                    />
                  )}

                  {/* Node circle — glossy candy style */}
                  <circle
                    cx={wp.x}
                    cy={wp.y}
                    r="26"
                    fill={isUnlocked ? wp.color : '#E0D5E8'}
                    opacity={isUnlocked ? 1 : 0.5}
                  />
                  {/* Glossy highlight */}
                  <ellipse
                    cx={wp.x - 4}
                    cy={wp.y - 6}
                    rx="12"
                    ry="8"
                    fill="rgba(255,255,255,0.3)"
                  />
                  {/* Border */}
                  <circle
                    cx={wp.x}
                    cy={wp.y}
                    r="26"
                    fill="none"
                    stroke={isSelected ? 'white' : 'rgba(255,255,255,0.5)'}
                    strokeWidth={isSelected ? '3' : '2'}
                  />

                  {/* Number or Lock */}
                  {isUnlocked ? (
                    <text
                      x={wp.x}
                      y={wp.y + 6}
                      fill="white"
                      fontSize="16"
                      fontWeight="800"
                      textAnchor="middle"
                      style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}
                    >
                      {wp.id}
                    </text>
                  ) : (
                    <circle
                      cx={wp.x}
                      cy={wp.y}
                      r="6"
                      fill="rgba(0,0,0,0.3)"
                    />
                  )}

                  {/* Star badge */}
                  {isCompleted && (
                    <g transform={`translate(${wp.x - 18}, ${wp.y + 20})`}>
                      <rect width="36" height="16" rx="8" fill="white" stroke={wp.color} strokeWidth="1.5" />
                      <text x="18" y="12" fill="#F0B840" fontSize="10" fontWeight="800" textAnchor="middle">
                        {"★".repeat(stars)}
                      </text>
                    </g>
                  )}

                  {/* Label */}
                  <text
                    x={wp.x}
                    y={wp.labelY}
                    fill={isSelected ? wp.color : (isUnlocked ? 'var(--text-primary)' : '#B090A8')}
                    fontSize="12"
                    fontWeight="700"
                    letterSpacing="0.06em"
                    textAnchor="middle"
                  >
                    LEVEL {wp.id}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Level Card */}
        <div className="candy-dossier-card">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{
                background: 'linear-gradient(135deg, #FF6B9D, #B8A9E8)',
                color: 'white',
                padding: '2px 10px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.06em'
              }}>
                LEVEL {String(selectedLevel.id).padStart(2, '0')}
              </span>
              <span className="title-subtitle" style={{ fontSize: '0.72rem' }}>
                {selectedLevel.subtitle}
              </span>
              {selectedScore && selectedScore.completed && (
                <span style={{ color: '#F0B840', fontSize: '0.9rem' }}>
                  {"⭐".repeat(selectedScore.stars)}
                </span>
              )}
            </div>

            <h3 className="heading-md" style={{ textTransform: 'capitalize', margin: 0 }}>
              {selectedLevel.title}
            </h3>

            <p style={{
              margin: '2px 0 6px',
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
              maxWidth: '600px'
            }}>
              {selectedLevel.lore}
            </p>

            {/* Metrics */}
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '0.8rem' }}>
              <div>
                <span className="text-label">PAR: </span>
                <span className="text-value" style={{ fontSize: '0.88rem' }}>{selectedLevel.parMoves} moves</span>
              </div>
              <div>
                <span className="text-label">REWINDS: </span>
                <span className="text-value" style={{ fontSize: '0.88rem', color: 'var(--color-lavender-deep)' }}>{selectedLevel.rewindBudget}</span>
              </div>
              {selectedScore && selectedScore.bestMoves && (
                <div>
                  <span className="text-label">BEST: </span>
                  <span className="text-value" style={{ fontSize: '0.88rem', color: 'var(--color-pink-bright)' }}>
                    {selectedScore.bestMoves} moves
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div style={{ display: 'flex', alignItems: 'center', alignSelf: 'center' }}>
            {isSelectedUnlocked ? (
              <button
                className="btn btn-primary"
                onClick={() => onSelectLevel(selectedLevel.id)}
                style={{ padding: '14px 28px', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em', borderRadius: 'var(--radius-pill)', whiteSpace: 'nowrap' }}
              >
                Play Level →
              </button>
            ) : (
              <div style={{
                background: 'rgba(240, 220, 240, 0.6)',
                border: '2px solid rgba(180, 160, 200, 0.3)',
                borderRadius: 'var(--radius-pill)',
                padding: '12px 20px',
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                whiteSpace: 'nowrap'
              }}>
                Complete Level {selectedLevel.id - 1} First
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
