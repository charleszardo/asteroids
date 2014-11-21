(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.addShip();
    this.timerId = null;
  };

  GameView.MOVES = {
    "w": [ 0, -1],
    "a": [-1,  0],
    "s": [ 0,  1],
    "d": [ 1,  0],
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.ship;
		var game = this.game;
		var view = this;

    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function () { ship.power(move); });
    });

    key("space", function () {
			event.preventDefault();
			ship.fireBullet() 
		});
		key("p", function () {
			view.handlePause();
		});
  };
	
	GameView.prototype.handlePause = function () {
		if (this.game.paused) {
			this.game.paused = false;
		} else {
			this.game.paused = true;
		}
	};


  GameView.prototype.start = function () {
    var gameView = this;
		var thisGame = this.game;
    this.timerId = setInterval(
      function () {
				if (thisGame.paused){
					// do nothing, paused;
				} else {
					thisGame.step();
					thisGame.draw(gameView.ctx);
				}
      }, 1000 / Asteroids.Game.FPS
    );

    this.bindKeyHandlers();
  };

  GameView.prototype.stop = function () {
		// this.game.ships = [];
    clearInterval(this.timerId);
  };
})();