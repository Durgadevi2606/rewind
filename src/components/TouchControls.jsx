import React from 'react';

export function TouchControls({ onMove, visible = true }) {
  if (!visible) return null;

  return (
    <div className="touch-dpad-container" role="region" aria-label="On-Screen Movement Controls">
      <div className="dpad-row">
        <button
          className="dpad-btn"
          onClick={() => onMove('up')}
          aria-label="Move Up"
          title="Move Up"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-8 8h5v8h6v-8h5z"/></svg>
        </button>
      </div>
      <div className="dpad-row">
        <button
          className="dpad-btn"
          onClick={() => onMove('left')}
          aria-label="Move Left"
          title="Move Left"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4 12l8-8v5h8v6h-8v5z"/></svg>
        </button>
        <button
          className="dpad-btn"
          onClick={() => onMove('down')}
          aria-label="Move Down"
          title="Move Down"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 20l8-8h-5v-8h-6v8h-5z"/></svg>
        </button>
        <button
          className="dpad-btn"
          onClick={() => onMove('right')}
          aria-label="Move Right"
          title="Move Right"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 12l-8-8v5h-8v6h8v5z"/></svg>
        </button>
      </div>
    </div>
  );
}
