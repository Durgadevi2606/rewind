/**
 * REWIND - Persistence & Local Storage Manager
 * 
 * Safely persists unlocked levels, star achievements, best move counts,
 * and player settings. Gracefully handles corrupted data or restricted environments.
 */

const STORAGE_KEY = 'rewind_game_save_v1';
const SETTINGS_KEY = 'rewind_game_settings_v1';

export const DEFAULT_SAVE = {
  unlockedLevels: [1],
  levelScores: {},
  currentLevelId: 1
};

export const DEFAULT_SETTINGS = {
  soundEnabled: true,
  volume: 0.7,
  reducedMotion: false,
  showTouchControls: 'auto' // 'auto' | 'always' | 'never'
};

/**
 * Safely load saved game progress.
 */
export function loadGameData(storage = window.localStorage) {
  try {
    if (!storage) return { ...DEFAULT_SAVE };
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SAVE };
    const parsed = JSON.parse(raw);

    return {
      unlockedLevels: Array.isArray(parsed.unlockedLevels) ? parsed.unlockedLevels : [1],
      levelScores: typeof parsed.levelScores === 'object' && parsed.levelScores !== null ? parsed.levelScores : {},
      currentLevelId: typeof parsed.currentLevelId === 'number' ? parsed.currentLevelId : 1
    };
  } catch (err) {
    console.warn('Could not load game save, using defaults:', err);
    return { ...DEFAULT_SAVE };
  }
}

/**
 * Safely save game progress.
 */
export function saveGameData(data, storage = window.localStorage) {
  try {
    if (!storage) return false;
    storage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (err) {
    console.warn('Could not save game data:', err);
    return false;
  }
}

/**
 * Record a level completion and unlock the next level.
 */
export function recordLevelVictory(levelId, moves, stars, totalLevels = 5, storage = window.localStorage) {
  const currentSave = loadGameData(storage);
  const existingScore = currentSave.levelScores[levelId];

  const bestMoves = existingScore && existingScore.bestMoves !== undefined
    ? Math.min(existingScore.bestMoves, moves)
    : moves;

  const bestStars = existingScore && existingScore.stars !== undefined
    ? Math.max(existingScore.stars, stars)
    : stars;

  const updatedScores = {
    ...currentSave.levelScores,
    [levelId]: {
      completed: true,
      bestMoves,
      stars: bestStars
    }
  };

  const nextLevel = levelId + 1;
  const updatedUnlocked = [...currentSave.unlockedLevels];
  if (nextLevel <= totalLevels && !updatedUnlocked.includes(nextLevel)) {
    updatedUnlocked.push(nextLevel);
  }

  const newSave = {
    ...currentSave,
    unlockedLevels: updatedUnlocked.sort((a, b) => a - b),
    levelScores: updatedScores,
    currentLevelId: Math.min(nextLevel, totalLevels)
  };

  saveGameData(newSave, storage);
  return newSave;
}

/**
 * Reset all level progress back to initial state.
 */
export function resetGameProgress(storage = window.localStorage) {
  try {
    if (storage) {
      storage.removeItem(STORAGE_KEY);
    }
  } catch (err) {
    console.warn('Could not reset game save:', err);
  }
  return { ...DEFAULT_SAVE };
}

/**
 * Safely load audio and motion settings.
 */
export function loadSettings(storage = window.localStorage) {
  try {
    if (!storage) return { ...DEFAULT_SETTINGS };
    const raw = storage.getItem(SETTINGS_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_SETTINGS,
      ...parsed
    };
  } catch (err) {
    console.warn('Could not load settings, using defaults:', err);
    return { ...DEFAULT_SETTINGS };
  }
}

/**
 * Safely save settings.
 */
export function saveSettings(settings, storage = window.localStorage) {
  try {
    if (!storage) return false;
    storage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    return true;
  } catch (err) {
    console.warn('Could not save settings:', err);
    return false;
  }
}
