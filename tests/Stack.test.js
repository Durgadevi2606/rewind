import { describe, it, expect, beforeEach } from 'vitest';
import { Stack } from '../src/game/Stack.js';

describe('Stack Data Structure', () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  it('starts empty with size 0', () => {
    expect(stack.isEmpty()).toBe(true);
    expect(stack.size()).toBe(0);
    expect(stack.peek()).toBeNull();
    expect(stack.pop()).toBeNull();
  });

  it('correctly pushes elements and increments size', () => {
    const size1 = stack.push({ move: 1 });
    expect(size1).toBe(1);
    expect(stack.isEmpty()).toBe(false);
    expect(stack.size()).toBe(1);
    expect(stack.peek()).toEqual({ move: 1 });

    const size2 = stack.push({ move: 2 });
    expect(size2).toBe(2);
    expect(stack.size()).toBe(2);
    expect(stack.peek()).toEqual({ move: 2 });
  });

  it('strictly adheres to Last-In, First-Out (LIFO) order on pop', () => {
    stack.push('first');
    stack.push('second');
    stack.push('third');

    expect(stack.size()).toBe(3);
    expect(stack.pop()).toBe('third');
    expect(stack.pop()).toBe('second');
    expect(stack.pop()).toBe('first');
    expect(stack.isEmpty()).toBe(true);
    expect(stack.pop()).toBeNull();
  });

  it('peeks at top element without modifying stack state', () => {
    stack.push('alpha');
    stack.push('beta');

    expect(stack.peek()).toBe('beta');
    expect(stack.size()).toBe(2);
    expect(stack.peek()).toBe('beta');
    expect(stack.size()).toBe(2);
  });

  it('clears all elements properly', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.clear();

    expect(stack.isEmpty()).toBe(true);
    expect(stack.size()).toBe(0);
    expect(stack.peek()).toBeNull();
  });

  it('throws an error when pushing undefined', () => {
    expect(() => stack.push(undefined)).toThrow('Cannot push undefined to Stack');
  });

  it('returns an immutable array copy through toArray and toReversedArray', () => {
    stack.push('a');
    stack.push('b');
    stack.push('c');

    const arr = stack.toArray();
    expect(arr).toEqual(['a', 'b', 'c']);

    // Mutating array should not mutate internal stack
    arr.pop();
    expect(stack.size()).toBe(3);

    const reversed = stack.toReversedArray();
    expect(reversed).toEqual(['c', 'b', 'a']);
  });
});
