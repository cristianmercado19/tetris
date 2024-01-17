"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("../model");
var full_board_exception_1 = require("../exceptions/full-board.exception");
var Game = /** @class */ (function () {
    function Game() {
        this.gameId = 0;
        this.scoring = new model_1.ScoringSystem();
        this.levels = [];
        this.currentLevelIndex = -1;
        this.board = new model_1.Board();
    }
    Game.prototype.init = function () {
        this.attachToController();
        this.view.setupBoard(model_1.Board.ROWS, model_1.Board.COLUMNS);
        this.view.drawBoard(this.board);
        this.initializeLevels();
    };
    Game.prototype.newGame = function () {
        this.view.showSingleOrMultiplayerOptions();
    };
    Game.prototype.changeMultiplayerConnection = function (singleOrMultiplayerConnection) {
        this.multiplayer = singleOrMultiplayerConnection;
        this.attachToMultiplayer();
    };
    Game.prototype.singlePlayerOptionSelected = function () {
        this.view.hideSingleOrMultiplayerOptions();
        this.start();
    };
    Game.prototype.multiplayerOptionSelected = function () {
        this.view.hideSingleOrMultiplayerOptions();
        this.view.showMultiplayerOptionsCreateOrJoinGame();
    };
    Game.prototype.createMultiplayerGame = function () {
        this.view.hideCreateOrJoinGame();
        this.gameId = this.multiplayer.createNewGame();
        this.showMultiplayerGameId();
    };
    Game.prototype.joinGame = function () {
        this.view.hideCreateOrJoinGame();
        this.view.showEnterGameId();
    };
    Game.prototype.joinGameWithId = function (gameId) {
        this.gameId = gameId;
        this.multiplayer.joinGame(gameId);
        this.view.hideEnterGameId();
    };
    Game.prototype.showMultiplayerGameId = function () {
        this.view.showNewMultiplayerGameCreateWithId(this.gameId);
    };
    Game.prototype.mute = function () {
        this.soundPlayer.mute();
    };
    Game.prototype.unMute = function () {
        this.soundPlayer.unMute();
    };
    Game.prototype.start = function () {
        this.currentLevelIndex = -1;
        this.scoring.reset();
        this.view.hideGameOver();
        this.startNewLevel();
    };
    Game.prototype.initializeLevels = function () {
        this.levels = model_1.LevelFactory.Levels();
    };
    Game.prototype.attachToController = function () {
        var _this = this;
        this.controller.onMoveLeft(function () { return _this.moveLeft(); });
        this.controller.onMoveRight(function () { return _this.moveRight(); });
        this.controller.onMoveDown(function () { return _this.moveDown(); });
        this.controller.onRotate(function () { return _this.rotate(); });
    };
    Game.prototype.attachToMultiplayer = function () {
        var _this = this;
        this.multiplayer.onPlayer2BoardUpdated(function (board) { return _this.updatePlayer2Board(board); });
        this.multiplayer.onPlayer2PieceUpdated(function (piece) { return _this.updatePlayer2Piece(piece); });
        this.multiplayer.onPlayer2Connected(function () { return _this.player2Connected(); });
    };
    Game.prototype.player2Connected = function () {
        this.view.hideNewMultiplayerGameCreateWithId();
        this.start();
    };
    Game.prototype.updatePlayer2Piece = function (piece) {
        this.view.drawPlayer2Piece(piece);
    };
    Game.prototype.updatePlayer2Board = function (board) {
        this.view.drawPlayer2Board(board);
    };
    Game.prototype.moveLeft = function () {
        var pieceInNewPosition = this.piece.clone();
        pieceInNewPosition.moveLeft();
        this.movePieceToNewPositionIfNoCollision(pieceInNewPosition);
    };
    Game.prototype.moveRight = function () {
        var pieceInNewPosition = this.piece.clone();
        pieceInNewPosition.moveRight();
        this.movePieceToNewPositionIfNoCollision(pieceInNewPosition);
    };
    Game.prototype.moveDown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pieceInNewPosition;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pieceInNewPosition = this.piece.clone();
                        pieceInNewPosition.moveDown();
                        if (!!this.movePieceToNewPositionIfNoCollision(pieceInNewPosition)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.freezePiece()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.rotate = function () {
        var pieceInNewPosition = this.piece.clone();
        pieceInNewPosition.rotate();
        if (this.movePieceToNewPositionIfNoCollision(pieceInNewPosition)) {
            this.soundPlayer.playRotate();
        }
    };
    Game.prototype.freezePiece = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pauseFallingPiece();
                        this.controller.lock();
                        this.freezePieceOnDashboard();
                        this.calculateScoringForNewFreezedPiece();
                        return [4 /*yield*/, this.removeLinesIfAny()];
                    case 1:
                        _a.sent();
                        try {
                            if (this.nextPiece) {
                                this.putNextPieceIntoBoard();
                                this.controller.unlock();
                                this.startFallingPiece();
                            }
                            else {
                                this.levelCompleted();
                            }
                        }
                        catch (error) {
                            if (error instanceof full_board_exception_1.FullBoardException) {
                                this.gameOver();
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.freezePieceOnDashboard = function () {
        this.board.freezePiece(this.piece);
        this.drawBoard();
        this.soundPlayer.playFreeze();
    };
    Game.prototype.calculateScoringForNewFreezedPiece = function () {
        this.scoring.pieceDrop(this.currentLevelIndex + 1);
        this.showScore();
    };
    Game.prototype.showScore = function () {
        var score = this.scoring.getScore();
        this.view.showScore(score);
    };
    Game.prototype.levelCompleted = function () {
        var _this = this;
        this.soundPlayer.stopMusicBackground();
        this.view.showLevelCompleted();
        this.soundPlayer.playLevelComplete();
        setTimeout(function () {
            _this.view.hideLevelCompleted();
            _this.startNewLevel();
        }, 5000);
    };
    Game.prototype.removeLinesIfAny = function () {
        return __awaiter(this, void 0, void 0, function () {
            var totalCompletedLines, completedLineInfo, lineIndex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        totalCompletedLines = 0;
                        completedLineInfo = this.board.isACompletedLine();
                        _a.label = 1;
                    case 1:
                        if (!(completedLineInfo !== null)) return [3 /*break*/, 3];
                        totalCompletedLines++;
                        lineIndex = completedLineInfo.lineIndex;
                        return [4 /*yield*/, this.cleanALine(lineIndex)];
                    case 2:
                        _a.sent();
                        this.showTotalLines();
                        completedLineInfo = this.board.isACompletedLine();
                        return [3 /*break*/, 1];
                    case 3:
                        this.completedLinesCurrentLevel += totalCompletedLines;
                        if (totalCompletedLines > 0) {
                            this.scoring.linesPerClear(totalCompletedLines, this.currentLevelIndex + 1);
                            this.showScore();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.cleanALine = function (lineNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var me, waitForContinue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        me = this;
                        this.soundPlayer.playLineCompleted();
                        this.view.cleanLine(lineNumber);
                        waitForContinue = new Promise(function (resolve, reject) {
                            setTimeout(function () {
                                me.board.removeLine(lineNumber);
                                me.drawBoard();
                                resolve('');
                            }, 500);
                        });
                        return [4 /*yield*/, waitForContinue];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.putNextPieceIntoBoard = function () {
        this.piece = this.nextPiece;
        this.centerPiece();
        this.drawPiece();
        this.moveNextShape();
    };
    Game.prototype.gameOver = function () {
        this.pauseFallingPiece();
        this.soundPlayer.stopMusicBackground();
        this.soundPlayer.playGameOver();
        this.view.showGameOver();
    };
    Game.prototype.moveNextShape = function () {
        var nextShape = this.level.getNextShape();
        if (nextShape) {
            this.nextPiece = new model_1.Piece(nextShape);
            this.drawNextShape();
        }
        else {
            this.nextPiece = null;
            this.view.cleanNextShape();
        }
    };
    Game.prototype.drawNextShape = function () {
        this.view.drawNextShape(this.nextPiece.shape);
    };
    Game.prototype.movePieceToNewPositionIfNoCollision = function (pieceInNewPosition) {
        var canAllocatePiece = this.board.canAllocatePiece(pieceInNewPosition);
        if (canAllocatePiece) {
            this.drawBoard();
            this.piece = pieceInNewPosition;
            this.drawPiece();
        }
        return canAllocatePiece;
    };
    Game.prototype.startNewLevel = function () {
        this.pauseFallingPiece();
        this.currentLevelIndex++;
        this.initLevelVariables();
        this.startLevelGame();
        this.startFallingPiece();
    };
    Game.prototype.initLevelVariables = function () {
        this.completedLinesCurrentLevel = 0;
        this.board.clean();
        this.level = this.levels[this.currentLevelIndex];
        this.level.init();
        this.piece = new model_1.Piece(this.level.getNextShape());
        this.nextPiece = new model_1.Piece(this.level.getNextShape());
    };
    Game.prototype.startLevelGame = function () {
        this.showNewLevelStart();
        this.showTotalLines();
        this.showScore();
        this.centerPiece();
        this.drawBoard();
        this.drawPiece();
        this.drawNextShape();
        this.playLevelMusic();
        this.resumeControl();
    };
    Game.prototype.resumeControl = function () {
        this.controller.unlock();
    };
    Game.prototype.playLevelMusic = function () {
        this.soundPlayer.playMusicBackground(this.currentLevelIndex);
    };
    Game.prototype.showTotalLines = function () {
        this.view.showTotalLines(this.completedLinesCurrentLevel);
    };
    Game.prototype.showNewLevelStart = function () {
        this.view.showNewLevelStart(this.currentLevelIndex + 1);
    };
    Game.prototype.startFallingPiece = function () {
        var me = this;
        this.fallingPieceInterval = setInterval(function () { return me.moveDown(); }, me.level.speed);
    };
    Game.prototype.pauseFallingPiece = function () {
        clearInterval(this.fallingPieceInterval);
    };
    Game.prototype.drawPiece = function () {
        this.view.drawPiece(this.piece);
        this.multiplayer.sendNewPieceToPlayer2(this.piece);
    };
    Game.prototype.drawBoard = function () {
        this.view.drawBoard(this.board);
        this.multiplayer.sendNewBoardToPlayer2(this.board);
    };
    Game.prototype.centerPiece = function () {
        var boardMiddleX = this.board.getMiddleX();
        var shapeMiddleX = this.piece.shape.matrix.length / 2;
        this.piece.x = Math.floor(boardMiddleX - shapeMiddleX);
        this.piece.y = this.board.getTopY();
        if (!this.board.canAllocatePiece(this.piece)) {
            throw new full_board_exception_1.FullBoardException();
        }
    };
    return Game;
}());
exports.Game = Game;
