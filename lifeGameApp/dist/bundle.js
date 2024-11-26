/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/css/styles.css":
/*!****************************!*\
  !*** ./src/css/styles.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://life-game/./src/css/styles.css?");

/***/ }),

/***/ "./src/components/GameInterface.ts":
/*!*****************************************!*\
  !*** ./src/components/GameInterface.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.GameInterface = void 0;\nclass GameInterface {\n    constructor(lifeGame, canevas) {\n        this.cells = [];\n        this.lifeGame = lifeGame;\n        this.gameBoxe = canevas;\n    }\n    get canevas() {\n        return this.gameBoxe;\n    }\n    initGameUi() {\n        const cardBoxe = document.createElement(\"div\");\n        cardBoxe.classList.add(\"flex\", \"flex-col\", \"items-center\", \"my-2\");\n        const card = document.createElement(\"div\");\n        card.classList.add(\"p-6\", \"bg-transparent\", \"border\", \"border-gray-white\", \"rounded-lg\");\n        const header = this.gameState();\n        card.append(header);\n        const playground = this.gamePlayground();\n        card.append(playground);\n        const control = this.gameControls();\n        card.append(control);\n        cardBoxe.append(card);\n        this.gameBoxe.append(cardBoxe);\n        return;\n    }\n    gameState() {\n        const elt = document.createElement(\"div\");\n        elt.classList.add(\"flex\", \"justify-between\", \"mb-3\");\n        const gameStatus = `\n        <span class=\"flex items-center text-sm font-medium text-gray-white  me-3\">\n          <span class=\"flex w-2.5 h-2.5 bg-gray-white rounded-full me-1.5 flex-shrink-0\"></span>\n          Game status : <span id=\"game_status\" class=\"text-green-neon ml-1\"></span>\n        </span>`;\n        const iteration = `\n        <span class=\"flex items-center text-sm font-medium text-gray-white\">\n          <span class=\"flex w-2.5 h-2.5 bg-gray-white rounded-full me-1.5 flex-shrink-0\"></span>\n          Iteration : <span id=\"iteration\" class=\"text-green-neon ml-1 mr-1\"></span>/ 100\n        </span>`;\n        elt.insertAdjacentHTML('beforeend', gameStatus);\n        elt.insertAdjacentHTML('beforeend', iteration);\n        return elt;\n    }\n    gamePlayground() {\n        const playground = document.createElement(\"div\");\n        playground.id = \"playground\";\n        playground.classList.add(\"grid-container\");\n        const playgroundSize = this.lifeGame.sizeGrid;\n        for (let x = 0; x < playgroundSize; x++) {\n            this.cells[x] = [];\n            for (let y = 0; y < playgroundSize; y++) {\n                let cell = document.createElement(\"div\");\n                cell.dataset.x = `${x}`;\n                cell.dataset.y = `${y}`;\n                cell.classList.add(\"bg-gray-anthracite\");\n                this.cells[x][y] = cell;\n                playground.append(cell);\n            }\n        }\n        return playground;\n    }\n    gameControls() {\n        const controls = document.createElement(\"div\");\n        controls.id = \"ui_control\";\n        controls.classList.add(\"mt-3\");\n        const btnPlay = `\n      <button class=\"inline-flex items-center bg-gray-black text-green-neon hover:bg-gray-black  hover:text-green-neon py-2 pr-4 rounded\" id=\"play\">\n        Play\n      </button>`;\n        const btnStop = `\n      <button class=\"inline-flex items-center  bg-gray-black text-gray-white hover:bg-gray-black hover:text-green-neon py-2 px-4 rounded\" id=\"stop\">\n        Stop\n      </button>`;\n        const btnReset = `\n      <button class=\"inline-flex items-center bg-gray-black text-gray-white hover:bg-gray-black hover:text-green-neon py-2 px-4 rounded\" id=\"reset\">\n        Reset\n      </button>`;\n        controls.insertAdjacentHTML('beforeend', btnPlay);\n        controls.insertAdjacentHTML('beforeend', btnStop);\n        controls.insertAdjacentHTML('beforeend', btnReset);\n        return controls;\n    }\n    resetGame() {\n        this.gameBoxe.innerHTML = \"\";\n        this.lifeGame.resetPlayground();\n        this.initGameUi();\n        this.colorCells();\n        return;\n    }\n    colorCells() {\n        const playgroundSize = this.lifeGame.sizeGrid;\n        const playground = this.lifeGame.playground;\n        for (let x = 0; x < playgroundSize; x++) {\n            for (let y = 0; y < playgroundSize; y++) {\n                const cell = this.cells[x][y];\n                cell.classList.toggle('bg-green-neon', playground[x][y] === 1);\n                cell.classList.toggle('bg-gray-anthracite', playground[x][y] === 0);\n            }\n        }\n        return;\n    }\n}\nexports.GameInterface = GameInterface;\n\n\n//# sourceURL=webpack://life-game/./src/components/GameInterface.ts?");

/***/ }),

