/**
 * REWIND - Game State Engine & Snapshot Manager
 * 
 * Manages grid navigation, collision detection, object pushing,
 * pressure plate mechanics, exit portal activation, and immutable
 * snapshot-based time reversal using the Stack data structure.
 */

import { Stack } from './Stack.js';

export const DIRECTIONS = {
  up: { dx: 0, dy: -1, facing: 'up' },
  down: { dx: 0, dy: 1, facing: 'down' },
  left: { dx: -1, dy: 0, facing: 'left' },
  right: { dx: 1, dy: 0, facing: 'right' }
};

/**
 * Creates an immutable, deep snapshot of the mutable puzzle state.
 * Pushed onto the Stack before every valid player action.
 */
export function createSnapshot(state) {
  return {
    player: { ...state.player },
    collectibles: state.collectibles.map(c => ({ ...c })),
    pushables: state.pushables.map(b => ({ ...b })),
    switches: state.switches.map(s => ({ ...s })),
    gates: state.gates.map(g => ({ ...g })),
    portalOpen: state.portalOpen,
    moveCount: state.moveCount,
    actionType: state.lastAction?.type || 'move',
    actionDesc: state.lastAction?.desc || 'Stepped forward',
    timestamp: Date.now()
  };
}

/**
 * Evaluates pressure switches and adjusts linked gate states.
 * A switch is active if either the player or a pushable block occupies it.
 */
export function updateSwitchesAndGates(switches, gates, pushables, player) {
  const updatedSwitches = switches.map(sw => {
    const isPlayerOn = player.x === sw.x && player.y === sw.y;
    const isBlockOn = pushables.some(b => b.x === sw.x && b.y === sw.y);
    return {
      ...sw,
      active: isPlayerOn || isBlockOn
    };
  });

  const updatedGates = gates.map(gate => {
    const linkedSwitch = updatedSwitches.find(s => s.linkedGateId === gate.id);
    const isOpen = linkedSwitch ? linkedSwitch.active : gate.open;
    return {
      ...gate,
      open: isOpen
    };
  });

  return { switches: updatedSwitches, gates: updatedGates };
}

/**
 * Initializes state for a given level and returns a fresh Stack.
 */
export function initGameState(level) {
  const player = {
    x: level.playerStart.x,
    y: level.playerStart.y,
    facing: level.playerStart.facing || 'down'
  };

  const collectibles = level.collectibles.map(c => ({
    id: c.id,
    x: c.x,
    y: c.y,
    collected: false
  }));

  const pushables = level.pushables.map(b => ({
    id: b.id,
    x: b.x,
    y: b.y
  }));

  const rawSwitches = level.switches.map(s => ({
    id: s.id,
    x: s.x,
    y: s.y,
    linkedGateId: s.linkedGateId,
    active: false
  }));

  const rawGates = level.gates.map(g => ({
    id: g.id,
    x: g.x,
    y: g.y,
    open: !!g.open
  }));

  const { switches, gates } = updateSwitchesAndGates(rawSwitches, rawGates, pushables, player);

  const portalOpen = collectibles.length === 0;

  return {
    levelId: level.id,
    player,
    collectibles,
    pushables,
    switches,
    gates,
    portalOpen,
    moveCount: 0,
    rewindBudget: level.rewindBudget,
    rewindsUsed: 0,
    traces: [], // Historical footprints left by rewinding
    lastAction: { type: 'start', desc: 'Exploration begun' },
    isWon: false,
    stack: new Stack()
  };
}

/**
 * Checks whether a specific tile coordinate is walkable for an entity.
 */
export function isTileWalkable(x, y, level, gates) {
  // Out of bounds
  if (x < 0 || x >= level.width || y < 0 || y >= level.height) {
    return false;
  }

  // Wall check
  const row = level.grid[y];
  if (!row || row[x] === '#') {
    return false;
  }

  // Gate check (closed gates block movement)
  const gate = gates.find(g => g.x === x && g.y === y);
  if (gate && !gate.open) {
    return false;
  }

  return true;
}

/**
 * Executes a move in a cardinal direction.
 * 
 * Critical invariant:
 * If the move is valid, pushes a deep snapshot to the Stack BEFORE mutating.
 * If the move is invalid (hitting wall, closed gate, blocked stone), returns unchanged state and pushes nothing.
 */
