import React, { useState } from 'react';

export function HowToPlayModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('rules');

  // Mini-demo interactive state
  const [demoStep, setDemoStep] = useState(0);
  const demoStates = [
    { x: 1, y: 2, action: 'Starting position', hasFragment: true, stackSize: 0 },
    { x: 1, y: 1, action: 'Moved up — snapshot pushed!', hasFragment: true, stackSize: 1 },
    { x: 2, y: 1, action: 'Collected candy!', hasFragment: false, stackSize: 2 }
  ];

  const currentDemo = demoStates[demoStep];

  const handleDemoMove = () => {
    if (demoStep < demoStates.length - 1) {
      setDemoStep(demoStep + 1);
    }
  };

  const handleDemoRewind = () => {
    if (demoStep > 0) {
      setDemoStep(demoStep - 1);
    }
  };

  const tabStyle = (tab) => ({
    padding: '8px 16px',
    borderRadius: 'var(--radius-pill)',
    fontSize: '0.85rem',
    fontWeight: activeTab === tab ? 800 : 600,
    letterSpacing: '0.04em',
    textTransform: 'uppercase'
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog wide" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close Guide">
          ✕
        </button>

        <h2 className="heading-md" style={{ textTransform: 'uppercase', letterSpacing: '0.02em' }}>
          How to Play
        </h2>

        {/* Tab Selection */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1.5px solid rgba(255,107,157,0.12)', paddingBottom: '10px', flexWrap: 'wrap' }}>
          <button
            className={`btn ${activeTab === 'rules' ? 'btn-primary' : 'btn-secondary'}`}
            style={tabStyle('rules')}
            onClick={() => setActiveTab('rules')}
          >
            Game Rules
          </button>
          <button
            className={`btn ${activeTab === 'demo' ? 'btn-primary' : 'btn-secondary'}`}
            style={tabStyle('demo')}
            onClick={() => setActiveTab('demo')}
          >
            Mini Demo
          </button>
          <button
            className={`btn ${activeTab === 'stack' ? 'btn-primary' : 'btn-secondary'}`}
            style={tabStyle('stack')}
            onClick={() => setActiveTab('stack')}
          >
            The Stack (DSA)
          </button>
        </div>

        {/* Tab: Rules */}
        {activeTab === 'rules' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
            <div style={{
              background: 'rgba(255, 240, 245, 0.5)',
              padding: '14px 18px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid rgba(255, 107, 157, 0.1)'
            }}>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px', fontFamily: 'var(--font-display)' }}>
                1. Move & Collect Candies
              </div>
              <p style={{ margin: 0, lineHeight: 1.6 }}>
                Use <strong>W, A, S, D</strong> or <strong>arrow keys</strong> (swipe on mobile) to guide Twinkle around the board. Collect all glowing <strong>candies</strong> to activate the exit portal!
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 240, 245, 0.5)',
              padding: '14px 18px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid rgba(255, 107, 157, 0.1)'
            }}>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px', fontFamily: 'var(--font-display)' }}>
                2. Push & Activate
              </div>
              <p style={{ margin: 0, lineHeight: 1.6 }}>
                Push candy blocks by walking into them. Place blocks onto turquoise pressure pads to unlock candy gates!
              </p>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, rgba(184,169,232,0.12), rgba(184,169,232,0.05))',
              padding: '14px 18px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid rgba(184,169,232,0.2)'
            }}>
              <div style={{ fontWeight: 700, color: 'var(--color-lavender-deep)', marginBottom: '4px', fontFamily: 'var(--font-display)' }}>
                3. The Power of Rewind
              </div>
              <p style={{ margin: 0, lineHeight: 1.6 }}>
                Made a mistake? Press <strong>Z</strong>, <strong>Backspace</strong>, or tap the <strong>Rewind</strong> button to pop the previous state from the Stack and reverse your last move. Each rewind restores your past state!
              </p>
            </div>
          </div>
        )}

        {/* Tab: Mini Demo */}
        {activeTab === 'demo' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0, textAlign: 'center' }}>
              Try the push/pop cycle in this mini 3×3 board:
            </p>

            {/* Mini Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 50px)',
              gridTemplateRows: 'repeat(3, 50px)',
              gap: '3px',
              background: 'rgba(255, 240, 245, 0.5)',
              padding: '10px',
              borderRadius: 'var(--radius-md)',
              border: '2px solid rgba(255, 255, 255, 0.5)',
              boxShadow: 'var(--shadow-card)'
            }}>
              {[0, 1, 2].map(y =>
                [0, 1, 2].map(x => {
                  const isPlayer = currentDemo.x === x && currentDemo.y === y;
                  const isFrag = x === 2 && y === 1 && currentDemo.hasFragment;
                  return (
                    <div
                      key={`mini-${x}-${y}`}
                      style={{
                        background: 'linear-gradient(135deg, #FFF5FA, #FFF0F8)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                        border: '1px solid rgba(255, 180, 210, 0.2)',
                        boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.5)'
                      }}
                    >
                      {isPlayer && <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#FF477E' }} />}
                      {isFrag && <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#FFD700' }} />}
                    </div>
                  );
                })
              )}
            </div>

            {/* Demo Status */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.6)',
              padding: '10px 18px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.88rem',
              textAlign: 'center',
              width: '100%',
              boxSizing: 'border-box',
              border: '1.5px solid rgba(255, 255, 255, 0.4)'
            }}>
              <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{currentDemo.action}</span>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '2px' }}>
                Stack depth: {currentDemo.stackSize} • Position: ({currentDemo.x}, {currentDemo.y})
              </div>
            </div>

            {/* Demo Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn btn-primary"
                onClick={handleDemoMove}
                disabled={demoStep >= demoStates.length - 1}
                style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.04em', borderRadius: 'var(--radius-pill)' }}
              >
                Push Move →
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleDemoRewind}
                disabled={demoStep <= 0}
                style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.04em', borderRadius: 'var(--radius-pill)' }}
              >
                ← Pop Rewind
              </button>
            </div>
          </div>
        )}

        {/* Tab: Stack DSA */}
        {activeTab === 'stack' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <p style={{ margin: 0, lineHeight: 1.6 }}>
              The <strong>Stack</strong> is a fundamental data structure in Computer Science using{' '}
              <strong>Last-In, First-Out (LIFO)</strong> ordering:
            </p>
            <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <code style={{ color: 'var(--color-lavender-deep)', fontWeight: 700 }}>push(snapshot)</code>: saves the board state before each move in <strong>O(1)</strong> time.
              </li>
              <li>
                <code style={{ color: 'var(--color-lavender-deep)', fontWeight: 700 }}>pop()</code>: removes and returns the top snapshot in <strong>O(1)</strong> when Rewind is triggered.
              </li>
              <li>
                <code style={{ color: 'var(--color-lavender-deep)', fontWeight: 700 }}>peek()</code>: inspects the top snapshot without removal.
              </li>
              <li>
                <code style={{ color: 'var(--color-lavender-deep)', fontWeight: 700 }}>isEmpty()</code>: prevents rewinding past the first move.
              </li>
            </ul>
            <p style={{ margin: '4px 0 0', color: 'var(--color-pink-bright)', fontWeight: 600 }}>
              Tip: Tap the <strong>Stack DSA</strong> button during gameplay to inspect the real-time call stack!
            </p>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
          <button className="btn btn-secondary" onClick={onClose} style={{ textTransform: 'uppercase', letterSpacing: '0.04em', borderRadius: 'var(--radius-pill)' }}>
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}
