"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shape_1 = require("./shape");
var ShapeFactory = /** @class */ (function () {
    function ShapeFactory() {
    }
    ShapeFactory.getRandom = function () {
        var totalShapes = this.shapes.length;
        var randomShapeIndex = Math.floor(Math.random() * totalShapes);
        return this.shapes[randomShapeIndex]();
    };
    ShapeFactory.i = function () {
        var shape = new shape_1.Shape();
        shape.matrix = [[1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]];
        shape.fillStyle = '#F60005';
        shape.strokeStyle = '#F56F74';
        return shape;
    };
    ShapeFactory.o = function () {
        var shape = new shape_1.Shape();
        shape.matrix = [[1, 1],
            [1, 1]];
        shape.fillStyle = '#003AF4';
        shape.strokeStyle = '#6F8FF8';
        return shape;
    };
    ShapeFactory.j = function () {
        var shape = new shape_1.Shape();
        shape.matrix = [[1, 0, 0],
            [1, 1, 1],
            [0, 0, 0]];
        shape.fillStyle = '#F9DB34';
        shape.strokeStyle = '#FBEB8B';
        return shape;
    };
    ShapeFactory.l = function () {
        var shape = new shape_1.Shape();
        shape.matrix = [[0, 0, 1],
            [1, 1, 1],
            [0, 0, 0]];
        shape.fillStyle = '#C904F3';
        shape.strokeStyle = '#D284F4';
        return shape;
    };
    ShapeFactory.s = function () {
        var shape = new shape_1.Shape();
        shape.matrix = [[0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]];
        shape.fillStyle = '#46CCFC';
        shape.strokeStyle = '#92E1FD';
        return shape;
    };
    ShapeFactory.t = function () {
        var shape = new shape_1.Shape();
        shape.matrix = [[0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]];
        shape.fillStyle = '#55B218';
        shape.strokeStyle = '#9EEB82';
        return shape;
    };
    ShapeFactory.z = function () {
        var shape = new shape_1.Shape();
        shape.matrix = [[1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]];
        shape.fillStyle = '#F19318';
        shape.strokeStyle = '#E9B061';
        return shape;
    };
    ShapeFactory.shapes = [
        ShapeFactory.i,
        ShapeFactory.o,
        ShapeFactory.j,
        ShapeFactory.l,
        ShapeFactory.s,
        ShapeFactory.t,
        ShapeFactory.z,
    ];
    return ShapeFactory;
}());
exports.ShapeFactory = ShapeFactory;
