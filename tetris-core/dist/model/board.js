"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var block_style_1 = require("./block-style");
var Board = /** @class */ (function () {
    function Board() {
        this.board = [];
        this.clean();
    }
    Board.prototype.removeLine = function (lineToRemove) {
        var newBoard = [];
        for (var r = 0; r < Board.ROWS; ++r) {
            var row = this.board[r];
            if (r !== lineToRemove) {
                newBoard.push(row);
            }
        }
        newBoard.unshift(this.createEmptyRow());
        this.board = newBoard;
    };
    Board.prototype.isACompletedLine = function () {
        for (var rowIndex = this.board.length - 1; rowIndex >= 0; rowIndex--) {
            var row = this.board[rowIndex];
            var completedLine = this.isRowCompleted(row);
            if (completedLine) {
                var completedLine_1 = new CompletedLineInfo(rowIndex);
                return completedLine_1;
            }
        }
        return null;
    };
    Board.prototype.isRowCompleted = function (row) {
        for (var columnIndex = 0; columnIndex < row.length; columnIndex++) {
            var value = row[columnIndex];
            if (value === null) {
                return false;
            }
        }
        return true;
    };
    Board.prototype.freezePiece = function (piece) {
        var matrix = piece.shape.matrix;
        for (var rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
            var row = matrix[rowIndex];
            for (var columnIndex = 0; columnIndex < row.length; columnIndex++) {
                var value = row[columnIndex];
                if (value > 0) {
                    var xInBoard = columnIndex + piece.x;
                    var yInBoard = rowIndex + piece.y;
                    this.maskAsOccupied(xInBoard, yInBoard, piece);
                }
            }
        }
    };
    Board.prototype.canAllocatePiece = function (tentativePiece) {
        var matrix = tentativePiece.shape.matrix;
        for (var rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
            var row = matrix[rowIndex];
            for (var columnIndex = 0; columnIndex < row.length; columnIndex++) {
                var value = row[columnIndex];
                if (value > 0) {
                    var tentativeXInBoard = columnIndex + tentativePiece.x;
                    var tentativeYInBoard = rowIndex + tentativePiece.y;
                    if ((tentativeXInBoard < 0) || (tentativeXInBoard > Board.COLUMNS - 1) ||
                        (tentativeYInBoard > Board.ROWS - 1) ||
                        this.isOccupied(tentativeXInBoard, tentativeYInBoard)) {
                        return false;
                    }
                }
            }
        }
        return true;
    };
    Board.prototype.maskAsOccupied = function (x, y, piece) {
        var blockStyle = new block_style_1.BlockStyle();
        blockStyle.fillStyle = piece.fillStyle();
        blockStyle.strokeStyle = piece.strokeStyle();
        this.board[y][x] = blockStyle;
    };
    Board.prototype.isOccupied = function (x, y) {
        var value = this.board[y][x];
        return value !== null;
    };
    Board.prototype.getTopY = function () {
        return 0;
    };
    Board.prototype.getMiddleX = function () {
        return Board.COLUMNS / 2;
    };
    Board.prototype.clean = function () {
        for (var r = 0; r < Board.ROWS; ++r) {
            this.board[r] = this.createEmptyRow();
        }
    };
    Board.prototype.createEmptyRow = function () {
        var emptyRow = [];
        for (var c = 0; c < Board.COLUMNS; ++c) {
            emptyRow[c] = null;
        }
        return emptyRow;
    };
    Board.COLUMNS = 10;
    Board.ROWS = 20;
    return Board;
}());
exports.Board = Board;
var CompletedLineInfo = /** @class */ (function () {
    function CompletedLineInfo(lineNumber) {
        this.lineIndex = lineNumber;
    }
    return CompletedLineInfo;
}());
exports.CompletedLineInfo = CompletedLineInfo;
