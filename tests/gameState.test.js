import { describe, it, expect, beforeEach } from 'vitest';
import {
  initGameState,
  executeMove,
  executeRewind,
  calculateStars
} from '../src/game/gameState.js';
import { getLevelById } from '../src/game/levels.js';

describe('REWIND Game Engine & State Management', () => {
  let level1;
  let level3;
  let level4;

  beforeEach(() => {
    level1 = getLevelById(1);
    level3 = getLevelById(3);
    level4 = getLevelById(4);
  });

  it('initializes game state with clean values and empty stack', () => {
    const state = initGameState(level1);

    expect(state.player.x).toBe(level1.playerStart.x);
    expect(state.player.y).toBe(level1.playerStart.y);
    expect(state.moveCount).toBe(0);
    expect(state.rewindBudget).toBe(level1.rewindBudget);
    expect(state.rewindsUsed).toBe(0);
    expect(state.portalOpen).toBe(false);
    expect(state.isWon).toBe(false);
    expect(state.stack.isEmpty()).toBe(true);
    expect(state.collectibles.every(c => !c.collected)).toBe(true);
  });

  it('pushes snapshot onto stack on valid move and increments moveCount', () => {
    let state = initGameState(level1);
    // Player at (1, 5). Up to (1, 4) is valid floor.
    const result = executeMove(state, level1, 'up');

    expect(result.success).toBe(true);
    state = result.state;

    expect(state.player.x).toBe(1);
    expect(state.player.y).toBe(4);
    expect(state.moveCount).toBe(1);
    expect(state.stack.size()).toBe(1);

    const snapshot = state.stack.peek();
    expect(snapshot.player.x).toBe(1);
    expect(snapshot.player.y).toBe(5);
    expect(snapshot.moveCount).toBe(0);
  });

  it('prevents invalid moves (walls) and does NOT push to stack', () => {
    let state = initGameState(level1);
    // Player at (1, 5). Left is (0, 5) which is a wall '#'.
    const result = executeMove(state, level1, 'left');

    expect(result.success).toBe(false);
    state = result.state;

    expect(state.player.x).toBe(1);
    expect(state.player.y).toBe(5);
    expect(state.moveCount).toBe(0);
    expect(state.stack.isEmpty()).toBe(true);
  });

  it('correctly handles pushable objects and prevents pushing into obstacles', () => {
    // Level 3 has pushable block at (3, 2). Player starts at (1, 1).
    let state = initGameState(level3);

    // Move player: right to (2, 1), down to (2, 2)
    state = executeMove(state, level3, 'right').state;
    state = executeMove(state, level3, 'down').state;

    expect(state.player.x).toBe(2);
    expect(state.player.y).toBe(2);

    // Block is at (3, 2). Tile at (4, 2) is floor.
    // Moving right should push block to (4, 2) and move player to (3, 2)
    const pushResult = executeMove(state, level3, 'right');
    expect(pushResult.success).toBe(true);
    expect(pushResult.pushedBlock).toBe(true);
    state = pushResult.state;

    expect(state.player.x).toBe(3);
    expect(state.player.y).toBe(2);
    const movedBlock = state.pushables.find(b => b.id === 'b1');
    expect(movedBlock.x).toBe(4);
    expect(movedBlock.y).toBe(2);
  });

  it('activates pressure plates to open gates and closes when vacated', () => {
    // Level 4 has switch at (3, 3) linked to gate g1 at (7, 3).
    let state = initGameState(level4);
    const gateBefore = state.gates.find(g => g.id === 'g1');
    expect(gateBefore.open).toBe(false);

    // Position player directly to the left of switch at (2, 3)
    state = {
      ...state,
      player: { x: 2, y: 3, facing: 'right' }
    };
    const stepOnSwitch = executeMove(state, level4, 'right');
    expect(stepOnSwitch.success).toBe(true);
    state = stepOnSwitch.state;
    expect(state.player.x).toBe(3);
    expect(state.player.y).toBe(3);

    const gateAfter = state.gates.find(g => g.id === 'g1');
    expect(gateAfter.open).toBe(true);

    // Step off switch left to (2, 3) which is floor
    const stepOff = executeMove(state, level4, 'left');
    expect(stepOff.success).toBe(true);
    state = stepOff.state;
    expect(state.player.x).toBe(2);
    expect(state.player.y).toBe(3);

    const gateClosed = state.gates.find(g => g.id === 'g1');
    expect(gateClosed.open).toBe(false);
  });

  it('collects memory fragments and opens portal when all are acquired', () => {
    let state = initGameState(level1);
    expect(state.portalOpen).toBe(false);

    // Move to first fragment at (1, 1): 4 steps up
    for (let i = 0; i < 4; i++) {
      state = executeMove(state, level1, 'up').state;
    }

    const frag1 = state.collectibles.find(c => c.id === 'c1');
    expect(frag1.collected).toBe(true);
    expect(state.portalOpen).toBe(false);

    // Move right 4 steps to second fragment at (5, 1)
    for (let i = 0; i < 4; i++) {
      state = executeMove(state, level1, 'right').state;
    }

    const frag2 = state.collectibles.find(c => c.id === 'c2');
    expect(frag2.collected).toBe(true);
    expect(state.portalOpen).toBe(true); // Portal is now awakened!
  });

  it('executes Rewind (Undo) by popping stack, restoring prior state and consuming budget', () => {
    let state = initGameState(level1);
    const initialBudget = state.rewindBudget;

    // Make 2 moves
    state = executeMove(state, level1, 'up').state;
    state = executeMove(state, level1, 'up').state;

    expect(state.player.y).toBe(3);
    expect(state.moveCount).toBe(2);
    expect(state.stack.size()).toBe(2);

    // Execute Rewind
    const rewind1 = executeRewind(state);
    expect(rewind1.success).toBe(true);
    state = rewind1.state;

    expect(state.player.y).toBe(4);
    expect(state.moveCount).toBe(1);
    expect(state.rewindBudget).toBe(initialBudget - 1);
    expect(state.rewindsUsed).toBe(1);
    expect(state.traces.length).toBe(1);
    expect(state.traces[0]).toEqual(expect.objectContaining({ x: 1, y: 3 }));
    expect(state.stack.size()).toBe(1);

    // Execute another Rewind to origin
    const rewind2 = executeRewind(state);
    expect(rewind2.success).toBe(true);
    state = rewind2.state;

    expect(state.player.y).toBe(5);
    expect(state.moveCount).toBe(0);
    expect(state.rewindBudget).toBe(initialBudget - 2);
    expect(state.stack.isEmpty()).toBe(true);

    // Attempting to rewind empty stack fails safely
    const rewind3 = executeRewind(state);
    expect(rewind3.success).toBe(false);
    expect(rewind3.reason).toBe('Timeline at origin');
  });

  it('disallows rewind when rewindBudget is exhausted', () => {
    let state = initGameState(level1);
    state.rewindBudget = 0;

    state = executeMove(state, level1, 'up').state;
    const result = executeRewind(state);

    expect(result.success).toBe(false);
    expect(result.reason).toBe('No rewinds remaining');
  });

  it('solves Level 2 and reaches exit portal when all fragments are collected', () => {
    const level2 = getLevelById(2);
    let state = initGameState(level2);

    expect(state.portalOpen).toBe(false);
    expect(state.isWon).toBe(false);

    // Collect F1 at (6, 1): right from (1, 1) to (4, 1), down to (4, 4), right to (6, 4), up to (6, 1)
    state = executeMove(state, level2, 'right').state;
    state = executeMove(state, level2, 'right').state;
    state = executeMove(state, level2, 'right').state; // at (4, 1)
    state = executeMove(state, level2, 'down').state;
    state = executeMove(state, level2, 'down').state;
    state = executeMove(state, level2, 'down').state; // at (4, 4)
    state = executeMove(state, level2, 'right').state;
    state = executeMove(state, level2, 'right').state; // at (6, 4)
    state = executeMove(state, level2, 'up').state;
    state = executeMove(state, level2, 'up').state;
    state = executeMove(state, level2, 'up').state; // at (6, 1) F1!

    const f1 = state.collectibles.find(c => c.id === 'c1');
    expect(f1.collected).toBe(true);

    // Back down to (6, 4), then left to (5, 4) F3
    state = executeMove(state, level2, 'down').state;
    state = executeMove(state, level2, 'down').state;
    state = executeMove(state, level2, 'down').state; // at (6, 4)
    state = executeMove(state, level2, 'left').state; // at (5, 4) F3!

    const f3 = state.collectibles.find(c => c.id === 'c3');
    expect(f3.collected).toBe(true);

    // Left to (4, 4), down to (4, 5), left to (1, 5) F2
    state = executeMove(state, level2, 'left').state; // at (4, 4)
    state = executeMove(state, level2, 'down').state; // at (4, 5)
    state = executeMove(state, level2, 'left').state;
    state = executeMove(state, level2, 'left').state;
    state = executeMove(state, level2, 'left').state; // at (1, 5) F2!

    const f2 = state.collectibles.find(c => c.id === 'c2');
    expect(f2.collected).toBe(true);
    expect(state.portalOpen).toBe(true); // All 3 fragments collected!

    // Return: right to (4, 5), down to (4, 6), right to (5, 6), right to (6, 6) EXIT!
    state = executeMove(state, level2, 'right').state;
    state = executeMove(state, level2, 'right').state;
    state = executeMove(state, level2, 'right').state; // at (4, 5)
    state = executeMove(state, level2, 'down').state; // at (4, 6)
    state = executeMove(state, level2, 'right').state; // at (5, 6)

    const finalMove = executeMove(state, level2, 'right'); // into (6, 6) EXIT!
    expect(finalMove.success).toBe(true);
    expect(finalMove.isWon).toBe(true);
    expect(finalMove.state.isWon).toBe(true);
  });
});
