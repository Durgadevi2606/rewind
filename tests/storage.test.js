import { describe, it, expect, beforeEach } from 'vitest';
import {
  loadGameData,
  saveGameData,
  recordLevelVictory,
  resetGameProgress,
  loadSettings,
  saveSettings,
  DEFAULT_SAVE,
  DEFAULT_SETTINGS
} from '../src/utils/storage.js';

class MockStorage {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

describe('Storage Persistence Module', () => {
  let mockStorage;

  beforeEach(() => {
    mockStorage = new MockStorage();
  });

  it('loads default values when storage is empty', () => {
    const data = loadGameData(mockStorage);
    expect(data).toEqual(DEFAULT_SAVE);
    expect(data.unlockedLevels).toEqual([1]);
  });

  it('saves and reloads progress cleanly', () => {
    const customSave = {
      unlockedLevels: [1, 2],
      levelScores: { 1: { completed: true, bestMoves: 14, stars: 3 } },
      currentLevelId: 2
    };
    saveGameData(customSave, mockStorage);

    const loaded = loadGameData(mockStorage);
    expect(loaded).toEqual(customSave);
  });

  it('records level victory, unlocks next level, and preserves best moves & stars', () => {
    // Level 1 won in 16 moves with 2 stars
    const res1 = recordLevelVictory(1, 16, 2, 5, mockStorage);
    expect(res1.unlockedLevels).toContain(2);
    expect(res1.levelScores[1].bestMoves).toBe(16);
    expect(res1.levelScores[1].stars).toBe(2);

    // Replay Level 1 and beat in 12 moves with 3 stars
    const res2 = recordLevelVictory(1, 12, 3, 5, mockStorage);
    expect(res2.levelScores[1].bestMoves).toBe(12);
    expect(res2.levelScores[1].stars).toBe(3);

    // Replay Level 1 worse (18 moves, 1 star), best score should remain 12 moves / 3 stars
    const res3 = recordLevelVictory(1, 18, 1, 5, mockStorage);
    expect(res3.levelScores[1].bestMoves).toBe(12);
    expect(res3.levelScores[1].stars).toBe(3);
  });

  it('handles corrupted JSON gracefully without crashing', () => {
    mockStorage.setItem('rewind_game_save_v1', 'not valid json {{{');
    const data = loadGameData(mockStorage);
    expect(data).toEqual(DEFAULT_SAVE);
  });

  it('resets progress back to default save state', () => {
    recordLevelVictory(1, 12, 3, 5, mockStorage);
    resetGameProgress(mockStorage);
    const loaded = loadGameData(mockStorage);
    expect(loaded).toEqual(DEFAULT_SAVE);
  });

  it('loads and saves settings correctly', () => {
    const settings = loadSettings(mockStorage);
    expect(settings).toEqual(DEFAULT_SETTINGS);

    saveSettings({ soundEnabled: false, volume: 0.3, reducedMotion: true, showTouchControls: 'always' }, mockStorage);
    const updated = loadSettings(mockStorage);
    expect(updated.soundEnabled).toBe(false);
    expect(updated.volume).toBe(0.3);
    expect(updated.reducedMotion).toBe(true);
    expect(updated.showTouchControls).toBe('always');
  });
});
