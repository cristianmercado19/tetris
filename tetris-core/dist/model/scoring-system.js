"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ScoringSystem = /** @class */ (function () {
    function ScoringSystem() {
        this.currentScore = 0;
        this.pieceDropLevelScoring = [
            1,
            1,
            2,
            2,
            5,
            5,
            7,
            7,
            8,
            10,
            10,
        ];
        this.lineLevelScoring = [
            [100, 400, 900, 2000],
            [100, 400, 900, 2000],
            [200, 800, 1800, 4000],
            [200, 800, 1800, 4000],
            [300, 1200, 2700, 6000],
            [400, 1500, 3600, 8000],
            [400, 1500, 3600, 8000],
            [600, 1500, 4000, 8000],
            [600, 1600, 4500, 9000],
            [700, 1700, 5000, 10000],
            [700, 2000, 5000, 10000],
        ];
    }
    ScoringSystem.prototype.linesPerClear = function (lines, currentLevel) {
        var levelIndex = currentLevel - 1;
        if (levelIndex >= this.lineLevelScoring.length) {
            levelIndex = this.lineLevelScoring.length - 1;
        }
        var level = this.lineLevelScoring[levelIndex];
        var lineIndex = lines - 1;
        var points = level[lineIndex];
        this.currentScore += points;
    };
    ScoringSystem.prototype.pieceDrop = function (currentLevel) {
        var levelIndex = currentLevel - 1;
        if (levelIndex >= this.pieceDropLevelScoring.length) {
            levelIndex = this.pieceDropLevelScoring.length - 1;
        }
        var pointsPerDrop = this.pieceDropLevelScoring[levelIndex];
        this.currentScore += pointsPerDrop;
    };
    ScoringSystem.prototype.reset = function () {
        this.currentScore = 0;
    };
    ScoringSystem.prototype.getScore = function () {
        return this.currentScore;
    };
    return ScoringSystem;
}());
exports.ScoringSystem = ScoringSystem;
