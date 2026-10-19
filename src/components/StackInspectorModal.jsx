import React, { useState } from 'react';

export function StackInspectorModal({ stack, currentState, onClose }) {
  const [selectedFrameIndex, setSelectedFrameIndex] = useState(null);

  const reversedFrames = stack.toReversedArray();
  const stackSize = stack.size();

  const selectedFrame = selectedFrameIndex !== null ? reversedFrames[selectedFrameIndex] : reversedFrames[0];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog wide" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close Inspector">
          ✕
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h2 className="heading-md" style={{ textTransform: 'uppercase', letterSpacing: '0.02em' }}>
            Stack Inspector
          </h2>
          <span className="tos-badge">LIFO</span>
        </div>

        {/* Educational Callout */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(184,169,232,0.12), rgba(92,217,212,0.08))',
          border: '1.5px solid rgba(184,169,232,0.25)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 18px',
          fontSize: '0.88rem',
          lineHeight: 1.6,
          color: 'var(--text-primary)'
        }}>
          <strong>Why Stack powers REWIND:</strong> A Stack uses{' '}
          <em>Last-In, First-Out (LIFO)</em> ordering. Before each move, a snapshot is
          pushed in <code style={{ color: 'var(--color-lavender-deep)', fontWeight: 700 }}>O(1)</code> time.
          When you rewind, the top snapshot is popped in{' '}
          <code style={{ color: 'var(--color-lavender-deep)', fontWeight: 700 }}>O(1)</code> to restore the board!
        </div>

        {/* Live Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '10px',
          background: 'rgba(255, 240, 245, 0.5)',
          padding: '14px',
          borderRadius: 'var(--radius-md)',
          border: '1.5px solid rgba(255, 107, 157, 0.12)'
        }}>
          <div>
            <div className="text-label">SIZE</div>
            <div className="text-value">{stackSize} frames</div>
          </div>
          <div>
            <div className="text-label">PUSH / POP</div>
            <div className="text-value" style={{ color: 'var(--color-turquoise)' }}>O(1)</div>
          </div>
          <div>
            <div className="text-label">TOS INDEX</div>
            <div className="text-value">#{Math.max(0, stackSize - 1)}</div>
          </div>
          <div>
            <div className="text-label">STATUS</div>
            <div className="text-value" style={{ color: stack.isEmpty() ? 'var(--color-pink-bright)' : 'var(--color-turquoise)' }}>
              {stack.isEmpty() ? 'Empty' : 'Active'}
            </div>
          </div>
        </div>

        {/* Stack Frames */}
        <div>
          <div className="text-label" style={{ color: 'var(--color-lavender-deep)', marginBottom: '8px' }}>
            CALL STACK (TOP → BASE)
          </div>

          {reversedFrames.length === 0 ? (
            <div style={{
              padding: '24px',
              textAlign: 'center',
              color: 'var(--text-muted)',
              background: 'rgba(255, 240, 245, 0.3)',
              borderRadius: 'var(--radius-md)',
              border: '1.5px dashed rgba(255, 107, 157, 0.15)'
            }}>
              Stack is empty. Make a move to push a snapshot!
            </div>
          ) : (
            <div className="stack-frames-list">
              {reversedFrames.map((frame, idx) => {
                const isTOS = idx === 0;
                const isSelected = selectedFrameIndex === idx || (selectedFrameIndex === null && isTOS);

                return (
                  <div
                    key={`frame-${frame.timestamp}-${idx}`}
                    className={`stack-frame-card ${isTOS ? 'top-of-stack' : ''}`}
                    onClick={() => setSelectedFrameIndex(idx)}
                    style={{
                      cursor: 'pointer',
                      borderColor: isSelected ? 'var(--color-lavender)' : undefined
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.8rem' }}>
                        [{stackSize - 1 - idx}]
                      </span>
                      <strong style={{ color: isTOS ? 'var(--color-lavender-deep)' : 'var(--color-pink-bright)', textTransform: 'uppercase', fontSize: '0.8rem' }}>
                        {frame.actionDesc}
                      </strong>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        Move #{frame.moveCount} • ({frame.player.x}, {frame.player.y})
                      </span>
                      {isTOS && <span className="tos-badge" style={{ fontSize: '0.6rem' }}>TOS</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Snapshot Payload */}
        {selectedFrame && (
          <div style={{
            background: 'rgba(255, 240, 245, 0.5)',
            border: '1.5px solid rgba(184, 169, 232, 0.2)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 16px'
          }}>
            <div className="text-label" style={{ marginBottom: '6px', color: 'var(--color-lavender-deep)' }}>
              SNAPSHOT PAYLOAD [Frame #{selectedFrame.moveCount}]
            </div>
            <pre style={{
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
              margin: 0,
              overflowX: 'auto',
              maxHeight: '120px',
              background: 'rgba(255, 255, 255, 0.4)',
              padding: '10px',
              borderRadius: 'var(--radius-sm)'
            }}>
              {JSON.stringify({
                player: selectedFrame.player,
                moveCount: selectedFrame.moveCount,
                portalOpen: selectedFrame.portalOpen,
                pushables: selectedFrame.pushables,
                collectiblesCount: selectedFrame.collectibles.length,
                action: selectedFrame.actionDesc
              }, null, 2)}
            </pre>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
          <button className="btn btn-secondary" onClick={onClose} style={{ textTransform: 'uppercase', letterSpacing: '0.04em', borderRadius: 'var(--radius-pill)' }}>
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
