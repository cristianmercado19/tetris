import { Level } from "./level";
export declare class LevelFactory {
    static Levels(): Array<Level>;
    static createLevel(speed: number, numberOfPieces: number): Level;
}
