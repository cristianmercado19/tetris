import { Level } from "./level";
import { ShapeFactory } from "./shape-factory";

export class LevelFactory {

  static Levels(): Array<Level> {
    const levels : Array<Level> = [];

    levels.push(this.createLevel(500,   30)); // 1
    levels.push(this.createLevel(450,   30)); // 2
    levels.push(this.createLevel(420,   30)); // 3
    levels.push(this.createLevel(400,   40)); // 4
    levels.push(this.createLevel(280,   40)); // 5
    levels.push(this.createLevel(270,   50)); // 6
    levels.push(this.createLevel(220,   50)); // 7
    levels.push(this.createLevel(200,   60)); // 8
    levels.push(this.createLevel(180,   70)); // 9
    levels.push(this.createLevel(130,   80)); // 10
    levels.push(this.createLevel( 90, 2000)); // 11

    return levels;
  }

  static createLevel(speed: number, numberOfPieces: number): Level {
    const level = new Level(speed);

    for (let i = 0; i < numberOfPieces; i++) {
      level.addShapes(ShapeFactory.getRandom());
    }

    return level;
  }

}