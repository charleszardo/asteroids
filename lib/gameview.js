(function(){
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function(){
    this.game = new Asteroids.game();
   // this.game.moveObjects();
  //  this.game.draw(c);
  }

  game_view = new GameView();
  GameView.prototype.start = function(){
   setInterval(function() {
      // game_view.game.checkCollisions();
      game_view.game.step();
      game_view.game.draw(c); }, 20)
  }


  game_view.start();

})();