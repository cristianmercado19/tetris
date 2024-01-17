"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Shape = /** @class */ (function () {
    function Shape() {
    }
    Shape.prototype.clone = function () {
        var clone = new Shape();
        clone.matrix = JSON.parse(JSON.stringify(this.matrix));
        clone.strokeStyle = this.strokeStyle;
        clone.fillStyle = this.fillStyle;
        return clone;
    };
    Shape.prototype.rotate = function () {
        var _a;
        var _this = this;
        var N = this.matrix.length - 1; // use a constant
        // use arrow functions and nested map;
        var result = this.matrix.map(function (row, i) {
            return row.map(function (val, j) { return _this.matrix[N - j][i]; });
        });
        this.matrix.length = 0; // hold original array reference
        (_a = this.matrix).push.apply(_a, result); // Spread operator
    };
    return Shape;
}());
exports.Shape = Shape;
