export class ScoringSystem {

  private currentScore = 0;

  private pieceDropLevelScoring: number[] = [
    1,    // 1
    1,    // 2
    2,    // 3
    2,    // 4
    5,    // 5
    5,    // 6
    7,    // 7
    7,    // 8
    8,    // 9
    10,   // 10
    10,   // 11
  ];

  private lineLevelScoring: number[][] = [
    [100,   400,     900,   2000], // 1
    [100,   400,     900,   2000], // 2
    [200,   800,    1800,   4000], // 3
    [200,   800,    1800,   4000], // 4
    [300,  1200,    2700,   6000], // 5
    [400,  1500,    3600,   8000], // 6
    [400,  1500,    3600,   8000], // 7
    [600,  1500,    4000,   8000], // 8
    [600,  1600,    4500,   9000], // 9
    [700,  1700,    5000,  10000], // 10
    [700,  2000,    5000,  10000], // 11
  ];

  linesPerClear(lines: number, currentLevel: number): void {
    let levelIndex = currentLevel - 1;

    if (levelIndex >= this.lineLevelScoring.length) {
      levelIndex = this.lineLevelScoring.length - 1;
    }

    const level = this.lineLevelScoring[levelIndex];

    const lineIndex = lines-1;
    const points = level[lineIndex];

    this.currentScore += points;
  }

  pieceDrop(currentLevel: number): void {
    let levelIndex = currentLevel - 1;

    if (levelIndex >= this.pieceDropLevelScoring.length) {
      levelIndex = this.pieceDropLevelScoring.length - 1;
    }
    
    const pointsPerDrop = this.pieceDropLevelScoring[levelIndex];

    this.currentScore += pointsPerDrop;
  }

  reset(): void {
    this.currentScore = 0;
  }

  getScore(): number {
    return this.currentScore;
  }
}
