import { Shape } from "./shape";

export class Level {
  private nextShapeIndex = 0;
  private shapes : Array<Shape> = [];
  public speed: number;

  constructor(speed: number) {
    this.speed = speed;    
  }

  init() {
    this.nextShapeIndex = 0;
  }

  addShapes(shape: Shape): void {
    this.shapes.push(shape);
  }

  getNextShape(): Shape {
    let nextShape: Shape = null;

    if (this.nextShapeIndex < this.shapes.length){
      nextShape = this.shapes[this.nextShapeIndex];
      this.nextShapeIndex++;
    }

    return nextShape;
  }

}