// Fixed array of target scores for each round
const TARGET_SCORES = [
  30,     // Round 1
  50,     // Round 2
  250,    // Round 3

  300,    // Round 4
  500,    // Round 5
  2500,   // Round 6

  3000,   // Round 7
  5000,   // Round 8
  25000,  // Round 9

  30000,  // Round 10
  50000,  // Round 11
  250000,  // Round 12

  300000,  // Round 13
  500000,  // Round 14
  2500000,  // Round 15

  3000000,  // Round 16
  5000000,  // Round 16
  25000000,  // Round 18

  30000000,  // Round 19
  50000000,  // Round 20
  250000000,  // Round 21
];

/**
 * Gets the target score for a given round
 * @param round - The round number (1-based)
 * @returns The target score for the round, or the last available score if round exceeds array length
 */
export function getTargetScore(round: number): number {
  if (round < 1) {
    return TARGET_SCORES[0];
  }
  
  const index = round - 1; // Convert to 0-based index
  if (index >= TARGET_SCORES.length) {
    return TARGET_SCORES[TARGET_SCORES.length - 1];
  }
  
  return TARGET_SCORES[index];
}

/**
 * Gets the next target score for a given round
 * @param round - The current round number (1-based)
 * @returns The target score for the next round, or the last available score if next round exceeds array length
 */
export function getNextTargetScore(round: number): number {
  return getTargetScore(round + 1);
}
