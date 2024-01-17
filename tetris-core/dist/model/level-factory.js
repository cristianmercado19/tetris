"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var level_1 = require("./level");
var shape_factory_1 = require("./shape-factory");
var LevelFactory = /** @class */ (function () {
    function LevelFactory() {
    }
    LevelFactory.Levels = function () {
        var levels = [];
        levels.push(this.createLevel(500, 30)); // 1
        levels.push(this.createLevel(450, 30)); // 2
        levels.push(this.createLevel(420, 30)); // 3
        levels.push(this.createLevel(400, 40)); // 4
        levels.push(this.createLevel(280, 40)); // 5
        levels.push(this.createLevel(270, 50)); // 6
        levels.push(this.createLevel(220, 50)); // 7
        levels.push(this.createLevel(200, 60)); // 8
        levels.push(this.createLevel(180, 70)); // 9
        levels.push(this.createLevel(130, 80)); // 10
        levels.push(this.createLevel(90, 2000)); // 11
        return levels;
    };
    LevelFactory.createLevel = function (speed, numberOfPieces) {
        var level = new level_1.Level(speed);
        for (var i = 0; i < numberOfPieces; i++) {
            level.addShapes(shape_factory_1.ShapeFactory.getRandom());
        }
        return level;
    };
    return LevelFactory;
}());
exports.LevelFactory = LevelFactory;
