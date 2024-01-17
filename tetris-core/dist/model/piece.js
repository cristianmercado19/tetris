"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Piece = /** @class */ (function () {
    function Piece(shape) {
        this.shape = shape;
    }
    Piece.prototype.moveLeft = function () {
        this.x--;
    };
    Piece.prototype.clone = function () {
        var clone = new Piece(this.shape.clone());
        clone.x = this.x;
        clone.y = this.y;
        return clone;
    };
    Piece.prototype.moveRight = function () {
        this.x++;
    };
    Piece.prototype.moveDown = function () {
        this.y++;
    };
    Piece.prototype.rotate = function () {
        this.shape.rotate();
    };
    Piece.prototype.strokeStyle = function () {
        return this.shape.strokeStyle;
    };
    Piece.prototype.fillStyle = function () {
        return this.shape.fillStyle;
    };
    return Piece;
}());
exports.Piece = Piece;
