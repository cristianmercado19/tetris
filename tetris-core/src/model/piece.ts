import { Shape } from "./shape";

export class Piece {
  x: number;
  y: number;
  shape: Shape;

  constructor(shape: Shape) {
    this.shape = shape;
  }

  moveLeft(): void {
    this.x--;
  }
  
  clone(): Piece {
    const clone = new Piece(this.shape.clone());
    clone.x = this.x;
    clone.y = this.y;

    return clone;
  }

  moveRight(): void {
    this.x++;
  }

  moveDown(): void {
    this.y++;
  }

  rotate(): void {
    this.shape.rotate();
  }

  strokeStyle(): string {
    return this.shape.strokeStyle;
  }

  fillStyle(): string {
    return this.shape.fillStyle;
  }

}