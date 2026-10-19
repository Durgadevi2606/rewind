import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameBoard } from './GameBoard.jsx';
import { HUD } from './HUD.jsx';
import { ControlsBar } from './ControlsBar.jsx';
import { TouchControls } from './TouchControls.jsx';
import { TimeArchivePanel } from './TimeArchivePanel.jsx';
import { StackInspectorModal } from './StackInspectorModal.jsx';
import { VictoryModal } from './VictoryModal.jsx';
import { initGameState, executeMove, executeRewind, createSnapshot } from '../game/gameState.js';
import { sound } from '../audio/soundEngine.js';

export function GameScreen({
  level,
  hasNextLevel = false,
  showTouchControlsSetting = 'auto',
  onVictory,
  onNextLevel,
  onLevelSelect
}) {
  const [gameState, setGameState] = useState(() => initGameState(level));
  const [isRewinding, setIsRewinding] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [showInspector, setShowInspector] = useState(false);
  const [showVictory, setShowVictory] = useState(false);

  // Candy Crush Announcement Popup (SWEET!, TASTY!, DELICIOUS!, SUGAR CRUSH!)
  const [announcement, setAnnouncement] = useState(null);

  // Power-up state: Candy Crush boosters
  const [powerUps, setPowerUps] = useState({
    extraRewind: 2,    // +2 Time Candies
    crystalReveal: 2,  // Sweet Compass
    skipMove: 1        // Sugar Teleport (2 tiles)
  });
  const [crystalRevealActive, setCrystalRevealActive] = useState(false);

  // Lock input during transitions
  const isTransitioningRef = useRef(false);

  const showCandyPopup = useCallback((text) => {
    setAnnouncement(text);
    setTimeout(() => {
      setAnnouncement(null);
    }, 1200);
  }, []);

  // Initialize fresh level
  useEffect(() => {
    setGameState(initGameState(level));
    setShowVictory(false);
    setShowArchive(false);
    setShowInspector(false);
    setPowerUps({ extraRewind: 2, crystalReveal: 2, skipMove: 1 });
    setCrystalRevealActive(false);
    setAnnouncement(null);
  }, [level]);

  // Restart
  const handleRestart = useCallback(() => {
    setGameState(initGameState(level));
    setShowVictory(false);
    setPowerUps({ extraRewind: 2, crystalReveal: 2, skipMove: 1 });
    setCrystalRevealActive(false);
    setAnnouncement(null);
    sound.playBump();
  }, [level]);

  // Execute Player Movement
  const handleMove = useCallback((direction) => {
    if (isTransitioningRef.current || gameState.isWon) return;

    const result = executeMove(gameState, level, direction);
    if (!result.success) {
      sound.playBump();
      return;
    }

    setGameState(result.state);

    if (result.pushedBlock) {
      sound.playPush();
      showCandyPopup('TASTY!');
    } else if (result.collectedSomething) {
      sound.playCollect();
      const phrases = ['SWEET!', 'DELICIOUS!', 'TASTY!', 'YUMMY!'];
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      showCandyPopup(randomPhrase);
    } else {
      sound.playStep();
    }

    if (result.isWon) {
      sound.playWin();
      showCandyPopup('SUGAR CRUSH!');
      setTimeout(() => {
        setShowVictory(true);
        if (onVictory) {
          onVictory(level.id, result.state.moveCount, result.state.rewindBudget);
        }
      }, 700);
    }
  }, [gameState, level, onVictory, showCandyPopup]);

  // Execute Rewind (Magic Time Candy)
  const handleRewind = useCallback(() => {
    if (isTransitioningRef.current || gameState.rewindBudget <= 0 || gameState.stack.isEmpty()) {
      sound.playBump();
      return;
    }

    isTransitioningRef.current = true;
    setIsRewinding(true);
    sound.playRewind();
    showCandyPopup('REWIND!');

    const result = executeRewind(gameState);
    if (result.success) {
      setGameState(result.state);
    }

    setTimeout(() => {
      setIsRewinding(false);
      isTransitioningRef.current = false;
    }, 300);
  }, [gameState, showCandyPopup]);

  // Power-Up: Extra Time Candy Booster
  const handleExtraRewind = useCallback(() => {
    if (powerUps.extraRewind <= 0) return;
    setGameState(prev => ({
      ...prev,
      rewindBudget: prev.rewindBudget + 2
    }));
    setPowerUps(prev => ({ ...prev, extraRewind: prev.extraRewind - 1 }));
    sound.playCollect();
    showCandyPopup('+2 REWINDS!');
  }, [powerUps.extraRewind, showCandyPopup]);

  // Power-Up: Sweet Compass
  const handleCrystalReveal = useCallback(() => {
    if (powerUps.crystalReveal <= 0 || crystalRevealActive) return;
    setPowerUps(prev => ({ ...prev, crystalReveal: prev.crystalReveal - 1 }));
    setCrystalRevealActive(true);
    sound.playCollect();
    showCandyPopup('COMPASS!');
    setTimeout(() => setCrystalRevealActive(false), 2500);
  }, [powerUps.crystalReveal, crystalRevealActive, showCandyPopup]);

  // Power-Up: Sugar Teleport (+2 steps forward)
  const handleSkipMove = useCallback(() => {
    if (powerUps.skipMove <= 0 || isTransitioningRef.current || gameState.isWon) return;

    const { player } = gameState;
    const dirMap = { up: { dx: 0, dy: -1 }, down: { dx: 0, dy: 1 }, left: { dx: -1, dy: 0 }, right: { dx: 1, dy: 0 } };
    const dir = dirMap[player.facing];
    if (!dir) return;

    const destX = player.x + dir.dx * 2;
    const destY = player.y + dir.dy * 2;

    if (destX < 0 || destX >= level.width || destY < 0 || destY >= level.height) {
      sound.playBump();
      return;
    }

    const midRow = level.grid[player.y + dir.dy];
    const destRow = level.grid[destY];
    if (!midRow || midRow[player.x + dir.dx] === '#' || !destRow || destRow[destX] === '#') {
      sound.playBump();
      return;
    }

    const isBlockedByPushable = (x, y) => gameState.pushables.some(b => b.x === x && b.y === y);
    const isBlockedByGate = (x, y) => gameState.gates.some(g => g.x === x && g.y === y && !g.open);

    if (isBlockedByPushable(destX, destY) || isBlockedByGate(destX, destY)) {
      sound.playBump();
      return;
    }

    const snapshot = createSnapshot(gameState);
    gameState.stack.push(snapshot);

    let collectedSomething = false;
    const updatedCollectibles = gameState.collectibles.map(item => {
      if (!item.collected && item.x === destX && item.y === destY) {
        collectedSomething = true;
        return { ...item, collected: true };
      }
      return item;
    });

    const allCollected = updatedCollectibles.every(c => c.collected);
    const isAtExit = level.exit && destX === level.exit.x && destY === level.exit.y;
    const isWon = isAtExit && allCollected;

    setGameState(prev => ({
      ...prev,
      player: { x: destX, y: destY, facing: prev.player.facing },
      collectibles: updatedCollectibles,
      portalOpen: allCollected,
      moveCount: prev.moveCount + 1,
      lastAction: { type: 'skip', desc: `Sugar-skipped ${prev.player.facing}` },
      isWon
    }));

    setPowerUps(prev => ({ ...prev, skipMove: prev.skipMove - 1 }));
    sound.playStep();
    showCandyPopup('SUGAR HOP!');

    if (collectedSomething) {
      setTimeout(() => sound.playCollect(), 120);
    }

    if (isWon) {
      sound.playWin();
      showCandyPopup('SUGAR CRUSH!');
      setTimeout(() => {
        setShowVictory(true);
        if (onVictory) {
          onVictory(level.id, gameState.moveCount + 1, gameState.rewindBudget);
        }
      }, 700);
    }
  }, [powerUps.skipMove, gameState, level, onVictory, showCandyPopup]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showArchive || showInspector || showVictory) return;

      const key = e.key.toLowerCase();
      if (key === 'arrowup' || key === 'w') {
        e.preventDefault();
        handleMove('up');
      } else if (key === 'arrowdown' || key === 's') {
        e.preventDefault();
        handleMove('down');
      } else if (key === 'arrowleft' || key === 'a') {
        e.preventDefault();
        handleMove('left');
      } else if (key === 'arrowright' || key === 'd') {
        e.preventDefault();
        handleMove('right');
      } else if (key === 'z' || key === 'backspace') {
        e.preventDefault();
        handleRewind();
      } else if (key === 'r') {
        e.preventDefault();
        handleRestart();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMove, handleRewind, handleRestart, showArchive, showInspector, showVictory]);

  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  const showTouchControls = showTouchControlsSetting === 'always' || (showTouchControlsSetting === 'auto' && isTouchDevice);

  // Compass nearest crystal
  const nearestCrystal = crystalRevealActive
    ? gameState.collectibles
        .filter(c => !c.collected)
        .sort((a, b) => {
          const distA = Math.abs(a.x - gameState.player.x) + Math.abs(a.y - gameState.player.y);
          const distB = Math.abs(b.x - gameState.player.x) + Math.abs(b.y - gameState.player.y);
          return distA - distB;
        })[0] || null
    : null;

  return (
    <div className="cc-game-screen">
      {/* Floating Candy Crush Text Popup: "SWEET!", "TASTY!", "SUGAR CRUSH!" */}
      {announcement && (
        <div className="cc-announcement-popup" key={announcement}>
          <div className="cc-announcement-text">{announcement}</div>
        </div>
      )}

      {/* Candy Crush HUD */}
      <HUD level={level} state={gameState} />

      {/* Game Board */}
      <GameBoard
        level={level}
        state={gameState}
        onMove={handleMove}
        isRewinding={isRewinding}
        highlightCrystal={nearestCrystal}
      />

      {/* Candy Crush In-Game Power-Up Boosters */}
      <div className="cc-powerup-bar">
        <button
          className="cc-powerup-circle-btn"
          onClick={handleExtraRewind}
          disabled={powerUps.extraRewind <= 0}
          title="Time Candy Booster: +2 Rewinds"
        >
          <span className="cc-pu-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 19 2 12 11 5 11 19" fill="rgba(255,255,255,0.3)" />
              <polygon points="22 19 13 12 22 5 22 19" fill="rgba(255,255,255,0.3)" />
            </svg>
          </span>
          <span className="cc-pu-name">+2 Rewind</span>
          {powerUps.extraRewind > 0 && (
            <span className="cc-pu-count">{powerUps.extraRewind}</span>
          )}
        </button>

        <button
          className="cc-powerup-circle-btn"
          onClick={handleCrystalReveal}
          disabled={powerUps.crystalReveal <= 0 || crystalRevealActive}
          title="Sweet Compass: Points to nearest candy"
        >
          <span className="cc-pu-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="rgba(255,255,255,0.3)" />
            </svg>
          </span>
          <span className="cc-pu-name">Compass</span>
          {powerUps.crystalReveal > 0 && !crystalRevealActive && (
            <span className="cc-pu-count">{powerUps.crystalReveal}</span>
          )}
        </button>

        <button
          className="cc-powerup-circle-btn"
          onClick={handleSkipMove}
          disabled={powerUps.skipMove <= 0}
          title="Sugar Teleport: Hop 2 tiles forward"
        >
          <span className="cc-pu-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="rgba(255,255,255,0.3)" />
            </svg>
          </span>
          <span className="cc-pu-name">Sugar Hop</span>
          {powerUps.skipMove > 0 && (
            <span className="cc-pu-count">{powerUps.skipMove}</span>
          )}
        </button>
      </div>

      {/* Bottom Controls / Booster Shelf */}
      <ControlsBar
        state={gameState}
        onRewind={handleRewind}
        onRestart={handleRestart}
        onOpenArchive={() => setShowArchive(true)}
        onOpenInspector={() => setShowInspector(true)}
        disabled={isRewinding}
      />

      {/* Touch Controls (Virtual D-pad for mobile) */}
      <TouchControls
        onMove={handleMove}
        visible={showTouchControls}
      />

      {/* Modals */}
      {showArchive && (
        <TimeArchivePanel
          stack={gameState.stack}
          onClose={() => setShowArchive(false)}
        />
      )}

      {showInspector && (
        <StackInspectorModal
          stack={gameState.stack}
          currentState={gameState}
          onClose={() => setShowInspector(false)}
        />
      )}

      {showVictory && (
        <VictoryModal
          level={level}
          state={gameState}
          hasNextLevel={false}
          onNextLevel={handleRestart}
          onReplay={handleRestart}
          onLevelSelect={handleRestart}
        />
      )}
    </div>
  );
}
