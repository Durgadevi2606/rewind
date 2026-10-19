import React, { useRef, useState } from 'react';
import { Character } from './Character.jsx';
import {
  MemoryFragment,
  PushablePedestal,
  PressureSwitch,
  VineGate,
  ExitPortal,
  RewindTrace
} from './GameTile.jsx';

export function GameBoard({
  level,
  state,
  onMove,
  isRewinding = false,
  highlightCrystal = null
}) {
  const [touchStart, setTouchStart] = useState(null);
  const boardRef = useRef(null);

  // Touch swipe gestures
  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length === 1) {
      setTouchStart({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      });
    }
  };

  const handleTouchEnd = (e) => {
    if (!touchStart || !e.changedTouches || e.changedTouches.length === 0) return;
    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    };

    const dx = touchEnd.x - touchStart.x;
    const dy = touchEnd.y - touchStart.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (Math.max(absDx, absDy) > 20) {
      if (absDx > absDy) {
        onMove(dx > 0 ? 'right' : 'left');
      } else {
        onMove(dy > 0 ? 'down' : 'up');
      }
    }
    setTouchStart(null);
  };

  const gridStyle = {
    gridTemplateColumns: `repeat(${level.width}, var(--tile-size))`,
    gridTemplateRows: `repeat(${level.height}, var(--tile-size))`
  };

  return (
    <div className="cc-board-outer" ref={boardRef}>
      {/* Candy Crush Board Chocolate Frame */}
      <div
        className="cc-board-frame"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Rewind shimmer effect */}
        {isRewinding && <div className="cc-rewind-sugar-flash" />}

        <div className="cc-grid" style={gridStyle}>
          {/* Grid Tiles */}
          {level.grid.map((rowStr, y) =>
            rowStr.split('').map((char, x) => {
              const isWall = char === '#';
              const isEven = (x + y) % 2 === 0;
              const key = `tile-${x}-${y}`;

              const sw = state.switches.find(s => s.x === x && s.y === y);
              const gate = state.gates.find(g => g.x === x && g.y === y);
              const isExit = level.exit && level.exit.x === x && level.exit.y === y;
              const fragment = state.collectibles.find(c => !c.collected && c.x === x && c.y === y);
              const pushable = state.pushables.find(b => b.x === x && b.y === y);
              const tracesAtTile = state.traces.filter(t => t.x === x && t.y === y);

              // Compass reveal highlight
              const isHighlighted = highlightCrystal && highlightCrystal.x === x && highlightCrystal.y === y;

              return (
                <div
                  key={key}
                  className={`cc-tile ${isWall ? 'cc-tile-chocolate-wall' : (isEven ? 'cc-tile-checker-a' : 'cc-tile-checker-b')}`}
                  data-x={x}
                  data-y={y}
                  style={isHighlighted ? {
                    boxShadow: '0 0 20px rgba(255, 230, 0, 0.9), inset 0 0 10px rgba(255, 255, 0, 0.5)',
                    animation: 'candyPulseHighlight 0.6s ease-in-out infinite alternate'
                  } : undefined}
                >
                  {/* Chocolate bar internal segments for walls */}
                  {isWall && (
                    <div className="cc-choco-segment" aria-hidden="true">
                      <div className="cc-choco-bevel" />
                    </div>
                  )}

                  {/* Sugar Dust Traces */}
                  {tracesAtTile.map(t => (
                    <RewindTrace key={t.id} />
                  ))}

                  {/* Switch */}
                  {sw && <PressureSwitch active={sw.active} />}

                  {/* Exit Portal: Rainbow Swirl Lollipop */}
                  {isExit && <ExitPortal active={state.portalOpen} />}

                  {/* Collectible Candies */}
                  {fragment && <MemoryFragment id={fragment.id} />}

                  {/* Gate: Peppermint Candy Cane Barrier */}
                  {gate && <VineGate open={gate.open} />}

                  {/* Pushable: Wrapped Candy */}
                  {pushable && <PushablePedestal />}
                </div>
              );
            })
          )}

          {/* Player Character */}
          <div
            className="character-entity"
            style={{
              transform: `translate(calc(${state.player.x} * var(--tile-size)), calc(${state.player.y} * var(--tile-size)))`
            }}
          >
            <Character facing={state.player.facing} />
          </div>
        </div>
      </div>
    </div>
  );
}
