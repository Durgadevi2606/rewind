import React, { useState, useEffect } from 'react';
import { TitleScreen } from './components/TitleScreen.jsx';
import { GameScreen } from './components/GameScreen.jsx';
import { Navbar } from './components/Navbar.jsx';
import { HowToPlayModal } from './components/HowToPlayModal.jsx';
import { SettingsModal } from './components/SettingsModal.jsx';
import { getLevelById } from './game/levels.js';
import {
  loadGameData,
  recordLevelVictory,
  resetGameProgress,
  loadSettings,
  saveSettings
} from './utils/storage.js';
import { sound } from './audio/soundEngine.js';

export function App() {
  const [saveData, setSaveData] = useState(() => loadGameData());
  const [settings, setSettings] = useState(() => loadSettings());
  // Start directly on the game screen for instant Candy Crush gameplay!
  const [currentScreen, setCurrentScreen] = useState('game'); // 'game' | 'title'
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Synchronize audio engine with current settings
  useEffect(() => {
    sound.setSettings(settings);
    if (settings.reducedMotion) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
  }, [settings]);

  // Update settings and persist to storage
  const handleUpdateSettings = (newPartial) => {
    const updated = { ...settings, ...newPartial };
    setSettings(updated);
    saveSettings(updated);
  };

  // Toggle sound quickly from navbar
  const handleToggleSound = () => {
    handleUpdateSettings({ soundEnabled: !settings.soundEnabled });
  };

  // Reset all game progress
  const handleResetProgress = () => {
    const reset = resetGameProgress();
    setSaveData(reset);
    setCurrentScreen('game');
  };

  // Handle level completion (Single Level: Level 1)
  const handleLevelVictory = (levelId, moves, rewindsRemaining) => {
    const levelObj = getLevelById(1);
    const stars = moves <= levelObj.parMoves && rewindsRemaining >= 1 ? 3 : moves <= levelObj.parMoves + 8 ? 2 : 1;
    const updatedSave = recordLevelVictory(1, moves, stars, 1);
    setSaveData(updatedSave);
  };

  // Always play Level 1 (Single Level Mode)
  const activeLevel = getLevelById(1);

  return (
    <div className="app-viewport cc-theme-sky">
      {/* Cartoon Background Clouds & Sugar Sparkles */}
      <div className="cc-clouds-layer" aria-hidden="true">
        <div className="cc-cloud c-left" />
        <div className="cc-cloud c-right" />
        <div className="cc-cloud c-center" />
      </div>

      {/* Top Candy Crush Navbar */}
      <Navbar
        soundEnabled={settings.soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenHowToPlay={() => setShowHowToPlay(true)}
        onOpenSettings={() => setShowSettings(true)}
        onGoHome={() => setCurrentScreen('title')}
      />

      {/* Active Screen */}
      <main className="cc-main-stage">
        {currentScreen === 'title' && (
          <TitleScreen
            onPlay={() => setCurrentScreen('game')}
            onHowToPlay={() => setShowHowToPlay(true)}
            onSettings={() => setShowSettings(true)}
          />
        )}

        {currentScreen === 'game' && activeLevel && (
          <GameScreen
            level={activeLevel}
            hasNextLevel={false}
            showTouchControlsSetting={settings.showTouchControls}
            onVictory={handleLevelVictory}
            onNextLevel={() => setCurrentScreen('game')}
            onLevelSelect={() => setCurrentScreen('title')}
          />
        )}
      </main>

      {/* Global Modals */}
      {showHowToPlay && (
        <HowToPlayModal onClose={() => setShowHowToPlay(false)} />
      )}

      {showSettings && (
        <SettingsModal
          settings={settings}
          onUpdateSettings={handleUpdateSettings}
          onResetProgress={handleResetProgress}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}

export default App;

