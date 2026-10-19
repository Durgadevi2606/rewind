import React, { useState } from 'react';

export function SettingsModal({
  settings,
  onUpdateSettings,
  onResetProgress,
  onClose
}) {
  const [confirmReset, setConfirmReset] = useState(false);

  const handleSoundToggle = () => {
    onUpdateSettings({ soundEnabled: !settings.soundEnabled });
  };

  const handleReducedMotionToggle = () => {
    onUpdateSettings({ reducedMotion: !settings.reducedMotion });
  };

  const handleTouchControlsChange = (val) => {
    onUpdateSettings({ showTouchControls: val });
  };

  const handleResetConfirm = () => {
    onResetProgress();
    setConfirmReset(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close Settings">
          ✕
        </button>

        <h2 className="heading-md" style={{ textTransform: 'uppercase', letterSpacing: '0.02em' }}>
          Settings
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Sound */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: '0.95rem' }}>Sound Effects</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Cheerful procedural audio
              </div>
            </div>
            <button
              className={`btn ${settings.soundEnabled ? 'btn-primary' : 'btn-secondary'}`}
              onClick={handleSoundToggle}
              style={{ minWidth: '72px', padding: '8px 14px', letterSpacing: '0.06em', textTransform: 'uppercase', borderRadius: 'var(--radius-pill)', fontSize: '0.85rem' }}
            >
              {settings.soundEnabled ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Reduced Motion */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: '0.95rem' }}>Reduced Motion</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Disable animations & transitions
              </div>
            </div>
            <button
              className={`btn ${settings.reducedMotion ? 'btn-primary' : 'btn-secondary'}`}
              onClick={handleReducedMotionToggle}
              style={{ minWidth: '72px', padding: '8px 14px', letterSpacing: '0.06em', textTransform: 'uppercase', borderRadius: 'var(--radius-pill)', fontSize: '0.85rem' }}
            >
              {settings.reducedMotion ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Touch D-Pad */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: '0.95rem' }}>Touch D-Pad</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                On-screen direction controls
              </div>
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              {['auto', 'always', 'never'].map(mode => (
                <button
                  key={mode}
                  className={`btn ${settings.showTouchControls === mode ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '6px 12px', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em', borderRadius: 'var(--radius-pill)' }}
                  onClick={() => handleTouchControlsChange(mode)}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div style={{
            background: 'rgba(255, 240, 245, 0.5)',
            padding: '14px 16px',
            borderRadius: 'var(--radius-md)',
            border: '1.5px solid rgba(255, 107, 157, 0.1)',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)'
          }}>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px', fontFamily: 'var(--font-display)' }}>
              Keyboard Shortcuts
            </div>
            <div>• Move: <strong>W, A, S, D</strong> or <strong>Arrow Keys</strong></div>
            <div>• Rewind: <strong>Z</strong> or <strong>Backspace</strong></div>
            <div>• Restart: <strong>R</strong></div>
          </div>

          {/* Reset Progress */}
          <div style={{
            borderTop: '1.5px solid rgba(255, 107, 157, 0.1)',
            paddingTop: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: '0.95rem' }}>Progress</div>
            {confirmReset ? (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-pink-bright)', fontWeight: 600 }}>Reset all progress?</span>
                <button
                  className="btn btn-primary"
                  onClick={handleResetConfirm}
                  style={{ padding: '6px 14px', fontSize: '0.82rem', textTransform: 'uppercase', borderRadius: 'var(--radius-pill)' }}
                >
                  Yes, Reset
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setConfirmReset(false)}
                  style={{ padding: '6px 14px', fontSize: '0.82rem', textTransform: 'uppercase', borderRadius: 'var(--radius-pill)' }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="btn btn-secondary"
                onClick={() => setConfirmReset(true)}
                style={{ alignSelf: 'flex-start', fontSize: '0.85rem', color: 'var(--color-pink-bright)', textTransform: 'uppercase', letterSpacing: '0.04em', borderRadius: 'var(--radius-pill)' }}
              >
                Reset Saved Progress
              </button>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
          <button className="btn btn-secondary" onClick={onClose} style={{ textTransform: 'uppercase', letterSpacing: '0.04em', borderRadius: 'var(--radius-pill)' }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
