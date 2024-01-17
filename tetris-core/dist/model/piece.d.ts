import { Shape } from "./shape";
export declare class Piece {
    x: number;
    y: number;
    shape: Shape;
    constructor(shape: Shape);
    moveLeft(): void;
    clone(): Piece;
    moveRight(): void;
    moveDown(): void;
    rotate(): void;
    strokeStyle(): string;
    fillStyle(): string;
}
