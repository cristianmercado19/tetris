"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SinglePlayer = /** @class */ (function () {
    function SinglePlayer() {
    }
    SinglePlayer.prototype.sendNewBoardToPlayer2 = function (board) {
    };
    SinglePlayer.prototype.sendNewPieceToPlayer2 = function (piece) {
    };
    SinglePlayer.prototype.onPlayer2Connected = function (func) {
    };
    SinglePlayer.prototype.onPlayer2PieceUpdated = function (func) {
    };
    SinglePlayer.prototype.onPlayer2BoardUpdated = function (func) {
    };
    SinglePlayer.prototype.createNewGame = function () {
        return new Date().getTime();
    };
    SinglePlayer.prototype.joinGame = function (gameId) {
    };
    return SinglePlayer;
}());
exports.SinglePlayer = SinglePlayer;
