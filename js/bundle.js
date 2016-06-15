/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const HanoiGame = __webpack_require__(2);
	const HanoiView = __webpack_require__(3);
	
	$( () => {
	  const rootEl = $('.hanoi');
	  const game = new HanoiGame();
	  new HanoiView(game, rootEl);
	});


/***/ },
/* 2 */
/***/ function(module, exports) {

	function Game () {
	  this.towers = [[3, 2, 1], [], []];
	};
	
	Game.prototype.isValidMove = function(startTowerIdx, endTowerIdx) {
	    const startTower = this.towers[startTowerIdx];
	    const endTower = this.towers[endTowerIdx];
	
	    if (startTower.length === 0) {
	      return false;
	    } else if (endTower.length == 0) {
	      return true;
	    } else {
	      const topStartDisc = startTower[startTower.length - 1];
	      const topEndDisc = endTower[endTower.length - 1];
	      return topStartDisc < topEndDisc;
	    }
	};
	
	Game.prototype.isWon = function(){
	    // move all the discs to the last or second tower
	    return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	};
	
	
	Game.prototype.move = function(startTowerIdx, endTowerIdx) {
	    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	      this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	      return true;
	    } else {
	      return false;
	    }
	};
	
	
	Game.prototype.print = function(){
	    console.log(JSON.stringify(this.towers));
	};
	
	
	Game.prototype.promptMove = function(reader, callback) {
	    this.print();
	    reader.question("Enter a starting tower: ", start => {
	      const startTowerIdx = parseInt(start);
	      reader.question("Enter an ending tower: ", end => {
	        const endTowerIdx = parseInt(end);
	        callback(startTowerIdx, endTowerIdx)
	      });
	    });
	};
	
	Game.prototype.run = function(reader, gameCompletionCallback) {
	    this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	      if (!this.move(startTowerIdx, endTowerIdx)) {
	        console.log("Invalid move!");
	      }
	
	      if (!this.isWon()) {
	        // Continue to play!
	        this.run(reader, gameCompletionCallback);
	      } else {
	        this.print();
	        console.log("You win!");
	        gameCompletionCallback();
	      }
	    });
	};
	
	module.exports = Game;


/***/ },
/* 3 */
/***/ function(module, exports) {

	
	
	function HanoiView(game, domEl) {
	  this.game = game;
	  this.domEl = domEl;
	  // this.setupTowers();
	  this.render();
	}
	
	
	HanoiView.prototype.setupTowers = function () {
	  for (let i = 0 ; i < 3; i++){
	    let $pile = $("<ul></ul>");
	    this.domEl.append($pile);
	  }
	  let $piles = $("ul");
	  console.log($piles);
	  for (let i = 3; i > 0; i--){
	    this.addListItem($($piles[0]), i);
	  }
	};
	
	HanoiView.prototype.addListItem = function ($pile, size) {
	  let $li = $("<li></li>");
	  $li.addClass(`disc${size}`);
	  $pile.append($li);
	};
	
	HanoiView.prototype.render = function () {
	  let gameState = this.game.towers;
	  this.domEl.empty();
	
	
	  for (let i = 0 ; i < 3; i++){
	    let tower = gameState[i];
	    let $pile = $(`<ul class="${i}"></ul>`);
	
	    $pile.on('click', (event) => {
	      let $currentPile = $(event.currentTarget);
	
	      if ($('.firstSelection').length > 0) {
	        $currentPile.addClass("secondSelection");
	        let $firstSelection = $(".firstSelection");
	        this.makeMove($firstSelection, $currentPile);
	
	      } else {
	        $currentPile.addClass("firstSelection");
	      }
	
	    });
	
	    this.domEl.append($pile);
	
	    tower.reverse().forEach((item)=>{
	      this.addListItem($pile, item);
	    });
	    tower.reverse();
	  }
	};
	
	HanoiView.prototype.makeMove = function ($sourcePile, $destinationPile) {
	  let sourceTower = $sourcePile.attr('class').split(' ')[0];
	  sourceTower = parseInt(sourceTower, 10);
	  let destinationTower = $destinationPile.attr('class').split(' ')[0];
	  destinationTower = parseInt(destinationTower, 10);
	
	  if (this.game.isValidMove(sourceTower, destinationTower)) {
	    this.game.move(sourceTower, destinationTower);
	    this.render();
	    if (this.game.isWon()){
	      alert("YOU WIN!");
	    }
	  } else {
	    alert('Invalid Move! Try again.');
	  }
	
	  $sourcePile.removeClass('firstSelection');
	  $destinationPile.removeClass('secondSelection');
	};
	
	
	
	
	
	
	
	
	
	
	
	
	module.exports = HanoiView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map