/***/ "./src/controllers/GameController.ts":
/*!*******************************************!*\
  !*** ./src/controllers/GameController.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.GameController = void 0;\nconst LifeGame_1 = __webpack_require__(/*! ../models/LifeGame */ \"./src/models/LifeGame.ts\");\nconst GameInterface_1 = __webpack_require__(/*! ../components/GameInterface */ \"./src/components/GameInterface.ts\");\nclass GameController {\n    ;\n    constructor(gameBox, options = {}) {\n        this.intervalId = null;\n        this.iterationCount = 0;\n        this.isRunning = false;\n        this.playgroundSize = options.playgroundSize || 100;\n        this.initialCells = options.initialCells || 800;\n        this.maxIterations = options.maxIterations || 100;\n        this.lifeGame = new LifeGame_1.LifeGame(this.playgroundSize);\n        this.gameUI = document.querySelector(gameBox);\n        this.gameInterface = new GameInterface_1.GameInterface(this.lifeGame, this.gameUI);\n        this.intervalTime = 250;\n        this.initialize();\n    }\n    initialize() {\n        console.log(\"Game start\");\n        this.gameInterface.initGameUi();\n        this.gameState();\n        this.setupEventListeners();\n        return;\n    }\n    setupEventListeners() {\n        this.gameUI.addEventListener(\"click\", (event) => {\n            const target = event.target;\n            switch (target.id) {\n                case \"play\":\n                    this.startLoop();\n                    break;\n                case \"stop\":\n                    this.stopLoop();\n                    break;\n                case \"reset\":\n                    this.resetLoop();\n                    break;\n                default:\n                    return;\n            }\n        });\n        return;\n    }\n    gameState() {\n        const gameStatus = this.gameUI.querySelector(\"#game_status\");\n        const iteration = this.gameUI.querySelector(\"#iteration\");\n        if (this.isRunning) {\n            gameStatus.innerHTML = \"Play\";\n        }\n        else {\n            gameStatus.innerHTML = \"Stop\";\n        }\n        iteration.innerHTML = this.iterationCount.toString();\n        return;\n    }\n    startLoop() {\n        if (this.isRunning)\n            return;\n        this.intervalId = setInterval(() => {\n            if (this.iterationCount === 0) {\n                this.lifeGame.spontaneousGeneration(this.initialCells);\n            }\n            this.updateGame();\n            this.iterationCount++;\n            this.gameState();\n            if (this.iterationCount >= this.maxIterations) {\n                this.stopLoop();\n            }\n        }, this.intervalTime);\n        this.isRunning = true;\n        return;\n    }\n    stopLoop() {\n        if (!this.isRunning)\n            return;\n        if (this.intervalId) {\n            clearInterval(this.intervalId);\n            this.intervalId = null;\n        }\n        this.isRunning = false;\n        this.gameState();\n        console.log(\"Simulation en pause\");\n        return;\n    }\n    resetLoop() {\n        this.stopLoop();\n        this.iterationCount = 0;\n        this.gameInterface.resetGame();\n        this.gameState();\n        console.log(\"Simulation réinitialisée\");\n        return;\n    }\n    updateGame() {\n        this.lifeGame.nextGeneration();\n        this.gameInterface.colorCells();\n        return;\n    }\n}\nexports.GameController = GameController;\n\n\n//# sourceURL=webpack://life-game/./src/controllers/GameController.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst GameController_1 = __webpack_require__(/*! ./controllers/GameController */ \"./src/controllers/GameController.ts\");\n__webpack_require__(/*! ./css/styles.css */ \"./src/css/styles.css\");\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    const gameController = new GameController_1.GameController(\"#game_ui\", {\n        playgroundSize: 100,\n        initialCells: 600,\n        maxIterations: 100\n    });\n});\n\n\n//# sourceURL=webpack://life-game/./src/index.ts?");

