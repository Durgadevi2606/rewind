/**
 * Stack Data Structure Implementation
 * 
 * REWIND relies on a strict Last-In, First-Out (LIFO) Stack to power its
 * core time-reversal mechanics.
 * 
 * In Computer Science:
 * - push(item): Pushes an element onto the top of the stack - O(1)
 * - pop(): Removes and returns the top element - O(1)
 * - peek(): Examines the top element without removing it - O(1)
 * - isEmpty(): Returns true if the stack contains zero elements - O(1)
 * - size(): Returns the current number of elements - O(1)
 * - clear(): Discards all elements - O(1)
 * - toArray(): Returns a shallow copy array of items from bottom to top
 */

export class Stack {
  #items;

  constructor(initialItems = []) {
    this.#items = Array.isArray(initialItems) ? [...initialItems] : [];
  }

  /**
   * Push a snapshot or item onto the top of the stack.
   * @param {*} item - The state snapshot to push.
   * @returns {number} The new size of the stack.
   */
  push(item) {
    if (item === undefined) {
      throw new Error('Cannot push undefined to Stack');
    }
    this.#items.push(item);
    return this.#items.length;
  }

  /**
   * Remove and return the top element from the stack.
   * @returns {*} The popped item, or null if the stack is empty.
   */
  pop() {
    if (this.isEmpty()) {
      return null;
    }
    return this.#items.pop();
  }

  /**
   * Return the top element from the stack without removing it.
   * @returns {*} The top item, or null if the stack is empty.
   */
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.#items[this.#items.length - 1];
  }

  /**
   * Check whether the stack has zero items.
   * @returns {boolean}
   */
  isEmpty() {
    return this.#items.length === 0;
  }

  /**
   * Get the number of items currently in the stack.
   * @returns {number}
   */
  size() {
    return this.#items.length;
  }

  /**
   * Clear all items from the stack.
   */
  clear() {
    this.#items = [];
  }

  /**
   * Return an array copy of items from bottom to top (oldest to newest).
   * @returns {Array}
   */
  toArray() {
    return [...this.#items];
  }

  /**
   * Return an array copy of items from top to bottom (newest to oldest).
   * Useful for UI stack visualizers showing Top of Stack (TOS) first.
   * @returns {Array}
   */
  toReversedArray() {
    return [...this.#items].reverse();
  }
}
