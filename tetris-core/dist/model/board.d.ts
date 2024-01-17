import { Piece } from "./piece";
import { BlockStyle } from "./block-style";
export declare class Board {
    static COLUMNS: number;
    static ROWS: number;
    board: BlockStyle[][];
    constructor();
    removeLine(lineToRemove: number): void;
    isACompletedLine(): CompletedLineInfo;
    private isRowCompleted;
    freezePiece(piece: Piece): void;
    canAllocatePiece(tentativePiece: Piece): boolean;
    maskAsOccupied(x: number, y: number, piece: Piece): void;
    isOccupied(x: number, y: number): boolean;
    getTopY(): number;
    getMiddleX(): number;
    clean(): void;
    private createEmptyRow;
}
export declare class CompletedLineInfo {
    lineIndex: number;
    constructor(lineNumber: number);
}