/***/ }),

/***/ "./src/models/LifeGame.ts":
/*!********************************!*\
  !*** ./src/models/LifeGame.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.LifeGame = void 0;\nclass LifeGame {\n    constructor(sizeGrid) {\n        this.gridSize = sizeGrid;\n        this.playground = this.initPlayground();\n    }\n    get sizeGrid() {\n        return this.gridSize;\n    }\n    initPlayground() {\n        const playground = [];\n        for (let x = 0; x < this.sizeGrid; x++) {\n            const row = [];\n            for (let y = 0; y < this.sizeGrid; y++) {\n                row.push(0);\n            }\n            playground.push(row);\n        }\n        return playground;\n    }\n    resetPlayground() {\n        this.playground = this.initPlayground();\n    }\n    survey(x, y) {\n        const edgeEffect = (pos) => {\n            if (pos < 0) {\n                return this.gridSize + pos;\n            }\n            if (pos >= this.gridSize) {\n                return pos % this.gridSize;\n            }\n            return pos;\n        };\n        let pop = 0;\n        const around = [-1, 0, 1];\n        around.forEach(ar_x => {\n            around.forEach(ar_y => {\n                if (ar_x === 0 && ar_y === 0) {\n                    return;\n                }\n                const pos_x = edgeEffect(x + ar_x);\n                const pos_y = edgeEffect(y + ar_y);\n                const currentPos = this.playground[pos_x][pos_y];\n                if (currentPos === 1) {\n                    pop += 1;\n                }\n            });\n        });\n        return pop;\n    }\n    lifeRules(x, y) {\n        /**\n         * Rule 1\n         * Une cellule morte possédant exactement trois cellules voisines vivantes devient vivante (elle naît) ;\n         * Rule 2\n         * Une cellule vivante possédant deux ou trois cellules voisines vivantes le reste, sinon elle meurt.\n         **/\n        const cellStatus = this.playground[x][y];\n        const popAround = this.survey(x, y);\n        if (cellStatus === 1) {\n            if (popAround >= 2 && popAround <= 3) {\n                return 1;\n            }\n        }\n        if (cellStatus === 0) {\n            if (popAround === 3) {\n                return 1;\n            }\n        }\n        return 0;\n    }\n    randomPosition() {\n        const minCeiled = Math.ceil(0);\n        const maxFloored = Math.floor(this.gridSize);\n        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);\n    }\n    spontaneousGeneration(birth_rate) {\n        let cell_alive = 0;\n        while (cell_alive < birth_rate) {\n            const rand_x = this.randomPosition();\n            const rand_y = this.randomPosition();\n            if (!this.playground[rand_x][rand_y]) {\n                this.playground[rand_x][rand_y] = 1;\n                cell_alive += 1;\n            }\n        }\n        return;\n    }\n    nextGeneration() {\n        for (let x = 0; x < this.gridSize; x++) {\n            for (let y = 0; y < this.gridSize; y++) {\n                const new_cell_value = this.lifeRules(x, y);\n                this.playground[x][y] = new_cell_value;\n            }\n        }\n        return;\n    }\n    printPlayground() {\n        for (let x = 0; x < this.sizeGrid; x++) {\n            let row = \"\";\n            for (let y = 0; y < this.sizeGrid; y++) {\n                if (this.playground[x][y]) {\n                    row += \"● \";\n                }\n                else {\n                    row += \"○ \";\n                }\n            }\n            console.log(row);\n        }\n        return;\n    }\n}\nexports.LifeGame = LifeGame;\n\n\n//# sourceURL=webpack://life-game/./src/models/LifeGame.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;