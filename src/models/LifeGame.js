"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LifeGame = void 0;
var LifeGame = /** @class */ (function () {
    function LifeGame(sizeGrid) {
        this.gridSize = sizeGrid;
        this.playground = this.initPlayground();
    }
    Object.defineProperty(LifeGame.prototype, "sizeGrid", {
        get: function () {
            return this.gridSize;
        },
        enumerable: false,
        configurable: true
    });
    LifeGame.prototype.initPlayground = function () {
        var playground = [];
        for (var x = 0; x < this.sizeGrid; x++) {
            var row = [];
            for (var y = 0; y < this.sizeGrid; y++) {
                row.push(0);
            }
            playground.push(row);
        }
        return playground;
    };
    LifeGame.prototype.resetPlayground = function () {
        this.playground = this.initPlayground();
    };
    LifeGame.prototype.survey = function (x, y) {
        var _this = this;
        var edgeEffect = function (pos) {
            if (pos < 0) {
                return _this.gridSize + pos;
            }
            if (pos >= _this.gridSize) {
                return pos % _this.gridSize;
            }
            return pos;
        };
        var pop = 0;
        var around = [-1, 0, 1];
        around.forEach(function (ar_x) {
            around.forEach(function (ar_y) {
                if (ar_x === 0 && ar_y === 0) {
                    return;
                }
                var pos_x = edgeEffect(x + ar_x);
                var pos_y = edgeEffect(y + ar_y);
                var currentPos = _this.playground[pos_x][pos_y];
                if (currentPos === 1) {
                    pop += 1;
                }
            });
        });
        return pop;
    };
    LifeGame.prototype.lifeRules = function (x, y) {
        /**
         * Rule 1
         * Une cellule morte possédant exactement trois cellules voisines vivantes devient vivante (elle naît) ;
         * Rule 2
         * Une cellule vivante possédant deux ou trois cellules voisines vivantes le reste, sinon elle meurt.
         **/
        var cellStatus = this.playground[x][y];
        var popAround = this.survey(x, y);
        if (cellStatus === 1) {
            if (popAround >= 2 && popAround <= 3) {
                return 1;
            }
        }
        if (cellStatus === 0) {
            if (popAround === 3) {
                return 1;
            }
        }
        return 0;
    };
    LifeGame.prototype.randomPosition = function () {
        var minCeiled = Math.ceil(0);
        var maxFloored = Math.floor(this.gridSize);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    };
    LifeGame.prototype.spontaneousGeneration = function (birth_rate) {
        var cell_alive = 0;
        while (cell_alive < birth_rate) {
            var rand_x = this.randomPosition();
            var rand_y = this.randomPosition();
            if (!this.playground[rand_x][rand_y]) {
                this.playground[rand_x][rand_y] = 1;
                cell_alive += 1;
            }
        }
        return;
    };
    LifeGame.prototype.nextGeneration = function () {
        for (var x = 0; x < this.gridSize; x++) {
            for (var y = 0; y < this.gridSize; y++) {
                var new_cell_value = this.lifeRules(x, y);
                this.playground[x][y] = new_cell_value;
            }
        }
        return;
    };
    LifeGame.prototype.printPlayground = function () {
        for (var x = 0; x < this.sizeGrid; x++) {
            var row = "";
            for (var y = 0; y < this.sizeGrid; y++) {
                if (this.playground[x][y]) {
                    row += "● ";
                }
                else {
                    row += "○ ";
                }
            }
            console.log(row);
        }
        return;
    };
    return LifeGame;
}());
exports.LifeGame = LifeGame;
