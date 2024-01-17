export declare class ScoringSystem {
    private currentScore;
    private pieceDropLevelScoring;
    private lineLevelScoring;
    linesPerClear(lines: number, currentLevel: number): void;
    pieceDrop(currentLevel: number): void;
    reset(): void;
    getScore(): number;
}