export function executeMove(state, level, directionKey) {
  const dir = DIRECTIONS[directionKey];
  if (!dir || state.isWon) {
    return { state, success: false, reason: 'Invalid direction or game won' };
  }

  const targetX = state.player.x + dir.dx;
  const targetY = state.player.y + dir.dy;

  // 1. Is the target tile fundamentally walkable?
  if (!isTileWalkable(targetX, targetY, level, state.gates)) {
    return { state, success: false, reason: 'Blocked by obstacle or closed gate' };
  }

  // 2. Is there a pushable pedestal at the target tile?
  const pushableIndex = state.pushables.findIndex(b => b.x === targetX && b.y === targetY);
  let updatedPushables = [...state.pushables];
  let pushedBlock = false;

  if (pushableIndex !== -1) {
    const block = state.pushables[pushableIndex];
    const blockNextX = block.x + dir.dx;
    const blockNextY = block.y + dir.dy;

    // Check if the destination for the block is walkable and free
    if (!isTileWalkable(blockNextX, blockNextY, level, state.gates)) {
      return { state, success: false, reason: 'Pedestal blocked by obstacle' };
    }

    // Check if another block is already at the destination
    const isAnotherBlockThere = state.pushables.some(
      (b, idx) => idx !== pushableIndex && b.x === blockNextX && b.y === blockNextY
    );
    if (isAnotherBlockThere) {
      return { state, success: false, reason: 'Pedestal blocked by another pedestal' };
    }

    // Valid push!
    updatedPushables[pushableIndex] = {
      ...block,
      x: blockNextX,
      y: blockNextY
    };
    pushedBlock = true;
  }

  // Snapshot previous state and push onto the Stack
  const snapshot = createSnapshot(state);
  state.stack.push(snapshot);

  // Apply player movement
  const newPlayer = {
    x: targetX,
    y: targetY,
    facing: dir.facing
  };

  // Check collectible pickup
  let collectedSomething = false;
  const updatedCollectibles = state.collectibles.map(item => {
    if (!item.collected && item.x === targetX && item.y === targetY) {
      collectedSomething = true;
      return { ...item, collected: true };
    }
    return item;
  });

  // Check if all collectibles are now collected
  const allCollected = updatedCollectibles.every(c => c.collected);

  // Update switches and gates
  const { switches: updatedSwitches, gates: updatedGates } = updateSwitchesAndGates(
    state.switches,
    state.gates,
    updatedPushables,
    newPlayer
  );

  // Check victory: Player is at level.exit AND all collectibles collected
  const isAtExit = level.exit && targetX === level.exit.x && targetY === level.exit.y;
  const isWon = isAtExit && allCollected;

  const actionType = pushedBlock ? 'push' : collectedSomething ? 'collect' : 'move';
  const actionDesc = pushedBlock
    ? `Pushed garden pedestal ${dir.facing}`
    : collectedSomething
    ? 'Recovered memory fragment'
    : `Moved ${dir.facing}`;

  const newState = {
    ...state,
    player: newPlayer,
    collectibles: updatedCollectibles,
    pushables: updatedPushables,
    switches: updatedSwitches,
    gates: updatedGates,
    portalOpen: allCollected,
    moveCount: state.moveCount + 1,
    lastAction: { type: actionType, desc: actionDesc, direction: dir.facing },
    isWon
  };

  return {
    state: newState,
    success: true,
    action: actionType,
    pushedBlock,
    collectedSomething,
    isWon
  };
}

/**
 * Executes a Rewind (Undo) operation.
 * 
 * Rules:
 * 1. Requires rewindBudget > 0.
 * 2. Requires stack to not be empty.
 * 3. Pops the top snapshot and restores the game state.
 * 4. Consumes exactly 1 rewind from the rewindBudget.
 * 5. Leaves a visual ghost trace at the rewind origin ("Every mistake leaves a trace").
 * 6. Restores moveCount to the snapshot value.
 */
export function executeRewind(state) {
  if (state.rewindBudget <= 0) {
    return { state, success: false, reason: 'No rewinds remaining' };
  }

  if (state.stack.isEmpty()) {
    return { state, success: false, reason: 'Timeline at origin' };
  }

  // Pop the most recent snapshot from the Stack
  const snapshot = state.stack.pop();

  // Create a visual trace at the location before the rewind
  const trace = {
    x: state.player.x,
    y: state.player.y,
    id: `trace-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`
  };
  const updatedTraces = [trace, ...state.traces].slice(0, 8); // Keep up to 8 traces

  const newState = {
    ...state,
    player: { ...snapshot.player },
    collectibles: snapshot.collectibles.map(c => ({ ...c })),
    pushables: snapshot.pushables.map(b => ({ ...b })),
    switches: snapshot.switches.map(s => ({ ...s })),
    gates: snapshot.gates.map(g => ({ ...g })),
    portalOpen: snapshot.portalOpen,
    moveCount: snapshot.moveCount,
    rewindBudget: state.rewindBudget - 1,
    rewindsUsed: state.rewindsUsed + 1,
    traces: updatedTraces,
    lastAction: { type: 'rewind', desc: 'Reversed time to prior memory' },
    isWon: false // Reversing step resets victory if rewinding back from exit
  };

  return {
    state: newState,
    success: true,
    restoredSnapshot: snapshot
  };
}

/**
 * Calculates star rating (1 to 3 stars) based on par moves & rewinds preserved.
 */
export function calculateStars(level, moveCount, rewindsRemaining) {
  if (moveCount <= level.parMoves && rewindsRemaining >= 1) {
    return 3;
  }
  if (moveCount <= level.parMoves + 8) {
    return 2;
  }
  return 1;
}
