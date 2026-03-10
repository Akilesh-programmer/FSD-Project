const MOVES = ["R", "L", "U", "D", "F", "B"];
const MODIFIERS = ["", "'", "2"];
const OPPOSITES = { R: "L", L: "R", U: "D", D: "U", F: "B", B: "F" };

export function generateScramble(length = 20) {
  const scramble = [];
  let lastMove = "";
  let secondLastMove = "";

  for (let i = 0; i < length; i++) {
    let move;
    do {
      move = MOVES[Math.floor(Math.random() * MOVES.length)];
    } while (
      move === lastMove ||
      (OPPOSITES[move] === lastMove && move === secondLastMove)
    );

    const modifier = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
    scramble.push(move + modifier);
    secondLastMove = lastMove;
    lastMove = move;
  }

  return scramble.join(" ");
}

export const STORED_SCRAMBLES = [
  "R U R' U' R' F R2 U' R' U' R U R' F'",
  "F R U' R' U' R U R' F' R U R' U' R' F R F'",
  "R U R' U R U2 R' U' R U' R'",
  "R2 D' R U2 R' D R U2 R",
  "R' U L' U2 R U' R' U2 R L",
  "F R U R' U' F' U2 F U R U' R' F'",
  "R U R' U' R' F R2 U' R' U R U R' F'",
  "R U2 R' U' R U' R' L U2 L' U L U' L'",
  "D' F' D2 L2 B R2 U F2 D' R2 B2 U2 L F' U' R' D' L B2 U2",
  "U2 R2 F2 U2 B D2 F D2 R2 F R2 D' B' F D' L' D B' L U'",
  "R2 B2 L2 D L2 U B2 D' U2 F2 R2 B L2 F R D L D' U2 B",
  "F2 L' D2 B2 R' D2 F2 L B2 F2 R2 U B' R' F' L U' L' U2",
  "B2 D2 F' D2 R2 B R2 D2 R2 F2 U' L D' R2 B' D B R F2 U2",
  "L2 U B2 R2 D' B2 U' L2 D2 R2 U' B R' D U2 F' L D' R' B' L",
  "D L2 D L2 D2 R2 B2 U' R2 U' R' U2 L' D F L R B2 D",
  "B2 R D2 B2 L' B2 L2 F2 R' B2 D B U2 F' R' F R D2 L2 F2",
  "U R2 F2 D B2 D2 L2 D B2 U2 L2 F' R' U F R' D' L U R B2",
  "L2 U' L2 U F2 R2 U2 B2 U' R2 F R' U2 B' L B' D' R2 F' R",
  "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R",
  "R U R' F' R U R' U' R' F R2 U' R'",
];

export function getRandomStoredScramble() {
  return STORED_SCRAMBLES[Math.floor(Math.random() * STORED_SCRAMBLES.length)];
}
