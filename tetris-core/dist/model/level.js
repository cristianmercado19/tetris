"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Level = /** @class */ (function () {
    function Level(speed) {
        this.nextShapeIndex = 0;
        this.shapes = [];
        this.speed = speed;
    }
    Level.prototype.init = function () {
        this.nextShapeIndex = 0;
    };
    Level.prototype.addShapes = function (shape) {
        this.shapes.push(shape);
    };
    Level.prototype.getNextShape = function () {
        var nextShape = null;
        if (this.nextShapeIndex < this.shapes.length) {
            nextShape = this.shapes[this.nextShapeIndex];
            this.nextShapeIndex++;
        }
        return nextShape;
    };
    return Level;
}());
exports.Level = Level;
