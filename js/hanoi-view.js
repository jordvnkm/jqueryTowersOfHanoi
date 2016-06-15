

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
