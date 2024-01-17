"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var p2pt_1 = __importDefault(require("p2pt"));
var Multiplayer = /** @class */ (function () {
    function Multiplayer() {
        this.trackersAnnounceURLs = [
            'wss://tracker.openwebtorrent.com',
            'wss://tracker.sloppyta.co:443/announce',
            'wss://open.tube:443/tracker/socket',
            'ws://tracker.sloppyta.co:80/announce',
            'ws://tracker.btsync.cf:6969/announce',
        ];
    }
    Multiplayer.prototype.joinGame = function (gameId) {
        this.createP2PTInstance(gameId);
    };
    Multiplayer.prototype.createNewGame = function () {
        var gameId = this.createNewGameId();
        this.createP2PTInstance(gameId);
        return gameId;
    };
    Multiplayer.prototype.onPlayer2Connected = function (func) {
        this.player2Connected = func;
    };
    Multiplayer.prototype.onPlayer2PieceUpdated = function (func) {
        this.player2PieceUpdated = func;
    };
    Multiplayer.prototype.onPlayer2BoardUpdated = function (func) {
        this.player2BoardUpdated = func;
    };
    Multiplayer.prototype.sendNewBoardToPlayer2 = function (board) {
        var msg = {
            id: "[BOARD-UPDATED]",
            board: board
        };
        this.p2pt.send(this.peerPlayer2, msg);
    };
    Multiplayer.prototype.sendNewPieceToPlayer2 = function (piece) {
        var msg = {
            id: "[PIECE-UPDATED]",
            piece: piece
        };
        this.p2pt.send(this.peerPlayer2, msg);
    };
    Multiplayer.prototype.createNewGameId = function () {
        return new Date().getTime();
    };
    Multiplayer.prototype.createP2PTInstance = function (gameId) {
        var _this = this;
        var gameIdentifier = "tetris-" + gameId;
        console.log("\uD83D\uDE80 ~ file: multiplayer.ts ~ line 35 ~ Multiplayer ~ createP2PTInstance ~ gameIdentifier", gameIdentifier);
        this.p2pt = new p2pt_1.default(this.trackersAnnounceURLs, gameIdentifier);
        this.p2pt.on('trackerconnect', function (tracker, stats) { return _this.onConnectionSuccess(tracker, stats); });
        this.p2pt.on('peerconnect', function (peer) { return _this.onPeerConnected(peer); });
        this.p2pt.on('peerclose', function (peer) { return _this.onPeerClose(peer); });
        this.p2pt.on('msg', function (peer, msg) { return _this.onMessageReceived(peer, msg); });
        this.p2pt.start();
    };
    Multiplayer.prototype.onMessageReceived = function (peer, msg) {
        console.log("\uD83D\uDE80 ~ file: multiplayer.ts ~ line 45 ~ Multiplayer ~ onMessageReceived ~ peer", peer);
        console.log("\uD83D\uDE80 ~ file: multiplayer.ts ~ line 45 ~ Multiplayer ~ onMessageReceived ~ msg", msg);
        if (msg.id === "[BOARD-UPDATED]") {
            this.player2BoardUpdated(msg.board);
        }
        if (msg.id === "[PIECE-UPDATED]") {
            this.player2PieceUpdated(msg.piece);
        }
    };
    Multiplayer.prototype.onConnectionSuccess = function (tracker, stats) {
        console.log("\uD83D\uDE80 ~ file: multiplayer.ts ~ line 41 ~ Multiplayer ~ onConnectionSuccess ~ onConnectionSuccess");
        console.log('Connected to tracker : ' + tracker.announceUrl);
        console.log('Tracker stats : ' + JSON.stringify(stats));
    };
    Multiplayer.prototype.onPeerConnected = function (peer) {
        console.log("\uD83D\uDE80 ~ file: multiplayer.ts ~ line 47 ~ Multiplayer ~ onPeerConnected ~ onPeerConnected");
        this.peerPlayer2 = peer;
        this.player2Connected();
    };
    Multiplayer.prototype.onPeerClose = function (peer) {
        console.log("\uD83D\uDE80 ~ file: multiplayer.ts ~ line 52 ~ Multiplayer ~ onPeerClose ~ onPeerClose");
    };
    return Multiplayer;
}());
exports.Multiplayer = Multiplayer;
