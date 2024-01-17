import { Shape } from "./shape";
export declare class Level {
    private nextShapeIndex;
    private shapes;
    speed: number;
    constructor(speed: number);
    init(): void;
    addShapes(shape: Shape): void;
    getNextShape(): Shape;
}
