import React from 'react';

export function TimeArchivePanel({ stack, onClose }) {
  const frames = stack.toArray();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog wide" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close Time Archive">
          ✕
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h2 className="heading-md" style={{ textTransform: 'uppercase', letterSpacing: '0.02em' }}>
            Time Archive
          </h2>
          <span className="tos-badge">{frames.length} Snapshots</span>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: 1.6 }}>
          Every move is saved as an immutable snapshot on the Stack. When you rewind, the most recent snapshot is popped to restore the previous state!
        </p>

        {frames.length === 0 ? (
          <div style={{
            padding: '32px',
            textAlign: 'center',
            color: 'var(--text-muted)',
            background: 'rgba(255, 240, 245, 0.4)',
            borderRadius: 'var(--radius-md)',
            border: '1.5px dashed rgba(255, 107, 157, 0.2)'
          }}>
            No moves yet! Make your first step to start recording.
          </div>
        ) : (
          <div>
            <div className="timeline-track">
              {frames.map((frame, index) => {
                const isTop = index === frames.length - 1;
                const collectedCount = frame.collectibles.filter(c => c.collected).length;

                return (
                  <div
                    key={`archive-step-${index}`}
                    className={`timeline-step ${isTop ? 'active' : ''}`}
                    style={{ minWidth: '120px' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                        Step #{frame.moveCount}
                      </span>
                      {isTop && <span className="tos-badge" style={{ fontSize: '0.6rem' }}>TOP</span>}
                    </div>

                    <div style={{ fontSize: '0.8rem', color: 'var(--color-pink-bright)', textAlign: 'center', fontWeight: 600 }}>
                      {frame.actionDesc || frame.actionType}
                    </div>

                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      pos: ({frame.player.x}, {frame.player.y})
                    </div>

                    <div style={{ fontSize: '0.72rem', color: 'var(--color-lavender-deep)' }}>
                      crystals: {collectedCount}/{frame.collectibles.length}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '10px', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'right', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              ← Oldest (Bottom) • Newest (Top) →
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
          <button className="btn btn-secondary" onClick={onClose} style={{ textTransform: 'uppercase', letterSpacing: '0.04em', borderRadius: 'var(--radius-pill)' }}>
            Back to Game
          </button>
        </div>
      </div>
    </div>
  );
}
