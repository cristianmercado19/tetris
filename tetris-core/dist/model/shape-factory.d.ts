import { Shape } from "./shape";
export declare class ShapeFactory {
    static shapes: (typeof ShapeFactory.i)[];
    static getRandom(): Shape;
    static i(): Shape;
    static o(): Shape;
    static j(): Shape;
    static l(): Shape;
    static s(): Shape;
    static t(): Shape;
    static z(): Shape;
}
