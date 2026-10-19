/**
 * REWIND - Handcrafted Level Definitions
 * 
 * Five Crystal Kingdom locations, each exploring a unique puzzle mechanic:
 * 1. Sparkle Meadow: Movement, crystal collection, portal activation.
 * 2. Candy Labyrinth: Navigating dead ends & utilizing Rewind for backtracking.
 * 3. Sugar Block Terrace: Pushable candy blocks, corner traps, and undoing.
 * 4. Crystal Gate Palace: Pressure switches, gates, and cooperative block placement.
 * 5. Rainbow Sanctum: The master puzzle combining all mechanics.
 */

export const LEVELS = [
  {
    id: 1,
    title: "sparkle meadow",
    subtitle: "first crystal",
    lore: "Welcome to the Crystal Kingdom! Collect the sparkling time crystals to awaken the magic portal and advance to the next realm.",
    hint: "Collect both time crystals to activate the exit portal.",
    width: 7,
    height: 7,
    rewindBudget: 5,
    parMoves: 14,
    playerStart: { x: 1, y: 5, facing: "up" },
    grid: [
      "#######",
      "#F...F#",
      "#.###.#",
      "#...#.#",
      "#.#...#",
      "#P#..E#",
      "#######"
    ],
    collectibles: [
      { id: "c1", x: 1, y: 1 },
      { id: "c2", x: 5, y: 1 }
    ],
    pushables: [],
    switches: [],
    gates: [],
    exit: { x: 5, y: 5 }
  },
  {
    id: 2,
    title: "candy labyrinth",
    subtitle: "sweet detours",
    lore: "Sugary paths twist through the candy maze. Some lead to hidden crystals in dead ends — use Rewind to backtrack without losing progress!",
    hint: "Explore the dead-end alcoves, then rewind to return efficiently.",
    width: 8,
    height: 8,
    rewindBudget: 6,
    parMoves: 20,
    playerStart: { x: 1, y: 1, facing: "right" },
    grid: [
      "########",
      "#P...#F#",
      "#.##.#.#",
      "#....#.#",
      "####...#",
      "#F...#.#",
      "#.##..E#",
      "########"
    ],
    collectibles: [
      { id: "c1", x: 6, y: 1 },
      { id: "c2", x: 1, y: 5 },
      { id: "c3", x: 5, y: 4 }
    ],
    pushables: [],
    switches: [],
    gates: [],
    exit: { x: 6, y: 6 }
  },
  {
    id: 3,
    title: "sugar block terrace",
    subtitle: "push & rewind",
    lore: "Candy blocks sit along the terrace paths. Push them into clearings, but watch out — if a block gets stuck against a wall, rewind to try again!",
    hint: "Push blocks into alcoves to clear the way. Rewind if a block gets cornered.",
    width: 8,
    height: 8,
    rewindBudget: 8,
    parMoves: 22,
    playerStart: { x: 1, y: 1, facing: "right" },
    grid: [
      "########",
      "#P...###",
      "##.B.###",
      "#....#F#",
      "#.##...#",
      "#.##.B.#",
      "#F....E#",
      "########"
    ],
    collectibles: [
      { id: "c1", x: 6, y: 3 },
      { id: "c2", x: 1, y: 6 }
    ],
    pushables: [
      { id: "b1", x: 3, y: 2 },
      { id: "b2", x: 5, y: 5 }
    ],
    switches: [],
    gates: [],
    exit: { x: 6, y: 6 }
  },
  {
    id: 4,
    title: "crystal gate palace",
    subtitle: "weight & switches",
    lore: "Crystal gates block the palace corridors! Stand on pressure pads or push blocks onto them to hold the gates open while you explore beyond.",
    hint: "Push a candy block onto the pressure pad to hold the crystal gate open.",
    width: 9,
    height: 9,
    rewindBudget: 8,
    parMoves: 24,
    playerStart: { x: 1, y: 1, facing: "down" },
    grid: [
      "#########",
      "#P....#F#",
      "#..B..#.#",
      "#..S..#G#",
      "#######.#",
      "#F......#",
      "#.#####.#",
      "#......E#",
      "#########"
    ],
    collectibles: [
      { id: "c1", x: 7, y: 1 },
      { id: "c2", x: 1, y: 5 }
    ],
    pushables: [
      { id: "b1", x: 3, y: 2 }
    ],
    switches: [
      { id: "s1", x: 3, y: 3, linkedGateId: "g1" }
    ],
    gates: [
      { id: "g1", x: 7, y: 3, open: false }
    ],
    exit: { x: 7, y: 7 }
  },
  {
    id: 5,
    title: "rainbow sanctum",
    subtitle: "the final challenge",
    lore: "The heart of the Crystal Kingdom! Four sacred time crystals must be recovered through masterful coordination of blocks, gates, and the power of rewind.",
    hint: "Plan carefully. Weight the switches, time your gate entries, and save rewinds for the tricky parts.",
    width: 10,
    height: 10,
    rewindBudget: 10,
    parMoves: 34,
    playerStart: { x: 1, y: 8, facing: "up" },
    grid: [
      "##########",
      "#F......F#",
      "#.B....B.#",
      "#..S..S..#",
      "###G##G###",
      "#........#",
      "#F..##..F#",
      "#...##...#",
      "#P......E#",
      "##########"
    ],
    collectibles: [
      { id: "c1", x: 1, y: 1 },
      { id: "c2", x: 8, y: 1 },
      { id: "c3", x: 1, y: 6 },
      { id: "c4", x: 8, y: 6 }
    ],
    pushables: [
      { id: "b1", x: 2, y: 2 },
      { id: "b2", x: 7, y: 2 }
    ],
    switches: [
      { id: "s1", x: 3, y: 3, linkedGateId: "g1" },
      { id: "s2", x: 6, y: 3, linkedGateId: "g2" }
    ],
    gates: [
      { id: "g1", x: 3, y: 4, open: false },
      { id: "g2", x: 6, y: 4, open: false }
    ],
    exit: { x: 8, y: 8 }
  }
];

export function getLevelById(id) {
  return LEVELS.find(lvl => lvl.id === Number(id)) || LEVELS[0];
}
